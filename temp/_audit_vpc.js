const g = require('../data/guides.json');
const flags = [];
for (const x of g) {
  const id = x.id;
  if (!x.title && !x.title_es) flags.push(id + ': sin title');
  if (!x.conclusion && !x.conclusion_es) flags.push(id + ': sin conclusion');
  if (!!x.conclusion !== !!x.conclusion_es) flags.push(id + ': conclusion EN/ES asimétrico');
  if ((x.conclusion_es || '').length < 100) flags.push(id + ': conclusion_es muy corta (' + (x.conclusion_es || '').length + ')');
  const vp = x.verdictProsCons;
  if (vp && vp.length) {
    for (let i = 0; i < vp.length; i++) {
      const v = vp[i];
      const p = v.pros, c = v.cons, pe = v.pros_es, ce = v.cons_es;
      const np = (p || []).length, npe = (pe || []).length, nc = (c || []).length, nce = (ce || []).length;
      if ((np || nc) && !pe && !ce) flags.push(id + '[v' + i + ']: pros/cons sin ES');
      if (np !== npe && np > 0) flags.push(id + '[v' + i + ']: pros EN' + np + ' vs ES' + npe);
      if (nc !== nce && nc > 0) flags.push(id + '[v' + i + ']: cons EN' + nc + ' vs ES' + nce);
    }
  } else flags.push(id + ': sin verdictProsCons');
}
console.log('flags:', flags.length);
console.log(flags.slice(0, 60).join('\n'));