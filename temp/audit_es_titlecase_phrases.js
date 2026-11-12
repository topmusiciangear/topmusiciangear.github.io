// temp/audit_es_titlecase_phrases.js — detecta secuencias de 2+ palabras comunes capitalizadas (Title Case real en ES)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES_ES = new Set([
  'de','del','la','el','los','las','un','una','unos','unas','y','o','para','en','con','por','sin','sobre','entre','como','más','menos','tras','según','durante','hacia','hasta','desde','ante','bajo','cabe','contra','excepto','incluso','mediante','salvo','versus','vs','e','ni','que','quien','cuyo','cuya','cuyos','cuyas','donde','cuando','cuán','cuál','cuáles','qué','cómo','dónde','cuándo','si','sí','no','ya','se','cada','todo','todos','toda','todas','otro','otros','otra','otras','antes','después','ahora','solo','sólo','también','dentro','fuera','cual','cualquiera','cualesquiera','nadie','alguien','algo','nada','poco','pocos','pocas','mucho','mucha','muchos','muchas','demasiado','demasiada','demasiados','demasiadas','bastante','bastantes','cualquier','cualquiera','cualesquiera','cada','este','esta','estos','estas','ese','esa','esos','esas','aquel','aquella','aquellos','aquellas','mío','mía','míos','mías','tuyo','tuya','tuyos','tuyas','suyo','suya','suyos','suyas','nuestro','nuestra','nuestros','nuestras','vuestro','vuestra','vuestros','vuestras','bien','mal','así','aún','aun','ése','ésa','éste','ésta','aquél','aquella','aquellos','aquellas','este','esta','estos','estas','ese','esa','esos','esas','más','menos','muy','bastante','demasiado','poco','un','una','unos','unas','algo','alguien','nadie','nada','siempre','nunca','casi','solo','sólo','también','tampoco','ya','todavía','aún','entonces','luego','antes','después','mientras','cuando','cuándo','donde','dónde','como','cómo','por qué','porque','porqué','aunque','pero','si','sí','no','ni','o','u','y','e'
]);

function stripHtml(txt) { return String(txt || '').replace(/<[^>]+>/g, ' '); }
function cleanWord(w) { return w.replace(/^[¿¡"'«*\[\]{}]+/,'').replace(/[.,;:!?]+$/,''); }

function findPhrases(txt) {
  const plano = stripHtml(txt).replace(/\s+/g, ' ').trim();
  if (!plano) return [];
  // dividir en segmentos de oración
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const frases = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/\s+/).filter(Boolean);
    for (let i = 1; i < palabras.length; i++) {
      const c = cleanWord(palabras[i]);
      if (!c) continue;
      if (COMUNES_ES.has(c.toLowerCase()) && /^[A-ZÁÉÍÓÚÑ]/.test(c)) {
        // construir frase: tomar esta palabra y las siguientes comunes también capitalizadas
        let frase = c;
        let j = i + 1;
        while (j < palabras.length) {
          const c2 = cleanWord(palabras[j]);
          if (!c2) break;
          if (COMUNES_ES.has(c2.toLowerCase()) && /^[A-ZÁÉÍÓÚÑ]/.test(c2)) {
            frase += ' ' + c2;
            j++;
          } else break;
        }
        if (frase.split(/\s+/).length >= 2) frases.push(frase);
        i = j - 1;
      }
    }
  });
  return frases;
}

const problemas = [];
const push = (guia, campo, txt) => {
  const m = findPhrases(txt);
  if (m.length >= 1) problemas.push({ guia, campo, txt: String(txt), frases: m });
};

guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  push(g.id, 'intro_es', g.intro_es);
  push(g.id, 'conclusion_es', g.conclusion_es);
  push(g.id, 'verdict_es', g.verdict_es);
  (g.sections || []).forEach((s, i) => {
    push(g.id, `sections[${i}].heading_es`, s.heading_es);
    push(g.id, `sections[${i}].content_es`, s.content_es);
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    (v.pros_es || []).forEach((p, j) => push(g.id, `verdictProsCons[${i}].pros_es[${j}]`, p));
    (v.cons_es || []).forEach((c, j) => push(g.id, `verdictProsCons[${i}].cons_es[${j}]`, c));
  });
  (g.faq || []).forEach((f, i) => {
    push(g.id, `faq[${i}].q_es`, f.q_es);
    push(g.id, `faq[${i}].a_es`, f.a_es);
  });
  if (g.productTable) {
    push(g.id, 'productTable.title_es', g.productTable.title_es);
    (g.productTable.rows || []).forEach((r, i) => {
      (r.values || []).forEach((val, k) => {
        if (val.value_es) push(g.id, `productTable.rows[${i}].values[${k}].value_es`, val.value_es);
      });
    });
  }
});

console.log('TOTAL CAMPOS ES CON FRASES TITLE CASE (2+ palabras comunes capitalizadas): ' + problemas.length);
problemas.forEach(p => {
  console.log('\n--- ' + p.guia + ' :: ' + p.campo);
  console.log('   FRASES: ' + p.frases.join(' | '));
  console.log('   TEXTO: ' + p.txt.slice(0, 160).replace(/\s+/g, ' '));
});
fs.writeFileSync(B + 'temp/es_titlecase_phrases.json', JSON.stringify(problemas, null, 2), 'utf8');
console.log('\nGuardado en temp/es_titlecase_phrases.json');
