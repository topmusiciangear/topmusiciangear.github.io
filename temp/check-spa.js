var h = require('fs').readFileSync('index.html', 'utf8');

// Check if the SPA guides data is present
var guidesDataMatch = h.match(/var\s+guides\s*=\s*(\[[\s\S]*?\]);/);
if (guidesDataMatch) {
  var guidesCount = (guidesDataMatch[1].match(/"id":/g) || []).length;
  console.log('SPA guides data: present, entries:', guidesCount);
} else {
  console.log('SPA guides data: MISSING');
}

// Check if categoryInfo is present  
var catInfoMatch = h.match(/var\s+categoryInfo\s*=/);
console.log('categoryInfo in index.html:', catInfoMatch ? 'YES' : 'NO');

// Check for the session/category buttons
var catCards = h.match(/cat-card/g);
console.log('cat-card elements:', catCards ? catCards.length : 0);

// Check if the guide list section exists
var guideList = h.match(/id="guideList"/g);
console.log('guideList element:', guideList ? 'present' : 'MISSING');

// Check for the main SPA content area
var mainContent = h.match(/id="guideCats"/g);
console.log('guideCats element:', mainContent ? 'present' : 'MISSING');

// Check if any JavaScript error could prevent rendering
var scripts = h.match(/<script[^>]*>/g);
console.log('Script tags:', scripts ? scripts.length : 0);
