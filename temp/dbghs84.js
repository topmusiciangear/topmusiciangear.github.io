const fs = require('fs');
const { rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'hs8-vs-rokit-7');
console.log('has comparison:', !!g.comparison, '| rows type:', Array.isArray(g.comparison.rows));
console.log('frozen?', Object.isFrozen(g.comparison.rows));
g.comparison.rows.unshift({ label: 'Price', label_es: 'Precio', val1: 'X', val2: 'Y', val1_es: 'X', val2_es: 'Y' });
console.log('after unshift rows[0]:', JSON.stringify(g.comparison.rows[0]));