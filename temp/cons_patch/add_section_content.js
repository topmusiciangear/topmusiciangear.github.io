const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const g=GS.find(x=>x&&x.id==='premium-interfaces');
if(!g){console.error('FALTA premium-interfaces');process.exit(1)}
const texts=[
 {en:'<p>The premium tier is where interface choice becomes a decade-long commitment: conversion you trust, DSP you grow into照片, drivers you never think about. We verified real street prices across zZounds, Sweetwater, Andertons and Music Store so your button reflects the store that actually ships to you.</p>',
  es:'<p>El nivel premium es donde la elecci\u00f3n de interfaz se vuelve un compromiso de d\u00e9cada: conversi\u00f3n en la que conf\u00edas, DSP en el que creces, drivers en los que nunca piensas. Verificamos los precios reales de calle en zZounds, Sweetwater, Andertons y Music Store para que tu bot\u00f3n refleje la tienda que de verdad te env\u00eda.</p>'},
 {en:'<p>Rack and immersive premium units add channels, ADAT/AES routing and the modular I/O that commercial and Dolby Atmos studios demand. We priced every unit from real storefronts so the comparison stays honest.</p>',
  es:'<p>Las unidades premium de rack e inmersivas a\u00f1aden canales, ruteo ADAT/AES y el I/O modular que exigen los estudios comerciales y Dolby Atmos. Pusimos precio a cada unidad desde tiendas reales para que la comparaci\u00f3n siga siendo honesta.</p>'}
];
g.sections.forEach((s,i)=>{
  const t=texts[i]||texts[texts.length-1];
  s.content=t.en;s.content_es=t.es;
});
const out=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(out,null,1));
console.log('OK content/content_es añadidos | sections='+g.sections.length);
