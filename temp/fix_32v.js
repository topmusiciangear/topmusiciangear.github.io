const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
const V = n => g.verdictProsCons.find(v => v.name === n);
function swap(arr, oldS, newS, tag) {
  const i = arr.indexOf(oldS);
  if (i === -1) { console.log('MISS ' + tag); process.exitCode = 1; return; }
  arr[i] = newS; console.log('OK ' + tag);
}
// 1. X32 weight 14kg -> 20.6kg
let v = V('Behringer X32');
swap(v.cons, 'Heavy and bulky at 14 kg — not portable', 'Heavy and bulky at 20.6 kg — not portable', 'x32w');
swap(v.cons_es, 'Pesada y voluminosa a 14 kg — no es portátil', 'Pesada y voluminosa con 20,6 kg — no es portátil', 'x32w-es');
// 2. M32: 14kg -> 24.5kg, drop false touchscreen con, add no-WiFi con
v = V('Midas M32 LIVE');
swap(v.cons, 'Heavier than most competitors at 14 kg', 'Heavier than most competitors at 24.5 kg — notably heavier than the X32', 'm32w');
swap(v.cons_es, 'Más pesada que la mayoría de competidoras a 14 kg', 'Más pesada que la mayoría de competidoras con 24,5 kg — notablemente más que la X32', 'm32w-es');
swap(v.cons, 'No built-in touchscreen', 'No built-in Wi-Fi — needs an external router for tablet control', 'm32scr');
swap(v.cons_es, 'Sin pantalla táctil integrada', 'Sin Wi-Fi integrado — pide un router externo para control con tablet', 'm32scr-es');
// 3. SQ-6+: 7-inch screen, 24 faders, clarify 24 local -> 48
v = V('Allen & Heath SQ-6+');
swap(v.pros, '25 motorized faders plus 9-inch dark-GUI touchscreen', '24 motorized channel faders plus 7-inch dark-GUI touchscreen', 'sqf');
swap(v.pros_es, '25 faders motorizados más pantalla táctil oscura de 9 pulgadas', '24 faders motorizados de canal más pantalla táctil oscura de 7 pulgadas', 'sqf-es');
swap(v.pros, '48 channels at 0.7 ms on the proven XCVI core', '24 local mic inputs expanding to 48 channels at 0.7 ms on the proven XCVI core', 'sq48');
swap(v.pros_es, '48 canales a 0,7 ms en el probado núcleo XCVI', '24 entradas de micro locales que se expanden a 48 canales a 0,7 ms en el probado núcleo XCVI', 'sq48-es');
// 4. 32S layers clarification
v = V('PreSonus StudioLive 32S');
swap(v.pros, '33 touch-sensitive faders — every channel under your fingers, no layers', '33 touch-sensitive faders — all 32 main channels under your fingers with no layers', '32sp');
swap(v.pros_es, '33 faders táctiles — cada canal bajo tus dedos, sin capas', '33 faders táctiles — los 32 canales principales bajo tus dedos, sin capas', '32sp-es');
swap(v.cons, '33 faders still need layers for all 40 channels', 'Layers only needed for the extra 8 aux/FX returns beyond the 32 main channels', '32sc');
swap(v.cons_es, '33 faders aún piden capas para los 40 canales', 'Las capas solo se usan para los 8 retornos/auxiliares extra más allá de los 32 canales principales', '32sc-es');
// 5. Ui24R 1U -> 4U
v = V('Soundcraft Ui24R');
swap(v.pros, 'Compact 1U rack format saves space', '4U rack format — no control surface needed', 'ui4u');
swap(v.pros_es, 'Formato rack compacto de 1U ahorra espacio', 'Formato rack de 4U — sin superficie de control', 'ui4u-es');
// 6. SE 32R con -> external device required
v = V('PreSonus StudioLive SE 32R');
swap(v.cons, 'No motorized faders — control is app-based only', 'Requires an external device (tablet/PC) to operate — no physical controls on the chassis', 'se32r');
swap(v.cons_es, 'Sin faders motorizados — el control es solo por app', 'Requiere un dispositivo externo (tablet/PC) para operar — sin controles físicos en el chasis', 'se32r-es');
// 7. 32SC HAS 17 faders
v = V('PreSonus StudioLive 32SC');
swap(v.cons, 'No motorized faders — all mixing is via software', '17 motorized faders cover 32 channels in layers — no one-to-one surface like the 32S', '32scc');
swap(v.cons_es, 'Sin faders motorizados — toda la mezcla es vía software', '17 faders motorizados cubren 32 canales por capas — sin superficie uno a uno como la 32S', '32scc-es');
// 8. Verdict (user text EN + natural ES)
g.verdict = 'The Behringer X32 delivers the best overall value with a mature ecosystem, though it feels dated. The Midas M32 LIVE is the premium choice for touring FOH, offering superior PRO preamps and road-ready build quality at a higher price point. The Allen & Heath SQ-6+ dominates the mid-sized category with pristine 96 kHz FPGA processing and ultra-low latency. For venues needing wireless mixing without a physical surface, the Soundcraft Ui24R and Mackie DL32SE lead the rack-mount field. The Yamaha TF3 offers smooth TouchFlow operation, making it ideal for churches and schools seeking reliability and quick setups.';
g.verdict_es = 'La Behringer X32 ofrece la mejor relación calidad-precio global con un ecosistema maduro, aunque se siente desactualizada. La Midas M32 LIVE es la opción premium para FOH de gira, con previos PRO superiores y construcción lista para carretera a un precio mayor. La Allen & Heath SQ-6+ domina la gama media con procesamiento FPGA prístino a 96 kHz y latencia ultrabaja. Para espacios que necesitan mezcla inalámbrica sin superficie física, la Soundcraft Ui24R y la Mackie DL32SE lideran el formato rack. La Yamaha TF3 ofrece una operación TouchFlow fluida, ideal para iglesias y escuelas que buscan fiabilidad y montajes rápidos.';
console.log('OK verdict');
fs.writeFileSync(F, JSON.stringify(G, null, 2));