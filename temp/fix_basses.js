// Bajos: fender-bass +3, beginner-bass +7 (4 copiadas + 3 investigadas).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
{
  const g = G.find(x => x.id === 'fender-bass-guide');
  ['Squier Classic Vibe \'60s Jazz Bass', 'Squier Affinity Series Precision Bass PJ', 'Fender American Ultra II Precision Bass'].forEach(t => g.productTable.columns.push(W(t)));
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  const P = (en, es) => V(en, es);
  const put = (label, arr) => rows[label].values.push(...arr);
  put('Best For', [P('Vintage J tone for less', 'Sonido J vintage por menos'), P('Cheapest P/J flexibility', 'Flexibilidad P/J más barata'), P('Flagship active P bass', 'Insignia P activo')]);
  put('Body Wood', [P('Poplar', 'Álamo'), P('Poplar', 'Álamo'), P('Alder', 'Aliso')]);
  put('Neck', [P('Maple, C shape', 'Arce, forma C'), P('Maple, C shape', 'Arce, forma C'), P('Quartersawn maple, Modern D, 21', 'Arce cuartos, Modern D, 21')]);
  put('Frets & Fretboard', [P('20, laurel', '20, laurel'), P('20, maple', '20, arce'), P('21, ebony or maple', '21, ébano o arce')]);
  put('Pickups', [P('2x Fender alnico J', '2x Fender alnico J'), P('Ceramic P + J', 'Cerámica P + J'), P('Ultra II Noiseless P + J', 'Ultra II Noiseless P + J')]);
  put('Active/Passive', [P('Passive', 'Pasivo'), P('Passive', 'Pasivo'), P('Active (S-1)', 'Activo (S-1)')]);
  put('Scale Length', [P('34 in (864 mm)', '34" (864 mm)'), P('34 in (864 mm)', '34" (864 mm)'), P('34 in (864 mm)', '34" (864 mm)')]);
  put('Electronics', [P('2x volume, tone', '2x volumen, tono'), P('2x volume, tone', '2x volumen, tono'), P('Vol, tone, 3-band active EQ', 'Vol, tono, EQ activa 3 bandas')]);
  put('Tuners', [P('Vintage-style', 'Vintage'), P('Vintage-style', 'Vintage'), P('Deluxe fluted', 'Deluxe estriadas')]);
  put('Weight', [P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)')]);
  const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
  g.verdictProsCons.push(
    VD("Squier Classic Vibe '60s Jazz Bass",
      ['Poplar body with Fender-designed alnico J pickups', 'Slim C neck with 9.5-inch laurel board and narrow-tall frets', 'Vintage tint, nickel hardware and tort guard looks', 'Best vintage-spec J under Classic Vibe money'],
      ['Poplar varies in weight unit to unit', 'Vintage-style tuners without locking stability', 'Gloss neck gets sticky on sweaty stages', 'No gig bag included'],
      ['Cuerpo de álamo con pastillas J alnico diseñadas por Fender', 'Mástil C fino con diapasón de laurel 9,5 y trastes narrow-tall', 'Estética vintage con mástil tintado y golpeador carey', 'Mejor J de specs vintage por dinero Classic Vibe'],
      ['El álamo varía de peso por unidad', 'Clavijas vintage sin estabilidad de bloqueo', 'El brillo del mástil se pega en escenario', 'Sin funda incluida']),
    VD('Squier Affinity Series Precision Bass PJ',
      ['P split plus J bridge covers Precision and Jazz tones', 'Thin lightweight poplar body with slim C neck', 'Open-gear tuners with smooth vintage feel', 'Cheapest route into a real Fender-family bass'],
      ['Ceramic pickups lack alnico complexity', 'Basic electronics beg for upgrades', 'Thin finish wears faster with gigging', 'Fretwork varies unit to unit'],
      ['Split P más J cubren tonos Precision y Jazz', 'Cuerpo fino y ligero de álamo con mástil C fino', 'Clavijas abiertas con tacto vintage suave', 'La ruta más barata a un bajo familia Fender'],
      ['Las cerámicas carecen de complejidad alnico', 'La electrónica básica pide mejora', 'El acabado fino se gasta antes con bolos', 'Los trastes varían de unidad a unidad']),
    VD('Fender American Ultra II Precision Bass',
      ['Ultra II Noiseless P plus J with zero hum', 'Active preamp with S-1 switching and 3-band EQ', 'Modern D quartersawn neck with 10-14-inch compound radius', 'HiMass bridge with sculpted-heel access'],
      ['Flagship price far above Player series', 'Active preamp needs battery management', 'Modern voice divides vintage purists', 'Anodized guard scratches show easily'],
      ['Ultra II Noiseless P más J sin ruido', 'Previo activo conmutación S-1 y EQ 3 bandas', 'Mástil Modern D de cuartos con radio compuesto 10-14', 'Puente HiMass con acceso al talón'],
      ['Precio insignia muy por encima de Player', 'El previo activo pide gestionar batería', 'La voz moderna divide a puristas vintage', 'Los arañazos se notan en el golpeador'])
  );
}
{
  const g = G.find(x => x.id === 'beginner-bass-guitars');
  const src = G.find(x => x.id === 'fender-bass-guide');
  const copyCol = (title) => {
    const i = src.productTable.columns.findIndex(c => c.title === title);
    const col = { title, title_es: title };
    g.productTable.columns.push(col);
    src.productTable.rows.forEach((r, ri) => {
      g.productTable.rows[ri].values.push(JSON.parse(JSON.stringify(r.values[i])));
    });
    const v = src.verdictProsCons.find(v => v.name === title);
    if (v) g.verdictProsCons.push(JSON.parse(JSON.stringify(v)));
  };
  ['Fender Player II Precision Bass', 'Fender Player II Jazz Bass', 'Fender American Professional II Precision Bass', 'Fender American Professional II Jazz Bass'].forEach(copyCol);
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  const P = (en, es) => V(en, es);
  g.productTable.columns.push(W('Fender American Ultra II Precision Bass'), W('Sire Marcus Miller V5 4-String Bass'), W('ESP LTD B-204SM Bass Guitar'));
  const put = (label, arr) => rows[label].values.push(...arr);
  put('Best For', [P('Flagship active P bass', 'Insignia P activo'), P('Vintage J tone, modern price', 'Sonido J vintage, precio moderno'), P('Modern active 24-fret rock', 'Rock moderno activo de 24 trastes')]);
  put('Body Wood', [P('Alder', 'Aliso'), P('Alder', 'Aliso'), P('Ash + spalted maple', 'Fresno + arce spalted')]);
  put('Neck', [P('Quartersawn maple, Modern D, 21', 'Arce cuartos, Modern D, 21'), P('Roasted maple, C shape', 'Arce tostado, forma C'), P('Maple/jatoba, thin U', 'Arce/jatoba, U fina')]);
  put('Frets & Fretboard', [P('21, ebony or maple', '21, ébano o arce'), P('20, roasted maple', '20, arce tostado'), P('24, jatoba', '24, jatoba')]);
  put('Pickups', [P('Ultra II Noiseless P + J', 'Ultra II Noiseless P + J'), P('Marcus Vintage-J set', 'Set Marcus Vintage-J'), P('ESP SB-4 + ABQ-3 EQ', 'ESP SB-4 + EQ ABQ-3')]);
  put('Active/Passive', [P('Active (S-1)', 'Activo (S-1)'), P('Passive', 'Pasivo'), P('Active', 'Activo')]);
  put('Scale Length', [P('34 in (864 mm)', '34" (864 mm)'), P('34 in (864 mm)', '34" (864 mm)'), P('34 in (864 mm)', '34" (864 mm)')]);
  put('Electronics', [P('Vol, tone, 3-band active EQ', 'Vol, tono, EQ activa 3 bandas'), P('2x vol, master tone', '2x vol, tono master'), P('Vol, balance, 3-band EQ', 'Vol, balance, EQ 3 bandas')]);
  put('Tuners', [P('Deluxe fluted', 'Deluxe estriadas'), P('Premium open-gear', 'Premium abiertas'), P('Sealed die-cast', 'Selladas fundidas')]);
  put('Weight', [P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)'), P('Not published (varies by unit)', 'No publicado (varía por unidad)')]);
  const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
  g.verdictProsCons.push(
    VD('Fender American Ultra II Precision Bass',
      ['Ultra II Noiseless P plus J with zero hum', 'Active preamp with S-1 switching and 3-band EQ', 'Modern D quartersawn neck with compound radius', 'HiMass bridge with sculpted-heel access'],
      ['Flagship price far above beginner budgets', 'Active preamp needs battery management', 'Modern voice divides vintage purists', 'Overkill weight and features for learning'],
      ['Ultra II Noiseless P más J sin ruido', 'Previo activo conmutación S-1 y EQ 3 bandas', 'Mástil Modern D de cuartos con radio compuesto', 'Puente HiMass con acceso al talón'],
      ['Precio insignia muy por encima de principiante', 'El previo activo pide gestionar batería', 'La voz moderna divide a puristas vintage', 'Peso y funciones excesivos para aprender']),
    VD('Sire Marcus Miller V5 4-String Bass',
      ['North American alder with Marcus Vintage-J pickups', 'Roasted maple neck with rolled edges, stable and fast', 'True passive V/V/T wiring with organic dynamics', 'Premium open-gear tuners and bone nut'],
      ['Passive only — no active EQ onboard', 'Vintage tint and blocks divide modern tastes', 'Heavier than headless or short-scale rivals', 'Finish options cost extra on some colors'],
      ['Aliso norteamericano con pastillas Marcus Vintage-J', 'Mástil de arce tostado con bordes matados, rápido', 'Cableado pasivo V/V/T real con dinámica orgánica', 'Clavijas premium abiertas y cejuela de hueso'],
      ['Solo pasivo — sin EQ activa a bordo', 'El tinte vintage y bloques dividen gustos', 'Más pesado que rivales headless o cortos', 'Algunas opciones de color cuestan extra']),
    VD('ESP LTD B-204SM Bass Guitar',
      ['Ash plus spalted maple top that looks custom-shop', 'Thin U 5-piece neck with 24 XJ frets for shredders', 'SB-4 pickups with ABQ-3 3-band active EQ', 'String-through BB-604 bridge adds sustain'],
      ['Spalted top varies wildly piece to piece', 'Active EQ needs battery discipline', 'Metal-oriented voice less versátil for vintage gigs', 'Black nickel hardware shows wear'],
      ['Fresno más tapa spalted que parece custom', 'Mástil U fino de 5 piezas con 24 trastes XJ', 'Pastillas SB-4 con EQ activa ABQ-3 de 3 bandas', 'Puente BB-604 string-through que suma sustain'],
      ['La tapa spalted varía mucho pieza a pieza', 'La EQ activa pide disciplina de batería', 'Voz metalera menos versátil para bolos vintage', 'El hardware negro muestra desgaste'])
  );
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['fender-bass-guide', 'beginner-bass-guitars'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
