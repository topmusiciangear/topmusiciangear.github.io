const fs = require("fs");
const d = require("../data/guides.json");
function leadCaps(s) {
  const m = (s || "").match(/^["']?([^\s"']+)/);
  return m && /^[A-ZÁÉÍÓÚÑ]{3,}$/.test(m[1]) ? m[1] : null;
}
const out = ["=== LEAD-CAPS EN META (primer token en MAYÚSCULAS) ==="];
d.forEach(g => {
  ["description", "description_es"].forEach(f => {
    const c = leadCaps(g[f]);
    if (c) out.push(`  ${g.id} [${f}] "${c}" :: ${(g[f]||"").slice(0,80)}`);
  });
  ["titleTag", "titleTag_es", "title", "title_es"].forEach(f => {
    const t = g[f] || "";
    if (/\(2026\)| 2026[,)]| 2026$/.test(t)) out.push(`TITLE-AÑO ${g.id} [${f}]: ${t}`);
    if (/ $/.test(t)) out.push(`TRAILING-SP ${g.id} [${f}]`);
  });
});
fs.writeFileSync("temp/audit_caps_out.txt", out.join("\n"));
console.log(out.length + " lineas -> temp/audit_caps_out.txt");