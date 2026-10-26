p = 'temp/qf_diff.py'
s = open(p, encoding='utf-8').read()
s = s.replace("'frequency response'", "'frequency range'")
s = s.replace("elif 'frequency response' in ll or 'respuesta de frecuencia' in ll:",
              "elif 'frequency' in ll or 'frecuencia' in ll:")
open(p, 'w', encoding='utf-8').write(s)
print(s.count("'frequency range'"))
