var ps=require('../data/products.json');
ps.filter(function(p){return /lewitt|tlm|warm/i.test(p.title)}).forEach(function(p){console.log(p.id+': '+p.title+' // '+p.title_es);});
