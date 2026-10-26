# -*- coding: utf-8 -*-
"""Audit the interfaces quickfacts against the comparison tables.

Three sub-schemes, each checked row by row against the guide it was taken from:

  standard  Inputs / Outputs -> "Inputs / Outputs"
            Preamps         -> "Preamps"
            Connectivity    -> "Connectivity"
  premium   Conversion      -> "Conversion / Clock"
            Preamps         -> "Preamp Character"
            Connectivity    -> "Connectivity"
  streaming Type            -> "Type"
            Mic Inputs      -> "Mic Inputs"
            Loopback        -> "Loopback"

Each product is pinned to one guide+column (ASSIGN), because several appear in two
or three tables that phrase the same row differently (MOTU M2 is "2, 60 dB gain" in
best-interface and "2, +60 dB" in budget-interfaces). Checking the one the facts
came from keeps the audit honest without pretending the tables agree word for word.

Values are only ever shortened by dropping words, so a wrong I/O count, gain figure
or connection type fails. The leading figure of a cell must also survive when the
value states figures at all: "22 dB" must not pass as a subset of "130 dB (22 dB
mode)" -- not a real case here, but the same trap the amps audit hit.

Apollo x16 Gen 2 (182) is in no comparison table. Its three facts come from its own
catalog description and are pinned in MANUAL; the audit still requires every figure
in them to appear in that description, so nothing can be invented there either.

Run:  python temp/qf_diff_interfaces.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

STANDARD = (['Inputs / Outputs', 'Preamps', 'Connectivity'],
            {'Inputs / Outputs': 'Inputs / Outputs',
             'Preamps': 'Preamps',
             'Connectivity': 'Connectivity'})
PREMIUM = (['Conversion', 'Preamps', 'Connectivity'],
           {'Conversion': 'Conversion / Clock',
            'Preamps': 'Preamp Character',
            'Connectivity': 'Connectivity'})
STREAM = (['Type', 'Mic Inputs', 'Loopback'],
          {'Type': 'Type',
           'Mic Inputs': 'Mic Inputs',
           'Loopback': 'Loopback'})

GROUPS = {
    'standard': (STANDARD, {
        15: ('best-interface', 0),
        16: ('best-interface', 2),
        17: ('best-interface', 3),
        18: ('best-interface', 1),
        53: ('best-interface', 4),
        54: ('best-interface', 5),
        55: ('best-interface', 6),
        263: ('best-interface', 7),
        679: ('best-interface', 8),
        262: ('budget-interfaces', 5),
        550: ('budget-interfaces', 6),
        551: ('budget-interfaces', 8),
        328: ('portable-interfaces', 2),
    }),
    'premium': (PREMIUM, {
        512: ('premium-interfaces', 0),
        515: ('premium-interfaces', 1),
        513: ('premium-interfaces', 2),
        183: ('premium-interfaces', 3),
        676: ('premium-interfaces', 4),
        677: ('premium-interfaces', 5),
    }),
    'streaming': (STREAM, {
        239: ('streaming-interfaces', 0),
        240: ('streaming-interfaces', 1),
        678: ('streaming-interfaces', 6),
    }),
}

# no table anywhere: pinned from the product description
NO_TABLE = {
    182: {'Inputs / Outputs': '16 in / 20 out',
          'Conversion': '167 dB dynamic range',
          'Connectivity': 'Thunderbolt 3'},
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
            p = p[0]
            problems += check_product(p, want_labels, rowmap, gmap.get(gid), col,
                                      icons)
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

    # anything else in the category would silently escape the audit
    for p in prods:
        if p.get('category') == 'interfaces' and p['id'] not in seen:
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

    n = len([p for p in prods if p.get('category') == 'interfaces'])
    print('interface products:', n)
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
