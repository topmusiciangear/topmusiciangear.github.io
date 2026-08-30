var fs = require('fs');
var c = fs.readFileSync('js/constants.min.js', 'utf8');

// Find the IEM icon
var iemIdx = c.indexOf('in_ear_monitors:');
var iconStart = c.indexOf("icon:'", iemIdx);
var iconEnd = c.indexOf("',desc:", iconStart);
var oldIcon = c.substring(iconStart + 6, iconEnd);
console.log('Old icon starts with:', oldIcon.substring(0, 80));
console.log('Old icon length:', oldIcon.length);

// The new Bootstrap earbuds icon (matching site style: fill="currentColor", viewBox)
var newIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M6.825 4.138c.596 2.141-.36 3.593-2.389 4.117a4.4 4.4 0 0 1-2.018.054c-.048-.01.9 2.778 1.522 4.61l.41 1.205a.52.52 0 0 1-.346.659l-.593.19a.55.55 0 0 1-.69-.34L.184 6.99c-.696-2.137.662-4.309 2.564-4.8 2.029-.523 3.402 0 4.076 1.948zm-.868 2.221c.43-.112.561-.993.292-1.969-.269-.975-.836-1.675-1.266-1.563s-.561.994-.292 1.969.836 1.675 1.266 1.563m3.218-2.221c-.596 2.141.36 3.593 2.389 4.117a4.4 4.4 0 0 0 2.018.054c.048-.01-.9 2.778-1.522 4.61l-.41 1.205a.52.52 0 0 0 .346.659l-.593.19c.289.092.6-.06.69-.34l2.536-7.643c.696-2.137-.662-4.309-2.564-4.8-2.029-.523-3.402 0-4.076 1.948m.868 2.221c-.43-.112-.561-.993-.292-1.969.269-.975.836-1.675-1.266-1.563s.561.994.292 1.969-.836 1.675-1.266 1.563\"/></svg>";

console.log('\nNew icon length:', newIcon.length);
console.log('New icon starts with:', newIcon.substring(0, 80));

// Replace in constants.min.js
var newC = c.replace(oldIcon, newIcon);
fs.writeFileSync('js/constants.min.js', newC, 'utf8');
console.log('\nconstants.min.js updated');

// Verify
try {
  new Function(newC);
  console.log('constants.min.js: VALID JS');
} catch(e) {
  console.log('constants.min.js: BROKEN -', e.message);
}

// Also update constants.js
var c2 = fs.readFileSync('js/constants.js', 'utf8');
var iemIdx2 = c2.indexOf('in_ear_monitors:');
var iconStart2 = c2.indexOf("icon:'", iemIdx2);
var iconEnd2 = c2.indexOf("',desc:", iconStart2);
var oldIcon2 = c2.substring(iconStart2 + 6, iconEnd2);
var newC2 = c2.replace(oldIcon2, newIcon);
fs.writeFileSync('js/constants.js', newC2, 'utf8');
console.log('constants.js updated');

try {
  new Function(newC2);
  console.log('constants.js: VALID JS');
} catch(e) {
  console.log('constants.js: BROKEN -', e.message);
}
