const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Find where 'seen' is declared in app.js
const seenApp = app.indexOf('seen');
console.log('seen en app.js:', seenApp);
console.log('  contexto:', app.slice(seenApp - 50, seenApp + 100));

// Find where 'seen' is declared in appMin (if anywhere)
const seenMin = appMin.indexOf('var seen');
const seenMin2 = appMin.indexOf('seen=');
const seenMin3 = appMin.indexOf('seen =');
console.log('\nseen en min (var):', seenMin);
console.log('seen en min (=):', seenMin2);
console.log('seen en min (=):', seenMin3);

// Find 'out' variable in app.js
const outApp = app.indexOf('var out');
const outApp2 = app.indexOf('out=');
console.log('\nout en app.js (var):', outApp);
console.log('  contexto:', outApp > -1 ? app.slice(outApp - 20, outApp + 50) : 'no encontrado');

// Find 'out' in min
const outMin = appMin.indexOf('var out');
const outMin2 = appMin.indexOf('out=');
console.log('out en min (var):', outMin);
console.log('out en min (=):', outMin2);

// Find 'isEs' in app.js
const isEsApp = app.indexOf('var isEs');
console.log('\nisEs en app.js:', isEsApp);
console.log('  contexto:', isEsApp > -1 ? app.slice(isEsApp - 20, isEsApp + 50) : 'no encontrado');

// Find 'isEs' in min
const isEsMin = appMin.indexOf('var isEs');
const isEsMin2 = appMin.indexOf('isEs=');
console.log('isEs en min (var):', isEsMin);
console.log('isEs en min (=):', isEsMin2);

// Show where pushGuide should be placed (after 'seen' and 'out' declarations)
const lastVar = Math.max(
  seenMin > -1 ? seenMin : -1,
  outMin > -1 ? outMin : -1,
  isEsMin > -1 ? isEsMin : -1
);
console.log('\nEl pushGuide debe ir despues de la ultima variable en min:', lastVar);
if (lastVar > -1) {
  console.log('Contexto en ese punto:', appMin.slice(lastVar, lastVar + 200));
}