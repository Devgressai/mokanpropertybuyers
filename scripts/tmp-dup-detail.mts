import { contentRegistries } from "../src/data/content-registry.js";

type Entry = { slug: string; paragraph: string };
const all: Entry[] = [];
for (const map of contentRegistries) {
  for (const page of Object.values(map) as any[]) {
    for (const paragraph of page.body as string[]) {
      all.push({ slug: page.slug, paragraph });
    }
  }
}

const STRIDE = 1;
const windows = new Map<string, Entry>();
const pairSeen = new Set<string>();

for (const entry of all) {
  const { slug, paragraph } = entry;
  for (let i = 0; i + 160 <= paragraph.length; i += STRIDE) {
    const w = paragraph.slice(i, i + 160);
    const prior = windows.get(w);
    if (prior && prior.slug !== slug) {
      const key = [prior.slug, slug].sort().join(" <-> ");
      if (!pairSeen.has(key)) {
        pairSeen.add(key);
        console.log("=".repeat(80));
        console.log("PAIR:", key);
        console.log("--- A (" + prior.slug + ") ---");
        console.log(prior.paragraph);
        console.log("--- B (" + slug + ") ---");
        console.log(paragraph);
      }
    }
    windows.set(w, entry);
  }
}
