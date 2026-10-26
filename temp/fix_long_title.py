# -*- coding: utf-8 -*-
"""Shorten one guide's titleTag so it fits Google's 60-character title budget.

Only the tag (and therefore <title>, og:title and <h1>) changes; the editorial
`title` / `title_es` and the meta description are left alone. Rewritten by hand
instead of truncating: cutting mid-phrase would leave a dangling descriptor.
"""
import json

PATH = 'data/guides.json'
GID = 'best-monitors-for-small-rooms'
NEW_EN = 'Best Monitors for Small & Untreated Rooms (Pros & Cons)'

guides = json.load(open(PATH, encoding='utf-8'))
for g in guides:
    if g['id'] != GID:
        continue
    old = g.get('titleTag')
    g['titleTag'] = NEW_EN
    print('before:', repr(old), len(old))
    print('after :', repr(g['titleTag']), len(g['titleTag']))

open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(guides, ensure_ascii=False, indent=2) + '\n')
