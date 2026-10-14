const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

// The fix: instead of afterbegin (which puts displaced store at top),
// insert at the correct position based on the order array.
// The order is: ['amazon', 'reverb', 'zzounds', 'gear4music', 'andertons', 'musicstore']
// When swapping primary, the displaced store should go to its correct position.

// Replace the afterbegin with logic that inserts at correct position
const oldCode = "ml2.insertAdjacentHTML('afterbegin', dispRow);";
const newCode = `
        // Insert displaced store at correct position based on order
        var orderArr = ['amazon', 'reverb', 'zzounds', 'gear4music', 'andertons', 'musicstore'];
        var curIdx = orderArr.indexOf(curStore);
        var insertBefore = null;
        for (var oi = curIdx + 1; oi < orderArr.length; oi++) {
          var candidate = ml2.querySelector('[data-store="' + orderArr[oi] + '"]');
          if (candidate) { insertBefore = candidate; break; }
        }
        if (insertBefore) ml2.insertBefore(dispRow, insertBefore);
        else ml2.insertAdjacentHTML('beforeend', dispRow);`;

// dispRow is a string, not a DOM node - need to create element from it
const newCodeFixed = `
        // Insert displaced store at correct position based on order
        var orderArr = ['amazon', 'reverb', 'zzounds', 'gear4music', 'andertons', 'musicstore'];
        var curIdx = orderArr.indexOf(curStore);
        var insertBefore = null;
        for (var oi = curIdx + 1; oi < orderArr.length; oi++) {
          var candidate = ml2.querySelector('[data-store="' + orderArr[oi] + '"]');
          if (candidate) { insertBefore = candidate; break; }
        }
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = dispRow;
        var dispNode = tempDiv.firstChild;
        if (insertBefore) ml2.insertBefore(dispNode, insertBefore);
        else ml2.appendChild(dispNode);`;

if (src.indexOf(oldCode) > -1) {
  src = src.replace(oldCode, newCodeFixed);
  console.log('Fixed with position-aware insertion');
} else {
  console.log('Old code not found');
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }