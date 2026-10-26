const {execSync}=require('child_process');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const parent='5f7dd3bff4cb3db61e7629f11a2bee4e23311929';
const raw=execSync('git -C "'+B+'" show '+parent+':data/guides.json',{maxBuffer:1024*1024*300}).toString('utf8');
const g=JSON.parse(raw);
for(const id of ['best-monitors','best-monitors-for-small-rooms','studio-subwoofers']){
  const gu=g.find(x=>x.id===id);
  const t=JSON.stringify(gu);
  console.log(id, 'has WS-6.2:', t.includes('Kali Audio WS-6.2'), 'has product 300:', (gu.featuredProducts||[]).includes(300));
  if(t.includes('Kali Audio WS-6.2')){
    let i=0, idx;
    while((idx=t.indexOf('Kali Audio WS-6.2',i))!==-1){ console.log('  ctx:', t.slice(Math.max(0,idx-80), idx+80)); i=idx+1; }
  }
}