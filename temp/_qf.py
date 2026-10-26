s=open("guides/at2020-vs-p120.html",encoding="utf-8").read()
i=s.find("<div class=\"guide-section-quickfacts\">")
print(s[i:i+900])
