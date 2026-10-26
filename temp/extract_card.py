import re
p='guides/best-monitors_es.html'
s=open(p,encoding='utf-8').read()
# find product card region containing JBL
for m in re.finditer(r'JBL 305P MkII', s):
    chunk=s[m.start():m.start()+1200]
    if 'guide-product-card-desc' in chunk:
        i=chunk.find('guide-product-card-desc">')+len('guide-product-card-desc">')
        j=chunk.find('</div>', i)
        out=chunk[i:j]
        open('temp/jbl_card_desc.txt','w',encoding='utf-8').write(out)
        break