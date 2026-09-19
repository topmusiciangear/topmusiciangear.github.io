const fs = require("fs");
const path = require("path");
const d = require("../data/guides.json");

const CAPS = /^[A-Z]{3,}$/;
function capsWords(s) {
  const out = new Set();
  (s || "").split(/[\s\-—:.,&'"\(\)\/]+/).forEach(w => {
    const c = w.replace(/[^A-Z]/g, "");
    if (w === w.toUpperCase() && w.length >= 3 && c.length === w.length && /[A-Z]{3,}/.test(w)) out.add(w);
  });
  return Array.from(out);
}

let flagMeta = [], flagTitle = [];
d.forEach(g => {
  ["description", "description_es"].forEach(f => {
    const c = capsWords(g[f]);
    if (c.length) flagMeta.push(`  ${g.id} [${f}] ${c.join(", ")}: ${(g[f]||"").slice(0,90)}`);
  });
  ["title", "title_es", "titleTag", "titleTag_es"].forEach(f => {
    const c = capsWords(g[f]);
    if (c.length) flagTitle.push(`  ${g.id} [${f}] ${c.join(", ")}: ${g[f]}`);
  });
  if (/ vs |’-|_|-/.test(g.id) || g.id.includes("vs")) g._isVS = true;
});
console.log("=== CAPS EN META (" + flagMeta.length + ") ===");
console.log(flagMeta.join("\n"));
console.log("\n=== CAPS EN TITULOS (" + flagTitle.length + ") ===");
console.log(flagTitle.join("\n"));

const vs = d.filter(x => x._isVS);
console.log("\n=== VS GUIDES: " + vs.length + " — titleTag / description (primera frase 110ch) ===");
vs.forEach(g => {
  console.log("  " + g.id + "\n    T: " + (g.titleTag || g.title) + "\n    ES: " + (g.titleTag_es || g.title_es) + "\n    D: " + (g.description || "").slice(0, 110));
});