const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let content = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(content);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== VERIFICACIÓN DE TEXTOS EN VS ES ===');
for(let i=1; i<=g.sections.length-1; i++) {
  const s = g.sections[i];
  const esText = s.content_es || '';
  
  const enWords = ['monitor', ' DSP', ' Hz', ' dB', ' studio', ' Room'];
  let foundEN = [];
  enWords.forEach(function(w) {
    if(esText.includes(w)) foundEvents.push(w);
  });
  
  console.log('Sección ' + i + ':', s.heading_es.substring(0, 50));
  console.log('   Tiene palabras EN en ES:', foundEN.length > 0 ? foundEN.join(', ') : 'No');
  console.log('');
}