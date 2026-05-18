const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  // Solid
  { name: 'arrow-left', type: 'solid' },
  { name: 'arrow-up', type: 'solid' },
  { name: 'circle-check', type: 'solid' },
  { name: 'compact-disc', type: 'solid' },
  { name: 'drum', type: 'solid' },
  { name: 'envelope', type: 'solid' },
  { name: 'film', type: 'solid' },
  { name: 'flag-usa', type: 'solid' },
  { name: 'globe', type: 'solid' },
  { name: 'guitar', type: 'solid' },
  { name: 'headphones', type: 'solid' },
  { name: 'keyboard', type: 'solid' },
  { name: 'landmark', type: 'solid' },
  { name: 'magnifying-glass', type: 'solid' },
  { name: 'microphone', type: 'solid' },
  { name: 'music', type: 'solid' },
  { name: 'sliders', type: 'solid' },
  { name: 'star', type: 'solid' },
  { name: 'store', type: 'solid' },
  { name: 'volume-high', type: 'solid' },
  { name: 'wrench', type: 'solid' },
  // Regular
  { name: 'clock', type: 'regular' },
  // Brands
  { name: 'amazon', type: 'brands' },
  { name: 'facebook-f', type: 'brands' },
  { name: 'instagram', type: 'brands' },
  { name: 'spotify', type: 'brands' },
  { name: 'tiktok', type: 'brands' },
  { name: 'youtube', type: 'brands' }
];

const results = {};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const base = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/svgs';
  for (const icon of icons) {
    const url = `${base}/${icon.type}/${icon.name}.svg`;
    console.log(`Fetching ${url}...`);
    try {
      const svg = await fetch(url);
      const match = svg.match(/<path[^>]*d="([^"]+)"/);
      const viewBox = svg.match(/viewBox="([^"]+)"/);
      if (match) {
        results[icon.name] = {
          path: match[1],
          viewBox: viewBox ? viewBox[1] : '0 0 512 512'
        };
        console.log(`  Got ${icon.name}: ${match[1].substring(0, 40)}...`);
      } else {
        console.log(`  ERROR: No path in ${icon.name}`);
        results[icon.name] = { path: '', viewBox: '0 0 512 512' };
      }
    } catch (e) {
      console.log(`  ERROR fetching ${icon.name}: ${e.message}`);
      results[icon.name] = { path: '', viewBox: '0 0 512 512' };
    }
  }

  // Generate icons.js
  let output = '// Auto-generated icon paths from Font Awesome 6.5.1\n';
  output += 'window.__icons = {\n';
  for (const [name, data] of Object.entries(results)) {
    const key = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    output += `  ${key}: { path: '${data.path.replace(/'/g, "\\'")}', viewBox: '${data.viewBox}' },\n`;
  }
  output += '};\n\n';
  output += 'window.icon = function(name, className) {\n';
  output += '  var c = window.__icons;\n';
  output += '  var keys = Object.keys(c);\n';
  output += '  for (var i = 0; i < keys.length; i++) {\n';
  output += '    if (keys[i].toLowerCase() === name.toLowerCase().replace(/-/g, \'\')) {\n';
  output += '      var ic = c[keys[i]];\n';
  output += '      return \'<svg class="icon \' + (className || \'\') + \'" viewBox="\' + ic.viewBox + \'" width="1em" height="1em" fill="currentColor"><path d="\' + ic.path + \'"/></svg>\';\n';
  output += '    }\n';
  output += '  }\n';
  output += '  return \'<span class="icon-missing" style="color:red">[?]\' + name + \'</span>\';\n';
  output += '};\n';

  const outPath = path.join(__dirname, '..', 'js', 'icons.js');
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`\nWrote ${outPath} with ${Object.keys(results).length} icons`);
}

main();
