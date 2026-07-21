import json

with open('data/products.json', 'rb') as f:
    raw_bytes = f.read()

print('=== BYTE-LEVEL ANALYSIS ===')
print(f'Total file size: {len(raw_bytes)} bytes')
print()

# Check for U+FFFD (EF BF BD) 
fffd_count = raw_bytes.count(b'\xef\xbf\xbd')
print(f'U+FFFD replacement chars: {fffd_count}')

# Check for lone bytes that are not valid UTF-8
# In UTF-8: bytes 0x80-0xBF are continuation bytes, should only appear after lead bytes
lone_continuation = 0
for i, b in enumerate(raw_bytes):
    if 0x80 <= b <= 0xBF:
        # Check if preceded by a valid lead byte within last 3 bytes
        if i == 0:
            lone_continuation += 1
        else:
            prev = raw_bytes[i-1]
            if not (0xC2 <= prev <= 0xF4):
                lone_continuation += 1

print(f'Lone continuation bytes: {lone_continuation}')

# Check for overlong sequences
print(f'\n=== ALL SPANISH TEXTS (desc_es) ===')
print()

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.loads(f.read())

for p in products:
    desc_es = p.get('desc_es', '')
    title_es = p.get('title_es', '')
    problems = []
    
    # Check for specific missing accents
    missing = []
    # Common Spanish words that should have accents
    word_checks = {
        'musica': 'música',
        'electronico': 'electrónico',
        'exito': 'éxito',
        'tipico': 'típico',
        'calido': 'cálido',
        'iconico': 'icónico',
        'increible': 'increíble',
        'practica': 'práctica',
        'practico': 'práctico',
        'caracteristicas': 'características',
        'genero': 'género',
        'anadir': 'añadir',
    }
    
    # Tokenize desc_es
    words = desc_es.lower().split()
    for word in set(words):
        # Strip punctuation
        clean = word.strip('.,;:!?"\'()[]{}—–-')
        if clean in word_checks:
            problems.append(f'  "{clean}" should be "{word_checks[clean]}"')

    if problems:
        print(f'--- Product {p["id"]}: {p["title"]} ---')
        for prob in problems:
            print(prob)
        print(f'  desc_es: {desc_es[:120]}')
        print()

print('=== Done ===')
