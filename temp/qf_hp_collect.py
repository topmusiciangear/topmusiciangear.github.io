# -*- coding: utf-8 -*-
"""Collect the headphone quickfacts from the five headphone guide tables.

Scheme (uniform for over/on-ear headphones):

    Type / Impedance / Driver size

Impedance is the spec that decides whether a phone, a laptop or an interface can
drive them, and it is listed in every headphone table; type and driver size are
the other two rows all five guides share. Sensitivity and frequency response are
also complete, but they are the same story for most of the range and read as
marketing next to the three above.

Two exceptions:

  * Sennheiser HD 300 Pro — the tracking table is its only source and its Driver
    Size cell is "—" (unpublished), so its third fact is Weight.
  * The two in-ear monitors get Type / Driver / Frequency response, because an
    IEM in a wired rig has no wireless band or latency to talk about and the
    in-ear table has no impedance or driver row at all.

Rows are filled per row from the first guide in PRIORITY that carries a real
value, so a product with a "—" in one guide still gets the number another guide
publishes (HD 280 PRO II).

Writes temp/hp_plan.json and prints a review grid.
"""
import json
import re

PRIORITY = ['best-headphones', 'best-headphones-for-mixing',
            'tracking-headphones', 'open-headphones', 'budget-headphones']

STOP = {'the', 'and', 'with', 'pro', 'plus', 'mk', 'ii', 'iii', 'studio',
        'headphones', 'headphone', 'in-ear', 'monitors', 'gen'}

DEFAULT_ROWS = ['Type', 'Impedance', 'Driver Size']
IEM_ROWS = ['Type', 'Driver Size', 'Frequency Response']

# product id -> rows, when the default scheme cannot be filled
OVERRIDE_ROWS = {606: ['Type', 'Impedance', 'Weight']}

# values that are not real data
DEAD = {'', '—', '-', 'N/A', 'n/a', None}


def toks(s):
    s = re.sub(r'[^a-z0-9]+', ' ', str(s).lower())
    return {w for w in s.split() if w and w not in STOP}


GUIDES = {g['id']: g for g in json.load(open('data/guides.json', encoding='utf-8'))}
PRODUCTS = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}

HP = sorted(p['id'] for p in PRODUCTS.values()
            if p.get('category') == 'headphones' and not p.get('facts'))

# In-ear monitors: no table (268) or a table without driver/impedance rows (269)
IEM = {268, 269}


def column_index(gid, title):
    cols = [c.get('title') for c in GUIDES[gid]['productTable']['columns']]
    pt = toks(title)
    hits = [i for i, c in enumerate(cols)
            if toks(c) and (toks(c) <= pt or pt <= toks(c))]
    if len(hits) > 1:
        hits.sort(key=lambda i: abs(len(toks(cols[i])) - len(pt)))
        hits = hits[:1]

    # "Sennheiser HD 490 Pro" must not swallow "Sennheiser HD 490 Pro Plus"
    if len(hits) == 1:
        col = cols[hits[0]]
        a, b = toks(col), pt
        if a != b:
            extra = (a - b) or (b - a)
            if 'plus' in extra:
                return None
    return hits[0] if len(hits) == 1 else None


def cell(gid, row_label, idx):
    for row in GUIDES[gid]['productTable']['rows']:
        if row.get('label') == row_label:
            v = row['values'][idx]
            return v.get('value') if isinstance(v, dict) else v
    return None


plan = {}
problems = []

for pid in HP:
    p = PRODUCTS[pid]
    rows = OVERRIDE_ROWS.get(pid) or (IEM_ROWS if pid in IEM else DEFAULT_ROWS)
    vals = {}
    src = {}
    for r in rows:
        for gid in PRIORITY:
            idx = column_index(gid, p['title'])
            if idx is None:
                continue
            v = cell(gid, r, idx)
            if v not in DEAD:
                vals[r] = v
                src[r] = gid
                break
        if r not in vals:
            problems.append((pid, p['title'], r))
    plan[pid] = {'title': p['title'], 'rows': rows,
                 'values': vals, 'source': src}
    print('%3d %-38s %s' % (pid, p['title'][:38],
                            ' | '.join('%-24s' % ('%s:%s' % (r, vals.get(r)))[:24] for r in rows)))

print()
print('PROBLEMS:', len(problems))
for x in problems:
    print('  ', x)

json.dump(plan, open('temp/hp_plan.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

over = [(pid, r, v, len(v)) for pid, d in plan.items()
        for r, v in d['values'].items() if len(v) > 28]
print()
print('values over 28 chars:', len(over))
for pid, r, v, n in sorted(over, key=lambda x: -x[3]):
    print('   %3d %-18s %2d %s' % (pid, r, n, v))

print()
print('source spread:')
spread = {}
for d in plan.values():
    for r, gid in d['source'].items():
        spread.setdefault(r, {}).setdefault(gid, 0)
        spread[r][gid] += 1
for r, m in spread.items():
    print('  %-18s %s' % (r, m))
