# -*- coding: utf-8 -*-
"""Audit the plugin quickfacts against data/guides.json product tables.

Checks per product, for each of the three facts:
  * Type    -> every token of our value must appear in the table's Type cell
               (we only ever DROP words, never add, so a subset is a valid
                shortened label)
  * Format  -> same token-subset rule (we only drop qualifiers)
  * third   -> exact match against the table's Copy protection / Latency /
               Platforms cell

Eight products have no plugin table at all; their values were verified against
the manufacturer (see the header of temp/apply_qf_plugins.py) and are asserted
exactly here instead.

Run:  python temp/qf_diff_plugins.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

SPECS = 'temp/specs_plugins.json'
P_PATH = 'data/products.json'

# pid -> (type, format, third kind, third value) verified at the manufacturer
MANUAL = {
    122: ('Audio repair suite', 'VST3/AU/AAX', 'plat', 'macOS & Windows'),
    381: ('Mixing plugin suite', 'VST3/AU/AAX', 'plat', 'macOS & Windows'),
    383: ('Intelligent EQ', 'VST/VST3/AU/AAX', 'copy', 'Machine or iLok'),
    384: ('Content-aware limiter', 'VST/VST3/AU/AAX', 'copy', 'Machine or iLok'),
    385: ('Immersive EQ', 'VST3/AU/AAX', 'plat', 'macOS & Windows'),
    389: ('8-band filtered delay', 'VST2/VST3/AU/AAX', 'copy', 'iLok account'),
    1032: ('Pitch correction', 'VST3/AU/AAX + ARA', 'plat', 'macOS & Windows'),
    1040: ('Vocal tuning', 'VST3/AU/AAX', 'plat', 'macOS & Windows'),
}

THIRD_KEY = {'copy': 'copyprot', 'lat': 'latency', 'cpu': 'cpu', 'plat': 'platforms'}
LABEL_KIND = {'Copy protection': 'copy', 'Latency': 'lat', 'CPU load': 'cpu',
              'Platforms': 'plat'}
# same word-dropping shortening applied in temp/apply_qf_plugins.py
CPU_SHORT = {
    'High (multiple instances heavy)': 'High',
    'High (3 engines + modulation)': 'High (3 engines)',
}
# Format tokens that carry real meaning: dropping one (e.g. AAX, i.e. Pro Tools
# support) changes the promise of the card, so they must all survive shortening.
# 'standalone' is allowed to go (the plugin still runs inside a DAW).
FORMAT_TOKENS = {'vst', 'vst2', 'vst3', 'au', 'aax', 'clap', 'ara', 'aax2'}
DROPPABLE = {'standalone'}


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
             if x.get('category') == 'plugins']

    checked = 0
    problems = []
    for prod in prods:
        pid = prod['id']
        facts = prod.get('facts') or []
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)' % (pid, prod['title'], len(facts)))
            continue
        got = [(f.get('icon'), f.get('value'), (f.get('label') or {}).get('en')) for f in facts]
        if not prod.get('bestFor', {}).get('en') or not prod.get('bestFor', {}).get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, prod['title']))

        if pid in MANUAL:
            mt, mf, mk, mv = MANUAL[pid]
            if got[0][1] != mt:
                problems.append('%s type %r != manufacturer %r' % (pid, got[0][1], mt))
            if got[1][1] != mf:
                problems.append('%s format %r != manufacturer %r' % (pid, got[1][1], mf))
            if got[2][1] != mv:
                problems.append('%s third %r != manufacturer %r' % (pid, got[2][1], mv))
            checked += 3
            continue

        s = specs.get(str(pid)) or {}
        if not s:
            problems.append('%s %s: no table data and no MANUAL entry' % (pid, prod['title']))
            continue

        # Type: subset of the table cell
        cell = toks(' '.join(s.get('ptype') or []))
        if not cell:
            problems.append('%s type: no table value' % pid)
        elif not toks(got[0][1]) <= cell:
            problems.append('%s type %r not a subset of %r' % (pid, got[0][1], s.get('ptype')))
        checked += 1

        # Format: subset of the table cell (only qualifiers may be dropped) and
        # every real format token of the cell must survive (see FORMAT_TOKENS).
        cell_toks = toks(' '.join(s.get('format') or []))
        ours = toks(got[1][1])
        if not cell_toks:
            problems.append('%s format: no table value' % pid)
        elif not ours <= cell_toks:
            problems.append('%s format %r not a subset of %r' % (pid, got[1][1], s.get('format')))
        else:
            need = (cell_toks & FORMAT_TOKENS) - DROPPABLE
            lost = need - ours
            if lost:
                problems.append('%s format %r drops %s from %r'
                                % (pid, got[1][1], sorted(lost), s.get('format')))
        checked += 1

        # Third fact: must be an exact table value of the labelled row
        lab = got[2][2]
        kind = LABEL_KIND.get(lab)
        if not kind:
            problems.append('%s third label %r unknown' % (pid, lab))
        else:
            vals = [CPU_SHORT.get(v, v) for v in (s.get(THIRD_KEY[kind]) or [])]
            if got[2][1] not in vals:
                problems.append('%s third %r not in table %s %r' % (pid, got[2][1], THIRD_KEY[kind], vals))
        checked += 1

    print('products with facts:', len([x for x in prods if x.get('facts')]), '/', len(prods))
    print('facts checked       :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


sys.exit(main())
