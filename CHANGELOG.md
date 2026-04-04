# Changelog

All notable changes to this project will be documented in this file.

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
