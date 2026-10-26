# -*- coding: utf-8 -*-
"""Audit the drum-machine quickfacts (14 products).

Three sub-schemes:

  drum machines (best-drum-machine)
      Type         -> "Type"
      Tracks       -> "Tracks"
      Sound Engine -> "Sound Engine"

  portables (compact-rhythm-devices)
      Type         -> "Type"
      Sound Engine -> "Sound Engine"
      Battery      -> "Battery"

  samplers (per product)
      Storage      -> "Sample Memory"  (best-samplers-drum-computers)
                   -> "Storage"        (best-hardware-samplers)
      Effects      -> "Effects"
      Connectivity -> "Connectivity"

The samplers group pins 188 and 255 to best-samplers-drum-computers and 257 to
best-hardware-samplers column 1 on purpose: columns 4, 5 and 6 of
best-hardware-samplers carry Type / Tracks / Sample Memory / Sequencer / Effects /
Weight values under Pads / Screen / Effects / Storage / Polyphony / Working RAM
labels. Auditing 188 against that table would compare its sample memory to a
sequencer description and its effects list to a weight in kilos. Column 1 has no
such shift.

Values are shortened only by dropping words, so a wrong engine, track count or
battery time fails. When a value states figures, the cell's first figure must
survive ("8 GB RAM / 128 GB storage" cannot become "128 GB storage").

Run:  python temp/qf_diff_drummachine.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

DRUM = (['Type', 'Tracks', 'Sound Engine'],
        {'Type': 'Type', 'Tracks': 'Tracks', 'Sound Engine': 'Sound Engine'})
PORT = (['Type', 'Sound Engine', 'Battery'],
        {'Type': 'Type', 'Sound Engine': 'Sound Engine', 'Battery': 'Battery'})
SAMP = (['Storage', 'Effects', 'Connectivity'],
        {'Storage': None, 'Effects': 'Effects', 'Connectivity': 'Connectivity'})

GROUPS = {
    'drum': (DRUM, {
        129: ('best-drum-machine', 1),
        33: ('best-drum-machine', 3),
        256: ('best-drum-machine', 4),
        127: ('best-drum-machine', 5),
    }),
    'portable': (PORT, {
        621: ('compact-rhythm-devices', 2),
        622: ('compact-rhythm-devices', 3),
        623: ('compact-rhythm-devices', 5),
        624: ('compact-rhythm-devices', 6),
        625: ('compact-rhythm-devices', 7),
        144: ('compact-rhythm-devices', 8),
        128: ('compact-rhythm-devices', 9),
    }),
    'sampler': (SAMP, {
        255: ('best-samplers-drum-computers', 3),
        188: ('best-samplers-drum-computers', 2),
        257: ('best-hardware-samplers', 1),
    }),
}

# the Storage row is named differently in the two sampler tables
STORAGE_ROW = {'best-samplers-drum-computers': 'Sample Memory',
               'best-hardware-samplers': 'Storage'}

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


def check_product(p, want_labels, rowmap, gid, col, g, icons):
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
        problems.append('%s: guide %s missing' % (pid, gid))
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

        row_label = rowmap[lab]
        if row_label is None:                      # Storage, table-dependent
            row_label = STORAGE_ROW[gid]
        c = cell(g, col, row_label)
        if c in DEAD:
            problems.append('%s %s: empty cell %r in %s' % (pid, lab, row_label, gid))
            continue
        if not toks(val) <= toks(c):
            problems.append('%s %s %r not a subset of %s cell %r'
                            % (pid, lab, val, gid, c))
            continue
        val_nums = numbers(val)
        cell_nums = [w for w in norm(c).split() if re.fullmatch(r'\d+(\.\d+)?', w)]
        if val_nums and cell_nums and cell_nums[0] not in val_nums:
            problems.append('%s %s %r drops the leading figure of %r'
                            % (pid, lab, val, c))
    return problems


def audit(prods, guides, icons):
    gmap = {g['id']: g for g in guides}
    by_id = {p['id']: p for p in prods}
    problems = []
    checked = 0
    seen = set()

    for group, ((want_labels, rowmap), assign) in GROUPS.items():
        for pid, (gid, col) in sorted(assign.items()):
            seen.add(pid)
            p = by_id.get(pid)
            if not p:
                problems.append('%s: missing product' % pid)
                continue
            problems += check_product(p, want_labels, rowmap, gid, col,
                                      gmap.get(gid), icons)
            checked += 3

    for p in prods:
        if p.get('category') == 'drum-machine' and p['id'] not in seen:
            problems.append('%s %s: not covered by any sub-scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'drum-machine'])
    print('drum-machine products :', n)
    print('facts checked         :', checked)
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
