import json, re

# Load generated descriptions (already whole-sentence based)
gen={}
for rec in open('temp/generated_descs.txt',encoding='utf-8').read().split('\n\n'):
    m=re.match(r'(\d+) (desc|desc_es) len=(\d+)\n(.+)$', rec, re.S)
    if m:
        gen[(int(m.group(1)), m.group(2))]=m.group(4).strip()

overrides = {
(175,'desc'): "10-voice analog polysynth and faithful Prophet-5 reissue, with two CEM 3340 VCOs per voice, a switchable 24dB lowpass filter, vintage drift control and a 61-key Fatar keyboard.",
(175,'desc_es'): "Sintetizador analógico de 10 voces y reedición fiel del Prophet-5, con dos VCOs CEM 3340 por voz, filtro lowpass de 24dB conmutable, control vintage de drift y teclado Fatar de 61 teclas.",
(198,'desc'): "The flat-tuned member of Audio-Technica's M-Series: 40mm drivers with rare-earth magnets and CCAW voice coils deliver a neutral response for honest mixing decisions.",
(198,'desc_es'): "El miembro de la serie M de Audio-Technica con respuesta plana: drivers de 40mm con imanes de tierras raras y bobinas CCAW ofrecen una respuesta neutra para mezclar con honestidad.",
(199,'desc'): "A 3-way coaxial monitor that behaves as a true point source, with an 8-inch woofer, 4-inch midrange and 1-inch tweeter tri-amped at 140W for ruler-flat response and pin-point imaging.",
(199,'desc_es'): "Monitor coaxial de 3 vías que se comporta como una fuente puntual: woofer de 8 pulgadas, medio de 4 y tweeter de 1, triamplificados a 140W para una respuesta plana e imagen precisa.",
(237,'desc'): "Yamaha's extended low-frequency sub hits 30 Hz with 1600W and 136 dB, and adds D-XSUB modes plus a cardioid setting for cleaner stages.",
(237,'desc_es'): "El subwoofer de baja extendida de Yamaha llega a 30 Hz con 1600W y 136 dB, y añade modos D-XSUB más un ajuste cardioide para escenarios más limpios.",
(255,'desc'): "The most popular sampler in modern beat culture: the iconic 16-pad, battery-powered workflow plus a backlit LCD, 37 DJ-style effects, built-in mic and USB-C audio.",
(255,'desc_es'): "El sampler más popular de la cultura beat moderna: el icónico flujo de 16 pads con batería, pantalla LCD retroiluminada, 37 efectos estilo DJ, micrófono integrado y audio USB-C.",
(291,'desc'): "Audio-Technica's AT2020 studio condenser sound in a USB-C mic, with a hardware mix control, separate headphone level, silent touch mute and 24-bit/96kHz conversion.",
(291,'desc_es'): "El sonido del condensador AT2020 de Audio-Technica en un micrófono USB-C, con control de mezcla por hardware, nivel de auriculares independiente, mute táctil y conversión de 24 bits/96kHz.",
(312,'desc'): "PRS's flagship design in the accessible SE line: mahogany body with a carved flame maple top, wide-thin neck, 24 frets and 85/15 'S' humbuckers with coil-split.",
(312,'desc_es'): "El diseño insignia de PRS en la línea SE: cuerpo de caoba con tapa tallada de arce flameado, mástil Wide Thin, 24 trastes y humbuckers 85/15 'S' con coil-split.",
(427,'desc'): "The gateway into Audio-Technica's reference R-Series: open-back 40mm drivers, a wide natural soundstage and a featherlight 210g frame with velour pads.",
(427,'desc_es'): "La puerta de entrada a la serie de referencia R de Audio-Technica: drivers abiertos de 40mm, escena amplia y natural y un chasis ultraligero de 210g con almohadillas de terciopelo.",
(428,'desc'): "A starter favorite of the budget studio world: semi-open 50mm drivers with neodymium magnets, pronounced bass, clear highs and a self-adjusting headband.",
(428,'desc_es'): "Un favorito para empezar en el estudio económico: drivers semiabiertos de 50mm con imanes de neodimio, graves pronunciados, agudos claros y diadema autoajustable.",
(453,'desc'): "Style 42 at its most balanced: a solid spruce top with East Indian rosewood back and sides, abalone pearl trim and a modified low-oval neck that loves fingerstyle.",
(453,'desc_es'): "El estilo 42 en su expresión más equilibrada: tapa sólida de picea, fondo y aros de palo rosa de la India, fileteado de nácar y mástil low-oval modificado ideal para fingerstyle.",
(456,'desc'): "A warhorse reborn in Bozeman: the Historic 1942 Banner J-45 pairs a thermally aged Adirondack spruce top with hide-glue construction for a warm, romantic pre-war voice.",
(456,'desc_es'): "Un todoterreno renacido en Bozeman: la Historic 1942 Banner J-45 combina tapa de abeto Adirondack termotratado y construcción con cola de hueso para una voz cálida y romántica de preguerra.",
(458,'desc'): "The classic budget Les Paul: punchy humbuckers, a slim bolt-on neck and a lightweight solid mahogany body deliver thick, rock-ready tone at a fraction of a Gibson's price.",
(458,'desc_es'): "El Les Paul económico por excelencia: humbuckers contundentes, mástil fino atornillado y cuerpo ligero de caoba maciza ofrecen un tono grueso y listo para rock por una fracción del precio de una Gibson.",
(460,'desc'): "The best-value guitar in Ibanez's Artwood line: a solid okoume top and okoume back and sides deliver a warm, balanced dreadnought voice in an open-pore natural finish.",
(460,'desc_es'): "La guitarra con mejor relación calidad-precio de la serie Artwood: tapa sólida de okume y fondo y aros de okume ofrecen una voz dreadnought cálida y equilibrada con acabado de poro abierto.",
(467,'desc'): "The passive studio workhorse of Yamaha's BB 400 series: solid alder body, 5-piece maple/mahogany neck and YGD Custom V5 Alnico V pickups for the definitive P/J voice.",
(467,'desc_es'): "La bestia pasiva de estudio de la serie BB 400 de Yamaha: cuerpo sólido de aliso, mástil de 5 piezas de arce/caoba y pastillas YGD Custom V5 Alnico V para la voz P/J definitiva.",
(472,'desc'): "A spectral compressor for taming harsh resonances with a single control, smoothing vocals, guitars and the mix bus while keeping tone and dynamics intact.",
(472,'desc_es'): "Compresor espectral para domar resonancias duras con un solo control, suavizando voces, guitarras y el bus de mezcla sin alterar el tono ni la dinámica.",
(480,'desc'): "A Finnish 12-inch smart subwoofer with 400W of Class D power reaching 19 Hz, plus 7.1 bass management and GLM AutoCal room correction for large mixing rooms.",
(480,'desc_es'): "Subwoofer inteligente finlandés de 12 pulgadas con 400W Clase D que llega a 19 Hz, más gestión de graves 7.1 y corrección de sala GLM AutoCal para grandes salas de mezcla.",
(489,'desc'): "10 watts of full-range stereo in a 1.5 kg package, with TMA amp modeling, AI Smart Jam, 25,000+ ToneCloud presets and up to 8 hours of battery life.",
(489,'desc_es'): "10 vatios de estéreo de rango completo en un equipo de 1,5 kg, con modelado TMA, Smart Jam con IA, más de 25.000 presets en ToneCloud y hasta 8 horas de batería.",
(527,'desc'): "A generative delay and reverb powerhouse inspired by the Roland Space Echo, with a 16-step Echo sequencer, crystalline Space reverb, X-Y mixer and 125 presets.",
(527,'desc_es'): "Una potencia de delay y reverb generativos inspirada en el Roland Space Echo, con secuenciador Echo de 16 pasos, reverb Space cristalina, mezclador X-Y y 125 presets.",
(557,'desc'): "The stage-ready Katana 50: 50W through a custom 12-inch speaker, full GA-FC support, a dedicated Line Out, Stereo Expand and Power Amp In for modelers.",
(557,'desc_es'): "El Katana 50 listo para escenario: 50W por un altavoz de 12 pulgadas a medida, soporte GA-FC completo, salida de línea dedicada, Stereo Expand y Power Amp In para modeladores.",
(560,'desc'): "The entire M32 engine in one rack unit: 40 inputs and 25 buses over dual AES50, 8 true-stereo FX engines, 32x32 USB and Ultranet, with no local analog inputs.",
(560,'desc_es'): "Todo el motor M32 en una unidad de rack: 40 entradas y 25 buses por doble AES50, 8 motores FX estéreo reales, USB 32x32 y Ultranet, sin entradas analógicas locales.",
(1052,'desc'): "A pair of Alesis ELEVATE 4 studio monitors with a 4-inch woofer, 1-inch silk dome tweeter, 50W RMS of Class AB power and a front headphone jack.",
(1052,'desc_es'): "Un par de monitores Alesis ELEVATE 4 con woofer de 4 pulgadas, tweeter de seda de 1 pulgada, 50W RMS Clase AB y salida de auriculares frontal.",
(1053,'desc'): "Sennheiser's modern open-back studio reference: 38mm drivers, a wide and deep soundstage, and two sets of switchable earpads tuned for mixing or producing.",
(1053,'desc_es'): "La referencia abierta moderna de Sennheiser: drivers de 38mm, escena sonora amplia y profunda, y dos juegos de almohadillas intercambiables para mezclar o producir.",
}

data=json.load(open('data/products.json',encoding='utf-8'))
changed=0
for p in data:
    for f in ['desc','desc_es']:
        key=(p['id'],f)
        new=overrides.get(key) or gen.get(key)
        if new and new!=p.get(f):
            p[f]=new
            changed+=1
json.dump(data, open('data/products.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('changed',changed,'products',len(data))

# immediate mojibake check
sus=set('\u251c\u2502\u2551\u2592\u252c\u00c3\u00c2\ufffd\u00ae\u00a1')
bad=[(p['id'],f) for p in data for f in ['desc','desc_es'] if sus & set(p.get(f) or '')]
print('mojibake fields',len(bad), bad[:10])
# length stats
lens=sorted(len(p.get(f) or '') for p in data for f in ['desc','desc_es'])
print('min',lens[0],'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1])
