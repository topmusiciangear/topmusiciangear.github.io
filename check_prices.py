import re
import os
os.chdir(r'C:\Users\Daniel\projects\topmusiciangear\guides')
pages = ['adam-vs-genelec_es.html', 'scarlett-vs-volt.html', 'sm57-vs-sm58.html']
for p in pages:
    html = open(p, 'r', encoding='utf-8').read()
    pat_old = r'guide-product-card-price">\$?([0-9,]+)'
    pat_new = r'guide-product-card-price">\$?([0-9,.]+(?:k|K|m|M)?)'
    old = re.findall(pat_old, html)
    new = re.findall(pat_new, html)
    print(p, 'old:', old, 'new:', new)
