import json, re

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.loads(f.read())

# Generate a comprehensive report of all texts
lines = []
lines.append('=' * 100)
lines.append('COMPREHENSIVE PRODUCT TEXT REVIEW')
lines.append(f'Total products: {len(products)}')
lines.append('=' * 100)

for p in products:
    pid = p['id']
    lines.append(f'\n--- Product {pid}: {p.get("title","")} ---')
    lines.append(f'  brand:     {p.get("brand","")}')
    lines.append(f'  title:     {p.get("title","")}')
    lines.append(f'  title_es:  {p.get("title_es","")}')
    lines.append(f'  desc:      {p.get("desc","")}')
    lines.append(f'  desc_es:   {p.get("desc_es","")}')

with open('_products_texts.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'Dumped {len(products)} products to _products_texts.txt')

# Also do targeted checks
print('\n=== FINDING SPECIFIC ISSUES ===')
print()

# 1. Check desc_es for common Spanish accent mistakes
accent_checks = [
    ('mastil', 'mástil'), ('electronica', 'electrónica'),
    ('iconico', 'icónico'), ('increiblemente', 'increíblemente'),
    ('calido', 'cálido'), ('musica', 'música'), ('tipico', 'típico'),
    ('practico', 'práctico'), ('practica', 'práctica'),
    ('caracteristicas', 'características'),
    ('genero', 'género'), ('exito', 'éxito'),
    ('anadir', 'añadir'), ('audiofonos', 'audífonos'),
    ('auriculares', ''),  # reference, correct word
    ('altavoz', ''), ('altavoces', ''),
    ('mezclador', ''), ('mezcla', ''),
    ('sonido', ''), ('calidad', ''),
]

for p in products:
    for wrong, right in accent_checks:
        if right and wrong in p.get('desc_es', '').lower():
            print(f'  id={p["id"]:>3} desc_es: "{wrong}" should be "{right}"')
            print(f'          {p["desc_es"][:100]}')

# 2. Find all unique non-ASCII chars in desc_es to spot problem chars
all_chars = set()
for p in products:
    for c in p.get('desc_es', ''):
        if ord(c) > 127:
            all_chars.add(c)

print(f'\nAll non-ASCII chars in desc_es ({len(all_chars)}):')
for c in sorted(all_chars, key=ord):
    print(f'  U+{ord(c):04X} ({c})')

# 3. Check for U+FFFD
count_fffd = sum(1 for p in products for field in ['desc_es', 'title_es', 'desc', 'title'] if '\ufffd' in str(p.get(field, '')))
if count_fffd:
    print(f'\nFOUND {count_fffd} fields with U+FFFD replacement chars!')

# 4. Check desc_es for EN-only text (vs ES)
for p in products:
    de = p.get('desc_es', '')
    if de and len(de) > 30:
        # Count English vs Spanish indicators
        en_words = sum(1 for w in ['the', 'and', 'with', 'for', 'from', 'that', 'this', 'your', 'you', 'is', 'are', 'has', 'have', 'was', 'were', 'been', 'its', 'all', 'can', 'not', 'but', 'our', 'their', 'more', 'into', 'over', 'most', 'after', 'also', 'any', 'each', 'very', 'than', 'then', 'just', 'about', 'would', 'should', 'could', 'only', 'other', 'such', 'like', 'well', 'even', 'still', 'here', 'there', 'which', 'while', 'these', 'those', 'need', 'used', 'make', 'made', 'built'] if w in de.lower().split())
        es_words = sum(1 for w in ['el', 'la', 'los', 'las', 'un', 'una', 'con', 'para', 'por', 'del', 'que', 'es', 'son', 'como', 'más', 'pero', 'todo', 'esta', 'este', 'entre', 'sobre', 'tiene', 'puede', 'muy', 'cada', 'sin', 'desde', 'hasta', 'largo', 'solo', 'también', 'además', 'ideal', 'perfecto', 'legendario', 'profesional', 'calidad', 'sonido', 'guitarra', 'bajo', 'micrófono', 'amplificador', 'estudio', 'música', 'nuevo', 'mejor', 'gran', 'gran', 'mayor', 'menor', 'parte', 'vez', 'años', 'tiempo', 'forma', 'nivel', 'tipo', 'cuerpo', 'tono', 'pastillas', 'mástil'] if w in de.lower().split())
        if en_words > es_words and es_words < 2:
            print(f'  id={p["id"]:>3} desc_es may be English text: {de[:80]}')

# 5. Check desc for ES text
print('\n=== EN fields with possible Spanish text ===')
es_indicators = ['más', 'para', 'con', 'los', 'las', 'del', 'que', 'son', 'como', 'todo',
                 'esta', 'este', 'entre', 'sin', 'desde', 'hasta', 'además', 'ideal',
                 'profesional', 'legendario', 'sonido', 'guitarra', 'bajo', 'micrófono',
                 'amplificador', 'estudio', 'mástil', 'pastillas', 'icónico', 'cálido']
for p in products:
    desc = p.get('desc', '')
    if desc:
        spanish_count = sum(1 for w in es_indicators if w in desc.lower().split())
        accent_count = sum(1 for c in desc if c in 'áéíóúñü')
        if spanish_count >= 2 or accent_count >= 1:
            print(f'  id={p["id"]:>3} desc may have Spanish: {desc[:100]}')

print('\nDone.')
