# -*- coding: utf-8 -*-
"""Audit the keyboards quickfacts against the sub-type comparison tables.

Each product is checked against the table its sub-type belongs to, not against
every guide (a stage piano that also appears in best-keyboard must match the
stage table, which is where its facts were taken from):

  piano       best-digital-pianos   Keyboard Action / Polyphony / Weight
  stage       best-stage-keyboards  Keys & Action / Weight / Sound Engines
  synth       best-synthesizers     Type / Keys / Polyphony
  controller  best-keyboard         Keys / Connectivity / Weight

Rule: every fact value must be a token subset of the corresponding table cell,
because values are only ever shortened by dropping words. Numbers therefore
have to survive as tokens, so a wrong polyphony or weight still fails.

Sequential Prophet-10 (175) and Moog Muse (176) are in no table; their facts come
from their catalog description and are checked against MANUAL instead.

Run:  python temp/qf_diff_keyboards.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

KEY = {
    'Keyboard action': 'Keyboard Action',
    'Keys & action': 'Keys & Action',
    'Keys': 'Keys',
    'Polyphony': 'Polyphony',
    'Weight': 'Weight',
    'Sound engines': 'Sound Engines',
    'Type': 'Type',
    'Connectivity': 'Connectivity',
}

SCHEMES = {
    'piano': ('best-digital-pianos',
              ['Keyboard action', 'Polyphony', 'Weight']),
    'stage': ('best-stage-keyboards',
              ['Keys & action', 'Weight', 'Sound engines']),
    'synth': ('best-synthesizers',
              ['Type', 'Keys', 'Polyphony']),
    'controller': ('best-keyboard',
                   ['Keys', 'Connectivity', 'Weight']),
}

ASSIGN = {
    571: 'piano', 572: 'piano', 140: 'piano', 141: 'piano',
    565: 'piano', 573: 'piano', 567: 'piano', 570: 'piano',
    11: 'stage', 637: 'stage', 638: 'stage', 639: 'stage', 640: 'stage',
    641: 'stage', 642: 'stage', 643: 'stage', 644: 'stage',
    142: 'synth', 143: 'synth', 174: 'synth', 475: 'synth', 476: 'synth',
    477: 'synth', 478: 'synth', 175: 'synth', 176: 'synth',
    13: 'controller', 14: 'controller', 323: 'controller', 324: 'controller',
    325: 'controller', 363: 'controller', 370: 'controller',
}

# Not in any comparison table: values from the catalog description.
MANUAL = {
    175: {'Type': 'Analog synth', 'Keys': '61 keys, velocity + AT',
          'Polyphony': '10 voices'},
    176: {'Type': 'Analog synth', 'Keys': '61 keys', 'Polyphony': '8 voices'},
}

STOP = {'digital', 'piano', 'keyboard', 'keyboards', 'synthesizer', 'synth',
        'arius', 'privia', 'stage', 'series', 'the', 'and', 'with'}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    return set(norm(s).split())


def col_toks(s):
    return {w for w in re.split(r'[^a-z0-9]+', str(s).lower())
            if w and w not in STOP}


def main():
    guides = {g['id']: g for g in json.load(open('data/guides.json', encoding='utf-8'))}
    prods = {p['id']: p for p in json.load(open(P_PATH, encoding='utf-8'))}

    # resolve each product's column index once
    colidx = {}
    for pid, sub in ASSIGN.items():
        gid = SCHEMES[sub][0]
        cols = [c.get('title') for c in guides[gid]['productTable']['columns']]
        pt = col_toks(prods[pid]['title'])
        hits = [i for i, c in enumerate(cols)
                if col_toks(c) and (col_toks(c) <= pt or pt <= col_toks(c))]
        if len(hits) > 1:
            hits.sort(key=lambda i: abs(len(col_toks(cols[i])) - len(pt)))
            hits = hits[:1]
        colidx[pid] = hits[0] if len(hits) == 1 else None

    problems = []
    checked = 0

    for pid, sub in sorted(ASSIGN.items()):
        prod = prods.get(pid)
        if not prod:
            problems.append('%s: missing product' % pid)
            continue
        gid, want = SCHEMES[sub]
        facts = prod.get('facts') or []

        bf = prod.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, prod['title']))
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, prod['title'], len(facts)))
            continue

        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels != want:
            problems.append('%s %s: labels %s != %s'
                            % (pid, prod['title'], labels, want))
            continue

        idx = colidx[pid]
        for f in facts:
            lab = (f.get('label') or {}).get('en')
            val = f.get('value')
            if pid in MANUAL:
                exp = MANUAL[pid].get(KEY[lab])
                if norm(val) != norm(exp):
                    problems.append('%s %s %r != manual %r'
                                    % (pid, lab, val, exp))
                checked += 1
                continue
            if idx is None:
                problems.append('%s %s: no column match in %s'
                                % (pid, prod['title'], gid))
                continue
            cell = None
            for row in guides[gid]['productTable']['rows']:
                if row.get('label') == KEY[lab]:
                    v = row['values'][idx]
                    cell = v.get('value') if isinstance(v, dict) else v
            if cell is None:
                problems.append('%s %s: no %s row in %s' % (pid, prod['title'], lab, gid))
                continue
            if not toks(val) <= toks(cell):
                problems.append('%s %s %r not a subset of table %r'
                                % (pid, lab, val, cell))
            checked += 1

    print('keyboard products :', len(ASSIGN))
    print('facts checked     :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


sys.exit(main())
