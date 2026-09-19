const d = require("../data/guides.json");
const hits = [];
d.forEach(g => {
  ["titleTag", "titleTag_es", "title", "title_es"].forEach(f => {
    const t = g[f] || "";
    if (t.includes('"')) hits.push(g.id + " [" + f + "] " + JSON.stringify(t));
  });
});
console.log(hits.length ? hits.join("\n") : "ninguno");