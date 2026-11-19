// Rendrer del 2 (vekstsekvensen) til video/vekst.mp4, frame for frame fra index.html?scene=render.
//
// Krever: en lokal server i prosjektmappa (python -m http.server 8765),
//         puppeteer-core (npm i puppeteer-core) og ffmpeg (pip install imageio-ffmpeg).
// Bruk:   node render.js [url] [chrome.exe] [ffmpeg.exe]
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const URL = process.argv[2] || 'http://127.0.0.1:8765/index.html?scene=render';
const CHROME = process.argv[3] || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = process.argv[4] || execFileSync('python', ['-c', 'import imageio_ffmpeg as f; print(f.get_ffmpeg_exe())']).toString().trim();
const OUT = path.join(__dirname, 'video', 'vekst.mp4');
const FPS = 30, W = 520, H = 940, DPR = 2, CRF = process.env.CRF || '28';

(async () => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    // JPEG er full-range; konverter til vanlig TV-range yuv420p, som alle mobilspillere forventer
    '-vf', 'scale=in_range=pc:out_range=tv,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-crf', CRF, '-profile:v', 'high', '-level', '4.2', '-color_range', 'tv',
    '-movflags', '+faststart', '-an', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: DPR });
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.waitForFunction('window.__frame && window.__dur');
  const dur = await page.evaluate('window.__dur');
  const cdp = await page.target().createCDPSession();
  const n = Math.floor(dur * FPS) + 1, t0 = Date.now();
  for (let i = 0; i < n; i++){
    await page.evaluate(t => window.__frame(t), i / FPS);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: W, height: H, scale: DPR } });
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log(`${OUT}  ${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB, ${n} frames`);
})().catch(e => { console.error(e); process.exit(1); });
