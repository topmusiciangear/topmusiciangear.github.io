var fs = require("fs");
var guides = JSON.parse(fs.readFileSync("data/guides.json", "utf8"));
var products = JSON.parse(fs.readFileSync("data/products.json", "utf8"));
var data = JSON.parse(fs.readFileSync("_pros_cons_data.json", "utf8"));

var prodMap = {};
products.forEach(function(p) { prodMap[p.id] = { title: p.title, title_es: p.title_es }; });

function getProd(id) { return prodMap[id] || { title:"Unknown", title_es:"Desconocido" }; }

var count = 0;

guides.forEach(function(guide) {
  if (guide.id.indexOf("-vs-") === -1) return;
  if (guide.verdictProsCons) return;

  var seen = {};
  var pairs = [];
  guide.sections.forEach(function(s) {
    if (s.products) {
      s.products.forEach(function(pid) {
        if (!seen[pid]) { seen[pid] = true; pairs.push(pid); }
      });
    }
  });

  if (pairs.length < 2) return;

  var idA = pairs[0], idB = pairs[1];
  var entry = data[guide.id];
  if (!entry) {
    // try reverse key
    var revKey = Object.keys(data).find(function(k) {
      var v = data[k];
      return (v.a === idB && v.b === idA);
    });
    if (revKey) {
      entry = { a: data[revKey].b, b: data[revKey].a, pa: data[revKey].pb, pb: data[revKey].pa };
    }
  }
  if (!entry) return;

  if (entry.a !== idA) {
    guide.verdictProsCons = [entry.pb, entry.pa];
  } else {
    guide.verdictProsCons = [entry.pa, entry.pb];
  }
  count++;
});

if (count > 0) {
  fs.writeFileSync("data/guides.json", JSON.stringify(guides, null, 2), "utf8");
  console.log("Added verdictProsCons to " + count + " guides.");
} else {
  console.log("No guides needed updating.");
}
