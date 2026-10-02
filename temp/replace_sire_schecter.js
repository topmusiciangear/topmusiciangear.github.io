const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-5-string-basses');

// 1. Replace section heading and content (index 5)
g.sections[5] = {
  heading: "Schecter Stiletto Stealth-5: Modern Active Metal Machine",
  heading_es: "Schecter Stiletto Stealth-5: Máquina activa moderna para metal",
  content: "<strong>Basswood body, maple neck, rosewood board and blacked-out hardware — built for heavy styles at £669.</strong> Diamond SuperRock MM humbucker (bridge) and Diamond P split single-coil (neck) feed a 9V active 2-band EQ. 35-inch scale, 24 X-Jumbo frets, 16-inch radius, Graph Tech XL Black Tusq nut, S-Tek bridge. £669 at Andertons and Gear4music, $699 at zzounds.",
  content_es: "<strong>Cuerpo de tilo, mástil de arce, diapasón de palisandro y hardware negro — construido para estilos pesados a £669.</strong> Humbucker Diamond SuperRock MM (puente) y single-coil split Diamond P (mástil) alimentan un EQ activo 2 bandas a 9V. Escala 35\", 24 trastes X-Jumbo, radio 16\", cejuela Graph Tech XL Black Tusq, puente S-Tek. £669 en Andertons y Gear4music, $699 en zzounds.",
  products: [542]
};

// 2. Replace productTable.columns[4] (the 5th product, 0-based index 4)
g.productTable.columns[4] = {
  title: "Schecter Stiletto Stealth-5 Bass Guitar",
  title_es: "Schecter Stiletto Stealth-5 Bass Guitar"
};

// 3. Replace productTable.rows values for column index 4
const rows = g.productTable.rows;
const ci = 4; // 0-based index for the 5th product

rows.find(r => r.label === 'Body').values[ci] = { value: 'Basswood', value_es: 'Tilo' };
rows.find(r => r.label === 'Neck').values[ci] = { value: 'Maple, Thin C', value_es: 'Arce, Thin C' };
rows.find(r => r.label === 'Scale Length').values[ci] = { value: '35 in (889 mm)', value_es: '35" (889 mm)' };
rows.find(r => r.label === 'Frets & Fretboard').values[ci] = { value: '24 X-Jumbo, rosewood, 16 in', value_es: '24 X-Jumbo, palisandro, 16"' };
rows.find(r => r.label === 'Pickups').values[ci] = { value: 'Diamond SuperRock MM + Diamond P', value_es: 'Diamond SuperRock MM + Diamond P' };
rows.find(r => r.label === 'Electronics').values[ci] = { value: 'Active 2-band EQ (Vol+Blend+Bass+Treble)', value_es: 'EQ activo 2 bandas (Vol+Blend+Graves+Agudos)' };
rows.find(r => r.label === 'Active / Passive').values[ci] = { value: 'Active (9V)', value_es: 'Activo (9V)' };
rows.find(r => r.label === 'Bridge').values[ci] = { value: 'S-Tek', value_es: 'S-Tek' };

// 4. Replace verdictProsCons entry for Sire
const vi = g.verdictProsCons.findIndex(v => v.name === 'Sire Marcus Miller V7 New Gen 5-String');
g.verdictProsCons[vi] = {
  name: "Schecter Stiletto Stealth-5 Bass Guitar",
  name_es: "Schecter Stiletto Stealth-5 Bass Guitar",
  pros: [
    "35-inch scale locks the low B tight for metal and downtuned work",
    "Diamond SuperRock MM + Diamond P with active 2-band EQ covers modern high-gain tones",
    "24 X-Jumbo frets, Thin C neck and 16-inch radius built for speed",
    "£669 at Andertons and G4M — serious specs at budget-metal price"
  ],
  cons: [
    "Basswood body dents easier than ash or alder",
    "Active only — no passive fallback if battery dies",
    "Only Andertons and G4M verified in our stores",
    "Rosewood board needs occasional conditioning"
  ],
  pros_es: [
    "Escala 35\" tensa el Si grave para metal y afinaciones bajas",
    "Diamond SuperRock MM + Diamond P con EQ activo 2 bandas cubren tonos high-gain modernos",
    "24 trastes X-Jumbo, mástil Thin C y radio 16\" hechos para velocidad",
    "£669 en Andertons y G4M — specs serias a precio de metal económico"
  ],
  cons_es: [
    "El cuerpo de tilo se abolla antes que el fresno o el aliso",
    "Solo activo — sin respaldo pasivo si se muere la pila",
    "Solo Andertons y G4M verificados en nuestras tiendas",
    "El diapasón de palisandro pide acondicionado ocasional"
  ]
};

// 5. Update FAQ - replace Sire V7 Gen 2 vs New Gen with Schecter question
const fqIdx = g.faq.findIndex(f => f.q_es === '¿Sire V7 Gen 2 o New Gen?');
g.faq[fqIdx] = {
  q: "Schecter Stiletto Stealth-5 or Sterling SUB Ray5 for metal?",
  a: "Stealth-5: 35-inch scale, dual pickups (MM+P) and active 2-band EQ — built for modern metal. Ray5: 34-inch, single ceramic humbucker, 9V 2-band — classic StingRay thump for funk-rock. Different tools. If you need the low B tension and pickup versatility for heavy styles, the Stealth-5 wins.",
  q_es: "¿Schecter Stiletto Stealth-5 o Sterling SUB Ray5 para metal?",
  a_es: "Stealth-5: escala 35\", doble pastilla (MM+P) y EQ activo 2 bandas — hecha para metal moderno. Ray5: 34\", humbucker cerámico único, 9V 2 bandas — thump StingRay clásico para funk-rock. Herramientas distintas. Si buscas tensión del Si grave y versatilidad de pastillas para estilos pesados, la Stealth-5 gana."
};

// 6. Update conclusion
g.conclusion = g.conclusion.replace(
  'Mid-range winners: the Yamaha BB435 for passive tone and the Sire V7 New Gen for modern active flexibility.',
  'Mid-range winners: the Yamaha BB435 for passive tone and the Schecter Stiletto Stealth-5 for modern active metal.'
);
g.conclusion_es = g.conclusion_es.replace(
  'Ganadores medios: Yamaha BB435 por tono pasivo y Sire V7 New Gen por flexibilidad activa moderna.',
  'Ganadores medios: Yamaha BB435 por tono pasivo y Schecter Stiletto Stealth-5 por metal activo moderno.'
);

// 7. Update verdict
g.verdict = g.verdict.replace(
  'Gigging weekly $500–$1,100? V7 New Gen, BB435, SR505A or Classic Vibe 70s Jazz V.',
  'Gigging weekly $500–$1,100? Schecter Stiletto Stealth-5, BB435, SR505A or Classic Vibe 70s Jazz V.'
);
g.verdict_es = g.verdict_es.replace(
  '¿Tocando semanal $500–$1.100? V7 New Gen, BB435, SR505A o Classic Vibe 70s Jazz V.',
  '¿Tocando semanal $500–$1.100? Schecter Stiletto Stealth-5, BB435, SR505A o Classic Vibe 70s Jazz V.'
);

// 8. Update featuredSnippet references (already correct, uses Ultra II Jazz V etc.)

// 9. Update description if it mentions Sire
g.description = g.description.replace('Sire V7 New Gen', 'Schecter Stiletto Stealth-5');
g.description_es = g.description_es.replace('Sire V7 New Gen', 'Schecter Stiletto Stealth-5');

// Save
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('Guide updated successfully');