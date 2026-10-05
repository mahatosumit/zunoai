# ZUNOBOT Website

Marketing site for ZUNOBOT, a modular and explainable assistive robot for
personal care. Built with Next.js 16 (App Router), Tailwind CSS v4,
Three.js via react-three-fiber, Motion, and Phosphor icons.

## Run

```bash
npm install
npm run dev      # development at http://localhost:3000
```

```bash
npm run build
npm start        # production server
```

Note: this project pins `allow-scripts` in `.npmrc` (required by npm 11+
postinstall policy on this machine). Do not remove it.

## Structure

```
src/
  app/
    layout.tsx          fonts (Space Grotesk + JetBrains Mono), metadata
    page.tsx            section composition
    globals.css         design tokens (@theme), primitives, keyframes
  components/
    Nav.tsx             floating pill nav, reading progress bar, mobile menu
    Hero.tsx            split hero with lazy-loaded 3D scene + step strip
    Chapters.tsx        sticky-stack narrative cards with pointer 3D tilt
    System.tsx          L1-L4 architecture tabs + node map (SVG wires)
    Hardware.tsx        front/side/rear concept renders, auto-cycling gallery
    ExplainConsole.tsx  live HMI mock: diagnostics, state ring, typewriter chat
    Showreel.tsx        product vision film, scroll parallax + play control
    BuiltWith.tsx       infinite tech marquee (pauses on hover)
    Together.tsx        care-network split with 3D orbit scene
    Compare.tsx         comparison table (shimmer row) + count-up stats
    Footer.tsx          reservation CTA + footer
    three/
      RobotScene.tsx    3D ZUNOBOT (white/blue/teal, matches the product film)
      NetworkOrbit.tsx  3D care-network orbit for the Together section
```

## Media

- `public/videos/product-film.mp4` is the team's ZUNOBOT vision film
  (`zunobot.mp4` in the workspace), with `product-film-poster.jpg` as its
  poster frame.
- `public/images/robot-{front,side,rear}.jpg` are the concept renders of
  the full-scale unit (shown in the Hardware section).
- Other renders in `public/images/*.png` were extracted from the team's
  design-reference material.
- The two animated visuals are live react-three-fiber scenes: the robot in
  the hero (recolorable to track the product design) and the care-network
  orbit. Both lazy-load, both fall back to a static render when WebGL is
  unavailable, and both honor `prefers-reduced-motion`.

## Design system

- Ink `#070503` / panel `#0e0b08` / cream `#f2ece2`
- Single accent: ember `#ff7a1c`
- Radius rule: cards 16px, panels 24px, tiles 14px, buttons pill
- Type: Space Grotesk display + JetBrains Mono for labels/numbers
- All motion honors `prefers-reduced-motion`
