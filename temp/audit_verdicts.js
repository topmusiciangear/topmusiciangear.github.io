const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'data');
const guides = JSON.parse(fs.readFileSync(path.join(DATA, 'guides.json'), 'utf8'));
const WINNERS = require('./winners.js');

const BAD = [
  'destaca por su equilibrio, coherencia',
  'es una opción sólida que ofrece resultados naturales',
  'obtienes un rendimiento consistente que cumple lo que promete',
  'se destaca por su versatilidad y facilidad de uso',
  'es una elección acertada',
  'tiene un carácter propio que lo distingue',
  'responde con naturalidad en situaciones reales',
  'es perfecto para empezar gracias a su curva de aprendizaje',
  'resultados son consistentes día tras día',
  'demuestra que se puede obtener calidad sin pagar de más',
  'relación calidad-precio del el producto',
];
const TIER = /gama\s+(alta|media|baja)|de\s+élite|gama\s+de\s+entrada/i;

let issues = 0;
const report = [];

const CLEAN = (s) => s
  .replace(/^Altavoz\s+(Activo|Pasivo|PA Activo)\s+/i, '')
  .replace(/^Columna\s+PA\s+Activa\s+/i, '')
  .replace(/^Micrófono\s+(Dinámico\s+|de\s+Condensador\s+de\s+Estudio\s+|de\s+Condensador\s+de\s+Gran\s+Diafragma\s+|Supercardioide\s+|On-Camera\s+|Shotgun\s+Corto\s+|Shotgun\s+Compacto\s+|Shotgun\s+|USB\s+de\s+Gaming\s+|USB\s+de\s+Condensador\s+Cardioide\s+|USB\s+de\s+Condensador\s+Compacto\s+|USB\s+Condensador\s+|USB\s+)?/i, '')
  .replace(/^Sistema\s+(Estéreo\s+Inalámbrico|In-Ear\s+Inalámbrico|Inalámbrico|Estéreo\s+UHF)\s+/i, '')
  .replace(/^Guitarra\s+(Eléctrica\s+Inteligente|Inteligente|Parlor\s+Electroacústica|Electroacústica|Parlor|Acústica|acústica)\s+/i, '')
  .replace(/^Guitarra\s+/i, '')
  .replace(/^Bajo\s+/i, '')
  .replace(/^Interfaz\s+Directa\s+Activa\s+/i, '')
  .replace(/^Controlador\s+DAW\s+/i, '')
  .trim();

for (const g of guides) {
  const v = (g.verdict_es || '') + ' ' + (g.conclusion_es || '') + ' ' + (g.verdict || '') + ' ' + (g.conclusion || '');
  const txt = v.replace(/<[^>]+>/g, ' ');
  for (const b of BAD) {
    if (txt.toLowerCase().includes(b)) { report.push(g.id + ' :: plantilla: ' + b); issues++; }
  }
  if (TIER.test(txt)) { report.push(g.id + ' :: etiqueta de gama'); issues++; }
  if (/[$€]/.test(txt)) { report.push(g.id + ' :: precio'); issues++; }
  if (/\bde el\b|\ba el\b|\{name\}/.test(txt)) { report.push(g.id + ' :: gramática'); issues++; }
  if (/\bel guitarra\b|\bEl guitarra\b/.test(txt)) { report.push(g.id + ' :: artículo'); issues++; }
  // Frases cortadas a media idea (terminan en preposición/conjunción)
  const dangling = txt.match(/(?:^|\s)(de|con|para|en|a|por|sin|y|o|que|del|al|los|las|un|una)\.\s|—\s*$/g);
  if (dangling) { report.push(g.id + ' :: corte a media frase (' + dangling.slice(0, 3).join(' | ') + ')'); issues++; }

  const w0 = WINNERS[g.id];
  const w = w0 ? CLEAN(w0) : '';
  if (!w || !txt.includes(w)) { report.push(g.id + ' :: ganador no aparece (' + w + ')'); issues++; }
  const plain = (g.verdict_es || '').replace(/<[^>]+>/g, ' ');
  const posW = plain.indexOf(w);
  if (posW > 60) { report.push(g.id + ' :: ganador no está al inicio (pos ' + posW + ')'); issues++; }
}

console.log('Guías:', guides.length);
console.log('Problemas:', issues);
console.log(report.slice(0, 80).join('\n'));
