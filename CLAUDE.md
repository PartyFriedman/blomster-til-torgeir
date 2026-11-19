# Digital blomsterbukett til Torgeir Waldemars platerelease

Gave til Torgeir Waldemars platerelease i kveld. Lag én enkeltstående, publiserbar HTML-side med SVG og GSAP som kan åpnes på mobil. Materialet ligger i `images/` og `music/`:

- `images/greeting card text.jpg` – bilde av kortet
- `images/logotype.png` – logoen
- `music/peace_song_intro.mp3`
- `music/Peace_song_outro.mp3`

Lydfilene har ingen fades. Alle inn-/utfades og crossfaden må lages i koden.

## Forløp

1. En «Åpne»-knapp starter opplevelsen og lyden etter brukerhandling. Introen fader inn og looper sømløst.
2. En beskjeden bukett i brunt papir vises, og kortet glir inn foran. Kortets tekst avsluttes med «husk å vanne».
3. Han lukker kortet. En vase kommer inn, og han trykker eller drar for å helle vann. Vannhandlingen starter en 2–3 sekunders crossfade til outroen.
4. Veksten skal være en GSAP-timeline like lang som outroen: motion-graphics-showreel med tegnede stilker, forskjøvede kronblader, phyllotaxis-spiral, kamerazoom inn/ut, maskeavsløringer og pollenpartikler.
5. I klimaks danner blomstene en krans, og logoen avsløres med en maske som følger stilkenes bevegelse. Sluttbildet holdes til outroen fader ut.

## Visuell retning

- Start dempet i beige og brunt (Torgeirs palett), med tonene hentet fra kortet og logoen.
- Vann utløser mettet, varm blomsterfarge: oransje, korall, sennep og dyp rød, med én kald aksent.
- Bakgrunn, stilker og papir forblir beige og brune.
- Lås linjetykkelse, easing og palett gjennom hele opplevelsen.

## Arbeidsrekkefølge

Bygg scene 1–3 ferdig først. Vis et stillbilde av sluttbildet med logoen for godkjenning før vekstsekvensen animeres. Ikke implementer vekstanimasjonen før godkjenning.
