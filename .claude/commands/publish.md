Publish a new version of yojimbo to GitHub and npm.

## Steps

1. Ask the user what version bump this is: `patch`, `minor`, or `major`
2. Ask the user for a brief summary of what changed
3. Update `CHANGELOG.md`:
   - Add a new section at the top (below the header) with the new version number and today's date
   - Categorize changes under `### Added`, `### Changed`, `### Fixed`, or `### Removed` as appropriate
   - Use the user's summary and git diff to write clear, concise changelog entries
4. Run `npm run build` to ensure a clean build
5. Commit all changes including the CHANGELOG update
6. Run `npm version <patch|minor|major>` to bump the version in package.json and create a git tag
7. Push to GitHub: `git push && git push --tags`
8. Publish to npm: `npm publish --access public`
   - If npm requires OTP, ask the user for the code and retry with `--otp=<code>`
9. Report the new version number and confirm both GitHub and npm are updated
