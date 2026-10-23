const fs = require('fs');
let s = fs.readFileSync('temp/top_search.js','utf8');
// Add close-on-scroll: replace the existing scroll listener to also close the drop
const old = "  var scrolling = false;\n  window.addEventListener('scroll', function() {\n    scrolling = true;\n    clearTimeout(window._topSearchScrollTimer);\n    window._topSearchScrollTimer = setTimeout(function() { scrolling = false; }, 200);\n  }, { passive: true });";
const neu = "  var scrolling = false;\n  window.addEventListener('scroll', function() {\n    scrolling = true;\n    // close the search dropdown on scroll, but keep the top bar visible\n    if (drop && !drop.hidden) drop.hidden = true;\n    clearTimeout(window._topSearchScrollTimer);\n    window._topSearchScrollTimer = setTimeout(function() { scrolling = false; }, 200);\n  }, { passive: true });";
if (!s.includes(old)) { console.log('NOT FOUND scroll listener'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('temp/top_search.js', s);
console.log('done');