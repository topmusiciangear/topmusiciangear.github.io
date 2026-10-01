// Guitarras final: fender-guide +2, best-electric-guitar +11 (cols + verdicts).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (en, es) => ({ title: en, title_es: es });
{
  const g = G.find(x => x.id === 'fender-guide');
  g.productTable.columns.push(
    W('Fender American Professional II Stratocaster', 'Fender American Professional II Stratocaster'),
    W("Gibson Les Paul Standard '60s", "Gibson Les Paul Standard '60s")
  );
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  const P = (en, es) => V(en, es);
  rows['Best For'].values.push(P('Pro SSS Stratocaster', 'Stratocaster SSS pro'), P('Classic rock authority', 'Autoridad del rock clásico'));
  rows['Body Wood'].values.push(P('Alder', 'Aliso'), P('Mahogany + maple top', 'Caoba + tapa de arce'));
  rows['Neck'].values.push(P('Maple, Deep C', 'Arce, Deep C'), P('Mahogany, SlimTaper', 'Caoba, SlimTaper'));
  rows['Frets & Fretboard'].values.push(P('22, maple or rosewood', '22, arce o palisandro'), P('22, rosewood', '22, palisandro'));
  rows['Pickups'].values.push(P('V-Mod II single-coils', 'Single-coils V-Mod II'), P('60s Burstbucker HH', 'Burstbucker 60s HH'));
  rows['Scale Length'].values.push(P('25.5 in (648 mm)', '25,5" (648 mm)'), P('24.75 in (629 mm)', '24,75" (629 mm)'));
  rows['Tuners'].values.push(P('Fender locking', 'Fender con bloqueo'), P('Grover Rotomatic', 'Grover Rotomatic'));
  rows['Weight'].values.push(P('7.8 lb (3.5 kg)', '3,5 kg'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'));
  g.verdictProsCons.push(
    { name: 'Fender American Professional II Stratocaster', name_es: 'Fender American Professional II Stratocaster',
      pros: ['V-Mod II single-coils with true SSS Strat voice', 'Deep C neck with narrow-tall frets for easy bending', '2-point tremolo with pop-in arm stays in tune', 'Treble bleed keeps highs when rolling volume down'],
      cons: ['Costs multiples of the Player II Strat', 'Single-coils hum under stage lights', 'Gloss neck finish divides satin lovers', 'Molded case adds to carry weight'],
      pros_es: ['Single-coils V-Mod II con verdadera voz SSS Strat', 'Mástil Deep C con trastes narrow-tall fáciles de bendear', 'Trémolo de 2 puntos con brazo pop-in que aguanta afinación', 'Treble bleed mantiene agudos al bajar volumen'],
      cons_es: ['Cuesta múltiplos de la Player II Strat', 'Las singles zumban bajo focos', 'El acabado brillante divide a amantes del satinado', 'El estuche añade peso al transportar'] },
    { name: "Gibson Les Paul Standard '60s", name_es: "Gibson Les Paul Standard '60s",
      pros: ['Non-weight-relieved mahogany plus AA maple cap sustain', '60s Burstbuckers with Orange Drop hand-wired controls', 'SlimTaper neck with 12-inch radius for fast lead work', 'ABR-1 bridge with aluminum stop bar resonance'],
      cons: ['Heaviest guitar here by a wide margin', 'No weight relief — back and shoulder feel it', 'Premium price over Fender counterparts', 'Nitro finish needs more care than poly'],
      pros_es: ['Caoba maciza más tapa de arce AA que sostienen el sustain', 'Burstbuckers 60s con controles Orange Drop cableados a mano', 'Mástil SlimTaper con radio de 12 pulgadas para solos rápidos', 'Puente ABR-1 con cordal de aluminio resonante'],
      cons_es: ['La guitarra más pesada aquí por diferencia', 'Sin aligerado — espalda y hombro lo notan', 'Precio premium sobre contrapartes Fender', 'El nitro necesita más cuidado que el poli'] }
  );
  g.verdict += " The American Professional II Stratocaster is the pro SSS reference, and the Les Paul Standard '60s brings classic rock authority.";
  g.verdict_es += " La American Professional II Stratocaster es la referencia SSS pro, y la Les Paul Standard '60s aporta la autoridad del rock clásico.";
}
{
  const g = G.find(x => x.id === 'best-electric-guitar');
  const cols = ['Enya Nova Go Sonic Smart Electric Guitar', "Squier Classic Vibe '50s Stratocaster", 'Squier Debut Series Stratocaster', 'Squier Affinity Series Stratocaster', 'Squier Sonic Mustang', 'Fender Player II Jazzmaster', 'Fender Player II Stratocaster HSS', 'Fender Player II Telecaster', "Gibson Les Paul Standard '60s", 'Fender American Ultra II Stratocaster', 'Fender American Professional II Telecaster'];
  cols.forEach(t => g.productTable.columns.push({ title: t, title_es: t }));
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  const P = (en, es) => V(en, es);
  const put = (label, arr) => rows[label].values.push(...arr);
  put('Best For', [P('Indestructible smart guitar', 'Guitarra inteligente indestructible'), P('Vintage vibe on budget', 'Vibe vintage económico'), P('Cheapest playable Strat', 'Strat tocable más barata'), P('Budget Stratocaster', 'Stratocaster económica'), P('Short-scale fun', 'Diversión de escala corta'), P('Offset indie textures', 'Texturas indie offset'), P('Versatile HSS workhorse', 'HSS versátil de batalla'), P('Twang for tracking', 'Twang para grabar'), P('Classic rock authority', 'Autoridad del rock clásico'), P('Flagship noiseless Strat', 'Strat insignia sin ruido'), P('Pro Tele twang', 'Twang Tele pro')]);
  put('Body Wood', [P('Carbon fiber', 'Fibra de carbono'), P('Pine', 'Pino'), P('Poplar', 'Álamo'), P('Poplar', 'Álamo'), P('Poplar', 'Álamo'), P('Alder', 'Aliso'), P('Alder', 'Aliso'), P('Alder', 'Aliso'), P('Mahogany + maple top', 'Caoba + tapa de arce'), P('Select alder', 'Aliso selecto'), P('Alder', 'Aliso')]);
  put('Neck', [P('Carbon, asymmetrical', 'Carbono, asimétrico'), P('Maple, C shape', 'Arce, forma C'), P('Maple, C shape', 'Arce, forma C'), P('Maple, C shape', 'Arce, forma C'), P('Maple, C shape', 'Arce, forma C'), P('Maple, Modern C', 'Arce, Modern C'), P('Maple, Modern C', 'Arce, Modern C'), P('Maple, Modern C', 'Arce, Modern C'), P('Mahogany, SlimTaper', 'Caoba, SlimTaper'), P('Quartersawn maple, Modern D', 'Arce cuartos, Modern D'), P('Maple, Deep C', 'Arce, Deep C')]);
  put('Frets & Fretboard', [P('22, carbon fiber', '22, fibra de carbono'), P('21, maple', '21, arce'), P('21, laurel', '21, laurel'), P('21, maple/laurel', '21, arce/laurel'), P('22, maple', '22, arce'), P('22, rosewood', '22, palisandro'), P('22, maple/rosewood', '22, arce/palisandro'), P('21, maple', '21, arce'), P('22, rosewood', '22, palisandro'), P('22, ebony/maple compound', '22, ébano/arce compuesto'), P('22, maple/rosewood', '22, arce/palisandro')]);
  put('Pickups', [P('Alnico II/V HH', 'Alnico II/V HH'), P('Fender alnico SSS', 'Alnico Fender SSS'), P('Ceramic SSS', 'Cerámicas SSS'), P('Ceramic SSS', 'Cerámicas SSS'), P('Ceramic SS', 'Cerámicas SS'), P('2x Player Alnico 5 JM', '2x Player Alnico 5 JM'), P('Player Alnico 2/5 HSS', 'Player Alnico 2/5 HSS'), P('2x Player Alnico 5 single coils', '2x singles Player Alnico 5'), P('60s Burstbucker HH', 'Burstbucker 60s HH'), P('Ultra II Noiseless SSS', 'Ultra II Noiseless SSS'), P('V-Mod II Tele SS', 'V-Mod II Tele SS')]);
  put('Scale Length', [P('24.75 in (629 mm)', '24,75" (629 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('24 in (610 mm)', '24" (610 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('24.75 in (629 mm)', '24,75" (629 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)'), P('25.5 in (648 mm)', '25,5" (648 mm)')]);
  put('Tremolo / Bridge', [P('Tune-o-matic', 'Tune-o-matic'), P('Vintage tremolo', 'Trémolo vintage'), P('Synchronized tremolo', 'Trémolo sincronizado'), P('2-point tremolo', 'Trémolo 2 puntos'), P('Hardtail', 'Hardtail'), P('Floating tremolo', 'Trémolo flotante'), P('2-point tremolo', 'Trémolo 2 puntos'), P('3-saddle Tele', 'Tele 3 selletas'), P('Tune-o-matic', 'Tune-o-matic'), P('2-point tremolo', 'Trémolo 2 puntos'), P('3-saddle Tele', 'Tele 3 selletas')]);
  put('Tuners', [P('Custom sealed', 'Selladas custom'), P('Vintage-style', 'Vintage'), P('Die-cast sealed', 'Selladas fundidas'), P('Sealed die-cast', 'Selladas fundidas'), P('Sealed die-cast', 'Selladas fundidas'), P('ClassicGear', 'ClassicGear'), P('Player', 'Player'), P('Player', 'Player'), P('Grover Rotomatic', 'Grover Rotomatic'), P('Locking', 'Con bloqueo'), P('Fender locking', 'Fender con bloqueo')]);
  put('Weight', [P('6.6 lb (3.0 kg)', '3,0 kg'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('7.6 lb (3.4 kg)', '3,4 kg'), P('7.3 lb (3.3 kg)', '3,3 kg'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)')]);
  const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
  g.verdictProsCons.push(
    VD('Enya Nova Go Sonic Smart Electric Guitar',
      ['Carbon unibody shrugs off weather, drops and travel', '10W speaker plus BT, headphone and USB-C with no amp needed', 'Alnico II/V humbuckers with coil-split push-pull', '24.75-inch scale with 22 medium frets plays familiar'],
      ['Composite feel divides wood purists', 'Onboard speaker cannot replace a real amp on stage', 'Charging routine adds gig-day logistics', 'Resale market thinner than Fender or Gibson'],
      ['El monocasco de carbono aguanta clima, golpes y viajes', 'Altavoz de 10W más BT, auriculares y USB-C sin ampli', 'Humbuckers Alnico II/V con coil-split push-pull', 'Escala 24,75 con 22 trastes medios que resulta familiar'],
      ['El tacto composite divide a puristas de madera', 'El altavoz no sustituye un ampli real en escenario', 'La rutina de carga añade logística de bolo', 'Reventa más floja que Fender o Gibson']),
    VD("Squier Classic Vibe '50s Stratocaster",
      ['Pine body with Fender-designed alnico pickups for real Strat chime', 'Narrow-tall frets with 9.5-inch radius bend easily', 'Vintage styling with tinted neck and aged plastics', 'Best fit and finish per dollar in the Squier range'],
      ['Pine dents easier than alder or ash', 'Vintage-style tuners without locking stability', 'Gloss neck gets sticky on sweaty stages', 'No gig bag included at this price'],
      ['Cuerpo de pino con alnicos Fender para el chime Strat real', 'Trastes narrow-tall con radio 9,5 fáciles de bendear', 'Estética vintage con mástil tintado y plásticos aged', 'Mejor acabado por euro en el rango Squier'],
      ['El pino se abolla antes que aliso o fresno', 'Clavijas vintage sin estabilidad de bloqueo', 'El brillo del mástil se pega en escenario', 'Sin funda incluida a este precio']),
    VD('Squier Debut Series Stratocaster',
      ['Lowest-priced playable full-size Strat', 'Light poplar body with comfy C neck', 'Simple volume-tone controls for beginners', 'Real 25.5-inch scale transfers technique'],
      ['Ceramic pickups sound thin next to alnico', 'Basic hardware wears faster with use', '21 frets limit high-register soloing', 'Factory setup often needs a tech visit'],
      ['La Strat de tamaño real tocable más barata', 'Cuerpo ligero de álamo con mástil C cómodo', 'Controles simples volumen-tono para principiantes', 'Escala real 25,5 que transfiere técnica'],
      ['Las cerámicas suenan finas junto a alnico', 'El hardware básico se gasta antes con uso', '21 trastes limitan solos agudos', 'El ajuste de fábrica suele pedir luthier']),
    VD('Squier Affinity Series Stratocaster',
      ['Thin lightweight body with 2-point tremolo', 'Sealed die-cast tuners with split shafts hold tune', 'Comfortable slim C neck for small hands', 'Upgradable platform with standard parts'],
      ['Ceramic pickups lack alnico complexity', 'Thin body resonates less than full-depth Strats', 'Electronics beg for upgrades within a year', 'Fretwork varies unit to unit'],
      ['Cuerpo fino y ligero con trémolo de 2 puntos', 'Clavijas selladas con eje partido que aguantan', 'Mástil C fino cómodo para manos pequeñas', 'Plataforma mejorable con piezas estándar'],
      ['Las cerámicas carecen de complejidad alnico', 'El cuerpo fino resuena menos que un Strat pleno', 'La electrónica pide mejora antes del año', 'Los trastes varían de unidad a unidad']),
    VD('Squier Sonic Mustang',
      ['24-inch short scale suits small hands and beginners', 'Light poplar body with hardtail tuning stability', 'Two ceramic single-coils with clear Mustang voice', 'Cheapest offset route into Fender style'],
      ['Short scale crowds wide chord stretches', 'Ceramic pickups sound bright and thin clean', 'Basic sealed tuners with no locking', 'No tremolo option on this model'],
      ['Escala corta de 24 pulgadas para manos pequeñas', 'Cuerpo ligero de álamo con hardtail estable', 'Dos singles cerámicas con voz Mustang clara', 'La ruta offset más barata al estilo Fender'],
      ['La escala corta aprieta aperturas amplias', 'Las cerámicas suenan brillantes y finas en limpio', 'Clavijas selladas básicas sin bloqueo', 'Sin opción de trémolo en este modelo']),
    VD('Fender Player II Jazzmaster',
      ['Player Alnico V JM pickups with surf-to-shoegaze range', 'Floating tremolo with Mustang saddles stays musical', 'Modern C neck with 9.5-inch rosewood board', 'Offset looks that stand out on any stage'],
      ['Jazzmaster quirks need setup knowledge', 'Bridge buzzes without proper setup', 'Heavier than a Mustang for long sets', 'No rhythm circuit — purists notice'],
      ['Pastillas Player Alnico V JM del surf al shoegaze', 'Trémolo flotante con selletas Mustang musical', 'Mástil Modern C con palisandro de 9,5', 'Estética offset que destaca en escenario'],
      ['Los caprichos Jazzmaster piden saber ajustar', 'El puente zumba sin buen ajuste', 'Más pesada que una Mustang en sets largos', 'Sin circuito rítmico — los puristas lo notan']),
    VD('Fender Player II Stratocaster HSS',
      ['Humbucker bridge adds rock weight to Strat versatility', 'Alnico 2 neck plus Alnico 5 bridge balance well', 'Modern C neck suits most hand sizes', 'Best sub-$1000 HSS value in the Fender line'],
      ['No coil split stock for single-coil cleans', 'Single-coils hum under stage lights', 'Tremolo setup takes patience for beginners', 'Poly finish scratches show on dark colors'],
      ['La humbucker añade peso rock a la versatilidad Strat', 'Alnico 2 en mástil más Alnico 5 en puente equilibran bien', 'Mástil Modern C para casi todas las manos', 'Mejor HSS sub-$1000 de la línea Fender'],
      ['Sin split de serie para limpios single', 'Las singles zumban bajo focos', 'Ajustar el trémolo pide paciencia al empezar', 'Los arañazos se notan en colores oscuros']),
    VD('Fender Player II Telecaster',
      ['Alnico 5 Tele pickups with classic twang and snap', 'Simple slab body with workhorse reliability', 'Modern C neck plays fast in any genre', 'Holds tuning well for the price point'],
      ['Single-coils hum with gain and lights', '21 frets limit the very top register', 'Slab body digs ribs without contours', 'Ashtray bridge limits palm mute comfort'],
      ['Pastillas Alnico 5 Tele con twang clásico', 'Cuerpo slab simple y fiable de batalla', 'Mástil Modern C rápido en cualquier género', 'Aguanta afinación por su precio'],
      ['Las singles zumban con ganancia y focos', '21 trastes limitan el registro agudo', 'El slab se clava sin contornos', 'El puente cenicero incomoda el palm mute']),
    VD("Gibson Les Paul Standard '60s",
      ['Non-weight-relieved mahogany plus AA maple cap sustain', '60s Burstbuckers with Orange Drop hand-wired controls', 'SlimTaper neck with 12-inch radius for fast lead work', 'ABR-1 bridge with aluminum stop bar resonance'],
      ['Heaviest guitar here by a wide margin', 'No weight relief — back and shoulder feel it', 'Premium price over Fender counterparts', 'Nitro finish needs more care than poly'],
      ['Caoba maciza más tapa de arce AA que sostienen el sustain', 'Burstbuckers 60s con controles Orange Drop cableados a mano', 'Mástil SlimTaper con radio de 12 pulgadas para solos rápidos', 'Puente ABR-1 con cordal de aluminio resonante'],
      ['La guitarra más pesada aquí por diferencia', 'Sin aligerado — espalda y hombro lo notan', 'Precio premium sobre contrapartes Fender', 'El nitro necesita más cuidado que el poli']),
    VD('Fender American Ultra II Stratocaster',
      ['Ultra II Noiseless pickups with true single-coil voice, zero hum', 'Modern D quartersawn neck with 10-14-inch compound radius', 'S-1 switch plus locking tuners for studio versatility', 'Sculpted contours with neck-heel access up top'],
      ['Flagship price far above Player series', 'Noiseless voicing divides vintage purists', 'Compound radius setup confuses some techs', 'Anodized guard scratches show easily'],
      ['Pastillas Ultra II Noiseless con voz single real, cero ruido', 'Mástil Modern D de cuartos con radio compuesto 10-14', 'Switch S-1 más clavijas de bloqueo versátiles', 'Contornos esculpidos con acceso al talón'],
      ['Precio insignia muy por encima de Player', 'La voz noiseless divide a puristas vintage', 'El radio compuesto confunde a algunos técnicos', 'Los arañazos se notan en el golpeador']),
    VD('Fender American Professional II Telecaster',
      ['V-Mod II Tele pickups with articulate twang and snap', 'Top-load/string-through bullet bridge for feel options', 'Deep C neck with narrow-tall frets bends easy', 'Treble bleed keeps highs when rolling volume down'],
      ['Costs multiples of the Player II Tele', 'Single-coils still hum with gain', 'No belly contour on the slab body', 'Molded case adds travel weight'],
      ['Pastillas V-Mod II Tele con twang articulado', 'Puente top-load/string-through para opciones de tacto', 'Mástil Deep C con narrow-tall fáciles de bendear', 'Treble bleed mantiene agudos al bajar volumen'],
      ['Cuesta múltiplos de la Player II Tele', 'Las singles aún zumban con ganancia', 'Sin contour ventral en el slab', 'El estuche añade peso de viaje'])
  );
  g.verdict += ' Also covered: Player II HSS and Telecaster workhorses, Jazzmaster offset textures, Ultra II noiseless flagship, AmPro II Tele twang, LP 60s authority, plus Squier Debut, Affinity, Classic Vibe 50s and Sonic Mustang budgets and the carbon Enya Nova Go.';
  g.verdict_es += ' También cubiertas: Player II HSS y Telecaster de batalla, texturas offset Jazzmaster, insignia Ultra II sin ruido, twang AmPro II Tele, autoridad LP 60s, más presupuestos Squier Debut, Affinity, Classic Vibe 50s y Sonic Mustang y la Enya Nova Go de carbono.';
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['fender-guide', 'best-electric-guitar'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
