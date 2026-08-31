var fs = require('fs');
var shopSrc = fs.readFileSync('js/shop-buttons.js', 'utf8');
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = products.find(function(x){return x.id===189;});

var vm = require('vm');
var sandbox = {window:{}, document:{documentElement:{lang:'en'}}, console:console};
vm.createContext(sandbox);
vm.runInContext(shopSrc, sandbox);

// Direct call
var result = sandbox.shopButtonsTest(p, 'en');
console.log('Direct result:', result ? result.length : 'NULL');

// Now debug
var debugCode = shopSrc + '\nvar p=' + JSON.stringify(p) + ';';
debugCode += '\nvar cfg=TEST_SHOP_BTN[p.id]||{};';
debugCode += '\nvar prices=cfg.prices||{};';
debugCode += '\nvar stores=getResolvedStores(p);';
debugCode += '\nconsole.log("stores:", JSON.stringify(Object.keys(stores)));';
debugCode += '\nconsole.log("prices:", JSON.stringify(prices));';
debugCode += '\nconsole.log("cfg:", JSON.stringify(cfg));';
debugCode += '\nconsole.log("p.stores:", JSON.stringify(p.stores));';
debugCode += '\nconsole.log("p.excludeStores:", JSON.stringify(p.excludeStores));';
debugCode += '\nconsole.log("p.category:", p.category);';
var sandbox2 = {window:{}, document:{documentElement:{lang:'en'}}, console:console};
vm.createContext(sandbox2);
vm.runInContext(debugCode, sandbox2);
