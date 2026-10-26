import json, re, sys

IN = "temp/enrich_batches/in_01.json"
OUT = "temp/enrich_batches/out_01.json"

data = json.load(open(IN, encoding="utf-8"))
out = json.load(open(OUT, encoding="utf-8"))

errors = []
assert len(out) == len(data), "length mismatch"

stats = []
for item, o in zip(data, out):
    i = item["id"]
    if o["id"] != i:
        errors.append(f"{i}: id/order mismatch")
    for lang, desc_key, add_key in (("en", "desc", "add_en"), ("es", "desc_es", "add_es")):
        desc, add = item[desc_key], o[add_key]
        final = desc + " " + add
        n = len(final.split())
        stats.append((i, lang, n))
        if not final.startswith(desc + " "):
            errors.append(f"{i}/{lang}: desc not a prefix")
        if n < 39 or n > 46:
            errors.append(f"{i}/{lang}: word count {n}")
        if not re.search(r"[.!?]\s*$", add.strip()):
            errors.append(f"{i}/{lang}: bad ending")
        if not re.search(r"[.!?]\s*$", final.strip()):
            errors.append(f"{i}/{lang}: final bad ending")
        sents = [s for s in re.split(r"(?<=[.!?])\s+", add.strip()) if s]
        if not (1 <= len(sents) <= 2):
            errors.append(f"{i}/{lang}: {len(sents)} sentences")
        for s in sents:
            if not re.search(r"[.!?]$", s):
                errors.append(f"{i}/{lang}: fragment {s!r}")
        if "  " in final:
            errors.append(f"{i}/{lang}: double space")
        if re.search(r"[$€£]|\bUSD\b|\bEUR\b", final):
            errors.append(f"{i}/{lang}: currency")
        for bad in ["\ufffd", "Ã", "Â", "â€"]:
            if bad in add:
                errors.append(f"{i}/{lang}: mojibake {bad!r}")
        if lang == "en":
            if re.search(r"\byou\b|\byour\b", add, re.I):
                errors.append(f"{i}/en: second person")
        else:
            if re.search(r"\btú\b|\btu\b|\bpuedes\b|\bquieres\b|\belige\b|\belegir\b", add, re.I):
                errors.append(f"{i}/es: second person")
    if len(o) != 3 or set(o) != {"id", "add_en", "add_es"}:
        errors.append(f"{i}: unexpected keys {list(o)}")

en = [n for _, l, n in stats if l == "en"]
es = [n for _, l, n in stats if l == "es"]
print("products:", len(out))
print("EN final words: min", min(en), "max", max(en), "avg", round(sum(en)/len(en), 1))
print("ES final words: min", min(es), "max", max(es), "avg", round(sum(es)/len(es), 1))
print("errors:", len(errors))
for e in errors:
    print(" -", e)
