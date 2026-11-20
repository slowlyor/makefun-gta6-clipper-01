// makefun-gta6-clipper-01 — entry program (Node 22, standard library only).
//
// The entry itself is the YouTube Short: a 38-second vertical clip cut from
// Rockstar's official GTA VI Trailer 2 (the trailer's final chase run —
// airboat and helicopter through the Leonida swamps, Jason and Lucia on a
// jetski under the Vice City skyline, a motorcycle under a low-flying plane),
// which then turns to the viewer and pitches make.fun. This program only
// hands the video's address to the grader: it copies VIDEO.json from the
// repository root into the output directory, where the gate reads it.
// No network, no clock, no files outside the repository.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Read the link first and fail loudly on a bad VIDEO.json, so a broken
// placeholder never gets copied through as if it were a real entry.
const raw = readFileSync(join(BOT_DIR, "VIDEO.json"), "utf8");
const video = JSON.parse(raw) as { url?: unknown };
if (typeof video.url !== "string" || !video.url.startsWith("https://")) {
  throw new Error("VIDEO.json must hold a YouTube URL in its url field");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, "VIDEO.json"), join(OUTPUT_DIR, "VIDEO.json"));
