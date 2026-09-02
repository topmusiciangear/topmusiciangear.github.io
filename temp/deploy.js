var fs = require('fs');
var { execSync } = require('child_process');
var crypto = require('crypto');

console.log('=== DEPLOY COMPLETO ===\n');

// 1. Rebuild guides
console.log('1. Rebuilding guides...');
execSync('node build-guides.js', { stdio: 'inherit' });

// 2. Regenerate shop-buttons.js
console.log('\n2. Regenerating shop-buttons.js...');
execSync('node temp/gen-shop-buttons.js', { stdio: 'inherit' });

// 3. Update version hash in index.html
console.log('\n3. Updating cache hashes...');
var shopContent = fs.readFileSync('js/shop-buttons.js');
var shopHash = crypto.createHash('md5').update(shopContent).digest('hex').substring(0, 8);
var indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/shop-buttons\.js\?v=[a-f0-9]+/, 'shop-buttons.js?v=' + shopHash);
fs.writeFileSync('index.html', indexHtml);
console.log('   shop-buttons.js?v=' + shopHash);

// 4. Git commit
console.log('\n4. Committing...');
execSync('git add -A', { stdio: 'inherit' });
try {
  var msg = process.argv[2] || 'deploy: rebuild all guides';
  execSync('git commit -m "' + msg + '"', { stdio: 'inherit' });
} catch(e) {
  console.log('   No changes to commit');
  process.exit(0);
}

// 5. Git push
console.log('\n5. Pushing...');
execSync('git push', { stdio: 'inherit' });

// 6. Trigger GitHub Pages build
console.log('\n6. Triggering deploy...');
execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds -X POST', { stdio: 'inherit' });

console.log('\n=== DONE ===');
