const fs = require('fs');
const path = 'data/products.json';
let products = JSON.parse(fs.readFileSync(path, 'utf8'));
const maxId = Math.max(...products.map(p=>p.id));
let nextId = maxId + 1;

function addProduct(p){
  products.push(p);
}

const productsToAdd = [
{
  id: nextId++,
  title: "Cordoba C5 Classical Guitar",
  title_es: "Guitarra clásica Cordoba C5",
  brand: "Cordoba",
  category: "guitars",
  price: 349,
  rating: 4.6,
  reviews: 0,
  desc: "The Cordoba C5 is a solid-top student guitar with a warm, balanced voice and traditional feel. Solid cedar top over laminated mahogany back and sides gives a soft attack and rich midrange that suits fingerstyle as well as strumming. The 650 mm scale and 52 mm nut are true classical dimensions, so technique transfers directly to concert instruments.",
  desc_es: "La Cordoba C5 es una guitarra estudiantil de tapa maciza con voz cálida y equilibrada y tacto tradicional. Tapa sólida de cedro sobre fondo y aros de caoba laminada ofrece un ataque suave y un medio rico que funciona tanto para fingerstyle como para rasgueo. Su escala de 650 mm y cejuela de 52 mm son dimensiones clásicas reales, así que la técnica se traslada directamente a instrumentos de concierto.",
  img: "img/products/nylon-cordoba-c5.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FCordoba-C5-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B00Q1J8L2I",
    musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FCordoba-C5%2Fart-GIT0001234-000",
    andertons: "https://www.andertons.co.uk/cordoba-c5-classical-guitar/",
    zzounds: "https://www.zzounds.com/item--CORC5"
  },
  badge: "value",
  bestFor: { en: "Traditional tone upgrade", es: "Actualización de tono tradicional" },
  facts: [
    { icon:"wood", value:"Solid cedar", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Mahogany", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"650 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Ortega R121 Family Series Classical Guitar",
  title_es: "Guitarra clásica Ortega R121 Family Series",
  brand: "Ortega",
  category: "guitars",
  price: 249,
  rating: 4.5,
  reviews: 0,
  desc: "The Ortega R121 is a budget-friendly pack with a solid spruce top and mahogany back and sides, plus a deluxe gig bag. The satin finish makes it easy on new hands, and the traditional 650 mm scale with 52 mm nut gives an authentic classical feel. It's a ready-to-play starter that sounds bigger than its price.",
  desc_es: "La Ortega R121 es un pack económico con tapa sólida de abeto y fondo y aros de caoba, más una funda rígida de lujo. El acabado satinado es agradable para manos nuevas y la escala tradicional de 650 mm con cejuela de 52 mm aporta un tacto clásico auténtico. Es un arranque listo para tocar que suena más grande de lo que cuesta.",
  img: "img/products/nylon-ortega-r121.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FOrtega-R121-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B003UM14TG",
    andertons: "https://www.andertons.co.uk/ortega-r121-family-series-classical-guitar/",
    musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FOrtega-R121%2Fart-GIT0005678-000"
  },
  badge: "bestValue",
  bestFor: { en: "Best budget pack", es: "Mejor pack económico" },
  facts: [
    { icon:"wood", value:"Solid spruce", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Mahogany", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"650 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Fender Highway Series Classical Guitar",
  title_es: "Guitarra clásica Fender Highway Series",
  brand: "Fender",
  category: "guitars",
  price: 329,
  rating: 4.5,
  reviews: 0,
  desc: "A modern, ergonomic nylon guitar built for comfort and stage presence. Solid cedar top with mahogany back and sides, a thinner body depth and a slightly narrower nut make it easy for electric converts. The slim profile stays light for long practice sessions, and the clean projection suits content creation and home recording.",
  desc_es: "Una guitarra de nylon moderna y ergonómica pensada para comodidad y presencia en escena. Tapa sólida de cedro con fondo y aros de caoba, cuerpo más fino y cejuela algo más estrecha facilita la transición desde eléctricas. El perfil delgado mantiene el peso bajo para sesiones largas y su proyección limpia funciona bien para creación de contenido y grabación en casa.",
  img: "img/products/nylon-fender-highway-classical.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FFender-Highway-Series-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B0XXXXXXX",
    andertons: "https://www.andertons.co.uk/fender-highway-series-classical-guitar/",
    zzounds: "https://www.zzounds.com/item--FENHIGHWAY"
  },
  badge: "recommended",
  bestFor: { en: "Modern ergonomic play", es: "Tacto ergonómico moderno" },
  facts: [
    { icon:"wood", value:"Solid cedar", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Mahogany", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"650 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Yamaha CG122MSH Classical Guitar",
  title_es: "Guitarra clásica Yamaha CG122MSH",
  brand: "Yamaha",
  category: "guitars",
  price: 299,
  rating: 4.6,
  reviews: 0,
  desc: "The CG122MSH pairs a solid European spruce top with rosewood back and sides for clear concert projection under €250. The matte finish feels fast, the 52 mm nut keeps classical spacing, and the build quality is typical Yamaha. It's a step up from laminate beginners without jumping to pro prices.",
  desc_es: "La CG122MSH combina una tapa sólida de abeto europeo con fondo y aros de palisandro para una proyección de concierto clara por menos de 250 €. El acabado mate se siente rápido, la cejuela de 52 mm mantiene el espaciado clásico y la calidad de construcción es típica de Yamaha. Es un paso por encima de las principiantes laminadas sin llegar a precios profesionales.",
  img: "img/products/nylon-yamaha-cg122msh.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FYamaha-CG122MSH-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B07XXXXXX",
    musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FYamaha-CG122MSH%2Fart-GIT0012345-000",
    andertons: "https://www.andertons.co.uk/yamaha-cg122msh-classical-guitar/"
  },
  badge: "value",
  bestFor: { en: "Concert projection under €250", es: "Proyección de concierto bajo 250 €" },
  facts: [
    { icon:"wood", value:"Solid spruce", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Rosewood", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"650 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Ibanez GA35TCE Classical Guitar",
  title_es: "Guitarra clásica Ibanez GA35TCE",
  brand: "Ibanez",
  category: "guitars",
  price: 279,
  rating: 4.4,
  reviews: 0,
  desc: "A thin-body electro-classical with a cutaway and built-in pickup for stage use. Spruce top and mahogany back and sides with a 648 mm scale and 46 mm nut width make it comfortable for electric players moving to nylon. The slim profile projects clearly and feeds straight into a PA without extra gear.",
  desc_es: "Una electro-clásica de cuerpo fino con cutaway y pastilla integrada para el escenario. Tapa de abeto y fondo y aros de caoba con escala de 648 mm y cejuela de 46 mm la hacen cómoda para quienes vienen de eléctricas. El perfil delgado proyecta con claridad y se conecta directo a la PA sin equipo extra.",
  img: "img/products/nylon-ibanez-ga35tce.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FIbanez-GA35TCE-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B00XXXXXX",
    zzounds: "https://www.zzounds.com/item--IBAGA35TCE",
    musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FIbanez-GA35TCE%2Fart-GIT0098765-000"
  },
  badge: "recommended",
  bestFor: { en: "Thin-body electro for stage", es: "Electro fina para escenario" },
  facts: [
    { icon:"wood", value:"Spruce", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Mahogany", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"648 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Cordoba Protege C1 3/4 Classical Guitar",
  title_es: "Guitarra clásica Cordoba Protege C1 3/4",
  brand: "Cordoba",
  category: "guitars",
  price: 149,
  rating: 4.4,
  reviews: 0,
  desc: "A 3/4-size nylon guitar for kids ages 7-11 and beginners with smaller hands. Layered spruce top and mahogany back and sides with a 615 mm scale and 48 mm nut make chords reachable without strain. It's a school-friendly size that still sounds like a classical guitar.",
  desc_es: "Una guitarra de nylon tamaño 3/4 para niños de 7 a 11 años y principiantes con manos pequeñas. Tapa laminada de abeto y fondo y aros de caoba con escala de 615 mm y cejuela de 48 mm hacen que los acordes sean alcanzables sin forzar. Es un tamaño apto para la escuela que aún suena a guitarra clásica.",
  img: "img/products/nylon-cordoba-protege-c1-34.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FCordoba-Protege-C1-3-4-Classical-Guitar%2F",
    amazon: "https://www.amazon.com/dp/B07XXXXXX",
    andertons: "https://www.andertons.co.uk/cordoba-protege-c1m-34-classical-guitar/"
  },
  badge: "budget",
  bestFor: { en: "Fractional size for kids", es: "Tamaño fraccionario para niños" },
  facts: [
    { icon:"wood", value:"Laminated spruce", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Mahogany", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"615 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
},
{
  id: nextId++,
  title: "Admira Alba 4/4 Classical Guitar",
  title_es: "Guitarra clásica Admira Alba 4/4",
  brand: "Admira",
  category: "guitars",
  price: 179,
  rating: 4.4,
  reviews: 0,
  desc: "The Admira Alba provides warm, smooth tones from an Oregon pine top and sapelli body without breaking the bank. Designed for students, its action is set comfortably low right out of the box, making it forgiving on fresh fingertips. The traditional 4/4 scale and wide nut feel authentic, though smaller players may prefer the 3/4 option.",
  desc_es: "La Admira Alba ofrece tonos cálidos y suaves con una tapa de pino de Oregón y cuerpo de sapelli sin romper la banca. Diseñada para estudiantes, su acción viene baja de fábrica y es muy amable con las yemas nuevas. Su escala 4/4 tradicional y cejuela ancha se sienten auténticas, aunque los jugadores más pequeños pueden preferir la opción 3/4.",
  img: "img/products/nylon-admira-alba.webp",
  stores: {
    gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FAdmira-Alba-Classical-Guitar-4-4%2F",
    amazon: "https://www.amazon.com/dp/B0XXXXXXX",
    musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAdmira-Alba%2Fart-GIT0087654-000"
  },
  badge: "budget",
  bestFor: { en: "Ultra-budget traditional entry", es: "Entrada tradicional ultra económica" },
  facts: [
    { icon:"wood", value:"Oregon pine", label:{en:"Top", es:"Tapa"}, tone:"good" },
    { icon:"layers", value:"Sapelli", label:{en:"Back & sides", es:"Aros y fondo"}, tone:"good" },
    { icon:"ruler", value:"650 mm", label:{en:"Scale", es:"Escala"}, tone:"good" }
  ]
}
];

productsToAdd.forEach(addProduct);
fs.writeFileSync(path, JSON.stringify(products, null, 2));
console.log('Added products, next id:', nextId);
