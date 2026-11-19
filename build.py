"""Lager selvstendige HTML-filer med alle bilder og all lyd innebygd.

Bruk:  python build.py
Ut:    dist/blomster-til-torgeir.html  – én fil som virker overalt (også GSAP innebygd)
       dist/artifact.html              – samme side for publisering som Claude-artifact
                                         (uten egne html/head/body-tagger, GSAP fra cdnjs)
"""
import base64
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "index.html"
OUT = ROOT / "dist" / "blomster-til-torgeir.html"
ART = ROOT / "dist" / "artifact.html"

MIME = {".jpg": "image/jpeg", ".png": "image/png", ".mp3": "audio/mpeg"}
ASSETS = [
    "assets/card.jpg", "assets/logo.png", "assets/grain.png", "assets/wear.png",
    "music/peace_song_intro.mp3", "music/Peace_song_outro.mp3",
]


def data_uri(rel):
    p = ROOT / rel
    return f"data:{MIME[p.suffix.lower()]};base64," + base64.b64encode(p.read_bytes()).decode("ascii")


def main():
    html = SRC.read_text(encoding="utf-8")
    for rel in ASSETS:
        if rel not in html:
            raise SystemExit(f"Fant ikke {rel} i index.html")
        html = html.replace(rel, data_uri(rel))

    OUT.parent.mkdir(exist_ok=True)

    # Artifact-varianten: publiseringen legger på dokumentskjelettet selv
    art = re.sub(r"<!doctype html>\s*|<html[^>]*>\s*|</?head>\s*|</?body>\s*|</html>\s*", "", html, flags=re.I)
    ART.write_text(art, encoding="utf-8")

    # GSAP inn i fila, så den frittstående siden ikke er avhengig av CDN på kvelden
    def inline(m):
        url = m.group(1)
        code = urllib.request.urlopen(url, timeout=30).read().decode("utf-8")
        return "<script>" + code.replace("</script", "<\\/script") + "</script>"

    html, n = re.subn(r'<script src="(https://cdnjs\.cloudflare\.com/[^"]+)"></script>', inline, html)
    if n != 2:
        raise SystemExit(f"Forventet 2 GSAP-skript, fant {n}")
    OUT.write_text(html, encoding="utf-8")

    for f in (OUT, ART):
        print(f"{f.relative_to(ROOT)}  {f.stat().st_size / 1e6:.2f} MB")


if __name__ == "__main__":
    main()
