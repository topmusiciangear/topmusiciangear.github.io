# -*- coding: utf-8 -*-
"""Print the raw EN/ES cells of the two suspicious rows, index by index."""
import json

g = [x for x in json.load(open('data/guides.json', encoding='utf-8'))
     if x['id'] == 'best-reverb-delay'][0]
pt = g['productTable']
cols = [c['title'] for c in pt['columns']]

for row in pt['rows']:
    if row['label'] not in ('Best For', 'Standout Feature', 'Controls'):
        continue
    print('=' * 78)
    print('ROW:', row['label'])
    for i, v in enumerate(row['values']):
        if isinstance(v, dict):
            print('  %2d  %-40s' % (i, cols[i][:40]))
            print('      EN: %r' % v.get('value'))
            print('      ES: %r' % v.get('value_es'))
        else:
            print('  %2d  %-40s %r  (plain string)' % (i, cols[i][:40], v))
