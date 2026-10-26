# -*- coding: utf-8 -*-
"""Print one guide's comparison table as a compact grid (columns x rows)."""
import json
import sys

GID = sys.argv[1]
guides = json.load(open('data/guides.json', encoding='utf-8'))
g = [x for x in guides if x['id'] == GID][0]
pt = g['productTable']
cols = [c.get('title') for c in pt['columns']]

print('GUIDE:', GID, ' columns:', len(cols))
for i, c in enumerate(cols):
    print('  %2d %s' % (i, c))
print()

for row in pt['rows']:
    print('ROW', row.get('label'))
    for i, v in enumerate(row['values']):
        s = v.get('value') if isinstance(v, dict) else v
        print('   %2d %s' % (i, s))
    print()
