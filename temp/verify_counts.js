const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const ids = ['budget-mics', 'budget-usb-mics', 'best-shotgun-mics', 'di-box',
  'best-parlor-guitars', 'premium-interfaces', 'studio-subwoofers', 'best-wireless-iems'];

let bad = 0;
ids.forEach(function (id) {
  ['en', 'es'].forEach(function (l) {
    const f = BASE + 'guides/' + id + (l === 'es' ? '_es' : '') + '.html';
    const h = fs.readFileSync(f, 'utf8');
    const pick = re => { const m = h.match(re); return m ? m[1] : ''; };
    const t = pick(/<title>([\s\S]*?)<\/title>/);
    const og = pick(/property="og:title" content="([^"]*)"/);
    const tw = pick(/<meta name="twitter:title" content="([^"]*)"/);
    const d = pick(/<meta name="description" content="([^"]*)"/);
    const h1 = pick(/<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    const errs = [];
    if (t !== og) errs.push('og:title != title');
    if (tw && tw !== t) errs.push('twitter:title != title');
    if (/^\d/.test(t)) errs.push('titulo empieza por numero');
    if (/\b(23|13|11|10|9|8|7|6|5)\s+(Best|Los|Mejores)\b/i.test(t)) errs.push('conteo residual: ' + t);
    if (t.length > 60) errs.push('>60 chars');
    if (d.length > 155) errs.push('desc >155');
    if (/\b(13|7|5)\s+(Best|Los|mejores)\b/i.test(d)) errs.push('desc con conteo: ' + d.slice(0, 40));

    if (errs.length) { bad++; console.log('  !! [' + l.toUpperCase() + '] ' + id + ': ' + errs.join(' | ')); }
    console.log((l === 'es' ? 'ES ' : 'EN ') + '[' + String(t.length).padStart(2) + '] ' + t);
    console.log('      h1 : ' + h1);
    console.log('      desc[' + String(d.length).padStart(3) + ']: ' + d);
  });
});
console.log('\ndiscrepancias: ' + bad);