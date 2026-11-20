// makefun-gta6-clipper-01 — entry program (Node 22, standard library only).
//
// The entry itself is the YouTube Short: a 47-second vertical clip cut from
// MKIceAndFire's GTA 6 gameplay walkthrough (source moment 01:30:04–01:30:51)
// — the first sunset highway drive through Leonida, an orange taxi on a
// purple-pink sunset highway past the toll plaza and up onto the bridge,
// opening with the hook "GTA 6 IS FINALLY HERE" and closing with a make.fun
// pitch in its last 7 seconds. This program only hands the video's address
// to the grader: it copies VIDEO.json from the repository root into the
// output directory, where the gate reads it.
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
