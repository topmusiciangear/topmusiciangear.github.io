const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
[['best-headphones', 'MDR-7506'], ['open-headphones', 'HD 490'], ['stage-wireless', 'EW-D 835'], ['stage-wireless', 'EW-D Dual'], ['stage-wireless', 'SM58 Wireless'], ['best-drum-machine', 'TR-8S'], ['fender-guide', 'Choosing a Fender']].forEach(([id, frag]) => {
  const g = G.find(x => x.id === id);
  g.sections.forEach((s, i) => {
    if ((s.heading || '').includes(frag)) {
      console.log(id, 'sec' + i, 'prods=' + JSON.stringify(s.products), 'skip=' + !!s.skipMedia, 'split=' + !!s.splitProducts);
    }
  });
});