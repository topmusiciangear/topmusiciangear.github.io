const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
[['best-drum-machine', 'TR-8S'], ['best-grooveboxes', 'TR-8S'], ['best-daw-for-beginners', 'Ableton Live 12 Suite'], ['best-headphones-for-mixing', 'ATH-M50x']].forEach(([id, frag]) => {
  const g = G.find(x => x.id === id);
  g.sections.forEach((s, i) => {
    if ((s.heading || '').includes(frag)) {
      console.log(id, 'sec' + i, 'prods=' + JSON.stringify(s.products), 'skip=' + !!s.skipMedia);
    }
  });
});