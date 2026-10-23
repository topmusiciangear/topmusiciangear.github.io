const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// Corregir EN - Sección 1 (LP-6 V2): "was founded" -> "Kali Audio was founded"
g.sections[1].content = g.sections[1].content.replace(
  '<strong> was founded by former JBL engineers',
  '<strong>Kali Audio was founded by former JBL engineers'
);
console.log('EN corregido: "was founded" -> "Kali Audio was founded"');

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Guardado');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('Sección 1 EN (primeros 150):', g2.sections[1].content.substring(0, 150));