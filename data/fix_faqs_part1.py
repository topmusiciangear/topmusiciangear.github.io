import json, re, sys

with open('guides.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

changes = 0

# Define all replacements as (pattern_regex, replacement_dict)
# where replacement_dict maps product_key -> new_text
# and product_key is matched by checking if it appears in the faq_a string

# Helper: find best matching key
def find_key(text, d):
    for k in d:
        if k in text:
            return k
    return None

# ===================== PATTERN 1: stands out as a leader =====================
pat1_en = re.compile(r'stands out as a leader in its category\. Its solid construction and reliable performance put it ahead of the competition in its price range\.')
pat1_es = re.compile(r'se destaca como líder en su categoría\. Su construcción sólida y rendimiento confiable lo ponen por encima de la competencia en su rango de precio\.')
rep1_en = {
    "Beyerdynamic DT 770 Pro": "delivers velour earpads and a rugged closed-back design with 250Ω drivers for detailed tracking — the studio standard for isolation and clarity since the 1980s.",
    "iZotope Ozone 12 Advanced": "uses AI-powered Master Assistant and stem EQ to analyze your mix and build a custom mastering chain — intelligent, fast, and surprisingly transparent.",
    "Universal Audio Apollo Twin X": "delivers real-time UAD DSP processing with Unison preamps that emulate classic Neve, API, and SSL consoles — pro conversion in a desktop format.",
    "Audio-Technica ATH-M50x": "offers 45mm large-aperture drivers with a collapsible design — the most versatile closed-back headphone for tracking, mixing, and portable use worldwide.",
    "KRK Rokit 7 G5": "features a Kevlar aramid-fiber woofer and front-firing bass port with built-in DSP EQ to tune the monitor to your room — the best-selling studio monitor for producers.",
    "Waves SSL G-Master Buss Compressor": "emulates the legendary SSL 4000 G-series bus compressor with automatic release and console-style metering — the glue that holds pro mixes together.",
    "Fender Stratocaster": "features three single-coil pickups, a synchronized tremolo bridge, and that unmistakable cut through any mix — the most imitated electric guitar design in history.",
    "FabFilter Total Bundle": "includes Pro-Q 4, Pro-C 3, Pro-L 2, Saturn 2, Timeless 3, and Volcano 3 — the gold standard suite for surgical EQ, compression, limiting, saturation, delay, and filtering.",
}
rep1_es = {
    "Beyerdynamic DT 770 Pro": "ofrece almohadillas de velour y diseño cerrado robusto con drivers de 250Ω — el estándar de estudio para aislamiento y claridad desde los años 80.",
    "iZotope Ozone 12 Advanced": "utiliza el Master Assistant con IA y ecualización por stems para analizar tu mezcla — masterización inteligente, rápida y transparente.",
    "Universal Audio Apollo Twin X": "ofrece procesamiento UAD DSP en tiempo real con preamplificadores Unison que emulan consolas Neve, API y SSL — conversión profesional en formato compacto.",
    "Audio-Technica ATH-M50x": "ofrece drivers de 45mm con diseño plegable — el auricular cerrado más versátil para grabación, mezcla y uso portátil.",
    "KRK Rokit 7 G5": "incluye woofer de Kevlar y puerto de graves frontal con ecualización DSP para ajustar el monitor a tu sala — el monitor más vendido entre productores.",
    "Waves SSL G-Master Buss Compressor": "emula el legendario compresor de bus SSL 4000 G-series — el pegamento que mantiene unidas las mezclas profesionales.",
    "Fender Stratocaster": "tiene tres pastillas de bobina simple y puente trémolo sincronizado — el diseño de guitarra eléctrica más imitado de la historia.",
    "FabFilter Total Bundle": "incluye Pro-Q 4, Pro-C 3, Pro-L 2, Saturn 2, Timeless 3 y Volcano 3 — la suite de referencia para ecualización, compresión y saturación quirúrgica.",
}

# ===================== PATTERN 2: is a solid option =====================
pat2_en = re.compile(r"is a solid option\. It performs well for its intended use case and offers distinct advantages if its specific strengths match what you need\.")
# Note: we'll handle Spanish separately below
rep2_en = {
    "Universal Audio Apollo Twin X": "excels at tracking with near-zero latency — its Unison preamps and onboard UAD plugins let you record through vintage compressor and EQ emulations in real time.",
    "RME Babyface Pro FS": "excels at rock-solid driver stability and pristine conversion quality — its SteadyClock FS jitter suppression ensures the cleanest signal path of any portable interface.",
    "Audient iD14 MkII": "excels at console-grade audio in a compact format — its Class-A mic preamps and JFET DI input deliver the same sound quality as Audient's $50,000 recording consoles.",
    "Sennheiser HD 600": "excels at natural, neutral frequency response — its open-back design and lightweight construction make it the reference standard for critical mixing with no coloration.",
    "Kali Audio LP-6 V2": "excels at room correction — its boundary EQ compensation adjusts for desk, wall, or corner placement using physical DIP switches, unique at this price point.",
    "Arturia KeyLab Essential 61 MkIII": "excels at DAW integration — its deep Ableton Live, Logic Pro, and FL Studio control with Analog Lab software gives you thousands of synth sounds out of the box.",
    "Ableton Live 12 Suite": "excels at real-time clip launching and arrangement — its Session View, Max for Live integration, and built-in instruments make it the ultimate DAW for electronic music production.",
    "Rode NT1-A": "excels at ultra-low-noise recording — its 4.5dBA self-noise and 1-inch diaphragm deliver pristine vocal and acoustic recordings rivaling mics at three times the price.",
    "Audio-Technica ATH-M50x": "excels at versatility — its collapsible design, detachable cable, and balanced sound make it the most popular do-everything headphone for tracking, mixing, and casual listening.",
    "Yamaha HS8": "excels at brutally honest monitoring — its white cone design and room control switches reveal every flaw in your mix, translating perfectly to consumer systems.",
    "FabFilter Total Bundle": "excels at surgical precision — its spectral EQ display, dynamic band processing, and transparent limiting set the industry benchmark for mixing and mastering plugins.",
    "iZotope Ozone 12 Advanced": "excels at AI-assisted mastering — its Master Assistant analyzes your mix and builds a custom chain with stem EQ, dynamic EQ, and intelligent limiting.",
    "Native Instruments Kontakt 8": "excels at sample-based instrument creation — its deep scripting engine, factory library, and open platform make it the industry standard for virtual instruments.",
    "Vox AC30": "excels at chime and headroom — its Top Boost channel and single 12\" speaker deliver that unmistakable British jangle that defined the sound of The Beatles and Queen.",
    "Ampeg PF-500 Portaflex": "excels at portable bass power — its 500-watt Class-D amplifier and legendary Ampeg preamp shape deliver warm, punchy tube-style tone in a lightweight package.",
    "Sennheiser XSW 2-825": "excels at entry-level wireless freedom — its true diversity reception and easy one-touch sync make it a reliable first wireless system for vocalists on a budget.",
    "Shure BLX288/PG58": "excels at dual-mic wireless simplicity — its two handheld transmitters and automatic frequency selection make setup fast for duos, interviews, and presenters.",
    "Sennheiser EW 100 G4-935": "excels at touring reliability — its rugged metal construction, 32 frequency banks, and wide 88MHz bandwidth deliver interference-free performance in challenging RF environments.",
    "Shure ULXD24/SM58": "excels at premium digital wireless — its Dante networking, wide 184MHz tuning range, and 22-hour battery life set the standard for professional touring and broadcast.",
    "Boss DD-8": "excels at delay versatility — its 11 delay modes from analog to shimmer, plus tap tempo and carryover, cover every delay sound needed for stage and studio.",
    "Yamaha DXR12mkII": "excels at powered PA performance — its 1100W Class-D amplifier, FIR-X tuning, and 132dB SPL deliver professional sound reinforcement in a portable enclosure.",
    "Avid Pro Tools Studio": "excels at professional recording and editing — its industry-standard timeline, clip-based automation, and ARA2 integration make it the DAW of choice for commercial studios worldwide.",
    "Celemony Melodyne 5": "excels at polyphonic pitch editing — its DNA Direct Note Access lets you edit individual notes within chords on polyphonic audio.",
    "FL Studio Producer Edition": "excels at pattern-based beat production — its step sequencer, piano roll, and lifetime free updates make it the most producer-friendly DAW for electronic and hip-hop music.",
    "SSL 2+ MKII": "excels at analog character — its 4K Legacy button engages a switchable EQ circuit inspired by SSL 4000 consoles, adding presence and punch to any recording.",
    "Sony MDR-7506": "excels at portable reference monitoring — its 40mm drivers and collapsible design deliver accurate mids and highs for under $100, trusted by broadcast engineers worldwide.",
    "MOTU M2": "excels at metering and conversion — its full-color LCD level display and ESS Sabre32 Ultra DAC offer conversion quality found in interfaces costing three times as much.",
    "Yamaha Pacifica 112V": "excels at budget versatility — its HSS pickup configuration, coil-split, and comfortable C-shaped neck deliver professional playability at an entry-level price.",
    "Fender Player Telecaster": "excels at straightforward rock-solid design — its bolt-on maple neck, two single-coil pickups, and legendary bridge deliver that unmistakable Tele twang and cutting presence.",
    "Genelec 8040B": "excels at reference-grade accuracy — its Minimum Diffraction Enclosure and Directivity Control Waveguide eliminate cabinet coloration, making it the choice of pro studios worldwide.",
    "Nord Stage 4 88": "excels at live performance versatility — its seamless layering of piano, organ, and synth engines with physical drawbars makes it the ultimate stage keyboard.",
    "Kali Audio LP-6 V2 (Kali)": "excels at budget room correction — its three-position boundary EQ and coaxial design deliver flat response even in challenging room placements.",
    "KRK Rokit 7 G5 (Rokit)": "excels at bass response and DSP room tuning — its Kevlar driver and front port with graphic EQ let you dial in accurate monitoring for any bedroom studio.",
    "Yamaha HS8 (HS)": "excels at honest translation — its NS-10-inspired white cone inherits the legacy of Yamaha's legendary studio monitors, brutal honesty in every frequency.",
}
