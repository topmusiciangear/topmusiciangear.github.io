# -*- coding: utf-8 -*-
"""Audit the headphone quickfacts against the comparison tables.

Scheme (over/on-ear): Type / Impedance / Driver size.

Two products use a different scheme because their only table cannot fill it:

  * Sennheiser HD 300 Pro (606): Driver Size is "—" (unpublished), so the third
    fact is Weight.
  * Sennheiser IE 900 (268) and Shure SE846 Gen 2 (269): in-ear monitors, and the
    in-ear table has no impedance or driver row, so they use
    Type / Driver size / Frequency response.

Unlike the keyboard audit, a value does not have to come from one fixed guide:
the collector filled each row from the first guide that actually publishes it, so
HD 280 PRO II takes its Driver Size from the tracking table while its Type and
Impedance come from the budget table. The audit therefore accepts a value if it
is a token subset of that row's cell in *any* guide that carries a column for the
product, and only falls back to MANUAL when no table has the row at all.

Values are only ever shortened by dropping words, so a token-subset test still
catches a wrong impedance, driver size or frequency range.

MANUAL covers what no table publishes, taken from the products' own catalog
descriptions (177) and the in-ear table's Type column (269's first fact).

Run:  python temp/qf_diff_headphones.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

LABEL_TO_ROW = {
    'Type': 'Type',
    'Impedance': 'Impedance',
    'Driver size': 'Driver Size',
    'Weight': 'Weight',
    'Frequency response': 'Frequency Response',
}

DEFAULT = ['Type', 'Impedance', 'Driver size']
IEM = ['Type', 'Driver size', 'Frequency response']
NO_DRIVER = ['Type', 'Impedance', 'Weight']

# lead-time guides, in the order the collector prefers them
PRIORITY = ['best-headphones', 'best-headphones-for-mixing',
            'tracking-headphones', 'open-headphones', 'budget-headphones']
# extra guide: carries a Type row for the wired IEM, no driver/impedance rows
EXTRA = ['best-in-ear-monitors']

IEM_IDS = {268, 269}
NO_DRIVER_IDS = {606}

MANUAL = {
    177: {'Type': 'Open-back planar', 'Impedance': '20 Ω',
          'Driver size': '106 mm planar'},
    268: {'Type': 'Wired IEM (single dynamic)', 'Driver size': '7 mm dynamic',
          'Frequency response': '5 Hz – 48 kHz'},
    269: {'Type': 'Wired reference IEM (quad-BA)',
          'Driver size': '4 balanced armature',
          'Frequency response': '15 Hz – 20 kHz'},
}

STOP = {'the', 'and', 'with', 'pro', 'plus', 'mk', 'ii', 'iii', 'studio',
        'headphones', 'headphone', 'in-ear', 'monitors', 'gen'}

DEAD = {'', '—', '-', 'N/A', 'n/a', None}


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


def match_column(cols, title):
    pt = col_toks(title)
    hits = [i for i, c in enumerate(cols)
            if col_toks(c) and (col_toks(c) <= pt or pt <= col_toks(c))]
    if len(hits) > 1:
        hits.sort(key=lambda i: abs(len(col_toks(cols[i])) - len(pt)))
        hits = hits[:1]
    return hits[0] if len(hits) == 1 else None


def icon_allowlist():
    src = open('js/icons.js', encoding='utf-8').read()
    keys = set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M))
    build = open('build-guides.js', encoding='utf-8').read()
    start = build.find('function _qfIcon')
    seg = build[start:build.find('_cardBase', start)]
    return keys | set(re.findall(r"name === '([a-zA-Z]+)'", seg))


def audit(prods, guides, icons):
    """Return (problems, checked).  `prods` is a list of product dicts."""
    gmap = {g['id']: g for g in guides}
    problems = []
    checked = 0

    for p in sorted(prods, key=lambda x: x['id']):
        pid = p['id']
        if p.get('category') != 'headphones':
            continue

        want = (IEM if pid in IEM_IDS
                else NO_DRIVER if pid in NO_DRIVER_IDS
                else DEFAULT)

        bf = p.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, p['title']))

        facts = p.get('facts') or []
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, p['title'], len(facts)))
            continue

        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels != want:
            problems.append('%s %s: labels %s != %s'
                            % (pid, p['title'], labels, want))
            continue

        # every (guide, column index) that carries this product
        spots = []
        for gid in PRIORITY + EXTRA:
            g = gmap.get(gid)
            if not g:
                continue
            cols = [c.get('title') for c in g['productTable']['columns']]
            i = match_column(cols, p['title'])
            if i is not None:
                spots.append((gid, i))

        for f in facts:
            lab = (f.get('label') or {}).get('en')
            val = f.get('value')
            icon = f.get('icon')

            if not icon or icon not in icons:
                problems.append('%s %s: bad icon %r' % (pid, lab, icon))

            if not val or val in DEAD:
                problems.append('%s %s: empty value %r' % (pid, lab, val))
                continue

            # Spanish accent in an English fact value
            if re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
                problems.append('%s %s: accented text in EN value %r'
                                % (pid, lab, val))

            cells = []
            row_label = LABEL_TO_ROW[lab]
            for gid, i in spots:
                for row in gmap[gid]['productTable']['rows']:
                    if row.get('label') != row_label:
                        continue
                    v = row['values'][i]
                    cells.append(v.get('value') if isinstance(v, dict) else v)

            live = [c for c in cells if c not in DEAD]
            manual = MANUAL.get(pid, {}).get(lab)

            if not live and manual is None:
                problems.append('%s %s: no table value and no MANUAL' % (pid, lab))
                continue

            if manual is not None and not live:
                if norm(val) != norm(manual):
                    problems.append('%s %s %r != manual %r' % (pid, lab, val, manual))
                checked += 1
                continue

            if manual is not None:
                # table exists too: it must agree with the manual value
                if not any(toks(manual) <= toks(c) for c in live):
                    problems.append('%s %s: manual %r absent from table %r'
                                    % (pid, lab, manual, live[:3]))

            if not any(toks(val) <= toks(c) for c in live):
                problems.append('%s %s %r not a subset of any table cell %r'
                                % (pid, lab, val, live[:3]))
            checked += 1

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    n_hp = len([p for p in prods if p.get('category') == 'headphones'])
    problems, checked = audit(prods, guides, icon_allowlist())

    print('headphone products:', n_hp)
    print('facts checked     :', checked)
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
