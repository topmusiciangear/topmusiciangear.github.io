var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var pats = [/\b\(each\)/g, /\b\(a pair\)/g, /\b\(per pair\)/g, /\b\( cada uno\)/g, /\b\(el par\)/g, /\b\( por par\)/g, /\s\(\s*\)/g, /\bpor cada una\b/g, /\bpor más\b/g, /\b more each\b/g, /\b more a pair\b/g];

function walkFields(obj, path, found) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') {
    var s = obj;
    pats.forEach(function (re) {
      if (re.test(s)) {
        found.push(path + ' [' + path + ']=' + JSON.stringify(s));
      }
    });
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(function (it, i) { walkFields(it, path + '[' + i + ']', found); });
    return;
  }
  Object.keys(obj).forEach(function (k) {
    walkFields(obj[k], path ? path + '.' + k : k, found);
  });
}

var found = [];
g.forEach(function (x, i) { walkFields(x, '[' + i + ']', found); });
console.log('matches: ' + found.length);
found.forEach(function (f) { console.log('---\n' + f); });

var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('\n== QSC K12.2 ==');
prods.forEach(function (x) { if ((x.title||'').toLowerCase().indexOf('k12.2') >= 0) console.log(x.id + ' | ' + x.title + ' | $' + x.price); });
console.log('== KLM-10, EVOX, PRX915 ==');
['EVOX','PRX915','K12','K8.2','CP12'].forEach(function(q){
  prods.forEach(function(x){ if((x.title||'').toLowerCase().indexOf(q.toLowerCase())>=0) console.log(q+' => '+x.id+' | '+x.title+' | $'+x.price); });
});