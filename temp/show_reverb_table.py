# -*- coding: utf-8 -*-
"""Print the reverb-delay comparison table from the built page, column by column.

The four right-hand columns were interleaved in the source data; this shows what
the reader actually gets so the alignment can be checked at a glance.
"""
import re

h = open('guides/best-reverb-delay.html', encoding='utf-8').read()

# the productTable block
m = re.search(r'<table class="guide-table".*?</table>', h, re.S)
if not m:
    m = re.search(r'<table[^>]*>.*?</table>', h, re.S)
tbl = m.group(0)

heads = [re.sub(r'<[^>]+>', '', x).strip()
         for x in re.findall(r'<th[^>]*>(.*?)</th>', tbl, re.S)]
print('COLUMNS:', heads)
print()

rows = re.findall(r'<tr[^>]*>(.*?)</tr>', tbl, re.S)
for row in rows:
    cells = [re.sub(r'<[^>]+>', '', c).strip()
             for c in re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)]
    if cells:
        print(' / '.join(cells))
