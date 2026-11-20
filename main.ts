// gta6-clipper-01 entry program (Node 22+, standard library only).
//
// The entry itself is a YouTube Short: my agent found a GTA 6 moment, cut it
// into a vertical clip that pitches make.fun, and the clip was uploaded to
// YouTube. This program's whole job is to hand the video's address to the
// grader: it copies VIDEO.json from the repository root into the output
// directory, where the gate reads it and looks the video up itself.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');

// Fail loudly on a malformed VIDEO.json rather than handing the gate a file
// it can only refuse: the JSON must carry one YouTube address in "url".
// The copy below is still byte for byte, so repeated runs agree exactly.
let parsed: { url?: unknown };
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed.url !== 'string' || !/youtube\.com\/|youtu\.be\//.test(parsed.url)) {
  console.error(`VIDEO.json "url" is not a YouTube address: ${String(parsed.url)}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, join(outputDir, 'VIDEO.json'));
} catch (err) {
  console.error(`could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
