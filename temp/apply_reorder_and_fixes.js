const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const products=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,p]));
// load guide scores
const code=fs.readFileSync(B+'js/guide-scores.js','utf8');
eval(code.replace(/^\ufeff/,''));
const guides=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));

// 1. Update small-rooms scores
const sm=GUIDE_SCORES['best-monitors-for-small-rooms'];
sm['Yamaha HS5']=8.5;
sm['Genelec 8030C']=9.4;
sm['Genelec 8010A']=9.0;

// 2. Reorder featuredProducts by guide score desc for all guides
let changed=0;
for(const g of guides){
  if(!Array.isArray(g.featuredProducts) || g.featuredProducts.length<2) continue;
  const guideId=g.id;
  const gs=GUIDE_SCORES[guideId]||{};
  const sorted=[...g.featuredProducts].sort((a,b)=>{
    const pa=prodMap.get(a); const pb=prodMap.get(b);
    const sa= (pa && gs[pa.title]) || (pa && pa.score) || 0;
    const sb= (pb && gs[pb.title]) || (pb && pb.score) || 0;
    if(sb!==sa) return sb-sa;
    return 0; // stable-ish
  });
  // only update if order changed
  if(sorted.join(',')!==g.featuredProducts.join(',')){
    g.featuredProducts=sorted;
    changed++;
  }
}
fs.writeFileSync(B+'data/guides.json', JSON.stringify(guides,null,2),'utf8');
console.log('guides reordered:', changed);

// 3. Persist guide-scores.js changes
// rewrite the small-rooms block
let gsRaw=fs.readFileSync(B+'js/guide-scores.js','utf8');
const start=gsRaw.indexOf(' "best-monitors-for-small-rooms": {');
const end=gsRaw.indexOf(' },', start)+3;
const block=' "best-monitors-for-small-rooms": {\n'+Object.keys(GUIDE_SCORES['best-monitors-for-small-rooms']).map(k=>'  "'+k+'": '+GUIDE_SCORES['best-monitors-for-small-rooms'][k]+',').join('\n')+'\n }';
gsRaw=gsRaw.slice(0,start)+block+gsRaw.slice(end);
// ensure trailing comma
if(!gsRaw.slice(end,end+1).startsWith(',')) gsRaw=gsRaw.slice(0,end)+','+gsRaw.slice(end);
fs.writeFileSync(B+'js/guide-scores.js', gsRaw,'utf8');
console.log('guide-scores updated');

// 4. Delete orphan redirect files
const r1=B+'guides/best-home-studio-speakers.html';
const r2=B+'guides/best-home-studio-speakers_es.html';
if(fs.existsSync(r1)) { fs.unlinkSync(r1); console.log('deleted', r1); }
if(fs.existsSync(r2)) { fs.unlinkSync(r2); console.log('deleted', r2); }