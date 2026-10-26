src = open('build-guides.js', encoding='utf-8').read()
needle = '<style>@media(hover:hover)'
i = src.find(needle)
# find closing </style> after
j = src.find('</style>', i)
print('len style tag:', j - i + 8)
print(repr(src[j-40:j+10]))
print('context before:', repr(src[i-60:i]))
