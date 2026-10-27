txt=open('build-guides.js','r',encoding='utf-8').read()
# Find first entry after opening brace
import re
# Find the segment where 1052 entry starts
m=re.search(r'const TEST_SHOP_BTN = \{', txt)
if not m:
    raise SystemExit('not found')
start=m.end()
# insert after 1052 entry closing }
# Find 1052: { ... }, pattern
# We'll insert after the line containing '  1052: {'
# Easier: insert after the line with '  1056:'? Let's find position of 1056 entry start
idx1056=txt.find('  1056:', m.end())
if idx1056==-1:
    raise SystemExit('1056 not found')
# Insert before 1056
insertion = '''  1055: {
    prices: {
      andertons: "£114.00",
      zzounds: "$199.00",
      musicstore: "€169.00",
      gear4music: "£119.00",
      amazon: "$179.00"
    }
  },\n'''
new_txt=txt[:idx1056]+insertion+txt[idx1056:]
open('build-guides.js','w',encoding='utf-8').write(new_txt)
print('inserted')
