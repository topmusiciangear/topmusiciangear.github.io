const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const patterns = [
  { regex: /pristine/i, desc: 'pristine' },
  { regex: /high-end/i, desc: 'high-end' },
  { regex: /studio-grade/i, desc: 'studio-grade' },
  { regex: /professional-grade/i, desc: 'professional-grade' },
  { regex: /broadcast.quality/i, desc: 'broadcast quality' },
  { regex: /crystal.clear/i, desc: 'crystal clear' },
  { regex: /industry.standard/i, desc: 'industry standard' },
];

let enTabla = 0;
let enTexto = 0;
let enProsCons = 0;

const desglose = {};

guides.forEach(g => {
  // Check productTable
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(r => {
      if (r.values) r.values.forEach(v => {
        if (v.value_es) {
          patterns.forEach(p => {
            if (p.regex.test(v.value_es)) {
              enTabla++;
              desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 };
              desglose[p.desc].tabla++;
            }
          });
        }
      });
    });
  }

  // Check sections, intro, conclusion
  (g.sections || []).forEach(s => {
    if (s.content_es) {
      patterns.forEach(p => {
        if (p.regex.test(s.content_es)) {
          enTexto++;
          desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 };
          desglose[p.desc].texto++;
        }
      });
    }
  });
  if (g.intro_es) {
    patterns.forEach(p => { if (p.regex.test(g.intro_es)) { enTexto++; desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 }; desglose[p.desc].texto++; } });
  }
  if (g.conclusion_es) {
    patterns.forEach(p => { if (p.regex.test(g.conclusion_es)) { enTexto++; desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 }; desglose[p.desc].texto++; } });
  }
  if (g.verdict_es) {
    patterns.forEach(p => { if (p.regex.test(g.verdict_es)) { enTexto++; desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 }; desglose[p.desc].texto++; } });
  }

  // Check pros/cons
  (g.verdictProsCons || []).forEach(v => {
    v.pros_es.concat(v.cons_es).forEach(t => {
      patterns.forEach(p => {
        if (p.regex.test(t)) {
          enProsCons++;
          desglose[p.desc] = desglose[p.desc] || { tabla: 0, texto: 0, proscons: 0 };
          desglose[p.desc].proscons++;
        }
      });
    });
  });
});

console.log('=== Donde estan las specs sospechosas (ES) ===\n');
console.log('En tablas (productTable):', enTabla);
console.log('En textos (sections/intro/conclusion):', enTexto);
console.log('En pros/cons:', enProsCons);
console.log('Total:', enTabla + enTexto + enProsCons);

console.log('\n=== Desglose por patron ===');
Object.keys(desglose).sort().forEach(k => {
  const d = desglose[k];
  console.log('  ' + k + ': tabla=' + d.tabla + ' texto=' + d.texto + ' proscons=' + d.proscons);
});