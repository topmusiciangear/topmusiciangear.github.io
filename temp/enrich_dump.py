import json

rows = json.load(open('temp/all_card_counts.json', encoding='utf-8'))
prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
by = {}
for r in rows:
    by.setdefault(r['id'], {})[r['f']] = r

short = []
for pid, d in by.items():
    en = d.get('desc', {}).get('w', 99)
    es = d.get('desc_es', {}).get('w', 99)
    if en < 36 or es < 36:
        short.append((pid, en, es))
short.sort()
print('products needing work:', len(short))
with open('temp/enrich_list.txt', 'w', encoding='utf-8') as f:
    for pid, en, es in short:
        p = prods[pid]
        f.write(f"### {pid} | {p['title']} | en={en} es={es}\n")
        f.write(f"EN: {p.get('desc') or ''}\n")
        f.write(f"ES: {p.get('desc_es') or ''}\n\n")
print('written temp/enrich_list.txt')
