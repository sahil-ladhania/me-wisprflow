# Fonts for the share image

`app/opengraph-image.tsx` renders the link preview with these, because the image renderer reads TTF, OTF or WOFF but not the site's WOFF2 files.

| File | Family | Used for |
| --- | --- | --- |
| `Newsreader-Medium.ttf` | Newsreader 500 | "Engine’s off." |
| `Newsreader-Italic.ttf` | Newsreader 400 italic | the lede |
| `BarlowCondensed-SemiBold.ttf` | Barlow Condensed 600 | kickers, the stone, the sign |

Downloaded from Google Fonts (fonts.googleapis.com), subset to A–Z, a–z, 0–9 and the punctuation the card uses (including · → ’ “ ” – — ₹). If the card's copy gains a character outside that set, download the font again with it included.

Both families are licensed under the SIL Open Font License 1.1, which allows bundling them with the site.
