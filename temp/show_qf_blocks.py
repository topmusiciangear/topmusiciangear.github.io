# -*- coding: utf-8 -*-
"""Print every rendered quickfacts block (bestFor + the three fact values).

Each block starts at a qf-card qf-bestfor card, so slicing from one bestFor to the
next avoids having to balance the nested divs.
"""
import re
import sys

for name in sys.argv[1:]:
    h = open('guides/%s.html' % name, encoding='utf-8').read()
    marks = [m.start() for m in re.finditer(r'qf-card qf-bestfor', h)]
    print('=== %s  (%d blocks)' % (name, len(marks)))
    for i, s in enumerate(marks):
        e = marks[i + 1] if i + 1 < len(marks) else s + 4000
        seg = h[s:e]
        vals = [re.sub(r'<[^>]+>', ' ', x).strip()
                for x in re.findall(r'class="qf-value">(.*?)</div>', seg, re.S)]
        labs = [re.sub(r'<[^>]+>', ' ', x).strip()
                for x in re.findall(r'class="qf-label">(.*?)</div>', seg, re.S)]
        print('  %d  %s' % (i + 1, vals[0] if vals else '?'))
        for lab, v in zip(labs, vals[1:]):
            print('        %-22s %s' % (lab, v))
    print()
