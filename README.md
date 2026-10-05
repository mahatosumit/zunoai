# ZunoAI / Agent AI

Assistive AI research and product workspace. The repository includes the Agent AI marketing experience, Three.js scenes, product films, concept renders, QA captures, and the supporting ZUNOBOT research paper.

## Project structure

- **`zunobot-web/`** — Next.js 16 App Router website using React 19, Motion, Three.js via react-three-fiber, Drei, and Phosphor icons.
- **`zunobot-web/public/`** — local image and video assets used by the site.
- **`ZUNOBOT  Paper for conference.docx`** — research and product documentation.
- **`qa/`** — visual QA captures and reference frames from `ui design.mp4`.

## Start the website

```bash
cd zunobot-web
npm install
npm run dev
```

Open `http://localhost:3000`. For a production check:

```bash
npm run lint
npm run build
npm start
```

The app is designed for preview hosting: it binds to `0.0.0.0` when launched with `npm run dev -- --hostname 0.0.0.0`, uses relative/local assets, and keeps WebGL and reduced-motion fallbacks in place.
