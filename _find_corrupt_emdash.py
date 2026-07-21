with open('data/products.json', 'rb') as f:
    raw = f.read()

# The corrupt em dash pattern: â (C3 A2) + € (E2 82 AC) + right-quote (E2 80 9D)
# This is the double-encoding of — (E2 80 94) via Windows-1252
corrupt_seq = b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9d'
count = raw.count(corrupt_seq)
print(f'Found {count} corrupt em dash sequences (â€")')

# Also check for just â€ (without the final right-quote)
corrupt2 = b'\xc3\xa2\xe2\x82\xac'
count2 = raw.count(corrupt2) - count
print(f'Found {count2} partial corrupt sequences (â€ without ")')

# Show all locations
if count > 0:
    print('\nLocations:')
    idx = 0
    locs = []
    while True:
        idx = raw.find(corrupt_seq, idx)
        if idx < 0:
            break
        locs.append(idx)
        # Decode context
        ctx = raw[max(0,idx-20):idx+20]
        try:
            txt = ctx.decode('utf-8', errors='replace')
            print(f'  pos={idx}: ...{txt}...')
        except:
            print(f'  pos={idx}: ...{ctx.hex()}...')
        idx += 1
    
    # Find product IDs containing this corruption
    import json
    products = json.loads(raw.decode('utf-8', errors='replace'))
    print('\nProducts with corrupt em dash:')
    for p in products:
        for field in ['desc', 'desc_es']:
            if '\u00e2\u20ac\u201d' in p.get(field, ''):
                print(f'  id={p["id"]} ({p["title"]}) - {field}')
