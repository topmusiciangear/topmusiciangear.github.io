# -*- coding: utf-8 -*-
"""Whole-catalogue quickfact census.

Reports, per category, how many products have a complete quickfact block
(bestFor en+es and exactly three facts with en+es labels), and lists every
product that is still incomplete.

Run:  python temp/qf_census_all.py
Exit: 0 when nothing is pending.
"""
import json
import sys
from collections import OrderedDict

P_PATH = 'data/products.json'
WANT_FACTS = 3


def is_complete(p):
    bf = p.get('bestFor') or {}
    if not bf.get('en') or not bf.get('es'):
        return False, 'bestFor'
    facts = p.get('facts') or []
    if len(facts) != WANT_FACTS:
        return False, '%d facts' % len(facts)
    for f in facts:
        lab = f.get('label') or {}
        if not lab.get('en') or not lab.get('es'):
            return False, 'label'
        if not f.get('value') or not f.get('icon'):
            return False, 'value/icon'
    return True, ''


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))

    cats = OrderedDict()
    for p in prods:
        cats.setdefault(p.get('category') or '(none)', []).append(p)

    total = len(prods)
    done = 0
    pending = []

    print('%-16s %5s %5s %5s' % ('category', 'total', 'ok', 'todo'))
    for cat in sorted(cats, key=lambda c: (-len(cats[c]), c)):
        items = cats[cat]
        ok = 0
        for p in items:
            good, why = is_complete(p)
            if good:
                ok += 1
            else:
                pending.append((p['id'], cat, p['title'], why))
        done += ok
        print('%-16s %5d %5d %5d' % (cat, len(items), ok, len(items) - ok))

    print()
    print('products        :', total)
    print('complete        :', done)
    print('pending         :', len(pending))
    print('facts rendered  :', done * WANT_FACTS)
    print()

    if pending:
        print('PENDING:')
        for pid, cat, title, why in pending:
            print('  %4d %-16s %-38s %s' % (pid, cat, title[:38], why))
    else:
        print('PENDING: none - every product has bestFor + 3 facts')

    return len(pending)


if __name__ == '__main__':
    sys.exit(main())
