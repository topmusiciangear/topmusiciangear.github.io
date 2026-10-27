const fs=require('fs');
let guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
let guide=guides.find(g=>g.id==='budget-mics');
if(!guide){console.error('not found');process.exit(1);}

// Remove ND86 product from section 5
let sec5=guide.sections.find(s=>s.heading && s.heading.includes('SM58') && s.products && s.products.includes(232));
if(sec5){
  sec5.products=sec5.products.filter(p=>p!==232);
}

// Replace ND86 section
let idx=guide.sections.findIndex(s=>s.heading && s.heading.includes('EV ND86'));
if(idx>=0){
  guide.sections[idx]={
    heading:'Warm and Detailed: sE Electronics X1 S for Home Vocals',
    heading_es:'Cálido y detallado: sE Electronics X1 S para voces en casa',
    content:'<strong>The X1 S sits in the sweet spot for bedroom singers and acoustic players who want a large-diaphragm sound without a large-diaphragm price.</strong> Its hand-crafted 1-inch capsule delivers a smooth, slightly warm top end that flatters voices and strummed guitars, while the -10/-20 dB pads and 80/160 Hz filters keep it usable in a small untreated room. Self-noise is low enough that you hear the performance, not the mic, and the max SPL of 160 dB means it handles loud amps and drums without breaking up. Build quality feels solid, with an all-metal body that survives a desk move. For home studio vocals, acoustic guitar and the occasional podcast, it gives you that condenser clarity at a budget price.',
    content_es:'<strong>El X1 S encaja justo donde lo necesitan quienes graban en el dormitorio y buscan el sonido de diafragma grande sin pagar precio de diafragma grande.</strong> Su cápsula de 1 pulgada hecha a mano entrega un agudo suave, ligeramente cálido, que favorece voces y guitarras rasgueadas. Los pads -10/-20 dB y los filtros 80/160 Hz lo hacen útil en una habitación pequeña sin tratar. El ruido propio es lo bastante bajo para oír la interpretación y no el micrófono, y el SPL máximo de 160 dB aguanta amplis y baterías sin distorsionar. La construcción metálica se siente sólida y aguanta traslados de escritorio. Para voces de estudio en casa, guitarra acústica y algún podcast, ofrece claridad de condensador a precio de presupuesto.',
    products:[1055],
    verdict:'',
    verdict_es:'',
    pros:[],
    pros_es:[],
    cons:[],
    cons_es:[],
    specs:{}
  };
}

// Update product table column
const colIdx=15;
if(guide.productTable && guide.productTable.columns[colIdx]){
  guide.productTable.columns[colIdx].title='sE Electronics X1 S';
  guide.productTable.columns[colIdx].title_es='sE Electronics X1 S';
  // Update rows
  const updates={
    'Best For':{value:'Vocals & acoustic instruments', value_es:'Voces e instrumentos acústicos'},
    'Type':{value:'Condenser', value_es:'Condensador'},
    'Connection':{value:'XLR', value_es:'XLR'},
    'Polar Pattern':{value:'Cardioid', value_es:'Cardioide'},
    'Frequency Response':{value:'20 Hz – 20 kHz', value_es:'20 Hz – 20 kHz'},
    'Max SPL':{value:'160 dB with pad', value_es:'160 dB con pad'},
    'Phantom Power':{value:'Required', value_es:'Requerida'}
  };
  guide.productTable.rows.forEach(row=>{
    const upd=updates[row.label];
    if(upd && row.values[colIdx]){
      row.values[colIdx]=upd;
    }
  });
}

// Write back
fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
console.log('updated');