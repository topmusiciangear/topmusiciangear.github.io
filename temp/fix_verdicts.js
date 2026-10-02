// Missing verdicts: LCD-X (open), K371 (tracking), DT770 (mixing),
// 6 beginner electrics, rebuild 4 IEM verdicts aligned to columns.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

G.find(x => x.id === 'open-headphones').verdictProsCons.push(
  VD('Audeze LCD-X',
    ['Planar magnetic drivers with huge, precise soundstage', '20-ohm impedance runs on any interface', 'Reference tuning trusted by top mixers', 'Removable mini-XLR cables'],
    ['612 g — neck workout for long sessions', 'Clamp force needs break-in', 'Open-back leaks everything (no tracking)', 'Premium price'],
    ['Drivers planar magnéticos con escena enorme y precisa', 'Impedancia 20 ohmios funciona con cualquier interfaz', 'Afinación referencia de mezcladores top', 'Cables mini-XLR removibles'],
    ['612 g — gimnasio de cuello en sesiones largas', 'La presión necesita rodaje', 'Abierto fuga todo (no sirve para grabar)', 'Precio premium'])
);

G.find(x => x.id === 'tracking-headphones').verdictProsCons.push(
  VD('AKG K371',
    ['Tuned to the Harman target — mixes translate', 'Closed-back isolation for live tracking', 'Foldable with detachable cables (3 included)', 'Lightweight for long sessions'],
    ['Hinge durability varies unit to unit', 'Earpads wear faster than Beyerdynamic velour', 'Single-sided cable only'],
    ['Afinados al objetivo Harman — las mezclas trasladan', 'Aislamiento cerrado para grabar en vivo', 'Plegables con cables desmontables (3 incluidos)', 'Ligeros para sesiones largas'],
    ['Durabilidad bisagras varía por unidad', 'Almohadillas se gastan antes que terciopelo Beyerdynamic', 'Solo cable unilateral'])
);

G.find(x => x.id === 'best-headphones-for-mixing').verdictProsCons.push(
  VD('Beyerdynamic DT 770 Pro',
    ['Closed-back isolation with honest midrange', 'Velour pads comfortable for hours', '80-ohm runs on interfaces, 250-ohm scales with amps', 'Tracking and mixing in one pair'],
    ['Coiled cable is heavy and tugs', 'Bass emphasis needs mental compensation', 'No detachable cable'],
    ['Aislamiento cerrado con medios honestos', 'Almohadillas terciopelo cómodas por horas', '80 ohmios en interfaces, 250 escala con amplis', 'Grabación y mezcla en un par'],
    ['Cable espiral pesado que tira', 'Énfasis graves pide compensación mental', 'Sin cable desmontable'])
);

const bg = G.find(x => x.id === 'best-beginner-electric-guitar');
bg.verdictProsCons.push(
  VD('Epiphone Les Paul Special-II E1',
    ['Real mahogany body with humbuckers at entry price', '700T/650R pickups handle rock gain well', 'Comfortable worn finish neck', 'Gibson-style 24.75-inch scale, easier bends'],
    ['Bolt-on neck (not set like Gibson)', 'Tuners beg for upgrade', 'Fret edges can be sharp unit to unit'],
    ['Cuerpo caoba real con humbuckers a precio entrada', 'Pastillas 700T/650R aguantan ganancia rock', 'Mástil acabado worn cómodo', 'Escala 24,75 estilo Gibson, bends fáciles'],
    ['Mástil atornillado (no encolado como Gibson)', 'Clavijas piden mejora', 'Bordes trastes filosos según unidad']),
  VD('Jet Guitars JS-300',
    ['Roasted maple neck with 22 medium-jumbo frets', 'Alnico pickups outperform the price class', 'Bone nut and locking tuners stock', 'Fretwork rivals guitars twice the price'],
    ['Newer brand, resale value unproven', 'Body shapes divide traditionalists', 'Limited finish options'],
    ['Mástil arce tostado con 22 trastes medium-jumbo', 'Pastillas alnico superan su rango precio', 'Cejuela hueso y clavijas bloqueo de serie', 'Trastes rivalizan guitarras doble precio'],
    ['Marca nueva, reventa sin probar', 'Formas cuerpo dividen tradicionalistas', 'Opciones acabado limitadas']),
  VD('Squier Sonic Mustang',
    ['24-inch short scale = easiest fretting for small hands', 'Single coils with genuine Fender sparkle', 'Lightweight offset body', 'Cheapest real Fender-family guitar'],
    ['Short scale feels cramped for large hands', 'Thin tone needs amp help for rock', 'Basic hardware, plan tuner upgrade'],
    ['Escala corta 24" = trastes fáciles manos pequeñas', 'Single coils con brillo Fender genuino', 'Cuerpo offset ligero', 'Guitarra familia Fender real más barata'],
    ['Escala corta estrecha para manos grandes', 'Tono fino necesita ayuda del ampli para rock', 'Hardware básico, planea mejora clavijas']),
  VD('Enya Nova Go Sonic',
    ['Carbon fiber body immune to humidity/temperature', 'Built-in speaker + effects (no amp needed)', 'Zero-fret design for low action', 'Gig bag friendly, travel-proof'],
    ['Carbon tone divides wood purists', 'Electronics add weight and complexity', 'Neck profile suits modern players only'],
    ['Cuerpo fibra carbono inmune a humedad/temperatura', 'Altavoz + efectos integrados (sin ampli)', 'Diseño zero-fret para acción baja', 'Resistente a viajes con funda'],
    ['Tono carbono divide puristas madera', 'Electrónica añade peso y complejidad', 'Perfil mástil solo para modernos']),
  VD('Yamaha Revstar Element RSE20',
    ['Chambered mahogany body, resonant and light', 'Dry Switch high-pass tightens humbuckers', 'Yamaha build quality and fretwork', 'Distinct looks outside Strat/LP clones'],
    ['Pickups good, not boutique', 'Dry Switch learning curve', 'Heavier than Pacifica'],
    ['Cuerpo caoba chambered, resonante y ligero', 'Dry Switch pasa-altos ajusta humbuckers', 'Calidad construcción y trastes Yamaha', 'Estética propia fuera de clones Strat/LP'],
    ['Pastillas buenas, no boutique', 'Curva aprendizaje Dry Switch', 'Más pesada que Pacifica']),
  VD('Squier Debut Series Stratocaster',
    ['Lowest-priced real Stratocaster ever', 'Full 25.5-inch scale teaches proper technique', 'Lightweight poplar body', 'Free Fender Play lessons included'],
    ['Hardware is bare minimum', 'Pickups thin, plan amp EQ help', 'Setup out of box often needed'],
    ['Stratocaster real más barata historia', 'Escala completa 25,5 enseña técnica correcta', 'Cuerpo álamo ligero', 'Lecciones Fender Play gratis incluidas'],
    ['Hardware mínimo imprescindible', 'Pastillas finas, planea ayuda EQ ampli', 'Setup inicial suele necesario'])
);

G.find(x => x.id === 'best-in-ear-monitors').verdictProsCons = [
  VD('Shure SE846 Gen 2',
    ['Four balanced armatures with true subwoofer low-end', 'Replaceable nozzle inserts tune the signature', 'Detachable MMCX cable, huge aftermarket', 'Reference IEM for a decade'],
    ['Fit is deep and fiddly for small ears', 'Premium price', 'Cable microphonics without shirt clip'],
    ['Cuatro armaduras balanceadas con sub-graves reales', 'Filtros boquilla intercambiables afinan firma', 'Cable MMCX desmontable, gran aftermarket', 'IEM referencia por una década'],
    ['Ajuste profundo complicado orejas pequeñas', 'Precio premium', 'Microfonía cable sin clip camisa']),
  VD('Sennheiser EW IEM G4',
    ['Pro UHF wireless trusted on world tours', 'Stereo focus mode for crowded RF', 'Metal bodypack survives gig bags', 'Up to 325 ft range line-of-sight'],
    ['System price before earpieces', 'Frequency coordination needed in cities', 'AA batteries (rechargeables recommended)'],
    ['Inalámbrico UHF pro de giras mundiales', 'Modo focus estéreo para RF saturado', 'Petaca metal aguanta fundas bolo', 'Hasta 100 m alcance visual'],
    ['Precio sistema antes de auriculares', 'Coordinación frecuencias necesaria en ciudad', 'Pilas AA (recargables recomendadas)']),
  VD('Xvive U4 Wireless',
    ['2.4 GHz digital — no license, no coordination', 'Tiny receiver clips to shirt/strap', '107 dB dynamic range, under 5 ms latency', 'Cheapest honest wireless IEM'],
    ['2.4 GHz shares band with Wi-Fi (dropouts possible)', 'Mono only (no stereo image)', 'Plastic build, handle with care'],
    ['Digital 2,4 GHz — sin licencia ni coordinación', 'Receptor mini al clip de camisa/correa', '107 dB rango dinámico, menos de 5 ms latencia', 'IEM inalámbrico honesto más barato'],
    ['2,4 GHz comparte banda con Wi-Fi (cortes posibles)', 'Solo mono (sin imagen estéreo)', 'Construcción plástico, tratar con cuidado']),
  VD('Sennheiser XSW IEM',
    ['Sennheiser wireless at entry price', 'Stereo transmission (unlike 2.4 GHz monos)', 'Simple one-touch setup', 'Up to 10-hour bodypack runtime'],
    ['Fixed frequency banks (less RF flexibility)', 'Stock earphones are basic — budget upgrade', 'Plastic bodypack'],
    ['Inalámbrico Sennheiser a precio entrada', 'Transmisión estéreo (vs monos 2,4 GHz)', 'Setup simple un toque', 'Hasta 10 horas petaca'],
    ['Bancos frecuencia fijos (menos flexibilidad RF)', 'Auriculares stock básicos — planea mejora', 'Petaca plástico'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
['open-headphones', 'tracking-headphones', 'best-headphones-for-mixing', 'best-beginner-electric-guitar', 'best-in-ear-monitors'].forEach(id => {
  const g = G.find(x => x.id === id);
  console.log(id + ': cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length);
});
