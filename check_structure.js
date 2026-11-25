const fs = require('fs');
var r1 = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');
var r2 = fs.readFileSync('guides/best-monitors.html','utf8');

// Find the guide-comp-controls-top div in both
var s1 = r1.indexOf('<div class="guide-comp-controls guide-comp-controls-top"');
var s2 = r2.indexOf('<div class="guide-comp-controls guide-comp-controls-top"');

console.log('small-rooms.html - guide-comp-controls-top div:');
console.log(r1.substring(s1, s1+300).replace(/\\n/g, ' '));

console.log('\\nbest-monitors.html - guide-comp-controls-top div:');
console.log(r2.substring(s2, s2+300).replace(/\\n/g, ' '));