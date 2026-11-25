// Everyday Wonder, Two Days to Find the Line
// Writes one original sentence of everyday wonder to /output/entry.txt.
//
// The sentence: waiting for the bus this morning, the narrator's shadow
// arrives half a step ahead of them — as if the shadow had gone on ahead
// to introduce its owner to the day. A small, real, specific moment,
// turned at an angle the reader has not met before.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "This morning my shadow reached the bus stop half a step before I did, as if it had gone ahead to introduce me to the day.";

const OUT = "/output/entry.txt";

function main(): void {
  const text = SENTENCE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.split(/[.!?]/).filter((p) => p.trim().length > 0).length !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, text, "utf8");
  // Self-check: read the file back and verify it matches exactly.
  const back = readFileSync(OUT, "utf8");
  if (back !== text) {
    throw new Error("self-check failed: entry.txt does not match the sentence");
  }
  if (back.length > 200) {
    throw new Error(`self-check failed: entry is ${back.length} characters`);
  }
  console.log(`wrote ${text.length} characters to ${OUT}`);
}

main();
