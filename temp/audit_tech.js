const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== AUDITORIA TECNICA: specs sospechosas ===\n');

const sospechas = [];

// 1. Frases de marketing sin sustento
const marketingPatterns = [
  { regex: /professional-grade/i, desc: '"professional-grade" sin especificar qué la hace profesional' },
  { regex: /studio-grade/i, desc: '"studio-grade" genérico' },
  { regex: /high-end/i, desc: '"high-end" sin concretar' },
  { regex: /industry.standard/i, desc: '"industry standard" - verificar que sea realmente estándar' },
  { regex: /broadcast.quality/i, desc: '"broadcast quality" genérico' },
  { regex: /crystal.clear/i, desc: '"crystal clear" - especificar dB o rango' },
  { regex: /pristine/i, desc: '"pristine" sin specs' },
];

// 2. Valores redondos sin contexto (posiblemente inventados)
const roundNumberPatterns = [
  { regex: /\b100\s*W\b/g, desc: '100W redondo sin más precisión' },
  { regex: /\b1000\s*W\b/g, desc: '1000W redondo' },
  { regex: /\b48\s*kHz\b/g, desc: '48kHz (puede ser correcto para USB, verificar contexto)' },
  { regex: /\b24.bit\b/g, desc: '24-bit (verificar que sea real en todas las apariciones)' },
];

// 3. Falta de specs clave que la competencia siempre muestra
const missingSpecsPatterns = [
  { regex: /frequency response.*not published/i, desc: 'Frequency response not published' },
  { regex: /sensitivity.*not published/i, desc: 'Sensitivity not published' },
];

// 4. Errores técnicos comunes
const techErrorPatterns = [
  { regex: /XLR.*TRS.*same/gi, desc: 'XLR y TRS no son lo mismo' },
  { regex: /USB.C.*USB.B/gi, desc: 'Verificar que el conector sea realmente USB-C' },
  { regex: /kHz.*Hz/g, desc: 'Verificar conversión kHz/Hz correcta' },
];

guides.forEach(g => {
  const allText = [];
  (g.sections || []).forEach(s => {
    if (s.content_es) allText.push({ seccion: 'section', texto: s.content_es });
    if (s.content) allText.push({ seccion: 'section_en', texto: s.content });
  });
  if (g.verdict_es) allText.push({ seccion: 'verdict', texto: g.verdict_es });
  if (g.verdict) allText.push({ seccion: 'verdict_en', texto: g.verdict });
  if (g.conclusion_es) allText.push({ seccion: 'conclusion', texto: g.conclusion_es });
  if (g.conclusion) allText.push({ seccion: 'conclusion_en', texto: g.conclusion });

  allText.forEach(item => {
    const texto = item.texto;
    
    marketingPatterns.forEach(p => {
      if (p.regex.test(texto)) {
        const match = texto.match(p.regex);
        sospechas.push({ guia: g.id, seccion: item.seccion, problema: p.desc, match: match[0], contexto: texto.slice(Math.max(0, texto.indexOf(match[0]) - 60), texto.indexOf(match[0]) + match[0].length + 60) });
      }
    });
  });
});

console.log('Total sospechas:', sospechas.length);
console.log('');

const grouped = {};
sospechas.forEach(s => {
  if (!grouped[s.problema]) grouped[s.problema] = [];
  grouped[s.problema].push(s);
});

Object.keys(grouped).sort().forEach(problema => {
  console.log('--- ' + problema + ' (' + grouped[problema].length + ') ---');
  grouped[problema].slice(0, 5).forEach(s => {
    console.log('  ' + s.guia + ' [' + s.seccion + ']');
    console.log('    ...' + s.contexto.replace(/\n/g, ' ').slice(0, 140) + '...');
  });
  if (grouped[problema].length > 5) console.log('  ... y ' + (grouped[problema].length - 5) + ' mas');
  console.log('');
});