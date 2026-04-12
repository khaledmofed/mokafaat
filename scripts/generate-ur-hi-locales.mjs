/**
 * Generates src/locale/ur.json and src/locale/hi.json from en.json
 * using google-translate-api-x (machine translation).
 * Run: npm run locales:ur-hi
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translate } from "google-translate-api-x";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const enPath = path.join(root, "src/locale/en.json");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function collectStrings(obj, set) {
  if (typeof obj === "string") {
    set.add(obj);
    return;
  }
  if (obj && typeof obj === "object") {
    for (const v of Object.values(obj)) collectStrings(v, set);
  }
}

function applyMap(obj, map) {
  if (typeof obj === "string") return map.get(obj) ?? obj;
  if (Array.isArray(obj)) return obj.map((x) => applyMap(x, map));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = applyMap(obj[k], map);
    return out;
  }
  return obj;
}

async function translateSafe(text, to) {
  if (text === "" || text == null) return text;
  const trimmed = String(text).trim();
  if (!trimmed) return text;
  try {
    const res = await translate(text, { from: "en", to, forceTo: true });
    return res.text;
  } catch (e) {
    console.warn(`translate failed (${to}):`, text.slice(0, 60), e.message);
    return text;
  }
}

async function main() {
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const uniq = new Set();
  collectStrings(en, uniq);
  const list = [...uniq].sort((a, b) => b.length - a.length);

  const mapUr = new Map();
  const mapHi = new Map();

  let i = 0;
  for (const s of list) {
    i += 1;
    process.stdout.write(`\r${i}/${list.length} unique strings`);
    const [u, h] = await Promise.all([
      translateSafe(s, "ur"),
      translateSafe(s, "hi"),
    ]);
    mapUr.set(s, u);
    mapHi.set(s, h);
    await delay(120);
  }
  console.log("\nWriting files…");

  fs.writeFileSync(
    path.join(root, "src/locale/ur.json"),
    JSON.stringify(applyMap(en, mapUr), null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(root, "src/locale/hi.json"),
    JSON.stringify(applyMap(en, mapHi), null, 2),
    "utf8"
  );
  console.log("Done: src/locale/ur.json, src/locale/hi.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
