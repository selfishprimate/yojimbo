# Changelog

All notable changes to this project will be documented in this file.

## [2.0.1] - 2026-04-06

### Changed
- Added featured image to README.
- Added SEO meta tags and OG image to website.

## [2.0.0] - 2026-04-06

### Changed
- **BREAKING:** `speed` prop now controls actual speed — higher values mean faster animation (previously it was duration in seconds, so higher meant slower). Default value (20) produces the same result as before.
- **BREAKING:** `direction="counterclockwise"` now swaps `colorFrom` and `colorTo` so the leading edge color always matches the direction of travel.
- Glow orbs now always stay ahead of the lead beam regardless of direction.
- Animation properties use individual CSS properties instead of shorthand to prevent direction override.

### Added
- Website with landing page, live examples (Button, Card, Search Input), and interactive Playground.
- Playground page with real-time prop controls (color pickers, sliders, toggles) and copyable code output.

## [1.0.1] - 2026-04-04

### Added
- `colorFrom` / `colorTo` dual-color beam system with screen blend mode
- `colorFromSize` / `colorToSize` for individual blob sizing
- `direction` prop: `"clockwise"` or `"counterclockwise"`
- `glow` prop with `glowBlur` and `glowOpacity` controls
- `beams` prop to choose 1 or 2 beams
- `thickness` prop for border width control
- Self-contained keyframe injection — no CSS import needed
- README with full documentation, usage examples, and props table

### Changed
- Beam uses circular blobs with `offset-rotate: 0deg` for smooth corners
- Glow uses `colorFrom` only for consistency
- Blend mode changed from `plus-lighter` to `screen` for natural color mixing

## [0.2.0] - 2026-04-04

### Changed
- Keyframes injected at runtime via `useEffect` — removed CSS file requirement
- Single import: `import { Yojimbo } from "yojimbo"`

## [0.1.0] - 2026-04-04

### Added
- Initial release
- Animated border beam using CSS `offset-path: border-box`
- Mask-based border rendering with `content-box exclude`
- Configurable `color`, `size`, `speed`, `blur`, `thickness`
- Outer glow orbs
- Two counter-positioned beams
