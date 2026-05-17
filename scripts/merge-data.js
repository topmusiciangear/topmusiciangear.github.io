const fs = require('fs');
const path = require('path');

const DEPLOY_JS = path.join(__dirname, '..', '.deploy_temp', 'js');
const LOCAL_JS = path.join(__dirname, '..', 'affiliate-site', 'js');

// Merge guides.js
let deploySrc = fs.readFileSync(path.join(DEPLOY_JS, 'guides.js'), 'utf8');
eval(deploySrc.replace(/^const /gm, 'var '));
const deployGuides = guides;

let localSrc = fs.readFileSync(path.join(LOCAL_JS, 'guides.js'), 'utf8');
eval(localSrc.replace(/^const /gm, 'var '));
const localGuides = guides;

const deployIds = new Set(deployGuides.map(g => g.id));
const mergedGuides = [...deployGuides];
for (const g of localGuides) {
  if (!deployIds.has(g.id)) {
    mergedGuides.push(g);
  }
}
fs.writeFileSync(
  path.join(DEPLOY_JS, 'guides.js'),
  'const guides = ' + JSON.stringify(mergedGuides, null, 2) + ';\n'
);
console.log('guides.js: ' + deployGuides.length + ' -> ' + mergedGuides.length);

// Merge products.js
deploySrc = fs.readFileSync(path.join(DEPLOY_JS, 'products.js'), 'utf8');
eval(deploySrc.replace(/^const /gm, 'var '));
const deployProducts = products;

localSrc = fs.readFileSync(path.join(LOCAL_JS, 'products.js'), 'utf8');
eval(localSrc.replace(/^const /gm, 'var '));
const localProducts = products;

const deployProdIds = new Set(deployProducts.map(p => p.id));
const mergedProducts = [...deployProducts];
for (const p of localProducts) {
  if (!deployProdIds.has(p.id)) {
    mergedProducts.push(p);
  }
}
fs.writeFileSync(
  path.join(DEPLOY_JS, 'products.js'),
  'const products = ' + JSON.stringify(mergedProducts, null, 2) + ';\n'
);
console.log('products.js: ' + deployProducts.length + ' -> ' + mergedProducts.length);
