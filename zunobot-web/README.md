# Agent AI marketing site

A production-ready, motion-led landing page for Agent AI: a coordinated system of specialist agents that understands context, reasons over work, and turns intent into action. The visual language follows `../ui design.mp4` — near-black surfaces, warm cream typography, ember accents, glassy navigation, and responsive 3D scenes.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production verification:

```bash
npm run lint
npm run build
npm start
```

The project pins `allow-scripts` in `.npmrc` for npm 11+ postinstall policy on this machine. Keep that setting in place.

## Experience map

- `src/app/page.tsx` composes the page: hero, initiative, agents, stories, ecosystem, pricing, collective, and footer.
- `src/components/Nav.tsx` provides the desktop glass nav, product menu, announcement rail, and mobile menu.
- `src/components/Hero.tsx` combines the animated headline, capability HUD, step rail, and the main Three.js robot scene.
- `src/components/Agents.tsx` is the specialist-agent switcher with a live 3D icon stage.
- `src/components/Ecosystem.tsx` and `src/components/three/*` power the interactive architecture map and orbit scenes.
- `src/components/ExplainConsole.tsx` is a reusable explainability/HMI surface with a reduced-motion transcript fallback.
- `src/app/globals.css` contains the design tokens, motion primitives, grain treatment, responsive styles, and accessibility fallbacks.

## Production notes

- Three.js scenes are dynamically imported with SSR disabled, so the server-rendered page remains fast and deterministic.
- The hero checks for WebGL after first paint and falls back to `/images/hero-robot.png` when the browser cannot create a context.
- Particle fields use deterministic sequences rather than `Math.random()` during render, avoiding hydration drift.
- `prefers-reduced-motion` disables decorative loops and swaps the console to a static transcript.
- Fonts intentionally use a local system stack so `next build` does not depend on Google Fonts being reachable at build time.
- Video and image assets are local, served from `public/`, and use responsive `next/image` sizing where applicable.
