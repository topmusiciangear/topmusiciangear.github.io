const fs=require('fs');
const path='data/products.json';
const arr=JSON.parse(fs.readFileSync(path,'utf8'));
const newProd={
  id:1072,
  title:'Focal Twin6 ST6',
  title_es:'Focal Twin6 ST6',
  brand:'Focal',
  category:'monitors',
  price:null,
  rating:4.9,
  desc:'El Focal Twin6 ST6 es el monitor insignia de campo cercano y medio de la prestigiosa marca francesa, diseñado específicamente para ofrecer una transparencia absoluta y una precisión quirúrgica en estudios de grabación profesionales. Este sistema de 2.5 vías combina dos woofers de 6.5 pulgadas con cono en "W" compuesto (que optimiza la rigidez y ligereza para una respuesta de graves inmediata) junto al legendario tweeter de cúpula invertida de Berilio puro, famoso en la industria por revelar microdetalles transitorios sin causar fatiga auditiva tras largas jornadas de trabajo. Su característica más innovadora es el Focus Mode, una función que te permite reconfigurar internamente el monitor mediante un pedal para convertirlo en un sistema de una sola vía; esto emula la respuesta de frecuencias de altavoces de consumo masivo (como teléfonos o televisores) y te permite comprobar la traducción de tus mezclas al instante sin cambiar de equipo.',
  desc_es:'El Focal Twin6 ST6 es el monitor insignia de campo cercano y medio de la prestigiosa marca francesa, diseñado específicamente para ofrecer una transparencia absoluta y una precisión quirúrgica en estudios de grabación profesionales. Este sistema de 2.5 vías combina dos woofers de 6.5 pulgadas con cono en "W" compuesto (que optimiza la rigidez y ligereza para una respuesta de graves inmediata) junto al legendario tweeter de cúpula invertida de Berilio puro, famoso en la industria por revelar microdetalles transitorios sin causar fatiga auditiva tras largas jornadas de trabajo. Su característica más innovadora es el Focus Mode, una función que te permite reconfigurar internamente el monitor mediante un pedal para convertirlo en un sistema de una sola vía; esto emula la respuesta de frecuencias de altavoces de consumo masivo (como teléfonos o televisores) y te permite comprobar la traducción de tus mezclas al instante sin cambiar de equipo.',
  img:'img/products/focal_twin6.webp',
  stores:{
    gear4music:'https://www.gear4music.com/Recording-and-Computers/Focal-Twin-6-ST6-Active-Studio-Monitor/4WVC',
    zzounds:'https://www.zzounds.com/item--FOLFOPROTWIN6ST6?siid=320073',
    andertons:'https://www.andertons.co.uk/focal-twin-6-st6-studio-monitors/'
  },
  bestFor:{
    en:'High-end pro mixing and critical mastering',
    es:'Mezcla profesional de alta gama y masterización crítica'
  },
  score:9.7,
  facts:[
    {icon:'sliders',value:'2.5-way powered',label:{en:'Type',es:'Tipo'},tone:'good'},
    {icon:'compactDisc',value:'Dual 6.5" composite W cone woofers',label:{en:'Woofer',es:'Woofer'},tone:'good'},
    {icon:'signal',value:'1.5" Beryllium inverted dome tweeter',label:{en:'Tweeter',es:'Tweeter'},tone:'good'},
    {icon:'zap',value:'280W RMS Total',label:{en:'Power',es:'Potencia'},tone:'good'},
    {icon:'waveform',value:'40 Hz – 40 kHz',label:{en:'Frequency Response',es:'Respuesta de frecuencia'},tone:'good'},
    {icon:'volume2',value:'112 dB peak',label:{en:'Max SPL',es:'SPL máximo'},tone:'good'}
  ]
};
arr.push(newProd);
fs.writeFileSync(path, JSON.stringify(arr, null, 2));
console.log('added product 1072');
