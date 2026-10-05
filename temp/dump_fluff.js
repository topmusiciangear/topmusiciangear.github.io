const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const pats = [/most recorded/i, /best-selling/i, /\bunbeatable\b/i, /\bultimate\b/i, /most versatile/i, /perfect for beginners/i, /best investment/i, /most famous/i, /world's best/i, /most iconic/i, /most affordable way/i, /most .* in history/i];
G.forEach(g => {
  (g.verdictProsCons || []).forEach(v => {
    ['pros', 'cons'].forEach(k => {
      (v[k] || []).forEach((s, i) => {
        if (pats.some(p => p.test(s))) {
          const es = (v[k + '_es'] || [])[i];
          console.log('### ' + g.id + ' | ' + v.name + ' | ' + k + '[' + i + ']');
          console.log('EN: ' + s);
          console.log('ES: ' + es);
        }
      });
    });
  });
});