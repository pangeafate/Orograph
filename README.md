# Orograph Presentation

Standalone web presentation for `https://orograph.lakestrom.com`.

The deck uses the live Lakestrom design tokens:

- Display: `Space Grotesk`
- Body: `Inter`
- Mono: `JetBrains Mono`
- Daytime core colors: `#F3F5FA`, `#FFFFFF`, `#E9EDF5`, `#0A0A11`, `#262837`, `#646777`, `#7C5CFF`, `#5B3CE0`, `#4FD6E0`, `#FFB36B`

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## PDF Export

```bash
npm run export:pdf
```

The exporter screenshots each live HTML slide in fullscreen capture mode at 2x
resolution, then assembles the screenshots into a PDF. By default this writes
`exports/orograph-presentation.pdf`. Use
`npm run export:pdf -- --out path/to/file.pdf` to choose a different output
path, or `npm run export:pdf -- --scale 1.5` for a smaller file.
