const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='studio-subwoofers');
const f=gu.featuredSnippet;
f.faq_a5_en='The Adam T10S is the best budget studio subwoofer — its down-firing 10-inch woofer and compact cabinet deliver real extension at the lowest entry price in this guide. If you want the most output per euro, the KRK S10.4 is the value pick. For the tightest spaces, the IK Multimedia iLoud Sub is the most compact option — and subwoofers belong on the floor, not on the desk.';
f.faq_a5_es='El Adam T10S es el mejor subwoofer de estudio económico — su woofer de 10 pulgadas de disparo inferior y su caja compacta ofrecen extensión real al precio de entrada más bajo de esta guía. Si buscas la mayor salida por tu dinero, el KRK S10.4 es la opción de valor. Para los espacios más reducidos, el IK Multimedia iLoud Sub es el más compacto — y los subwoofers van en el suelo, no sobre el escritorio.';
fs.writeFileSync(B+'data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('done');