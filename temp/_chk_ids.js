const p = require('../data/products.json');
for (const i of [351, 367, 368, 369, 53, 326, 445, 447, 448, 414, 415, 416, 417, 418]) {
  const x = p.find(y => y.id === i);
  if (!x) { console.log(i, '=> NO PRODUCT in products.json'); continue; }
  const name = (x.name || '').slice(0, 34);
  const g4m = x.gear4music || '';
  let us = /us\/en/.test(g4m) ? ' [G4M-US]' : '';
  console.log(i, '(' + name + ')' + ' brand=' + (x.brand || '-') + us);
  if (us === ' [G4M-US]' && g4m) console.log('     ', g4m);
}