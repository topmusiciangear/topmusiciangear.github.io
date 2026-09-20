const fs = require("fs");
const g = require("../../data/guides.json");
const t = g.find((x) => x && x.id === "active-vs-passive-pa");
const want = ["Yamaha DBR12", "JBL JRX215", "Mackie SRT215", "Yamaha CBR12", "EV ELX200-12"];
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
const out = [];
for (const p of t.verdictProsCons) {
  if (!want.some((w) => norm(w) === norm(p.name))) continue;
  out.push("### " + p.name + " | " + (p.name_es || ""));
  out.push("pros EN[" + (p.pros || []).length + "]: " + JSON.stringify(p.pros));
  out.push("pros ES[" + (p.pros_es || []).length + "]: " + JSON.stringify(p.pros_es));
  out.push("cons EN[" + (p.cons || []).length + "]: " + JSON.stringify(p.cons));
  out.push("cons ES[" + (p.cons_es || []).length + "]: " + JSON.stringify(p.cons_es));
  out.push("");
}
fs.writeFileSync(__dirname + "/dump5.txt", out.join("\n"));
console.log("wrote dump5.txt");
