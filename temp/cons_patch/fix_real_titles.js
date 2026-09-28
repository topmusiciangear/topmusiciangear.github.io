var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }

var fixes=0;
function fix(id, fields){
  var g=G(id); if(!g){console.log('MISSING '+id); return;}
  Object.keys(fields).forEach(function(k){
    if(g[k]!==fields[k]){ g[k]=fields[k]; fixes++; console.log(id+' '+k+' fixed'); }
  });
}

// 1. Missing "What to Buy" / "qué comprar" in beginner guitar guides
fix('best-acoustic-guitars-for-beginners',{
  title:'Best Acoustic Guitars for Beginners: What to Buy',
  title_es:'Mejores guitarras acústicas para principiantes: qué comprar',
  titleTag:'Best Acoustic Guitars for Beginners: What to Buy',
  titleTag_es:'Mejores guitarras acústicas para principiantes: qué comprar'
});

fix('best-beginner-electric-guitar',{
  title:'Best Beginner Electric Guitars: What to Buy',
  title_es:'Mejores guitarras eléctricas para principiantes: qué comprar',
  titleTag:'Best Beginner Electric Guitars: What to Buy',
  titleTag_es:'Mejores guitarras eléctricas para principiantes: qué comprar'
});

// 2. Missing "guía completa" where other language has it
fix('best-microphone',{
  title_es:'Mejor micrófono para voces y grabación casera: guía completa',
  titleTag_es:'Mejor micrófono para voces y grabación casera: guía completa'
});

fix('vocal-plugins',{
  title:'Best Vocal Plugins: Full Processing Chain',
  title_es:'Mejores plugins vocales: cadena de procesamiento completa: guía completa',
  titleTag:'Best Vocal Plugins: Full Processing Chain',
  titleTag_es:'Mejores plugins vocales: cadena completa'
});

// 3. TitleTag missing in one language for VS guides
var vs_guides=['sm57-vs-sm58','m50x-vs-mdr7506','k371-vs-mdr7506','sm57-vs-md421','american-pro-vs-les-paul','blues-junior-vs-ac30','fabfilter-vs-ozone','best-daw-for-beginners'];
vs_guides.forEach(function(id){
  var g=G(id);
  if(g && !g.titleTag && g.titleTag_es){
    fix(id,{titleTag:g.title});
  }
  if(g && g.titleTag && !g.titleTag_es){
    fix(id,{titleTag_es:g.title_es});
  }
});

// 4. starter-studio: add "Home" to ES (estudio casero = home studio, but tag says "estudio casero" - already there, but title missing "Home")
fix('starter-studio',{
  title_es:'Mejor kit de home studio por menos de $1,000'
});

// 5. best-interface: add "Home" to ES (already "grabación casera" = home recording, ok)

// 6. midi-keyboards: add "home" to ES titleTag
fix('midi-keyboards',{
  titleTag_es:'Mejores teclados y controladores MIDI para tu home studio'
});

// 7. best-guitar-home-office: already "home office" in both

// 8. budget-headphones: EN says "Cheap" ES says "económicos" - translation ok, but tag mismatch
fix('budget-headphones',{
  titleTag:'Best Cheap Studio Headphones Under $150',
  titleTag_es:'Mejores auriculares de estudio económicos por menos de $150'
});

// 9. budget-usb-mics: EN "Budget" ES missing
fix('budget-usb-mics',{
  titleTag_es:'13 mejores micrófonos USB económicos por menos de $100'
});

// 10. best-monitors-for-small-rooms: ES has "qué" spurious
fix('best-monitors-for-small-rooms',{
  titleTag_es:'Mejores monitores de estudio para salas pequeñas'
});

// 11. budget-bass-like-expensive: ES "qué" spurious
fix('budget-bass-like-expensive',{
  titleTag_es:'Bajos con mejor relación calidad-precio'
});

// 12. studio-subwoofers-setup: EN "guide" ES missing
fix('studio-subwoofers-setup',{
  titleTag_es:'Cómo configurar un subwoofer de estudio: guía de calibración'
});

// 13. active-vs-passive-pa: ES "mejores/mejor" spurious
fix('active-vs-passive-pa',{
  titleTag_es:'Altavoces activos vs pasivos: ¿cuál elegir?'
});

// 14. ableton-vs-fl-studio: ES "mejores/mejor" spurious, EN "studio" missing
fix('ableton-vs-fl-studio',{
  titleTag_es:'Ableton Live vs FL Studio: duelo de DAW',
  titleTag:'Ableton Live vs FL Studio: DAW Duel'
});

// 15. best-ribbon-mics: ES "estudio" missing in EN
fix('best-ribbon-mics',{
  title:'Best Ribbon Microphones for Studio Recording',
  titleTag:'Best Ribbon Microphones for Studio Recording'
});

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('fixes applied: '+fixes);