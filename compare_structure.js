const fs = require('fs');
var r1 = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');
var r2 = fs.readFileSync('guides/best-instrument-mics.html','utf8');

// Find guide-comp-controls-top in both
var s1 = r1.indexOf('guide-comp-controls-top');
var s2 = r2.indexOf('guide-comp-controls-top');

console.log('small-rooms starts at:', s1);
console.log('instrument-mics starts at:', s2);

// Show 300 chars around each
console.log('\n--- small-rooms ---');
console.log(r1.substring(s1, s1+300));

console.log('\n--- instrument-mics ---');
console.log(r2.substring(s2, s2+300));