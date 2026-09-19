const fs = require("fs");
["best-pa-speakers.html", "best-pa-speakers_es.html", "tube-ribbon-mics.html"].forEach(f => {
  const h = fs.readFileSync("guides/" + f, "utf8");
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1];
  const og = (h.match(/property="og:title" content="(.*?)"/) || [])[1];
  const ogUrl = (h.match(/property="og:url" content="(.*?)"/) || [])[1];
  const canon = (h.match(/rel="canonical" href="(.*?)"/) || [])[1];
  console.log("== " + f);
  console.log("  title:   " + t);
  console.log("  og:title: " + og);
  console.log("  og:url:   " + ogUrl);
  console.log("  canon:    " + canon);
});