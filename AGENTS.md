<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-system-rules -->
# Design system

This project follows the design language documented in [`DESIGN.md`](./DESIGN.md) (a Stripi-inspired financial-infrastructure brand). **Read `DESIGN.md` before writing or editing any UI**, and treat it as the source of truth for color, typography, spacing, radius, and component styling.

Non-negotiables, summarized:
- **Color:** deep-navy ink `#0d253d` for body text (never pure black); indigo `#533afd` reserved for filled CTAs and link emphasis only (one filled pill per band) — never as body-text color. Surfaces are white `#ffffff` / cool off-white `#f6f9fc`; warm cream `#f5e9d4` for interlude bands. Hairlines `#e3e8ee`.
- **Type:** Inter (Sohne substitute) at weight **300** for all display/body, with negative letter-spacing on display sizes. `font-feature-settings: "ss01"` globally; `"tnum"` on every money/numeric cell.
- **Shape:** all buttons and tag pills are pill-shaped (`9999px`) with `8px 16px` padding; cards use `12px` radius with a 1px hairline border.
- Design tokens live as CSS variables in [`app/globals.css`](./app/globals.css).
<!-- END:design-system-rules -->
