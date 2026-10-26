# -*- coding: utf-8 -*-
"""Print the ES reverb-delay table rows that were realigned.

Cells are joined with ' | ' so values that legitimately contain a slash
('Looper / Loop Station') are not confused with cell boundaries.
"""
import re

h = open('guides/best-reverb-delay_es.html', encoding='utf-8').read()
tbl = re.search(r'<table class="guide-comp-table".*?</table>', h, re.S).group(0)
heads = [re.sub(r'<[^>]+>', '', x).strip()
         for x in re.findall(r'<th[^>]*>(.*?)</th>', tbl, re.S)]
print('COLUMNS (%d):' % (len(heads) - 1), heads[1:])
print()

for row in re.findall(r'<tr[^>]*>(.*?)</tr>', tbl, re.S):
    cells = [re.sub(r'<[^>]+>', '', c).strip()
             for c in re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)]
    if not cells:
        continue
    label = cells[0]
    print('LABEL:', label, '(%d cells)' % (len(cells) - 1))
    if label not in ('Best For', 'Standout Feature', 'Type'):
        continue
    print('%s (%d cells)' % (label, len(cells) - 1))
    for i, c in enumerate(cells[1:], start=1):
        print('  %2d %-38s | %s' % (i, heads[i][:38], c))
    print()
