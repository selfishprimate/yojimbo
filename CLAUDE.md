# Project: Yojimbo

Animated border beam effect for React. A glowing light trail that travels along the border of any element — like a samurai blade catching light.

## Architecture

- **Single component**: `<Yojimbo />` — drop it inside any `position: relative` element with `border-radius`
- **CSS keyframes**: shipped as `yojimbo/styles.css`, must be imported by the consumer
- **Zero runtime dependencies**: only React as peer dep
- **Build**: tsup → dual CJS/ESM + TypeScript declarations

## How It Works

1. A frame div sits on top of the parent with `position: absolute` and `overflow: hidden`
2. CSS `mask: content-box exclude` cuts out the interior — only the border-width strip is visible
3. Radial gradient blobs travel along the border using `offset-path: border-box`
4. Outer glow orbs (larger blur) follow the same path for ambient light
5. Two beams are offset by 50% so they're always on opposite sides

## Key Files

- `src/Yojimbo.tsx` — the component, all styles are inline React.CSSProperties
- `src/styles.css` — keyframes for `yojimbo-trail` and `yojimbo-trail-offset`
- `src/index.ts` — public exports

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `"#3B82F6"` | Beam color |
| `size` | number | `250` | Blob width in px |
| `speed` | number | `20` | Full loop duration in seconds |
| `thickness` | number | `1` | Visible border thickness in px |
| `blur` | number | `12` | Beam blur in px |
| `glowBlur` | number | `30` | Outer glow blur in px |
| `glowOpacity` | number | `0.7` | Outer glow opacity |
| `glow` | boolean | `true` | Show outer glow orbs |
| `beams` | 1 \| 2 | `2` | Number of beams |
| `className` | string | — | Additional CSS class |

## Development

```bash
npm run dev    # watch mode
npm run build  # production build
```

## Publishing

Use the `/publish` command to bump version, build, commit, push to GitHub, and publish to npm.
