const fs = require("fs");
const path = require("path");

const guides = require("../../data/guides.json");

function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// 1) Build the "needs work" list from the LIVE data
const need = []; // {guide, name, name_es, len, en, es}
for (const g of guides) {
  if (!g || !g.id || !Array.isArray(g.verdictProsCons)) continue;
  for (const p of g.verdictProsCons) {
    const en = Array.isArray(p.cons) ? p.cons.length : 0;
    const es = Array.isArray(p.cons_es) ? p.cons_es.length : 0;
    const len = Math.max(en, es);
    if (len < 4) need.push({ guide: g.id, name: p.name, name_es: p.name_es || "", len, en, es });
  }
}

// 2) Load written part keys
const partFiles = fs.readdirSync(__dirname).filter((f) => /^part\d+\.js$/.test(f));
const written = new Set();
for (const f of partFiles) {
  const m = require(path.join(__dirname, f));
  for (const k of Object.keys(m)) written.add(norm(k));
}

// 3) Match
function keyOf(e) {
  return norm(e.guide + "|" + e.name);
}
const done = need.filter((e) => written.has(keyOf(e)));
const doneSet = new Set(done.map(keyOf));
const left = need.filter((e) => !written.has(keyOf(e)));

// extras: written keys not matching any need entry (by exact key only)
const extra = [];
for (const w of written) {
  if (!doneSet.has(w)) extra.push(w);
}

function byGuide(arr) {
  const m = {};
  for (const e of arr) (m[e.guide] = m[e.guide] || []).push(e);
  return m;
}

console.log("TOTAL products needing 4th con:", need.length);
console.log("UNIQUE guides needing work:", new Set(need.map((e) => e.guide)).size);
console.log("WRITTEN part keys:", written.size, "| part files:", partFiles.length);
console.log("MATCHED products (exact):", done.length);
console.log("REMAINING products:", left.length);
console.log("EXTRA written keys (exact-nonmatch):", extra.length);

console.log("\n--- REMAINING BY GUIDE ---");
const lg = byGuide(left);
for (const k of Object.keys(lg).sort())
  console.log(
    "left " + k + " (" + lg[k].length + "): " +
      lg[k].map((e) => e.name + "[" + e.en + "/" + e.es + "]").join(" | ")
  );

if (extra.length) {
  console.log("\n--- EXTRA WRITTEN KEYS (may be prefix/near matches) ---");
  console.log(extra.join("\n"));
}

fs.writeFileSync(
  path.join(__dirname, "remaining.txt"),
  JSON.stringify(left.map((e) => e.guide + "|" + e.name), null, 1)
);
console.log("\nwrote remaining.txt (" + left.length + " entries)");
