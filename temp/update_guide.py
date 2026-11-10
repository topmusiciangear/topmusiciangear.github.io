import json

guides_path = r'C:\Users\Daniel\projects\topmusiciangear\data\guides.json'
products_path = r'C:\Users\Daniel\projects\topmusiciangear\data\products.json'

with open(guides_path, 'r', encoding='utf-8') as f:
    guides = json.load(f)

guide = None
for g in guides:
    if g.get('id') == 'best-daw-for-beginners':
        guide = g
        break

if not guide:
    raise SystemExit('Guide not found')

# FAQs English
faq_en = [
    ("What is the easiest DAW for beginners?",
     "FL Studio Producer Edition and Fender Studio Pro 8 are the easiest entry points. FL Studio uses a visual, pattern-based grid that makes drum programming highly intuitive. Fender Studio Pro 8 relies on a seamless \"drag-and-drop\" system and interactive Smart Templates that set up your entire recording session with a single click."),
    ("Do I need to spend hundreds of dollars on a \"Pro\" or \"Suite\" version?",
     "No, entry-level commercial versions offer the exact same high-end audio quality. Software like Cubase Elements 16 and Ableton Live 12 Intro cost around $99 and provide all the essential tools to write, record, and mix hit songs. The expensive \"Pro\" or \"Suite\" tiers simply bundle advanced technical tools and massive sound libraries that beginners rarely need."),
    ("Should I choose Ableton Live 12 Intro or Cubase Elements 16 if both cost $99?",
     "It depends entirely on your creative style. Choose Ableton Live 12 Intro if you want to make electronic music, work with audio loops, or build beats on the fly using its famous Session View. Choose Cubase Elements 16 if you want a traditional timeline, plan to plug in a MIDI keyboard, and want advanced assistance tools to build clean musical chords."),
    ("Can I use different DAWs for different tasks?",
     "Yes, many hybrid producers split their workflow. For example, it is very common to build fast drum loops in FL Studio and then export those files into Fender Studio Pro 8 to record live vocals, electric guitars, and handle the final mixing. However, mastering one environment first is highly recommended for beginners."),
    ("What DAW should I buy if I primarily record real instruments like guitars?",
     "Fender Studio Pro 8 is the absolute winner for guitarists and songwriters. Because it includes official, built-in digital emulations of legendary Fender Mustang and Rumble amplifiers, you can plug your instrument directly into your audio interface and get a world-class studio tone instantly without buying expensive third-party plug-ins.")
]

faq_es = [
    ("¿Cuál es el DAW más fácil para principiantes?",
     "FL Studio Producer Edition y Fender Studio Pro 8 son los puntos de entrada más sencillos. FL Studio usa una cuadrícula visual basada en patrones que hace la programación de baterías muy intuitiva. Fender Studio Pro 8 se apoya en un sistema de \"arrastrar y soltar\" sin fricciones y en Plantillas Inteligentes interactivas que configuran toda tu sesión de grabación con un solo clic."),
    ("¿Necesito gastar cientos de dólares en una versión \"Pro\" o \"Suite\"?",
     "No, las versiones comerciales de entrada ofrecen la misma calidad de audio de alta gama. Software como Cubase Elements 16 y Ableton Live 12 Intro cuestan alrededor de $99 y proporcionan todas las herramientas esenciales para escribir, grabar y mezclar canciones. Las versiones caras \"Pro\" o \"Suite\" solo incluyen herramientas técnicas avanzadas y bibliotecas de sonido enormes que los principiantes rara vez necesitan."),
    ("¿Debería elegir Ableton Live 12 Intro o Cubase Elements 16 si ambos cuestan $99?",
     "Depende completamente de tu estilo creativo. Elige Ableton Live 12 Intro si quieres hacer música electrónica, trabajar con loops de audio o construir beats al vuelo usando su famosa Vista de Sesión. Elige Cubase Elements 16 si quieres una línea de tiempo tradicional, planeas conectar un teclado MIDI y quieres herramientas de asistencia avanzada para construir acordes musicales limpios."),
    ("¿Puedo usar diferentes DAWs para diferentes tareas?",
     "Sí, muchos productores híbridos dividen su flujo de trabajo. Por ejemplo, es muy común construir loops de batería rápidos en FL Studio y luego exportar esos archivos a Fender Studio Pro 8 para grabar voces en vivo, guitarras eléctricas y hacer la mezcla final. Sin embargo, dominar un entorno primero es altamente recomendable para principiantes."),
    ("¿Qué DAW debería comprar si principalmente grabo instrumentos reales como guitarras?",
     "Fender Studio Pro 8 es el ganador absoluto para guitarristas y compositores. Porque incluye emulaciones digitales oficiales integradas de los legendarios amplificadores Fender Mustang y Rumble, puedes conectar tu instrumento directamente a tu interfaz de audio y obtener un tono de estudio de clase mundial al instante sin comprar plugins de terceros caros.")
]

fs = guide.get('featuredSnippet', {})
for i, (q, a) in enumerate(faq_en, start=1):
    fs[f'faq_q{i}_en'] = q
    fs[f'faq_a{i}_en'] = a
for i, (q, a) in enumerate(faq_es, start=1):
    fs[f'faq_q{i}_es'] = q
    fs[f'faq_a{i}_es'] = a

guide['featuredSnippet'] = fs

# Update verdictProsCons names
vpc = guide.get('verdictProsCons', [])
name_map = {
    'Ableton Live 12 Suite': ('Ableton Live 12 Intro', 'Ableton Live 12 Intro'),
    'Steinberg Cubase Elements 15': ('Steinberg Cubase Elements 16', 'Steinberg Cubase Elements 16')
}
for entry in vpc:
    name = entry.get('name')
    if name in name_map:
        new_en, new_es = name_map[name]
        entry['name'] = new_en
        entry['name_es'] = new_es

# Ensure Fender Studio Pro 8 entry exists in verdictProsCons
has_fender = any(e.get('name') == 'Fender Studio Pro 8' for e in vpc)
if not has_fender:
    # Replace PreSonus Studio One entry with Fender
    for e in vpc:
        if e.get('name') == 'PreSonus Studio One 7 Pro':
            e['name'] = 'Fender Studio Pro 8'
            e['name_es'] = 'Fender Studio Pro 8'
            # Keep pros/cons as is or clear?
            break

# Update sections products arrays: replace IDs
id_replacements = {
    2001: 3002,  # Ableton Live 12 Standard -> Ableton Live 12 Intro
    2002: 3003,  # Steinberg Cubase Elements 15 -> Steinberg Cubase Elements 16
    # 2003 could stay
}
for sec in guide.get('sections', []):
    prods = sec.get('products')
    if isinstance(prods, list):
        new_prods = []
        for pid in prods:
            new_prods.append(id_replacements.get(pid, pid))
        sec['products'] = new_prods

# Update featuredProducts to include new IDs
fp = guide.get('featuredProducts', [])
# Ensure 3001,3002,3003 are present
for pid in [3001,3002,3003]:
    if pid not in fp:
        fp.append(pid)
# Optionally keep 112
guide['featuredProducts'] = fp

# Save guides
with open(guides_path, 'w', encoding='utf-8') as f:
    json.dump(guides, f, ensure_ascii=False, indent=2)

# Update products.json for Reason 14 id 115
with open(products_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    if p.get('id') == 115:
        p['score'] = 8.9
        p['bestFor'] = {
            'en': 'Analog synth lovers, visual sound design and experimental producers.',
            'es': 'Amantes de los sintetizadores analógicos, diseño sonoro visual y productores experimentales.'
        }
        # Ensure platforms fact is present
        # Keep price as is (299)
        break

with open(products_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print('Done')
