const fs = require("fs");
const path = require("path");

const guidesF = "../../data/guides.json";
const guides = require(guidesF);

function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const MULTI = true; // multi-word prefix candidates allowed
const partFiles = fs.readdirSync(__dirname).filter((f) => /^part\d+\.js$/.test(f));
const parts = {};
for (const f of partFiles) {
  const m = require(path.join(__dirname, f));
  for (const k of Object.keys(m)) parts[k] = m[k];
}

const guideById = {};
for (const g of guides) if (g && g.id) guideById[norm(g.id)] = g;

const byGuide = {};
for (const k of Object.keys(parts)) {
  const i = k.indexOf("|");
  const gkey = k.slice(0, i);
  const pkey = k.slice(i + 1);
  const gnormId = norm(gkey);
  (byGuide[gnormId] = byGuide[gnormId] || []).push({ k, pkey });
}

// Resolve a part entry against a guide's products
function resolve(g, pkey) {
  const pn = norm(pkey);
  const prods = g.verdictProsCons || [];
  if (!prods.length) return { type: "noguide" };
  // exact on name (or name_es)
  let ex = prods.filter(
    (p) => norm(p.name) === pn || norm(p.name_es || "") === pn
  );
  if (ex.length === 1) return { type: "exact", prod: ex[0] };
  if (ex.length > 1) return { type: "ambig_exact", prods: ex };
  // prefix on name
  let pf = prods.filter(
    (p) =>
      (norm(p.name).indexOf(pn) === 0 && pn.length >= 4) ||
      (norm(p.name_es || "").indexOf(pn) === 0 && pn.length >= 4)
  );
  if (pf.length === 1) return { type: "prefix", prod: pf[0] };
  if (pf.length > 1) return { type: "am big_prefix", prods: pf };
  // contains match as last resort
  let ct = prods.filter(
    (p) =>
      (norm(p.name).indexOf(pn) >= 0 && pn.length >= calcMin(p)) ||
      (norm(p.name_es || "").indexOf(pn) >= 0 && pn.length >= calcMin(p))
  );
  if (ct.length === 1) return { type: "contains", prod: ct[0] };
  if (ct.length > 1) return { type: "am big_contains", prods: ct };
  return { type: "none" };
}
function calcMin(p) {
  return 6; // contains needs substantial token
}

// DRY RUN: coverage report only. No writes.
const summary = { total: 0, exact: 0, prefix: 0, contains: 0, ambig: 0, none: [],
  noGuide: [] };
const perGuide = {};

for (const gn of Object.keys(byGuide)) {
  const g = guideById[gn];
  const items = byGuide[gn];
  if (!g) {
    summary.noGuide.push(gn);
    continue;
  }
  for (const it of items) {
    summary.total++;
    let r = resolve(g, it.pkey);
    let label;
    if (r.type === "exact") { summary.exact++; label = "exact"; }
    else if (r.type === "prefix") { summary.prefix++; label = "prefix"; }
    else if (r.type === "contains") { summary.contains++; label = "contains"; }
    else if (r.type === "none") { summary.none.push(g.id + "|" + it.pkey); label = "NONE"; }
    else { summary.ambig++; label = "AMBIG:" + r.prods.map((p) => p.name).join(","); }
    (perGuide[g.id] = perGuide[g.id] || []).push({ k: it.k, label, name: r.prod ? r.prod.name : "" });
  }
}

console.log("part files:", partFiles.length, "| part keys:", Object.keys(parts).length);
console.log("guide slugs in parts:", Object.keys(byGuide).length, "| resolved guides:", Object.keys(guideById).length);
console.log("");
console.log("TOTAL part keys:", summary.total);
console.log("  exact   :", summary.exact);
console.log("  prefix  :", summary.prefix);
console.log("  contains:", summary.contains);
console.log("  AMBIG   :", summary.ambig);
console.log("  NONE    :", summary.none.length);
console.log("  noGuide :", summary.noGuide.length);

if (summary.noGuide.length) console.log("  noGuide slugs:", summary.noGuide.join(", "));
if (summary.none.length) console.log("  NONE keys:", summary.none.join(" | "));

console.log("\n--- PER GUIDE RESOLUTION ---");
for (const gn of Object.keys(perGuide).sort()) {
  const arr = perGuide[gn];
  const un = arr.filter((a) => a.label === "NONE" || a.label.startsWith("AMBIG"));
  console.log(gn + " total=" + arr.length + " " +
    arr.map((a) => a.label + (a.name ? ":" + a.name : "")).join(" | "));
}
