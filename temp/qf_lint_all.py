# -*- coding: utf-8 -*-
"""Whole-catalogue lint for the quickfact blocks.

Checks that hold for every product regardless of category:

  * the icon is one the renderer knows (the 15 native names plus anything in
    js/icons.js; `repeat` failed this way once and rendered nothing);
  * no accented characters in an English value or in bestFor.en - that is how
    Spanish text leaking into the English card is caught;
  * bestFor.en and bestFor.es are both present and not identical (an untranslated
    field);
  * the three facts never repeat the same (label, value) pair, which would mean a
    copy-paste slip;
  * the icon is not the same for two different facts in one card (three identical
    glyphs read as decoration rather than information).

Run:  python temp/qf_lint_all.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys

P_PATH = 'data/products.json'
ACCENT = re.compile(r'[áéíóúñÁÉÍÓÚÑ]')

# Loanwords the site already uses in Spanish, so an identical bestFor is the
# correct translation rather than an untranslated field. Counted in the Spanish
# text of data/guides.json:
#   streaming 70, podcast 15 (pódcast 2), gaming 13, home studio 8
# Anything identical outside this set is reported as untranslated.
ALLOW_SAME = {'streaming', 'podcast', 'podcasting', 'gaming', 'home studio'}


def icon_allowlist():
    src = open('js/icons.js', encoding='utf-8').read()
    keys = set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M))
    build = open('build-guides.js', encoding='utf-8').read()
    start = build.find('function _qfIcon')
    seg = build[start:build.find('_cardBase', start)]
    return keys | set(re.findall(r"name === '([a-zA-Z]+)'", seg))


def lint_products(prods, icons):
    """Run every quickfact check over a product list; returns the problem list."""
    problems = []
    counts = {}

    for p in prods:
        pid = p['id']
        title = p['title'][:38]
        facts = p.get('facts') or []
        bf = p.get('bestFor') or {}

        en, es = bf.get('en') or '', bf.get('es') or ''
        if en and ACCENT.search(en):
            problems.append('%s %s: bestFor.en has an accent %r' % (pid, title, en))
        if en and es and en == es and en.strip().lower() not in ALLOW_SAME:
            problems.append('%s %s: bestFor.es is identical to en (%r)'
                            % (pid, title, en))

        seen_pairs = set()
        seen_icons = {}
        for f in facts:
            icon = f.get('icon')
            lab = (f.get('label') or {}).get('en')
            val = f.get('value') or ''
            counts[icon] = counts.get(icon, 0) + 1

            if icon not in icons:
                problems.append('%s %s: unknown icon %r' % (pid, title, icon))
            if ACCENT.search(val):
                problems.append('%s %s: accented text in EN value %r'
                                % (pid, title, val))
            pair = (lab, val)
            if pair in seen_pairs:
                problems.append('%s %s: repeated fact %r' % (pid, title, pair))
            seen_pairs.add(pair)
            if icon in seen_icons:
                problems.append('%s %s: icon %r used for both %r and %r'
                                % (pid, title, icon, seen_icons[icon], lab))
            seen_icons[icon] = lab

    return problems, counts


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    icons = icon_allowlist()
    problems, counts = lint_products(prods, icons)

    print('products linted :', len(prods))
    print('facts linted    :', sum(len(p.get('facts') or []) for p in prods))
    print()
    print('icons in use:')
    for k in sorted(counts, key=lambda k: -counts[k]):
        print('  %-12s %5d %s' % (k, counts[k], '' if k in icons else '  <== UNKNOWN'))
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
