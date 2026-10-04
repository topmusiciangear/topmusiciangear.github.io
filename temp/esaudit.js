const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const miss = { colTitle: 0, rowLabel: 0, cellVal: 0, secHead: 0, secContent: 0, vName: 0, vPros: 0, vCons: 0, faq: 0, intro: 0, concl: 0, verdict: 0, title: 0 };
const ex = [];
G.forEach(g => {
  if (!g.title_es) { miss.title++; ex.push(g.id + ' sin title_es'); }
  if (!g.intro_es) { miss.intro++; ex.push(g.id + ' sin intro_es'); }
  if (!g.conclusion_es) { miss.concl++; ex.push(g.id + ' sin conclusion_es'); }
  if (!g.verdict_es) { miss.verdict++; ex.push(g.id + ' sin verdict_es'); }
  (g.sections || []).forEach((s, i) => {
    if (!s.heading_es) { miss.secHead++; ex.push(g.id + ' sec' + i + ' sin heading_es'); }
    if (!s.content_es) { miss.secContent++; ex.push(g.id + ' sec' + i + ' sin content_es'); }
  });
  if (g.productTable) {
    (g.productTable.columns || []).forEach((c, i) => {
      if (!c.title_es) { miss.colTitle++; ex.push(g.id + ' col' + i + ' "' + c.title + '" sin title_es'); }
    });
    (g.productTable.rows || []).forEach((r, i) => {
      if (!r.label_es) { miss.rowLabel++; ex.push(g.id + ' row "' + r.label + '" sin label_es'); }
      (r.values || []).forEach((v, j) => {
        if (!v.value_es) { miss.cellVal++; ex.push(g.id + ' row "' + r.label + '" val' + j + ' "' + v.value + '" sin value_es'); }
      });
    });
  }
  if (g.comparison) {
    (g.comparison.rows || []).forEach((r, i) => {
      if (!r.label_es) { miss.rowLabel++; ex.push(g.id + ' COMP row "' + r.label + '" sin label_es'); }
      ['val1', 'val2', 'val3', 'val4', 'val5'].forEach(k => {
        const ek = k + '_es';
        if (r[k] && !r[ek]) { miss.cellVal++; ex.push(g.id + ' COMP "' + r.label + '" ' + k + ' "' + r[k] + '" sin ' + ek); }
      });
    });
  }
  (g.verdictProsCons || []).forEach(v => {
    if (!v.name_es) { miss.vName++; ex.push(g.id + ' vpc "' + v.name + '" sin name_es'); }
    (v.pros || []).forEach((p, i) => { if (!(v.pros_es || [])[i]) { miss.vPros++; ex.push(g.id + ' vpc "' + v.name + '" pro' + i + ' sin ES'); } });
    (v.cons || []).forEach((p, i) => { if (!(v.cons_es || [])[i]) { miss.vCons++; ex.push(g.id + ' vpc "' + v.name + '" con' + i + ' sin ES'); } });
  });
});
console.log(JSON.stringify(miss));
console.log('total:', ex.length);
ex.slice(0, 60).forEach(e => console.log(' ' + e));