var fs=require('fs');
var P='data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var g=A.find(x=>x.id==='premium-interfaces');
var introSection={
  h:"What You Actually Pay For in a Premium Interface",
  h_es:"Por Qué Pagas en una Interfaz Premium",
  intro:"Above $1,500 you stop buying features and start buying certainty.",
  intro_es:"Por encima de 1.500 $ dejas de comprar funciones y empiezas a comprar certeza.",
  content:"<p><strong>Above $1,500 you stop buying features and start buying certainty.</strong> Premium means converters that stay honest at low levels, clocks that don't drift when the room gets hot, drivers that survive OS updates, and monitor paths you trust for a decade. The trick is knowing which certainty you need — colour while tracking, routing for a live rig, network audio, Atmos, or pure transparency for mastering. Pay for the bottleneck in your studio, not for the spec sheet.</p>",
  content_es:"<p><strong>Por encima de 1.500 $ dejas de comprar funciones y empiezas a comprar certeza.</strong> Premium es conversión que sigue honesta a bajo nivel, relojes que no se van cuando la sala se calienta, drivers que sobreviven a actualizaciones y rutas de monitor en las que confías una década. La clave es saber qué certeza necesitas — color al grabar, ruteo para directo, audio en red, Atmos o transparencia pura para mastering. Paga el cuello de botella de tu estudio, no la hoja de especificaciones.</p>",
  products:[]
};
g.sections.unshift(introSection);
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('now sections', g.sections.length);
g.sections.forEach((s,i)=> console.log(i, s.h.slice(0,70)));
