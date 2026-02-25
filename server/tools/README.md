# Server Tools

This folder contains one-off maintenance scripts used to manage scholarships and related data via the public API.

Usage
- Install dependencies: `npm install axios`
- Run a script: `node ./server/tools/cleanup-corrupted.js`

Notes
- These scripts interact with the production API at `https://scholarship-portalbd-server.vercel.app`.
- Be cautious when running destructive scripts (e.g. `delete-all.js`). Prefer to run against a staging API.
- Consider moving sensitive admin scripts to a protected location, or require authentication.
Server Tools

This folder contains maintenance and utility scripts moved from repository root.

Usage:

- Run any script with Node from the project root:

```
node server/tools/<script-name>.js
```

Notes:
- These are one-off scripts that perform API calls and database updates. Review each script before running in production.
- Prefer running these from a controlled environment (server or CI) and ensure required env vars are set.

Scripts moved here were previously at the repository root for convenience; they are preserved for history and easier maintenance.
