const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
[['open-headphones', 'HD 490'], ['best-drum-machine', 'TR-8S'], ['best-daw-for-beginners', 'Ableton Live 12 Suite'], ['stage-wireless', '835-S'], ['stage-wireless', 'Dual'], ['stage-wireless', 'SM58']].forEach(([id, frag]) => {
  const g = G.find(x => x.id === id);
  g.sections.forEach((s, i) => {
    if ((s.heading || '').includes(frag)) {
      console.log(id, 'sec' + i, 'prods=' + JSON.stringify(s.products), 'skip=' + !!s.skipMedia, 'split=' + !!s.splitProducts);
    }
  });
});