var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

function fixAll(field, from, to) {
  g.forEach(guide=>{
    if(guide[field] && guide[field].includes(from)) {
      guide[field] = guide[field].split(from).join(to);
      fixed++;
    }
    guide.sections.forEach((s,j)=>{
      if(s[field] && s[field].includes(from)) {
        guide.sections[j][field] = s[field].split(from).join(to);
        fixed++;
      }
    });
  });
}

// "Ya sea que" → more natural Spanish
fixAll('intro_es', 'Ya sea que', 'Ya sea');
fixAll('content_es', 'Ya sea que', 'Ya sea');

// "te sorprenderá" → remove AI cliché
fixAll('content_es', 'no te sorprenderá', 'no es sorprendente');

// "te ofrece" → vary (keep some, but fix obvious AI ones)
fixAll('content_es', 'te ofrece el 90%', 'te da el 90%');
fixAll('content_es', 'te ofrece opciones', 'presenta opciones');

// "disfrutarás de" → natural
fixAll('content_es', 'disfrutarás de', 'disfruta de');
fixAll('content_es', 'te encantará', 'es una buena opción');

// "No busques más" → AI cliché
fixAll('content_es', 'No busques más', 'Estas son las opciones');

// "encaja perfectamente" → AI cliché
fixAll('content_es', 'encaja perfectamente', 'encaja bien');

// "se siente como en casa" → AI cliché
fixAll('content_es', 'se siente como en casa', 'resulta cómodo');

// "realmente impresionante" → reduce
fixAll('content_es', 'realmente impresionante', 'muy bueno');

// "sin duda" overuse → vary
fixAll('content_es', 'sin duda, es', 'es');

// "definitivamente" overuse → vary
fixAll('content_es', 'definitivamente es', 'es');
fixAll('content_es', 'definitivamente la', 'la');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Total fixes: '+fixed);

// Count remaining "Ya sea que"
var yaseaque = 0;
g.forEach(guide=>{
  ['intro_es','conclusion_es'].forEach(f=>{
    if(guide[f] && guide[f].includes('Ya sea que')) yaseaque++;
  });
  guide.sections.forEach(s=>{
    if(s.content_es && s.content_es.includes('Ya sea que')) yaseaque++;
  });
});
console.log('Remaining "Ya sea que": '+yaseaque);
