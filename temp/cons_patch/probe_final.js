var fs = require('fs'), cp = require('child_process');
var base = 'C:/Users/Daniel/projects/topmusiciangear';

function gh(p){ return cp.execSync('git show HEAD:' + p, {encoding:'utf8', maxBuffer:1e9}).toString(); }
function cnt(h){ return h.split('undefined').length - 1; }

var lines = fs.readFileSync(base + '/build-guides.js', 'utf8').split(/\r?\n/);
console.log('--- build-guides.js L1208..1300 (section render) ---');
for (var i = 1208; i <= 1300; i++){
  var l = lines[i] || '';
  if (l.indexOf('intro') >= 0 || l.indexOf('content') >= 0 || l.indexOf('s.heading') >= 0 || l.indexOf('section-heading') >= 0 || l.indexOf('sectionContent') >= 0){
    console.log((i+1) + ': ' + l);
  }
}

console.log('\n--- HEAD (desplegado) premium HTML ---');
[['guides/premium-interfaces.html','EN'],['guides/premium-interfaces_es.html','ES']].forEach(function(x){
  var t = gh(x[0]);
  console.log('HEAD '+x[1]+': undefined='+cnt(t)+' section-headings='+(t.split('guide-section-heading').length-1));
  var i = t.indexOf('undefined');
  if (i >= 0) console.log('  1er ctx=' + JSON.stringify(t.slice(Math.max(0,i-80), i+60)));
});

console.log('\n--- WORKING TREE premium HTML ---');
['guides/premium-interfaces.html','guides/premium-interfaces_es.html'].forEach(function(p){
  var t = fs.readFileSync(base + '/' + p, 'utf8');
  console.log('WORK ' + p + ': undefined=' + cnt(t));
  var i = t.indexOf('undefined');
  if (i >= 0) console.log('  1er ctx=' + JSON.stringify(t.slice(Math.max(0,i-80), i+60)));
});
