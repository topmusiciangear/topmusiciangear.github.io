txt=open('js/guide-scores.js',encoding='utf-8').read()
idx=txt.find('"budget-mics"')
sub=txt[idx:]
# find the line with '  },' after the block
import re
m=re.search(r'\n\s+\},', sub)
print(m.start() if m else None)
print(repr(sub[m.start()-200:m.start()+20]))
