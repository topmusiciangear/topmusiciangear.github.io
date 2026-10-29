import json
g=json.load(open('data/guides.json', encoding='utf-8'))
guide=next((x for x in g if x.get('id')=='channel-strip-plugins'), None)
if not guide:
    print('not found')
else:
    print('title', guide.get('title'))
    # find conclusion section
    # guides structure: sections array?
    # Let's dump keys
    print('keys', list(guide.keys()))
    # try sections
    secs=guide.get('sections', [])
    print('num sections', len(secs))
    # find last section maybe conclusion
    for i,s in enumerate(secs):
        if s.get('heading','').lower().find('conclusion')>=0:
            print('found conclusion at', i)
            print(json.dumps(s, ensure_ascii=False, indent=2))
            break
    # also check top level conclusion
    if 'conclusion' in guide:
        print('top conclusion', json.dumps(guide['conclusion'], ensure_ascii=False, indent=2))
