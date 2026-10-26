# -*- coding: utf-8 -*-
"""Audit the amps quickfacts against the comparison tables.

Scheme: Type / Power / Speaker.

Each product is checked against the one guide+column its facts were taken from
(ASSIGN), row by row: the value must be a token subset of that exact cell. Values
are only ever shortened by dropping words, so a wrong wattage or the wrong
cabinet fails.

Some models appear in two tables. When the other table phrases the same row
differently (Fender Rumble 40 V3 is "Solid-state combo" in the practice table and
"Analog combo" in the bass-amp table) that is reported as a note, not a failure:
both wordings are in the published tables and the quickfacts show one of them
consistently. A *number* that disagrees between tables would be a real problem and
is reported too, for a human to settle.

Run:  python temp/qf_diff_amps.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

# id -> (guide, column index) the facts were taken from
ASSIGN = {
    71: ('guitar-bass-amps', 0),
    72: ('best-practice-amps', 1),
    73: ('guitar-bass-amps', 2),
    74: ('guitar-bass-amps', 3),
    75: ('best-bass-amps', 0),
    76: ('best-bass-amps', 1),
    130: ('best-practice-amps', 0),
    131: ('best-practice-amps', 2),
    132: ('best-bass-amps', 2),
    293: ('best-practice-amps', 3),
    294: ('best-practice-amps', 4),
    484: ('best-bass-amps', 4),
    485: ('best-bass-amps', 5),
    488: ('best-practice-amps', 5),
    489: ('best-bass-practice-amps', 2),
    490: ('best-bass-practice-amps', 0),
    491: ('best-bass-practice-amps', 1),
    492: ('best-bass-practice-amps', 4),
    503: ('guitar-bass-amps', 6),
    552: ('best-bass-amps', 3),
    556: ('guitar-bass-amps', 5),
    557: ('guitar-bass-amps', 1),
    627: ('guitar-bass-amps', 8),
    628: ('guitar-bass-amps', 9),
    629: ('guitar-bass-amps', 10),
}

WANT = ['Type', 'Power', 'Speaker']

# every column of every amp table, so the cross-check can find the other listings
ALL_COLS = {
    'guitar-bass-amps': ['Fender Blues Junior IV', 'Boss Katana-50 EX Gen 3', 'Vox AC30',
                         'Marshall DSL40CR', 'Fender Rumble 500 V3',
                         'Ampeg Rocket Bass RB-115',
                         'Yamaha THR30II Wireless Desktop Amp', 'Positive Grid Spark 2',
                         'Fender Mustang GTX100', 'Markbass CMD 102 P V',
                         'Fender Tone Master Deluxe Reverb'],
    'best-bass-arms': [],
    'best-bass-amps': ['Ampeg Rocket Bass RB-210', 'Fender Rumble 500 V3',
                       'Markbass Mini CMD 121P V', 'Boss Katana-110 Bass',
                       'Orange Crush Bass 50', 'Darkglass DG210A Microtubes 500',
                       'Fender Rumble 40 V3'],
    'best-bass-practice-amps': ['Fender Rumble 40 V3', 'Orange Crush Bass 25',
                                'Positive Grid Spark MINI', 'Yamaha THR30II',
                                'Boss WAZA-AIR Bass', 'Darkglass DG210A'],
    'best-practice-amps': ['Fender Champion II 25', 'Boss Katana 50 Gen 3',
                           'Orange Crush 35RT', 'Yamaha THR10II',
                           'Positive Grid Spark 2', 'Boss Waza-Air'],
}

DEAD = {'', '—', '-', 'N/A', 'n/a', None}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    s = re.sub(r'(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])', ' ', s)
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    out = set()
    for w in norm(s).split():
        w = w.strip('.')
        if w:
            out.add(w)
    return out


def numbers(s):
    return {w for w in toks(s) if re.fullmatch(r'\d+(\.\d+)?', w)}


def icon_allowlist():
    src = open('js/icons.js', encoding='utf-8').read()
    keys = set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M))
    build = open('build-guides.js', encoding='utf-8').read()
    start = build.find('function _qfIcon')
    seg = build[start:build.find('_cardBase', start)]
    return keys | set(re.findall(r"name === '([a-zA-Z]+)'", seg))


def cell(g, col, row_label):
    for row in g['productTable']['rows']:
        if row.get('label') == row_label:
            v = row['values'][col]
            return v.get('value') if isinstance(v, dict) else v
    return None


def audit(prods, guides, icons, notes=None):
    gmap = {g['id']: g for g in guides}
    problems = []
    checked = 0

    for pid, (gid, col) in sorted(ASSIGN.items()):
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
            problems.append('%s %s: %d facts (expected 3)' % (pid, p['title'], len(facts)))
            continue

        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels != WANT:
            problems.append('%s %s: labels %s != %s' % (pid, p['title'], labels, WANT))
            continue

        g = gmap.get(gid)
        if not g:
            problems.append('%s: missing guide %s' % (pid, gid))
            continue

        for f in facts:
            lab = (f.get('label') or {}).get('en')
            val = f.get('value')
            icon = f.get('icon')
            if not icon or icon not in icons:
                problems.append('%s %s: bad icon %r' % (pid, lab, icon))
            if not val or val in DEAD:
                problems.append('%s %s: empty value' % (pid, lab))
                continue
            if re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
                problems.append('%s %s: accented text in EN value %r' % (pid, lab, val))

            c = cell(g, col, lab)
            if c in DEAD:
                problems.append('%s %s: empty cell in %s' % (pid, lab, gid))
                continue
            if not toks(val) <= toks(c):
                problems.append('%s %s %r not a subset of %s cell %r'
                                % (pid, lab, val, gid, c))
            else:
                # A subset is not enough when the cell carries several figures:
                # "22W" is a subset of "100W (22W tube sim)" but says the opposite.
                # Require the cell's leading figure to survive.
                # Only when the value speaks in figures. Dropping the wattage from a
                # Type (\"Solid-state, 250W ...\" -> \"Solid-state\") is intentional:
                # Power already carries it.
                val_nums = numbers(val)
                cell_nums = [w for w in norm(c).split()
                             if re.fullmatch(r'\d+(\.\d+)?', w)]
                if val_nums and cell_nums and cell_nums[0] not in val_nums:
                    problems.append('%s %s %r drops the leading figure of %r'
                                    % (pid, lab, val, c))
            checked += 1

            # cross-guide: same row, other table, different numbers?
            if notes is None:
                continue
            for gid2, g2 in gmap.items():
                cols = ALL_COLS.get(gid2) or []
                # exact token match only: "Boss WAZA-AIR Bass" must not be compared
                # against the "Boss Waza-Air" column, which is a different product
                hits = [i for i, t in enumerate(cols)
                        if toks(t) and toks(t) == toks(p['title'])]
                if len(hits) != 1 or (gid2 == gid and hits[0] == col):
                    continue
                c2 = cell(g2, hits[0], lab)
                if c2 in DEAD or toks(val) <= toks(c2):
                    continue
                diff = numbers(val) ^ numbers(c2)
                notes.append('%s %s: %r (%s) vs %r (%s)%s'
                             % (pid, lab, val, gid, c2, gid2,
                                '  <-- NUMBERS DIFFER' if diff else ''))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    notes = []
    problems, checked = audit(prods, guides, icon_allowlist(), notes)

    n = len([p for p in prods if p.get('category') == 'amps'])
    print('amp products :', n)
    print('facts checked:', checked)
    print()
    if notes:
        print('cross-guide wording differences (notes, not failures):')
        for x in sorted(set(notes)):
            print('  ', x)
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
