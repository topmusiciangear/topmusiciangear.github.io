const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const mkh50=p.find(x=>x.title && x.title.includes("MKH 50"));
if(mkh50) {
  console.log("Found:", mkh50.id, mkh50.title);
  mkh50.img="https://static.flymusic.ro/img/p/1/0/0/8/2/4/100824-superlarge_default.jpg";
  fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
  console.log("Image updated");
} else {
  console.log("MKH 50 not found, searching...");
  const matches=p.filter(x=>x.title && x.title.toLowerCase().includes("mkh"));
  matches.forEach(m=>console.log("  ", m.id, m.title));
}
