const { rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
['Yamaha HS8', 'KRK Rokit 7 G5'].forEach(nm => {
  const id = mapId(nm);
  console.log(nm, '=> id', id, '=> range', id ? rangeFor(id) : '(no map)');
});