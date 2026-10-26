import json

PATH = 'data/products.json'
data = json.load(open(PATH, encoding='utf-8'))
n = 0
for p in data:
    for f in (p.get('facts') or []):
        lab = f.get('label') or {}
        if lab.get('en') == 'Frequency response':
            lab['en'] = 'Frequency range'
            lab['es'] = 'Rango de frecuencia'
            f['icon'] = 'freq'
            n += 1
open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(data, ensure_ascii=False, indent=2) + '\n'
)
print('relabelled', n)
