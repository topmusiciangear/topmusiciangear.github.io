# -*- coding: utf-8 -*-
"""Debug the corpus the accessories audit builds for one product."""
import importlib.util
import json

spec = importlib.util.spec_from_file_location('qfa', 'temp/qf_diff_accessories.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

guides = {g['id']: g for g in json.load(open('data/guides.json', encoding='utf-8'))}
prods = json.load(open('data/products.json', encoding='utf-8'))
guides['_desc'] = {p['id']: (p.get('desc') or '') for p in prods}

for pid in (173, 170, 39):
    c = m.corpus_for(pid, guides)
    print(pid, repr(c[:400]))
    print('   has positions:', 'positions' in m.toks(c),
          '| tokens 380:', '380' in m.toks(c))
    print()
