const fs = require('fs');
var r = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');

// Replace .guide-comp-controls-top{display:flex;margin:0 0 10px} with .guide-comp-controls-top{margin:0 0 10px}
var oldRule = '.guide-comp-controls-top{display:flex;margin:0 0 10px}';
var newRule = '.guide-comp-controls-top{margin:0 0 10px}';

if (r.includes(oldRule)) {
  r = r.replace(oldRule, newRule);
  console.log('Replaced display-flex rule in small-rooms.html');
  fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
  console.log('File updated');
} else {
  console.log('Old rule not found, trying alternative');
  // Try without the space after {
  var oldRule2 = '.guide-comp-controls-top{display: flex;margin:0 0 10px}';
  if (r.includes(oldRule2)) {
    r = r.replace(oldRule2, newRule);
    console.log('Replaced display-flex rule (with space)');
    fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
  } else {
    console.log('Trying regex replacement');
    // Use regex to remove display:flex part
    var regex = /\.guide-comp-controls-top\{[^}]*display[^}]*\}/;
    var newContent = r.replace(regex, '.guide-comp-controls-top{margin:0 0 10px}');
    if (newContent !== r) {
      fs.writeFileSync('guides/best-monitors-for-small-rooms.html', newContent);
      console.log('Replaced using regex');
    } else {
      console.log('Regex did not match');
    }
  }
}