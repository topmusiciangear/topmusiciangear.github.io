const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/index.html', 'utf8');
console.log('Tamaño index.html:', h.length);
const guideRefs = h.match(/guide[-_]?(card|link|grid|list|tile|item|nav)/gi) || [];
console.log('Refs a guide:', [...new Set(guideRefs)].join(', '));
const cats = h.match(/data-cat="[^"]+"/g) || [];
console.log('Categorias:', cats.slice(0, 20).join(' '));
// Check if there's a JS error by looking at app.js
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');
console.log('app.js size:', app.length);
console.log('app.min.js size:', appMin.length);
// Look for guide rendering logic
const renderIdx = app.indexOf('renderGuides');
const loadIdx = app.indexOf('loadGuides');
const gridIdx = app.indexOf('guides-grid');
console.log('renderGuides:', renderIdx, 'loadGuides:', loadIdx, 'guides-grid:', gridIdx);