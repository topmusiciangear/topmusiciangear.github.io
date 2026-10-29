const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='best-monitors');
const idx=10;
const specs={
  'Best For':{en:'High-end pro mixing and critical mastering',es:'Mezcla profesional de alta gama y masterización crítica'},
  'Type':{en:'2.5-way powered',es:'Amplificado de 2.5 vías'},
  'Woofer':{en:'Dual 6.5" composite W cone woofers',es:'Dos woofers de 6.5" con cono compuesto W'},
  'Tweeter':{en:'1.5" Beryllium inverted dome tweeter',es:'Tweeter de cúpula invertida de berilio 1.5"'},
  'Power':{en:'280W RMS Total',es:'280W RMS total'},
  'Frequency Response':{en:'40 Hz – 40 kHz (±3 dB)',es:'40 Hz – 40 kHz (±3 dB)'},
  'Max SPL':{en:'112 dB peak',es:'112 dB pico'},
  'Dimensions':{en:'10.2 x 20.2 x 13.5 in / 25.8 x 51.4 x 34.4 cm',es:'25.8 x 51.4 x 34.4 cm / 10.2 x 20.2 x 13.5 in'}
};
for(const row of g.productTable.rows){
  if(row.values[idx]===''){
    const key=row.label;
    if(specs[key]){
      row.values[idx]={value:specs[key].en,value_es:specs[key].es};
    }
  }
}
fs.writeFileSync('data/guides.json',JSON.stringify(data,null,2));
console.log('done');
