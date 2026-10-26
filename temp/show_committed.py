import subprocess
b = subprocess.run(['git', 'show', 'd1fa6911bb:build-guides.js'], capture_output=True).stdout
open('temp/committed_bg.js', 'wb').write(b)
s = b.decode('utf-8')
i = s.index('const CARD_DESC_LIMIT')
j = s.index('function productCard')
print(s[i - 500:j])
