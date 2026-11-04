import json
with open('data/products.json', encoding='utf-8') as f:
    prods=json.load(f)
for p in prods:
    if p.get('id')==9008:
        print(json.dumps(p, indent=2, ensure_ascii=False))
