const fs = require('fs');
var r = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');

// Current Reflex Port values: Rear, Front, Front, Rear, Rear, Rear, Dual passive radiators (no port), Front, Front, resonance-suppressing bracing, Rear, Rear, Rear, Rear
// Need to change value 4 (KRK Rokit 5 G5) from Rear to Front
// Pattern: Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>
// Target: Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>

var oldPattern = 'Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>';
var newPattern = 'Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>';

if (r.includes(oldPattern)) {
  r = r.replace(oldPattern, newPattern);
  console.log('Changed KRK Rokit 5 G5 Reflex Port from Rear to Front');
  fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
} else {
  console.log('Pattern not found');
  // Show current reflex port section
  var idx = r.indexOf('Reflex Port');
  console.log('Current:', r.substring(idx, idx+200).replace(/\n/g,' '));
}