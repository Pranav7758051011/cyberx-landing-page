# CYBERX — The Future Is Hybrid

A premium, futuristic cyborg-themed responsive landing page built with pure HTML5, CSS3 and vanilla JavaScript — no frameworks, no libraries.

## Highlights

- Cinematic hero with an animated SVG "neural-core" figure, floating tech cards, orbiting rings, mouse-reactive parallax and an animated grid background
- Sticky, blurred, scroll-aware navbar with active-section highlighting and a mobile hamburger menu
- Glassmorphism cards throughout (about, features, stats, testimonials, contact)
- Premium feature cards with hover glow, gradient icon tiles and index numbering
- Dashboard-style statistics with animated count-up and trend indicators
- Futuristic evolution timeline with an animated fill line and glowing dots
- Six-item cyber gallery with generated gradient-mesh art, hover zoom, overlay and captions
- Glass testimonial slider with avatars, star ratings, arrows and dot navigation
- Smooth accordion FAQ
- Contact section with floating-label inputs, a styled map placeholder and social links
- Full footer with quick links, newsletter form and a back-to-top button
- Loading screen, cursor glow, scroll progress bar, scroll-reveal animations and button ripple effects
- Fully responsive: desktop, laptop, tablet and mobile
- Respects `prefers-reduced-motion` and keeps visible keyboard focus states

## A note on images

This build has no way to fetch or generate real photographs, so the hero visual and the six gallery tiles are built as **generated SVG/CSS cyber-art** (gradient meshes, wireframe illustrations, glow layers) instead of stock placeholder images. This was a deliberate design choice — it looks intentional rather than like a broken `<img>` tag, and matches the premium sci-fi direction of the brief.

Every gallery tile and the hero already have `<img>` tags wired to `assets/images/` (e.g. `gallery1.png` … `gallery6.png`, `hero.png`). If you drop real photos into those paths, they will automatically render on top of the generated art — no code changes needed.

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox, keyframe animations, glassmorphism)
- Vanilla JavaScript (IntersectionObserver, no libraries)
- Font Awesome 6.6
- Google Fonts — Orbitron (display) + Poppins (body)

## Folder Structure

```
cyberx-landing-page/
│
├── assets/
│   ├── images/      ← drop hero.png / gallery1-6.png here to replace generated art
│   ├── icons/
│   └── videos/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Running Locally

No build step required. Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Author

Pranav Bade
