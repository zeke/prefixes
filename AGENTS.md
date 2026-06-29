# AGENTS.md

Notes for AI agents working in this repo.

## Stack

- Cloudflare Worker (no framework), TypeScript
- Single entrypoint: `src/index.ts`
- Prefix data: `src/prefixes.json`
- Config: `wrangler.jsonc`
- No bundler, no build step — wrangler handles TypeScript directly

## Commands

```sh
npx wrangler dev        # local dev server
npx wrangler deploy     # deploy to prefixes.ziki.workers.dev
node scripts/compute-frequency.mjs  # recompute frequency counts in prefixes.json
```

## Architecture

The worker serves two HTML pages from a single `fetch` handler:

- `GET /` — flashcard UI (`flashcardsHtml()`)
- `GET /cheatsheet` — sortable table (`cheatsheetHtml()`)

Both pages are returned as inline HTML strings. There are no static assets, no KV bindings, no external APIs. All prefix data is serialized into the HTML at deploy time via `JSON.stringify(PREFIXES)`.

## Flashcard UI

- Cards slide in/out on navigation using CSS keyframe animations on `.card-wrap`
- The 3D flip uses CSS `rotateY` on `.card` with `preserve-3d`
- `perspective` must stay on `.scene` (the fixed container), not on `.card-wrap` (which moves during slide) — moving perspective causes a "book spine" effect
- Flip state is tracked with `data-flipped="0|1"` on `.card`, not a CSS class, to survive animation restarts
- Keyboard: space/enter to flip, arrow keys to navigate

## Data

- To add or edit prefixes, edit `src/prefixes.json` directly
- Run `node scripts/compute-frequency.mjs` to update `frequency` values after edits
- Frequency is used for default sort order on the cheatsheet; it's approximate

## Style

- Font: Libre Baskerville (loaded from Google Fonts)
- Colors: warm off-white bg `#fafaf8`, card bg `#f0ede8`, muted `#999`
- No external CSS frameworks
- Keep both pages consistent with `SHARED_CSS`

## Deployment

Deployed to `prefixes.ziki.workers.dev` under the `Sikelianos@gmail.com` Cloudflare account.
Worker name is `prefixes`. No custom domain.
