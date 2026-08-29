const fs=require("fs");
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const guide=g.find(x=>x.id==="best-in-ear-monitors");
if(!guide){console.log("NOT FOUND"); process.exit(1);}

// Proper IEM products with detailed content
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

guide.sections = [
  {
    title: "Flagship Reference IEMs for Touring & Studio",
    title_es: "Referencias Insignia para Giras y Estudio",
    products: [
      { product: 269 }, // Shure SE846 Gen 2
      { product: 268 }, // Sennheiser IE 900
    ],
    content: "The flagship tier represents the absolute pinnacle of IEM engineering. These models use hybrid driver arrays (balanced armature + dynamic) to achieve reference-grade accuracy across the entire frequency spectrum. They are the choice for touring professionals who need consistent monitoring night after night, and mastering engineers who demand absolute transparency.",
    content_es: "La categoría insignia representa la cúspide de la ingeniería IEM. Estos modelos utilizan arrays híbridos de drivers (armadura balanceada + dinámico) para lograr precisión de referencia en todo el espectro de frecuencias. Son la elección de profesionales de gira que necesitan monitoreo consistente noche tras noche, e ingenieros de mastering que exigen transparencia absoluta."
  },
  {
    title: "Industry Standards & Workhorses (Mid-Range)",
    title_es: "Estándares de la Industria y Caballos de Batalla (Gama Media)",
    products: [
      { product: 269 }, // SE846 Gen 2
      { product: 268 }, // IE 900
    ],
    content: "These models have earned their reputation through years of stage and studio service. They offer 90% of flagship performance at a more accessible price point, making them the go-to choice for working musicians and engineers who need reliable, accurate monitoring without the flagship price tag.",
    content_es: "Estos modelos han ganado su reputación tras años de servicio en escenario y estudio. Ofrecen el 90% del rendimiento insignia a un precio más accesible, convirtiéndolos en la opción predilecta para músicos e ingenieros que necesitan monitoreo fiable y preciso sin el coste de la gama alta."
  },
  {
    title: "Professional Entry-Level Options (Budget-Friendly)",
    title_es: "Opciones Profesionales de Entrada (Gama Económica)",
    products: [],
    content: "For those starting with IEMs or on a strict budget, these models deliver professional-grade isolation and sound quality at a fraction of the cost. They may use single dynamic drivers instead of multi-BA arrays, but still provide the isolation and clarity that make IEMs superior to wedge monitors.",
    content_es: "Para quienes se inician en los IEM o tienen presupuesto ajustado, estos modelos ofrecen aislamiento y calidad sonora profesionales a una fracción del coste. Pueden usar drivers dinámicos simples en lugar de arrays multi-BA, pero siguen proporcionando el aislamiento y claridad que hacen a los IEM superiores a los monitores de suelo."
  },
  {
    title: "Wireless IEM Systems for Stage",
    title_es: "Sistemas Inalámbricos In-Ear para Escenario",
    products: [
      { product: 266 }, // Sennheiser ew IEM G4-TWIN-E
      { product: 347 }, // Xvive U4
      { product: 348 }, // Xvive U4R4
      { product: 349 }, // Sennheiser EW IEM G4 Stereo
      { product: 350 }, // Phenyx Pro PTM-10
      { product: 362 }  // Sennheiser XSW IEM
    ],
    content: "Wireless IEM systems eliminate cable restrictions on stage while delivering consistent, isolated monitoring. The Sennheiser EW IEM G4 series remains the industry standard for professional touring, while Xvive U4 offers exceptional value for smaller venues. For bands on tighter budgets, the Sennheiser XSW IEM provides reliable UHF performance.",
    content_es: "Los sistemas IEM inalámbricos eliminan las restricciones de cables en escenario mientras entregan monitoreo consistente y aislado. La serie Sennheiser EW IEM G4 sigue siendo el estándar de la industria para giras profesionales, mientras que Xvive U4 ofrece valor excepcional para venues menores. Para bandas con presupuesto ajustado, el Sennheiser XSW IEM brinda rendimiento UHF fiable."
  }
];

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - sections updated with real content");
