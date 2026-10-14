const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

// ---------- VERDICT ----------
const vEn = 'These budget basses punch far above their price: the Squier Classic Vibe for vintage vibe, the Affinity PJ for a P-bass feel on a budget, the Yamaha TRBX304 as the versatile all-rounder, the Ibanez SR300E for fast necks, the Sterling Ray4 for the StingRay sound, and the Epiphone Thunderbird \'64 for the iconic reverse-body look and neck-through feel.';
const vEs = 'Estos bajos económicos rinden muy por encima de su precio: el Squier Classic Vibe por su aire vintage, el Affinity PJ por la sensación P-bass con presupuesto, el Yamaha TRBX304 como opción versátil, el Ibanez SR300E por su mástil rápido, el Sterling Ray4 por el sonido StingRay, y el Epiphone Thunderbird \'64 por el diseño de cuerpo inverso y la sensación neck-through.';
if (g.verdict !== vEn) die('veredicto EN no coincide');
if (g.verdict_es !== vEs) die('veredicto ES no coincide');

g.verdict = 'Squier Classic Vibe \'60s Jazz Bass for the best vintage-spec Jazz at the price, Sire Marcus Miller V5 for the best-feeling passive build, Yamaha TRBX304 as the most versatile all-rounder, Sterling Ray4 for the best aggressive active tone under $400, Schecter Stiletto Stealth 4 for metal, ESP LTD B-204SM for stage looks with switchable EQ, Fender Player II Precision and Jazz for pro-level feel once you step up, Ibanez SR300E for the fastest thin neck, and Epiphone Thunderbird \'64 as a niche neck-through rock classic.';
g.verdict_es = 'Squier Classic Vibe \'60s Jazz Bass por el mejor Jazz con specs vintage a este precio, Sire Marcus Miller V5 por la mejor construcción pasiva en sensations, Yamaha TRBX304 como el todoterreno más versátil, Sterling Ray4 por el mejor tono activo agresivo por menos de $400, Schecter Stiletto Stealth 4 para metal, ESP LTD B-204SM para el aspecto de escenario con EQ conmutable, Fender Player II Precision y Jazz por sensación de nivel profesional al subir de gama, Ibanez SR300E por el mástil fino más rápido, y Epiphone Thunderbird \'64 como un clásico de nicho neck-through para rock.';

// ---------- CONCLUSION ----------
const cEn = 'And the Epiphone Thunderbird \'64 brings back the reverse-body shape that defined the genre, for a fraction of what a boutique reissue costs.';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.replace(cEn, 'The Schecter Stiletto Stealth 4 and the ESP LTD B-204SM cover the modern end of the spectrum: blacked-out metal tone with an active 2-band EQ on one side, spalted maple looks with a switchable 3-band on the other. Step up again and the Fender Player II Precision and Jazz bring stage-level feel without the American Professional price. The Epiphone Thunderbird \'64 is the deliberate outsider: a 9-ply neck-through with two ProBucker 760s that sounds brutal, but its weight neck-dives with a light strap and its size is not for everyone — keep it for classic rock and metal if that is your thing.');

const cEsOld = 'Eso no es exageración — es la verdad honesta sobre los bajos económicos en 2026.';
if (!g.conclusion_es.includes(cEsOld)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.replace(cEsOld, 'Eso no es exageración — es la verdad honesta sobre los bajos económicos. Los más claros veredictos: el Squier Classic Vibe para quien busca tono vintage auténtico, el Sire Marcus Miller V5 como el pasivo con mejor tacto de la lista, el Yamaha TRBX304 como todoterreno y el Fender Player II Precision para dar el salto a sensación de escenario sin llegar al precio American Professional. En el lado moderno y agresivo, el Schecter Stiletto Stealth 4 (EQ activa de 2 bandas, cuerpo de tilo negro) y el ESP LTD B-204SM (tapa de arce moteado, EQ activa de 3 bandas conmutable) cubren el gusto actual. El Epiphone Thunderbird \'64 es el outsider deliberado: neck-through de 9 capas que suena brutal, pero con su peso cabecea con correa ligera y no es para todo el mundo: quédatelo para rock clásico y metal si es lo tuyo.');

// ---------- DESCRIPTION ----------
const dEn = 'The best budget bass guitars that sound like expensive ones 2026. Squier Classic Vibe, Yamaha TRBX304, Ibanez SR300E, Sterling Ray4, and Epiphone.';
if (g.description !== dEn) die('desc EN no coincide');
g.description = 'The best budget bass guitars that sound like expensive ones, from the Squier Classic Vibe and Sire Marcus Miller V5 to the Fender Player II series. Includes shop prices.';
const dEs = 'En 2026, Los mejores bajos económicos que suenan como caros. Squier Classic Vibe, Yamaha TRBX304, Ibanez SR300E, Sterling Ray4 y Epiphone.';
if (g.description_es !== dEs) die('desc ES no coincide');
g.description_es = 'Los mejores bajos económicos que suenan como caros: Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304, Schecter Stiletto Stealth 4 y Fender Player II, con precios de tienda.';

// ---------- FEATURED SNIPPET ----------
const f = g.featuredSnippet;
f.name2_en = 'Sire Marcus Miller V5 4-String Bass';
f.name2_es = 'Sire Marcus Miller V5 4-String Bass';
f.brand2 = 'Sire';
f.brand2_es = 'Sire';
f.price2 = 599;
f.price2_es = 599;
f.rating2 = 4.7;
f.rating2_es = 4.7;
f.key2_en = 'Best-feeling passive build';
f.key2_es = 'Mejor construcción pasiva';
f.best2_en = 'Best passive bass under $700';
f.best2_es = 'Mejor bajo pasivo por menos de $700';
f.text_en = 'The Squier Classic Vibe \'60s Jazz Bass is the single best value in all of bass-dom — it sounds, looks, and feels like a bass that costs three times as much. The Sire Marcus Miller V5 answers it for touch: an alder body, a roasted hard maple neck with rolled Edgeless edges and a fully passive Vintage-J Revolution set, which is the best-feeling bass here under $700.';
f.text_es = 'El Squier Classic Vibe \'60s Jazz Bass es la mejor compra en el mundo del bajo — suena, se ve y se siente como un bajo que cuesta el triple. El Sire Marcus Miller V5 le responde en tacto: cuerpo de aliso, mástil de maple tostado con bordes redondeados y set Vintage-J Revolution totalmente pasivo, el que mejor se toca de esta lista por menos de $700.';
// ya corregido arriba
// f.text_es = f.text_es.replace('mejorel que mejor se toca de esta lista', 'el que mejor se toca de esta lista');
console.log('snippet: 2do producto -> Sire Marcus Miller V5');

// ---------- FAQs: anadir 4 y 5 ----------
if (!f.faq_q4_en) {
  f.faq_q4_en = 'Are Squier and Epiphone basses really in the same guide as Fender?';
  f.faq_a4_en = 'They earn their place by price and function, not by badge. The Squier Classic Vibe \'60s Jazz uses Fender-designed alnico single-coils and the same Jazz Bass neck geometry at roughly a fifth of the money, and the Epiphone Thunderbird \'64 brings a 9-ply neck-through body with two ProBucker 760s — a construction Fender does not offer at any price. Every true Fender on this list is marked as one; the cheaper routes to the same tones are marked as such too.';
  f.faq_q4_es = '¿Bajos Squier y Epiphone de verdad en la misma guía que Fender?';
  f.faq_a4_es = 'Se ganan su sitio por precio y función, no por la chapa. El Squier Classic Vibe \'60s Jazz usa single-coils alnico diseñadas por Fender y la misma geometría de mástil Jazz Bass por Around de una quinta parte del precio, y el Epiphone Thunderbird \'64 trae cuerpo neck-through de 9 capas con dos ProBucker 760: una construcción que Fender no ofrece a ningún precio. Cada Fender de verdad de esta lista está marcado como tal; las rutas baratas a los mismos tonos también.';
  f.faq_a4_es = f.faq_a4_es.replace('por Around de una quinta parte', 'por alrededor de una quinta parte');
  f.faq_q5_en = 'What is the single biggest upgrade worth making on one of these?';
  f.faq_a5_en = 'A proper setup. A cut nut stops string buzz and holds tuning, and a level fret dressing makes a cheap bass feel fast. After that, swaps in this order: pickups, then the bridge, then the tuners. Changing all three at once on a $350 bass is money you are better off spending on the Squier Classic Vibe or the Sire V5 outright — both arrive closer to how you want them.';
  f.faq_q5_es = '¿Cuál es la mejora más rentable en uno de estos bajos?';
  f.faq_a5_es = 'Un buen ajuste. Una cejuela bien cortada elimina el zumbido y mantiene la afinación, y un nivelado de trastes hace que un bajo barato parezca rápido. Después, cambia por este orden: pastillas, puente y por último clavijas. Cambiar las tres cosas de golpe en un bajo de $350 es dinero que mejor te gastas comprando directamente el Squier Classic Vibe o el Sire V5: los dos llegan más cerca de como los quieres.';
  console.log('FAQs: 3 -> 5');
} else console.log('FAQs ya a 5');
f.faq_a1_en = 'In a mix, yes. The biggest difference between an entry bass and a flagship bass is finishing details, wood selection and hardware longevity — not the fundamental tone. A Squier Classic Vibe with Fender-designed alnico pickups records perfectly alongside a $2,000 instrument.';
f.faq_a1_es = 'En una mezcla, sí. La mayor diferencia entre un bajo de $300 y uno de $2,000 está en los detalles de acabado, la calidad de la madera y la durabilidad del hardware — no en el tono fundamental. Un Squier Classic Vibe con pastillas alnico diseñadas por Fender graba perfectamente junto a un instrumento de $2.000.';

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nSTEP4 OK');