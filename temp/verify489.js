const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
console.log('695I product URL:', h.indexOf('Positive-Grid-Spark-Mini-Black%2F695I') > -1);
console.log('bare G4M home wrapped:', h.indexOf('ued=https%3A%2F%2Fwww.gear4music.com%2F"') > -1);