const fs = require('fs');
var r1 = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');
var r2 = fs.readFileSync('guides/best-instrument-mics.html','utf8');

// Find the full .guide-comp-controls-top div in both and show complete HTML
// For small-rooms
var sd1 = r1.indexOf('<div class="guide-comp-controls guide-comp-controls-top"');
var ed1 = r1.indexOf('</div>', sd1);
if(sd1>=0) { 
  console.log('small-rooms complete div:'); 
  console.log(r1.substring(sd1, sd1+450).replace(/\n/g, ' ')); 
} else { console.log('small-rooms div NOT FOUND'); }

// For instrument-mics
var sd2 = r2.indexOf('<div class="guide-comp-controls guide-comp-controls-top"');
var ed2 = r2.indexOf('</div>', sd2);
if(sd2>=0) { 
  console.log('\ninstrument-mics complete div:'); 
  console.log(r2.substring(sd2, sd2+450).replace(/\n/g, ' ')); 
} else { console.log('instrument-mics div NOT FOUND'); }