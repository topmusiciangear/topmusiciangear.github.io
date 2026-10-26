# -*- coding: utf-8 -*-
"""Audit the mixers quickfacts against the comparison tables.

Four sub-schemes, each checked against the guide the facts were taken from:

  analog / digital   Channels     -> "Channels"
                     Preamps      -> "Preamps"
                     Connectivity -> "Connectivity"
  32-channel         Channels     -> "Channels"
                     Mix Buses    -> "Mix Buses"
                     Multitrack   -> "Multitrack Recording"
  compact            Type         -> "Type"
                     USB Recording-> "USB Recording"
                     Mix Buses    -> "Buses / Mixes"

Products are pinned to one guide+column (ASSIGN) because several appear in two or
three tables that phrase the same row differently: the Yamaha MG16XU is "16 line
(8 mono + 4 stereo), 10 mic" in best-live-sound-mixers and has no Preamps row at
all in some others, and the Behringer X32 lives in the 32-channel table while the
X32 *Compact* columns of best-digital-mixers belong to a different console.

Values are only ever shortened by dropping words, so a wrong channel count, preamp
count or connection type fails. When a value states figures, the cell's first
figure must survive (the amps audit's "22W vs 100W (22W tube sim)" trap).

Behringer Xenyx X1222USB (150) is in no table; its facts are pinned in NO_TABLE
from its own description, and every figure in them must appear there.

Run:  python temp/qf_diff_mixers.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

PLAIN = (['Channels', 'Preamps', 'Connectivity'],
         {'Channels': 'Channels',
          'Preamps': 'Preamps',
          'Connectivity': 'Connectivity'})

BIG = (['Channels', 'Mix Buses', 'Multitrack'],
       {'Channels': 'Channels',
        'Mix Buses': 'Mix Buses',
        'Multitrack': 'Multitrack Recording'})

RACK = (['Type', 'USB Recording', 'Mix Buses'],
        {'Type': 'Type',
         'USB Recording': 'USB Recording',
         'Mix Buses': 'Buses / Mixes'})

GROUPS = {
    'plain': (PLAIN, {
        146: ('best-analog-mixers', 2),
        487: ('best-analog-mixers', 4),
        149: ('best-live-sound-mixers', 4),
        145: ('best-digital-mixers', 0),
        147: ('best-digital-mixers', 4),
        148: ('best-digital-mixers', 5),
        410: ('best-digital-mixers', 6),
        411: ('best-digital-mixers', 9),
        413: ('best-digital-mixers', 7),
        482: ('best-digital-mixers', 10),
        486: ('best-digital-mixers', 8),
    }),
    'big': (BIG, {
        402: ('best-32-channel-digital-mixers', 0),
        403: ('best-32-channel-digital-mixers', 1),
        406: ('best-32-channel-digital-mixers', 5),
        408: ('best-32-channel-digital-mixers', 7),
        412: ('best-32-channel-digital-mixers', 6),
    }),
    'rack': (RACK, {
        559: ('best-compact-mixers', 0),
        558: ('best-compact-mixers', 2),
        563: ('best-compact-mixers', 3),
        560: ('best-compact-mixers', 5),
        561: ('best-compact-mixers', 6),
        564: ('best-compact-mixers', 7),
    }),
}

# no table anywhere: pinned from the product description
NO_TABLE = {
    150: {'Channels': '16-input, 2-bus',
          'Preamps': '6 XENYX',
          'Connectivity': 'USB interface'},
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


def audit(prods, guides, icons):
    gmap = {g['id']: g for g in guides}
    desc = {p['id']: (p.get('desc') or '') for p in prods}
    problems = []
    checked = 0

    seen = set()
    for group, ((want_labels, rowmap), assign) in GROUPS.items():
        for pid, (gid, col) in sorted(assign.items()):
            seen.add(pid)
            p = [x for x in prods if x['id'] == pid]
            if not p:
                problems.append('%s: missing product' % pid)
                continue
            problems += check_product(p[0], want_labels, rowmap,
                                      gmap.get(gid), col, icons)
            checked += 3

    for pid, manual in NO_TABLE.items():
        seen.add(pid)
        p = [x for x in prods if x['id'] == pid]
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        p = p[0]
        labels = [f['label']['en'] for f in p.get('facts') or []]
        if sorted(labels) != sorted(manual.keys()):
            problems.append('%s %s: labels %s != %s'
                            % (pid, p['title'][:30], labels, list(manual.keys())))
            continue
        for f in p['facts']:
            lab = f['label']['en']
            if not f.get('icon') or f['icon'] not in icons:
                problems.append('%s %s: bad icon %r' % (pid, lab, f.get('icon')))
            if norm(f['value']) != norm(manual[lab]):
                problems.append('%s %s %r != manual %r'
                                % (pid, lab, f['value'], manual[lab]))
            missing_nums = numbers(f['value']) - numbers(desc.get(pid, ''))
            if missing_nums:
                problems.append('%s %s: figures %s not in the description'
                                % (pid, lab, sorted(missing_nums)))
            checked += 1

    for p in prods:
        if p.get('category') == 'mixers' and p['id'] not in seen:
            problems.append('%s %s: not covered by any sub-scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def check_product(p, want_labels, rowmap, g, col, icons):
    pid = p['id']
    problems = []
    facts = p.get('facts') or []

    bf = p.get('bestFor') or {}
    if not bf.get('en') or not bf.get('es'):
        problems.append('%s %s: bestFor missing en/es' % (pid, p['title'][:40]))
    if len(facts) != 3:
        problems.append('%s %s: %d facts (expected 3)'
                        % (pid, p['title'][:40], len(facts)))
        return problems

    labels = [(f.get('label') or {}).get('en') for f in facts]
    if labels != want_labels:
        problems.append('%s %s: labels %s != %s'
                        % (pid, p['title'][:40], labels, want_labels))
        return problems

    if not g:
        problems.append('%s: guide missing' % pid)
        return problems

    for f in facts:
        lab = f['label']['en']
        val = f.get('value')
        icon = f.get('icon')
        if not icon or icon not in icons:
            problems.append('%s %s: bad icon %r' % (pid, lab, icon))
        if not val or val in DEAD:
            problems.append('%s %s: empty value' % (pid, lab))
            continue
        if re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
            problems.append('%s %s: accented text in EN value %r' % (pid, lab, val))

        c = cell(g, col, rowmap[lab])
        if c in DEAD:
            problems.append('%s %s: empty cell in %s' % (pid, lab, g['id']))
            continue
        if not toks(val) <= toks(c):
            problems.append('%s %s %r not a subset of %s cell %r'
                            % (pid, lab, val, g['id'], c))
            continue
        val_nums = numbers(val)
        cell_nums = [w for w in norm(c).split() if re.fullmatch(r'\d+(\.\d+)?', w)]
        if val_nums and cell_nums and cell_nums[0] not in val_nums:
            problems.append('%s %s %r drops the leading figure of %r'
                            % (pid, lab, val, c))
    return problems


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'mixers'])
    print('mixer products :', n)
    print('facts checked  :', checked)
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
