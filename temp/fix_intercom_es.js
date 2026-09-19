const fs = require("fs");
const guides = JSON.parse(fs.readFileSync("data/guides.json", "utf8"));
const products = JSON.parse(fs.readFileSync("data/products.json", "utf8"));

const g = guides.find(x => x.id === "wireless-intercom-systems");
if (!g) throw new Error("guía no encontrada");

// --- title / H1 ---
g.title_es = "Mejores Sistemas de Intercomunicación Inalámbrica para Conciertos y Eventos en Vivo";
g.titleTag_es = "Mejores Sistemas de Intercomunicación Inalámbrica para Conciertos y Eventos en Vivo";

// --- intro ---
g.intro_es = "En un concierto o festival, el técnico de monitores, el ingeniero de FOH (Front of House) y el road manager necesitan comunicarse en tiempo real, sin cables que los aten. Antes, la comunicación por radio del equipo dependía de una estación base, cables y módulos de cintura. La familia Hollyland SOLIDCOM lo cambia todo por un sistema true-wireless full-duplex: cada auricular es una estación de intercomunicación completa que se conecta por DECT 6.0 o por un enlace de 1.9GHz, así que todo el mundo escucha en directo sin ninguna radio colgada del cinturón. Aquí tienes cómo se comparan el SOLIDCOM C1, el C1 Pro y el SE PRO — alcance, batería, ruido, control de silencio y número de usuarios — para que elijas el intercomunicador inalámbrico que de verdad encaja con tu equipo.";

// --- section: cómo elegir ---
g.sections[0].content_es = "<p><strong>Los intercom inalámbricos han dejado atrás las cajas de intercom y los avisos a gritos en la mayoría de los sets, porque cada miembro del equipo escucha exactamente lo que importa sin un auricular con cable.</strong> Las tres especificaciones que de verdad deciden tu rodaje son el tipo de conexión, el alcance y la estrategia de batería. Un sistema true-wireless full-duplex permite hablar y escuchar a la vez, que es justo para lo que existe una radio de equipo; los sistemas push-to-talk te obligan a mantener pulsado un botón e intercambian la charla instantánea por turnos disciplinados en jornadas largas. Cifras como 1000 pies (300m) o 1312 pies (400m) se dan siempre en línea de vista, y DECT 6.0 o la banda de 1.9GHz atraviesan un set ajetreado mejor que cualquier gadget de 2.4GHz. La batería importa sobre todo en jornadas encadenadas: una base de carga donde aparcar los auriculares es mejor que tener que enchufar ocho cables USB, y una segunda batería por auricular puede estirar la jornada hasta 24 horas. Lo demás — cancelación ambiental de ruido, un control de silencio que encuentres al tacto, el peso del auricular y cuántos usuarios soporta el sistema — decide si tu equipo acaba llevándolos puestos.";

// --- section C1 ---
g.sections[1].content_es = "<p><strong>El SOLIDCOM C1 es el modelo que sostiene a toda la familia: un sistema de intercomunicación completo que se lleva entero en la cabeza.</strong> Cada auricular de 168g es una estación independiente — ni bodypack que abrochar, ni radio en el cinturón, ni cable que se enganche en el set. Ofrece comunicación bidireccional hasta 1000 pies (300m) por DECT 6.0, así que los equipos de un rodaje o de un escenario en directo mantienen contacto constante en true wireless full-duplex: todos escuchan la conversación en vivo, no por turnos de walkie-talkie.</p><p><strong>Suena a herramienta de trabajo, no a producto de consumo.</strong> El audio de banda ancha de 150Hz–7kHz mantiene las voces claras y la cancelación activa de eco elimina ese rebote hueco de las radios baratas. El brazo del micrófono se baja para hablar y se sube para silenciar — un gesto que puedes hacer sin apartar la vista de lo que estás grabando — y el emparejamiento instantáneo deja un auricular listo en segundos.</p><p><strong>Con tanta sencillez, la única decisión es la configuración.</strong> El C1 se vende en kits de 2 a 8 auriculares con baterías recargables, base de carga y maletín de transporte, así que el costo depende de cuántas personas deban ir conectadas a la vez. Para equipos pequeños que quieren un intercom profesional completo sin complicarse con un panel trasero, es la elección más fácil de esta guía.</p>";

// --- section C1 Pro ---
g.sections[2].content_es = "<p><strong>El SOLIDCOM C1 Pro conserva el mismo diseño de auricular y le suma el modo push-to-talk y una estrategia de batería pensada para jornadas encadenadas.</strong> Cada auricular incluye una batería extra y, entre las dos, la autonomía llega a 24 horas completas — suficiente para un rodaje maratoniano en el que parar a cargar es un lujo, no algo que puedas programar.</p><p><strong>Cambia la forma en que se comunica un set.</strong> No es solo una radio más: es un intercom push-to-talk que supera a los walkie-talkies. La cancelación ambiental activa de ruido elimina el murmullo del equipo y el rumor del set para que solo oigas a quien habla, y el alcance de 1100 pies (350m) con comunicación full-duplex mantiene conectado a todo el equipo en un recinto.</p><p><strong>Crece con la flota que ya tienes.</strong> El C1 Pro es retrocompatible con el C1 de primera generación, así que puedes ampliar un equipo existente sin deshacerte de los auriculares actuales. Si tus rodajes son largos y tu equipo ya trabaja con disciplina, este es el SOLIDCOM que deberías comprar.</p>";

// --- section SE PRO ---
g.sections[3].content_es = "<p><strong>El SOLIDCOM SE PRO es el sistema de mayor capacidad de la familia, preparado para tener hasta 11 usuarios en un solo enlace fiable.</strong> Se comunica por una conexión de 1.9GHz con hasta 1312 pies (400m) en línea de vista, así que una gira, una producción deportiva o un escenario de concierto pueden cubrir una zona grande sin repetidores.</p><p><strong>Están hechos para la carretera, no para la oficina.</strong> La cancelación ambiental de ruido mantiene limpias las comunicaciones en entornos ruidosos, y además de ser ligeros resisten el polvo y el agua, para que la lluvia o la suciedad del backstage no arruinen el día. La carga flexible se adapta a la forma real de trabajar de un equipo, y el control de silencio, siempre a mano, se completa con una salida de auriculares de 3.5mm para que cada miembro conecte su propia monitorización si la necesita. El maletín de transporte va incluido en la caja.</p><p><strong>Si tu equipo es más que un grupo pequeño, la elección es clara.</strong> Para que 11 personas se escuchen con claridad en un recinto, con un equipo que aguanta el trabajo, el SE PRO es el tope de la familia SOLIDCOM.</p>";

// --- conclusion ---
g.conclusion_es = "Si quieres un intercom profesional completo y sin nada que abrocharte, el Hollyland SOLIDCOM C1 es la elección: un auricular true-wireless full-duplex sin bodypack, con hasta 1000 pies (300m) por DECT 6.0, emparejamiento instantáneo, cancelación activa de eco y brazo que se sube para silenciar, en configuraciones de 2 a 8 auriculares. Si tu equipo trabaja en rodajes largos y ya usa la disciplina del push-to-talk, el C1 Pro añade 24 horas de autonomía total y retrocompatibilidad con el C1 de primera generación. Y si necesitas una comunicación fiable para los equipos más grandes, el SE PRO soporta hasta 11 usuarios en un enlace de 1.9GHz, con auriculares resistentes al polvo y al agua y maletín de transporte incluido. <p><a href=\"/guides/stage-wireless_es.html\" class=\"guide-link-btn\">Mejores Sistemas de Micrófono Inalámbricos</a> <a href=\"/guides/wireless-lapel-mics_es.html\" class=\"guide-link-btn\">Micrófonos de Solapa Inalámbricos</a> <a href=\"/guides/live-sound-pa_es.html\" class=\"guide-link-btn\">Mejores Sistemas de PA</a></p>";

// --- verdict ---
g.verdict_es = "El Hollyland SOLIDCOM C1 es el mejor intercomunicador true-wireless todo en uno: un auricular de 168g sin bodypack, full-duplex real por DECT 6.0 y brazo que se sube para silenciar. El C1 Pro es la apuesta para rodajes largos, con push-to-talk, cancelación ambiental activa de ruido y 24 horas de autonomía total. El SE PRO es la opción para equipos grandes, con hasta 11 usuarios en un enlace de 1.9GHz y auriculares resistentes al polvo y al agua.";

// --- meta description ---
g.description_es = "En 2026, los sistemas Hollyland SOLIDCOM C1, C1 Pro y SE PRO son la referencia en intercomunicación true-wireless full-duplex para directo, conciertos y equipo de escenario. Compáralos por alcance, construcción del auricular, batería y cancelación de ruido — y descubre qué intercom inalámbrico comprar. Lee el veredicto completo y los precios antes de comprar.";

// --- featuredSnippet.text_es ---
g.featuredSnippet.text_es = "El Hollyland SOLIDCOM C1 es la entrada más ligera al true-wireless full-duplex: un auricular de 168g sin bodypack, hasta 1000 pies (300m) por DECT 6.0 y brazo que se sube para silenciar. El C1 Pro añade push-to-talk, cancelación ambiental activa de ruido y 24 horas de autonomía total. El SE PRO escala hasta 11 usuarios en un enlace de 1.9GHz con auriculares resistentes al polvo y al agua.";
g.featuredSnippet.title_es = "Mejores Sistemas de Intercomunicación Inalámbrica para Cine y Producción en Vivo";

// --- verdictProsCons ES ---
g.verdictProsCons[0].pros_es[3] = "Brazo abatible: abajo para hablar, arriba para silenciar";
g.verdictProsCons[0].cons_es[0] = "Se vende en configuraciones de 2 a 8 auriculares, así que el costo inicial crece con el tamaño del equipo";
g.verdictProsCons[0].cons_es[1] = "El alcance indicado es en línea de vista por DECT 6.0";
g.verdictProsCons[0].cons_es[2] = "No incluye batería de repuesto para jornadas maratonianas — el C1 Pro añade una";

g.verdictProsCons[1].pros_es[1] = "Modo push-to-talk que supera a los walkie-talkies";
g.verdictProsCons[1].cons_es[1] = "El push-to-talk es una forma de trabajar y no vale para cualquier set";
g.verdictProsCons[1].cons_es[2] = "El alcance indicado es en línea de vista por DECT 6.0";

g.verdictProsCons[2].cons_es[0] = "Precio premium si tu equipo solo necesita unos pocos auriculares";
g.verdictProsCons[2].cons_es[1] = "El alcance indicado es en línea de vista en el enlace de 1.9GHz";
g.verdictProsCons[2].cons_es[2] = "Rinde al máximo solo cuando de verdad necesitas más de diez intercoms";

// --- product desc_es (509, 510, 511) ---
const p509 = products.find(p => p.id === 509);
p509.desc_es = "El Hollyland SOLIDCOM C1 es un intercom de auricular true-wireless full-duplex sin bodypack. Cada auricular de 168g se comunica en ambas direcciones hasta 1000 pies (300m) por DECT 6.0, con audio de banda ancha de 150Hz–7kHz, emparejamiento instantáneo y cancelación activa de eco, además de un brazo de micrófono que se baja para hablar y se sube para silenciar. Se incluyen baterías recargables, base de carga y maletín de transporte en configuraciones de 2 a 8 auriculares.";

const p510 = products.find(p => p.id === 510);
p510.desc_es = "El Hollyland SOLIDCOM C1 Pro es un intercom inalámbrico push-to-talk que supera a los walkie-talkies. Cada auricular incluye una batería extra para 24 horas de autonomía total, la cancelación ambiental activa de ruido elimina el bullicio del equipo y el alcance de 1100 pies (350m) en comunicación full-duplex mantiene conectado a todo el equipo. Es retrocompatible con el C1 de primera generación para ampliar la flota sin esfuerzo.";

const p511 = products.find(p => p.id === 511);
p511.desc_es = "El Hollyland SOLIDCOM SE PRO es un intercom inalámbrico profesional para hasta 11 usuarios, en un enlace de 1.9GHz que alcanza 1312 pies (400m) en línea de vista. La cancelación ambiental de ruido mantiene limpias las comunicaciones, y los auriculares ligeros resisten el polvo y el agua, con carga flexible, control de silencio fiable y salida de auriculares de 3.5mm. Se incluye un maletín de transporte.";

fs.writeFileSync("data/guides.json", JSON.stringify(guides, null, 2));
fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2));
console.log("OK — wireless-intercom-systems ES reescrito + productos 509-511");