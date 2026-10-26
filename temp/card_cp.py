s=open('temp/jbl_card_desc.txt',encoding='utf-8').read()
out=repr(s)+'\n'+' '.join(f'U+{ord(c):04X}' for c in s if ord(c)>127)
open('temp/jbl_card_cp.txt','w',encoding='utf-8').write(out)