import sys, json, re, urllib.request, os
from fontTools.ttLib import TTFont
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
dl=sys.argv[1]; fams=json.loads(sys.argv[2])
get=lambda u: urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA})).read()
for name,spec in fams.items():
    css=get(f"https://fonts.googleapis.com/css2?family={spec}&display=swap").decode()
    blocks=dict(re.findall(r"/\* ([\w-]+) \*/[^}]*?url\((https://[^)]+)\)",css,re.S))
    rupee=False
    for sub in ('latin-ext','latin'):
        if sub in blocks:
            p=os.path.join(dl,re.sub(r'\W','_',name)+'-'+sub+'.woff2'); open(p,'wb').write(get(blocks[sub]))
            f=TTFont(p); cmap=f.getBestCmap()
            if 0x20B9 in cmap: rupee=True
            if sub=='latin':
                hm=f['hmtx']; w=[hm[cmap[ord(d)]][0] for d in '0123456789']
                feats=set()
                if 'GSUB' in f: feats|={r.FeatureTag for r in f['GSUB'].table.FeatureList.FeatureRecord}
                tab='default' if len(set(w))==1 else ('on request' if 'tnum' in feats else 'NO')
                zero='zero' in feats
                xh=f['OS/2'].sxHeight if hasattr(f['OS/2'],'sxHeight') else 0
                upm=f['head'].unitsPerEm
    print(f"{name:28} tabular={tab:10} rupee={'Y' if rupee else '-'} slashed0={'Y' if zero else '-'} x-height={xh/upm:.3f}")
