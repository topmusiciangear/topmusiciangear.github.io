const fs=require('fs');
const html=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
for(const p of ['guides/premium-interfaces.html','guides/premium-interfaces_es.html']){
  const h=html('C:/Users/Daniel/projects/topmusiciangear/'+p);
  const t=(h.match(/<title>([^<]+)/)||[])[1]||'';
  const hasX16Img=h.indexOf('1138949')>=0?'SI(existe img1138949)':'NO';
  const nPart=((h.match(/data-store="(\w+)"/g)||[])).filter(x=>/zzounds|andertons|musicstore/i.test(x)).length;
  console.log(p+' | title='+t+' | cover=img-x16? '+hasX16Img+' | rows_stores~'+nPart);
}
console.log('portable sin Apollo:', (console.log('FALTA_LINE'), ''));
