const fs = require('fs');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const marks = [/\bHe\s+[a-záéíóúñ]+/g, /\bhe\s+[a-záéíóúñ]+/g, /\bI've\s+[a-z]+/g, /\bI have\s+[a-z]+/g, /\bMi banda\b/g, /\bmi banda\b/g, /\bMy band\b/g, /\bMe he\s+[a-záéíóúñ]+/g, /\bSe la he\b/g, /\bSe lo he\b/g, /\bLo he\b/g, /\bLa he\b/g, /\bHe estado\b/g, /\bHe prestado\b/, /\bHe usado\b/];
function sentences(text) {
  return text.replace(/<[^>]*>/g, '').split(/(?<=[.!?])\s+/);
}
const report = [];
G.forEach(g => {
  const items = [];
  const scan = (text, loc) => {
    if (!text) return;
    sentences(text).forEach(s => {
      if (marks.some(p => { p.lastIndex = 0; return p.test(s); })) items.push({ loc, s: s.trim().slice(0, 280) });
    });
  };
  (g.sections || []).forEach((sec, i) => { scan(sec.content, 'SEC[' + i + '] ' + sec.heading + ' EN'); scan(sec.content_es, 'SEC[' + i + '] ' + sec.heading_es + ' ES'); });
  scan(g.conclusion, 'CONCLUSION EN'); scan(g.conclusion_es, 'CONCLUSION ES');
  if (items.length) report.push({ guide: g.id, title: g.title, items });
});
let total = 0;
report.forEach(r => { total += r.items.length; });
console.log('GUIDES WITH CLAIMS: ' + report.length + ' | TOTAL CLAIMS: ' + total);
report.forEach(r => {
  console.log('\n##### ' + r.guide + ' — ' + r.title + ' (' + r.items.length + ')');
  r.items.forEach(it => console.log('[' + it.loc + '] ' + it.s));
});