import json

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

all_ids = {p['id'] for p in products}

with open('data/guides.json', 'r', encoding='utf-8') as f:
    guides = json.load(f)

# 1. Find all product references in guides and check they exist
missing = []
for g in guides:
    gid = g['id']
    for field in ['featuredProducts']:
        for pid in g.get(field, []):
            if pid not in all_ids:
                missing.append(f'{gid}.{field}: product {pid} NOT FOUND')
    
    for section in g.get('sections', []):
        for pid in section.get('products', []):
            if pid not in all_ids:
                missing.append(f'{gid}.section[{g["sections"].index(section)}].products: product {pid} NOT FOUND')

if missing:
    print(f'Found {len(missing)} missing product refs:')
    for m in missing:
        print(f'  - {m}')
else:
    print('All product references are valid.')

# 2. Check guide: ew100-vs-ulxd
print('\n=== ew100-vs-ulxd ===')
for g in guides:
    if g['id'] == 'ew100-vs-ulxd':
        for k, v in g.items():
            if k.startswith('faq_'):
                print(f'{k}: {str(v)[:150]}')
        break

# 3. Check guide: stage-wireless - product 107 and FAQ duplicate
print('\n=== stage-wireless product refs ===')
for g in guides:
    if g['id'] == 'stage-wireless':
        for field in ['featuredProducts']:
            print(f'{field}: {g.get(field)}')
        for s in g.get('sections', []):
            if 107 in s.get('products', []):
                print(f'section products: {s["products"]}')
                print(f'section heading: {s["heading"]}')
        # Check FAQ for duplicates
        faq_seen = {}
        for k, v in g.items():
            if k.startswith('faq_') and v.strip():
                if k.startswith('faq_q') or k.startswith('faq_a'):
                    key = ('en' if '_en' in k else 'es') + k[-3:]
                    if v in faq_seen:
                        print(f'DUPLICATE FAQ: {k} same as {faq_seen[v]}')
                    faq_seen[v] = k
        break

# 4. Check xr18-vs-cq18t
print('\n=== xr18-vs-cq18t ===')
for g in guides:
    if g['id'] == 'xr18-vs-cq18t':
        for k, v in g.items():
            if k.startswith('faq_'):
                print(f'{k}: {str(v)[:150]}')
        break

# 5. Check active-vs-passive-pa
print('\n=== active-vs-passive-pa ===')
for g in guides:
    if g['id'] == 'active-vs-passive-pa':
        for k, v in g.items():
            if k.startswith('faq_'):
                print(f'{k}: {str(v)[:150]}')
        break
