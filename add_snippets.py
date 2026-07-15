import re, os

guides_dir = r"C:\Users\Daniel\projects\topmusiciangear\guides"
files = sorted(f for f in os.listdir(guides_dir) if "-vs-" in f and f.endswith(".html"))

import locale
locale.setlocale(locale.LC_ALL, '')

for fname in files:
    path = os.path.join(guides_dir, fname)
    html = open(path, "r", encoding="utf-8").read()
    
    # Strip any existing snippet regardless of position
    html = re.sub(r'\s*<div class="guide-featured-snippet">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    html = re.sub(r'\s*<div class="featured-snippet">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    html = re.sub(r'\s*<div class="featured-direct-answer">.*?</div>\s*', '', html, count=1, flags=re.DOTALL)
    
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
    
    is_es = fname.endswith("_es.html")
    
    if is_es:
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

        snippet_text = short1 + " destaca por " + key1[:80].lower() + ", mientras que " + short2 + " es ideal para " + key2[:80].lower() + ". " + short1 + " cuesta $" + price1 + " y " + short2 + " $" + price2 + "."
        title = short1 + " vs " + short2 + ": Comparativa R\u00e1pida"
        label_price = "Precio"
        label_type = "Tipo"
        label_key = "Caracter\u00edstica Clave"
        label_best = "Ideal Para"
        price_suffix = " USD"
    else:
        best1_final = best1
        best2_final = best2
        snippet_text = "Choose the " + short1 + " if you value " + key1[:80].lower() + ". Go with the " + short2 + " if " + key2[:80].lower() + " is your priority."
        title = short1 + " vs " + short2 + ": Quick Comparison"
        label_price = "Price"
        label_type = "Type"
        label_key = "Key Feature"
        label_best = "Best For"
        price_suffix = ""
    
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
        '            <tr><td class="fs-label">' + label_type + '</td><td>' + type1 + '</td><td>' + type2 + '</td></tr>\n'
        '            <tr><td class="fs-label">' + label_key + '</td><td>' + key1_short + '</td><td>' + key2_short + '</td></tr>\n'
        '            <tr><td class="fs-label">' + label_best + '</td><td>' + best1_final + '</td><td>' + best2_final + '</td></tr>\n'
        '          </tbody>\n'
        '        </table>\n'
        '      </div>'
    )
    
    # Insert snippet right after guide-detail-intro for consistent spacing
    pattern = r'(<div class="guide-detail-intro">.*?</div>)\s*'
    replacement = r'\1\n' + snippet + r'\n'
    
    if re.search(pattern, html):
        new_html = re.sub(pattern, replacement, html, count=1)
        open(path, "w", encoding="utf-8").write(new_html)
        print(f"OK   {fname}")
    else:
        print(f"FAIL {fname}")

print("\nDone!")
