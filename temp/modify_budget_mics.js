const fs = require('fs');
const guidesPath = 'data/guides.json';
const productsPath = 'data/products.json';

const guidesData = JSON.parse(fs.readFileSync(guidesPath,'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsPath,'utf8'));

const removeIds = new Set([278,276,433,277,432,197,431,330]);
const removeNames = new Set();
productsData.forEach(p=>{
  if(removeIds.has(p.id)){
    removeNames.add(p.title);
    removeNames.add(p.title_es);
  }
});

const idToName = new Map();
productsData.forEach(p=> idToName.set(p.id, p.title));

const guide = guidesData.find(g=>g.id==='budget-mics');
if(!guide){ console.error('guide not found'); process.exit(1);}

function filterRemoved(idArray){
  if(!Array.isArray(idArray)) return idArray;
  return idArray.filter(id=>!removeIds.has(id));
}

// 1. Sections
const newSections = [];
for(const sec of guide.sections){
  const prods = sec.products || [];
  const filtered = filterRemoved(prods);
  if(filtered.length===0 && prods.length>0){
    continue;
  }
  const newSec = {...sec, products: filtered};
  if(filtered.length===0) continue;
  newSections.push(newSec);
}
guide.sections = newSections;

// 2. productTable columns
if(guide.productTable){
  const table = guide.productTable;
  const titleToId = new Map();
  productsData.forEach(p=>{
    titleToId.set(p.title, p.id);
    titleToId.set(p.title_es, p.id);
  });
  const cols = table.columns || [];
  const removedColIds = new Set();
  const newCols = [];
  cols.forEach(col=>{
    const id = titleToId.get(col.title);
    if(id && removeIds.has(id)){
      removedColIds.add(id);
    } else {
      newCols.push(col);
    }
  });
  table.columns = newCols;
  // filter rows values
  if(table.rows){
    const keptIndices = [];
    cols.forEach((col,i)=>{
      const id = titleToId.get(col.title);
      if(!(id && removeIds.has(id))){
        keptIndices.push(i);
      }
    });
    table.rows = table.rows.map(row=>{
      const vals = row.values || [];
      const newVals = keptIndices.map(i=> vals[i]).filter(v=>v!==undefined);
      return {...row, values: newVals};
    });
  }
}

// 3. verdictProsCons
if(guide.verdictProsCons){
  guide.verdictProsCons = guide.verdictProsCons.filter(vpc=>{
    const name = (vpc.name||'').toLowerCase();
    const name_es = (vpc.name_es||'').toLowerCase();
    for(const rn of removeNames){
      if(name.includes(rn.toLowerCase()) || name_es.includes(rn.toLowerCase())){
        return false;
      }
    }
    const prod = productsData.find(p=> p.title.toLowerCase()===name || p.title_es.toLowerCase()===name_es);
    if(prod && removeIds.has(prod.id)){
      return false;
    }
    return true;
  });
}

// 4. featuredProducts
if(Array.isArray(guide.featuredProducts)){
  guide.featuredProducts = guide.featuredProducts.filter(id=>!removeIds.has(id));
}

// 5. strip text refs
function stripProductNames(text){
  if(typeof text!=='string') return text;
  let t = text;
  const names = [
    'FIFINE AmpliTank K688',
    'Samson Q2U',
    'Samson Q9U',
    'Maono PD200X',
    'Elgato Wave DX',
    'Rode PodMic',
    'sE Electronics V7',
    'Behringer XM8500',
    'XM8500'
  ];
  for(const name of names){
    const re = new RegExp(name.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&'), 'gi');
    t = t.replace(re,'');
  }
  t = t.replace(/\s{2,}/g,' ').trim();
  return t;
}
['intro','intro_es','conclusion','conclusion_es','description','description_es'].forEach(f=>{
  if(guide[f]) guide[f]=stripProductNames(guide[f]);
});
if(guide.featuredSnippet){
  if(guide.featuredSnippet.text_en) guide.featuredSnippet.text_en = stripProductNames(guide.featuredSnippet.text_en);
  if(guide.featuredSnippet.text_es) guide.featuredSnippet.text_es = stripProductNames(guide.featuredSnippet.text_es);
}

// Create sE7 product
const maxId = Math.max(...productsData.map(p=>p.id));
const newSe7Id = maxId + 1;
const se7Product = {
  id: newSe7Id,
  title: "sE Electronics sE7",
  title_es: "sE Electronics sE7",
  brand: "sE Electronics",
  category: "microphones",
  price: 95,
  rating: 4.5,
  reviews: 0,
  desc: "Small-diaphragm condenser microphone for acoustic instruments and detailed recording.",
  desc_es: "Micrófono de condensador de diafragma pequeño para instrumentos acústicos y grabación detallada.",
  img: "img/products/se7.webp",
  stores: {
    amazon: "https://www.amazon.com/s?k=sE+Electronics+sE7",
    zzounds: "https://www.zzounds.com/item--SESE7",
    musicstore: "https://www.musicstore.com/en_OE/EUR/sE-Electronics-sE7/art-REC0000000-000",
    gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-sE7-Small-Diaphragm-Condenser-Microphone",
    andertons: "https://www.andertons.co.uk/s-e-electronics-se7"
  },
  excludeStores: [],
  score: 9.1,
  bestFor: { en: "Acoustic instruments & drums", es: "Instrumentos acústicos y batería" },
  facts: [
    { icon: "microphone", value: "Condenser", label: { en: "Type", es: "Tipo" }, tone: "good" },
    { icon: "wave", value: "Cardioid", label: { en: "Pattern", es: "Patrón" }, tone: "good" }
  ]
};
productsData.push(se7Product);

const lewittSection = {
  heading: "Crystal Clear: Lewitt LCT 240 PRO for Home Studio Vocals",
  heading_es: "Cristalino: Lewitt LCT 240 PRO para voces de home studio",
  content: "<p><strong>Lewitt LCT 240 PRO is an Austrian-engineered large-diaphragm condenser built for clean, modern vocal capture.</strong> With a 17 mm capsule, 19 dBA self-noise and a neutral cardioid pattern, it records acoustic instruments and vocals with surgical detail without the harshness budget condensers often add. It includes a shock mount, windscreen and bag, and needs 48V phantom power from your interface. Expect crisp brightness and low distortion for lead vocals, acoustic guitar and overheads — a worthy step up for home studios ready to hear every nuance.</p>",
  content_es: "<p><strong>El Lewitt LCT 240 PRO es un condensador de diafragma grande diseñado en Austria para una captura vocal limpia y moderna.</strong> Con cápsula de 17 mm, 19 dBA de ruido propio y patrón cardioide neutro, graba instrumentos acústicos y voces con detalle quirúrgico sin la aspereza que añaden muchos condensadores económicos. Incluye soporte, pantalla y funda, y necesita phantom de 48 V de tu interfaz. Obtendrás brillo nítido y baja distorsión para voces principales, guitarra acústica y overheads — un paso lógico para home studios que quieren oír cada matiz.</p>",
  products: [672],
  verdict: "",
  verdict_es: "",
  pros: [],
  pros_es: [],
  cons: [],
  cons_es: [],
  specs: {}
};

const se7Section = {
  heading: "Small Diaphragm Precision: sE Electronics sE7 for Acoustic Instruments",
  heading_es: "Precisión de diafragma pequeño: sE Electronics sE7 para instrumentos acústicos",
  content: "<p><strong>sE Electronics sE7 is a small-diaphragm condenser built for detail and accuracy on acoustic sources.</strong> With a cardioid pickup and low self-noise, it captures acoustic guitar, piano and drum overheads with natural transient response and minimal coloration. Ideal for home studios that need a versatile instrument mic that sits well in a mix without extra EQ.</p>",
  content_es: "<p><strong>El sE Electronics sE7 es un condensador de diafragma pequeño diseñado para detalle y precisión en fuentes acústicas.</strong> Con captación cardioide y bajo ruido propio, captura guitarra acústica, piano y overheads de batería con respuesta transitoria natural y mínima coloración. Ideal para home studios que necesitan un micrófono de instrumento versátil que se asiente bien en la mezcla sin EQ adicional.</p>",
  products: [newSe7Id],
  verdict: "",
  verdict_es: "",
  pros: [],
  pros_es: [],
  cons: [],
  cons_es: [],
  specs: {}
};

guide.sections.push(lewittSection, se7Section);

// Update productTable columns
if(guide.productTable){
  const table = guide.productTable;
  const cols = table.columns || [];
  const addColIfMissing = (title)=>{
    if(!cols.some(c=>c.title===title || c.title_es===title)){
      cols.push({title, title_es:title});
    }
  };
  addColIfMissing('Lewitt LCT 240 PRO');
  addColIfMissing('sE Electronics sE7');
  table.columns = cols;
  // pad rows
  const colCount = cols.length;
  table.rows = table.rows.map(row=>{
    const vals = row.values || [];
    while(vals.length < colCount){
      vals.push({value:'', value_es:''});
    }
    if(vals.length > colCount){
      vals.length = colCount;
    }
    return {...row, values: vals};
  });
  // set Best For defaults
  const bestRow = table.rows.find(r=> r.label==='Best For' || r.label_es==='Ideal para');
  if(bestRow){
    const idxLewitt = cols.findIndex(c=>c.title.includes('Lewitt'));
    const idxSe7 = cols.findIndex(c=>c.title.includes('sE Electronics sE7'));
    if(idxLewitt>=0 && (!bestRow.values[idxLewitt] || !bestRow.values[idxLewitt].value)){
      bestRow.values[idxLewitt] = {value:'Home studio vocals', value_es:'Voces de home studio'};
    }
    if(idxSe7>=0 && (!bestRow.values[idxSe7] || !bestRow.values[idxSe7].value)){
      bestRow.values[idxSe7] = {value:'Acoustic instruments & drums', value_es:'Instrumentos acústicos y batería'};
    }
  }
}

// Save
fs.writeFileSync(guidesPath, JSON.stringify(guidesData, null, 2));
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));

console.log('Modified guide sections:', guide.sections.length);
console.log('New sE7 product id:', newSe7Id);
console.log('Products count:', productsData.length);
