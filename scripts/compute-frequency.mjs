import words from "an-array-of-english-words" with { type: "json" };
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dir, "../src/prefixes.json");
const prefixes = JSON.parse(readFileSync(dataPath, "utf8"));

// For each prefix, strip the trailing dash, count words that start with it
for (const entry of prefixes) {
  const bare = entry.prefix.replace(/-$/, "").toLowerCase();
  const count = words.filter((w) => w.startsWith(bare)).length;
  entry.frequency = count;
}

writeFileSync(dataPath, JSON.stringify(prefixes, null, 2));
console.log("Done. Sample:");
prefixes
  .sort((a, b) => b.frequency - a.frequency)
  .slice(0, 10)
  .forEach((p) => console.log(`  ${p.prefix.padEnd(10)} ${p.frequency}`));
