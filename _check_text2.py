with open('guides/pro-microphones_es.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for the text the user sees
needles = [
    'estándar profesional',
    'tres patrones polares',
    ',599',
    'santo grial',
    'Michael Jackson',
    'Dr. Dre',
    'U 87 Ai ($',
    'U 87 Ai (',
]
for n in needles:
    idx = content.find(n)
    if idx >= 0:
        start = max(0, idx - 100)
        end = min(len(content), idx + 200)
        print(f'Found "{n}" at {idx}: ...{content[start:end]}...')
        print()
    else:
        print(f'NOT found: {n}')
