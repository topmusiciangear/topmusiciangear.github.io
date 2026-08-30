const fs=require("fs");
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));
const guide=g.find(x=>x.id==="best-guitar-home-office");
if(!guide){console.log("NOT FOUND"); process.exit(1);}

guide.sections = guide.sections.map((s,i)=>{
  if(!s.content_es) return s;
  let t = s.content_es;
  
  // Apply all the corrections from user
  t = t
    // sec[0]
    .replace(/La segunda generación del HUSH-I EVO2/, "La segunda generación de la HUSH-I EVO2")
    .replace(/añade afinador cromático integrado/, "añade un afinador cromático integrado")
    .replace(/la guitarra de viaje headless, de escala completa y silenciosa que tocas con auriculares/, "una guitarra de viaje headless, de escala completa y diseñada para practicar en silencio con auriculares")
    .replace(/con montaje de marcos sin herramientas/, "con marcos que se montan sin herramientas")
    .replace(/Funda, correa, afinador y auriculares incluidos\./, "Incluye funda, correa, afinador y auriculares.")
    // sec[1]
    .replace(/La Silent Guitar de cuerdas de acero de Yamaha con escala completa…/, "La Silent Guitar de cuerdas de acero de Yamaha ofrece una escala completa…")
    .replace(/Entrada aux/, "Entrada auxiliar")
    .replace(/salida de auriculares de 1\/8 de pulgada y salida de línea de 1\/4/, "salida de auriculares de 1/8 de pulgada y salida de línea de 1/4 de pulgada")
    // sec[2]
    .replace(/La versión de cuerdas de nylon de la Silent Guitar de Yamaha, pensada para guitarristas clásicos\./, "La versión de cuerdas de nylon de la Silent Guitar de Yamaha está pensada para guitarristas clásicos.")
    .replace(/650mm/, "650 mm")
    .replace(/50mm/, "50 mm")
    .replace(/radio de diapasón plano sobre cuerpo y mástil de caoba/, "un diapasón de radio plano, junto con cuerpo y mástil de caoba")
    // sec[3]
    .replace(/Previo SRT Powered con afinador…/, "Incorpora un previo SRT Powered con afinador…")
    .replace(/La acústica de viaje de escala completa más pequeña del mercado/, "Una de las guitarras acústicas de viaje de escala completa más compactas del mercado")
    .replace(/Sin necesidad de batería\./, "No necesita batería.")
    // sec[4]
    .replace(/La hermana de cuerdas de nylon de la Ultra-Light/, "La versión de cuerdas de nylon de la Ultra-Light")
    .replace(/cuerpo headless neck-through de solo 28 pulgadas de largo y 3 libras/, "cuerpo headless de 28 pulgadas de largo con construcción neck-through y un peso de 3 libras")
    .replace(/Funda y reposapiés desmontable incluidos\./, "Funda y reposapiés desmontables incluidos.")
    // sec[5]
    .replace(/Una guitarra eléctrica de fibra de carbono con altavoz integrado de 10W…/, "Una guitarra eléctrica de fibra de carbono con altavoz integrado de 10 W…")
    .replace(/no enchufes nada y toca en cualquier sitio/, "que permite tocar en cualquier lugar sin necesidad de conectar equipos adicionales")
    .replace(/La Sonic lleva un previo…/, "La Sonic incorpora un previo…")
    .replace(/una pastilla single coil al cuello/, "una pastilla single-coil en el mástil")
    .replace(/un humbucker al puente/, "una pastilla humbucker en el puente")
    .replace(/grabación OTG por USB-C que captura directo a tu teléfono/, "grabación OTG mediante USB-C que permite grabar directamente en tu teléfono")
    .replace(/Unas 10 horas de batería por carga\./, "Ofrece unas 10 horas de autonomía por carga.")
    .replace(/es la eléctrica todo-en-uno más económica…/, "Es una de las guitarras eléctricas todo-en-uno más asequibles…")
    // sec[6]
    .replace(/Una guitarra acústico-eléctrica inteligente/, "Una guitarra electroacústica inteligente")
    .replace(/que corre el sistema HILAVA 2\.0/, "que utiliza el sistema HILAVA 2.0")
    .replace(/sobre un chip de audio SHARC…/, "basada en un chip de audio SHARC…")
    .replace(/con las mejoras que pedían los guitarristas/, "e incorpora varias mejoras pensadas para los guitarristas")
    .replace(/34 efectos, looper, más de 100 pistas de acompañamiento y patrones de batería corren en la propia guitarra/, "La propia guitarra incorpora 34 efectos, un looper, más de 100 pistas de acompañamiento y patrones de batería")
    .replace(/sin ampli ni app/, "sin necesidad de amplificador ni aplicación")
    .replace(/El Wi-Fi y Bluetooth 5\.0 sincronizan…/, "El Wi-Fi y el Bluetooth 5.0 permiten sincronizar…")
    .replace(/el cuerpo unibody de fibra de carbono…/, "el cuerpo de una sola pieza de fibra de carbono…")
    .replace(/pesa unos 2 kg\. es la acústica todo-en-uno…/, "pesa unos 2 kg. Es una de las guitarras acústicas todo-en-uno…")
    .replace(/es la acústica todo-en-uno más avanzada que puedes comprar/, "Es una de las guitarras acústicas todo-en-uno más avanzadas disponibles actualmente.")
    .replace(/Electro-acústica compacta…/, "Electroacústica compacta…")
    .replace(/cuerpo de koa stratificado/, "cuerpo de koa laminada")
    ;
  
  if(s.content_es !== s.content_es) {
    console.log(`Fixed sec[${i}]`);
  }
  return { ...s, content_es: t };
});

fs.writeFileSync("data/guides.json", JSON.stringify(g,null,2));
console.log("DONE - Spanish corrections applied");
