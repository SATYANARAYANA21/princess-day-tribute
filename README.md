# The Enchanted Princess Day

A full-screen, interactive Princess Day tribute presented as a seven-scene fairytale. The experience pairs the supplied artwork with lightweight browser interactions, poetic flower messages, scene navigation, and an animated envelope reveal.

## Experience

- Seven full-screen scenes with previous/next controls, scene indicators, and keyboard navigation.
- A premium entrance button and a Flower Garden with individual quote reveals for the rose, lily, and tulip.
- A special-memory scene with the portrait placeholder incorporated into its background artwork.
- A closed envelope that responds to mouse, touch, and keyboard input with a seal-centered flower and sparkle burst before opening the letter scene.
- An Open Letter scene and a final bouquet scene.
- Reduced-motion support for the animated effects.

## Scene and artwork map

| Scene | Background | Description |
| --- | --- | --- |
| 1 | `background/bg1.png` | Royal entrance |
| 2 | `background/bg2.png` | Flower Garden and interactive quotes |
| 3 | `background/bg3.png` | Special Memory with an artwork-baked portrait placeholder |
| 4 | `background/bg4.png` | Princess highlights |
| 5 | `background/bg5.png` | Closed envelope |
| 6 | `background/bg6-clean.png` | Open Letter |
| 7 | `background/bg7.png` | Final bouquet |

`bg6-clean.png` is the Open Letter background used by the website. The original `bg6.png` is not present in this project folder. There is no separate envelope image; the envelope is part of `bg5.png`. The personal portrait is also baked into `bg3.png`; no separate personal photo file is included.

## Project structure

This is a small static website, so its existing root-level structure is kept simple:

```text
.
├── background/       # Seven scene backgrounds
├── index.html        # Scene markup and controls
├── script.js         # Scene navigation and interactions
├── style.css         # Layout, artwork framing, and visual effects
├── README.md
└── .gitignore
```

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- No package manager, framework, build tool, or runtime dependency is required.
- The stylesheet imports Cormorant Garamond from Google Fonts and falls back to Georgia when that font is unavailable.

## Run locally

From the project root, start Python's built-in static server:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

You can also open `index.html` directly in a modern browser, though serving the folder over HTTP is recommended for a consistent local preview.

## Checks

There is no build step. To check the JavaScript syntax with Node.js:

```powershell
node --check script.js
```

The site loads its backgrounds by relative paths from `background/`; keep those filenames and that folder alongside `index.html`.

## Replacing the portrait placeholder

The portrait placeholder is part of `background/bg3.png`, rather than a separate photograph file or HTML image. To personalize it, edit that background artwork with an authorized photograph and save the result as `bg3.png`, preserving its current dimensions and filename. Keep private or unapproved photographs out of the repository.

## Deployment

The project can be deployed to any static web host by publishing the project root with `index.html` as the entry page and retaining the `background/` directory. For GitHub Pages, choose the `main` branch and `/ (root)` as the Pages source in the repository settings.

## Credits

The background artwork was supplied with the project. No original artist, generation, or licensing metadata was present in the local files, so no creator attribution is inferred here. Add the appropriate credit and license details if they are available.
