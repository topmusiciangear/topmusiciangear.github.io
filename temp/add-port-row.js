var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var h = g.find(function(x){ return x.id === 'best-monitors-for-small-rooms'; });

// Add Reflex Port row after Dimensions (index 7)
var portRow = {
  label: "Reflex Port",
  label_es: "Puerto Réflex",
  values: [
    { value: "Rear", value_es: "Trasero" },         // JBL 305P MkII
    { value: "Front", value_es: "Frontal" },         // Kali LP-6 V2
    { value: "Front", value_es: "Frontal" },         // KRK Rokit 7 G5
    { value: "Front", value_es: "Frontal" },         // ADAM D3V
    { value: "Front", value_es: "Frontal" },         // Kali LP-UNF
    { value: "Front", value_es: "Frontal" },         // iLoud Micro Monitor Pro
    { value: "Front", value_es: "Frontal" },         // Neumann KH 80 DSP
    { value: "Front", value_es: "Frontal" },         // iLoud MTM MKII
    { value: "Front", value_es: "Frontal" }          // Genelec 8010A
  ]
};

h.productTable.rows.splice(8, 0, portRow);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Added Reflex Port row. Total rows:', h.productTable.rows.length);
