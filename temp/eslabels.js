const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const T = {
  'Connectivity': 'Conectividad', 'Key Specs': 'Datos clave', 'Category': 'Categoría',
  'Best For': 'Ideal para', 'Key Feature': 'Característica destacada', 'Type': 'Tipo',
  'Modulation Depth': 'Profundidad de modulación', 'Sound Design Potential': 'Potencial de diseño sonoro',
  'CPU Load': 'Carga de CPU', 'Formats': 'Formatos', 'Price Tier': 'Gama de precios',
  'Polar Pattern': 'Patrón polar', 'Frequency Response': 'Respuesta en frecuencia',
  'Sensitivity': 'Sensibilidad', 'Self-Noise': 'Ruido propio', 'Max SPL': 'SPL máximo',
  'Pad & High-Pass': 'Pad y corte de graves', 'Phantom Power': 'Alimentación phantom',
  'Body': 'Cuerpo', 'Neck': 'Mástil', 'Scale Length': 'Longitud de escala',
  'Frets & Fretboard': 'Trastes y diapasón', 'Pickups': 'Pastillas', 'Electronics': 'Electrónica',
  'Active / Passive': 'Activo / Pasivo', 'Keys / Controls': 'Teclas y controles',
  'Software': 'Software', 'Weight': 'Peso', 'Neck & Fretboard': 'Mástil y Diapasón',
  'Gig Bag Included': 'Funda incluida'
};
let n = 0;
G.forEach(g => {
  if (!g.productTable) return;
  (g.productTable.rows || []).forEach(r => {
    if (!r.label_es && T[r.label]) { r.label_es = T[r.label]; n++; }
  });
  (g.productTable.columns || []).forEach(c => {
    if (!c.title_es && c.title) { c.title_es = c.title; n++; }
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('labels ES añadidas:', n);