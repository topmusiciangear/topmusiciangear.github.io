const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const prod=p.find(x=>x.id===429);
if(prod) {
  prod.img="https://m.media-amazon.com/images/I/71M8VZSVlvL._AC_SL1500_.jpg";
  fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
  console.log("Updated:", prod.title, "->", prod.img);
} else console.log("NOT FOUND: 429");
