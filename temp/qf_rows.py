# -*- coding: utf-8 -*-
"""Compact table dump: columns plus only the requested rows.

Usage:  python temp/qf_rows.py <guide-id> [row label ...]
        (no rows given = only the column list)

Keeps the output small when a guide has eleven rows and the interesting ones are
three. Column indexes are printed so they can be pasted straight into an audit's
COLS map.
"""
import json
import sys

gid = sys.argv[1]
want = sys.argv[2:]

g = [x for x in json.load(open('data/guides.json', encoding='utf-8')) if x['id'] == gid]
if not g:
    raise SystemExit('no guide %r' % gid)
g = g[0]
t = g['productTable']
cols = [c.get('title') for c in t['columns']]
print('GUIDE %s  (%d cols)' % (gid, len(cols)))
for i, c in enumerate(cols):
    print('  [%d] %s' % (i, c))

labels = [r.get('label') for r in t['rows']]
print('  rows:', labels)

for lab in want:
    print('\nROW %s' % lab)
    row = [r for r in t['rows'] if r.get('label') == lab]
    if not row:
        print('    (missing)')
        continue
    for i, v in enumerate(row[0]['values']):
        val = v.get('value') if isinstance(v, dict) else v
        print('    [%d] %s' % (i, val))
