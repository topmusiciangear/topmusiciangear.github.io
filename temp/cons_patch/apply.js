const fs = require("fs");
const path = require("path");

const DATA = path.resolve(__dirname, "../../data/guides.json");
const guides = require(DATA);

function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// --- collect written part keys ---
const partFiles = fs.readdirSync(__dirname).filter((f) => /^part\d+\.js$/.test(f));
const written = {}; // norm(guide|name) -> {guideKey, nameKey, en, es, file}
for (const f of partFiles.sort()) {
  const m = require(path.join(__dirname, f));
  for (const k of Object.keys(m)) {
    const i = k.indexOf("|");
    if (i < 0) continue;
    const g = k.slice(0, i),
      n = k.slice(i + 1);
    const arr = m[k];
    written[norm(g + "|" + n)] = { guideKey: g, nameKey: n, en: arr[0], es: arr[1], file: f };
  }
}

// --- guides index ---
const guideIdx = {}; // norm(id) -> guide
for (const g of guides) if (g && g.id) guideIdx[norm(g.id)] = g;

// --- resolve a written key to a real product (en route ES fallback) ---
function resolve(guide, pkey) {
  const gn = norm(pkey);
  const prods = guide.verdictProsCons || [];
  const ex = prods.filter(
    (p) => norm(p.name) === gn || norm(p.name_es || "") === gn
  );
  if (ex.length === 1) return { t: "exact", p: ex[0] };
  if (ex.length > 1) return { t: "ambig", cands: ex };
  const pf = prods.filter((p) => norm(p.name).startsWith(gn) && gn.length >= 4);
  if (pf.length === 1) return { t: "prefix", p: pf[0] };
  if (pf.length > 1) return { t: "ambig_prefix", cands: pf };
  const ct = prods.filter((p) => norm(p.name).includes(gn) && gn.length >= 6);
  if (ct.length === 1) return { t: "contains", p: ct[0] };
  if (ct.length > 1) return { t: "ambig_contains", cands: ct };
  return { t: "none" };
}

const stats = { total: 0, exact: 0, prefix: 0, contains: 0, ambig: 0, none: 0 };
const matched = []; // {guide, name, kind, en, es, p}
const unmatched = []; // {guide, nameKey, kind}
const perGuideMatched = {};

for (const key of Object.keys(written)) {
  const w = written[key];
  const g = guideIdx[norm(w.guideKey)];
  stats.total++;
  if (!g) {
    unmatched.push({ guide: w.guideKey, nameKey: w.nameKey, kind: "NO_GUIDE" });
    stats.none++;
    continue;
  }
  const r = resolve(g, w.nameKey);
  if (r.t === "exact" || r.t === "prefix" || r.t === "contains") {
    stats[r.t]++;
    matched.push({ guide: w.guideKey, name: r.p.name, kind: r.t, p: r.p, en: w.en, es: w.es });
    (perGuideMatched[w.guideKey] = perGuideMatched[w.guideKey] || []).push(r.p.name);
  } else {
    unmatched.push({ guide: w.guideKey, nameKey: w.nameKey, kind: r.t, cands: r.cands });
    if (r.t === "ambig" || r.t === "ambig_prefix" || r.t === "ambig_contains") stats.ambig++;
    else stats.none++;
  }
}

console.log("part files:", partFiles.length, "| written keys:", Object.keys(written).length);
console.log("=".repeat(50));
console.log("MATCHED:", matched.length, "(exact " + stats.exact + ", prefix " + stats.prefix + ", contains " + stats.contains + ")");
console.log("AMBIGUOUS:", stats.ambig);
console.log("NO MATCH / NO GUIDE:", stats.none);

console.log("\n--- UNIQUE PRODUCTS COVERED ---");
const covered = new Set(matched.map((m) => m.guide + "|" + m.name));
console.log("covered products:", covered.size);

console.log("\n--- PER GUIDE COVERAGE ---");
for (const g of Object.keys(perGuideMatched).sort())
  console.log("match " + g + " (" + perGuideMatched[g].length + "): " + perGuideMatched[g].join(" | "));

console.log("\n--- UNMATCHED / AMBIG ---");
for (const u of unmatched)
  console.log(
    "UNMATCH " + u.guide + "|" + u.nameKey + " [" + u.kind + "]" +
      (u.cands ? " cands: " + u.cands.map((c) => c.name).join(", ") : "")
  );

// dry-run report artifacts
fs.writeFileSync(
  path.join(__dirname, "coverage.json"),
  JSON.stringify(
    {
      matched: matched.map((m) => ({ guide: m.guide, name: m.name, kind: m.kind })),
      unmatched: unmatched.map((u) => ({ guide: u.guide, name: u.nameKey, kind: u.kind })),
    },
    null,
    1
  )
);
console.log("\nwrote coverage.json");

// WRITE MODE
if (process.argv.includes("--write")) {
  let changed = 0;
  const after = guides.map((g) => {
    if (!g) return g;
    const byId = {};
    for (const m of matched) if (m.guide === g.id) {
      const kName = norm(m.p.name);
      if (byId[kName] === undefined) byId[kName] = m;
    }
    if (!Object.keys(byId).length) return g;
    const vpc = Array.isArray(g.verdictProsCons) ? g.verdictProsCons.map((p) => ({ ...p })) : [];
    for (const p of vpc) {
      const m = byId[norm(p.name)];
      if (!m) continue;
      const cLen = noNaN(m.p, "cons");
      if (cLen < 4) {
        const cons = Array.isArray(p.cons) ? [...p.cons] : [];
        while (cons.length < 4) cons.push("");
        cons[3] = m.en;
        p.cons = cons;
        changed++;
      }
      const esLen = Array.isArray(p.cons_es) ? p.cons_es.length : 0;
      if (esLen < 4) {
        const ces = Array.isArray(p.cons_es) ? [...p.cons_es] : [];
        while (ces.length < 4) ces.push("");
        ces[3] = m.es;
        p.cons_es = ces;
        if (!Number.isInteger(p.updated)) p.updated = 1;
      }
    }
    return { ...g, verdictProsCons: vpc };
  });
  fs.writeFileSync(DATA, JSON.stringify(after, null, 1).replace(/\n {8}/g, "\n"));
  fs.writeFileSync(path.join(__dirname, "apply.log"), "applied " + changed + " cons EN fields\n");
  console.log("WROTE changes. (cons[3] EN set count):", changed);
}

function noNaN(p, field) {
  return Array.isArray(p[field]) ? p[field].length : 0;
}
