const fs = require('fs');
const files = ['temp/part1.json','temp/part2.json','temp/part3.json','temp/part4.json','temp/part5.json','temp/part6.json'];
let all = [];
for (const f of files) { const a = JSON.parse(fs.readFileSync(f, 'utf8')); all = all.concat(a); }
console.log('total entries: ' + all.length);
const NL = String.fromCharCode(10) + String.fromCharCode(10);
let issues = [];
for (const e of all) {
  const en = e.sec.content;
  const es = e.sec.content_es;
  const enW = en.split(/\s+/).filter(Boolean).length;
  const esW = es.split(/\s+/).filter(Boolean).length;
  const pEn = en.split(NL).length;
  const pEs = es.split(NL).length;
  let flags = [];
  if (enW < 100 || enW > 140) flags.push('EN words=' + enW);
  if (esW < 100 || esW > 140) flags.push('ES words=' + esW);
  if (pEn !== 2) flags.push('EN paras=' + pEn);
  if (pEs !== 2) flags.push('ES paras=' + pEs);
  if (/[$\u20AC\u00A3]/.test(en) || /[$\u20AC\u00A3]/.test(es)) flags.push('PRICE SYMBOL');
  if (/\bperfect\b/i.test(en)) flags.push('perfect EN');
  if (/\bultimate\b/i.test(en)) flags.push('ultimate EN');
  if (/\bunbeatable\b/i.test(en)) flags.push('unbeatable EN');
  if (/\bbest investment\b/i.test(en)) flags.push('best-investment EN');
  if (/\bbest\b/i.test(en)) flags.push('best EN');
  if (/Undays/i.test(en)) flags.push('TYPO Undays');
  if (/\bmuerto|\u6b7b|\u4ea1/.test(es + en)) flags.push('CJK/typo');
  if (/\bwe\b/i.test(en)) flags.push('we EN');
  if (/\bour\b/i.test(en)) flags.push('our EN');
  if (/\bHe\b/.test(en)) flags.push('He EN');
  if (/(^|\s)I(\s|[.,;])/.test(en)) flags.push('I EN');
  if (/\bmy\b/i.test(en)) flags.push('my EN');
  if (/\bnosotros\b/i.test(es)) flags.push('nosotros ES');
  if (flags.length) issues.push((e.g + ':' + e.sec.products[0]) + ' -> ' + flags.join(', ') + ' | EN=' + enW + ' ES=' + esW);
  // Spanish mi/me check with word boundaries
  const esTokens = es.toLowerCase().split(/[^a-z\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00fc]+/);
  if (esTokens.includes('mi')) issues.push(e.g + ':' + e.sec.products[0] + ' -> MI token ES');
  if (esTokens.includes('me')) issues.push(e.g + ':' + e.sec.products[0] + ' -> ME token ES');
  const enTokens = en.toLowerCase().split(/[^a-z]+/);
  if (enTokens.includes('us')) issues.push(e.g + ':' + e.sec.products[0] + ' -> US token EN');
}
console.log(issues.join('\n') || 'ALL CHECKS CLEAN');
