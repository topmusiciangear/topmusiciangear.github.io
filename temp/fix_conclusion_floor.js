const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');

g.conclusion = '<p>The best setup is a chain, not a single box: <span class="product-name">Sonarworks SoundID Reference</span> for correction, then <span class="product-name">Yamaha HS8</span> on <span class="product-name">K&amp;M 26722 floor stands</span> if the monitors are not on the desk, or <span class="product-name">Focal Alpha 65 Evo</span> on <span class="product-name">IsoAcoustics ISO-200</span> if they stay on the desk. Skip whatever duplicates a job you already covered.</p>';

g.conclusion_es = '<p>La mejor configuración es una cadena, no un solo aparato: <span class="product-name">Sonarworks SoundID Reference</span> para corregir, y luego <span class="product-name">Yamaha HS8</span> sobre <span class="product-name">soportes de suelo K&amp;M 26722</span> si los monitores no van en el escritorio, o <span class="product-name">Focal Alpha 65 Evo</span> sobre <span class="product-name">soportes IsoAcoustics ISO-200</span> si se quedan en la mesa. Prescinde de todo lo que duplique una función que ya cubriste.</p>';

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('ES:', g.conclusion_es.replace(/<[^>]+>/g, '').trim());
console.log('EN:', g.conclusion.replace(/<[^>]+>/g, '').trim());
