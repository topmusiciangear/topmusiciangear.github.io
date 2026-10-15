const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
['starter-studio','starter-studio_es'].forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f+'.html','utf8');
  const t = (d.match(/<title>([^<]*)<\/title>/) || [])[1];
  const h = ((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g,'').trim();
  const og = (d.match(/og:title[^>]*content="([^"]*)"/) || [])[1];
  const md = (d.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const tw = (d.match(/twitter:title[^>]*content="([^"]*)"/) || [])[1];
  console.log(f + ':');
  console.log('  <title>      : ' + t);
  console.log('  og:title     : ' + og);
  console.log('  twitter:title: ' + tw);
  console.log('  <h1>         : ' + h);
  console.log('  meta desc    : ' + (md||'').slice(0,80) + '...');
  console.log('');
});