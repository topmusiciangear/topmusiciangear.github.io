import re
for p in ['guides/best-keyboard_es.html','guides/best-keyboard.html']:
    s=open(p,encoding='utf-8').read()
    i=s.find('KeyLab Essential 61')
    # find the desc after this card
    j=s.find('guide-product-card-desc">', i)
    k=s.find('</div>', j)
    print(p, repr(s[j+25:k]))
