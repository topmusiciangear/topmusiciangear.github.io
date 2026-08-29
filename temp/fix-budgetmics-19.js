const fs=require('fs');
const file='data/guides.json';
const g=JSON.parse(fs.readFileSync(file,'utf8'));
const gs=g.find(x=>x.id==='budget-mics');
if(!gs){console.log('NOT FOUND');process.exit(1);}
// Helper: replace leading "9 " number in "N Best/mejores" title-ish strings -> 19, careful only the count word
gs.title = gs.title.replace(/^9\s+Best/, '19 Best');
gs.title_es = gs.title_es.replace(/^Los 9 mejores/, 'Los 19 mejores');
gs.description = gs.description.replace(/^The 9 best/, 'The 19 best');
gs.description_es = gs.description_es.replace(/^Los 9 mejores/, 'Los 19 mejores');
if(gs.featuredSnippet && gs.featuredSnippet.title_es) gs.featuredSnippet.title_es = gs.featuredSnippet.title_es.replace(/^Los 9/, 'Los 19');
if(gs.featuredSnippet && gs.featuredSnippet.title) gs.featuredSnippet.title = gs.featuredSnippet.title.replace(/^9\s+Best/, '19 Best');
fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log('DONE');
console.log('title:', gs.title);
console.log('title_es:', gs.title_es);
console.log('desc:', gs.description);
