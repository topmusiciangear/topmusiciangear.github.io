const fs = require("fs");
const path = "data/guides.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const fixes = [
  [/^13 BEST /i, "13 Best "],
  [/^BEST /i, "Best "],
  [/^ULTIMATE /i, "Ultimate "],
  [/^COMPLETE /i, "Complete "],
  [/^MEJORES /i, "Mejores "],
  [/^MEJOR /i, "Mejor "],
  [/^GUÍA DEFINITIVA /i, "Guía definitiva "],
  [/^GUÍA COMPLETA /i, "Guía completa "],
  [/^GUÍA /i, "Guía "],
  [/^CADENA COMPLETA /i, "Cadena completa "]
];

let changed = 0, changedTags = 0;
const log = [];
d.forEach(g => {
  ["description", "description_es"].forEach(f => {
    let t = g[f] || "";
    let orig = t;
    fixes.forEach(([re, repl]) => {
      if (re.test(t)) {
        t = t.replace(re, repl);
        log.push(`  ${g.id} [${f}] "${orig.slice(0, 50)}" -> "${t.slice(0, 50)}"`);
        changed++;
      }
    });
    g[f] = t;
  });
  ["titleTag", "titleTag_es"].forEach(f => {
    const t = g[f] || "";
    if (/\(2026\)| 2026\b/.test(t)) {
      const n = t.replace(/ \(2026\)| \(Guía 2026\)| 2026\b/g, "").trim();
      log.push(`  TAG-${f} ${g.id}: "${t}" -> "${n}"`);
      g[f] = n;
      changedTags++;
    }
  });
});

const missingTag = d.filter(g => !g.titleTag || !g.titleTag_es).map(g => g.id);
const sync = [];
d.forEach(g => {
  if (!g.titleTag) return;
  ["title", "title_es"].forEach((f, i) => {
    const target = i === 0 ? g.titleTag : g.titleTag_es;
    if ((g[f] || "") !== target) {
      if (/(2026|guía 2026|Studio 2026|Mixers 2026|Guide 2026)/i.test(g[f] || "")) {
        sync.push(`  ${g.id} [${f}] sync "${g[f]}" -> "${target}"`);
        g[f] = target;
      }
    }
  });
});

fs.writeFileSync(path, JSON.stringify(d, null, 2));
console.log("CAPS FIXED: " + changed + " metas; TITLE-TAG YEAR REMOVED: " + changedTags);
console.log(log.join("\n"));
console.log("\nSYNC title->titleTag (" + sync.length + "):");
console.log(sync.join("\n"));
console.log("\nMISSING titleTag/titleTag_es: " + (missingTag.length ? missingTag.join(",") : "ninguno"));