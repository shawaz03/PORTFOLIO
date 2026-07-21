# SHANEX Portfolio — Design & Implementation Plan
### Next.js · GSAP · React Three Fiber · Framer Motion · Lenis

---

## 1. The Concept: "Signal Deck"

Don't design this as six separate animated sections. Design it as **one continuous instrument** the visitor is piloting through — like a console/HUD — and let each section be a different reading on that same instrument.

**The signature element:** a single persistent 3D object — call it **The Core** — that lives in a fixed R3F canvas behind/beside your content for the entire scroll. It never disappears; it *morphs* as the visitor scrolls:

| Section | The Core becomes |
|---|---|
| Hero | A reactive waveform/particle sphere pulsing with your intro video's audio |
| About | Slows into a calm rotating wireframe |
| Tech Stack | Fractures into a hex-lattice / node cluster (your logos live on the nodes) |
| Projects | Reforms into a beacon/scanner sweeping light across project cards |
| Certificates | Stacks into a deck of cards you can flip through |
| Contact | Extends into a signal tower / transmitter |

One GSAP timeline, driven by scroll progress, controls every morph. This is what makes the site feel *engineered* rather than "template + effects sprinkled on top" — which is the failure mode of most R3F portfolios (a spinning torus that means nothing, disconnected from the content).

A secondary HUD layer (corner brackets, a coordinate readout, section index, scroll %) frames the content in a monospace font. Make it real telemetry — actual scroll %, actual section name — not decoration. Since you're proving you can build serious interfaces, everything on screen should be *true*.

---

## 2. Design Tokens

Avoid the two default AI-portfolio looks (near-black + single neon accent, or warm-cream-serif). Here's a direction specific to SHANEX that still reads dark/technical without being generic:

**Color**
```
--void:    #0A0912   base background (near-black indigo, not pure black)
--deck:    #14121F   panel/section background — for depth against void
--signal:  #6E5CFF   primary accent — violet-blue, core glow, links, active states
--flare:   #FF7A45   secondary accent — warm coral, used ONLY for CTAs (resume, hire me, live links)
--pulse:   #3FE0C5   tertiary accent — cyan, reserved for "live/status" indicators (deployed dot, verified badge)
--ink:     #EDEBFA   primary text — cool off-white, not pure white
--dim:     #8B87A6   secondary text — captions, HUD labels, timestamps
```
Rule of thumb: signal = interactive, flare = "do this now," pulse = "this is live/real." Never mix all three in one component.

**Typography** (three roles, not two)
- **Display** — Clash Display or Cabinet Grotesk (variable weight). Big, tight tracking, headlines only. This is what gives the page personality — don't default to Inter for headlines too.
- **Body** — General Sans or Inter. Paragraphs, bios, descriptions.
- **Mono** — JetBrains Mono or Space Mono. HUD labels, section indices ("01 / 06"), tech stack tags, coordinates, timestamps. This is what sells the "console" concept — use it for anything that reads as *system output*.

**Layout**
- Full-bleed vertical scroll, Lenis-smoothed.
- Fixed HUD chrome (corner brackets + readouts) stays on screen throughout.
- The Core's canvas is `position: fixed`, content sections scroll over/beside it.
- Each section keeps consistent padding/grid so the HUD frame never jumps.

---

## 3. Dividing Work Between the Four Libraries

This is the part people get wrong — running Lenis, GSAP ScrollTrigger, Framer Motion, and R3F's own scroll handling simultaneously creates competing RAF loops, jank, and scroll desync. Give each one exactly one job:

- **Lenis** — owns the *only* smooth-scroll loop on the page. Nothing else touches scroll physics.
- **GSAP + ScrollTrigger** — owns scroll-*linked* animation: pinning, scrubbing, timelines tied to scroll position (including driving The Core's morph state). Sync it to Lenis manually so there's one source of truth:

```js
// app/providers/SmoothScroll.tsx
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

- **Framer Motion** — owns *discrete* UI motion: hover/tap states, modal/lightbox open-close, route/page transitions, staggered entrance of non-scroll-linked elements (nav, buttons). Not scroll scrubbing — GSAP is better at that.
- **R3F** — owns rendering only. It should not run its own scroll listener. Scroll progress is computed once by GSAP ScrollTrigger and pushed into a Zustand store; R3F components subscribe to that store and update the Three.js scene in `useFrame`. One source of truth = no fighting.

```js
// store/useScrollStore.ts
const useScrollStore = create((set) => ({
  progress: 0,
  section: 'hero',
  setProgress: (p, s) => set({ progress: p, section: s }),
}))
```

---

## 4. Project Structure

```
/app
  /(sections)
    Hero.tsx
    About.tsx
    TechStack.tsx
    Projects.tsx
    Certificates.tsx
    Contact.tsx
  layout.tsx
  page.tsx
/components
  /hud            → corner brackets, index readout, progress bar
  /core           → R3F Core object + morph state machine
  /ui             → buttons, badges, glass panels (shared design system)
/lib
  smoothScroll.ts → Lenis + GSAP ticker sync
  scrollTriggers.ts
/store
  useScrollStore.ts
/public
  /video/hero-intro.mp4 (+ .webm, + poster.jpg)
  /logos/*.svg
  /certificates/*.webp
  /resume/shanex-resume.pdf
```

---

## 5. Section-by-Section

### Hero — the video
- Frame the video inside a "viewport" panel (rounded glass border, subtle scanline overlay, corner brackets) rather than a plain full-bleed background — it should look like a transmission being received, not a stock hero banner.
- Load sequence: brief glitch/static-in effect (GSAP, ~0.6s) → viewport opens → video plays. This buys time for The Core to spin up too.
- Controls styled as HUD buttons (mute/unmute, replay), not default browser video controls.
- Cursor-reactive parallax tilt on the panel (Framer Motion `useMotionValue` + `useTransform`, small range — don't overdo it).
- Compress the video hard: H.264 mp4 *and* a webm fallback, poster frame for the first paint, `preload="metadata"`. This is the single heaviest asset on the page — treat it accordingly (see §6).

### About Me
- Keep this the calmest section — let The Core slow down here. Contrast sells the busier sections later.
- Short bio + a small "system status" style row (location, current focus, availability) in mono font — ties into the HUD language.

### Tech Stack — 3D constellation
- R3F scene: each logo on a flat card/plane (use SVG-to-texture or simple `<Html>` from drei if you want crisp vector logos instead of textures), grouped into loose clusters by category (Frontend / Backend / Tools) so it reads as a stack, not a random logo soup.
- Slow idle rotation; on scroll into view, nodes drift into cluster formation (GSAP-driven, positions interpolated).
- Hover a node → mono-font tag pops up with the tool name + your proficiency/context line, node glows in `--signal`.
- Mobile fallback: swap the 3D scene for a simple animated CSS/Framer grid — don't force WebGL on phones for this section, it's not worth the battery/perf cost.

### Projects — live deployed work
- One full-width panel per project. Each shows: looping screenshot/video capture of the live site (not just a static image — motion sells that it's real and deployed), title, 2-3 line description, tech tags (mono), and two buttons: **Visit Live** (`--flare`) and **Source** (outline).
- 3D tilt-on-hover per card (simple perspective transform via Framer Motion, not full R3F — this is the one place a lightweight CSS 3D trick beats a real 3D scene).
- GSAP ScrollTrigger with `pin: true` + `scrub` for the project cards to snap/stack as you scroll, if you want that premium feel — but only if you have 3-5 projects; with more than that, pinning gets tedious to scroll through.

### Certificates — 3D cards, not text
- Each certificate is a textured card mesh in R3F (image as texture, subtle rim-light/fresnel-ish gradient shader for a "holographic" edge — you don't need a custom GLSL shader, drei's `MeshTransmissionMaterial` or a simple gradient + Fresnel-based rim glow gets you 90% there).
- Default state: cards fanned like a hand of cards or stacked in a deck (ties back to The Core's "stack" morph state here).
- Drag or scroll to riffle through; click to flip/zoom into a detail view with issuer, date, and a "Verify" link if the cert has one.
- This is a good place to take "one real aesthetic risk" per the brief — it's the section most portfolios do worst (a boring image grid), so doing it as an actual 3D object is your differentiator.

### Contact + Resume
- The Core becomes a transmitter/tower here — visual payoff for reaching the end.
- Glass-panel contact form (name/email/message), styled to match the HUD language, not a generic bordered input.
- Resume: frame it as a real download action with weight — e.g. "Download Resume" styled as a flight-manual/dossier pull, not a plain link. Show file size/format next to it in mono font (small detail, reads as intentional).
- Social/contact links as a coordinate list (mono font labels: `EMAIL →`, `GITHUB →`, `LINKEDIN →`).

---

## 6. Performance & Accessibility — non-negotiable given the stack

This combination (video + WebGL + heavy scroll-linked animation) can tank Lighthouse scores fast if you're not careful:

- **Video**: compress aggressively, provide a poster image, `next/dynamic` import anything video-adjacent that isn't needed for first paint.
- **R3F**: lazy-load the Canvas with `next/dynamic({ ssr: false })`. Keep polygon counts low — you don't need dense geometry for a wireframe "Core," low-poly reads *more* premium in this aesthetic, not less.
- **One R3F canvas total**, not one per section. Multiple WebGL contexts is the #1 mobile-crash cause in portfolio sites like this.
- **`prefers-reduced-motion`**: detect it and drop to fades/no-parallax — legally and ethically worth doing, and judges/recruiters do check.
- **Mobile**: disable the constellation/3D scenes below a breakpoint or on low-end GPUs (`navigator.hardwareConcurrency` / a simple WebGL capability check), fall back to CSS/Framer equivalents. Nobody wants a 40MB WebGL scene on a 4G connection.
- Run Lighthouse before you consider any section "done" — not just at the end.

---

## 7. Suggested Build Order

1. **Content prep** (do this before any code): final-cut hero video, write About/bio copy, gather project screenshots + live URLs, export certificate images, finalize resume PDF.
2. **Scaffold**: Next.js app, Tailwind config with the tokens above, load fonts, wire Lenis + GSAP ticker sync (§3).
3. **HUD shell**: corner brackets, section index, scroll progress bar — build this first since every section sits inside it.
4. **Hero**: video viewport + load-in sequence.
5. **The Core v1**: get a single wireframe object rendering and rotating — don't build the full morph state machine yet, just get R3F + Zustand talking to GSAP ScrollTrigger.
6. **About + Tech Stack**.
7. **Projects**.
8. **Certificates** (build this after Projects — it reuses a lot of the same card/tilt patterns).
9. **Contact + resume + footer**.
10. **Core v2**: now wire up the full morph timeline across all sections, since all the section anchors exist.
11. **Performance + accessibility pass** (§6), then deploy (Vercel — trivial for Next.js).

---

## 8. Package List

```bash
npm install three @react-three/fiber @react-three/drei
npm install gsap
npm install framer-motion
npm install lenis
npm install zustand
npm install clsx tailwind-merge
```

---

**One honest note:** build The Core and the HUD shell first, on a blank page, before touching any section content. If that core mechanic doesn't feel good to scroll through on its own, no amount of section polish will fix it — and it's much cheaper to iterate on now than after six sections are built around it.
