import json, re, sys

# The full descriptions as they were before the "fit to 4 lines" truncation
# commits (commit f836ef5876^). These are complete, whole-sentence texts.
src = {p['id']: p for p in json.load(open('temp/products_full_original.json', encoding='utf-8'))}
cur = json.load(open('data/products.json', encoding='utf-8'))

restored = kept = 0
for p in cur:
    o = src.get(p['id'])
    if not o:
        kept += 1
        continue
    for f in ('desc', 'desc_es'):
        val = (o.get(f) or '').strip()
        if val and val != p.get(f):
            p[f] = val
            restored += 1
        elif val:
            kept += 1

# sanity: nothing empty, no ellipsis cuts, every text ends a sentence
bad = []
for p in cur:
    for f in ('desc', 'desc_es'):
        v = (p.get(f) or '').strip()
        if not v:
            bad.append((p['id'], f, 'EMPTY'))
        elif re.search(r'(\.\.\.|…)\s*$', v):
            bad.append((p['id'], f, 'ELLIPSIS'))
        elif not re.search(r'[.!?)"\']$', v):
            bad.append((p['id'], f, 'NOEND: ' + v[-40:]))

json.dump(cur, open('data/products.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

lens = sorted(len(p.get(f) or '') for p in cur for f in ('desc', 'desc_es'))
print('restored fields', restored, 'unchanged', kept)
print('n', len(lens), 'min', lens[0], 'median', lens[len(lens) // 2], 'p90', lens[int(len(lens) * .9)], 'max', lens[-1])
print('problems', len(bad))
for b in bad[:20]:
    print(' ', b)
