# -*- coding: utf-8 -*-
"""Audit the studio quickfacts (2 digital mixers).

Both are pinned to best-32-channel-digital-mixers:

    Channels  -> "Channels"
    Mix Buses -> "Mix Buses"
    Multitrack-> "Multitrack Recording"

Two extra checks, because this category is only two products inside a nine-column
table:

  * every column of best-32-channel-digital-mixers must resolve to a catalogue
    product carrying three facts, so one column can never be left blank while the
    build silently renders the rest;
  * a column's fact labels must match one of the two schemes the table uses
    (Channels / Mix Buses / Multitrack, or Channels / Preamps / Connectivity for
    the two products that also appear in a second guide), so a future edit cannot
    quietly introduce a third layout into one table.

Values are shortened only by dropping words, so a wrong channel count or track
count fails. Two figure guards: if the value states figures the cell's leading
figure must survive, and if the cell opens with a figure the value must state one.

Run:  python temp/qf_diff_studio.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'
GUIDE = 'best-32-channel-digital-mixers'

WANT = ['Channels', 'Mix Buses', 'Multitrack']
ROWMAP = {'Channels': 'Channels', 'Mix Buses': 'Mix Buses',
          'Multitrack': 'Multitrack Recording'}

ASSIGN = {
    414: (GUIDE, 2),
    418: (GUIDE, 4),
}

# the two layouts that legitimately coexist in this table
ALLOWED_LABEL_SETS = [
    ['Channels', 'Mix Buses', 'Multitrack'],
    ['Channels', 'Preamps', 'Connectivity'],
]

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
    by_id = {p['id']: p for p in prods}
    by_title = {p['title']: p for p in prods}
    problems = []
    checked = 0
    seen = set()

    for pid, (gid, col) in sorted(ASSIGN.items()):
        seen.add(pid)
        p = by_id.get(pid)
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        facts = p.get('facts') or []
        checked += 3

        bf = p.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, p['title'][:40]))
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, p['title'][:40], len(facts)))
            continue
        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels != WANT:
            problems.append('%s %s: labels %s != %s'
                            % (pid, p['title'][:40], labels, WANT))
            continue

        g = gmap.get(gid)
        if not g:
            problems.append('%s: guide %s missing' % (pid, gid))
            continue

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
                problems.append('%s %s: accented text in EN value %r'
                                % (pid, lab, val))

            c = cell(g, col, ROWMAP[lab])
            if c in DEAD:
                problems.append('%s %s: empty cell in %s' % (pid, lab, gid))
                continue
            if not toks(val) <= toks(c):
                problems.append('%s %s %r not a subset of %s cell %r'
                                % (pid, lab, val, gid, c))
                continue
            val_nums = numbers(val)
            cell_nums = [w for w in norm(c).split()
                         if re.fullmatch(r'\d+(\.\d+)?', w)]
            if val_nums and cell_nums and cell_nums[0] not in val_nums:
                problems.append('%s %s %r drops the leading figure of %r'
                                % (pid, lab, val, c))
            elif cell_nums and not val_nums and norm(c).split()[0] == cell_nums[0]:
                problems.append('%s %s %r states no figure but %r opens with one'
                                % (pid, lab, val, c))

    for p in prods:
        if p.get('category') == 'studio' and p['id'] not in seen:
            problems.append('%s %s: not covered by the scheme'
                            % (p['id'], p['title'][:40]))

    # every column of the table needs a product with three facts, one layout
    g = gmap.get(GUIDE)
    if not g:
        problems.append('guide %s missing' % GUIDE)
        return problems, checked

    for i, coldef in enumerate(g['productTable']['columns']):
        title = coldef.get('title')
        p = by_title.get(title)
        if not p:
            problems.append('column %d %r: no catalogue product' % (i, title))
            continue
        facts = p.get('facts') or []
        if len(facts) != 3:
            problems.append('column %d %r: %d facts' % (i, title, len(facts)))
            continue
        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels not in ALLOWED_LABEL_SETS:
            problems.append('column %d %r: unexpected layout %s'
                            % (i, title, labels))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'studio'])
    print('studio products :', n)
    print('facts checked   :', checked)
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
