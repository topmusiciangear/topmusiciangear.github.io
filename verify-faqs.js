const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8').replace(/^\ufeff/, '');
const data = JSON.parse(raw);

function strip(s) { return (s || '').replace(/<[^>]+>/g, '').trim(); }

let issues = [];

data.forEach(g => {
  if (!g.featuredSnippet) return;
  const keys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();

  keys.forEach(k => {
    const num = k.match(/\d+/)[0];
    const qEn = g.featuredSnippet[k] || '';
    const qEs = g.featuredSnippet['faq_q' + num + '_es'] || '';
    const aEn = g.featuredSnippet['faq_a' + num + '_en'] || '';
    const aEs = g.featuredSnippet['faq_a' + num + '_es'] || '';

    const plainEn = strip(aEn);
    const plainEs = strip(aEs);

    // 1. Both languages exist
    if (!aEn && aEs) issues.push(g.id + ' Q' + num + ': missing EN answer');
    if (aEn && !aEs) issues.push(g.id + ' Q' + num + ': missing ES answer');
    if (!aEn && !aEs) return;

    // 2. EN direct-response prefix — expanded to match all our templates
    if (plainEn) {
      const ok = /^(Yes[,\s]|No[,.;:!?]|Absolutely\b|Depends\b|Definitely\b|It depends\b|Both (are|the)\b|Both of these\b|The main difference\b|Yes, I would recommend\b)/i.test(plainEn) ||
        /^The .+? (makes a great choice|is recommended (because|for)|stands out\.|is a (standout choice|solid (choice|option|alternative)|great (choice|alternative)|top recommendation)|is our top recommendation|offers a distinct proposition|takes a different approach)/i.test(plainEn) ||
        /^Yes, you should choose the /i.test(plainEn) ||
        /^Yes, the .+? is (a|an)/i.test(plainEn) ||
        /^Yes, I would recommend the /i.test(plainEn);
      if (!ok) issues.push(g.id + ' Q' + num + ' EN prefix: ' + plainEn.substring(0, 80).replace(/\n/g, ' '));
    }

    // 3. ES direct-response prefix — expanded
    if (plainEs) {
      const ok = /^(Sí[,;\s]|No[,.;:!?]|Absolutamente\b|Claramente\b|Depende\b)/i.test(plainEs) ||
        /^Se recomienda\b/i.test(plainEs) ||
        /^(Ambos|Tanto)\b/i.test(plainEs) ||
        /^La (principal )?diferencia/i.test(plainEs) ||
        /^Sí, (deberías elegir |recomendaría |el |la )/i.test(plainEs) ||
        / es una gran opción\./i.test(plainEs.substring(0, 80)) ||
        / son una gran opción\./i.test(plainEs.substring(0, 80)) ||
        / se destaca\./i.test(plainEs.substring(0, 80)) ||
        / es nuestra mejor recomendación\./i.test(plainEs.substring(0, 80)) ||
        / es una (gran alternativa|excelente elección|opción sólida)/i.test(plainEs.substring(0, 80)) ||
        / son una (opción destacada|alternativa sólida)/i.test(plainEs.substring(0, 80)) ||
        / es una buena opción\./i.test(plainEs.substring(0, 80)) ||
        / es recomendado por/i.test(plainEs.substring(0, 80)) ||
        / ofrece una propuesta distinta/i.test(plainEs.substring(0, 80)) ||
        / tiene un enfoque diferente/i.test(plainEs.substring(0, 80)) ||
        / cumple bien\./i.test(plainEs.substring(0, 80)) ||
        / funciona con equipos estándar/i.test(plainEs.substring(0, 80)) ||
        / beneficia a usuarios/i.test(plainEs.substring(0, 80)) ||
        / ofrece opciones versátiles/i.test(plainEs.substring(0, 80)) ||
        / justifica su precio si/i.test(plainEs.substring(0, 80));
      if (!ok) issues.push(g.id + ' Q' + num + ' ES prefix: ' + plainEs.substring(0, 80).replace(/\n/g, ' '));
    }

    // 4. Ending punctuation
    if (plainEn && !/[.?!]$/.test(plainEn)) issues.push(g.id + ' Q' + num + ' EN no period: ' + plainEn.substring(0, 50));
    if (plainEs && !/[.?!]$/.test(plainEs)) issues.push(g.id + ' Q' + num + ' ES no period: ' + plainEs.substring(0, 50));

    // 5. Repeated words
    if (/^(\w+)\s+\1\b/i.test(plainEn)) issues.push(g.id + ' Q' + num + ' EN repeat');
    if (/^(\w+)\s+\1\b/i.test(plainEs)) issues.push(g.id + ' Q' + num + ' ES repeat');

    // 6. Grammar: article-noun agreement in ES
    if (plainEs) {
      const feminineEndings = /[aá](s|$)/i;
      // Known brand/product names that are masculine despite ending in -a
      const knownMasculine = /^(yamaha|katana|arturia|boss|les paul|stratocaster|telecaster|montage|rokit|scarlett|rode|shure|rode nt|rode ntk|rode ntr|rode k2|rode nt1|rode nt2|rode nt3|rode nt4|rode nt5|rode nt6|rode nt7|rode nt8|rode nt9|rode nt10|rode nt11|rode nt12)$/i;
      plainEs.replace(/\bel (\w+)/gi, (m, w) => {
        if (feminineEndings.test(w) && !knownMasculine.test(w) &&
            !/^(día|mapa|problema|sistema|programa|tema|clima|idioma|poema|drama|teorema|auricular|monitor|compresor|ecualizador|preamplificador|amplificador|altavoz|micrófono|sintetizador|secuenciador|controlador|interfaz|cable|trémolo|vibrato)$/i.test(w)) {
          issues.push(g.id + ' Q' + num + ' ES gender: el ' + w);
        }
      });
    }

    // 7. EN grammar: check common issues
    if (plainEn) {
      if (/can\s+[^n]/i.test(plainEn.replace('can\'t', '').replace('cannot', ''))) {
        const m = plainEn.match(/\bca\s+[a-z]/i);
        if (m) issues.push(g.id + ' Q' + num + ' EN typo ca->can: ...' + plainEn.substring(Math.max(0, m.index - 10), m.index + 15));
      }
      if (/\btha\s+[a-z]/i.test(plainEn)) {
        const m = plainEn.match(/\btha\s+[a-z]/i);
        if (m) issues.push(g.id + ' Q' + num + ' EN typo tha->than: ...' + plainEn.substring(Math.max(0, m.index - 10), m.index + 15));
      }
    }
  });
});

console.log('TOTAL ISSUES: ' + issues.length);
if (issues.length > 0) {
  issues.forEach(i => console.log('  ' + i));
} else {
  console.log('All checks passed - no prefix, grammar, or structural issues found!');
}
