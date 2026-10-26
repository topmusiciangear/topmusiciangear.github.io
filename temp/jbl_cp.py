p='guides/best-monitors_es.html'
s=open(p,encoding='utf-8').read()
i=s.find('legendario monitor')
chunk=s[i:i+120]
open('temp/jbl_codepoints.txt','w',encoding='utf-8').write(repr(chunk)+'\n'+' '.join(f'U+{ord(c):04X}' for c in chunk if ord(c)>127))