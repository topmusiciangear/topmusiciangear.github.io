import json, re

IN = "temp/enrich_batches/in_01.json"
OUT = "temp/enrich_batches/out_01.json"

ADD = {
166: ("Its short thirty-inch scale brings the frets closer together and gives the strings a looser feel that suits smaller hands. Notes bloom with short sustain, suiting folk and acoustic pop.",
      "Su escala corta de treinta pulgadas acerca los trastes y deja cuerdas más flojas, ideales para manos pequeñas. Las notas florecen con sustain corto para folk y pop acústico."),
512: ("Merging-derived conversion reaches 136 dBA up to 192 kHz, and dual headphone amps add crossfeed for monitoring. Monitor Mission scales immersive setups up to 22.2 with 128 AoIP sources.",
      "Su conversión de origen Merging alcanza 136 dBA hasta 192 kHz, y dos amplificadores de auriculares añaden crossfeed. Monitor Mission escala sistemas inmersivos hasta 22.2 con 128 fuentes AoIP."),
255: ("Sixteen sample tracks feed each pattern.",
      "Dieciséis pistas de sample alimentan cada patrón."),
617: ("It samples directly from a phone over USB-C, then twists grains into dense textures. Its polyphony stays limited, and the tiny pads resist advanced finger-drumming.",
      "Samplea directamente desde un móvil por USB-C y retuerce los granos hasta crear texturas densas. Su polifonía es limitada y los pads diminutos complican el finger-drumming avanzado."),
1038: ("It is built for any delivery where inter-sample peaks matter, keeping loudness transparent and free of audible distortion. Masters translate cleanly on every device, from earbuds to stadium systems.",
       "Sirve para entregas donde importan los picos entre muestras, con loudness limpia y sin distorsión. Los masters se traducen bien en auriculares y altavoces de estadio."),
26: ("Forward mids push vocals and dialogue to the front, so mouth clicks, harsh cuts and room tone jump out. Its fixed cable needs care, and the sound favours detail.",
     "Sus medios adelantados ponen voces y diálogos al frente, y los chasquidos saltan al editar. El cable fijo pide cuidado y el sonido revela más que relaja."),
431: ("The tight pattern rejects monitor wedges and cymbals, and the internal shockmount removes handling thumps without an external clip. A brighter modern presence helps the voice cut through guitars and brass.",
      "Su patrón cerrado deja fuera cuñas y platos, y la suspensión interna frena los golpes. Una presencia brillante ayuda a la voz frente a guitarras y metales."),
429: ("It records at 24-bit/48 kHz, while Blue VO!CE software adds voice effects and EQ. The built-in stand adjusts for angle, and the cardioid capsule suits streaming, podcasting and calls.",
      "Graba a 24 bits y 48 kHz, y Blue VO!CE añade EQ y efectos de voz. El soporte integrado se ajusta en ángulo."),
489: ("ToneCloud also includes dedicated bass presets.",
      "ToneCloud también incluye presets dedicados de bajo."),
1039: ("RePitch edits pitch, timing and formants precisely, while VocAlign matches doubles, harmonies and ad-libs in seconds. It suits pop, trap and R&B productions with dense stacked vocals.",
       "RePitch edita tono, timing y formantes con precisión, mientras VocAlign ajusta dobles, armonías y ad-libs en segundos. Encaja en pop, trap y R&B con voces apiladas."),
387: ("Five modes range from a tight studio to a large hall, each with its own character. Built-in EQ and modulation shape the ambience around drums and vocals.",
      "Cinco modos van del estudio cerrado a una sala grande, cada uno con su carácter. El EQ y la modulación integrados ajustan el ambiente."),
430: ("The box adds a tripod, and the cardioid capsule plugs into a PC or Mac without drivers. The boom arm feels light, and there is no XLR output.",
      "La caja añade un trípode, y la cápsula cardioide se conecta a PC o Mac sin drivers. El brazo se siente ligero y no hay salida XLR."),
17: ("TotalMix FX packs a full routing matrix with FX sends and submixes at zero latency. Class-leading round-trip latency suits demanding live performance and orchestral sessions.",
     "TotalMix FX ofrece una matriz de enrutamiento con envíos y submixes a latencia cero. Su latencia de ida y vuelta encaja en directos y sesiones orquestales."),
21: ("The folded diaphragm pushes air at high velocity, giving cymbals and transients notable speed and clarity. Three EQ Voicings and a front-firing port help near-wall placement.",
     "El diafragma plegado expulsa aire a gran velocidad y aporta nitidez. Tres Voicings de EQ y un puerto frontal ayudan cerca de la pared."),
432: ("Internal pop filtering and a hot output let close talkers skip an extra booster. It is a spoken-word tool rather than a singer's mic.",
      "El filtrado antipop interno y su salida alta permiten hablar de cerca sin booster adicional. Es una herramienta para voz hablada, no para cantantes ni instrumentos."),
513: ("Unison preamps cover Neve, API and Manley emulations, enabling near-zero-latency tracking through UAD plugins. Dual-crystal clocking reaches 130 dB of D/A dynamic range with very low distortion.",
      "Los previos Unison emulan Neve, API y Manley, con plugins UAD casi sin latencia. El reloj de doble cristal alcanza 130 dB en D/A con distorsión mínima."),
1001: ("Modulation sources can be dragged onto destinations, with curves and presets saved per patch. A gritty wavetable bass and a soft pad can share one patch.",
       "Las fuentes de modulación se arrastran a los destinos y los presets se guardan por parche. Un bajo áspero y un pad suave caben en el mismo parche."),
1002: ("It models the Moog ladder filter, the Juno chorus and the CS-80 peaks, with drifting oscillators. It suits techno and house yet demands heavy CPU.",
       "Modela el filtro de Moog, el chorus del Juno y los picos del CS-80, con osciladores que se desvían. Encaja en techno y house, pero exige CPU."),
1003: ("Lanes run in parallel, in series or split by velocity, each hosting wavetable, sample, FM or analog oscillators. Snapins double as modulators or processors for evolving pads and glitch textures.",
       "Los carriles van en paralelo, en serie o por velocidad, con ondas, samples, FM o analógico. Los snapins sirven como moduladores o procesadores para texturas."),
32: ("Saturation growls, delays wobble and pitch shifting turns vocals into instruments. With no EQ, compressor or limiter, it colours sound rather than anchoring a mix.",
     "La saturación ruge, los delays se tambalean y el pitch shifting transforma voces. No hay EQ, compresor ni limitador: aporta color, no base de mezcla."),
433: ("Switches on the body shape the voice before recording, and the shockmount keeps desk thumps out. One purchase covers USB today and XLR later for podcasters.",
      "Sus interruptores moldean la voz antes de grabar y la suspensión frena los golpes de mesa. Una sola compra cubre USB ahora y XLR más adelante."),
1010: ("It builds patterns around a chosen genre, tempo and complexity level, fitting the project quickly. Velocity adds human feel, while the variation system stops patterns from repeating.",
       "Indicando género, tempo y complejidad, genera patrones que encajan con el proyecto. La velocidad aporta sensación humana y la variación evita repeticiones."),
1032: ("Audio is analyzed into separate notes and syllables, each dragged by hand to reshape pitch and timing. Chords and polyphonic separation belong to the higher tiers.",
       "El audio se analiza en notas y sílabas que se arrastran para corregir tono y timing. Los acordes y la polifonía quedan para versiones superiores."),
1034: ("Pro-Q 3 brings dynamic EQ and a spectrum analyzer; Pro-L 2 pairs true-peak limiting with metering. Every parameter is set by ear in this manual toolkit.",
       "Pro-Q 3 aporta EQ dinámico y analizador, y Pro-L 2 suma limitación true peak y medición amplia. Cada parámetro se ajusta de oído en este kit manual."),
1: ("Its flatter response and gentler midrange suit blues, jazz and classic rock guitar amps. Low output demands plenty of clean gain, making an inline booster practically essential.",
    "Su respuesta plana y su menor énfasis en medios favorecen blues, jazz y rock. Su salida baja exige ganancia limpia y un booster casi imprescindible."),
7: ("Burstbuckers deliver a rich midrange growl with enough output to push amps into saturation. Set-neck construction with a long tenon helps notes ring and adds low-end definition.",
    "Las Burstbucker dan un gruñido rico en medios con salida para saturar el ampli. La construcción encolada sostiene las notas y añade definición en graves."),
}

data = json.load(open(IN, encoding="utf-8"))
out = []
problems = []
for item in data:
    i = item["id"]
    en, es = ADD[i]
    final_en = item["desc"] + " " + en
    final_es = item["desc_es"] + " " + es
    we, ws = len(final_en.split()), len(final_es.split())
    out.append({"id": i, "add_en": en, "add_es": es})
    flag = "" if 39 <= we <= 46 and 39 <= ws <= 46 else "  <<< OUT OF RANGE"
    if flag:
        problems.append((i, we, ws))
    print(f"{i:5} en={we:3} es={ws:3} add={len(en.split()):2}/{len(es.split()):2}{flag}")
    if not re.search(r"[.!?]$", en) or not re.search(r"[.!?]$", es):
        print("   BAD ENDING", i)

json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("\nwritten", OUT, "items:", len(out))
print("problems:", problems)
