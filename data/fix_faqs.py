import json, re

with open('guides.json', 'r', encoding='utf-8') as f:
    raw = f.read()

# ===================== HELPER =====================
def find_key(text, d):
    for k in d:
        if k.lower() in text.lower():
            return k
    return None

# ===================== PATTERN 1: stands out as a leader =====================
pat1_en = re.compile(r'stands out as a leader in its category\. Its solid construction and reliable performance put it ahead of the competition in its price range\.')
pat1_es = re.compile(r'se destaca como líder en su categoría\. Su construcción sólida y rendimiento confiable lo ponen por encima de la competencia en su rango de precio\.')

rep1_en = {
    "DT 770 Pro": "delivers velour earpads and a rugged closed-back design with 250Ω drivers — the studio standard for isolation since the 1980s.",
    "Ozone 12": "uses AI-powered Master Assistant and stem EQ to analyze your mix and build a custom mastering chain — intelligent, fast, and transparent.",
    "Apollo Twin X": "delivers real-time UAD DSP with Unison preamps that emulate Neve, API, and SSL consoles — pro conversion in a desktop format.",
    "ATH-M50x": "offers 45mm large-aperture drivers with a collapsible design — the most versatile closed-back headphone for tracking, mixing, and portable use.",
    "Rokit 7 G5": "features a Kevlar woofer and front-firing bass port with built-in DSP EQ to tune the monitor to your room — the best-selling studio monitor for producers.",
    "SSL G-Master": "emulates the legendary SSL 4000 G-series bus compressor — the glue that holds pro mixes together.",
    "Fender Stratocaster": "features three single-coil pickups and synchronized tremolo — the most imitated electric guitar design in history.",
    "FabFilter Total Bundle": "includes Pro-Q 4, Pro-C 3, Pro-L 2, Saturn 2, Timeless 3, and Volcano 3 — the gold standard suite for surgical EQ, compression, and limiting.",
}
rep1_es = {
    "DT 770 Pro": "ofrece almohadillas de velour y diseño cerrado robusto con drivers de 250Ω — el estándar de estudio para aislamiento desde los a\u00f1os 80.",
    "Ozone 12": "utiliza el Master Assistant con IA y ecualizaci\u00f3n por stems para masterizaci\u00f3n inteligente, r\u00e1pida y transparente.",
    "Apollo Twin X": "ofrece procesamiento UAD DSP con preamplificadores Unison que emulan consolas Neve, API y SSL — conversi\u00f3n profesional en formato compacto.",
    "ATH-M50x": "ofrece drivers de 45mm con dise\u00f1o plegable — el auricular cerrado m\u00e1s vers\u00e1til para grabaci\u00f3n, mezcla y uso port\u00e1til.",
    "Rokit 7 G5": "incluye woofer de Kevlar y puerto frontal con ecualizaci\u00f3n DSP para ajustar el monitor a tu sala — el monitor m\u00e1s vendido entre productores.",
    "SSL G-Master": "emula el legendario compresor de bus SSL 4000 G-series — el pegamento de las mezclas profesionales.",
    "Fender Stratocaster": "tiene tres pastillas de bobina simple y puente tr\u00e9molo — el dise\u00f1o de guitarra m\u00e1s imitado de la historia.",
    "FabFilter Total Bundle": "incluye Pro-Q 4, Pro-C 3, Pro-L 2, Saturn 2, Timeless 3 y Volcano 3 — la suite de referencia para ecualizaci\u00f3n y compresi\u00f3n quir\u00fargica.",
}

def rep1(text, lang='en'):
    d = rep1_en if lang == 'en' else rep1_es
    p = pat1_en if lang == 'en' else pat1_es
    m = p.search(text)
    if not m:
        return None
    before = text[:m.start()]
    after = text[m.end():]
    key = find_key(text, d)
    if not key:
        return None
    return before + d[key] + after

# ===================== APPLY =====================
count = 0
for fn in [pat1_en, pat1_es]:
    for m in fn.finditer(raw):
        count += 1

print(f"Found {count} generic patterns total")
