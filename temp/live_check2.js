const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const GUIDES = ['stage-wireless', 'blx288-vs-ewd', 'stage-mics'];
(async () => {
  for (const g of GUIDES) {
    for (const lang of ['', '_es']) {
      const p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA } });
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const cc = s => (h.match(s) || []).length;
      console.log('--- ' + g + lang + ': 755.00=' + cc(/755\.00/g) + ' 759.00=' + cc(/759\.00/g) + ' $1,099.00=' + cc(/\$1,099\.00/g) + ' | old 845.00=' + cc(/845\.00/g) + ' $999.00=' + cc(/\$999\.00/g) + ' | andertons EW-D link=' + cc(/ew-d-me2-835-s-set-lavalier/g) + ' | pxf.io=' + cc(/pxf\.io/g));
    }
  }
})();
