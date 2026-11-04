const fs=require('fs');
let d=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const map={
9003:{ideal:'Studio, intonation and live',format:'Floor pedal',power:'9V adapter / 9V battery',acc:'±0.1 cents (True strobe)'},
9004:{ideal:'Fast stage and polyphonic',format:'Floor pedal',power:'9V adapter / 9V battery',acc:'±0.02 cents (Strobe mode)'},
98:{ideal:'Indestructible stage tuning',format:'Floor pedal',power:'9V adapter / 9V battery',acc:'±1 cent (Classic chromatic)'},
9005:{ideal:'Rugged use and high visibility',format:'Floor pedal',power:'9V adapter / 9V battery',acc:'±0.1 cents (Strobe mode)'},
9006:{ideal:'Boutique and custom pedalboards',format:'Floor pedal',power:'Standard 9V adapter',acc:'±0.1 cents (Strobe mode)'},
9001:{ideal:'Acoustic and quick portability',format:'Headstock clip',power:'CR2032 button cell',acc:'±0.02 cents (Strobe mode)'},
61:{ideal:'Bench precision and multiple instruments',format:'Headstock clip',power:'CR2032 button cell',acc:'±0.1 cents (True strobe)'},
9007:{ideal:'4, 5 and 6-string basses',format:'Headstock clip (bass specialist)',power:'1 AAA battery (100 hours)',acc:'±0.1 cents (High-def chromatic)'},
9008:{ideal:'Noise-free daily use',format:'Headstock clip',power:'USB rechargeable battery',acc:'±0.1 cents (Enhanced processing)'}
};
Object.entries(map).forEach(([id,m])=>{
  const p=d.find(x=>x.id==Number(id));
  if(!p)return;
  p.facts=[
    {icon:'star',value:m.ideal,label:{en:'Ideal for',es:'Ideal para'},tone:'good'},
    {icon:'layout',value:m.format,label:{en:'Format',es:'Formato'},tone:'good'},
    {icon:'battery',value:m.power,label:{en:'Power',es:'Alimentación'},tone:'good'},
    {icon:'gauge',value:m.acc,label:{en:'Accuracy',es:'Precisión'},tone:'good'}
  ];
});
fs.writeFileSync('data/products.json', JSON.stringify(d,null,2));
console.log('updated');
