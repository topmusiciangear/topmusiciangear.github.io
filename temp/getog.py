import urllib.request, re, sys
url=sys.argv[1]
html=urllib.request.urlopen(url).read().decode("utf-8","ignore")
m=re.search(r'property="og:image"\s+content="([^"]+)"', html)
print(m.group(1) if m else "NO IMG")
PY