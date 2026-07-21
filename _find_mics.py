import json
with open('data/products.json', 'r', encoding='utf-8') as f:
    prods = json.load(f)

# Find all mics
candidates = []
for p in prods:
    title = p.get('title', '').lower()
    price = p.get('price', 0)
    cat = p.get('category', '')
    
    kw = ['microphone', 'mic', 'condenser', 'u 87', 'c414', 'c-800', 'sm7', 'sm58', 'beta', 'pga', 'pg58', 'e835', 'e935', 'e945', 'e906', 'e609', 'd5', 'd7']
    is_mic = any(k in title for k in kw)
    
    if is_mic and price >= 200:
        stores = p.get('stores', {})
        has_g4m = 'gear4music' in stores
        candidates.append((p['id'], p['title'], price, p.get('rating', ''), has_g4m, list(stores.keys()), cat))

candidates.sort(key=lambda x: x[2], reverse=True)
print('Studio mics >= $200:')
for id, title, price, rating, has_g4m, store_keys, cat in candidates:
    g4m = 'Y' if has_g4m else 'N'
    print('  id=%d %s $%d rating=%s g4m=%s cat=%s stores=%s' % (id, title[:40], price, rating, g4m, cat, store_keys))
