// Todas las afirmaciones de precio de starter-studio que hay que rehacer
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const PATRONES = [/\$545/g, /\$816/g, /\$905/g, /\$1,?284/g, /\$1\.000/g, /\$1,000/g,
  /five hundred/i, /quinientos/i, /under \$1,?000/i, /less than \$1,?000/i, /menos de \$1\.000/i,
  /under five hundred/i, /\b485\b/g];

console.log('=== CAMPOS CON AFIRMACIONES DE PRECIO ===\n');
function revisar(etiq, txt) {
  if (typeof txt !== 'string') return;
  const hits = PATRONES.filter(p => p.test(txt));
  if (!hits.length) return;
  console.log('\n--- ' + etiq + ' ---');
  // trocear por parrafo
  txt.split(/(?=<p>)/).forEach(frag => {
    if (PATRONES.some(p => p.test(frag))) console.log('   ' + frag.replace(/\s+/g, ' ').trim());
  });
}

revisar('title', guia.title);
revisar('title_es', guia.title_es);
revisar('titleTag', guia.titleTag);
revisar('titleTag_es', guia.titleTag_es);
revisar('intro', guia.intro);
revisar('intro_es', guia.intro_es);
revisar('description', guia.description);
revisar('description_es', guia.description_es);
revisar('featuredSnippet', JSON.stringify(guia.featuredSnippet).slice(0, 4000));
revisar('conclusion', guia.conclusion);
revisar('conclusion_es', guia.conclusion_es);
revisar('verdict', guia.verdict);
revisar('verdict_es', guia.verdict_es);
guia.sections.forEach((s, i) => { revisar('sections[' + i + '] ' + (s.heading_es || s.heading), s.content); revisar('sections[' + i + '].es', s.content_es); });
