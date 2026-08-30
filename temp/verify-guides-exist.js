const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const allIds = g.map(x=>x.id);
const iemIds = ["ew-iem-g4-twin-vs-psm300","ie900-vs-se846","best-wireless-iems","best-in-ear-monitors"];
iemIds.forEach(id => {
  const guide = g.find(x=>x.id===id);
  console.log(`${id}:`, guide ? "FOUND" : "MISSING");
});
