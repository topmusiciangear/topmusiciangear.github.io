import json
p = 'data/products.json'
d = json.load(open(p, encoding='utf-8'))
for prod in d:
    if prod['id'] == 434:
        for f in prod['facts']:
            if f['label']['en'] == 'Bass cut':
                f['icon'] = 'sineWave'
            if f['label']['en'] == 'Max SPL':
                f['icon'] = 'gauge'
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('done')
# verify
for prod in json.load(open(p, encoding='utf-8')):
    if prod['id'] == 434:
        for f in prod['facts']:
            print(f['icon'], f['value'], f['label']['en'])
