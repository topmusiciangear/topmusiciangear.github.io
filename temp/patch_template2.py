s=open('build-guides.js',encoding='utf-8').read()
old = "quickFactsHtml +\n          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>'"
new = "quickFactsHtml +\n          sectionChips +\n          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>'"
n = s.count(old)
s = s.replace(old, new)
open('build-guides.js','w',encoding='utf-8').write(s)
print('replaced', n)
