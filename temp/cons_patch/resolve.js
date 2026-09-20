const fs = require("fs");
const path = require("path");

const guides = require("C:/Users/Daniel/projects/topmusiciangear/data/guides.json");

function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// ---------- 1) what the live data needs ----------
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

// ---------- 2) resolve a part key against a guide's products ----------
function resolveProduct(pkey, prods) {
  const k = norm(pkey);
  if (!k) return { t: "none" };
  const ex = prods.filter((p) => norm(p.name) === k || norm(p.name_es || "") === k);
  if (ex.length === 1) return { t: "exact", p: ex[0] };
  if (ex.length > 1) return { t: "ambig_exact", cands: ex };

  const pf = prods.filter(
    (p) => k.length >= 5 && (norm(p.name).startsWith(k) || norm(p.name_es || "").startsWith(k))
  );
  if (pf.length === 1) return { t: "prefix", p: pf[0] };
  if (pf.length > 1) return { t: "ambig_prefix", cands: pf };

  const ct = prods.filter(
    (p) => k.length >= 6 && (norm(p.name).includes(k) || norm(p.name_es || "").includes(k))
  );
  if (ct.length === 1) return { t: "contains", p: ct[0] };
  if (ct.length > 1) return { t: "ambig_contains", cands: ct };

  return { t: "none" };
}

// ---------- 3) load part files ----------
const partFiles = fs
  .readdirSync(__dirname)
  .filter((f) => /^part\d+\.js$/.test(f))
  .sort();
const written = []; // {guideKey, nameKey, en, es, file}
for (const f of partFiles) {
  const m = require(path.join(__dirname, f));
  for (const k of Object.keys(m)) {
    const i = k.indexOf("|");
    if (i < 0) continue;
    written.push({
      guideKey: k.slice(0, i),
      nameKey: k.slice(i + 1),
      en: m[k][0],
      es: m[k][1],
      file: f,
    });
  }
}

// ---------- 4) match + dry-run report ----------
const matched = []; // {guide, name, kind, p, en, es}
const unmatched = []; // {guideKey, nameKey, kind, cands}
const perGuideMatched = {};
for (const w of written) {
  const prods = guides.filter((g) => g && g.id && norm(g.id) === norm(w.guideKey));
  if (!prods.length) {
    unmatched.push({ ...w, kind: "NO_GUIDE" });
    continue;
  }
  const g = prods[0];
  const r = resolveProduct(w.nameKey, g.verdictProsCons || []);
  if (r.t === "exact" || r.t === "prefix" || r.t === "contains") {
    const en = Array.isArray(r.p.cons) ? r.p.cons.length : 0;
    const es = Array.isArray(r.p.cons_es) ? r.p.cons_es.length : 0;
    const needs = Math.max(en, es) < 4;
    matched.push({ guide: g.id, name: r.p.name, kind: r.t, p: r.p, en: w.en, es: w.es });
    if (needs) (perGuideMatched[g.id] = perGuideMatched[g.id] || []).push(r.p.name);
  } else {
    unmatched.push({ ...w, kind: r.t, cands: (r.cands || []).map((c) => c.name) });
  }
}

const covered = new Set(matched.map((m) => norm(m.guide + "|" + m.name)));
const left = need.filter((n) => !covered.has(norm(n.guide + "|" + n.name)));

const byGuide = (arr) => {
  const m = {};
  for (const n of arr) (m[n.guide] = m[n.guide] || []).push(n);
  return m;
};
const lg = byGuide(left-even? left);
const byKey = (arr) => {
  const m = {};
  for (const n of arr) (m[n.guideKey] = m[n.guideKey] || []).push(n);
  return m;
};

console.log("guides.json:', guides.length, 'guides");
console.log("TOTAL products needing 4th con (exact EN/ES <4):", need.length);
console.log("UNIQUE guides needing work:", new Set(need.map((n) => n.guide)).size);
console.log("part files:", partFiles.length, "| written keys:", written.length);
console.log("RESOLVED (exact/prefix/contains):", matched.length, "-> covers", covered.size, "products");
console.log("UNRESOLVED written keys:", unmatched.length);

console.log("\n--- COVERED BY GUIDE (drafted already) ---");
for (const k of Object.keys(perGuideMatched).sort())
  console.log("  draft " + k + " (" + perGuideMatched[k].length + "): " + perGuideMatched[k].join(" | "));

console.log("\n--- LEFT BY GUIDE ---");
for (const k of Object.keys(lg).sort())
  console.log(
    "  left " + k + " (" + lg[k].length + "): " +
      lg[k].map((n) => n.name + "[" + n.en + "/" + n.es + "]").join(" | ")
  );

if (unmatched.length) {
  console.log("\n--- UNRESOLVED WRITTEN KEYS ---");
  for (const u of unmatched)
    console.log(
      "  " + u.file + " " + u.guideKey + "|" + u.nameKey + " -> " + u.kind +
        (u.cands ? " [cands: " + u.cands.join(", ") + "]" : "")
    );
}

fs.writeFileSync(
  path.join(__dirname, "remaining.txt"),
  JSON.stringify(left.map((n) => n.guide + "|" + n.name), null, 1)
);
console.log("\nwrote remaining.txt (" + left.length + ")");
