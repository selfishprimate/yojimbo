# Contributing to Yojimbo

Thanks for your interest in contributing! Here's how to get started.

## Development setup

```bash
git clone https://github.com/selfishprimate/yojimbo.git
cd yojimbo
npm install
npm run dev
```

`npm run dev` starts tsup in watch mode — it rebuilds on every file change.

## Testing locally

Link the package to a local React project:

```bash
# In the yojimbo directory
npm link

# In your React project
npm link yojimbo
```

## Making changes

1. Fork the repo and create a branch from `main`
2. Make your changes in `src/`
3. Test locally with `npm link` in a real project
4. Run `npm run build` to ensure a clean build
5. Submit a pull request

## Code style

- TypeScript strict mode
- Inline styles (React.CSSProperties) — no external CSS dependencies
- Keep the component self-contained: keyframes are injected at runtime
- No runtime dependencies beyond React

## Pull request guidelines

- Keep PRs focused — one feature or fix per PR
- Update the props table in README.md if you add/change props
- Add JSDoc comments to new props in the interface
- Test in both light and dark backgrounds

## Reporting bugs

Open an issue with:
- Browser and version
- A minimal reproduction (CodeSandbox or similar)
- What you expected vs what happened

## Feature requests

Open an issue describing the use case. Screenshots or references to similar effects are helpful.
