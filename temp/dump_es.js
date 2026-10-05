const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const show = (id, labels) => {
  const g = G.find(x => x.id === id);
  labels.forEach(L => {
    const r = g.productTable.rows.find(r => r.label === L);
    if (!r) { console.log(id + ' NO ROW ' + L); return; }
    console.log('## ' + id + ' [' + L + ']');
    r.values.forEach(v => console.log('EN: ' + v.value + ' || ES: ' + v.value_es));
  });
};
show('best-practice-amps', ['Channels', 'Weight']);
show('best-bass-amps', ['Type', 'Power', 'Weight']);
show('best-bass-practice-amps', ['Battery']);