const fs = require('fs');
let s = fs.readFileSync('temp/top_search.js','utf8');
// Replace scrollIntoView with manual scroll accounting for header height
const old = "      setTimeout(function() {\n        hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' });\n        hits[0].classList.add('guide-search-hit--active');\n      }, 50);";
const neu = "      setTimeout(function() {\n        var header = document.querySelector('header');\n        var headerH = header ? header.offsetHeight : 64;\n        var rect = hits[0].getBoundingClientRect();\n        var targetY = window.scrollY + rect.top - headerH - 16;\n        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });\n        hits[0].classList.add('guide-search-hit--active');\n      }, 50);";
if (!s.includes(old)) { console.log('NOT FOUND scrollIntoView'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('temp/top_search.js', s);
console.log('done');