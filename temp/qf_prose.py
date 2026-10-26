import json, re, sys

g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
pm = {x['id']: x for x in p}

wanted = [int(a) for a in sys.argv[1:]] or [8, 271]

for pid in wanted:
    prod = pm[pid]
    print('#' * 70)
    print(pid, prod['title'])
    print('  price:', prod.get('price'), '| cat:', prod.get('category'))
    print('  desc:', (prod.get('desc') or '')[:600])
    for guide in g:
        ids = set(guide.get('featuredProducts') or [])
        for s in guide.get('sections') or []:
            ids |= set(s.get('products') or [])
        if pid not in ids:
            continue
        text = json.dumps(guide, ensure_ascii=False)
        print('\n--- guide:', guide['id'])
        # find sentences mentioning the product model token
        toks = [t for t in re.split(r'[\s\']+', prod['title']) if len(t) > 2][:4]
        blob = []
        for s in guide.get('sections') or []:
            if pid in (s.get('products') or []):
                blob.append(json.dumps(s, ensure_ascii=False))
        for b in blob:
            print('SECTION:', b[:3000])
