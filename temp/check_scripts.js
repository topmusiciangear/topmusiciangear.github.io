const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/index.html', 'utf8');

// Get all script srcs
const srcs = [];
const re = /<script[^>]*src="([^"]+)"[^>]*>/g;
let m;
while ((m = re.exec(h))) srcs.push(m[1]);
console.log('Script srcs:');
srcs.forEach(s => console.log('  ' + s));

// Get the inline script that has the init logic (the big one)
const scripts = h.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('\nInline scripts:', scripts.length);

// Find the script that calls renderGuideGrid or initializes
scripts.forEach((s, i) => {
  if (s.includes('renderGuideGrid') || s.includes('guideGrid')) {
    console.log('\n=== Script ' + i + ' (contiene renderGuideGrid/guideGrid) ===');
    // Extract just the JS
    const js = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    console.log('Length:', js.length);
    console.log(js.slice(0, 2000));
  }
});