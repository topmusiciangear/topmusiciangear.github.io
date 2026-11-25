const fs = require('fs');
var r = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');
var r2 = fs.readFileSync('guides/best-instrument-mics.html','utf8');

// Find .guide-comp-controls-top{ in both and show the full rule
var idx = r.indexOf('.guide-comp-controls-top{');
var idx2 = r2.indexOf('.guide-comp-controls-top{');
console.log('small-rooms rule at:',idx);
console.log('instrument-mics rule at:',idx2);
if(idx>=0) console.log('small-rooms:',r.substring(idx,idx+100).replace(/\n/g, ' '));
if(idx2>=0) console.log('instrument-mics:',r2.substring(idx2,idx2+100).replace(/\n/g, ' '));