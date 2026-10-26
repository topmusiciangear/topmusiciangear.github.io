import json

d = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
for pid, f in ((488, 'desc_es'), (254, 'desc_es'), (326, 'desc_es'), (666, 'desc_es')):
    t = d[pid][f]
    print('===', pid, f, len(t.split()))
    import re
    sents = re.split(r'(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜÑ¿¡"\'0-9(])', t)
    for i, s in enumerate(sents):
        print('  S%d %d: %s' % (i, len(s.split()), s))
    print()
