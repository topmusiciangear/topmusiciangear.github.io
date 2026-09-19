var o = require('../data/guides.json');
console.log('type:', Array.isArray(o) ? 'array' : typeof o);
if (Array.isArray(o)) {
  console.log('length:', o.length);
  console.log('sample keys:', Object.keys(o[0] || {}));
  var e = o.find(function(x){ return (x.file || x.url || x.slug || '') === 'scarlett-vs-motu.html' });
  if (!e) e = o.find(function(x){ return (x.file || x.url || x.slug || '').indexOf('scarlett-vs-motu') >= 0 });
  console.log('found:', JSON.stringify(e ? {title:e.title, meta:e.meta, desc:e.desc, file:e.file, url:e.url, slug:e.slug} : null));
} else {
  console.log('keys:', Object.keys(o).slice(0,20));
  var hit = o['scarlett-vs-motu.html'] || o['scarlett-vs-motu'];
  console.log('hit:', JSON.stringify(hit).slice(0,800));
}