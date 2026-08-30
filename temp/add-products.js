const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

// Add Blue Yeti Nano
p.push({
  "id": 300,
  "asin": "B07DTTGZ7M",
  "title": "Blue Yeti Nano USB Condenser Microphone",
  "title_es": "Micrófono USB Condensador Blue Yeti Nano",
  "brand": "Blue",
  "category": "microphones",
  "desc": "Premium compact USB condenser with two pickup patterns, 24-bit audio, and no-latency headphone monitoring.",
  "desc_es": "Condensador USB premium compacto con dos patrones de captación, audio de 24 bits y monitoreo de auriculares sin latencia.",
  "img": "https://m.media-amazon.com/images/I/31gm-IMqIbL._AC_SL1500_.jpg",
  "price": 76,
  "stores": {
    "amazon": "https://www.amazon.com/dp/B07DTTGZ7M"
  }
});

// Add FIFINE T669
p.push({
  "id": 301,
  "asin": "B07Y1C6GDS",
  "title": "FIFINE T669 USB Microphone Kit",
  "title_es": "Kit de Micrófono USB FIFINE T669",
  "brand": "FIFINE",
  "category": "microphones",
  "desc": "Budget USB condenser microphone with boom arm, pop filter, and shock mount — complete streaming setup.",
  "desc_es": "Kit de micrófono USB condensador económico con brazo, filtro pop y soporte antivibraciones — setup de streaming completo.",
  "img": "https://m.media-amazon.com/images/I/61Y7BoHqmuL._AC_SL1280_.jpg",
  "price": 40,
  "stores": {
    "amazon": "https://www.amazon.com/dp/B07Y1C6GDS"
  }
});

fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
console.log("Products added. New count:", p.length);
