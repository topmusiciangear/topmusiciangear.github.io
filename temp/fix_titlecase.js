const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;
const BRANDS = new Set(['iZotope','Sonible','Waves','Zynaptiq','Acon','Ableton','FL','Studio','Pro','Vx','RX','smart','deess','Unveil','Clarity','Standard','Digital','Restoration','Suite','Audio','Neumann','Shure','AKG','Rode','Yamaha','Fender','Martin','Taylor','Gibson','JBL','EV','QSC','Mackie','Roland','Boss','Korg','Nord','Moog','Sequential','Arturia','Native','Instruments','Universal','RME','Focusrite','PreSonus','Behringer','MOTU','Audient','SSL','Solid','State','Logic','X','Gen','Twin','Babyface','Apollo','Scarlett','Clarett','Volt','SiX','BiG','Les','Paul','Stratocaster','Telecaster','Strat','Tele','Jazzmaster','Jaguar','Mustang','Precision','Jazz','Bass','Guitar','Acoustic','Electric','Dynamic','Condenser','Ribbon','Microphone','Mic','Vocal','Live','Stage','Wireless','System','Monitor','Monitors','Speaker','Speakers','Headphones','Headphone','Ear','Drum','Drums','Machine','Machines','Pedal','Pedals','Effects','Effect','FX','Amp','Amps','Amplifier','Amplifiers','Interface','Interfaces','Mixer','Mixers','Console','Consoles','DAW','DAWs','Plugin','Plugins','VST','VST2','VST3','AU','AAX','MIDI','USB','XLR','EQ','DSP','IA','AI','Max','Mini','Plus','Ultra','Elite','Premium','Professional','Budget','Best','Top','Guide','Guides','Review','Reviews','Comparison','Versus','And','Or','The','For','In','On','At','To','Of','With','By','From','Session','Producer','Edition','All','Modern','Deluxe','Builder','Presentation','Series','Electro','Voice','DJs','Adam','Genelec','Neutron','MIXVAULT','Mastering','Mix','Trash','American','UAD','FS','AT2020','P120','SCM25A','Mk2','EON712','JRX215','SRT215','CBR12','K12.2','ZLX','ELX200','EON','JRX','SRT','CBR','PS14ce','OM','D','Dreadnoughts','Élite','Tono','Tradicional','Cúspide','Ingeniería','Moderna','Elección','Equilibrada','Sesiones','Cúspide']);

const COMUNES = new Set(['De','La','El','Los','Las','Un','Una','Que','Con','Para','En','Y','Del','Al','Lo','Su','Sus','Más','Menos','Sin','Sobre','Entre','Cómo','Cuál','Esta','Este','Estos','Estas','Es','Son','No','Si','Ya','Se','Cada','Todo','Todos','Toda','Todas','Otro','Otros','Otra','Antes','Después','Ahora','Solo','También','Dentro','Fuera','Desde','Hasta','Cuando','Porque','Aunque','Pero','Nunca','Siempre','Casi','Algo','Uno','Mejor','Peor','Grande','Nuevo','Viejo','Fácil','Difícil','Rápido','Lento','Bueno','Perfecto','Natural','Rápida','Único','Única','Correcta','Real','Cuatro','Tres','Cinco','Do','Re','Mi','Fa','Sol','Por','Como','Que','Quien','Cual','Donde','Cuando','Porque','Aunque','Pero','Nunca','Siempre','Casi','Algo','Uno','Dos','Seis','Siete','Ocho','Nueve','Diez','Cual','Cuales']);

function fixHeading(text) {
  if (!text) return text;
  // Split by punctuation that starts a new sentence
  const parts = text.split(/([:?!;¿¡.]\s*)/);
  let result = '';
  let capitalizeNext = true;
  for (const part of parts) {
    if (/^[:?!;¿¡.]\s*$/.test(part)) {
      result += part;
      capitalizeNext = true;
      continue;
    }
    const words = part.split(/(\s+)/);
    const fixed = words.map((w, i) => {
      if (/^\s+$/.test(w)) return w;
      const clean = w.replace(/^[¿¡"'«*[]/, '').replace(/[.,;:!?]$/, '');
      if (capitalizeNext && i === 0) {
        capitalizeNext = false;
        return w; // keep as is (already capitalized)
      }
      if (ACRO.test(clean)) return w;
      if (BRANDS.has(clean)) return w;
      if (COMUNES.has(clean)) {
        // lowercase this word
        return w.charAt(0).toLowerCase() + w.slice(1);
      }
      return w;
    });
    result += fixed.join('');
  }
  return result;
}

let fixedCount = 0;
guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const original = s.heading_es || '';
    const fixed = fixHeading(original);
    if (fixed !== original) {
      s.heading_es = fixed;
      fixedCount++;
    }
  });
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Fixed', fixedCount, 'headings');