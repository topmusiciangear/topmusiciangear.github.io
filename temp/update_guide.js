const fs=require('fs');
const guidesPath='./data/guides.json';
let guides=JSON.parse(fs.readFileSync(guidesPath,'utf8'));
const guide=guides.find(g=>g.id==='channel-strip-plugins');
if(!guide){console.log('not found');process.exit(1);}

// Map sections to new product IDs
// sections[1] currently product 119 -> replace with 1066
// sections[2] product 29 -> 1067
// sections[3] product 60 -> 1068
// sections[4] product 62 -> 1069
// sections[5] product 121 -> 1070
// sections[6] product 379 keep

const mapping={
  1:1066,
  2:1067,
  3:1068,
  4:1069,
  5:1070
};
guide.sections.forEach((sec,idx)=>{
  if(mapping[idx]) sec.products=[mapping[idx]];
});

// Update featuredProducts
guide.featuredProducts=[379,1066,1067,1068,1069,1070];

// Update conclusion
guide.conclusion="<p>That is why I would go with <span class=\"product-name\">Brainworx bx_console SSL 4000 E</span>. Classic 72 channel E Series desk emulation with TMT technology.</p>";
guide.conclusion_es="<p>Por eso me quedo con <span class=\"product-name\">Brainworx bx_console SSL 4000 E</span>. Emulación clásica de consola serie E de 72 canales con tecnología TMT.</p>";

// Update verdict
guide.verdict=`<p><strong>I would go with <span class=\"product-name\">Waves Scheps Omni Channel 2</span> — Our Top Pick.</strong> The ultimate hybrid mixing workflow and the most versatile channel strip ever created.</p><p><strong><span class=\"product-name\">Brainworx bx_console SSL 4000 E</span></strong> — Best Analog Emulation. The definitive choice for purists chasing the absolute truest vintage analog desk experience.</p><p><strong><span class=\"product-name\">Solid State Logic SSL Native Channel Strip 2</span></strong> — The official factory digital flagship. Developed directly by SSL using modern console DSP algorithms for ultra-clean, clinical pop and EDM separation.</p><p><strong><span class=\"product-name\">Lindell Audio 80 Series</span></strong> — The heavy hitter for vintage British warmth. Recreates the thick, cream-colored, class-A character of the legendary Neve 8028 desk.</p><p><strong><span class=\"product-name\">Universal Audio UAD API Vision Channel Strip</span></strong> — Unmatched transient speed and aggressive American mid-range bite.</p><p><strong><span class=\"product-name\">Waves Magma Tube Channel Strip</span></strong> — True golden-era analog character condensed into an intuitive three-knob workflow.</p>`;
guide.verdict_es=`<p><strong>Me quedo con <span class=\"product-name\">Waves Scheps Omni Channel 2</span> — Nuestra elección principal.</strong> El flujo de trabajo híbrido definitivo y el channel strip más versátil jamás creado.</p><p><strong><span class=\"product-name\">Brainworx bx_console SSL 4000 E</span></strong> — Mejor emulación analógica. La opción definitiva para puristas.</p><p><strong><span class=\"product-name\">Solid State Logic SSL Native Channel Strip 2</span></strong> — La insignia digital oficial de fábrica.</p><p><strong><span class=\"product-name\">Lindell Audio 80 Series</span></strong> — El peso pesado del calor británico vintage.</p><p><strong><span class=\"product-name\">Universal Audio UAD API Vision Channel Strip</span></strong> — Velocidad de transitorios inigualable.</p><p><strong><span class=\"product-name\">Waves Magma Tube Channel Strip</span></strong> — Carácter analógico de la era dorada condensado en un flujo de tres perillas.</p>`;

fs.writeFileSync(guidesPath, JSON.stringify(guides,null,2).replace(/\n/g,'\r\n'),'utf8');
console.log('Guide updated');
