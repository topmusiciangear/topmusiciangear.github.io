# -*- coding: utf-8 -*-
"""Compare the EN and ES cells of the reverb-delay table row by row.

If only one language is shifted, one array was edited without the other and the
surviving language shows the intended order.
"""
import json

g = [x for x in json.load(open('data/guides.json', encoding='utf-8'))
     if x['id'] == 'best-reverb-delay'][0]
pt = g['productTable']
cols = [c['title'] for c in pt['columns']]

for row in pt['rows']:
    vals = row['values']
    en = [v.get('value') if isinstance(v, dict) else v for v in vals]
    es = [v.get('value_es') if isinstance(v, dict) else '' for v in vals]
    diff = [i for i in range(len(vals)) if en[i] != es[i]]
    print('ROW %-18s cells=%d  differing=%s' % (row['label'], len(vals), diff))
    if diff:
        for i in diff:
            print('   %2d %-38s | %s | %s' % (i, cols[i][:38], en[i], es[i]))
    print()

# What the guide's own sections say about each pedal (first sentence only)
print('SECTIONS')
for s in g.get('sections', []):
    t = s.get('heading', '')
    body = (s.get('content') or '')[:150]
    print('  -', t)
    print('    ', body.replace('\n', ' ')[:150])
