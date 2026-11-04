---
name: gymduo-design
description: Use when designing or changing the GymDuo interface (assets/styles.css, markup in assets/app.js, UI copy) to keep its visual system, mobile layout and product rules consistent.
---

# GymDuo design

GymDuo is a mobile-first PWA for logging gym routines, sync, streaks and progress. Vanilla HTML/CSS/JS, one screen at a time, dark and light themes, Spanish copy. This skill is the source of truth for UI work; read `assets/styles.css` before changing anything.

## Product rules (non-negotiable)

- **No person names outside Entreno.** Inicio and Ajustes never show "Persona 1/2", avatars or "Entreno como". Names appear only in Entreno when the space has 2+ members, because sets are logged for each other.
- **No second person.** Avoid "tú", "tu", "tus", "te", "ti" in UI copy. Prefer neutral labels: "Grupos", "Rutina", "Código", "La racha y el progreso no cambian".
- **Inicio opens with a greeting, not a name:** `Buenos días / Buenas tardes / Buenas noches`, then the weekly streak and sessions done.
- **Streak is weekly, not daily.** Count weeks that reach the weekly goal (`goal()`); missing a day must not break it. Show one flame per trained day in the current week.
- **One motivational phrase**, rotating by day of year (`MOTIV`), no name interpolation.
- **Empty states always have an action** (create routine, load example, join code). Never a dead end.
- Taps: minimum 44px effective height; visual chips may be 38px with padding.
- Respect `env(safe-area-inset-*)` on top, bottom and fixed bars.

## Tokens (never hardcode)

`--bg --card --ink --mut --line --ac --acs --onac --ok --oks --gold --golds --r --ease`

- Light: bg `#f5f5f8`, card `#fff`, ink `#111116`, line `#e7e7ee`, accent `#4a3df0`.
- Dark: bg `#0b0b0f`, card `#15151b`, ink `#f3f3f7`, line `#26262f`, accent `#8f86ff`.
- Accent variants come from the space/profile: `data-p="m"` pink, `data-p="a"` blue.
- Use `color-mix(in srgb, var(--bg) 94%, var(--ink))` for grounds; no raw hex in components.
- Never put an accent color on primary buttons: primary is `--ink` on `--bg` (works with pastel accents). Status colors only mean status.

## Type

One family: Manrope, fallback system. `font-variant-numeric: tabular-nums` globally.

- Screen title `.nm`: 25px / 800 / -0.035em.
- Card title: 19px / 800 / -0.025em.
- Exercise name: 16.5px / 800.
- Body and inputs: 15px.
- Chips: 13.5px / 600. Muted `.pt`: 13px / 500, line-height 1.4.
- Stat labels: 11.5–12px / 600.
- One big number per screen, never two competing heroes.
- Sentence case; no all-caps labels except tiny badges (`.you` style).
- Small text keeps line-height ≥ 1.3 and 8px insets.

## Layout

- Content padding: `12px 14px`; cards 16px padding; gap 10px between cards.
- `main` bottom padding: `calc(104px + safe-area)` so the fixed nav never covers content.
- Width: full on mobile; from 520px, a centered 430px column with 1px side borders. Do not reintroduce the fake phone frame or hide-width scrollbars.
- Fixed layers: nav bottom 8px, `#rest` 150px, `#fab` 92px, `#toast` 160px. Center them with the column on desktop.
- Header `#top` is sticky, blurred, bottom border; 14px side padding, safe-area top.
- Never let horizontal overflow appear: check `document.documentElement.scrollWidth === innerWidth` at 320, 360 and 390.

## Components

- `.card`: `--card`, radius 22, 1px `--line`, padding 16, soft shadow; `h2` 19/800.
- `.chip`: pill 999, 38px, border `--line`, `flex:none`; active = `--ink` fill with `--bg` text.
- `.seg`: 4px inner padding, 40px buttons, active pill `--ink`.
- Set rows: header `.seth` (`# · Peso · Reps`), grid `18px 1fr 1fr`; `.kg` uses `--bg` inset, ± buttons 28×38, value 17/700; completed state `--oks`/`--ok`.
- Routine editor: `.edh` header + `.sub.ed` grid `1fr 38px 38px 38px 28px`; numeric inputs 40px; delete 28px.
- Primary `.btn`: `--ink` fill, `--bg` text, full width inside cards; secondary `.btn.s`: transparent + border.
- Streak block `.rk`: flame tile 44px in `--acs`, number 28–30/800, label 13/600 muted; week strip `.dots` with 30px cells, flame SVG on trained days, today outline `--ink`; phrase `.mot` separated by a top border, 12.5px italic muted.
- Icons: inline SVG, one family, 14–26px, stroke consistent. Emoji are content, not icons. No invented logos.
- Active nav item: pill `--ink`; nav blur, radius 24, 10px side insets.

## Motion

- View change only: `enterAnim()` fades/translates direct `#main` children, 480ms, 40ms stagger (max 4), `cubic-bezier(.2,.8,.2,1)`, keyed by `[tab,p,w,d,editR,code]`.
- Never animate on every `render()`; never `animation` on `main > *` via CSS.
- Respect `prefers-reduced-motion`; keep press feedback subtle (scale/opacity).
- Motion must have a cause: view change, series completion, panel opening.

## Craft checklist

- Count the real strings; no filler rows or bars where words belong.
- One accent surface per view; quiet grays; no gradient/glow unless it tells the story.
- Align reading edges; 8–16px between text and its box; no 1–3px near-tangents.
- Labels and values match in weight and size; numbers tabular.
- Contrast checked in both themes; depth on dark comes from lighter surfaces, not heavy shadows.
- Don't stack CSS overrides: edit the existing rule or token.
- Copy stays short: a title, a value, an action. No repeated confirmation.

## Before finishing

1. `node --check assets/app.js` (and `sw.js` if touched).
2. Open at 320, 360 and 390 widths plus a 900×600 window; verify no horizontal scroll, nav clear of content, no clipped text.
3. Finish animations before screenshots: `document.getAnimations().forEach(a=>{try{a.finish()}catch(e){}})`.
4. Check console: only the expected Supabase 404 while tables are missing.
5. Bump the service worker cache (`rutina-vN`) when CSS/JS change.
