const fs = require('fs');
var r = fs.readFileSync('guides/best-monitors-for-small-rooms.html','utf8');

// 1. Fix KRK Rokit 5 G5 Reflex Port: Rear → Front
var oldReflex = 'Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>';
var newReflex = 'Reflex Port</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Front</td><td class="val">Rear</td><td class="val">Dual passive radiators (no port)</td>';
if (r.includes(oldReflex)) {
  r = r.replace(oldReflex, newReflex);
  console.log('1. Fixed KRK Rokit 5 G5 Reflex Port: Rear → Front');
} else {
  console.log('1. Reflex Port pattern not found');
}

// 2. Fix Yamaha HS5 Dimensions: cm → inches
var oldDim = '<td class="val">28.5 x 17 x 22.2 cm</td></tr><tr><td class="label">Reflex Port</td>';
var newDim = '<td class="val">11.2 x 6.7 x 8.7 in</td></tr><tr><td class="label">Reflex Port</td>';
if (r.includes(oldDim)) {
  r = r.replace(oldDim, newDim);
  console.log('2. Fixed Yamaha HS5 Dimensions: cm → inches');
} else {
  console.log('2. Yamaha HS5 dimensions pattern not found');
}

// 3. Fix ADAM D3V Power: 240W peak (pair) → 80W RMS per speaker
var oldPower1 = '<td class="val">240W peak (pair)</td>';
var newPower1 = '<td class="val">80W RMS per speaker</td>';
if (r.includes(oldPower1)) {
  r = r.replace(oldPower1, newPower1);
  console.log('3. Fixed ADAM D3V Power: 240W peak (pair) → 80W RMS per speaker');
} else {
  console.log('3. ADAM D3V power pattern not found');
}

// 4. Fix Kali LP-UNF Power: 160W Class-D (pair) → 80W per speaker
var oldPower2 = '<td class="val">160W Class-D (pair)</td>';
var newPower2 = '<td class="val">80W per speaker</td>';
if (r.includes(oldPower2)) {
  r = r.replace(oldPower2, newPower2);
  console.log('4. Fixed Kali LP-UNF Power: 160W Class-D (pair) → 80W per speaker');
} else {
  console.log('4. Kali LP-UNF power pattern not found');
}

fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
console.log('\nFile updated successfully');