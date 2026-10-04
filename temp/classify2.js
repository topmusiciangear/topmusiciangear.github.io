const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const del = [], expand = [];
G.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const isCloser = /Closer Look/i.test(s.heading || '');
    const len = (s.content || '').length;
    const prods = s.products || [];
    if (isCloser) {
      // rich twin? another section with overlapping product and longer content, not closer-look
      const twin = (g.sections || []).some((o, j) => {
        if (j === i || /Closer Look/i.test(o.heading || '')) return false;
        return (o.products || []).some(p => prods.includes(p)) && (o.content || '').length > len;
      });
      if (twin) del.push(g.id + ' sec' + i + ' [' + s.heading + ']');
      else expand.push(g.id + ' sec' + i + ' [' + s.heading + '] len=' + len);
    } else if (prods.length === 1 && len < 550 && !/^(The|How|What|Why|Which|Verdict|Decision|Buying|Pros|Active|Passive)/i.test(s.heading || '')) {
      expand.push(g.id + ' sec' + i + ' [' + s.heading + '] len=' + len);
    }
  });
});
console.log('BORRAR (duplicadas pobres):', del.length);
del.forEach(d => console.log(' DEL ' + d));
console.log('EXPANDIR:', expand.length);