const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Update title
guide.title="13 Best Budget USB Microphones Under $100 (2026, Plug & Play)";
guide.title_es="Los 13 mejores micrófonos USB económicos por menos de $100 (2026, plug & play)";

// Update featuredProducts to match sections
guide.featuredProducts=[...new Set(guide.sections.flatMap(s=>s.products||[]))];
console.log("Featured:", JSON.stringify(guide.featuredProducts));
console.log("Count:", guide.featuredProducts.length);

// Update productTable columns
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
guide.productTable.columns=guide.featuredProducts.map(id=>{
  const prod=p.find(x=>x.id===id);
  const name=prod?prod.title.split(" ").slice(0,3).join(" "):"Unknown";
  return {title:name, title_es:name};
});

// Update productTable rows
const specs=[
  {label:"Best For", label_es:"Ideal Para", values:guide.featuredProducts.map(id=>{
    const m={276:"First podcast mic",279:"Streaming with RGB",281:"Compact streaming",292:"Studio condenser sound",284:"Budget podcasting",287:"Ultra-budget starter",429:"Compact studio condenser",277:"Streaming with controls",278:"Streaming with controls",430:"Budget kit with accessories",280:"Compact streaming",290:"Professional podcasting",289:"Budget gaming"};
    return{value:m[id]||"General", value_es:m[id]||"General"};
  })},
  {label:"Type", label_es:"Tipo", values:guide.featuredProducts.map(id=>{
    const m={276:"Dynamic",279:"Dynamic",281:"Condenser",292:"Condenser",284:"Condenser",287:"Condenser",429:"Condenser",277:"Dynamic",278:"Dynamic",430:"Condenser",280:"Condenser",290:"Condenser",289:"Condenser"};
    return{value:m[id]||"Condenser", value_es:m[id]==="Dynamic"?"Dinámico":"Condensador"};
  })},
  {label:"Connection", label_es:"Conexión", values:guide.featuredProducts.map(id=>{
    const m={276:"USB-C/XLR",279:"USB-C/XLR",278:"USB-C/XLR"};
    return{value:m[id]||"USB", value_es:m[id]||"USB"};
  })}
];
guide.productTable.rows=specs;

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("Updated title + featuredProducts + productTable");
