const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const at875r=p.find(x=>x.title && x.title.includes("AT875R"));
if(at875r) {
  console.log("Found:", at875r.id, at875r.title);
  at875r.img="https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg";
  fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
  console.log("Image updated");
} else {
  console.log("AT875R not found, searching...");
  const matches=p.filter(x=>x.title && x.title.toLowerCase().includes("at875"));
  matches.forEach(m=>console.log("  ", m.id, m.title));
}
