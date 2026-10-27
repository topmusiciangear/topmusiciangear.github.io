txt=open('js/guide-scores.js',encoding='utf-8').read()
idx=txt.find('"budget-mics"')
print(idx)
print(txt[idx:idx+400])
