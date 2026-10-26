s=open('guides/best-mic-for-guitar-amps_es.html',encoding='utf-8').read()
needle='class="qf-card'
i=s.find(needle)
print(repr(s[i:i+120]))
