import json
with open('data/products.json', encoding='utf-8', errors='replace') as f:
    text=f.read()
import re
m=re.search(r'"id":\s*379.*?\"desc_es\":\s*\"(.*?)\",', text, re.DOTALL)
if m:
    s=m.group(1)
    print(s[:500])
