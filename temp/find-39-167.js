const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const gs=g.find(x=>x.id==='budget-usb-mics');
const blob=JSON.stringify(gs);
const pats=[39,167];
for(const id of pats){
  const re=new RegExp('"'+id+'"|\\b'+id+'\\b');
  // search all ids in the guide json
  const found=[];
  const walk=(o,path)=>{ if(o==null)return; if(Array.isArray(o)){o.forEach((v,i)=>walk(v,path+'['+i+']'));} else if(typeof o==='object'){for(const k of Object.keys(o))walk(o[k],path+'.'+k);} else if(typeof o==='number'&&o===id){found.push(path+':'+o);} };
  walk(gs,'');
  console.log('id '+id+' appears at:', found.join(' | ')||'NOWHERE');
}
// also search section product references by title
for(const s of gs.sections||[]){
  const sj=JSON.stringify(s);
  if(/[Aa]ston|[Ss]hield|[Mm]ogami|[Gg]old (Studio )?XLR/i.test(sj)){
    console.log('SECTION with shield/mogami:', (s.title||s.title_es||''), '| product refs:', JSON.stringify((s.products||[]).map(p=>p&&(p.product||p))));
  }
}
