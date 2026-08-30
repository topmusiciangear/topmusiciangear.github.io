const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-mics");

// Update featuredProducts to match section products
guide.featuredProducts=[...new Set(guide.sections.flatMap(s=>s.products||[]))];
console.log("featuredProducts:", JSON.stringify(guide.featuredProducts));
console.log("Count:", guide.featuredProducts.length);

// Update productTable columns for new products
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const cols=guide.featuredProducts.map(id=>{
  const prod=p.find(x=>x.id===id);
  const name=prod?prod.title.split(" ").slice(0,3).join(" "):"Unknown";
  return {title:name, title_es:name};
});
guide.productTable.columns=cols;

// Add rows for each spec
const specs=[
  {label:"Best For", label_es:"Ideal Para", values:guide.featuredProducts.map(id=>{
    const m={279:"Streaming with RGB",431:"Live vocals & instruments",432:"Streaming & podcasting",433:"Broadcast podcasting",434:"Vocals & instruments",5:"Guitars, drums & live",435:"Guitar amps & drums",436:"Budget podcasting",330:"Ultra-budget vocals",437:"Budget podcasting",276:"First podcast mic",278:"Streaming with controls",50:"Live vocals & stage",197:"Podcasting & voiceover",277:"Streaming & vocals",297:"Studio vocals",196:"Budget studio vocals",438:"Budget studio condenser",298:"Versatile studio"};
    return{value:m[id]||"General", value_es:m[id]||"General"};
  })},
  {label:"Type", label_es:"Tipo", values:guide.featuredProducts.map(id=>{
    const prod=p.find(x=>x.id===id);
    const t=prod?(prod.title.toLowerCase().includes("condenser")?"Condenser":"Dynamic"):"Dynamic";
    return{value:t, value_es:t==="Condenser"?"Condensador":"Dinámico"};
  })},
  {label:"Connection", label_es:"Conexión", values:guide.featuredProducts.map(id=>{
    const m={279:"USB-C/XLR",431:"XLR",432:"XLR",433:"USB-C/XLR",434:"XLR",5:"XLR",435:"XLR",436:"XLR",330:"XLR",437:"XLR",276:"USB-C/XLR",278:"USB-C/XLR",50:"XLR",197:"XLR",277:"USB-C/XLR",297:"XLR",196:"XLR",438:"XLR",298:"XLR"};
    return{value:m[id]||"XLR", value_es:m[id]||"XLR"};
  })},
  {label:"Polar Pattern", label_es:"Patrón Polar", values:guide.featuredProducts.map(id=>{
    const m={431:"Supercardioid"};
    return{value:m[id]||"Cardioid", value_es:m[id]?"Supercardioide":"Cardioide"};
  })}
];
guide.productTable.rows=specs;

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("productTable updated");
