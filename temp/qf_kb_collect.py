# -*- coding: utf-8 -*-
"""Build the keyboard quickfacts plan from the guide tables.

Sub-type schemes (the three specs that actually decide the purchase):

  piano       best-digital-pianos   Keyboard Action / Polyphony / Weight
  stage       best-stage-keyboards  Keys & Action / Weight / Sound Engines
  synth       best-synthesizers     Type / Keys / Polyphony
  controller  best-keyboard         Keys / Connectivity / Weight

Column titles and catalog titles do not always match exactly ("Casio PX-S1100"
vs "Casio Privia PX-S1100 Digital Piano"), so columns are matched by token
subset. Two synths (Sequential Prophet-10, Moog Muse) are not in any comparison
table; their values are written from their own catalog description, which is
already published on the site, and are marked MANUAL in the audit.

Writes temp/kb_plan.json and prints a review grid.
"""
import json
import re

STOP = {'digital', 'piano', 'keyboard', 'keyboards', 'synthesizer', 'synth',
        'arius', 'privia', 'stage', 'series', 'the', 'and', 'with'}


def toks(s):
    return {w for w in re.split(r'[^a-z0-9]+', str(s).lower()) if w and w not in STOP}


SCHEMES = {
    'piano': ('best-digital-pianos', ['Keyboard Action', 'Polyphony', 'Weight']),
    'stage': ('best-stage-keyboards', ['Keys & Action', 'Weight', 'Sound Engines']),
    'synth': ('best-synthesizers', ['Type', 'Keys', 'Polyphony']),
    'controller': ('best-keyboard', ['Keys', 'Connectivity', 'Weight']),
}

ASSIGN = {
    571: 'piano', 572: 'piano', 140: 'piano', 141: 'piano',
    565: 'piano', 573: 'piano', 567: 'piano',
    11: 'stage', 637: 'stage', 638: 'stage', 639: 'stage', 640: 'stage',
    641: 'stage', 642: 'stage', 643: 'stage', 644: 'stage',
    142: 'synth', 143: 'synth', 174: 'synth', 475: 'synth', 476: 'synth',
    477: 'synth', 478: 'synth', 175: 'synth', 176: 'synth',
    13: 'controller', 14: 'controller', 323: 'controller', 324: 'controller',
    325: 'controller', 363: 'controller', 370: 'controller',
}

GUIDES = {g['id']: g for g in json.load(open('data/guides.json', encoding='utf-8'))}
PRODUCTS = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}


def find_col(gid, title):
    cols = [c.get('title') for c in GUIDES[gid]['productTable']['columns']]
    pt, ct = toks(title), [toks(c) for c in cols]
    hits = [i for i, c in enumerate(ct) if c and (c <= pt or pt <= c)]
    if len(hits) > 1:
        # prefer the closest length (least extra words)
        hits.sort(key=lambda i: abs(len(ct[i]) - len(pt)))
        if len(ct[hits[0]]) != len(ct[hits[1]]) or ct[hits[0]] != ct[hits[1]]:
            hits = hits[:1]
    return hits[0] if len(hits) == 1 else None


def cell(gid, row_label, col_idx):
    if col_idx is None:
        return None
    for row in GUIDES[gid]['productTable']['rows']:
        if row.get('label') == row_label:
            v = row['values'][col_idx]
            return v.get('value') if isinstance(v, dict) else v
    return None


# Synths absent from the tables: values straight from their catalog description.
MANUAL = {
    175: {'Type': 'Analog synth', 'Keys': '61 keys, velocity + AT',
          'Polyphony': '10 voices'},
    176: {'Type': 'Analog synth', 'Keys': '61 keys', 'Polyphony': '8 voices'},
}

plan = {}
problems = []

for pid, sub in sorted(ASSIGN.items(), key=lambda kv: (kv[1], kv[0])):
    p = PRODUCTS[pid]
    gid, rows = SCHEMES[sub]
    idx = find_col(gid, p['title'])
    vals = {}
    for r in rows:
        if pid in MANUAL:
            vals[r] = MANUAL[pid][r]
            continue
        v = cell(gid, r, idx)
        if v is None:
            problems.append((pid, p['title'], gid, r, 'column index %s' % idx))
        vals[r] = v
    plan[pid] = {'title': p['title'], 'sub': sub, 'guide': gid,
                 'col': None if idx is None else
                 GUIDES[gid]['productTable']['columns'][idx].get('title'),
                 'rows': rows, 'values': vals}
    print('%-10s %3d %-34s | %s' % (sub, pid, p['title'][:34],
                                    ' | '.join('%-29s' % str(vals[r])[:29] for r in rows)))

print()
print('PROBLEMS:', len(problems))
for x in problems:
    print('  ', x)

json.dump(plan, open('temp/kb_plan.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

# length report
print()
over = [(pid, r, v, len(v)) for pid, d in plan.items() for r, v in d['values'].items()
        if isinstance(v, str) and len(v) > 28]
print('values over 28 chars: %d' % len(over))
for pid, r, v, n in sorted(over, key=lambda x: -x[3]):
    print('   %3d %-16s %2d  %s' % (pid, r, n, v))
