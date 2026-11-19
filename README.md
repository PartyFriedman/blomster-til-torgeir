# Blomster til Torgeir

En digital blomsterbukett til Torgeir Waldemar og Abildsø Spelemannslags platerelease.

Åpne kortet, les beskjeden og vann blomstene. Da vokser en krans fram rundt logoen til outroen av «Peace Song».

**Se den:** https://partyfriedman.github.io/blomster-til-torgeir/

**Alternativ versjon (70vibe, gamle VHS- og kassettcovere):** https://partyfriedman.github.io/blomster-til-torgeir/70vibe/. Kildekoden ligger på branchen `70vibe`, og mappa `70vibe/` er en publisert kopi med egen film.

## Innhold

- `index.html` – selve siden (SVG, Canvas og GSAP)
- `assets/` – kortet, logoen og trykkteksturene
- `music/` – intro og outro
- `video/vekst.mp4` – del 2 som film for mobil, laget av `render.js`
- `dist/blomster-til-torgeir.html` – én frittstående fil med alt innebygd, som virker uten nett
- `build.py` – lager fila i `dist/` på nytt: `python build.py`
- `preview/` – stillbilder av sluttbildet og scenene

## Del 2 som film på mobil

På telefoner spilles vekstsekvensen fra 2 s som forhåndsrendret film (`video/vekst.mp4`), fordi den levende 2,5D-scenen er for tung for mobilen. Lyden går fortsatt i Web Audio, og filmen holdes i takt med den. Korn og slitasje ligger som levende lag over filmen. På PC kjøres scenen fortsatt som kode.

Etter endringer i veksten rendres filmen på nytt:

```
python -m http.server 8765        # i prosjektmappa, i et eget vindu
npm i puppeteer-core && pip install imageio-ffmpeg
node render.js                    # ca. 5 minutter, skriver video/vekst.mp4
```

`?video=1` tvinger filmen på (også på PC), og `?video=0` slår den av.

## Utvikling

Start en lokal server i mappa (`python -m http.server`) og åpne `index.html`. Disse URL-parameterne hopper rett til et sted i forløpet:

- `?scene=still` – sluttbildet
- `?scene=grow&t=24` – veksten fra 24 sekunder
- `?scene=vase` – rett til vasen
- `&speed=2` – raskere avspilling
