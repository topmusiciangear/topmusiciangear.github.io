const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let closer = 0, rich = 0;
const thin = [];
G.forEach(g => {
  (g.sections || []).forEach(s => {
    const len = (s.content || '').length;
    if (/Closer Look/i.test(s.heading || '')) {
      closer++;
      if (len < 500) thin.push(g.id + ' :: ' + s.heading + ' (' + len + ')');
    } else if ((s.products || []).length === 1 && len < 550 && !/^(The|How|What|Why|Which|Verdict|Decision|Buying|Pros)/i.test(s.heading || '')) {
      rich++;
    }
  });
});
console.log('closer-looks:', closer, '| thin closer-looks(<500):', thin.length, '| thin single-product:', rich);
thin.slice(0, 40).forEach(t => console.log(' ' + t));