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

pattern = re.compile(r'"budget-mics":\s*\{.*?\n\s+\},', re.DOTALL)
new_txt = pattern.sub(new_block + '\n,', txt)
open(path,'w',encoding='utf-8').write(new_txt)
print('done')
