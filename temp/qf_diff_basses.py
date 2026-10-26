# -*- coding: utf-8 -*-
"""Audit the basses quickfacts against the comparison tables.

Three sub-schemes:

  compact (best-bass-home-office)   Type         -> "Type"
                                    Scale Length -> "Scale Length"
                                    Pickups      -> "Pickups"
  5-string (best-5-string-basses)   Pickups      -> "Pickups"
                                    Scale Length -> "Scale Length"
                                    Body         -> "Body"
  beginner (beginner-bass-guitars)  Pickups      -> "Pickups"
                                    Scale Length -> "Scale Length"
                                    Weight       -> "Weight"

Every product is pinned to one guide+column. The Squier Sonic Bronco (536) sits in
two tables with different wording ("30 in (762 mm)" against "30\" (762 mm)"), so it
is checked against the beginner table, the one its facts came from.

Values are only shortened by dropping words, so a wrong scale, pickup model or body
wood fails. When a value states figures, the cell's first figure must survive.

Run:  python temp/qf_diff_basses.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

COMPACT = (['Type', 'Scale Length', 'Pickups'],
           {'Type': 'Type', 'Scale Length': 'Scale Length', 'Pickups': 'Pickups'})
FIVE = (['Pickups', 'Scale Length', 'Body'],
        {'Pickups': 'Pickups', 'Scale Length': 'Scale Length', 'Body': 'Body'})
BEGIN = (['Pickups', 'Scale Length', 'Weight'],
         {'Pickups': 'Pickups', 'Scale Length': 'Scale Length', 'Weight': 'Weight'})

GROUPS = {
    'compact': (COMPACT, {
        528: ('best-bass-home-office', 0),
        529: ('best-bass-home-office', 1),
        530: ('best-bass-home-office', 2),
        531: ('best-bass-home-office', 3),
        532: ('best-bass-home-office', 4),
        533: ('best-bass-home-office', 5),
        534: ('best-bass-home-office', 6),
        535: ('best-bass-home-office', 7),
        537: ('best-bass-home-office', 9),
    }),
    'five': (FIVE, {
        538: ('best-5-string-basses', 0),
        539: ('best-5-string-basses', 1),
        540: ('best-5-string-basses', 2),
        541: ('best-5-string-basses', 3),
        542: ('best-5-string-basses', 4),
        543: ('best-5-string-basses', 5),
        544: ('best-5-string-basses', 6),
        545: ('best-5-string-basses', 7),
        546: ('best-5-string-basses', 8),
        547: ('best-5-string-basses', 9),
        548: ('best-5-string-basses', 10),
        549: ('best-5-string-basses', 11),
    }),
    'beginner': (BEGIN, {
        1051: ('beginner-bass-guitars', 0),
        536: ('beginner-bass-guitars', 7),
    }),
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


def audit(prods, guides, icons):
    gmap = {g['id']: g for g in guides}
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

    for p in prods:
        if p.get('category') == 'basses' and p['id'] not in seen:
            problems.append('%s %s: not covered by any sub-scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'basses'])
    print('bass products  :', n)
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
