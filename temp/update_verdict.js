const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g){
  const addEn = '<p><strong><span class="product-name">Focal Twin6 ST6</span></strong> — 2.5-way flagship with dual 6.5\\" W-cone woofers and 1.5\\" beryllium tweeter, Focus Mode for translation checks and 112 dB peak SPL for large rooms and professional mixing.</p>';
  const addEs = '<p><strong><span class="product-name">Focal Twin6 ST6</span></strong> — Monitor insignia de 2.5 vías con dos woofers W-cone de 6.5\\" y tweeter de berilio de 1.5\\", modo Focus para comprobar traducciones y 112 dB pico para salas grandes y mezcla profesional.</p>';
  if(!g.verdict.includes('Focal Twin6 ST6')){
    g.verdict = g.verdict.replace('</p>', addEn+'</p>');
  }
  if(!g.verdict_es.includes('Focal Twin6 ST6')){
    g.verdict_es = g.verdict_es.replace('</p>', addEs+'</p>');
  }
  fs.writeFileSync('data/guides.json',JSON.stringify(data,null,2));
  console.log('verdict updated');
}
