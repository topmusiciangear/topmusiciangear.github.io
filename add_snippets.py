import re, os, json

guides_dir = r"C:\Users\Daniel\projects\topmusiciangear\guides"
files = sorted(f for f in os.listdir(guides_dir) if "-vs-" in f and f.endswith(".html"))
snippet_data = {}

import locale
locale.setlocale(locale.LC_ALL, '')

# Load products.json for brand and rating lookup
products_path = os.path.join(os.path.dirname(__file__), "data", "products.json")
products_list = json.loads(open(products_path, "r", encoding="utf-8").read())
prod_by_title = {}
for p in products_list:
    prod_by_title[p["title"].strip().lower()] = p
    if p.get("title_es"):
        prod_by_title[p["title_es"].strip().lower()] = p

# Full specs map (researched from official manufacturer data)
specs_map = {
    # === MICROPHONES ===
    "shure sm7b": {"Tipo": "Din\u00e1mico", "Type": "Dynamic", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "50 Hz \u2013 20 kHz", "Frequency Response": "50 Hz \u2013 20 kHz", "Ruido Propio": "N/A (din\u00e1mico)", "Self-Noise": "N/A (dynamic)"},
    "shure sm57": {"Tipo": "Din\u00e1mico", "Type": "Dynamic", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "40 Hz \u2013 15 kHz", "Frequency Response": "40 Hz \u2013 15 kHz", "Ruido Propio": "N/A (din\u00e1mico)", "Self-Noise": "N/A (dynamic)"},
    "shure sm58": {"Tipo": "Din\u00e1mico", "Type": "Dynamic", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "50 Hz \u2013 15 kHz", "Frequency Response": "50 Hz \u2013 15 kHz", "Ruido Propio": "N/A (din\u00e1mico)", "Self-Noise": "N/A (dynamic)"},
    "rode nt1-a": {"Tipo": "Condensador", "Type": "Condenser", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "20 Hz \u2013 20 kHz", "Frequency Response": "20 Hz \u2013 20 kHz", "Ruido Propio": "5 dBA", "Self-Noise": "5 dBA"},
    "neumann u 87 ai": {"Tipo": "Condensador", "Type": "Condenser", "Patr\u00f3n Polar": "Omnidireccional / Cardioide / Figura 8", "Polar Pattern": "Omni / Cardioid / Figure-8", "Respuesta de Frecuencia": "20 Hz \u2013 20 kHz", "Frequency Response": "20 Hz \u2013 20 kHz", "Ruido Propio": "12 dBA (cardioide)", "Self-Noise": "12 dBA (cardioid)"},
    "akg c414 xlii": {"Tipo": "Condensador", "Type": "Condenser", "Patr\u00f3n Polar": "9 patrones seleccionables", "Polar Pattern": "9 selectable patterns", "Respuesta de Frecuencia": "20 Hz \u2013 20 kHz", "Frequency Response": "20 Hz \u2013 20 kHz", "Ruido Propio": "6 dBA", "Self-Noise": "6 dBA"},
    "electro-voice re20": {"Tipo": "Din\u00e1mico", "Type": "Dynamic", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "45 Hz \u2013 18 kHz", "Frequency Response": "45 Hz \u2013 18 kHz", "Ruido Propio": "N/A (din\u00e1mico)", "Self-Noise": "N/A (dynamic)"},
    "sennheiser md 421": {"Tipo": "Din\u00e1mico", "Type": "Dynamic", "Patr\u00f3n Polar": "Cardioide", "Polar Pattern": "Cardioid", "Respuesta de Frecuencia": "30 Hz \u2013 17 kHz", "Frequency Response": "30 Hz \u2013 17 kHz", "Ruido Propio": "N/A (din\u00e1mico)", "Self-Noise": "N/A (dynamic)"},
    # === HEADPHONES ===
    "beyerdynamic dt 770 pro": {"Tipo": "Cerrados", "Type": "Closed-back", "Respuesta de Frecuencia": "5 Hz \u2013 35 kHz", "Frequency Response": "5 Hz \u2013 35 kHz", "Impedancia": "32 / 80 / 250 \u03a9", "Impedance": "32 / 80 / 250 \u03a9", "Driver": "45 mm din\u00e1mico", "Driver": "45 mm dynamic", "SPL": "96 dB"},
    "beyerdynamic dt 990 pro": {"Tipo": "Abiertos", "Type": "Open-back", "Respuesta de Frecuencia": "5 Hz \u2013 35 kHz", "Frequency Response": "5 Hz \u2013 35 kHz", "Impedancia": "80 / 250 \u03a9", "Impedance": "80 / 250 \u03a9", "Driver": "45 mm din\u00e1mico", "Driver": "45 mm dynamic", "SPL": "96 dB"},
    "sennheiser hd 600": {"Tipo": "Abiertos", "Type": "Open-back", "Respuesta de Frecuencia": "12 Hz \u2013 40.5 kHz", "Frequency Response": "12 Hz \u2013 40.5 kHz", "Impedancia": "300 \u03a9", "Impedance": "300 \u03a9", "Driver": "42 mm din\u00e1mico", "Driver": "42 mm dynamic", "SPL": "97 dB"},
    "akg k371": {"Tipo": "Cerrados", "Type": "Closed-back", "Respuesta de Frecuencia": "5 Hz \u2013 40 kHz", "Frequency Response": "5 Hz \u2013 40 kHz", "Impedancia": "32 \u03a9", "Impedance": "32 \u03a9", "Driver": "50 mm con titanio", "Driver": "50 mm titanium-coated", "SPL": "114 dB"},
    "audio-technica ath-m50x": {"Tipo": "Cerrados", "Type": "Closed-back", "Respuesta de Frecuencia": "15 Hz \u2013 28 kHz", "Frequency Response": "15 Hz \u2013 28 kHz", "Impedancia": "38 \u03a9", "Impedance": "38 \u03a9", "Driver": "45 mm con bobina CCAW", "Driver": "45 mm CCAW", "SPL": "99 dB"},
    "sony mdr-7506": {"Tipo": "Cerrados", "Type": "Closed-back", "Respuesta de Frecuencia": "10 Hz \u2013 20 kHz", "Frequency Response": "10 Hz \u2013 20 kHz", "Impedancia": "63 \u03a9", "Impedance": "63 \u03a9", "Driver": "40 mm din\u00e1mico", "Driver": "40 mm dynamic", "SPL": "106 dB"},
    # === AUDIO INTERFACES ===
    "focusrite scarlett 2i2 4th gen": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "2 x Scarlett mic pre", "Preamps": "2 x Scarlett mic pre", "Rango Din\u00e1mico": "116 dB (mic) / 120 dB (salida)", "Dynamic Range": "116 dB (mic) / 120 dB (output)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    "focusrite scarlett 2i2 4\u00aa gen": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "2 x Scarlett mic pre", "Preamps": "2 x Scarlett mic pre", "Rango Din\u00e1mico": "116 dB (mic) / 120 dB (salida)", "Dynamic Range": "116 dB (mic) / 120 dB (output)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    "universal audio apollo twin x": {"Tipo": "Interfaz Thunderbolt 3", "Type": "Thunderbolt 3 Interface", "Preamplificadores": "2 x Unison mic pre", "Preamps": "2 x Unison mic pre", "Rango Din\u00e1mico": "129 dB (salida monitor)", "Dynamic Range": "129 dB (monitor output)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "Thunderbolt 3", "Connectivity": "Thunderbolt 3", "Procesamiento DSP": "UAD DUO / QUAD", "DSP Processing": "UAD DUO / QUAD"},
    "universal audio volt 2": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "1 x Vintage Mic Preamp", "Preamps": "1 x Vintage Mic Preamp", "Rango Din\u00e1mico": "115 dB", "Dynamic Range": "115 dB", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    "rme babyface pro fs": {"Tipo": "Interfaz USB port\u00e1til", "Type": "Portable USB Interface", "Preamplificadores": "2 x mic pre con 76 dB de ganancia", "Preamps": "2 x mic pre, 76 dB gain", "Rango Din\u00e1mico": "118 dBA (salida)", "Dynamic Range": "118 dBA (output)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB 2.0 (bus powered)", "Connectivity": "USB 2.0 (bus powered)", "Procesamiento DSP": "S\u00ed (TotalMix FX)", "DSP Processing": "Yes (TotalMix FX)"},
    "audient id14 mkii": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "2 x previo Clase A Audient", "Preamps": "2 x Audient Class-A pre", "Rango Din\u00e1mico": "126 dB (DA)", "Dynamic Range": "126 dB (DA)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    "motu m2": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "2 x mic pre", "Preamps": "2 x mic pre", "Rango Din\u00e1mico": "120 dB (ESS Sabre32)", "Dynamic Range": "120 dB (ESS Sabre32)", "Frecuencia de Muestreo": "192 kHz / 24-bit", "Sample Rate": "192 kHz / 24-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    "ssl 2+ mkii": {"Tipo": "Interfaz de Audio USB", "Type": "USB Audio Interface", "Preamplificadores": "2 x SSL 4K legacy pre", "Preamps": "2 x SSL 4K legacy pre", "Rango Din\u00e1mico": "120 dB", "Dynamic Range": "120 dB", "Frecuencia de Muestreo": "192 kHz / 32-bit", "Sample Rate": "192 kHz / 32-bit", "Conexi\u00f3n": "USB-C", "Connectivity": "USB-C", "Procesamiento DSP": "N/A", "DSP Processing": "N/A"},
    # === STUDIO MONITORS ===
    "yamaha hs8": {"Tipo": "Monitor de 2 v\u00edas", "Type": "2-way monitor", "Woofer": "8\" cono", "Woofer": "8\" cone", "Tweeter": "1\" domo", "Tweeter": "1\" dome", "Respuesta de Frecuencia": "38 Hz \u2013 30 kHz", "Frequency Response": "38 Hz \u2013 30 kHz", "Potencia": "120W (75W LF + 45W HF)", "Power": "120W (75W LF + 45W HF)"},
    "krk rokit 7 g5": {"Tipo": "Monitor de 2 v\u00edas", "Type": "2-way monitor", "Woofer": "7\" Kevlar", "Woofer": "7\" Kevlar", "Tweeter": "1\" domo de seda", "Tweeter": "1\" silk dome", "Respuesta de Frecuencia": "45 Hz \u2013 36 kHz", "Frequency Response": "45 Hz \u2013 36 kHz", "Potencia": "145W (97W LF + 48W HF)", "Power": "145W (97W LF + 48W HF)"},
    "adam audio a7v": {"Tipo": "Monitor de 2 v\u00edas", "Type": "2-way monitor", "Woofer": "7\"", "Woofer": "7\"", "Tweeter": "S-ART ribbon", "Tweeter": "S-ART ribbon", "Respuesta de Frecuencia": "44 Hz \u2013 50 kHz", "Frequency Response": "44 Hz \u2013 50 kHz", "Potencia": "170W (100W LF + 70W HF)", "Power": "170W (100W LF + 70W HF)"},
    "genelec 8040b": {"Tipo": "Monitor de 2 v\u00edas", "Type": "2-way monitor", "Woofer": "6.5\"", "Woofer": "6.5\"", "Tweeter": "1\" domo met\u00e1lico", "Tweeter": "1\" metal dome", "Respuesta de Frecuencia": "48 Hz \u2013 20 kHz", "Frequency Response": "48 Hz \u2013 20 kHz", "Potencia": "200W (120W LF + 80W HF)", "Power": "200W (120W LF + 80W HF)"},
    "jbl 305p mkii": {"Tipo": "Monitor de 2 v\u00edas", "Type": "2-way monitor", "Woofer": "5\"", "Woofer": "5\"", "Tweeter": "1\" domo", "Tweeter": "1\" dome", "Respuesta de Frecuencia": "49 Hz \u2013 20 kHz", "Frequency Response": "49 Hz \u2013 20 kHz", "Potencia": "82W (41W LF + 41W HF)", "Power": "82W (41W LF + 41W HF)"},
    "kali audio lp-6 v2": {"Tipo": "Monitor de 3 v\u00edas coaxial", "Type": "3-way coaxial", "Woofer": "6.5\"", "Woofer": "6.5\"", "Tweeter": "1\" domo", "Tweeter": "1\" dome", "Respuesta de Frecuencia": "39 Hz \u2013 25 kHz", "Frequency Response": "39 Hz \u2013 25 kHz", "Potencia": "100W (60W LF + 40W HF)", "Power": "100W (60W LF + 40W HF)"},
    # === GUITAR AMPS ===
    "boss katana 50 mkii": {"Tipo": "Amplificador de modelado", "Type": "Modeling combo", "Potencia": "50W", "Power": "50W", "Altavoz": "1 x 12\" custom", "Speaker": "1 x 12\" custom", "V\u00e1lvulas": "N/A (modelado)", "Tubes": "N/A (modeling)", "Canales": "5 (Acoustic, Clean, Crunch, Lead, Brown)", "Channels": "5 (Acoustic, Clean, Crunch, Lead, Brown)", "Efectos": "Booster, Mod, FX, Delay, Reverb", "Effects": "Booster, Mod, FX, Delay, Reverb"},
    "marshall dsl40cr": {"Tipo": "V\u00e1lvulas todo-tubo", "Type": "All-tube combo", "Potencia": "40W (con reducci\u00f3n a 20W)", "Power": "40W (power reduction to 20W)", "Altavoz": "1 x 12\" Celestion V-Type", "Speaker": "1 x 12\" Celestion V-Type", "V\u00e1lvulas": "4 x ECC83, 2 x EL34", "Tubes": "4 x ECC83, 2 x EL34", "Canales": "2 (Classic Gain, Ultra Gain) c/u con 2 modos", "Channels": "2 (Classic Gain, Ultra Gain) each w/2 modes", "Efectos": "Reverb digital, loop de efectos", "Effects": "Digital reverb, series effects loop"},
    "fender blues junior iv": {"Tipo": "V\u00e1lvulas todo-tubo", "Type": "All-tube combo", "Potencia": "15W", "Power": "15W", "Altavoz": "1 x 12\" Celestion A-Type", "Speaker": "1 x 12\" Celestion A-Type", "V\u00e1lvulas": "3 x 12AX7, 2 x EL84", "Tubes": "3 x 12AX7, 2 x EL84", "Canales": "1 con interruptor FAT", "Channels": "1 with FAT switch", "Efectos": "Reverb a resorte, loop de efectos", "Effects": "Spring reverb, effects loop"},
    "vox ac30": {"Tipo": "V\u00e1lvulas todo-tubo", "Type": "All-tube combo", "Potencia": "30W", "Power": "30W", "Altavoz": "2 x 12\" Celestion Greenback", "Speaker": "2 x 12\" Celestion Greenback", "V\u00e1lvulas": "3 x 12AX7, 4 x EL84", "Tubes": "3 x 12AX7, 4 x EL84", "Canales": "2 (Normal, Top Boost)", "Channels": "2 (Normal, Top Boost)", "Efectos": "Reverb a resorte, tremolo", "Effects": "Spring reverb, tremolo"},
    # === ELECTRIC GUITARS ===
    "fender american professional ii stratocaster": {"Tipo": "Guitarra el\u00e9ctrica", "Type": "Electric guitar", "Cuerpo": "Aliso", "Body": "Alder", "M\u00e1stil": "Arce con perfil Deep C", "Neck": "Maple Deep C", "Pastillas": "3 x V-Mod II Single-Coil", "Pickups": "3 x V-Mod II Single-Coil", "Diapas\u00f3n": "Palo rosa o arce", "Fretboard": "Rosewood or maple", "Trastes": "22", "Frets": "22"},
    "fender american profesional ii stratocaster": {"Tipo": "Guitarra el\u00e9ctrica", "Type": "Electric guitar", "Cuerpo": "Aliso", "Body": "Alder", "M\u00e1stil": "Arce con perfil Deep C", "Neck": "Maple Deep C", "Pastillas": "3 x V-Mod II Single-Coil", "Pickups": "3 x V-Mod II Single-Coil", "Diapas\u00f3n": "Palo rosa o arce", "Fretboard": "Rosewood or maple", "Trastes": "22", "Frets": "22"},
    "gibson les paul standard '60s": {"Tipo": "Guitarra el\u00e9ctrica", "Type": "Electric guitar", "Cuerpo": "Caoba con tapa de arce", "Body": "Mahogany with maple top", "M\u00e1stil": "Caoba SlimTaper", "Neck": "Mahogany SlimTaper", "Pastillas": "2 x Burstbucker", "Pickups": "2 x Burstbucker", "Diapas\u00f3n": "Palo rosa", "Fretboard": "Rosewood", "Trastes": "22", "Frets": "22"},
    "fender player stratocaster": {"Tipo": "Guitarra el\u00e9ctrica", "Type": "Electric guitar", "Cuerpo": "Aliso", "Body": "Alder", "M\u00e1stil": "Arce con perfil Modern C", "Neck": "Maple Modern C", "Pastillas": "3 x Player Alnico V Single-Coil", "Pickups": "3 x Player Alnico V Single-Coil", "Diapas\u00f3n": "Palo rosa o arce", "Fretboard": "Rosewood or maple", "Trastes": "22", "Frets": "22"},
    "yamaha pacifica 112v": {"Tipo": "Guitarra el\u00e9ctrica", "Type": "Electric guitar", "Cuerpo": "Aliso", "Body": "Alder", "M\u00e1stil": "Arce", "Neck": "Maple", "Pastillas": "HSS (1 humbucker + 2 single-coil)", "Pickups": "HSS (1 humbucker + 2 single-coil)", "Diapas\u00f3n": "Palo rosa", "Fretboard": "Rosewood", "Trastes": "22", "Frets": "22"},
    # === ACOUSTIC GUITARS ===
    "martin d-28 dreadnought": {"Tipo": "Guitarra ac\u00fastica", "Type": "Acoustic guitar", "Tapa": "Abeto Sitka macizo", "Top": "Solid Sitka spruce", "Fondo y aros": "Palo de rosa macizo", "Back & Sides": "Solid East Indian rosewood", "M\u00e1stil": "Caoba", "Neck": "Mahogany", "Diapas\u00f3n": "\u00c9bano", "Fretboard": "Ebony"},
    "taylor 314ce": {"Tipo": "Guitarra ac\u00fastica", "Type": "Acoustic guitar", "Tapa": "Abeto Sitka macizo", "Top": "Solid Sitka spruce", "Fondo y aros": "Palo negro de Tasmania", "Back & Sides": "Tasmanian blackwood", "M\u00e1stil": "Caoba", "Neck": "Mahogany", "Diapas\u00f3n": "\u00c9bano", "Fretboard": "Ebony"},
    # === PA SPEAKERS ===
    "yamaha dxr12mkii": {"Tipo": "Altavoz PA activo", "Type": "Active PA speaker", "Woofer": "12\"", "Woofer": "12\"", "Potencia": "1,100W (950W LF + 150W HF)", "Power": "1,100W (950W LF + 150W HF)", "SPL M\u00e1ximo": "133 dB", "Max SPL": "133 dB", "Peso": "20.7 kg", "Weight": "45.6 lbs"},
    "jbl prx one": {"Tipo": "Sistema PA todo-en-uno", "Type": "All-in-one PA", "Woofer": "12\" + array de 1.5\"", "Woofer": "12\" + 1.5\" array", "Potencia": "1,300W (clase D)", "Power": "1,300W (class D)", "SPL M\u00e1ximo": "130 dB", "Max SPL": "130 dB", "Peso": "25 kg", "Weight": "55.1 lbs"},
    "ev zlx-12p powered speaker": {"Tipo": "Altavoz PA activo", "Type": "Active PA speaker", "Woofer": "12\"", "Woofer": "12\"", "Potencia": "1,000W (pico)", "Power": "1,000W (peak)", "SPL M\u00e1ximo": "127 dB", "Max SPL": "127 dB", "Peso": "16.1 kg", "Weight": "35.5 lbs"},
    "altavoz activo ev zlx-12p": {"Tipo": "Altavoz PA activo", "Type": "Active PA speaker", "Woofer": "12\"", "Woofer": "12\"", "Potencia": "1,000W (pico)", "Power": "1,000W (peak)", "SPL M\u00e1ximo": "127 dB", "Max SPL": "127 dB", "Peso": "16.1 kg", "Weight": "35.5 lbs"},
    "qsc k12.2 powered speaker": {"Tipo": "Altavoz PA activo", "Type": "Active PA speaker", "Woofer": "12\"", "Woofer": "12\"", "Potencia": "2,000W (pico)", "Power": "2,000W (peak)", "SPL M\u00e1ximo": "132 dB", "Max SPL": "132 dB", "Peso": "17.2 kg", "Weight": "37.9 lbs"},
    "altavoz activo qsc k12.2": {"Tipo": "Altavoz PA activo", "Type": "Active PA speaker", "Woofer": "12\"", "Woofer": "12\"", "Potencia": "2,000W (pico)", "Power": "2,000W (peak)", "SPL M\u00e1ximo": "132 dB", "Max SPL": "132 dB", "Peso": "17.2 kg", "Weight": "37.9 lbs"},
    # === WIRELESS SYSTEMS ===
    "sennheiser ew 100 g4-935": {"Tipo": "Sistema inal\u00e1mbrico UHF", "Type": "UHF wireless system", "Frecuencia": "UHF (varias bandas)", "Frequency": "UHF (multiple bands)", "Rango Din\u00e1mico": "> 110 dB", "Dynamic Range": "> 110 dB", "Rango de transmisi\u00f3n": "Hasta 100 m", "Transmission Range": "Up to 330 ft", "Micr\u00f3fono incluido": "E 935 (din\u00e1mico cardioide)", "Mic Included": "E 935 (dynamic cardioid)"},
    "shure ulxd24/sm58": {"Tipo": "Sistema inal\u00e1mbrico digital UHF", "Type": "Digital UHF wireless system", "Frecuencia": "UHF (banda G50)", "Frequency": "UHF (G50 band)", "Rango Din\u00e1mico": "> 120 dB", "Dynamic Range": "> 120 dB", "Rango de transmisi\u00f3n": "Hasta 100 m", "Transmission Range": "Up to 330 ft", "Micr\u00f3fono incluido": "SM58 (din\u00e1mico cardioide)", "Mic Included": "SM58 (dynamic cardioid)"},
    # === DAWs ===
    "ableton live 12 suite": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "Ilimitadas", "Audio Tracks": "Unlimited", "Pistas MIDI": "Ilimitadas", "MIDI Tracks": "Unlimited", "Instrumentos incluidos": "70+ (Wavetable, Operator, Sampler, Analog, etc.)", "Included Instruments": "70+ (Wavetable, Operator, Sampler, Analog, etc.)", "Efectos": "90+", "Effects": "90+", "Formato": "64-bit", "Format": "64-bit"},
    "fl studio producer edition": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "Ilimitadas", "Audio Tracks": "Unlimited", "Pistas MIDI": "Ilimitadas", "MIDI Tracks": "Unlimited", "Instrumentos incluidos": "30+ (Sytrus, Harmless, Sakura, etc.)", "Included Instruments": "30+ (Sytrus, Harmless, Sakura, etc.)", "Efectos": "70+", "Effects": "70+", "Formato": "64-bit", "Format": "64-bit"},
    "fl studio edici\u00f3n producer": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "Ilimitadas", "Audio Tracks": "Unlimited", "Pistas MIDI": "Ilimitadas", "MIDI Tracks": "Unlimited", "Instrumentos incluidos": "30+ (Sytrus, Harmless, Sakura, etc.)", "Included Instruments": "30+ (Sytrus, Harmless, Sakura, etc.)", "Efectos": "70+", "Effects": "70+", "Formato": "64-bit", "Format": "64-bit"},
    "avid pro tools studio": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "512", "Audio Tracks": "512", "Pistas MIDI": "512", "MIDI Tracks": "512", "Frecuencia de Muestreo": "192 kHz / 32-bit", "Sample Rate": "192 kHz / 32-bit", "Incluye": "Celemony Melodyne 5, SoundFlow", "Includes": "Celemony Melodyne 5, SoundFlow", "Instrumentos incluidos": "Celemony Melodyne 5, SoundFlow", "Included Instruments": "Celemony Melodyne 5, SoundFlow", "Efectos": "N/A (terceros)", "Effects": "N/A (3rd-party)"},
    "avid pro tools estudio": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "512", "Audio Tracks": "512", "Pistas MIDI": "512", "MIDI Tracks": "512", "Frecuencia de Muestreo": "192 kHz / 32-bit", "Sample Rate": "192 kHz / 32-bit", "Incluye": "Celemony Melodyne 5, SoundFlow", "Includes": "Celemony Melodyne 5, SoundFlow", "Instrumentos incluidos": "Celemony Melodyne 5, SoundFlow", "Included Instruments": "Celemony Melodyne 5, SoundFlow", "Efectos": "N/A (terceros)", "Effects": "N/A (3rd-party)"},
    "steinberg cubase pro 15": {"Tipo": "Estaci\u00f3n de trabajo de audio digital", "Type": "Digital Audio Workstation", "Pistas de audio": "256", "Audio Tracks": "256", "Pistas MIDI": "256", "MIDI Tracks": "256", "Frecuencia de Muestreo": "192 kHz / 32-bit", "Sample Rate": "192 kHz / 32-bit", "Instrumentos incluidos": "60+ (HALion, Groove Agent, Padshop, etc.)", "Included Instruments": "60+ (HALion, Groove Agent, Padshop, etc.)", "Efectos": "90+ (incluye FX de pista, Channel Strip, etc.)", "Effects": "90+ (includes track FX, Channel Strip, etc.)"},
    # === PLUGIN SUITES ===
    "fabfilter total bundle": {"Tipo": "Paquete de plugins de mezcla y master", "Type": "Mixing & mastering plugin bundle", "Plugins incluidos": "10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)", "Included Plugins": "10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)", "Formatos": "AAX, AU, VST, VST3", "Formats": "AAX, AU, VST, VST3", "Delay compensaci\u00f3n": "S\u00ed (Plugin Delay Compensation)", "Delay Compensation": "Yes (Plugin Delay Compensation)"},
    "fabfilter paquete total": {"Tipo": "Paquete de plugins de mezcla y master", "Type": "Mixing & mastering plugin bundle", "Plugins incluidos": "10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)", "Included Plugins": "10 (Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, etc.)", "Formatos": "AAX, AU, VST, VST3", "Formats": "AAX, AU, VST, VST3", "Delay compensaci\u00f3n": "S\u00ed (Plugin Delay Compensation)", "Delay Compensation": "Yes (Plugin Delay Compensation)"},
    "izotope ozone 12 advanced": {"Tipo": "Suite de masterizaci\u00f3n", "Type": "Mastering suite", "Plugins incluidos": "20+ m\u00f3dulos (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)", "Included Plugins": "20+ modules (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)", "IA integrada": "S\u00ed (Mastering Assistant, Stem Focus)", "AI-Powered": "Yes (Mastering Assistant, Stem Focus)", "Formatos": "AAX, AU, VST, VST3", "Formats": "AAX, AU, VST, VST3", "Delay compensaci\u00f3n": "S\u00ed (Plugin Delay Compensation)", "Delay Compensation": "Yes (Plugin Delay Compensation)"},
    "izotope ozone 12 avanzado": {"Tipo": "Suite de masterizaci\u00f3n", "Type": "Mastering suite", "Plugins incluidos": "20+ m\u00f3dulos (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)", "Included Plugins": "20+ modules (Stem EQ, Clarity, Stabilizer, Maximizer, Tonal Balance, etc.)", "IA integrada": "S\u00ed (Mastering Assistant, Stem Focus)", "AI-Powered": "Yes (Mastering Assistant, Stem Focus)", "Formatos": "AAX, AU, VST, VST3", "Formats": "AAX, AU, VST, VST3", "Delay compensaci\u00f3n": "S\u00ed (Plugin Delay Compensation)", "Delay Compensation": "Yes (Plugin Delay Compensation)"},
}

for fname in files:
    path = os.path.join(guides_dir, fname)
    html = open(path, "r", encoding="utf-8").read()
    
    # Strip any existing snippet regardless of position
    html = re.sub(r'\s*<div class="guide-featured-snippet">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    html = re.sub(r'\s*<div class="featured-snippet">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    html = re.sub(r'\s*<div class="featured-direct-answer">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    # Strip any existing FAQPage schema to avoid duplicates
    html = re.sub(r'\s*<script type="application/ld\+json">.*?"@type"\s*:\s*"FAQPage".*?</script>\s*', '', html, flags=re.DOTALL)
    
    names = re.findall(r'guide-product-card-title">([^<]+)<', html)
    prices_text = re.findall(r'guide-product-card-price">\$?([0-9,.]+(?:k|K|m|M)?)', html)
    descs = re.findall(r'guide-product-card-desc">([^<]+)<', html)
    sections = re.findall(r'guide-section-heading">([^<]+)<', html)
    
    if len(names) < 2 or len(prices_text) < 2:
        print(f"SKIP {fname} (not enough products: names={len(names)}, prices={len(prices_text)})")
        continue
    
    name1, name2 = names[0], names[1]
    price1, price2 = prices_text[0], prices_text[1]
    desc1 = descs[0] if len(descs) > 0 else ""
    desc2 = descs[1] if len(descs) > 1 else ""
    
    short1 = name1
    short2 = name2
    
    # Pick best key feature: use first good section heading (skip "Quick Answer" type sections)
    key1 = ""
    key2 = ""
    skip_patterns = ["quick answer", "what", "difference", "which one", "verdic", 
                     "respuesta r\u00e1pida", "diferencia", "cu\u00e1l", "veredicto"]
    for s in sections:
        skip = False
        for sp in skip_patterns:
            if sp in s.lower():
                skip = True
                break
        if skip:
            continue
        parts = s.split(": ", 1)
        clean = parts[1] if len(parts) > 1 else parts[0]
        if not key1:
            key1 = clean
        elif not key2:
            key2 = clean
            break
    
    # Fallback to descriptions if no good section heading
    if not key1 and desc1:
        key1 = desc1[:60]
    if not key2 and desc2:
        key2 = desc2[:60]
    if not key1: key1 = short1
    if not key2: key2 = short2
    
    # Truncate long keys (increase limit so text like "Vitalicias" doesn't get cut)
    max_key_len = 150
    key1_short = key1[:max_key_len] + "..." if len(key1) > max_key_len else key1
    key2_short = key2[:max_key_len] + "..." if len(key2) > max_key_len else key2
    
    # Hardcoded Best For mapping (researched per product)
    best_for_map = {
        "Shure SM57": "Instrument miking",
        "Shure SM58": "Live vocal performance",
        "Shure SM7B": "Broadcast, podcast, and streaming",
        "Electro-Voice RE20": "Broadcast and voiceover",
        "Neumann U 87 Ai": "Professional studio recording",
        "Rode NT1-A": "Home studio vocal recording",
        "AKG C414 XLII": "Versatile studio recording",
        "Sennheiser MD 421": "Instrument and drum miking",
        "Beyerdynamic DT 770 Pro": "Closed-back tracking and monitoring",
        "Beyerdynamic DT 990 Pro": "Open-back mixing and listening",
        "Sennheiser HD 600": "Critical mixing reference",
        "AKG K371": "Budget mix translation",
        "Audio-Technica ATH-M50x": "All-purpose monitoring",
        "Sony MDR-7506": "Budget mixing and broadcast",
        "Yamaha HS8": "Flat-response reference mixing",
        "KRK Rokit 7 G5": "Bass-forward production",
        "JBL 305P MkII": "Ultra-budget nearfield mixing",
        "Kali Audio LP-6 V2": "Budget accurate mixing",
        "Adam Audio A7V": "Detailed mixing with ribbon tweeter",
        "Genelec 8040B": "Professional reference monitoring",
        "Focusrite Scarlett 2i2 4th Gen": "Home studio recording",
        "Focusrite Scarlett 2i2 4\u00aa Gen": "Home studio recording",
        "Universal Audio Volt 2": "Home recording with analog character",
        "Universal Audio Apollo Twin X": "Pro recording with UAD processing",
        "RME Babyface Pro FS": "Professional mobile recording",
        "Audient iD14 MkII": "Home studio with console preamps",
        "MOTU M2": "Budget home recording",
        "SSL 2+ MKII": "Home recording with analog character",
        "Fender American Professional II Stratocaster": "Professional Stratocaster tone",
        "Fender American Profesional II Stratocaster": "Professional Stratocaster tone",
        "Gibson Les Paul Standard '60s": "Classic rock and blues",
        "Fender Player Stratocaster": "Versatile Strat for all levels",
        "Yamaha Pacifica 112V": "Best beginner electric guitar",
        "Martin D-28 Dreadnought": "Bluegrass and flatpicking",
        "Taylor 314ce": "Fingerstyle and songwriting",
        "Boss Katana 50 MkII": "Versatile practice and gigging",
        "Marshall DSL40CR": "Classic rock and metal",
        "Fender Blues Junior IV": "Blues and classic rock",
        "Vox AC30": "British chime and indie rock",
        "Ableton Live 12 Suite": "Electronic music and live performance",
        "FL Studio Producer Edition": "Beat-making and hip-hop",
        "FL Studio Edici\u00f3n Producer": "Beat-making and hip-hop",
        "Avid Pro Tools Studio": "Pro recording and post-production",
        "Avid Pro Tools Estudio": "Pro recording and post-production",
        "Steinberg Cubase Pro 15": "Composition and scoring",
        "Yamaha DXR12mkII": "Professional live sound",
        "JBL PRX ONE": "Portable all-in-one PA",
        "EV ZLX-12P Powered Speaker": "Budget live sound reinforcement",
        "Altavoz Activo EV ZLX-12P": "Budget live sound reinforcement",
        "QSC K12.2 Powered Speaker": "Versatile professional PA",
        "Altavoz Activo QSC K12.2": "Versatile professional PA",
        "Sennheiser EW 100 G4-935": "Professional live vocal wireless",
        "Shure ULXD24/SM58": "Premium live vocal wireless",
        "FabFilter Total Bundle": "Mixing and mastering EQ and dynamics",
        "FabFilter Paquete Total": "Mixing and mastering EQ and dynamics",
        "iZotope Ozone 12 Advanced": "AI-powered mastering suite",
        "iZotope Ozone 12 Avanzado": "AI-powered mastering suite",
    }
    
    # Spanish translations for all Best For texts
    best_for_es_map = {
        "Instrument miking": "Microfonear instrumentos",
        "Live vocal performance": "Voz en vivo",
        "Broadcast, podcast, and streaming": "Broadcast, p\u00f3dcast y streaming",
        "Broadcast and voiceover": "Broadcast y locuci\u00f3n",
        "Professional studio recording": "Grabaci\u00f3n profesional de estudio",
        "Home studio vocal recording": "Grabaci\u00f3n vocal en home studio",
        "Versatile studio recording": "Grabaci\u00f3n vers\u00e1til en estudio",
        "Instrument and drum miking": "Microfonear instrumentos y bater\u00edas",
        "Closed-back tracking and monitoring": "Monitoreo cerrado para tracking",
        "Open-back mixing and listening": "Mezcla y escucha abierta",
        "Critical mixing reference": "Referencia cr\u00edtica para mezcla",
        "Budget mix translation": "Traducci\u00f3n de mezcla econ\u00f3mica",
        "All-purpose monitoring": "Monitoreo multiprop\u00f3sito",
        "Budget mixing and broadcast": "Mezcla y broadcast econ\u00f3mico",
        "Flat-response reference mixing": "Mezcla de referencia plana",
        "Bass-forward production": "Producci\u00f3n con \u00e9nfasis en graves",
        "Ultra-budget nearfield mixing": "Mezcla de campo cercano ultra econ\u00f3mica",
        "Budget accurate mixing": "Mezcla precisa econ\u00f3mica",
        "Detailed mixing with ribbon tweeter": "Mezcla detallada con tweeter de cinta",
        "Professional reference monitoring": "Monitoreo de referencia profesional",
        "Home studio recording": "Grabaci\u00f3n en home studio",
        "Home recording with analog character": "Grabaci\u00f3n casera con car\u00e1cter anal\u00f3gico",
        "Pro recording with UAD processing": "Grabaci\u00f3n profesional con UAD",
        "Professional mobile recording": "Grabaci\u00f3n profesional m\u00f3vil",
        "Home studio with console preamps": "Home studio con previos de consola",
        "Budget home recording": "Grabaci\u00f3n casera econ\u00f3mica",
        "Professional Stratocaster tone": "Tono Stratocaster profesional",
        "Classic rock and blues": "Rock cl\u00e1sico y blues",
        "Versatile Strat for all levels": "Strat vers\u00e1til para todos",
        "Best beginner electric guitar": "Mejor guitarra el\u00e9ctrica principiante",
        "Bluegrass and flatpicking": "Bluegrass y flatpicking",
        "Fingerstyle and songwriting": "Fingerstyle y composici\u00f3n",
        "Versatile practice and gigging": "Pr\u00e1ctica y conciertos vers\u00e1til",
        "Classic rock and metal": "Rock cl\u00e1sico y metal",
        "Blues and classic rock": "Blues y rock cl\u00e1sico",
        "British chime and indie rock": "Brillo brit\u00e1nico e indie rock",
        "Electronic music and live performance": "M\u00fasica electr\u00f3nica y directo",
        "Beat-making and hip-hop": "Creaci\u00f3n de beats y hip-hop",
        "Pro recording and post-production": "Grabaci\u00f3n y postproducci\u00f3n profesional",
        "Composition and scoring": "Composici\u00f3n y orquestaci\u00f3n",
        "Professional live sound": "Sonido en vivo profesional",
        "Portable all-in-one PA": "PA port\u00e1til todo-en-uno",
        "Budget live sound reinforcement": "Refuerzo de sonido econ\u00f3mico",
        "Versatile professional PA": "PA profesional vers\u00e1til",
        "Professional live vocal wireless": "Inal\u00e1mbrico vocal profesional",
        "Premium live vocal wireless": "Inal\u00e1mbrico vocal premium",
        "Mixing and mastering EQ and dynamics": "EQ y din\u00e1mica para mezcla y master",
        "AI-powered mastering suite": "Suite de masterizaci\u00f3n con IA",
    }
    
    def best_by_type(ptype):
        type_map = {
            "Microphone": "Vocal recording and live performance",
            "Headphones": "Studio monitoring and mixing",
            "Studio Monitor": "Critical listening and mixing",
            "Electric Guitar": "Guitar and amp tone",
            "Acoustic Guitar": "Fingerstyle and recording",
            "Guitar Amp": "Guitar and amp tone",
            "DAW": "Music production and recording",
            "Plugin Suite": "Mixing and mastering",
            "PA Speaker": "Live sound reinforcement",
            "Wireless System": "Wireless performance",
            "Audio Interface": "Home studio recording",
        }
        return type_map.get(ptype)

    # Better "Best For" text
    def make_best_for(name, desc, short, ptype):
        # Hardcoded mapping first (researched per product)
        if name in best_for_map:
            return best_for_map[name]
        desc_lower = desc.lower()
        name_lower = name.lower()
        # Audio interface check first (also match product names)
        if any(x in name_lower for x in ["interface", "scarlett", "volt", "apollo", "babyface", "audient", "motu", "ssl 2"]):
            if "budget" in desc_lower or "afford" in desc_lower or "cheap" in desc_lower or "econ" in desc_lower or "entrada" in desc_lower:
                return "Budget home recording"
            if "portable" in desc_lower or "travel" in desc_lower or "port\u00e1til" in desc_lower:
                return "Portable recording on the go"
            if "pro" in desc_lower or "profession" in desc_lower:
                return "Professional studio recording"
            return "Home studio recording"
        if "audio interface" in desc_lower or "interface" in desc_lower or "interfaz" in desc_lower:
            if "budget" in desc_lower or "afford" in desc_lower or "cheap" in desc_lower or "econ" in desc_lower or "entrada" in desc_lower:
                return "Budget home recording"
            if "portable" in desc_lower or "travel" in desc_lower or "port\u00e1til" in desc_lower:
                return "Portable recording on the go"
            if "pro" in desc_lower or "profession" in desc_lower:
                return "Professional studio recording"
            return "Home studio recording"
        if "vocal" in desc_lower or "microphone" in desc_lower or "mic" in desc_lower:
            if "instrument" in desc_lower:
                return "Instrument miking"
            return "Vocal recording and live performance"
        if "instrument" in desc_lower:
            return "Instrument recording and miking"
        if "headphone" in desc_lower or "ear" in desc_lower or "aud\u00edfono" in desc_lower or "auricular" in desc_lower:
            if "monitor" in desc_lower or "mix" in desc_lower or "mezcla" in desc_lower:
                return "Mixing and monitoring"
            if "wireless" in desc_lower or "bluetooth" in desc_lower or "inal\u00e1mbric" in desc_lower:
                return "Wireless listening"
            if "noise" in desc_lower or "cancel" in desc_lower or "ruido" in desc_lower:
                return "Noise-isolated listening"
            return "Studio monitoring and mixing"
        if "monitor" in desc_lower or "speaker" in desc_lower or "altavoz" in desc_lower:
            if "budget" in desc_lower or "cheap" in desc_lower or "afford" in desc_lower or "econ" in desc_lower:
                return "Budget-friendly monitoring"
            return "Critical listening and mixing"
        if "guitar" in desc_lower or "guitarra" in desc_lower or "amplificador" in desc_lower:
            if "beginner" in desc_lower or "start" in desc_lower or "principian" in desc_lower:
                return "Beginners and practice"
            return "Guitar and amp tone"
        if any(x in name_lower for x in ["ableton", "live", "fl studio", "pro tools", "cubase", "daw"]) or "daw" in desc_lower or "produc" in desc_lower or "music" in desc_lower or "m\u00fasica" in desc_lower:
            if "beat" in desc_lower:
                return "Beat-making and production"
            return "Music production and recording"
        if "plugin" in desc_lower or "effect" in desc_lower or "process" in desc_lower:
            if "mix" in desc_lower:
                return "Mixing and mastering"
            return "Audio processing"
        if "wireless" in desc_lower or "inal\u00e1mbric" in desc_lower:
            return "Wireless performance"
        if "pa " in desc_lower or "pa-" in desc_lower or " pa" in desc_lower or "live" in desc_lower or "speaker" in desc_lower or "altavoz" in desc_lower:
            return "Live sound reinforcement"
        if " amp " in desc_lower or " amp," in desc_lower or " amp." in desc_lower or desc_lower.startswith("amp") or "amplifier" in desc_lower:
            return "Guitar and amp tone"
        if "beginner" in desc_lower or "first" in desc_lower or "start" in desc_lower or "principian" in desc_lower:
            return "Beginners and first-time buyers"
        if "pro" in desc_lower or "profession" in desc_lower:
            return "Professional users"
        # Fallback by product type
        b = best_by_type(ptype)
        if b:
            return b
        return short + " users"
    
    # Determine product types
    f = fname.lower()
    n = name1.lower() + " " + name2.lower()
    type1 = type2 = "Studio Gear"
    if any(x in f for x in ["mic", "sm57", "sm58", "sm7b", "re20", "u87", "nt1", "c414", "md421", "stage-mic"]):
        type1 = type2 = "Microphone"
    if any(x in f for x in ["headphone", "dt770", "dt990", "hd600", "k371", "m50x", "mdr7506"]):
        type1 = type2 = "Headphones"
    if any(x in f for x in ["monitor", "hs8", "rokit", "jbl-vs", "kali", "adam", "genelec"]):
        type1 = type2 = "Studio Monitor"
    if any(x in f for x in ["guitar", "strat", "les-paul", "player", "american"]):
        type1 = type2 = "Electric Guitar"
    if any(x in f for x in ["acoustic", "martin", "taylor"]):
        type1 = type2 = "Acoustic Guitar"
    if any(x in f for x in ["amp", "katana", "dsl", "blues-junior", "ac30"]):
        type1 = type2 = "Guitar Amp"
    if any(x in f for x in ["daw", "ableton", "fl-studio", "pro-tools", "cubase"]):
        type1 = type2 = "DAW"
    if any(x in f for x in ["plugin", "fabfilter", "ozone", "channel-strip"]):
        type1 = type2 = "Plugin Suite"
    if any(x in f for x in ["pa-", "dxr", "prx", "zlx", "k12"]):
        type1 = type2 = "PA Speaker"
    if any(x in f for x in ["wireless", "ew100", "ulxd"]):
        type1 = type2 = "Wireless System"
    if "interface" in f or any(x in n for x in ["scarlett", "volt", "apollo", "babyface", "audient", "motu", "ssl 2"]):
        type1 = type2 = "Audio Interface"
    
    best1 = make_best_for(name1, desc1, short1, type1)
    best2 = make_best_for(name2, desc2, short2, type2)
    
    # Look up brand and rating from products.json
    p1 = prod_by_title.get(short1.strip().lower())
    p2 = prod_by_title.get(short2.strip().lower())
    brand1 = p1["brand"] if p1 else ""
    brand2 = p2["brand"] if p2 else ""
    rating1 = p1["rating"] if p1 else ""
    rating2 = p2["rating"] if p2 else ""
    
    # Look up product specs from specs_map
    specs1 = specs_map.get(short1.strip().lower())
    specs2 = specs_map.get(short2.strip().lower())
    
    # Ordered spec keys by product type (for Full Spec Comparison)
    type_spec_keys = {
        "Microphone": [("Tipo", "Type"), ("Patr\u00f3n Polar", "Polar Pattern"), ("Respuesta de Frecuencia", "Frequency Response"), ("Ruido Propio", "Self-Noise")],
        "Headphones": [("Tipo", "Type"), ("Respuesta de Frecuencia", "Frequency Response"), ("Impedancia", "Impedance"), ("Driver", "Driver"), ("SPL", "SPL")],
        "Audio Interface": [("Preamplificadores", "Preamps"), ("Rango Din\u00e1mico", "Dynamic Range"), ("Frecuencia de Muestreo", "Sample Rate"), ("Conexi\u00f3n", "Connectivity"), ("Procesamiento DSP", "DSP Processing")],
        "Studio Monitor": [("Woofer", "Woofer"), ("Tweeter", "Tweeter"), ("Respuesta de Frecuencia", "Frequency Response"), ("Potencia", "Power")],
        "Guitar Amp": [("Potencia", "Power"), ("Altavoz", "Speaker"), ("V\u00e1lvulas", "Tubes"), ("Canales", "Channels"), ("Efectos", "Effects")],
        "Electric Guitar": [("Cuerpo", "Body"), ("M\u00e1stil", "Neck"), ("Pastillas", "Pickups"), ("Diapas\u00f3n", "Fretboard"), ("Trastes", "Frets")],
        "Acoustic Guitar": [("Tapa", "Top"), ("Fondo y aros", "Back & Sides"), ("M\u00e1stil", "Neck"), ("Diapas\u00f3n", "Fretboard")],
        "PA Speaker": [("Woofer", "Woofer"), ("Potencia", "Power"), ("SPL M\u00e1ximo", "Max SPL"), ("Peso", "Weight")],
        "Wireless System": [("Frecuencia", "Frequency"), ("Rango Din\u00e1mico", "Dynamic Range"), ("Rango de transmisi\u00f3n", "Transmission Range"), ("Micr\u00f3fono incluido", "Mic Included")],
        "DAW": [("Pistas de audio", "Audio Tracks"), ("Pistas MIDI", "MIDI Tracks"), ("Instrumentos incluidos", "Included Instruments"), ("Efectos", "Effects")],
        "Plugin Suite": [("Plugins incluidos", "Included Plugins"), ("Formatos", "Formats"), ("Delay compensaci\u00f3n", "Delay Compensation")],
    }
    
    current_type = type1
    spec_keys = type_spec_keys.get(current_type, [])
    
    is_es = fname.endswith("_es.html")
    guide_id = fname.replace('.html', '').replace('_es', '')
    
    if is_es:
        # Type translations for Spanish
        type_es_map = {
            "Microphone": "Micr\u00f3fono",
            "Headphones": "Auriculares",
            "Studio Monitor": "Monitor de Estudio",
            "Electric Guitar": "Guitarra El\u00e9ctrica",
            "Acoustic Guitar": "Guitarra Ac\u00fastica",
            "Guitar Amp": "Amplificador de Guitarra",
            "DAW": "DAW",
            "Plugin Suite": "Paquete de Plugins",
            "PA Speaker": "Altavoz PA",
            "Wireless System": "Sistema Inal\u00e1mbrico",
            "Audio Interface": "Interfaz de Audio",
        }
        type1 = type_es_map.get(type1, type1)
        type2 = type_es_map.get(type2, type2)
        es_map_old = {
            "Vocal recording and live performance": "Voz en vivo y grabaci\u00f3n",
            "Instrument recording and miking": "Grabaci\u00f3n de instrumentos",
            "Mixing and monitoring": "Mezcla y monitoreo",
            "Wireless listening": "Escucha inal\u00e1mbrica",
            "Studio monitoring and mixing": "Monitoreo y mezcla de estudio",
            "Noise-isolated listening": "Escucha con aislamiento",
            "Budget-friendly monitoring": "Monitoreo econ\u00f3mico",
            "Critical listening and mixing": "Escucha cr\u00edtica y mezcla",
            "Beginners and practice": "Principiantes y pr\u00e1ctica",
            "Guitar and amp tone": "Tono de guitarra y amplificador",
            "Beat-making and production": "Creaci\u00f3n de beats y producci\u00f3n",
            "Music production and recording": "Producci\u00f3n musical y grabaci\u00f3n",
            "Mixing and mastering": "Mezcla y masterizaci\u00f3n",
            "Audio processing": "Procesamiento de audio",
            "Wireless performance": "Presentaci\u00f3n inal\u00e1mbrica",
            "Live sound reinforcement": "Refuerzo de sonido en vivo",
            "Budget home recording": "Grabaci\u00f3n casera econ\u00f3mica",
            "Portable recording on the go": "Grabaci\u00f3n port\u00e1til",
            "Professional studio recording": "Grabaci\u00f3n profesional",
            "Home studio recording": "Grabaci\u00f3n en home studio",
            "Beginners and first-time buyers": "Principiantes y primerizos",
            "Professional users": "Usuarios profesionales",
        }
        best1_final = best_for_es_map.get(best1, es_map_old.get(best1, best1))
        best2_final = best_for_es_map.get(best2, es_map_old.get(best2, best2))
        if best1 == short1 + " users":
            best1_final = "Usuarios de " + short1
        if best2 == short2 + " users":
            best2_final = "Usuarios de " + short2

        snippet_text = "El " + short1 + " es el mejor " + type1.lower() + " para " + best1_final.lower() + ", destacando por " + key1[:60].lower() + ". El " + short2 + " es el mejor " + type2.lower() + " para " + best2_final.lower() + ", ideal para " + key2[:60].lower() + "."
        title = short1 + " vs " + short2 + ": \u00bfCu\u00e1l deber\u00edas elegir?"
        label_price = "Precio"
        label_key = "Caracter\u00edstica Clave"
        label_best = "Ideal Para"
        price_suffix = " USD"
    else:
        best1_final = best1
        best2_final = best2
        snippet_text = "The " + short1 + " is the best " + type1.lower() + " for " + best1_final.lower() + ", offering " + key1[:60].lower() + ". The " + short2 + " is the top " + type2.lower() + " for " + best2_final.lower() + ", with " + key2[:60].lower() + "."
        title = short1 + " vs " + short2 + ": Which One Should You Choose?"
        label_price = "Price"
        label_key = "Key Feature"
        label_best = "Best For"
        price_suffix = ""
    
    # Build spec rows first (if available)
    spec_rows_str = ''
    if specs1 and specs2 and spec_keys:
        for es_key, en_key in spec_keys:
            label = es_key if is_es else en_key
            val1 = specs1.get(es_key if is_es else en_key, '')
            val2 = specs2.get(es_key if is_es else en_key, '')
            spec_rows_str += '            <tr><td class="fs-label">' + label + '</td><td>' + val1 + '</td><td>' + val2 + '</td></tr>\n'
    
    snippet = (
        '      <div class="featured-snippet">\n'
        '        <h2 class="featured-snippet-title">' + title + '</h2>\n'
        '        <p class="featured-snippet-text">' + snippet_text + '</p>\n'
        '        <table class="featured-snippet-table">\n'
        '          <thead>\n'
        '            <tr>\n'
        '              <th></th>\n'
        '              <th>' + short1 + '</th>\n'
        '              <th>' + short2 + '</th>\n'
        '            </tr>\n'
        '          </thead>\n'
        '          <tbody>\n'
        '            <tr><td class="fs-label">' + label_price + '</td><td>$' + price1 + price_suffix + '</td><td>$' + price2 + price_suffix + '</td></tr>\n'
        '            <tr><td class="fs-label">' + label_key + '</td><td>' + key1_short + '</td><td>' + key2_short + '</td></tr>\n'
        '            <tr><td class="fs-label">' + label_best + '</td><td>' + best1_final + '</td><td>' + best2_final + '</td></tr>\n'
        '            <tr><td class="fs-label">' + ('Marca' if is_es else 'Brand') + '</td><td>' + (p1["brand"] if p1 else "") + '</td><td>' + (p2["brand"] if p2 else "") + '</td></tr>\n'
        '            <tr><td class="fs-label">' + ('Puntuaci\u00f3n' if is_es else 'Rating') + '</td><td>' + (str(p1["rating"]) + '/5' if p1 else "") + '</td><td>' + (str(p2["rating"]) + '/5' if p2 else "") + '</td></tr>\n'
        + spec_rows_str +
        '          </tbody>\n'
        '        </table>\n'
        '      </div>'
    )
    
    # Build FAQPage JSON-LD for position-zero optimization
    if guide_id not in snippet_data:
        snippet_data[guide_id] = {}
    if is_es:
        faq_q1 = short1 + " vs " + short2 + ": \u00bfCu\u00e1l deber\u00edas elegir?"
        faq_a1 = snippet_text
        faq_q2 = "\u00bfCu\u00e1l es la diferencia entre " + short1 + " y " + short2 + "?"
        faq_a2 = "El " + short1 + " ($" + price1 + ") es ideal para " + best1_final.lower() + ". El " + short2 + " ($" + price2 + ") est\u00e1 dise\u00f1ado para " + best2_final.lower() + "."
    else:
        faq_q1 = short1 + " vs " + short2 + ": Which one should you choose?"
        faq_a1 = snippet_text
        faq_q2 = "What is the difference between the " + short1 + " and the " + short2 + "?"
        faq_a2 = "The " + short1 + " ($" + price1 + ") is best for " + best1_final.lower() + ". The " + short2 + " ($" + price2 + ") is designed for " + best2_final.lower() + "."
    
    faq_data_obj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": faq_q1,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq_a1
                }
            },
            {
                "@type": "Question",
                "name": faq_q2,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq_a2
                }
            }
        ]
    }
    
    faq_json = json.dumps(faq_data_obj, ensure_ascii=False, indent=2)
    faq_block = '\n<script type="application/ld+json">\n' + faq_json + '\n</script>\n'
    
    # Insert FAQ schema before </head>
    html = re.sub(r'(</head>)', faq_block + r'\1', html)
    
    # Insert snippet right after guide-detail-intro for consistent spacing
    pattern = r'(<div class="guide-detail-intro">.*?</div>)\s*'
    replacement = r'\1\n' + snippet + r'\n'
    
    if re.search(pattern, html):
        new_html = re.sub(pattern, replacement, html, count=1)
        open(path, "w", encoding="utf-8").write(new_html)
        print(f"OK   {fname}")
    else:
        print(f"FAIL {fname}")
    
    # Accumulate featuredSnippet data for guides.json
    guide_id = fname.replace('.html', '').replace('_es', '')
    if guide_id not in snippet_data:
        snippet_data[guide_id] = {}
    if is_es:
        snippet_data[guide_id]['title_es'] = title
        snippet_data[guide_id]['text_es'] = snippet_text
        snippet_data[guide_id]['name1_es'] = short1
        snippet_data[guide_id]['name2_es'] = short2
        snippet_data[guide_id]['best1_es'] = best1_final
        snippet_data[guide_id]['best2_es'] = best2_final
        snippet_data[guide_id]['key1_es'] = key1_short
        snippet_data[guide_id]['key2_es'] = key2_short
        snippet_data[guide_id]['brand1'] = p1["brand"] if p1 else ""
        snippet_data[guide_id]['brand2'] = p2["brand"] if p2 else ""
        snippet_data[guide_id]['rating1'] = p1["rating"] if p1 else ""
        snippet_data[guide_id]['rating2'] = p2["rating"] if p2 else ""
        snippet_data[guide_id]['faq_q1_es'] = faq_q1
        snippet_data[guide_id]['faq_a1_es'] = faq_a1
        snippet_data[guide_id]['faq_q2_es'] = faq_q2
        snippet_data[guide_id]['faq_a2_es'] = faq_a2
        # Full spec comparison data
        if specs1 and specs2 and spec_keys:
            spec_list = []
            for es_key, en_key in spec_keys:
                val1 = specs1.get(en_key, '')
                val2 = specs2.get(en_key, '')
                spec_list.append({"label_es": es_key, "label_en": en_key, "val1": val1, "val2": val2})
            snippet_data[guide_id]['specs'] = spec_list
    else:
        snippet_data[guide_id]['title_en'] = title
        snippet_data[guide_id]['text_en'] = snippet_text
        snippet_data[guide_id]['name1_en'] = short1
        snippet_data[guide_id]['name2_en'] = short2
        snippet_data[guide_id]['price1'] = price1
        snippet_data[guide_id]['price2'] = price2
        snippet_data[guide_id]['type1'] = type1
        snippet_data[guide_id]['type2'] = type2
        snippet_data[guide_id]['key1'] = key1_short
        snippet_data[guide_id]['key2'] = key2_short
        snippet_data[guide_id]['best1_en'] = best1_final
        snippet_data[guide_id]['best2_en'] = best2_final
        snippet_data[guide_id]['brand1'] = p1["brand"] if p1 else ""
        snippet_data[guide_id]['brand2'] = p2["brand"] if p2 else ""
        snippet_data[guide_id]['rating1'] = p1["rating"] if p1 else ""
        snippet_data[guide_id]['rating2'] = p2["rating"] if p2 else ""
        snippet_data[guide_id]['faq_q1_en'] = faq_q1
        snippet_data[guide_id]['faq_a1_en'] = faq_a1
        snippet_data[guide_id]['faq_q2_en'] = faq_q2
        snippet_data[guide_id]['faq_a2_en'] = faq_a2
        # Full spec comparison data
        if specs1 and specs2 and spec_keys:
            spec_list = []
            for es_key, en_key in spec_keys:
                val1 = specs1.get(en_key, '')
                val2 = specs2.get(en_key, '')
                spec_list.append({"label_es": es_key, "label_en": en_key, "val1": val1, "val2": val2})
            snippet_data[guide_id]['specs'] = spec_list

print("\nDone!")

# Update guides.json with featuredSnippet data
data_path = r"C:\Users\Daniel\projects\topmusiciangear\data\guides.json"
guides = json.loads(open(data_path, "r", encoding="utf-8-sig").read())
for guide in guides:
    if guide["id"] in snippet_data:
        guide["featuredSnippet"] = snippet_data[guide["id"]]
open(data_path, "w", encoding="utf-8").write(json.dumps(guides, ensure_ascii=False))
print("Updated guides.json")
