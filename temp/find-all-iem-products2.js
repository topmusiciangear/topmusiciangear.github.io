const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
// Search for all IEM products more broadly
const all=p.filter(x=>/se215|se425|se535|se846|ie100|ie200|ie300|ie400|ie500|ie600|ie900|ath.e40|ath.e50|ath.e70|dt70|mach60|prophile|er4sr|er4xr|kz as16|kz as10|moondrop|7hz|tin hifi|tribrid|hybrid iem|mp.220|mp220|e40|e70|dt70|mach60|prophile|er4|as16|as10|se846|se215|ie100|ie900|e40|e70|dt70|mach60|prophile|er4|as16|mp.220|mp220|e40|e70|dt70|mach60|prophile|er4|as16/.test(x.title.toLowerCase()) || /se215|se425|se535|se846|ie100|ie200|ie300|ie400|ie500|ie600|ie900|ath.e40|ath.e50|ath.e70|dt70|mach60|prophile|er4|kz as|moondrop|7hz|tin hifi|tribrid|hybrid iem|mp.220|mp220|e40|e70|dt70|mach60|prophile|er4|as16|as10|se846|se215|ie100|ie900|ath.e40|ath.e70|dt70|mach60|prophile|er4|as16/.test(x.title_es.toLowerCase()));
console.log("All IEM products:", all.length);
all.forEach(x=>console.log(`${x.id} | ${x.title} | ${x.title_es} | cat: ${x.category} | stores: ${Object.keys(x.stores||{}).join(",")}`));
