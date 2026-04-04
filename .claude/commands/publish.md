Publish a new version of yojimbo to GitHub and npm.

## Steps

1. Ask the user what version bump this is: `patch`, `minor`, or `major`
2. Run `npm run build` to ensure a clean build
3. Run `npm version <patch|minor|major>` to bump the version in package.json and create a git tag
4. Commit all changes (if any uncommitted work exists beyond the version bump)
5. Push to GitHub: `git push && git push --tags`
6. Publish to npm: `npm publish --access public`
   - If npm requires OTP, ask the user for the code and retry with `--otp=<code>`
7. Report the new version number and confirm both GitHub and npm are updated
