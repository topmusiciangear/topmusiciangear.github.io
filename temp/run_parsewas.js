var fs=require('fs');
function parseWas(html) {
  const m = html.match(/line-through[^>]*>\s*£?\s*([\d,]+(?:\.\d+)?)/);
  if (!m) return null;
  const v = Number(m[1].replace(/,/g, ''));
  return isFinite(v) && v > 0 ? v : null;
}
console.log("babyface was: " + parseWas(fs.readFileSync("temp/babyface.html", "utf8")));
console.log("cd60s was: " + parseWas(fs.readFileSync("temp/cd60s.html", "utf8")));