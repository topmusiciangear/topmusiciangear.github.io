const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

const vEn = "Squier Classic Vibe '60s Jazz Bass for the best vintage-spec Jazz at the price, Sire Marcus Miller V5 for the best-feeling passive build, Yamaha TRBX304 as the most versatile all-rounder, Sterling Ray4 for the best aggressive active tone under $400, Schecter Stiletto Stealth 4 for metal, ESP LTD B-204SM for stage looks with switchable EQ, Fender Player II Precision and Jazz for pro-level feel once you step up, Ibanez SR300E for the fastest thin neck, and Epiphone Thunderbird '64 as a niche neck-through rock classic.";
if (g.verdict !== vEn) die('veredicto EN no coincide');
g.verdict = "Squier Classic Vibe '60s Jazz Bass for the best vintage-spec Jazz at the price, Sire Marcus Miller V5 for the best-feeling passive build, Yamaha BB434 as the best passive P/J with real sustain, G&L Tribute L-2000 for the most versatility per instrument, Yamaha TRBX304 as the most versatile all-rounder, Sterling Ray4 for the best aggressive active tone under $400, Schecter Stiletto Stealth 4 for metal, ESP LTD B-204SM for stage looks with switchable EQ, Fender Player II Precision and Jazz for pro-level feel once you step up, Ibanez SR300E for the fastest thin neck, and Epiphone Thunderbird '64 as a niche neck-through rock classic.";

const vEs = 'Squier Classic Vibe \'60s Jazz Bass por el mejor Jazz con specs vintage a este precio, Sire Marcus Miller V5 por la mejor construcción pasiva en sensations, Yamaha TRBX304 como el todoterreno más versátil, Sterling Ray4 por el mejor tono activo agresivo por menos de $400, Schecter Stiletto Stealth 4 para metal, ESP LTD B-204SM para el aspecto de escenario con EQ conmutable, Fender Player II Precision y Jazz por sensación de nivel profesional al subir de gama, Ibanez SR300E por el mástil fino más rápido, y Epiphone Thunderbird \'64 como un clásico de nicho neck-through para rock.';
if (g.verdict_es !== vEs) die('veredicto ES no coincide');
g.verdict_es = "Squier Classic Vibe '60s Jazz Bass por el mejor Jazz con specs vintage a este precio, Sire Marcus Miller V5 por la mejor construcción pasiva en tacto, Yamaha BB434 por el mejor P/J pasivo con sustain de verdad, G&L Tribute L-2000 por la mayor versatilidad en un solo instrumento, Yamaha TRBX304 como el todoterreno más versátil, Sterling Ray4 por el mejor tono activo agresivo por menos de $400, Schecter Stiletto Stealth 4 para metal, ESP LTD B-204SM para el aspecto de escenario con EQ conmutable, Fender Player II Precision y Jazz por sensación de nivel profesional al subir de gama, Ibanez SR300E por el mástil fino más rápido, y Epiphone Thunderbird '64 como un clásico de nicho neck-through para rock.";

const cAnchor = 'The Schecter Stiletto Stealth 4 and the ESP LTD B-204SM cover the modern end of the spectrum';
if (!g.conclusion.includes(cAnchor)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.replace(cAnchor, 'The Yamaha BB434 is the passive high-water mark here: string it through the body at 45 degrees and the sustain jumps, with the BB234 as the honest half-price fallback. The G&L Tribute L-2000 takes the opposite approach — the most electronics on this list, but its Fullerton-built MFD pickups mean you are not paying flagship money for a flagship voice. The Schecter Stiletto Stealth 4 and the ESP LTD B-204SM cover the modern end of the spectrum');

const cEsAnchor = 'Los más claros veredictos: el Squier Classic Vibe para quien busca tono vintage auténtico';
if (!g.conclusion_es.includes(cEsAnchor)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.replace(cEsAnchor, 'Los veredictos más claros: el Squier Classic Vibe para quien busca tono vintage auténtico');
g.conclusion_es = g.conclusion_es.replace('En el lado moderno y agresivo, el Schecter Stiletto Stealth 4', 'El Yamaha BB434 es la cima pasiva de esta lista: átalo a través del cuerpo a 45 grados y el sustain se dispara, con el BB234 como alternativa honesta a mitad de precio. El G&L Tribute L-2000 va por el otro lado — la electrónica más completa de la lista, pero con sus pastillas MFD construidas en Fullerton para que no pagues precio insignia por una voz que sí lo es. En el lado moderno y agresivo, el Schecter Stiletto Stealth 4');

const dEn = 'The best budget basses that sound like expensive ones: Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304 and Fender Player II, with shop prices.';
if (g.description !== dEn) die('desc EN no coincide');
g.description = 'The best budget basses that sound like expensive ones: Squier Classic Vibe, Yamaha BB434, G&L Tribute L-2000, Sire Marcus Miller V5 and Fender Player II, with shop prices.';
const dEs = 'Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304 y Fender Player II: los bajos económicos que mejor suenan, con precios de tienda.';
if (g.description_es !== dEs) die('desc ES no coincide');
g.description_es = 'Squier Classic Vibe, Yamaha BB434, G&L Tribute L-2000 y Sire Marcus Miller V5: los bajos económicos que mejor suenan, con precios de tienda.';

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('veredicto + conclusion + descripciones EN/ES actualizados con BB434 y G&L');
console.log('\ndesc EN (' + g.description.length + '): ' + g.description);
console.log('desc ES (' + g.description_es.length + '): ' + g.description_es);