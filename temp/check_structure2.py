import re
for fname in ['guides/budget-mics_es.html','guides/best-5-string-basses_es.html']:
    txt=open(fname,encoding='utf-8').read()
    m=re.search(r'<div class="guide-section-imgs">.*?</div>\s*</div>',txt,re.S)
    print('===',fname)
    if m:
        # get first 1500 chars
        s=m.group(0)
        # count children
        cnt = s.count('class="guide-section-img')
        print('img count',cnt)
        # extract structure
        # find all div classes
        classes=re.findall(r'class="([^"]+)"',s)
        print(classes[:20])
    print()
