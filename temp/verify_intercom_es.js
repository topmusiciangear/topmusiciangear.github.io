const guides = require("../data/guides.json");
const g = guides.find(x => x.id === "wireless-intercom-systems");
const checks = [
  ["título", g.title_es],
  ["intro", g.intro_es],
  ["sec1", g.sections[0].content_es],
  ["sec2", g.sections[1].content_es],
  ["sec3", g.sections[2].content_es],
  ["sec4", g.sections[3].content_es],
  ["conclusión", g.conclusion_es],
  ["veredicto", g.verdict_es],
  ["meta", g.description_es],
];
const badWords = ["llevándoos", "de entrada escala", "flujo push-to-talk", "más de diez usuarios", "dramas de repetidores", "elección fácil", "de lo que se trata"];
checks.forEach(([n, t]) => {
  const bad = badWords.filter(w => t.includes(w));
  if (bad.length) console.log("!!", n, "->", bad.join(","));
});
console.log("checkbox OK:", checks.every(([n, t]) => t && t.length > 50 ? true : false));
console.log("preview intro:", g.intro_es.slice(0, 180) + "...");