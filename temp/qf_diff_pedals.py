# -*- coding: utf-8 -*-
"""Audit the pedals quickfacts against the five pedal-guide product tables.

Source: temp/specs_pedals_clean.json (built by temp/qf_pedal_rows.py), which
reads ONLY best-looper-pedals, best-multi-effects-pedals,
best-overdrive-distortion, best-reverb-delay, guitar-pedals and best-amp-modelers.
Using the generic collector here is wrong: it scans every guide, so a pedal that
also sits in another category's table picks up that category's cells.

Sub-schemes:
  Type / Bypass / Current draw   (all but the five amp-modeler-guide products)
  Type / Models / Battery        (202, 203, 205, 258, 259)

Comparison rules:
  * Type, Bypass, Models -> token subset of the table cell (values are only ever
    shortened by dropping words, so a wrong word still fails; numbers stay as
    tokens).
  * Current draw, Battery -> exact (they are short and must not be paraphrased).
  * 258 and 259 have no Type row in the table at all; their type comes from the
    maker's product description and is asserted against MANUAL.

Run:  python temp/qf_diff_pedals.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

SPECS = 'temp/specs_pedals_clean.json'
P_PATH = 'data/products.json'

KEY = {
    'Type': 'Type',
    'Bypass': 'Bypass',
    'Current draw': 'Current Draw',
    'Models': 'Models',
    'Battery': 'Battery',
}

SUBSET_LABELS = {'Type', 'Bypass', 'Models'}
EXACT_LABELS = {'Current draw', 'Battery'}

PEDALS = ['Type', 'Bypass', 'Current draw']
MODELERS = ['Type', 'Models', 'Battery']

MODELER_IDS = {202, 203, 205, 258, 259}

# no Type row exists in the table for these two
MANUAL_TYPE = {
    258: 'Amp modeler / capture',
    259: 'Multi-effects / modeler',
}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    return set(norm(s).split())


def main():
    specs = json.load(open(SPECS, encoding='utf-8'))
    prods = [x for x in json.load(open(P_PATH, encoding='utf-8'))
             if x.get('category') == 'pedals']

    problems = []
    checked = 0
    for prod in prods:
        pid = prod['id']
        want = MODELERS if pid in MODELER_IDS else PEDALS
        facts = prod.get('facts') or []
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, prod['title'], len(facts)))
            continue
        bf = prod.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, prod['title']))
        if not (prod.get('bestFor') or {}).get('es'):
            pass

        got = [(f.get('value'), (f.get('label') or {}).get('en')) for f in facts]
        labels = [g[1] for g in got]
        if labels != want:
            problems.append('%s labels %s != expected %s' % (pid, labels, want))
            continue

        s = specs.get(str(pid)) or {}
        for val, lab in got:
            if lab == 'Type' and pid in MANUAL_TYPE:
                if val != MANUAL_TYPE[pid]:
                    problems.append('%s Type %r != manual %r'
                                    % (pid, val, MANUAL_TYPE[pid]))
                checked += 1
                continue
            vals = s.get(KEY[lab]) or []
            if not vals:
                problems.append('%s %s: no table value' % (pid, lab))
                continue
            if lab in SUBSET_LABELS:
                if not toks(val) <= toks(' '.join(vals)):
                    problems.append('%s %s %r not a subset of %r'
                                    % (pid, lab, val, vals))
            elif lab in EXACT_LABELS:
                if norm(val) not in [norm(v) for v in vals]:
                    problems.append('%s %s %r not in table %r'
                                    % (pid, lab, val, vals))
            else:
                problems.append('%s %s: unknown label rule' % (pid, lab))
            checked += 1

    print('pedal products :', len(prods))
    print('facts checked  :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


sys.exit(main())
