# Project Context: CICtards_portRollio

## Description
A Next.js-based portfolio and team showcase project for "CICtards". The project features a **Retro Arcade** aesthetic with neon colors, CRT effects, and pixel-inspired design elements.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, Vanilla Tilt
- **Language:** JavaScript
- **Fonts:** Custom fonts (e.g., `videotype.woff`)

## Visual Theme
- **Style:** Retro Arcade / Cyberpunk
- **Effects:** CRT scanlines, pulse animations, retro grids, high-contrast gradients (Yellow, Green, Red).
- **Interactions:** Spotlight cards, tilt effects on member cards, smooth scroll.

## Key Components
- `app/page.js`: Main landing page housing the `Hero` and `TeamGrid`.
- `components/Hero.js`: Retro-themed landing section with "INSERT COIN" vibe.
- `components/TeamGrid.js`: Grid layout for displaying team members.
- `components/MemberCard.js`: Detailed card component for individual members with skills and bio.
- `components/ui/`: Reusable UI components like `SpotlightCard`, `TiltCard`, `GeometricAvatar`.

## Data
- `data/members.js`: Contains an array of member objects (name, role, bio, skills, portfolio).
