# -*- coding: utf-8 -*-
"""Audit the accessories quickfacts.

Three sub-schemes, each checked against the table it was taken from:

  DI boxes      di-box            Type / Connectivity / Weight
  Controllers   midi-controllers  Faders / Protocol / Connectivity
  Stands etc.   monitor-setup + studio-furniture, plus desc for the numbers
                                  those tables omit

DI and controller facts are compared row by row: the value must be a token
subset of that exact cell in that exact column, so a wrong weight or a wrong
fader count fails.

The stands/isolation/room products have no such rows (their tables carry only
Category / Best For / Key Feature), so their facts are checked against a corpus:
every token of the value must appear somewhere in that product's table cells or
its catalog description. That still rejects invented numbers, which is the real
risk here. The K&M 210/2 is the one exception with no numbers anywhere in our
data, so its height and boom come from K&M's spec sheet via Andertons and are
pinned in MANUAL.

Columns are mapped explicitly per guide: these tables hold products whose catalog
titles differ a lot from the column header ("K&M 26722 Monitor Stands (Each)" vs
"K&M 26722 Monitor Stands"), and a fuzzy matcher would silently pick the wrong
column for a stand.

Run:  python temp/qf_diff_accessories.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

SCHEMES = {
    'di': (['Type', 'Connectivity', 'Weight'], 'di-box'),
    'ctrl': (['Faders', 'Protocol', 'Connectivity'], 'midi-controllers'),
    'other': (['Type', None, None], None),   # second/third label varies
}

GROUPS = {
    'di': [445, 446, 447, 448, 449, 450, 451],
    'ctrl': [42, 395, 396, 397, 398, 399, 400],
    'other': [39, 58, 59, 167, 170, 173, 646, 647, 648, 649, 650, 651],
}

# guide -> {product id: column index}, read off temp/qf_table_dump.py
COLS = {
    'di-box': {445: 0, 446: 1, 447: 2, 448: 3, 449: 5, 450: 4, 451: 6},
    'midi-controllers': {42: 0, 395: 1, 396: 2, 397: 3, 398: 4, 399: 5, 400: 6},
    'monitor-setup': {59: 1, 646: 3, 647: 4, 648: 5, 649: 6, 650: 7, 651: 8},
    'studio-furniture': {58: 0, 59: 1, 167: 2, 170: 3, 173: 4, 39: 5, 42: 6},
}

ROW_LABEL = {
    'Type': 'Type',
    'Connectivity': 'Connectivity',
    'Weight': 'Weight',
    'Faders': 'Faders',
    'Protocol': 'Protocol',
}

# expected labels per product for the 'other' group (2nd and 3rd vary by product)
OTHER_LABELS = {
    39: ['Type', 'Material', 'Mesh'],
    58: ['Type', 'Height', 'Boom'],
    59: ['Type', 'Height', 'Capacity'],
    167: ['Type', 'Shielding', 'Connectors'],
    170: ['Type', 'Range', 'Contents'],
    173: ['Type', 'Size', 'Angles'],
    646: ['Type', 'Tilt', 'Capacity'],
    647: ['Type', 'Accuracy', 'Profiles'],
    648: ['Type', 'Resolution', 'Pattern'],
    649: ['Type', 'Filters', 'Works with'],
    650: ['Type', 'Size', 'Max load'],
    651: ['Type', 'Height', 'Capacity'],
}

# numbers that exist only in K&M's spec sheet (via Andertons), not in our data
MANUAL = {
    58: {'Height': '900–1605 mm', 'Boom': '800 mm'},
}

DEAD = {'', '—', '-', 'N/A', 'n/a', None}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    # "263x380mm" and "9V" must tokenise like "263 x 380 mm" and "9 V", otherwise a
    # size written without spaces in the description never matches the value
    s = re.sub(r'(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])', ' ', s)
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    # a period inside a number (6.5) is meaningful, one at the end of a sentence is not
    out = set()
    for w in norm(s).split():
        w = w.strip('.')
        if w:
            out.add(w)
    return out


def icon_allowlist():
    src = open('js/icons.js', encoding='utf-8').read()
    keys = set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M))
    build = open('build-guides.js', encoding='utf-8').read()
    start = build.find('function _qfIcon')
    seg = build[start:build.find('_cardBase', start)]
    return keys | set(re.findall(r"name === '([a-zA-Z]+)'", seg))


def corpus_for(pid, guides):
    """All text of this product's column across the guides that hold it, + desc."""
    parts = []
    for gid, cols in COLS.items():
        if pid not in cols:
            continue
        g = guides.get(gid)
        if not g:
            continue
        i = cols[pid]
        for row in g['productTable']['rows']:
            v = row['values'][i]
            parts.append(v.get('value') if isinstance(v, dict) else v)
            parts.append(v.get('value_es') if isinstance(v, dict) else '')
        parts.append((g['productTable']['columns'][i] or {}).get('title') or '')
    parts.append(guides['_desc'].get(pid, ''))
    return ' '.join(str(x) for x in parts if x)


def audit(prods, guides, icons, reports=None):
    gmap = {g['id']: g for g in guides}
    problems = []
    checked = 0

    acc = [p for p in prods if p.get('category') == 'accessories']
    expected = set(GROUPS['di'] + GROUPS['ctrl'] + GROUPS['other'])
    missing = sorted(expected - {p['id'] for p in acc})
    if missing:
        problems.append('products tagged accessories but not in GROUPS: %s' % missing)

    desc = {p['id']: (p.get('desc') or '') for p in prods}
    gmap['_desc'] = desc

    for group, ids in GROUPS.items():
        want = SCHEMES[group][0]
        for pid in ids:
            p = [x for x in prods if x['id'] == pid]
            if not p:
                problems.append('%s: missing product' % pid)
                continue
            p = p[0]
            facts = p.get('facts') or []

            bf = p.get('bestFor') or {}
            if not bf.get('en') or not bf.get('es'):
                problems.append('%s %s: bestFor missing en/es' % (pid, p['title']))

            if len(facts) != 3:
                problems.append('%s %s: %d facts (expected 3)'
                                % (pid, p['title'], len(facts)))
                continue

            labels = [(f.get('label') or {}).get('en') for f in facts]
            expected_labels = (want if group != 'other'
                               else OTHER_LABELS[pid])
            if labels != expected_labels:
                problems.append('%s %s: labels %s != %s'
                                % (pid, p['title'], labels, expected_labels))
                continue

            for f in facts:
                lab = (f.get('label') or {}).get('en')
                es = (f.get('label') or {}).get('es')
                val = f.get('value')
                icon = f.get('icon')

                if not icon or icon not in icons:
                    problems.append('%s %s: bad icon %r' % (pid, lab, icon))
                if not es:
                    problems.append('%s %s: missing es label' % (pid, lab))
                if not val or val in DEAD:
                    problems.append('%s %s: empty value %r' % (pid, lab, val))
                    continue
                if re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
                    problems.append('%s %s: accented text in EN value %r'
                                    % (pid, lab, val))
                if reports is not None and len(val) > 34:
                    reports.append('%s %s: %d chars %r' % (pid, lab, len(val), val))

                if group in ('di', 'ctrl'):
                    gid = SCHEMES[group][1]
                    g = gmap[gid]
                    idx = COLS[gid][pid]
                    cell = None
                    for row in g['productTable']['rows']:
                        if row.get('label') == ROW_LABEL[lab]:
                            v = row['values'][idx]
                            cell = v.get('value') if isinstance(v, dict) else v
                    if cell in DEAD:
                        problems.append('%s %s: empty table cell in %s'
                                        % (pid, lab, gid))
                        continue
                    if not toks(val) <= toks(cell):
                        problems.append('%s %s %r not a subset of table %r'
                                        % (pid, lab, val, cell))
                    checked += 1
                    continue

                # 'other' group: MANUAL first, else corpus of this product's cells
                manual = MANUAL.get(pid, {}).get(lab)
                if manual is not None:
                    if norm(val) != norm(manual):
                        problems.append('%s %s %r != manual %r' % (pid, lab, val, manual))
                    checked += 1
                    continue

                corpus = corpus_for(pid, gmap)
                if not toks(val) <= toks(corpus):
                    extra = toks(val) - toks(corpus)
                    problems.append('%s %s %r has tokens absent from table+desc: %s'
                                    % (pid, lab, val, sorted(extra)))
                checked += 1

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    reports = []
    problems, checked = audit(prods, guides, icon_allowlist(), reports)

    n = len([p for p in prods if p.get('category') == 'accessories'])
    print('accessory products:', n)
    print('facts checked     :', checked)
    print()
    if reports:
        print('long values (>34 chars, wrap is fine, review only):')
        for r in reports:
            print('  ', r)
        print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


if __name__ == '__main__':
    sys.exit(main())
