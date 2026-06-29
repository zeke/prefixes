# prefixes

Greek and Latin prefix flashcards, deployed as a Cloudflare Worker.

Live at [prefixes.ziki.boo](https://prefixes.ziki.boo)

![screenshot](screenshot.jpg)

## Pages

- `/` — flashcard UI, shuffled deck, flip to reveal meaning
- `/cheatsheet` — sortable, filterable table of all prefixes

## Development

```sh
npm install
npx wrangler dev
```

## Deploy

```sh
npx wrangler deploy
```

## Data

Prefix data lives in `src/prefixes.json`. Each entry has:

```json
{
  "prefix": "anti-",
  "origin": "Greek",
  "script": "ἀντί-",
  "meaning": "against, opposite",
  "examples": ["antibiotic", "antidote", "antivirus"],
  "frequency": 312
}
```

Frequency counts are computed by `scripts/compute-frequency.mjs` using [an-array-of-english-words](https://www.npmjs.com/package/an-array-of-english-words). They're a rough proxy — re-run the script after editing prefixes:

```sh
node scripts/compute-frequency.mjs
```

See [AGENTS.md](./AGENTS.md) for notes on working in this codebase with an AI agent.
