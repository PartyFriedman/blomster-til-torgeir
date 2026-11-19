# Blomster til Torgeir

En digital blomsterbukett til Torgeir Waldemar og Abildsø Spelemannslags platerelease.

Åpne kortet, les beskjeden og vann blomstene. Da vokser en krans fram rundt logoen til outroen av «Peace Song».

**Se den:** https://partyfriedman.github.io/blomster-til-torgeir/

## Innhold

- `index.html` – selve siden (SVG, Canvas og GSAP)
- `assets/` – kortet, logoen og trykkteksturene
- `music/` – intro og outro
- `dist/blomster-til-torgeir.html` – én frittstående fil med alt innebygd, som virker uten nett
- `build.py` – lager fila i `dist/` på nytt: `python build.py`
- `preview/` – stillbilder av sluttbildet og scenene

## Utvikling

Start en lokal server i mappa (`python -m http.server`) og åpne `index.html`. Disse URL-parameterne hopper rett til et sted i forløpet:

- `?scene=still` – sluttbildet
- `?scene=grow&t=24` – veksten fra 24 sekunder
- `?scene=vase` – rett til vasen
- `&speed=2` – raskere avspilling
