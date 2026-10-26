# -*- coding: utf-8 -*-
import json, re, sys

BAD = ["$", "€", "£", "precio", "price"]
fails = []
stats = {}

for b in ("09", "10"):
    inp = json.load(open("temp/enrich_batches/in_%s.json" % b, encoding="utf-8"))
    out = json.load(open("temp/enrich_batches/out_%s.json" % b, encoding="utf-8"))

    if len(inp) != len(out):
        fails.append("batch %s: length %d != %d" % (b, len(inp), len(out)))

    st = {"en": [], "es": []}
    for k, (i, o) in enumerate(zip(inp, out)):
        if i["id"] != o["id"]:
            fails.append("batch %s idx %d: id %s != %s" % (b, k, i["id"], o["id"]))
            continue
        for lang, desc_key, need_key, add_key in (
            ("en", "desc", "need_en", "add_en"),
            ("es", "desc_es", "need_es", "add_es"),
        ):
            desc = i[desc_key]
            add = o.get(add_key, "")
            final = (desc + " " + add).strip()
            if not final.startswith(desc):
                fails.append("batch %s id %s %s: desc not prefix" % (b, i["id"], lang))
            if i[need_key]:
                wc = len(final.split())
                st[lang].append(wc)
                if not (40 <= wc <= 45):
                    fails.append("batch %s id %s %s: wordcount %d (desc %d + add %d)" % (
                        b, i["id"], lang, wc, len(desc.split()), len(add.split())))
                if not add:
                    fails.append("batch %s id %s %s: need but empty add" % (b, i["id"], lang))
                if add.strip() != add or add != add.strip():
                    pass
                if not re.search(r"[.!?]$", final):
                    fails.append("batch %s id %s %s: no terminal punctuation: %r" % (b, i["id"], lang, final[-40:]))
                # complete sentences check: add must end with punctuation
                if not re.search(r"[.!?]$", add.strip()):
                    fails.append("batch %s id %s %s: add does not end with punctuation" % (b, i["id"], lang))
            else:
                if add != "":
                    fails.append("batch %s id %s %s: need false but add not empty" % (b, i["id"], lang))
            for bad in BAD:
                if bad.lower() in (add.lower() if lang == "en" else add.lower()):
                    fails.append("batch %s id %s %s: banned token %r" % (b, i["id"], lang, bad))
    stats[b] = st

for b in ("09", "10"):
    for lang in ("en", "es"):
        v = stats[b][lang]
        print("batch %s %s: n=%d min=%d max=%d" % (b, lang, len(v), min(v), max(v)))
        print("   counts:", v)
        outliers = [(idx, c) for idx, c in enumerate(v) if c not in (40, 41, 42, 43, 44, 45)]
        if outliers:
            print("   OUTLIERS:", outliers)

if fails:
    print("\nFAILURES (%d):" % len(fails))
    for f in fails:
        print(" -", f)
    sys.exit(1)
print("\nALL CHECKS PASSED")
