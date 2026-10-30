import math, json
def oklch_to_srgb(L,C,h):
    a=C*math.cos(math.radians(h)); b=C*math.sin(math.radians(h))
    l_=L+0.3963377774*a+0.2158037573*b; m_=L-0.1055613458*a-0.0638541728*b; s_=L-0.0894841775*a-1.2914855480*b
    l,m,s=l_**3,m_**3,s_**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    def enc(x):
        x=min(max(x,0),1); return 12.92*x if x<=0.0031308 else 1.055*x**(1/2.4)-0.055
    return tuple(enc(v) for v in (r,g,bb))
def hexs(rgb): return '#%02X%02X%02X'%tuple(round(v*255) for v in rgb)
def lum(hx):
    v=[int(hx[i:i+2],16)/255 for i in (1,3,5)]
    v=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in v]
    return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2]
def cr(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+0.05)/(lb+0.05)
# name: (hue, chroma, [L steps for 100,300,500,700,900])
routes={
 'iot-copper':   (45, 0.13,  [0.96,0.82,0.56,0.45,0.30]),
 'iot-indigo':   (275,0.15,  [0.96,0.80,0.52,0.40,0.27]),
 'iot-jamun':    (340,0.12,  [0.96,0.80,0.52,0.40,0.27]),
 'def-brass':    (85, 0.10,  [0.94,0.84,0.70,0.55,0.40]),
 'def-glacier':  (215,0.07,  [0.95,0.86,0.74,0.58,0.42]),
 'def-bone':     (85, 0.025, [0.96,0.92,0.84,0.70,0.50]),
}
neutrals={
 'iot-neutral': (75,0.008,[0.985,0.93,0.70,0.40,0.20]),   # warm grey, not cream
 'def-slate':   (240,0.02,[0.92,0.62,0.36,0.24,0.17]),
 'def-graphite':(260,0.006,[0.92,0.62,0.36,0.24,0.16]),
 'def-basalt':  (200,0.018,[0.92,0.62,0.36,0.24,0.16]),
}
out={}
for k,(h,c,Ls) in {**routes,**neutrals}.items():
    ramp=[]
    for L in Ls:
        cc=c
        while True:  # reduce chroma until in gamut
            a=cc*math.cos(math.radians(h)); 
            rgb=oklch_to_srgb(L,cc,h)
            # check gamut by re-running without clamp
            l_=L+0.3963377774*a+0.2158037573*cc*math.sin(math.radians(h))
            if all(0<=v<=1 for v in rgb) and cc>=0: break
            cc-=0.005
        ramp.append(hexs(oklch_to_srgb(L,cc,h)))
    out[k]=ramp
W='#FFFFFF'
for k,r in out.items():
    print(f"{k:13} {' '.join(r)} | 500 on white {cr(r[2],W):.2f} | 700 on white {cr(r[3],W):.2f} | 900 on white {cr(r[4],W):.2f} | 100 on 900 {cr(r[0],r[4]):.2f}")
# defence pairs: accent 500/300 on dark neutral 900/700
for acc,neu in [('def-brass','def-slate'),('def-glacier','def-graphite'),('def-bone','def-basalt')]:
    a=out[acc]; n=out[neu]
    print(acc,'on',neu, 'acc300/n900 %.2f acc500/n900 %.2f acc500/n700 %.2f n100/n900 %.2f'%(cr(a[1],n[4]),cr(a[2],n[4]),cr(a[2],n[3]),cr(n[0],n[4])))
json.dump(out,open(__import__('os').path.join(__import__('os').path.dirname(__file__),'colour-routes.json'),'w'),indent=1)
