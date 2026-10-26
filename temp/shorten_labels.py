import json
p = 'data/products.json'
d = json.load(open(p, encoding='utf-8'))
for prod in d:
    if prod['id'] == 54:  # MOTU M2
        for f in prod['facts']:
            if f['label']['en'] == 'Live meters':
                f['label']['es'] = 'Medidores'
            if f['label']['en'] == 'Preamp gain':
                f['label']['es'] = 'Ganancia'
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for prod in json.load(open(p, encoding='utf-8')):
    if prod['id'] == 54:
        for f in prod['facts']:
            print(f['value'], f['label']['en'], '/', f['label']['es'])
