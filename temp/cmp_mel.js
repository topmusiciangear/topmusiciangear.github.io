const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/repitch-vs-melodyne.html', 'guides/best-plugins.html', 'guides/vocal-plugins.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const has99 = h.includes('99.00') || h.includes('99<');
  const hasOld = h.includes('83.20') || h.includes('79.00');
  console.log(f + ': nuevo MS/And present=' + (h.includes('99') ? 'SI' : 'NO') + ' | restos 83.20/79.00=' + (hasOld ? 'SI!' : 'no'));
});
