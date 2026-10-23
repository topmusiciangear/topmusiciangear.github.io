const fs = require('fs');
let s = fs.readFileSync('temp/top_search.js','utf8');
const old = "    if (hits.length) {\n      setTimeout(function() {\n        var header = document.querySelector('header');\n        var headerH = header ? header.offsetHeight : 64;\n        var rect = hits[0].getBoundingClientRect();\n        var targetY = window.scrollY + rect.top - headerH - 16;\n        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });\n        hits[0].classList.add('guide-search-hit--active');\n      }, 50);\n    }";
const neu = "    if (hits.length) {\n      setTimeout(function() {\n        var freshHits = root.querySelectorAll('mark.guide-search-hit');\n        if (!freshHits.length) return;\n        var header = document.querySelector('header');\n        var headerH = header ? header.offsetHeight : 64;\n        var rect = freshHits[0].getBoundingClientRect();\n        var targetY = window.scrollY + rect.top - headerH - 16;\n        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });\n        freshHits[0].classList.add('guide-search-hit--active');\n      }, 150);\n    }";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('temp/top_search.js', s);
console.log('done');