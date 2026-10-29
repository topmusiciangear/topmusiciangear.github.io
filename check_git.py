import subprocess, json, sys
out=subprocess.check_output(['git','show','6fcac095f8:data/products.json'])
data=json.loads(out.decode('utf-8'))
p=next(x for x in data if x['id']==379)
print(p['desc_es'][:200])
