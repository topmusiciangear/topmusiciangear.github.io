const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const prod=p.find(x=>x.id===358);
console.log("ID:", prod.id);
console.log("Title:", prod.title);
console.log("Img:", prod.img);
