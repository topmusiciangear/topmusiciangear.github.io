const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const g=GS.find(x=>x&&x.id==='premium-interfaces');
if(!g){console.error('premium-interfaces FALTA');process.exit(1)}
const texts=[
 {content:'<p>The premium tier means flagship conversion, UAD DSP/Unison, and drivers you never think about. These desktop units replace a rack without compromise.</p>',
  content_es:'<p>La gama premium significa conversi\u00f3n insignia, DSP/Unison UAD y drivers en los que nunca piensas. Estas unidades de escritorio sustituyen un rack sin compromiso.</p>',
  intro:'Flagship conversion and DSP in a desktop footprint that fits a home pro studio or a mobile rig.',
  intro_es:'Conversi\u00f3n insignia y DSP en un formato de escritorio que cabe en un estudio pro de casa o en un rig m\u00f3vil.'},
 {content:'<p>Rack units bring 8+ channels, expandable I/O and ADAT/AES routing to commercial and immersive studios. Buy these for channels and years of service.</p>',
  content_es:'<p>Las unidades de rack aportan 8+ canales, I/O expandible y ruteo ADAT/AES a estudios comerciales e inmersivos. C\u00f3mpralas por canales y a\u00f1os de servicio.</p>',
  intro:'Rack mounts deliver the channel count and routing that commercial and immersive workflows demand.',
  intro_es:'Los racks aportan los canales y el ruteo que exigen los flujos comerciales e inmersivos.'},
 {content:'<p>Immersive, Atmos-ready units — monitor controllers, immersive AD/DA and the routing a Dolby Atmos room needs. The new frontier of premium interfaces.</p>',
  content_es:'<p>Unidades inmersivas y listas para Atmos — controladores de monitor, AD/DA inmersivo y el ruteo que necesita una sala Dolby Atmos. La nueva frontera de las interfaces premium.</p>',
  intro:'Dolby Atmos ready — monitor control, immersive conversion and the routing an immersive studio requires.',
  intro_es:'Listo para Dolby Atmos — control de monitores, conversi\u00f3n inmersiva y el ruteo que requiere un estudio inmersivo.'}
];
g.sections.forEach((s,i)=>{
  const t=texts[i]||texts[texts.length-1];
  s.intro=t.intro;s.intro_es=t.intro_es;
  s.content=t.content;s.content_es=t.content_es;
});
if(!g.intro||!g.introduction){
  g.introduction='<p>Premium interfaces are the ones you keep for a decade. Buy the converter that outlives the music — Neumann and Lynx for pure AD/DA, UA Apollo for UAD DSP, RME for drivers that never fail, Apogee and Apogee modularity for immersive workflows.</p>';
  g.introduction_es='<p>Las interfaces premium son las que conservas una d\u00e9cada. Compra el convertidor que sobrevive a la m\u00fasica — Neumann y Lynx por AD/DA puro, UA Apollo por UAD DSP, RME por drivers que nunca fallan, Apogee por modularidad inmersiva.</p>';
}
const out=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(out,null,1));
console.log('OK premium-interfaces sections completadas | intro='+(!g.introduction?'still':'OK'));
