import json, io, re, os

BASE = r'C:/Users/Daniel/projects/topmusiciangear/'

def load(p):
    with io.open(BASE + p, 'r', encoding='utf-8') as f:
        return json.load(f)

def save(p, d):
    with io.open(BASE + p, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

NP = 'Not published'
NP_ES = 'No publicada'

# ================= PRODUCT ORDER (final 10) =================
ORDER = [
    (194, 'Shure MV7+', 'Shure MV7+'),
    (195, 'Elgato Wave:3', 'Elgato Wave:3'),
    (286, 'Audio-Technica AT2040USB', 'Audio-Technica AT2040USB'),
    (299, 'Sennheiser Profile Streaming Set', 'Sennheiser Profile Streaming Set'),
    (3,   'Rode NT1 5th Generation', 'Rode NT1 5ta Generacion'),
    (666, 'Rode NT-USB+', 'Rode NT-USB+'),
    (670, 'sE Electronics NEOM USB', 'sE Electronics NEOM USB'),
    (252, 'Rode PodMic USB', 'Rode PodMic USB'),
    (291, 'Audio-Technica AT2020USB-X', 'Audio-Technica AT2020USB-X'),
    (671, 'Samson G-Track Pro', 'Samson G-Track Pro'),
]

# ================= NEW / CORRECTED TABLE COLUMN DATA (indices 7,8,9) =================
# Each key = row label -> (value, value_es)
COL = {}

COL[7] = {  # Rode PodMic USB  (official RODE spec sheet, rode.com/en/microphones/podcast-and-streaming/podmic-usb)
    'Best For': ('Broadcast dynamic with USB-C plus XLR backup', 'Dinamico broadcast con USB-C y respaldo XLR'),
    'Estimated Price': ('~$199', '~$199'),
    'Type': ('Dynamic (moving coil), cardioid, USB-C + XLR', 'Dinamico (bobina movil), cardioide, USB-C + XLR'),
    'Polar Pattern': ('Cardioid', 'Cardioide'),
    'Frequency Response': ('20 Hz - 20 kHz', '20 Hz - 20 kHz'),
    'Sensitivity': ('-57 dB re 1 V/Pa (1.4 mV) +/-3 dB', '-57 dB re 1 V/Pa (1.4 mV) +/-3 dB'),
    'Self-Noise': ('Analogue 26 dBA / Digital 19 dBA', 'Analogico 26 dBA / Digital 19 dBA'),
    'Max SPL': ('148 dB SPL', '148 dB SPL'),
    'Output Impedance': ('460 ohm (XLR)', '460 ohm (XLR)'),
    'Signal-to-Noise Ratio': (NP, NP_ES),
    'Dynamic Range': (NP, NP_ES),
    'THD at Max SPL': (NP, NP_ES),
    'Capsule / Diaphragm': ('Moving-coil dynamic capsule', 'Capsula dinamica de bobina movil'),
    'Pad & High-Pass Filter': (NP, NP_ES),
    'Phantom Power': ('Not required (dynamic)', 'No requiere alimentacion (dinamico)'),
    'Dimensions': ('123 x 109 x 110 mm', '123 x 109 x 110 mm'),
    'Weight': ('900 g', '900 g'),
}

COL[8] = {  # Audio-Technica AT2020USB-X (official AT spec table)
    'Best For': ('Studio condenser sound with a real headphone mix control', 'Sonido de condensador de estudio con control de mezcla en auriculares'),
    'Estimated Price': ('~$169', '~$169'),
    'Type': ('Condenser (fixed-charge backplate), cardioid, USB-C', 'Condensador (placa posterior de carga fija), cardioide, USB-C'),
    'Polar Pattern': ('Cardioid', 'Cardioide'),
    'Frequency Response': ('20 - 20,000 Hz', '20 - 20.000 Hz'),
    'Sensitivity': (NP, NP_ES),
    'Self-Noise': (NP, NP_ES),
    'Max SPL': (NP, NP_ES),
    'Output Impedance': (NP, NP_ES),
    'Signal-to-Noise Ratio': (NP, NP_ES),
    'Dynamic Range': (NP, NP_ES),
    'THD at Max SPL': (NP, NP_ES),
    'Capsule / Diaphragm': ('Permanently polarized condenser', 'Condensador polarizado permanentemente'),
    'Pad & High-Pass Filter': (NP, NP_ES),
    'Phantom Power': ('USB power (5V DC)', 'Alimentacion USB (5V DC)'),
    'Dimensions': ('142 mm long, 52 mm max body diameter', '142 mm de largo, 52 mm de diametro maximo'),
    'Weight': ('Approx. 373 g (without stand)', 'Aprox. 373 g (sin soporte)'),
}

COL[9] = {  # Samson G-Track Pro (official Samson spec table)
    'Best For': ('Mic, monitor mixer and instrument input in one box', 'Microfono, mezclador de monitoreo y entrada de instrumento en un solo equipo'),
    'Estimated Price': ('~$149', '~$149'),
    'Type': ('Condenser (back-electret), USB', 'Condensador (back-electret), USB'),
    'Polar Pattern': ('Cardioid, Bidirectional (Figure-8), Omnidirectional', 'Cardioide, Bidireccional (Figura-8), Omnidireccional'),
    'Frequency Response': ('50 Hz - 20 kHz', '50 Hz - 20 kHz'),
    'Sensitivity': ('+6 dB FS/Pa (all polar patterns)', '+6 dB FS/Pa (todos los patrones polares)'),
    'Self-Noise': (NP, NP_ES),
    'Max SPL': ('120 dB', '120 dB'),
    'Output Impedance': ('Headphone output 16 ohm', 'Salida de auriculares 16 ohm'),
    'Signal-to-Noise Ratio': (NP, NP_ES),
    'Dynamic Range': (NP, NP_ES),
    'THD at Max SPL': (NP, NP_ES),
    'Capsule / Diaphragm': ('1 inch (25 mm) diaphragm, 3 micron', 'Diafragma de 1 pulgada (25 mm), 3 micras'),
    'Pad & High-Pass Filter': (NP, NP_ES),
    'Phantom Power': ('USB powered', 'Alimentacion USB'),
    'Dimensions': ('116 mm x 268.5 mm diameter', '116 mm x 268,5 mm de diametro'),
    'Weight': ('1.6 kg', '1,6 kg'),
}

# ================= SECTIONS =================
SEC_PODMIC = {
    "heading": "Rode PodMic USB: The Broadcast Mic That Escaped the Interface",
    "heading_es": "Rode PodMic USB: el microfono broadcast que se libero de la interfaz",
    "content": "<p><strong>The Rode PodMic USB is the rare broadcast dynamic that records straight into your computer and still keeps its XLR output.</strong> Rode loads the digital path with their high-gain Revolution Preamp and on-board APHEX processing, so the USB signal is already broadcast-ready at 24-bit/48kHz, while the 3-pin XLR lets the same mic move onto a studio preamp later. The integrated swing mount holds it at mouth height on any desk, and both an internal pop filter and an external one come in the box.</p>",
    "content_es": "<p><strong>El Rode PodMic USB es ese microfono dinamico broadcast raro que graba directo al ordenador y aun asi conserva su salida XLR.</strong> Rode carga lavia digital con su preamp Revolution de alta ganancia y procesamiento APHEX integrated, asi que la senal USB ya sale lista para broadcast a 24-bit/48kHz, mientras que el XLR de 3 pines permite llevar ese mismo microfono a un preamp de estudio mas adelante. El soporte basculante integrado lo mantiene a la altura de la boca en cualquier escritorio, y tanto el filtro antipop interno como uno externo vienen en la caja.</p>",
    "products": [252],
}

SEC_AT2020X = {
    "heading": "Audio-Technica AT2020USB-X: A Real Mix Knob on a Condenser",
    "heading_es": "Audio-Technica AT2020USB-X: una perilla de mezcla de verdad en un condensador",
    "content": "<p><strong>The AT2020USB-X is the studio AT2020 condenser rebuilt for creators, and its standout feature is the mix control.</strong> Instead of a mute-only headphone jack, Audio-Technica gave it a headphone level knob plus a mix knob that blends your live mic signal with computer audio at whatever ratio you like - no software mixer required. Conversion runs 16 or 24-bit at up to 96 kHz, the mute is a silent touch-sensitive button, and the custom AT8702 desk stand, threaded adapter and 2 m USB-C cable all ship in the box.</p>",
    "content_es": "<p><strong>El AT2020USB-X es el condensador de estudio AT2020 reconstruido para creadores, y su rasgo estrella es el control de mezcla.</strong> En vez de una salida de auriculares que solo silencia, Audio-Technica le dio una perilla de nivel de auriculares y otra perilla de mezcla que combina la senal del microfono con el audio del ordenador en la proporcion que quieras, sin necesidad de un mezclador por software. La conversion va de 16 a 24 bits hasta 96 kHz, el mute es un boton tactil silencioso, y el soporte de escritorio AT8702, el adaptador de rosca y el cable USB-C de 2 m vienen incluidos.</p>",
    "products": [291],
}

SEC_SAMSON = {
    "heading": "Samson G-Track Pro: Mic, Monitor Mixer and Hi-Z Input in One",
    "heading_es": "Samson G-Track Pro: microfono, mezclador de monitoreo y entrada Hi-Z en uno",
    "content": "<p><strong>The Samson G-Track Pro is built around a 1-inch back-electret condenser with three switchable polar patterns - cardioid, figure-8 and omnidirectional.</strong> What sets it apart is the instrument input: a 1/4-inch 1 megaohm jack that lets you plug a guitar or bass in beside the mic and record both channels at once, with the headphone output driving the 3.5 mm jack at 83 mW into 32 ohm. Conversion is 16 or 24-bit over USB, and the body is a substantial 1.6 kg rather than the usual plastic desktop cylinder.</p>",
    "content_es": "<p><strong>El Samson G-Track Pro se construye sobre un condensador back-electret de 1 pulgada con tres patrones polares conmutables: cardioide, figura-8 y omnidireccional.</strong> Lo que lo distingue es la entrada de instrumento: un jack de 1/4 pulgada de 1 megaohmio que te deja enchufar una guitarra o un bajo junto al microfono y grabar los dos canales a la vez, con la salida de auriculares alimentando el jack de 3,5 mm a 83 mW sobre 32 ohmios. La conversion es de 16 o 24 bits por USB, y el cuerpo es un bloque firme de 1,6 kg en vez del habitual cilindro de plastico de escritorio.</p>",
    "products": [671],
}

# ================= VPC =================
VPC_PODMIC = {
    "name": "Rode PodMic USB",
    "name_es": "Rode PodMic USB",
    "pros": [
        "The only mic here that keeps a 3-pin XLR output alongside USB, so you can move it to a studio preamp later without changing mics",
        "Rode's high-gain Revolution Preamp plus on-board APHEX DSP run inside the mic, no software effects chain needed",
        "148 dB max SPL - the highest headroom of any dynamic in this guide",
        "Integrated swing mount plus both an internal and an external pop filter in the box",
        "Digital self-noise of 19 dBA is remarkably low for a dynamic broadcast mic",
        "Works on Windows, Mac, iOS and Android over USB-C"
    ],
    "pros_es": [
        "El unico microfono de esta lista que mantiene su salida XLR de 3 pines junto al USB, asi que puedes llevarlo despues a un preamp de estudio sin cambiar de microfono",
        "El preamp Revolution de alta ganancia de Rode y el DSP APHEX integrado trabajan dentro del microfono, sin cadena de efectos por software",
        "148 dB de SPL maximo: el margen dinamico mas amplio de todos los dinamicos de esta guia",
        "Soporte basculante integrado, mas filtro antipop interno y externo en la caja",
        "El ruido digital de 19 dBA es Yeh muy bajo para un microfono dinamico broadcast",
        "Funciona en Windows, Mac, iOS y Android por USB-C"
    ],
    "cons": [
        "Cardioid only - no omnidirectional or figure-8 option like the Samson G-Track Pro",
        "24-bit/48kHz only; there is no 96 kHz or 32-bit float mode, so it is not the choice for hi-res capture",
        "At 900 g it is the second-heaviest mic in this guide and needs a proper arm or the included mount",
        "Headphone output is 3.5 mm rather than a studio-style 1/4-inch jack",
        "Rode Connect and the other Rode apps are needed to unlock the deeper DSP and routing options"
    ],
    "cons_es": [
        "Solo cardioide: sin opcion omnidireccional ni figura-8 como el Samson G-Track Pro",
        "Solo 24-bit/48kHz; no tiene modo de 96 kHz ni 32 bits flotantes, asi que no es la opcion para captura en alta resolucion",
        "Con 900 g es el segundo microfono mas pesado de esta guia y necesita un brazo serio o el soporte incluido",
        "La salida de auriculares es de 3,5 mm en lugar del jack de 1/4 pulgada de estudio",
        "Rode Connect y el resto de apps de Rode hacen falta para abrir las opciones de DSP y ruteo"
    ],
}

VPC_AT2020X = {
    "name": "Audio-Technica AT2020USB-X",
    "name_es": "Audio-Technica AT2020USB-X",
    "pros": [
        "The mix control blends mic and computer playback in hardware - no mixer app needed to hear yourself with music",
        "Separate headphone level knob plus silent touch-sensitive mute on the body",
        "24-bit conversion up to 96 kHz, wider than the 48 kHz ceiling of the Rode PodMic USB",
        "Award-winning AT2020 studio capsule, so it does not sound like a typical USB mic",
        "Comes as a complete kit: custom AT8702 desk stand, 3/8-to-5/8 adapter and 2 m USB-C cable",
        "Cardioid pickup keeps room noise down without the processing artefacts a noise gate leaves behind"
    ],
    "pros_es": [
        "La perilla de mezcla combina microfono y reproduccion del ordenador en hardware: no hace falta app de mezclacion para oirte con musica",
        "Perilla de nivel de auriculares aparte y mute tactil silencioso en el cuerpo",
        "Conversion de 24 bits hasta 96 kHz, mas amplia que el techo de 48 kHz del Rode PodMic USB",
        "Capsula de estudio AT2020 premiada, asi que no suena como un microfono USB tipico",
        "Viene como kit completo: soporte de escritorio AT8702, adaptador 3/8-a-5/8 y cable USB-C de 2 m",
        "La captacion cardioide mantiene bajo el ruido de la habitacion sin los artefactos que deja un noise gate"
    ],
    "cons": [
        "Audio-Technica does not publish sensitivity, self-noise or max SPL for this model, so headroom is hard to compare on paper",
        "No XLR output and no digital signal processing on board - unlike the Rode PodMic USB",
        "The 142 mm body is tall for a desk stand; a boom arm gives you a much better angle",
        "Condenser capsule picks up keyboard clicks, room rumble and HVAC noise, so it needs a treated room",
        "Recents models push 32-bit float, which the AT2020USB-X does not offer"
    ],
    "cons_es": [
        "Audio-Technica no publica sensibilidad, ruido propio ni SPL maximo para este modelo, asi que el margen dinamico es dificil de comparar en papel",
        "Sin salida XLR y sin procesamiento digital a bordo, al contrario que el Rode PodMic USB",
        "El cuerpo de 142 mm es alto para un soporte de escritorio; un brazo articulado te dara un angulo mucho mejor",
        "La capsula de condensador capta clics de teclado, retumbeo de la habitacion y ruido del clima, asi que pide una habitacion tratada",
        "Los modelos recientesoppyLament_SHIFT admiten 32 bits flotantes, algo que el AT2020USB-X no ofrece"
    ],
}

VPC_SAMSON = {
    "name": "Samson G-Track Pro",
    "name_es": "Samson G-Track Pro",
    "pros": [
        "Only mic in this guide with true multi-pattern switching: cardioid, figure-8 and omnidirectional",
        "1/4-inch 1 megaohm instrument input records guitar or bass alongside the mic on two channels at once",
        "1-inch back-electret capsule with a 3 micron diaphragm captures far more detail than a typical USB dynamic",
        "Onboard monitor mixer plus 83 mW headphone output into 32 ohm, enough to drive real studio headphones",
        "16 or 24-bit USB conversion with no software layer to install",
        "Substantial 1.6 kg metal body that will not wobble on a busy desk"
    ],
    "pros_es": [
        "El unico microfono de esta lista con真正的 conmutacion multipatron de verdad: cardioide, figura-8 y omnidireccional",
        "Su entrada de instrumento de 1/4 pulgada y 1 megaohmio graba guitarra o bajo junto al microfono en dos canales a la vez",
        "La capsula back-electret de 1 pulgada con diafragma de 3 micras capta mucho mas detalle que un dinamico USB tipico",
        "Mezclador de monitoreo integrado y salida de auriculares de 83 mW sobre 32 ohmios, suficiente para auriculares de estudio reales",
        "Conversion USB de 16 o 24 bits sin capa de software que instalar",
        "Cuerpo de metal firme de 1,6 kg que no se mueve en un escritorio con actividad"
    ],
    "cons": [
        "Response bottoms out at 50 Hz rather than 20 Hz, so it will not capture the low end of a bass guitar fully",
        "Samson does not publish a sample rate for the USB converter, so 96 kHz is not a documented option",
        "There is no XLR output and no line output - the headphone jack is your only monitor path",
        "At 1.6 kg and 268 mm tall it needs real desk space or a sturdy boom arm",
        "Older on-board conversion and no companion app, so no clip recovery if a take runs hot"
    ],
    "cons_es": [
        "La respuesta empieza en 50 Hz en vez de 20 Hz, asi que no capta del todo los graves de un bajo electrico",
        "Samson no publica la tasa de muestreo del convertidor USB, de modo que 96 kHz no es una opcion documentada",
        "No tiene salida XLR ni salida de linea: el jack de auriculares es tu unica via de monitoreo",
        "Con 1,6 kg y 268 mm de alto necesita espacio de escritorio de verdad o un brazo resistente",
        "Conversion antigua a bordo y sin app acompanante, asi que no hay recuperacion de clips si una toma se pasa"
    ],
}

# ================= SCRIPT =================
guides = load('data/guides.json')
g = [x for x in guides if x['id'] == 'usb-mics'][0]

# ---- columns ----
g['productTable']['columns'] = [{'title': t, 'title_es': te} for (_i, t, te) in ORDER]

# ---- rows: keep 0..6, replace index 7..9 ----
for r in g['productTable']['rows']:
    lbl = r['label']
    vals = r['values']
    vals = vals[:7]
    for idx in (7, 8, 9):
        v, ves = COL[idx][lbl]
        vals.append({'value': v, 'value_es': ves})
    r['values'] = vals

# ---- sections: keep 0..6, replace 7, 8, append 9 ----
secs = g['sections'][:7] + [SEC_PODMIC, SEC_AT2020X, SEC_SAMSON]
g['sections'] = secs

# ---- featuredProducts ----
g['featuredProducts'] = [i for (i, _t, _te) in ORDER]

# ---- VPC: keep 0..6, replace 7..8, append 9 ----
vpc = g['verdictProsCons'][:7] + [VPC_PODMIC, VPC_AT2020X, VPC_SAMSON]
g['verdictProsCons'] = vpc

# ---- FAQs (featuredSnippet) ----
fs = g['featuredSnippet']
fs['faq_a1_en'] = ("It depends on your setup. The <strong>Shure MV7+</strong> is best for broadcast-style voice with auto-level and XLR backup. "
    "The <strong>Elgato Wave:3</strong> wins for software mixing via Wave Link. The <strong>Audio-Technica AT2040USB</strong> is the best budget dynamic for noisy rooms. "
    "The <strong>Sennheiser Profile Streaming Set</strong> is the most complete plug-and-play kit with hardware controls. The <strong>Rode NT1 5th Generation</strong> gives the cleanest condenser vocal detail. "
    "The <strong>Rode NT-USB+</strong> upgrades the classic Yeti with internal APHEX DSP. The <strong>sE Electronics NEOM USB</strong> adds hardware mixer controls without a separate interface. "
    "The <strong>Rode PodMic USB</strong> is the only one that keeps an XLR output you can still use later. The <strong>Audio-Technica AT2020USB-X</strong> gives you a real mix knob for blending mic and computer audio. "
    "The <strong>Samson G-Track Pro</strong> is the one that records an instrument alongside your voice.")
fs['faq_a1_es'] = ("Depende de tu setup. El <strong>Shure MV7+</strong> es el mejor para voz broadcast con auto-nivel y respaldo XLR. "
    "El <strong>Elgato Wave:3</strong> gana por mezcla por software con Wave Link. El <strong>Audio-Technica AT2040USB</strong> es el mejor dinamico economico para habitaciones ruidosas. "
    "El <strong>Sennheiser Profile Streaming Set</strong> es el kit conectar-y-usar mas completo con controles fisicos. El <strong>Rode NT1 5th Generation</strong> da el detalle vocal de condensador mas limpio. "
    "El <strong>Rode NT-USB+</strong> mejora el Yeti clasico con DSP APHEX interno. El <strong>sE Electronics NEOM USB</strong> anade controles de mezclador en hardware sin interfaz aparte. "
    "El <strong>Rode PodMic USB</strong> es el unico que conserva una salida XLR que podras seguir usando despues. El <strong>Audio-Technica AT2020USB-X</strong> te da una perilla de mezcla real para combinar microfono y audio del ordenador. "
    "El <strong>Samson G-Track Pro</strong> es el que graba un instrumento junto a tu voz.")
fs['faq_a3_en'] = ("The <strong>Sennheiser Profile Streaming Set</strong> has physical gain, mix and headphone knobs plus a mute button with LED ring. "
    "The <strong>sE Electronics NEOM USB</strong> goes further with three independent analog knobs: Gain, Headphone Volume and Playback Mix. "
    "The <strong>Rode NT-USB+</strong> has gain and headphone volume. The <strong>Audio-Technica AT2020USB-X</strong> has a headphone level knob plus a mix knob, but no gain control in hardware. "
    "The <strong>Samson G-Track Pro</strong> puts instrument and monitor control on the desk with the mic.")
fs['faq_a3_es'] = ("El <strong>Sennheiser Profile Streaming Set</strong> tiene perillas fisicas de ganancia, mezcla y auriculares mas boton de mute con anillo LED. "
    "El <strong>sE Electronics NEOM USB</strong> va mas alla con tres perillas analogicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproduccion. "
    "El <strong>Rode NT-USB+</strong> tiene ganancia y volumen de auriculares. El <strong>Audio-Technica AT2020USB-X</strong> tiene perilla de nivel de auriculares y perilla de mezcla, pero sin control de ganancia en hardware. "
    "El <strong>Samson G-Track Pro</strong> pone el control de instrumento y de monitoreo en el escritorio junto al microfono.")
fs['faq_a4_en'] = ("Yes. All ten microphones use standard 5/8-inch threading or ship with a 3/8-to-5/8 adapter, so they work with any standard boom arm. "
    "The <strong>Audio-Technica AT2020USB-X</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Samson G-Track Pro</strong> include desk stands that also mount on a boom arm. "
    "The <strong>Rode PodMic USB</strong> uses its own integrated swing mount instead, so it needs no adapter at all.")
fs['faq_a4_es'] = ("Si. Los diez microfonos usan rosca estandar de 5/8 pulgadas o incluyen adaptador 3/8-a-5/8, asi que funcionan con cualquier brazo articulado estandar. "
    "El <strong>Audio-Technica AT2020USB-X</strong>, el <strong>sE Electronics NEOM USB</strong> y el <strong>Samson G-Track Pro</strong> incluyen soportes de escritorio que tambien se montan en un brazo. "
    "El <strong>Rode PodMic USB</strong> usa su propio soporte basculante integrado, asi que no necesita adaptador.")
fs['faq_a5_en'] = ("For podcasting, prioritize voice clarity: <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> and <strong>Audio-Technica AT2020USB-X</strong>. "
    "For streaming with hardware controls and low latency: <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Elgato Wave:3</strong>. "
    "For noisy rooms on a budget: <strong>Audio-Technica AT2040USB</strong>. For music, the <strong>Samson G-Track Pro</strong> and the <strong>Rode PodMic USB</strong> are the pair that handles both voice and instrument.")
fs['faq_a5_es'] = ("Para podcasting, prioriza la claridad de voz: <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> y <strong>Audio-Technica AT2020USB-X</strong>. "
    "Para streaming con controles en hardware y baja latencia: <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong> y <strong>Elgato Wave:3</strong>. "
    "Para habitaciones ruidosas con presupuesto limitado: <strong>Audio-Technica AT2040USB</strong>. Para musica, el <strong>Samson G-Track Pro</strong> y el <strong>Rode PodMic USB</strong> son la pareja que resuelve voz e instrumento.")

# ---- Conclusion EN ----
g['conclusion'] = ("The best USB stream mic is the one that fits your room and your setup today. If you want the characteristic Shure broadcast sound with a single USB cable and no gain issues, get the <strong>Shure MV7+</strong>. "
    "If your room is quiet and you want detailed condenser sound with free mixing software, get the <strong>Elgato Wave:3</strong>. If you want a budget dynamic that reduces background noise, get the <strong>Audio-Technica AT2040USB</strong>. "
    "If you want the most complete plug-and-play package with hardware controls, get the <strong>Sennheiser Profile Streaming Set</strong>. If you want maximum vocal detail for singing or ASMR in a treated room, the <strong>Rode NT1 5th Generation</strong> delivers. "
    "For streamers upgrading from the classic Yeti, the <strong>Rode NT-USB+</strong> brings internal APHEX DSP and 24-bit/48kHz conversion. If you need hardware mixer control without a separate interface, the <strong>sE Electronics NEOM USB</strong> is the missing link. "
    "If you plan to move to a studio preamp someday, the <strong>Rode PodMic USB</strong> is the only mic here that keeps its XLR output. If you want a studio condenser with a real mix knob to hear yourself over music, the <strong>Audio-Technica AT2020USB-X</strong> does that in hardware. "
    "And for the most versatile desktop box, the <strong>Samson G-Track Pro</strong> pairs three polar patterns with an instrument input so you can record voice and guitar at once. "
    "Every one of these ten is a professional, stream-ready USB microphone - start with the one that matches your workflow. "
    "<p><a href=\"/guides/best-microphone.html\" class=\"guide-link-btn\">Best Microphone for Vocals &amp; Home Recording</a> <a href=\"/guides/budget-mics.html\" class=\"guide-link-btn\">Best Budget Microphones</a> <a href=\"/guides/best-mic-for-podcasting.html\" class=\"guide-link-btn\">Best Podcast Mic</a></p>")

# ---- Conclusion ES ----
g['conclusion_es'] = ("El mejor microfono USB para streaming es el que se ajuste a tu habitacion y a tu forma de trabajar. Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el <strong>Shure MV7+</strong>. "
    "Si tu habitacion es tranquila y quieres un sonido de condensador detallado con software de mezcla gratuito, el <strong>Elgato Wave:3</strong>. Si necesitas un dinamico que corte el ruido de fondo, el <strong>Audio-Technica AT2040USB</strong>. "
    "Si quieres el paquete conectar y usar mas completo con controles fisicos, el <strong>Sennheiser Profile Streaming Set</strong>. Y si buscas el maximo detalle vocal para cantar o ASMR en un espacio tratado, el <strong>Rode NT1 5th Generation</strong> cumple. "
    "Para streamers que vienen del Yeti clasico, el <strong>Rode NT-USB+</strong> aporta DSP APHEX interno y conversion 24-bit/48kHz. Si necesitas control de mezclador en hardware sin interfaz aparte, el <strong>sE Electronics NEOM USB</strong> es el eslabon perdido. "
    "Si algun dia piensas pasar a un preamp de estudio, el <strong>Rode PodMic USB</strong> es el unico de esta lista que conserva su salida XLR. Si quieres un condensador de estudio con una perilla de mezcla de verdad para oirte por encima de la musica, el <strong>Audio-Technica AT2020USB-X</strong> lo hace en hardware. "
    "Y para el equipo de escritorio mas versatile, el <strong>Samson G-Track Pro</strong> combina tres patrones polares con entrada de instrumento para grabar voz y guitarra a la vez. "
    "Los diez son microfonos USB profesionales, listos para streaming: empieza con el que mejor se adapte a tu forma de trabajar. "
    "<p><a href=\"/guides/best-microphone_es.html\" class=\"guide-link-btn\">Mejor Microfono para Voces y Grabacion Casera</a> <a href=\"/guides/budget-mics_es.html\" class=\"guide-link-btn\">Mejores Microfonos Economicos</a> <a href=\"/guides/best-mic-for-podcasting_es.html\" class=\"guide-link-btn\">Mejor Microfono para Podcast</a></p>")

save('data/guides.json', guides)

# ================= PRODUCTS FIXES =================
prods = load('data/products.json')
by = {p['id']: p for p in prods}

# 252 Rode PodMic USB: 32-bit float is FALSE (official: 24-bit/48kHz, APHEX, XLR+USB)
p = by[252]
p['desc'] = ("Rode's PodMic USB pairs the broadcast sound of the classic dynamic PodMic with both XLR and USB-C outputs, so it works straight into a laptop or phone without an interface. "
    "It keeps the integrated swing mount and internal pop filter, adds a zero-latency headphone output with level control, and runs Rode's high-gain Revolution Preamp plus on-board APHEX DSP at 24-bit/48kHz.")
p['desc_es'] = ("El PodMic USB de Rode combina el sonido broadcast del clasico PodMic dinamico con salidas XLR y USB-C, asi que funciona directo a un portatil o telefono sin interfaz. "
    "Mantiene el soporte basculante integrado y el filtro antipop interno, anade salida de auriculares sin latencia con control de nivel, y trabaja con el preamp Revolution de alta ganancia de Rode y DSP APHEX a bordo a 24-bit/48kHz.")
p['oos'] = ['zzounds']

# 291 AT2020USB-X: MS and Andertons links pointed at the XP (different product) -> remove
p = by[291]
for k in ('musicstore', 'andertons'):
    if k in p.get('stores', {}):
        del p['stores'][k]
p['desc'] = ("The AT2020USB-X brings Audio-Technica's studio AT2020 condenser sound to USB-C. Its standout feature is a real mix control that blends your mic with computer audio in hardware, plus a separate headphone level knob and a silent touch mute. "
    "24-bit conversion up to 96 kHz, cardioid pickup, and the custom AT8702 desk stand, threaded adapter and 2 m USB-C cable are all included.")
p['desc_es'] = ("El AT2020USB-X lleva el sonido del condensador de estudio AT2020 de Audio-Technica al USB-C. Su rasgo estrella es un control de mezcla real que combina tu microfono con el audio del ordenador en hardware, mas una perilla aparte de nivel de auriculares y un mute tactil silencioso. "
    "Conversion de 24 bits hasta 96 kHz, captacion cardioide, y vienen incluidos el soporte de escritorio AT8702, el adaptador de rosca y el cable USB-C de 2 m.")

# 671 Samson G-Track Pro: official specs + no fabricated store links
p = by[671]
p['img'] = 'https://storage.googleapis.com/samson-production/uploads/original_images/G-Track-Pro-HO.jpg'
p['desc'] = ("The Samson G-Track Pro is a USB condenser microphone with a 1-inch back-electret capsule, three switchable polar patterns (cardioid, figure-8, omnidirectional) and a 1/4-inch instrument input so you can record guitar or bass alongside your voice. "
    "16 or 24-bit USB conversion, an onboard monitor mixer and a 3.5 mm headphone output at 83 mW into 32 ohm. Big 1.6 kg metal body.")
p['desc_es'] = ("El Samson G-Track Pro es un microfono condensador USB con capsula back-electret de 1 pulgada, tres patrones polares conmutables (cardioide, figura-8, omnidireccional) y entrada de instrumento de 1/4 pulgada para grabar guitarra o bajo junto a tu voz. "
    "Conversion USB de 16 o 24 bits, mezclador de monitoreo integrado y salida de auriculares de 3,5 mm a 83 mW sobre 32 ohmios. Cuerpo grande de metal de 1,6 kg.")
p['stores'] = {}
p['oos'] = ['amazon', 'zzounds', 'andertons', 'gear4music', 'musicstore', 'reverb']
p['excludeStores'] = []

save('data/products.json', prods)
print('guides.json + products.json written OK')