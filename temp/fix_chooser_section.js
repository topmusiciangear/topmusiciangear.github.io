var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// The chooser section (first section) was removed - need to add it back
var chooser={
  "heading": "What Makes an Interface Good for Streaming?",
  "heading_es": "Qué hace que una interfaz sea buena para streaming",
  "content": "<p><strong>A streaming interface is not just a sound card.</strong> It has to capture your voice cleanly, keep it from clipping mid-rant, route separate mixes for you and your audience, and often handle a second input like game audio or a guest mic. A plain two-in/two-out interface leaves all of that to software.</p><p><strong>The four units here fall into two camps.</strong> The Rodecaster Duo and Roland Bridge Cast X are all-in-one production consoles — they mix, process and route your stream with hardware controls and a touchscreen or pads. The Audient EVO 4 and Universal Audio Volt 276 are classic audio interfaces — compact units that focus on clean preamps and, in the Volt's case, analog compression the way in. Decide which camp matches how you create.</p><p><strong>One rule applies to all of them:</strong> the preamp matters more than the marketing. Enough clean gain for your mic without a booster, phantom power when you need it, and zero-latency monitoring so you hear yourself live. Check those three before you check the light-up pads <a class=\"guide-link-btn\" href=\"/guides/best-interface.html\">Best audio interfaces</a> <a class=\"guide-link-btn\" href=\"/guides/stream-controllers.html\">Best stream controllers</a></p>",
  "content_es": "<p><strong>Una interfaz de streaming no es solo una tarjeta de sonido.</strong> Tiene que capturar tu voz limpia, evitar que distorsione en pleno discurso, enrutar mezclas separadas para ti y tu audiencia, y a menudo manejar una segunda entrada como el audio del juego o un micrófono de invitado. Una interfaz simple de dos entradas y dos salidas deja todo eso al software.</p><p><strong>Los cuatro aparatos de aquí caen en dos bandos.</strong> El Rodecaster Duo y el Roland Bridge Cast X son consolas de producción todo-en-uno — mezclan, procesan y enrutan tu directo con controles físicos y una pantalla táctil o pads. El Audient EVO 4 y el Universal Audio Volt 276 son interfaces de audio clásicas — unidades compactas centradas en previos limpios y, en el caso del Volt, en la compresión analógica a la entrada. Decide qué bando coincide con cómo creas.</p><p><strong>Una regla aplica a todos:</strong> el previo importa más que el marketing. Suficiente ganancia limpia para el micrófono sin booster, alimentación phantom cuando la necesites y monitorización de latencia cero para escucharte en vivo. Revisa esas tres antes de mirar los pads iluminados <a class=\"guide-link-btn\" href=\"/guides/best-interface_es.html\">Mejores interfaces de audio</a> <a class=\"guide-link-btn\" href=\"/guides/stream-controllers_es.html\">Mejores controladores de streaming</a></p>",
  "products": [239, 240, 262, 263, 664],
  "skipMedia": true
};

// Insert chooser at beginning
g.sections.unshift(chooser);

// Fix product IDs in each section
g.sections.forEach(function(s){
  if(s.products){
    if(s.heading.indexOf('Rode Rodecaster Duo')>-1){
      s.products=[239];
    }else if(s.heading.indexOf('Roland Bridge Cast X')>-1){
      s.products=[240,239];
    }else if(s.heading.indexOf('Audient EVO 4')>-1){
      s.products=[262];
    }else if(s.heading.indexOf('Universal Audio Volt 276')>-1){
      s.products=[263];
    }else if(s.heading.indexOf('Zoom PodTrak P4next')>-1){
      s.products=[664];
    }else if(s.heading.indexOf('Scarlett 2i2')>-1){
      s.products=[15];
    }
  }
});

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Sections after fix:',g.sections.length);
g.sections.forEach(function(s,i){
  console.log('Section',i,'products:',s.products,'heading:',s.heading.slice(0,60));
});
console.log('DONE');