const fs=require('fs');
// Gear4music verified prices gathered this session (p2 + p3 agent results)
const known = {
  // p2
  223:'£2,149.99',224:'£1,786.00',227:'£150.00',228:'£151.25',229:'£249.00',230:'£75.00',
  236:'£1,139.00',237:'£1,452.00',240:'£358.00',244:'£239.50',247:'£699.00',250:'£261.50',
  252:'£177.00',257:'£339.00',258:'£249.99',259:'£414.00',264:'£229.99',266:'£1,135.00',
  274:'£309.00',275:'£349.00',276:'£95.00',286:'£135.50',290:'£99.99',291:'£149.00',
  292:'£85.30',293:'£302.50',294:'£279.00',299:'£120.00',300:'£499.00',302:'£499.00',
  303:'£293.50',305:'£504.42',306:'£267.50',308:'£650.00',313:'£149.00',314:'£398.00',
  // p3
  315:'£295.00',318:'£1,690.00',320:'£799.00',321:'£508.00',322:'£599.00',325:'£380.00',
  330:'£16.80',332:'£540.00',333:'£246.00',334:'£1,708.00',337:'£1,565.79',339:'£739.00',
  345:'£189.00',346:'£173.75',347:'£180.82',348:'£482.39',352:'£179.00',353:'£499.00',
  354:'£499.00',355:'£339.00',356:'£189.00',357:'£515.00',359:'£87.70',361:'£886.00',
  395:'£428.00',396:'£289.00',397:'£544.00',406:'£1,510.00'
};
const gaps=JSON.parse(fs.readFileSync('temp/gaps.json','utf8'));
const g4mIds=gaps.byStore['gear4music'].map(x=>parseInt(x.split('|')[0]));
const have=g4mIds.filter(id=>known[id]);
const need=g4mIds.filter(id=>!known[id]);
const byId={};
for(const rec of gaps.byStore['gear4music']){ const id=parseInt(rec.split('|')[0]); byId[id]=rec.split('|')[1]; }
console.log('g4m gaps:', g4mIds.length, '| known (apply):', have.length, '| need verify:', need.length);
console.log('\n=== NEED VERIFY (gear4music) ===');
need.forEach(id=>console.log(id+'|'+byId[id]));
fs.writeFileSync('temp/g4m-need.txt', need.map(id=>id+'|'+byId[id]).join('\n'));
console.log('\n=== KNOWN to apply ===');
have.forEach(id=>console.log(id+' -> '+known[id]));
