import json, sys

g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
pm = {x['id']: x for x in p}

CAT = sys.argv[1] if len(sys.argv) > 1 else 'guitars'

ids = {x['id'] for x in p if x.get('category') == CAT}
print(f'=== {CAT}: {len(ids)} products ===')
for x in p:
    if x.get('category') == CAT:
        print(f"  {x['id']:5} {x['title']}  [facts={'Y' if x.get('facts') else 'N'}]")

print()
print('=== guides mentioning them ===')
for guide in g:
    feat = [i for i in (guide.get('featuredProducts') or []) if i in ids]
    secs = []
    for s in guide.get('sections') or []:
        for i in (s.get('products') or []):
            if i in ids:
                secs.append(i)
    tbl = []
    pt = guide.get('productTable') or {}
    for c in (pt.get('columns') or []):
        pass
    if feat or secs:
        print(f"\n--- {guide['id']}  (category={guide.get('category')})")
        print(f"    featured: {sorted(set(feat))}")
        print(f"    sections: {sorted(set(secs))}")
        if pt.get('columns'):
            cols = [c.get('title') for c in pt['columns']]
            print(f"    table cols: {cols}")
            for r in (pt.get('rows') or []):
                vals = [v.get('value') if isinstance(v, dict) else v for v in (r.get('values') or [])]
                print(f"      {r.get('label')}: {vals}")
