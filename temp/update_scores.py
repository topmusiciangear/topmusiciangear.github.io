import re
path='js/guide-scores.js'
txt=open(path,'r',encoding='utf-8').read()

new_block='''  "budget-mics": {
   "Rode NT1 Signature Series": 9.9,
   "Audio-Technica AT2035": 9.6,
   "sE Electronics X1 S": 9.5,
   "Shure SM57": 9.5,
   "Lewitt LCT 240 PRO": 9.4,
   "Audio-Technica AT2020 Studio Condenser Microphone": 9.2,
   "Micrófono de condensador de estudio Audio-Technica AT2020": 9.2,
   "sE Electronics sE7": 9.1,
   "Sennheiser e935": 9.0,
   "Shure SM58": 8.9,
   "AKG P120 Medium-Diaphragm Condenser Microphone": 8.8,
   "Micrófono de condensador de diafragma mediano AKG P120": 8.8
  }'''

m = re.search(r'"budget-mics":\s*\{', txt)
if not m:
    print('not found')
    raise SystemExit(1)
start = m.start()
sub = txt[start:]
end_match = re.search(r'\n  \},', sub)
if not end_match:
    print('end not found')
    raise SystemExit(1)
end = start + end_match.end()
new_txt = txt[:start] + new_block + '\n,' + txt[end:].lstrip('\n')
open(path,'w',encoding='utf-8').write(new_txt)
print('done')
