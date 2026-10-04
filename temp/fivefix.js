const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-5-string-basses');
function rep(obj, key, oldS, newS) {
  if (!obj[key].includes(oldS)) { console.log('MISS [' + key + ']: ' + oldS.slice(0, 60)); return; }
  obj[key] = obj[key].split(oldS).join(newS);
}
// headings
const H = [
  ['Why Five Strings, and Why Price Tiers Decide Everything', 'Why Five Strings, and How to Choose Your Tier'],
  ['Por qué cinco cuerdas, y por qué el precio lo decide todo', 'Por qué cinco cuerdas y cómo elegir tu gama'],
  ['Ibanez GSR205B: The Cheapest Honest Five', 'Ibanez GSR205B: An Honest First Five'],
  ['Ibanez GSR205B: El cinco cuerdas honesto más barato', 'Ibanez GSR205B: Un honesto primer cinco cuerdas'],
  ['Sterling SUB Ray5: StingRay Thump Near $450', 'Sterling SUB Ray5: StingRay Thump for Working Bassists'],
  ['Sterling SUB Ray5: Thump StingRay cerca de $450', 'Sterling SUB Ray5: Thump StingRay para trabajar'],
  ['Yamaha TRBX305: The Versatility King Under $500', 'Yamaha TRBX305: The Versatility King for Gigging'],
  ['Yamaha TRBX305: El rey de la versatilidad bajo $500', 'Yamaha TRBX305: El rey de la versatilidad para bolos'],
  ['Ibanez SR505A: Roasted Neck Speed, Buyable New', 'Ibanez SR505A: Roasted Neck Speed'],
  ['Ibanez SR505A: Velocidad con mástil tostado, comprable nuevo', 'Ibanez SR505A: Velocidad con mástil tostado'],
  ["Squier Classic Vibe '70s Jazz V: Vintage Looks, Modern Price", "Squier Classic Vibe '70s Jazz V: Vintage Looks, Modern Playability"],
  ["Squier Classic Vibe '70s Jazz V: Estética vintage, precio moderno", "Squier Classic Vibe '70s Jazz V: Estética vintage, tacto moderno"],
  ['EHB1005MS: The Clearest Low B Under $1,500', 'EHB1005MS: The Clearest Low B'],
  ['EHB1005MS: El Si grave más claro bajo $1.500', 'EHB1005MS: El Si grave más claro']
];
g.sections.forEach(s => {
  H.forEach(([o, n]) => {
    if (s.heading === o) s.heading = n;
    if (s.heading_es === o) s.heading_es = n;
  });
});
// SEC0 tiers without figures
rep(g.sections[0], 'content', 'Budget (under $500)</strong> proves the concept', 'Budget tier</strong> proves the concept');
rep(g.sections[0], 'content', 'Mid-range ($500–$1,100)</strong> is where working bassists live', 'Mid-range</strong> is where working bassists live');
rep(g.sections[0], 'content', 'Premium (over $1,300)</strong> buys definitive low B', 'Premium</strong> buys definitive low B');
rep(g.sections[0], 'content_es', 'Económicos (menos de $500)</strong> prueban el concepto', 'La gama económica</strong> prueba el concepto');
rep(g.sections[0], 'content_es', 'Medios ($500–$1.100)</strong> es donde viven los bajistas trabajadores', 'La gama media</strong> es donde viven los bajistas trabajadores');
rep(g.sections[0], 'content_es', 'Premium (más de $1.300)</strong> accede a Si graves definitivos', 'La gama premium</strong> accede a Si graves definitivos');
// SEC1
rep(g.sections[1], 'content', 'and a Phat II bass boost for $299.99 street.</strong>', 'and a Phat II bass boost for real low-end weight.</strong>');
rep(g.sections[1], 'content_es', 'y boost Phat II por $299,99 de calle.</strong>', 'y boost Phat II con peso grave de verdad.</strong>');
// SEC2 jabon + concordance + price para
rep(g.sections[2], 'content', 'Jabon body keeps weight down', 'Basswood body keeps weight down');
rep(g.sections[2], 'content', '45 mm nut fits five comfortably. Note the real street price hovers near $460 (£449 at Andertons) — the old ~$350 is gone.', '45 mm nut fits five strings comfortably. If you want StingRay punch without the Music Man budget, this is the working bassist\u2019s shortcut.');
rep(g.sections[2], 'content_es', 'Un humbucker cerámico más previo 9V de dos bandas igualan autoridad funk-rock instantánea.</strong> El cuerpo de jabón baja el peso, el mástil y diapasón de arce duro con radio 12" y 21 trastes medium tocan rápido, la cejuela 45 mm acomoda cinco con comodidad. Ojo: el precio real ronda ~$460 (£449 en Andertons) — los viejos ~$350 se fueron.', 'Un humbucker cerámico más un previo de 9V y ecualizador de dos bandas igualan autoridad funk-rock instantánea.</strong> El cuerpo de tilo baja el peso, el mástil y diapasón de arce duro con radio de 12 pulgadas y 21 trastes medianos se tocan rápido, la cejuela de 45 mm alberga las cinco cuerdas con comodidad. Si quieres pegada StingRay sin presupuesto Music Man, este es el atajo del bajista trabajador.');
// SEC3
rep(g.sections[3], 'content', 'Street sits near $500 (£416 at G4M, £429 at Andertons) — up from the old ~$400, still the smart budget stretch.', 'One bass that covers wedding funk, rock covers and church gigs — the versatile pick if you play a little of everything.');
rep(g.sections[3], 'content_es', 'La calle ronda ~$500 (£416 en G4M, £429 en Andertons) — más que los viejos ~$400, sigue siendo el salto económico inteligente.', 'Un bajo que cubre funk de bodas, rock de versiones y bolos de iglesia — la opción versátil si tocas un poco de todo.');
// SEC4
rep(g.sections[4], 'content', 'with honest passive VVT wiring near $400 street.</strong>', 'with honest passive VVT wiring.</strong>');
rep(g.sections[4], 'content_es', 'con cableado VVT pasivo honesto cerca de $400 de calle.</strong>', 'con cableado VVT pasivo honesto.</strong>');
// SEC5
rep(g.sections[5], 'content', 'blacked-out hardware — built for heavy styles at £669.</strong>', 'blacked-out hardware — built for heavy styles.</strong>');
rep(g.sections[5], 'content', 'Graph Tech XL Black Tusq nut, S-Tek bridge. £669 at Andertons and Gear4music, $699 at zzounds.', 'Graph Tech XL Black Tusq nut, S-Tek bridge. The 35-inch scale keeps the B tight for drop tunings and aggressive picking.');
rep(g.sections[5], 'content_es', 'y hardware negro — construido para estilos pesados a £669.</strong>', 'y hardware negro — construido para estilos pesados.</strong>');
rep(g.sections[5], 'content_es', 'cejuela Graph Tech XL Black Tusq, puente S-Tek. £669 en Andertons y Gear4music, $699 en zzounds.', 'cejuela Graph Tech XL Black Tusq, puente S-Tek. La escala de 35 pulgadas mantiene el Si tenso para afinaciones graves y púa agresiva.');
// SEC6
rep(g.sections[6], 'content', 'String it through-body for maximum B sustain or top-load for snap. $659.99 street — the passive mid-range reference.', 'String it through-body for maximum B sustain or top-load for snap.');
rep(g.sections[6], 'content_es', 'El encordado a través del cuerpo da máximo sustain del Si; el top-load da ataque. $659,99 de calle — la referencia pasiva media.', 'El encordado a través del cuerpo da máximo sustain del Si; el top-load da ataque.');
// SEC7
rep(g.sections[7], 'content', '24 medium frets on rosewood. The current SR500-series five-string, £629 new at Andertons.', '24 medium frets on rosewood. The slim roasted neck is the fastest here for small hands that want modern active tone.');
rep(g.sections[7], 'content_es', '24 trastes medium en palisandro. El cinco cuerdas SR500 actual, £629 nuevo en Andertons.', '24 trastes medianos en palisandro. El fino mástil tostado es el más rápido aquí para manos pequeñas que buscan tono activo moderno.');
// SEC8
rep(g.sections[8], 'content', 'Fully passive VVT, narrow-tall frets, $479.99 street at zzounds, £439 at Andertons and G4M. Body wood varies by finish (poplar or soft maple) — tone does not.', 'Fully passive VVT with narrow-tall frets. Body wood varies by finish (poplar or soft maple) — tone does not.');
rep(g.sections[8], 'content_es', 'Totalmente pasivo VVT, trastes narrow tall, $479,99 de calle en zzounds, £439 en Andertons y G4M. La madera varía por acabado (álamo o arce blando) — el tono, no.', 'Totalmente pasivo VVT con trastes estrechos y altos. La madera varía por acabado (álamo o arce blando) — el tono, no.');
// SEC9
rep(g.sections[9], 'content', 'molded hardshell included. Street runs $1,999 and up — budget $2,100 for roasted pine colors, not the old ~$1,900.', 'molded hardshell included. The rolled edges and sculpted heel make it the most comfortable US five for long sessions.');
rep(g.sections[9], 'content_es', 'estuche rígido incluido. La calle es $1.999 hacia arriba — calcula $2.100 para colores pino tostado, no los viejos ~$1.900.', 'estuche rígido moldeado incluido. Los bordes matados y el talón esculpido lo convierten en el cinco cuerdas USA más cómodo para sesiones largas.');
// SEC10
rep(g.sections[10], 'content', 'Convertible HiMass bridge, 21 medium-jumbo frets. $2,519 street, £2,149 in stock at Andertons.', 'Convertible HiMass bridge, 21 medium-jumbo frets. Switch to passive mode and it still records like a vintage Jazz when the battery dies mid-session.');
rep(g.sections[10], 'content_es', 'Puente convertible HiMass, 21 trastes medium-jumbo. $2.519 de calle, £2.149 en stock en Andertons.', 'Puente convertible HiMass, 21 trastes medium-jumbo. Cambia a modo pasivo y sigue grabando como un Jazz vintage aunque muera la batería en mitad de la sesión.');
// SEC11
rep(g.sections[11], 'content', 'MR5HS bridge at 18 mm, gig bag included. £1,044 at G4M, $1,349.99 street.', 'MR5HS bridge at 18 mm, gig bag included. At 18 mm spacing with a headless body, it balances on a strap like nothing else here.');
rep(g.sections[11], 'content_es', 'puente MR5HS a 18 mm, funda incluida. £1.044 en G4M, $1.349,99 de calle.', 'puente MR5HS a 18 mm, funda incluida. Con espaciado de 18 mm y cuerpo sin pala, se equilibra colgado como ningún otro aquí.');
// SEC12
rep(g.sections[12], 'content', 'five-piece maple neck, active/passive switch. Street runs about $2,699 and up (£2,049 preorder at Andertons) — the old ~$2,000 is long gone.', 'five-piece maple neck, active/passive switch. The 37-inch B stays piano-tight for low tunings where 34-inch basses go muddy.');
rep(g.sections[12], 'content_es', 'mástil de cinco piezas de arce, selector activo/pasivo. La calle ronda ~$2.699 hacia arriba (£2.049 preorder en Andertons) — los viejos ~$2.000 se fueron hace tiempo.', 'mástil de cinco piezas de arce, selector activo/pasivo. El Si de 37 pulgadas se mantiene tenso como piano en afinaciones graves donde los bajos de 34 se embarran.');
// intro / concl / verdict
rep(g, 'intro', 'Budget (under $500) for starting on a 5-string, mid-range ($500–$1,100) for working pros, premium (over $1,300) for studio flagships.', 'Budget picks for starting on five strings, mid-range workhorses for gigging pros, premium flagships for the studio.');
rep(g, 'intro_es', 'Económicos (menos de $500) para empezar con un bajo de 5 cuerdas, medios ($500–$1.100) para profesionales, premium (más de $1.300) para buques insignia de estudio.', 'Modelos económicos para empezar con cinco cuerdas, herramientas medias para profesionales en activo, insignias premium para estudio.');
rep(g, 'conclusion', 'Squier Affinity Jazz V for classic voice near $400.', 'Squier Affinity Jazz V for classic passive voice.');
rep(g, 'conclusion_es', 'Squier Affinity Jazz V por voz clásica cerca de $400.', 'Squier Affinity Jazz V por su voz clásica pasiva.');
rep(g, 'verdict', 'Starting on a 5-string bass under $500? GSR205B, Ray5, TRBX305 or Affinity Jazz V. Gigging weekly $500–$1,100? Schecter Stiletto Stealth-5, BB435, SR505A or Classic Vibe 70s Jazz V. Recording flagship over $1,300? AmPro II Jazz V, Ultra II Jazz V, EHB1005MS or Dingwall Combustion.', 'Starting on five strings? GSR205B, Ray5, TRBX305 or Affinity Jazz V. Gigging weekly? Schecter Stiletto Stealth-5, BB435, SR505A or Classic Vibe 70s Jazz V. Recording flagship? AmPro II Jazz V, Ultra II Jazz V, EHB1005MS or Dingwall Combustion.');
rep(g, 'verdict_es', '¿Empezando con un bajo de 5 cuerdas por menos de $500? GSR205B, Ray5, TRBX305 o Affinity Jazz V. ¿Tocando semanal $500–$1.100? Schecter Stiletto Stealth-5, BB435, SR505A o Classic Vibe 70s Jazz V. ¿Insignia de grabación más de $1.300? AmPro II Jazz V, Ultra II Jazz V, EHB1005MS o Dingwall Combustion.', '¿Empezando con cinco cuerdas? GSR205B, Ray5, TRBX305 o Affinity Jazz V. ¿Tocando cada semana? Schecter Stiletto Stealth-5, BB435, SR505A o Classic Vibe 70s Jazz V. ¿Buscando insignia de grabación? AmPro II Jazz V, Ultra II Jazz V, EHB1005MS o Dingwall Combustion.');
// Tilo (jabón) -> Tilo
g.productTable.rows.forEach(r => {
  (r.values || []).forEach(v => {
    if (v.value_es === 'Tilo (jabón)') v.value_es = 'Tilo';
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('5-string reorientada');