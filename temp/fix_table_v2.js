const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'beginner-bass-guitars');

q.productTable = {
  columns: [
    { title: 'Ibanez GSR200 GIO', title_es: 'Ibanez GSR200 GIO' },
    { title: 'Squier Affinity Series Precision Bass PJ', title_es: 'Squier Affinity Series Precision Bass PJ' },
    { title: 'Yamaha TRBX304', title_es: 'Yamaha TRBX304' },
    { title: 'Ibanez SR300E', title_es: 'Ibanez SR300E' },
    { title: 'Sterling by Music Man StingRay Ray4', title_es: 'Sterling by Music Man StingRay Ray4' },
    { title: "Squier Classic Vibe '60s Jazz Bass", title_es: "Squier Classic Vibe '60s Jazz Bass" },
    { title: 'Sire Marcus Miller V5R', title_es: 'Sire Marcus Miller V5R' },
    { title: 'Squier Sonic Bronco Bass', title_es: 'Squier Sonic Bronco Bass' },
    { title: 'Yamaha BB234', title_es: 'Yamaha BB234' },
    { title: 'Ibanez TMB30 Talman', title_es: 'Ibanez TMB30 Talman' }
  ],
  rows: [
    {
      label: 'Ideal para',
      label_es: 'Ideal para',
      values: [
        { value: 'First P/J grooves', value_es: 'Primeros grooves P/J' },
        { value: 'Classic Precision/Jazz tones', value_es: 'Tonos clásicos Precision/Jazz' },
        { value: 'Versatile active bass', value_es: 'Bajo activo versátil' },
        { value: 'Lightweight speed grooves', value_es: 'Groove ligero' },
        { value: 'Funk with punch', value_es: 'Funk con pegada' },
        { value: 'Vintage Jazz vibe', value_es: 'Vibe Jazz vintage' },
        { value: 'Roasted neck premium feel', value_es: 'Mástil tostado sensación premium' },
        { value: 'Short-scale starter', value_es: 'Escala corta para empezar' },
        { value: 'All-round PJ workhorse', value_es: 'PJ todoterreno' },
        { value: 'Compact short-scale PJ', value_es: 'PJ escala corta compacto' }
      ]
    },
    {
      label: 'Body Wood',
      label_es: 'Madera del cuerpo',
      values: [
        { value: 'Poplar / Okoume', value_es: 'Álamo / Okume' },
        { value: 'Poplar', value_es: 'Álamo' },
        { value: 'Alder', value_es: 'Aliso' },
        { value: 'Nyatoh', value_es: 'Nyatoh' },
        { value: 'Basswood (Tilo)', value_es: 'Tilo (Basswood)' },
        { value: 'Poplar', value_es: 'Álamo (Poplar)' },
        { value: 'Mahogany', value_es: 'Caoba' },
        { value: 'Poplar', value_es: 'Álamo' },
        { value: 'Alder', value_es: 'Aliso' },
        { value: 'Poplar', value_es: 'Álamo' }
      ]
    },
    {
      label: 'Neck',
      label_es: 'Mástil',
      values: [
        { value: 'Maple, GSR4 profile', value_es: 'Arce, perfil GSR4' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' },
        { value: 'Maple, 5-piece', value_es: 'Arce, 5 piezas' },
        { value: 'Maple/Walnut, SR4 5-piece', value_es: 'Arce/Nogal, SR4 5 piezas' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' },
        { value: 'Maple, C shape, roasted', value_es: 'Arce, forma C, tostado' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' },
        { value: 'Maple, C shape', value_es: 'Arce, forma C' }
      ]
    },
    {
      label: 'Frets & Fretboard',
      label_es: 'Trastes y diapasón',
      values: [
        { value: '22 frets, Jatoba', value_es: '22 trastes, Jatoba' },
        { value: '20 frets, Indian Laurel', value_es: '20 trastes, Laurel indio' },
        { value: '24 frets, Rosewood', value_es: '24 trastes, Palo rosa' },
        { value: '24 frets, Jatoba', value_es: '24 trastes, Jatoba' },
        { value: '22 frets, Jatoba', value_es: '22 trastes, Jatoba' },
        { value: '20 frets, Indian Laurel', value_es: '20 trastes, Laurel indio' },
        { value: '22 frets, Rosewood', value_es: '22 trastes, Palo rosa' },
        { value: '19 frets, Maple', value_es: '19 trastes, Arce' },
        { value: '22 frets, Rosewood', value_es: '22 trastes, Palo rosa' },
        { value: '20 frets, Jatoba', value_es: '20 trastes, Jatoba' }
      ]
    },
    {
      label: 'Pickups',
      label_es: 'Pastillas',
      values: [
        { value: 'Split P + J bridge (Dynamix)', value_es: 'Split P + J puente (Dynamix)' },
        { value: 'Split P + J bridge', value_es: 'Split P + J puente' },
        { value: '2x YGD Humbuckers', value_es: '2x Humbuckers YGD' },
        { value: '2x PowerSpan Humbuckers', value_es: '2x Humbuckers PowerSpan' },
        { value: '1x Ceramic Humbucker', value_es: '1x Humbucker cerámico' },
        { value: '2x Single-Coil Jazz', value_es: '2x Single-Coil Jazz' },
        { value: '2x Marcus Revolution Single-Coil', value_es: '2x Single-Coil Marcus Revolution' },
        { value: '1x Short-scale Ceramic Single-Coil', value_es: '1x Single-Coil cerámica escala corta' },
        { value: 'Split P + J bridge', value_es: 'Split P + J puente' },
        { value: 'Split P + J bridge (Dynamix)', value_es: 'Split P + J puente (Dynamix)' }
      ]
    },
    {
      label: 'Active/Passive',
      label_es: 'Activo/Pasivo',
      values: [
        { value: 'Active (Phat II EQ)', value_es: 'Activo (Phat II EQ)' },
        { value: 'Passive', value_es: 'Pasivo' },
        { value: 'Active (2-band EQ + Performance EQ)', value_es: 'Activo (EQ 2 bandas + Performance EQ)' },
        { value: 'Active (3-band EQ)', value_es: 'Activo (EQ 3 bandas)' },
        { value: 'Active (2-band preamp)', value_es: 'Activo (preamp 2 bandas)' },
        { value: 'Passive', value_es: 'Pasivo' },
        { value: 'Passive', value_es: 'Pasivo' },
        { value: 'Passive', value_es: 'Pasivo' },
        { value: 'Passive', value_es: 'Pasivo' },
        { value: 'Passive', value_es: 'Pasivo' }
      ]
    },
    {
      label: 'Scale Length',
      label_es: 'Longitud de escala',
      values: [
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '30" (762 mm)', value_es: '30" (762 mm)' },
        { value: '34" (864 mm)', value_es: '34" (864 mm)' },
        { value: '30" (762 mm)', value_es: '30" (762 mm)' }
      ]
    },
    {
      label: 'Electronics',
      label_es: 'Electrónica',
      values: [
        { value: 'Phat II EQ (bass boost), master volume, balance, tone', value_es: 'Phat II EQ (boost graves), vol. maestro, balance, tono' },
        { value: 'Master volume, master tone', value_es: 'Vol. maestro, tono maestro' },
        { value: '2-band EQ (bass/treble) + 5-way Performance EQ switch', value_es: 'EQ 2 bandas (graves/agudos) + switch Performance EQ 5 pos.' },
        { value: '3-band EQ (bass/mid/treble), volume, balance', value_es: 'EQ 3 bandas (graves/medios/agudos), volumen, balance' },
        { value: '2-band preamp (bass/treble), volume', value_es: 'Preamp 2 bandas (graves/agudos), volumen' },
        { value: 'Master volume x2, master tone', value_es: 'Vol. maestro x2, tono maestro' },
        { value: 'Master volume, blend, tone', value_es: 'Vol. maestro, blend, tono' },
        { value: 'Master volume, tone', value_es: 'Vol. maestro, tono' },
        { value: 'Master volume, master tone', value_es: 'Vol. maestro, tono maestro' },
        { value: 'Master volume, tone, Phat II EQ (bass boost)', value_es: 'Vol. maestro, tono, Phat II EQ (boost graves)' }
      ]
    },
    {
      label: 'Tuners',
      label_es: 'Clavijas',
      values: [
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Vintage-style open gear', value_es: 'Estilo vintage abiertas' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' },
        { value: 'Die-cast', value_es: 'Fundición a presión' }
      ]
    },
    {
      label: 'Weight',
      label_es: 'Peso',
      values: [
        { value: '~3.6 kg (7.9 lbs)', value_es: '~3.6 kg (7.9 lbs)' },
        { value: '~3.8 kg (8.4 lbs)', value_es: '~3.8 kg (8.4 lbs)' },
        { value: '~4.1 kg (9.0 lbs)', value_es: '~4.1 kg (9.0 lbs)' },
        { value: '~3.7 kg (8.2 lbs)', value_es: '~3.7 kg (8.2 lbs)' },
        { value: '~3.9 kg (8.6 lbs)', value_es: '~3.9 kg (8.6 lbs)' },
        { value: '~3.9 kg (8.6 lbs)', value_es: '~3.9 kg (8.6 lbs)' },
        { value: '~4.0 kg (8.8 lbs)', value_es: '~4.0 kg (8.8 lbs)' },
        { value: '~2.9 kg (6.4 lbs)', value_es: '~2.9 kg (6.4 lbs)' },
        { value: '~4.2 kg (9.3 lbs)', value_es: '~4.2 kg (9.3 lbs)' },
        { value: '~3.2 kg (7.1 lbs)', value_es: '~3.2 kg (7.1 lbs)' }
      ]
    }
  ]
};

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('productTable fixed with correct value/value_es fields');