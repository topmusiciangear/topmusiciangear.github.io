const fs = require('fs');
const path = require('path');
const { icon } = require('../js/icons.js');

// Process a file, replacing FA <i> with inline SVG
function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  // Match <i class="...fa-XXX..." ...> or <i class="...fa-XXX..."></i>
  html = html.replace(/<i\s+([^>]*?)class="([^"]*?(?:fa-solid|fa-brands|fa-regular)\s+fa-([a-z0-9-]+)[^"]*?)"([^>]*)><\/i>/g, function(match, before, cls, name, after) {
    count++;
    var svg = icon(name, cls);
    if (svg.includes('icon-missing')) {
      console.warn(`  MISSING icon: ${name}`);
      return match;
    }

    // If there were extra attributes (inline styles, etc), add them
    var extraAttrs = (before + ' ' + after).trim();
    // Extract any style attribute from the original
    var styleMatch = match.match(/style="([^"]*)"/);
    // Add style attribute to SVG if present
    if (styleMatch) {
      svg = svg.replace('<svg', `<svg style="${styleMatch[1]}"`);
    }
    // Add class if needed
    svg = svg.replace('<svg', '<svg data-fa="' + name + '"');
    return svg;
  });

  fs.writeFileSync(filePath, html, 'utf8');
  return count;
}

// Process all files
var projectRoot = path.join(__dirname, '..');
var files = [
  path.join(projectRoot, 'index.html'),
  path.join(projectRoot, 'js', 'app.js'),
  path.join(projectRoot, 'js', 'products.js')
];

files.forEach(function(fp) {
  if (fs.existsSync(fp)) {
    var c = processFile(fp);
    console.log(`${path.relative(projectRoot, fp)}: replaced ${c} FA icons`);
  } else {
    console.log(`${path.relative(projectRoot, fp)}: NOT FOUND`);
  }
});

console.log('\nDone!');
