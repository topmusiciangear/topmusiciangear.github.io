/**
 * fix_cliches.js — familia de metáforas hackneyed (workhorse/todoterreno, beast/bestia,
 * grail, god, secret weapon, navaja suiza, game-changer, heavy lifting, tank, powerhouse)
 * EN + ES en guides.json y products.json. Raw split/join, aguja exacta.
 */
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

let rawG = fs.readFileSync(B + 'data/guides.json', 'utf8');
let rawP = fs.readFileSync(B + 'data/products.json', 'utf8');
let okG = 0, failG = [], okP = 0, failP = [];

function repG(par) { const a = rawG; rawG = rawG.split(par[0]).join(par[1]); if (rawG !== a) okG++; else failG.push(par[0]); }
function repP(par) { const a = rawP; rawP = rawP.split(par[0]).join(par[1]); if (rawP !== a) okP++; else failP.push(par[0]); }
function repBoth(par) { repG(par); repP(par); }

/* ============ 1. agujas compartidas guía+producto (se aplican a ambos ficheros) ============ */

// Q2U clásico podcasting (budget-usb-mics, mics-for-creators, usb-mics verdicts + P276 desc)
repBoth(['The classic budget podcasting workhorse: a dynamic cardioid mic with both USB and XLR outputs',
         'The classic budget podcasting pick: a dynamic cardioid mic with both USB and XLR outputs']);
repBoth(['Es el clásico todoterreno del podcasting económico: un micrófono dinámico cardioide con salidas USB y XLR, así que puedes empezar por USB y pasar a una interfaz sin comprar otro micro.',
         'Es el clásico económico del podcasting: un micrófono dinámico cardioide con salidas USB y XLR, así que puedes empezar por USB y pasar a una interfaz sin comprar otro micro.']);
repBoth(['El clásico todoterreno del podcasting económico: un micrófono dinámico cardioide con salidas USB y XLR.',
         'El clásico económico del podcasting: un micrófono dinámico cardioide con salidas USB y XLR.']);

// SM58 tank (stage-mics verdict + P50 desc)
repBoth(['Built like a tank with a tailored frequency response for vocals that cut through any mix',
         'Built solid, with a tailored frequency response for vocals that cut through any mix']);

// QSC KS118 (best-live-subwoofers verdict + P233)
repBoth(['3600-watt Class D powerhouse with an 18-inch long-excursion driver that hits 136 dB peak',
         '3600-watt Class D amp with an 18-inch long-excursion driver that hits 136 dB peak']);
repBoth(['Una bestia de 3600 vatios Class D con un driver',
         'Un amplificador Class D de 3600 vatios con un driver']);

// Alto TS18S budget beast (verdict + P630)
repBoth(['18-inch budget beast with 137 dB max SPL, braced MDF cabinet, DSP tunings (Off/Live/DJ) and phase alignment',
         '18-inch budget option with 137 dB max SPL, braced MDF cabinet, DSP tunings (Off/Live/DJ) and phase alignment']);
repBoth(['Bestia económica de 2500 W pico y 18 pulgadas',
         'Opción económica de 2500 W pico y 18 pulgadas']);

// JBL EON718S (verdict + P631)
repBoth(['18-inch workhorse with 131 dB max SPL, birch-ply cabinet, backlit LCD, dbx DriveRack DSP and Bluetooth app control',
         '18-inch sub with 131 dB max SPL, birch-ply cabinet, backlit LCD, dbx DriveRack DSP and Bluetooth app control']);
repBoth(['Todoterreno de 1500 W pico y 18 pulgadas',
         'Sub de 1500 W pico y 18 pulgadas']);

// Perkons HD-01 (best-drum-machine verdict + P613)
repBoth(['hybrid techno beast: digital engines through per-voice analog filters',
         'hybrid techno machine: digital engines through per-voice analog filters']);
repBoth(['Bestia techno híbrida de 4 voces: motores digitales',
         'Máquina techno híbrida de 4 voces: motores digitales']);
repBoth(['The modern techno grail.', 'The modern techno flagship.']);
repBoth(['El santo grial del techno moderno.', 'La referencia del techno moderno.']);
repBoth(['Premium techno beast', 'Premium techno machine']);
repBoth(['Bestia techno premium', 'Techno premium']);

// Digitakt II (tabla guía + P127)
repBoth(['Stereo sampling god', 'Deep stereo sampling']);
repG(['Dios del muestreo estéreo', 'Muestreo estéreo a fondo']);

// BB434 / BB 400 (2 guías + P467)
repBoth(['passive studio workhorse of the BB 400 series', 'passive studio bass of the BB 400 series']);
repBoth(['bestia pasiva de estudio de la serie BB 400', 'bajo pasivo de estudio de la serie BB 400']);

// Takamine GC1 (beginner-guitar verdict + P554)
repBoth(['traditional classical built like a tank: fan-braced spruce top',
         'traditional classical built to last: fan-braced spruce top']);
repBoth(['clásica tradicional construida como un tanque: tapa de abeto con varetaje de abanico',
         'clásica tradicional robusta: tapa de abeto con varetaje de abanico']);
repP(['the indestructible student workhorse', 'the indestructible student guitar']);

// Eventide Blackhole wet-FX (fx-plugins verdict + P527)
repBoth(['delay + reverb wet-FX powerhouse inspired by the Roland Space Echo',
         'delay + reverb wet-FX unit inspired by the Roland Space Echo']);

// Gibson J-45 renacido en Bozeman (acoustic-guitars verdict_es + P456 desc_es)
repG(['— Un todoterreno renacido en Bozeman.', '— Un J-45 renacido en Bozeman.']);
repP(['Un todoterreno renacido en Bozeman.', 'Un clásico renacido en Bozeman.']);

// bestFor cell "Gigging workhorse for rock and funk" (best-5-string tabla + P543)
repBoth(['Gigging workhorse for rock and funk', 'Gigging bass for rock and funk']);
repG(['Todoterreno para rock y funk', 'Bajo de gira para rock y funk']);
repP(['Todo terreno de directo para rock y funk', 'Bajo de directo para rock y funk']);

// "All-round PJ workhorse" (beginner-bass tabla + P681)
repBoth(['All-round PJ workhorse', 'All-round PJ bass']);
repBoth(['PJ todoterreno', 'PJ polivalente']);

// "Premium techno beast" ya arriba. Yamaha DXS18XLF (P237):
repBoth(['make it a road-ready workhorse', 'make it a road-ready sub']);
repBoth(['lo convierten en un todoterreno listo para la carretera', 'lo convierten en un sub listo para la carretera']);

/* ============ 2. guides.json — pares EN/ES por guía ============ */

// ableton-vs-fl / ableton-vs-logic (powerhouse)
repG(['offering the Session View and a performance powerhouse', 'offering the Session View and a performance-focused workflow']);
repG(['Session View and Performance Powerhouse', 'Session View and Live Performance']);
repG(['Performance Powerhouse', 'Live Performance']); // ableton-vs-logic key1 (ya sin el de FL)

// active-vs-passive-pa CBR12 heading
repG(['Yamaha CBR12: The Passive Workhorse That Just Takes a Signal', 'Yamaha CBR12: A Passive Cab That Just Takes a Signal']);
repG(['Yamaha CBR12: el todoterreno pasivo que solo espera una señal', 'Yamaha CBR12: la caja pasiva que solo espera una señal']);

// ai-tools-plugins Unmask
repG(["The Unmask feature is Neutron 5's secret weapon.", "The Unmask feature is Neutron 5's most useful trick."]);
repG(['La función Unmask es el arma secreta del Neutron 5.', 'La función Unmask es lo más útil del Neutron 5.']);

// beginner-bass-guitars
repG(['Yamaha TRBX304: Active Modern Workhorse', 'Yamaha TRBX304: Modern Active Tone Control']);
repG(['Yamaha TRBX304: Todoterreno activo moderno', 'Yamaha TRBX304: tono activo moderno']);
repG(['with onboard control, this workhorse delivers', 'with onboard control, this bass delivers']);
repG(['con control a bordo, este todoterreno cumple', 'con control a bordo, este bajo cumple']);
repG(['Yamaha BB234: A PJ Workhorse for a Decade', 'Yamaha BB234: A PJ Bass Built to Last a Decade']);
repG(['Yamaha BB234: un PJ todoterreno para una década', 'Yamaha BB234: un PJ construido para durar una década']);
repG(['Indestructible alder workhorse with V3 P/J pickups', 'Indestructible alder bass with V3 P/J pickups']);

// beginner-guitar (tank)
repG(['neck is built like a tank: it holds tuning', 'neck is built to last: it holds tuning']);
repG(['neck, built like a tank.</strong>', 'neck, built to last.</strong>']);
repG(['clásica tradicional y robusta construida como un tanque, que mantiene la afinación',
      'clásica tradicional y robusta, que mantiene la afinación']);

// best-5-string-basses
repG(['mid-range workhorses for gigging pros', 'mid-range basses for gigging pros']);
repG(['If you want the American workhorse that session players trust', 'If you want the American-made bass that session players trust']);
repG(['Si quieres el todoterreno americano en el que confían los músicos de sesión', 'Si quieres el bajo americano en el que confían los músicos de sesión']);

// best-bass-amps
repG(['Great as a versatile workhorse; check that the voicing suits your cab preference.',
      'Great as a versatile combo; check that the voicing suits your cab preference.']);
repG(['Gran todoterreno versátil; comprueba que su carácter encaja con tu gusto de altavoz.',
      'Gran combo versátil; comprueba que su carácter encaja con tu gusto de altavoz.']);
repG(['The four-band EQ plus Old School Filter is the secret weapon:', 'The four-band EQ plus Old School Filter is the star feature:']);
repG(['La EQ de cuatro bandas más el Old School Filter es el arma secreta:', 'La EQ de cuatro bandas más el Old School Filter es su mejor truco:']);

// best-bass-under-700
repG(['vintage looks, this modern workhorse delivers', 'vintage looks, this modern Ibanez delivers']);
repG(['importan más que la estética vintage, este todoterreno moderno cumple', 'importan más que la estética vintage, este Ibanez moderno cumple']);

// best-condenser-mics
repG(['at $154–$159, it is the all-round workhorse', 'at $154–$159, it covers everything']);
repG(['por $154–$159, es el todoterreno', 'por $154–$159, cubre de todo']);

// best-drum-machine (conclusión + faq_a5 + faq_a2_es)
repG(['the analog roar of a hybrid beast or the infinite freedom of a premium sampler',
      'the analog punch of a hybrid machine or the infinite freedom of a premium sampler']);
repG(['el rugido analógico de una bestia híbrida como la libertad infinita de un sampler premium',
      'la pegada analógica de una máquina híbrida como la libertad infinita de un sampler premium']);
repG(['the budget decides between working tool and aspirational grail',
      'the budget decides between the working tool and the flagship you save up for']);
repG(['your budget decides between a versatile workhorse and an aspirational studio grail',
      'your budget decides between the versatile stage tool and the studio flagship']);
repG(['tu presupuesto decidirá entre un todoterreno versátil o un grial aspiracional de estudio',
      'tu presupuesto decidirá entre la herramienta versátil de directo o el buque insignia de estudio']);
repG(['más pantallas y potencia bruta de procesado', 'más pantallas y más potencia de procesado']);

// best-electric-guitar
repG(['<p>The workhorse suits fusion, prog and session players covering many styles per night.',
      '<p>The AZ2402 suits fusion, prog and session players covering many styles per night.']);
repG(['<p>La todoterreno encaja con fusión, prog y músicos de sesión que cubren estilos por noche.',
      '<p>La AZ2402 encaja con fusión, prog y músicos de sesión que cubren estilos por noche.']);
repG(['Yamaha Pacifica 112V: The HSS Workhorse for Demos', 'Yamaha Pacifica 112V: HSS Versatility for Demos']);
repG(['Yamaha Pacifica 112V: el todoterreno HSS para demos', 'Yamaha Pacifica 112V: versatilidad HSS para demos']);
repG(['Studios keep a workhorse like this within reach', 'Studios keep a guitar like this within reach']);

// best-electric-guitars-2026
repG(['Es para principiantes y todoterreno que priorizan la versatilidad.',
      'Es para principiantes y para quienes priorizan la versatilidad.']);
repG(['The working brief is unmistakably the studio workhorse.', 'This is the studio guitar you reach for every day.']);
repG(['El programa de trabajo apunta sin disimulo a todoterreno de estudio.', 'Es la guitarra de estudio que tienes a mano cada día.']);
repG(['La Yamaha Pacifica 112V es la mejor opción todoterreno.', 'La Yamaha Pacifica 112V es la opción más versátil.']);
repG(['Guitarra todoterreno para empezar', 'Guitarra versátil para empezar']);

// best-guitar-plugins (EN workhorse + ES calco herramienta de trabajo)
repG(['IK Multimedia AmpliTube 5 is a production workhorse', 'IK Multimedia AmpliTube 5 is a whole rig inside a plugin']);
repG(['IK Multimedia AmpliTube 5 es una herramienta de trabajo de producción', 'IK Multimedia AmpliTube 5 es un rig completo dentro de un plugin']);

// best-headphones-for-mixing
repG(['has served broadcast since 1991 as a closed-back, collapsible workhorse',
      'has been a broadcast fixture since 1991 as a closed-back, collapsible standard']);
repG(['has served since 1991 as a closed-back, collapsible workhorse',
      'has been a broadcast fixture since 1991 as a closed-back, collapsible standard']);
repG(['is the closed-back workhorse.', 'is the closed-back standard.']);

// best-instrument-mics (tabla EN + s13 ES)
repG(['Live vocal workhorse', 'Live vocal standard']);
repG(['es un especialista y no un todoterreno', 'es un especialista, no un micro para todo']);

// best-in-ear-monitors
repG(['hasta modelos todoterreno asequibles', 'hasta opciones asequibles y versátiles']);
repG(['Estándares de la industria y todoterrenos', 'Estándares de la industria']);

// best-live-sound-mixers
repG(['This guide covers analog workhorses, hybrid recorder-mixers', 'This guide covers analog mainstays, hybrid recorder-mixers']);
repG(['Esta guía cubre todoterrenos analógicos, híbridos con grabadora', 'Esta guía cubre analógicas de confianza, híbridos con grabadora']);

// best-mic-for-guitar-amps (Audix i5)
repG(['The Audix i5 is the USA-made workhorse for players who run their amps hot',
      'The Audix i5 is the USA-made standard for players who run their amps hot']);
repG(['El Audix i5 es el todoterreno hecho en EE.', 'El Audix i5 es el clásico hecho en EE.']);

// best-reverb-delay
repG(['this compact workhorse covers the essentials', 'this compact pedal covers the essentials']);
repG(['este compacto todoterreno es el de confianza', 'este compacto es el de confianza']);

// best-ribbon-mics
repG(['They are the secret weapon behind decades of legendary recordings', 'They sit behind decades of legendary recordings']);
repG(['Son el arma secreta de décadas de grabaciones legendarias', 'Están detrás de décadas de grabaciones legendarias']);
repG(['It is a secret weapon for adding warmth and dimension', 'It is a go-to for adding warmth and dimension']);
repG(['Es un arma secreta para añadir calidez y dimensión', 'Es la pieza ideal para añadir calidez y dimensión']);
repG(['Evaluated as the trusted workhorse of this ribbon collection', 'Evaluated as the trusted core of this ribbon collection']);
repG(['Valorado como todoterreno fiable de esta colección ribbon', 'Valorado como el clásico fiable de esta colección ribbon']);

// best-shotgun-mics
repG(['the MKE 600 is the workhorse to beat', 'the MKE 600 is the one to beat']);
repG(['el MKE 600 es el todoterreno de referencia', 'el MKE 600 es el de referencia']);

// best-synth-vsts
repG(['picking between wavetable powerhouses, analog emulations', 'picking between wavetable synths, analog emulations']);
repG(['The step envelopes and modulation tracks are the secret weapon.', 'The step envelopes and modulation tracks are what set it apart.']);
repG(['Las envolventes por pasos y las pistas de modulación son el arma secreta.', 'Las envolventes por pasos y las pistas de modulación son lo que lo distingue.']);
repG(['The Trance Workhorse That Refuses to Age', 'The Trance Standard That Refuses to Age']);
repG(['el todoterreno del trance que se niega a envejecer', 'el estándar del trance que se niega a envejecer']);

// best-synthesizers
repG(['Ideal para todoterrenos; comprueba que aprenderás su motor a fondo.', 'Ideal para quien quiere cubrir de todo; comprueba que aprenderás su motor a fondo.']);

// budget-bass-like-expensive
repG(['<p><strong>Secret weapon:</strong>', '<p><strong>The trick:</strong>']); // ×4 en esta guía
repG(['<p><strong>Arma secreta:</strong> El circuito activo Performance EQ de 5 vías es el verdadero MVP.',
      '<p><strong>El truco:</strong> El circuito activo Performance EQ de 5 vías es lo que más aporta.']);
repG(['Player II Jazz Bass: The Best-Value Workhorse', "Player II Jazz Bass: The Working Player's Bargain"]);
repG(['Player II Jazz Bass: el todoterreno con mejor precio', 'Player II Jazz Bass: la ganga para quien toca a diario']);

// budget-headphones
repG(['Is the HD 280 Pro II the Tracking Workhorse?', 'Tracking with the HD 280 Pro II']);
repG(['¿es el HD 280 Pro II el todoterreno para grabar?', 'grabar con el HD 280 Pro II']);

// budget-pa-systems (potencia bruta ×2)
repG(['ofrecen más potencia bruta por el precio', 'ofrecen más potencia por el precio']); // ×2

// c414-vs-u87
repG(['next to versatile workhorses tend to need less processing', 'next to versatile multipattern mics tend to need less processing']);
repG(['junto a todoterrenos versátiles suelen necesitar menos proceso', 'junto a micrófonos multipatrón versátiles suelen necesitar menos proceso']);
repG(['the C414 XLII is the Swiss-army choice', 'the C414 XLII is the one that covers it all']);
repG(['el C414 XLII es la navaja suiza', 'el C414 XLII es el que lo cubre todo']);

// di-box (LR Baggs)
repG(['is the Swiss Army knife for acoustic musicians', 'is the complete toolkit for acoustic musicians']);
repG(['es la navaja suiza para músicos acústicos', 'lo resuelve todo para músicos acústicos']);

// dt770-vs-dt990
repG(['this is the closed-back workhorse to grab', 'this is the closed-back to grab']);
repG(['este cerrado es el todoterreno fiable que conviene elegir', 'este cerrado es el que conviene elegir']);

// fender-bass-guide heading
repG(['The Latin, Fusion, and Soul Workhorse', 'The Latin, Fusion, and Soul Bass for Working Players']);
repG(['Fender American Professional II Jazz Bass: la potencia de música latina, fusión y soul',
      'Fender American Professional II Jazz Bass: el bajo para latina, fusión y soul']);

// fx-plugins (Blackhole)
repG(['calls it their secret weapon, and it shows up on many hit records', 'calls it their go-to effect, and it shows up on many hit records']);
repG(['lo consideran su arma secreta, y aparece en un millón de discos', 'lo tienen como su efecto favorito, y aparece en un millón de discos']);

// j48-vs-rndi (tank)
repG(["it's built like a tank, sounds neutral", "it's built to survive abuse, sounds neutral"]);
repG(['está construido como un tanque, suena neutral', 'aguanta golpes, suena neutral']);
repG(['transparent, built like a tank, and every sound engineer knows it', 'transparent, built to survive abuse, and every sound engineer knows it']);
repG(['es transparente, está construido como un tanque y todo ingeniero', 'es transparente, aguanta golpes y todo ingeniero']);

// katana-vs-dsl
repG(['The secret weapon is power attenuation to 25W and 0.5W', 'The hidden trick is power attenuation to 25W and 0.5W']);
repG(['El arma secreta es la atenuación', 'El truco menos conocido es la atenuación']);
repG(['One is the practical modeling powerhouse', 'One is the practical modeling amp']);

// live-sound-pa (ZLX-12P-G2)
repG(['EV ZLX-12P-G2: The Lightweight DSP Workhorse', 'EV ZLX-12P-G2: Lightweight With Full DSP']);
repG(['EV ZLX-12P-G2: el todoterreno ligero con DSP', 'EV ZLX-12P-G2: ligero y con DSP completo']);

// martin-d28-vs-taylor-314 (verdict + P8)
repG(['The 300-series workhorse with a solid Sitka spruce top', 'The 300-series standard with a solid Sitka spruce top']);
repG(['— La todoterreno de la serie 300 con una tapa sólida de abeto Sitka', '— El modelo de referencia de la serie 300 con una tapa sólida de abeto Sitka']);
repP(['updates the 300-series workhorse with a solid Sitka spruce top', 'updates the 300-series standard with a solid Sitka spruce top']);
repP(['actualiza la todoterreno de la serie 300 con una tapa sólida', 'actualiza el estándar de la serie 300 con una tapa sólida']);

// mics-for-creators
repG(['Kept as the multi-pattern workhorse for varied creator formats', 'Kept as the multi-pattern pick for varied creator formats']);
repG(['Mantenido como todoterreno multipatrón para formatos variados', 'Mantenido como el multipatrón de referencia para formatos variados']);
repG(['no como todoterreno, el diseño cobra pleno sentido', 'no como micro para todo, el diseño cobra pleno sentido']);

// nx912-vs-pxm12mp
repG(['The RCF is a beast that holds its own on a loud stage.', 'The RCF is built to hold its own on a loud stage.']);
repG(['La RCF es un monstruo que no se inmuta en un escenario ruidoso.', 'La RCF aguanta sin inmutarse en un escenario ruidoso.']);

// player-strat-vs-pacifica
repG(['Yamaha Pacifica 112V: The Budget Workhorse', 'Yamaha Pacifica 112V: The Budget Guitar That Does It All']);
repG(['Yamaha Pacifica 112V: la guitarra todoterreno', 'Yamaha Pacifica 112V: la guitarra que lo cubre todo']);

// premium-interfaces
repG(['Ranked among these flagships as the tracking powerhouse', 'Ranked among these flagships as the tracking pick']);
repG(['encontrarán aquí su santo grial', 'encontrarán aquí su solución ideal']);

// pro-daw
repG(['Ableton Live 12 Suite is the creative powerhouse designed for electronic music production, beatmaking, and live performance.',
      'Ableton Live 12 Suite is the creative standard for electronic music production, beatmaking, and live performance.']);
repG(['Live 12 Suite is the creative powerhouse for electronic producers and performers.',
      'Live 12 Suite is the creative standard for electronic producers and performers.']);

// pro-plugins
repG(['Volcano 3 is a modular filter powerhouse', 'Volcano 3 is a deep modular filter']);

// pro-tools-vs-cubase
repG(["The Composer's Powerhouse with Integrated Scoring", "The Composer's Workstation with Integrated Scoring"]);
repG(['the composer\u2019s powerhouse with advanced MIDI editing', 'the composer\u2019s pick with advanced MIDI editing']);
repG(['Elige por dónde entregarás los archivos, no por potencia bruta.', 'Elige por dónde entregarás los archivos, no por potencia de proceso.']);

// pro-monitors (ES potencia bruta)
repG(['velocidad de cinta, flexibilidad DSP y potencia bruta', 'velocidad de cinta, flexibilidad DSP y potencia de sobra']);
// best-samplers (ES potencia bruta)
repG(['siempre ofrecerá más potencia bruta y plugins de terceros', 'siempre ofrecerá más potencia y plugins de terceros']);

// scarlett-vs-motu (Air mode)
repG(['The Air mode is the secret weapon:', 'The Air mode is the standout:']);
repG(['El modo Air es el arma secreta:', 'El modo Air es lo más destacado:']);

// scarlett-vs-ssl
repG(["SSL's Secret Weapon", 'What Sets SSL Apart']); // key2 + specs val2
repG(['Arma Secreta de SSL', 'Lo que distingue a SSL']);

// sidechain-modulation-plugins
repG(['are the secret weapons behind the pumping', 'drive the pumping']);

// stage-mics (OM7 + SM57 ES)
repG(['The OM7 is the secret weapon of professional FOH engineers', 'The OM7 is what professional FOH engineers reach for']);
repG(['El OM7 es el arma secreta de los ingenieros de FOH profesionales', 'El OM7 es el que eligen los ingenieros de FOH profesionales']);
repG(['el SM57 es el todoterreno definitivo', 'el SM57 resuelve casi cualquier captura']);

// studio-subwoofers-setup
repG(['so the driver does the heavy lifting in its most linear region', 'so the driver does the low-frequency work in its most linear region']);
repG(['haga el trabajo pesado en su región más lineal', 'trabaje los graves en su región más lineal']);

// tracking-headphones
repG(['35 ohms that play loud from anything complete the workhorse brief', '35 ohms that play loud from anything complete the picture']);
repG(['35 ohmios que dan volumen de sobra con todo redondean la ficha de todoterreno', '35 ohmios que dan volumen de sobra con todo completan el conjunto']);

// ts9-vs-bd2
repG(['letting the amp do the heavy lifting while the pedal shapes the voice', 'letting the amp carry the volume while the pedal shapes the voice']);

// usb-mics
repG(['from a $70 budget workhorse to studio-quality condensers', 'from a $70 budget pick to studio-quality condensers']);
repG(['desde un todoterreno económico de $70 hasta condensadores de calidad de estudio', 'desde una opción económica de $70 hasta condensadores de calidad de estudio']);

// xr18-vs-cq18t (EN heavy lifting; ES "hacen el trabajo duro" es idiomático, NO tocar)
repG(['handle the heavy lifting for specific sources', 'handle the setup for specific sources']);

// open-headphones (ES tank alemán)
repG(['diadema de acero aguantan como un tanque alemán', 'diadema de acero aguantan golpes y años de uso']);

// at2020-vs-p120
repG(['es el todoterreno neutro para voces e instrumentos acústicos', 'es la opción neutra y versátil para voces e instrumentos acústicos']);
repG(['Es el todoterreno más neutro para voces e instrumentos acústicos', 'Es la opción más neutra para voces e instrumentos acústicos']);

// best-audio-repair (siguiente nivel)
repG(['RX 12 es el siguiente nivel.', 'RX 12 es el paso siguiente.']);

// best-electric-guitars-2026 / pro-guitars ES intro
repG(['Para profesionales, músicos de sesión y todoterreno.', 'Para profesionales, músicos de sesión y quien cambia de género.']);

// vocal-plugins featuredSnippet (truncado + game-changer + navaja suiza)
repG(['only when they cross a threshold, which is a game-changer fo', 'only when they cross a threshold.']);
repG([' Pro-C 3 es un compresor transparente c', '']);
repG(['es la navaja suiza de los efectos para voces', 'es el kit completo de efectos para voces']);

/* ============ 3. products.json — restos propios ============ */
repP(['Built like a tank for the gigging musician.', 'Built solid for the gigging musician.']);
repP(['Robusto como un tanque, hecho para el músico de gira.', 'Sólido, hecho para el músico de gira.']);
repP(['It covers everything from blues to metal — a genuine pro-level workhorse.', 'It covers everything from blues to metal — a genuine pro-level guitar.']);
repP(['Cubre todo, del blues al metal — una auténtica todoterreno profesional por su precio.', 'Cubre todo, del blues al metal — una auténtica profesional por su precio.']);
repP(['A true studio workhorse.', 'A true studio guitar.']);
repP(['Una verdadera todoterreno de estudio.', 'Una verdadera guitarra de estudio.']);
repP(['A favorite of ambient, cinematic, and pop producers alike — a true secret weapon for creative sound design.',
      'A favorite of ambient, cinematic, and pop producers alike — a go-to effect for creative sound design.']);
repP(['un verdadero arma secreta para el diseño sonoro creativo', 'una pieza clave para el diseño sonoro creativo']);
repP(['balanced outputs in a 28 kg stage beast', 'balanced outputs in a 28 kg flagship']);
repP(['salidas balanceadas en una bestia de 28 kg', 'salidas balanceadas en un buque insignia de 28 kg']);
repP(['Indestructible alder workhorse with ceramic V3 P/J pickups', 'Indestructible alder bass with ceramic V3 P/J pickups']);
repP(['Compact delay powerhouse', 'Compact all-round delay']);
repP(['Delay compacto todoterreno', 'Delay compacto polivalente']);
repP(['Semiabierto clásico todoterreno', 'Semiabierto clásico polivalente']);
repP(['EDM production powerhouse', 'EDM production machine']);
repP(['"workhorse"', '"road-ready"']); // P631 badge
repP(['Dos canales combo mic/línea, streaming Bluetooth, soporte para mástil de 36 mm de doble inclinación y ángulo de monitor de 55 grados lo convierten en un todoterreno para aplicaciones de rango completo, satélite y monitor.',
      'Dos canales combo mic/línea, streaming Bluetooth, soporte para mástil de 36 mm de doble inclinación y ángulo de monitor de 55 grados lo convierten en un altavoz polivalente para aplicaciones de rango completo, satélite y monitor.']);

/* ============ guardar + informe ============ */
fs.writeFileSync(B + 'data/guides.json', rawG, 'utf8');
fs.writeFileSync(B + 'data/products.json', rawP, 'utf8');
console.log('guides OK: ' + okG + ' | FAIL: ' + failG.length);
failG.forEach(f => console.log('  G-FAIL: ' + f.slice(0, 90)));
console.log('products OK: ' + okP + ' | FAIL: ' + failP.length);
failP.forEach(f => console.log('  P-FAIL: ' + f.slice(0, 90)));
