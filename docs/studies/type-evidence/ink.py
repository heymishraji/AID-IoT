import sys, json
from PIL import Image
import numpy as np
img=np.array(Image.open(sys.argv[1]).convert('L'))<128
rects=json.loads(sys.argv[2])
for name,(x,y,w,h) in rects.items():
    a=img[y:y+h, x:x+w]
    cols=np.where(a.any(axis=0))[0]
    # split into glyphs by empty columns
    groups=[]; start=cols[0]; prev=cols[0]
    for c in cols[1:]:
        if c!=prev+1: groups.append((start,prev)); start=c
        prev=c
    groups.append((start,prev))
    out=[]
    for (c0,c1),ch in zip(groups,'H4471x'):
        g=a[:,c0:c1+1]; rows=np.where(g.any(axis=1))[0]
        out.append((ch,int(rows.max()-rows.min()+1)))
    H=a[:,groups[0][0]:groups[0][1]+1]; rows=np.where(H.any(axis=1))[0]; r=rows.max()-int((rows.max()-rows.min())*0.2)
    run=np.where(H[r])[0]; stem=1
    for i in range(1,len(run)):
        if run[i]==run[i-1]+1: stem+=1
        else: break
    print(f"{name:6} heights {out}  H-stem {stem}px  4-width {groups[1][1]-groups[1][0]+1}px")
