const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Extraer conclusiones y veredictos de cada guía
const guideData = {};

guides.forEach(g => {
  const data = {
    id: g.id,
    title: g.title,
    verdict: g.verdict || '',
    verdict_es: g.verdict_es || '',
    conclusion: g.conclusion || '',
    conclusion_es: g.conclusion_es || '',
    verdictProsCons: g.verdictProsCons || [],
    productTable: g.productTable || null
  };
  guideData[g.id] = data;
});

// Mostrar conclusiones y veredictos
console.log('=== CONCLUSIONES Y VEREDICTOS ===\n');
Object.values(guideData).forEach(g => {
  console.log('### ' + g.id);
  console.log('Título: ' + g.title);
  if (g.verdict) console.log('Veredicto: ' + g.verdict);
  if (g.verdict_es) console.log('Veredicto ES: ' + g.verdict_es);
  if (g.conclusion) console.log('Conclusión: ' + g.conclusion.substring(0, 200) + '...');
  if (g.conclusion_es) console.log('Conclusión ES: ' + g.conclusion_es.substring(0, 200) + '...');
  if (g.verdictProsCons && g.verdictProsCons.length > 0) {
    console.log('Productos:');
    g.verdictProsCons.forEach(v => {
      console.log('  - ' + v.name + (v.name_es ? ' / ' + v.name_es : ''));
    });
  }
  console.log('');
});

// Guardar para análisis
fs.writeFileSync(B + 'temp/guide_data.json', JSON.stringify(guideData, null, 2), 'utf8');
console.log('Datos guardados en temp/guide_data.json');