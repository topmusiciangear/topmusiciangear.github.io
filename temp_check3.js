const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');

// Check guide card onclick handler
const i = m.indexOf('guide-card" data-guide');
if (i >= 0) {
  console.log('Guide card onclick:');
  console.log(m.substring(Math.max(0, i - 50), i + 300));
}

// Check if there's an onclick that navigates instead of SPA
const onclick = m.indexOf('onclick="event.preventDefault()');
if (onclick >= 0) {
  console.log('\n\nonclick handler:');
  console.log(m.substring(Math.max(0, onclick - 20), onclick + 300));
}

// Check for loadMoreGuides
const lmg = m.indexOf('loadMoreGuides');
if (lmg >= 0) {
  console.log('\n\nloadMoreGuides:');
  console.log(m.substring(Math.max(0, lmg - 50), lmg + 300));
}
