const fs = require('fs');
var r1 = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');
var r2 = fs.readFileSync('guides/best-instrument-mics.html','utf8');

console.log('small-rooms style tags count:', (r1.match(/<style/gi)||[]).length);
console.log('instrument-mics style tags count:', (r2.match(/<style/gi)||[]).length);

// Show the style tags in both
var s1matches = r1.match(/<style[^>]*>.*?<\/style>/gs);
var s2matches = r2.match(/<style[^>]*>.*?<\/style>/gs);

if (s1matches) {
  console.log('\\nsmall-rooms style tags:');
  s1matches.forEach((s, i) => {
    console.log('Tag', i+1, 'length:', s.length);
    console.log('Content:', s.substring(0, 200).replace(/\\n/g, ' '));
  });
}

if (s2matches) {
  console.log('\\ninstrument-mics style tags:');
  s2matches.forEach((s, i) => {
    console.log('Tag', i+1, 'length:', s.length);
    console.log('Content:', s.substring(0, 200).replace(/\\n/g, ' '));
  });
}

// Also check for any inline style attributes on the div
var d1 = r1.indexOf('guide-comp-controls guide-comp-controls-top');
var d2 = r2.indexOf('guide-comp-controls guide-comp-controls-top');

console.log('\\nsmall-rooms div at position:', d1);
console.log('instrument-mics div at position:', d2);

// Check if the div has a style attribute
var small_rooms_div = r1.substring(d1, d1 + 100);
var mics_div = r2.substring(d2, d2 + 100);

console.log('\\nsmall-rooms div starts with:', small_rooms_div.substring(0, 80).replace(/\\n/g, ' '));
console.log('instrument-mics div starts with:', mics_div.substring(0, 80).replace(/\\n/g, ' '));

// Check for display-flex in both
console.log('\\nsmall-rooms has display-flex:', r1.includes('display:flex'));
console.log('instrument-mics has display-flex:', r2.includes('display:flex'));

// Check for margin:0 0 10px in both
console.log('small-rooms has margin:0 0 10px:', r1.includes('margin:0 0 10px'));
console.log('instrument-mics has margin:0 0 10px:', r2.includes('margin:0 0 10px'));