const fs=require('fs');
const wrap=(head,body)=>`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
${head}
</helmet>
${body}
</x-dc>
</body>
</html>`;
const LOGO=(c='#111418',s=28)=>`<div style="display:flex;align-items:center;gap:10px"><img src="logo.svg" alt="AID-IoT" style="width:${s}px;height:${Math.round(s*.9)}px;display:block"><span style="font-weight:700;font-size:${s>=28?19:17}px;letter-spacing:-.02em;color:${c}">AID-IoT</span></div>`;
const NAV=['Solutions','Products','Software','Services','Company'];
const PROOF=['Ministry of Defence','Indian Army','IIT Delhi','IIT Jammu','BigBasket','KHub'];
const frameLabel=(t,c)=>`<div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${c}">${t}</div>`;

/* ================= DIRECTION A — Open the device ================= */
const A_HEAD=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
 *{box-sizing:border-box} body{margin:0;font-family:"Geist","Helvetica Neue",Arial,sans-serif;color:#111418;background:#F2F3F5;-webkit-font-smoothing:antialiased}
 a{color:#111418;text-decoration:none} a:hover{color:#B4400E}
 .mono{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace}
 .lbl{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
 .plate{display:inline-flex;align-items:center;height:26px;padding:0 9px;background:#111418;color:#F2F3F5;border-radius:3px;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
 .plate.or{background:#F05A1E;color:#111418}
 .btn{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 22px;border-radius:4px;font-weight:600;font-size:15px}
 .btn.ink{background:#111418;color:#F2F3F5}.btn.line{border:1.5px solid #111418;color:#111418}
 .proof{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.04em;color:#111418;border:1px solid #C9CCD2;padding:7px 12px;border-radius:3px;white-space:nowrap}
</style>`;
// Layered device SVG: spread 0..1 controls layer separation; labels shown when spread>0.6
const deviceSVG=(spread,w=560,h=520,dark=false)=>{
  const layers=[
    ['Enclosure','IP-rated housing we design','#E9EAEE','#111418'],
    ['Board','Hardware we design','#1C7C54','#F2F3F5'],
    ['Firmware','Code we write, on the device','#111418','#F2F3F5'],
    ['Link','4G · Wi-Fi · LoRa mesh we manage','#F2F3F5','#111418'],
    ['Signal platform','Cloud or on-prem, we run it','#F05A1E','#111418'],
    ['App','What your team reads','#111418','#F2F3F5'],
  ];
  const cx=w*0.42, baseY=h*0.78, pw=300, ph=150; // parallelogram plate size
  const gap=18+spread*62;
  let out=`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;max-width:100%;height:auto">`;
  // signal trace
  if(spread>0.6){ out+=`<path d="M ${cx-pw/2-40} ${baseY+ph/4} C ${cx-pw/2-120} ${baseY-gap*2}, ${cx+pw/2+60} ${baseY-gap*3}, ${cx} ${baseY-gap*5-20}" fill="none" stroke="#F05A1E" stroke-width="2.5" stroke-dasharray="6 6"/>`; }
  layers.forEach((L,i)=>{
    const y=baseY-i*gap; const [name,desc,fill,ink]=L;
    const pts=`${cx-pw/2},${y} ${cx},${y-ph/2} ${cx+pw/2},${y} ${cx},${y+ph/2}`;
    out+=`<polygon points="${pts}" fill="${fill}" stroke="#111418" stroke-width="1.5"/>`;
    if(i===1){ // board details
      for(let k=0;k<4;k++){ out+=`<circle cx="${cx-60+k*40}" cy="${y-10+k*6}" r="6" fill="#F05A1E"/>`; }
      out+=`<rect x="${cx+20}" y="${y-30}" width="70" height="40" fill="#111418" transform="skewY(-26) translate(0 ${y*0.49})" opacity=".9"/>`;
    }
    if(i===4){ for(let k=0;k<3;k++){ out+=`<polyline points="${cx-90+k*70},${y+10} ${cx-60+k*70},${y-8} ${cx-30+k*70},${y+4}" fill="none" stroke="#111418" stroke-width="2"/>`; } }
    if(i===5){ out+=`<rect x="${cx-40}" y="${y-22}" width="80" height="44" rx="3" fill="#F2F3F5" opacity=".95"/><text x="${cx}" y="${y+6}" text-anchor="middle" font-family="JetBrains Mono" font-size="14" fill="#111418">842 °C</text>`; }
    if(spread>0.6){
      const lx=cx+pw/2+30, ly=y-4;
      out+=`<line x1="${cx+pw/2-10}" y1="${y}" x2="${lx-8}" y2="${ly}" stroke="#111418" stroke-width="1"/>`;
      out+=`<text x="${lx}" y="${ly-4}" font-family="Geist" font-weight="600" font-size="15" fill="${dark?'#F2F3F5':'#111418'}">${name}</text><text x="${lx}" y="${ly+14}" font-family="JetBrains Mono" font-size="11" fill="${dark?'#C9CCD2':'#3A3F47'}" letter-spacing=".04">${desc.toUpperCase()}</text>`;
    }
  });
  out+=`</svg>`; return out;
};
const A_DESK=wrap(A_HEAD,`
<div style="width:1440px;background:#F2F3F5">
  <header style="display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 56px">
    ${LOGO()}
    <nav style="display:flex;gap:26px">${NAV.map(n=>`<a href="#" style="font-size:15px;font-weight:500">${n}</a>`).join('')}</nav>
    <div style="display:flex;gap:18px;align-items:center"><a href="#" style="font-size:14px;color:#3A3F47">Store</a><a href="#" style="font-size:14px;color:#3A3F47">Log in</a><a class="btn ink" href="#" style="height:42px;padding:0 16px;font-size:14px">Talk to an engineer</a></div>
  </header>
  <section style="display:grid;grid-template-columns:600px minmax(0,1fr);gap:0;height:832px;padding:0 0 0 56px">
    <div style="display:flex;flex-direction:column;justify-content:center;gap:26px;padding-right:56px">
      <div style="display:flex;gap:8px"><span class="plate or">Hardware</span><span class="plate">Firmware</span><span class="plate">Signal platform</span><span class="plate">Made in India</span></div>
      <h1 style="font-size:64px;line-height:.98;letter-spacing:-.035em;font-weight:700;margin:0;text-wrap:balance">We own the signal, end to end.</h1>
      <p style="font-size:19px;line-height:1.5;color:#3A3F47;margin:0;max-width:30em">The device on your machine, the code inside it, the link that carries the data, the platform that decides, the app your team reads. One company designs, writes, runs and manufactures all of it — in India.</p>
      <div style="display:flex;gap:12px"><a class="btn ink" href="#">Talk to an engineer</a><a class="btn line" href="#">See what's inside ↓</a></div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px"><div class="lbl" style="color:#6B7079">Fielded with</div><div style="display:flex;gap:8px;flex-wrap:wrap">${PROOF.map(p=>`<span class="proof">${p}</span>`).join('')}</div></div>
    </div>
    <div style="position:relative;background:#F05A1E;margin:20px 20px 20px 0;border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden">
      <div style="position:absolute;left:24px;top:22px" class="lbl">IIoT Bridge · closed · scroll to open</div>
      <div style="position:absolute;right:24px;top:22px" class="lbl">01 / 06 layers</div>
      ${deviceSVG(0,620,560)}
      <div style="position:absolute;left:24px;bottom:22px;display:flex;gap:18px" class="lbl"><span>RS-485 ×2</span><span>Modbus</span><span>4G · Wi-Fi · LAN</span><span>12–24 V DC</span></div>
    </div>
  </section>

  <section style="padding:72px 56px 40px;border-top:1px solid #C9CCD2">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px"><div><div class="lbl" style="color:#B4400E;margin-bottom:10px">Signature interaction · scroll-driven exploded view</div><h2 style="font-size:36px;line-height:1.05;letter-spacing:-.025em;font-weight:700;margin:0;max-width:22ch">One object, six layers. Every layer is something we make.</h2></div><p style="font-size:15px;color:#3A3F47;max-width:34em;margin:0">In the build this is the real product from CAD (or a reference model until CAD arrives), rendered in React Three Fiber and scrubbed by scroll. The same component opens every product, collapses into the dashboard on the Software page, and assembles in build order on Services.</p></div>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
      ${[[0,'Scroll 0% · closed','The product as the customer receives it.'],[0.5,'Scroll 50% · opening','Layers separate; the trace starts to draw.'],[1,'Scroll 100% · open + labelled','Six labels, plain words. The signal trace lands on a live value.']].map(([s,t,d])=>`<div style="background:#FFFFFF;border:1px solid #C9CCD2;border-radius:6px;padding:18px;display:flex;flex-direction:column;gap:10px">${frameLabel(t,'#B4400E')}<div style="background:#F2F3F5;border-radius:4px;display:flex;justify-content:center;overflow:hidden">${deviceSVG(s,s>0.6?640:420,s>0.6?440:400)}</div><p style="margin:0;font-size:14px;color:#3A3F47">${d}</p></div>`).join('')}
    </div>
  </section>

  <section style="padding:24px 56px 72px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px">
    ${[['Connect','We get the data off machines that were never designed to share it.','IIoT Bridge'],['Communicate','It reaches the people who decide — on any link, even with none.','VMS-O · 0 SIMs'],['Automate','The system acts before a human has to.','AID-Auto interlock'],['Scale','From one unit to a nationwide rollout, built in India.','25+ processes']].map(([t,d,p],i)=>`<div style="border-top:2px solid #111418;padding-top:14px;display:flex;flex-direction:column;gap:8px"><div class="lbl" style="color:#B4400E">0${i+1}</div><div style="font-size:22px;font-weight:600;letter-spacing:-.02em">${t}</div><p style="margin:0;font-size:14.5px;color:#3A3F47;line-height:1.5">${d}</p><span class="plate" style="align-self:flex-start;margin-top:4px">${p}</span></div>`).join('')}
  </section>
</div>`);
const A_MOB=wrap(A_HEAD,`
<div style="width:390px;background:#F2F3F5">
  <header style="display:flex;align-items:center;justify-content:space-between;height:58px;padding:0 16px">${LOGO('#111418',24)}<div style="display:flex;gap:8px;align-items:center"><a class="btn ink" href="#" style="height:38px;padding:0 12px;font-size:13px">Talk to us</a><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#111418" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></div></header>
  <section style="padding:22px 16px 0;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="plate or">Hardware</span><span class="plate">Firmware</span><span class="plate">Signal</span></div>
    <h1 style="font-size:40px;line-height:1;letter-spacing:-.035em;font-weight:700;margin:0">We own the signal, end to end.</h1>
    <p style="font-size:16px;line-height:1.5;color:#3A3F47;margin:0">The device, the code inside it, the link, the platform, the app. One company designs, writes, runs and manufactures all of it — in India.</p>
    <a class="btn ink" href="#" style="width:100%">Talk to an engineer</a>
  </section>
  <section style="margin:20px 16px 0;background:#F05A1E;border-radius:6px;padding:16px 8px 8px;position:relative"><div class="lbl" style="position:absolute;left:14px;top:12px">IIoT Bridge · scroll to open</div>${deviceSVG(0,358,330)}</section>
  <section style="padding:18px 16px 8px;display:flex;flex-direction:column;gap:8px"><div class="lbl" style="color:#6B7079">Fielded with</div><div style="display:flex;gap:6px;flex-wrap:wrap">${PROOF.slice(0,5).map(p=>`<span class="proof" style="font-size:11px;padding:6px 9px">${p}</span>`).join('')}</div></section>
  <section style="padding:28px 16px 32px;display:flex;flex-direction:column;gap:14px;border-top:1px solid #C9CCD2;margin-top:16px">
    ${frameLabel('Signature interaction · on a phone','#B4400E')}
    <div style="font-size:24px;font-weight:700;letter-spacing:-.025em;line-height:1.1">Six layers, three scroll stops.</div>
    <p style="margin:0;font-size:14px;color:#3A3F47">Mobile gets the same model at lower detail (≤ 3 shadows, 1024 px textures) or a pre-rendered 60-frame sequence on weak GPUs. Labels stack below the object instead of beside it.</p>
    <div style="background:#FFFFFF;border:1px solid #C9CCD2;border-radius:6px;padding:10px;overflow:hidden">${deviceSVG(1,358,360)}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${['Enclosure — housing we design','Board — hardware we design','Firmware — code we write','Link — 4G · Wi-Fi · LoRa','Signal — platform we run','App — what your team reads'].map(x=>`<div style="font-size:12.5px;padding:8px 10px;background:#FFFFFF;border:1px solid #C9CCD2;border-radius:4px">${x}</div>`).join('')}</div>
  </section>
</div>`);

/* ================= DIRECTION B — Panel room ================= */
const B_HEAD=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Narrow:wght@500;600;700&display=swap">
<style>
 *{box-sizing:border-box} body{margin:0;font-family:"Archivo","Helvetica Neue",Arial,sans-serif;color:#1B1B1B;background:#FAF9F6;-webkit-font-smoothing:antialiased}
 a{color:#1B1B1B;text-decoration:none} a:hover{color:#0E7C66}
 .tag{font-family:"Archivo Narrow","Arial Narrow",sans-serif;font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
 .btn{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 22px;border:1.5px solid #1B1B1B;font-family:"Archivo Narrow",sans-serif;font-weight:700;font-size:16px;letter-spacing:.04em;text-transform:uppercase}
 .btn.fill{background:#1B1B1B;color:#FAF9F6}
 .proof{font-family:"Archivo Narrow",sans-serif;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;border-bottom:1.5px solid #1B1B1B;padding-bottom:3px;white-space:nowrap}
</style>`;
// Mimic diagram SVG of a plant line
const mimicSVG=(w=760,h=520,live=true,crop=null)=>{
  const ink='#1B1B1B', live_c='#0E7C66', warn='#C8451B';
  const node=(x,y,label,tag,val,state)=>`<g><rect x="${x}" y="${y}" width="150" height="86" fill="#FAF9F6" stroke="${ink}" stroke-width="1.5"/><rect x="${x}" y="${y}" width="150" height="22" fill="${ink}"/><text x="${x+8}" y="${y+15}" font-family="Archivo Narrow" font-weight="600" font-size="12" fill="#FAF9F6" letter-spacing="1">${tag}</text><text x="${x+8}" y="${y+46}" font-family="Archivo" font-weight="600" font-size="14" fill="${ink}">${label}</text><text x="${x+8}" y="${y+72}" font-family="Archivo Narrow" font-weight="700" font-size="20" fill="${state==='warn'?warn:(state==='live'?live_c:ink)}">${val}</text><circle cx="${x+138}" cy="${y+66}" r="5" fill="${state==='warn'?warn:live_c}"/></g>`;
  const aid=(x,y,label)=>`<g><rect x="${x}" y="${y}" width="120" height="44" fill="#FAF9F6" stroke="${live_c}" stroke-width="2" stroke-dasharray="0"/><rect x="${x+8}" y="${y+8}" width="10" height="10" fill="${live_c}"/><text x="${x+26}" y="${y+18}" font-family="Archivo Narrow" font-weight="700" font-size="11" fill="${live_c}" letter-spacing="1">AID-IOT</text><text x="${x+8}" y="${y+35}" font-family="Archivo" font-weight="600" font-size="12" fill="${ink}">${label}</text></g>`;
  return `<svg viewBox="${crop||`0 0 ${w} ${h}`}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" style="display:block;max-width:100%;height:auto">
   <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#E6E3DC" stroke-width="1"/></pattern></defs>
   <rect width="${w}" height="${h}" fill="url(#g)"/>
   <text x="16" y="24" font-family="Archivo Narrow" font-weight="700" font-size="13" fill="${ink}" letter-spacing="2">PLANT 2 · LINE B · LIVE</text>
   <text x="${w-16}" y="24" text-anchor="end" font-family="Archivo Narrow" font-weight="600" font-size="12" fill="${live_c}" letter-spacing="1">● 8 DEVICES ONLINE · 14:22:08</text>
   <line x1="40" y1="130" x2="${w-40}" y2="130" stroke="${ink}" stroke-width="2"/>
   <line x1="40" y1="130" x2="40" y2="380" stroke="${ink}" stroke-width="2"/>
   <line x1="${w-40}" y1="130" x2="${w-40}" y2="380" stroke="${ink}" stroke-width="2"/>
   ${node(60,60,'Furnace 1','TT-101',live?'842 °C':'—','live')}
   ${node(260,60,'VFD 3','SC-203',live?'47.2 Hz':'—','live')}
   ${node(460,60,'Scale A','WT-310',live?'1,206 kg':'—','warn')}
   ${aid(80,190,'IIoT Bridge')}${aid(280,190,'IIoT Bridge')}${aid(480,190,'Edge Lite')}
   <line x1="135" y1="146" x2="135" y2="190" stroke="${live_c}" stroke-width="2"/><line x1="335" y1="146" x2="335" y2="190" stroke="${live_c}" stroke-width="2"/><line x1="535" y1="146" x2="535" y2="190" stroke="${live_c}" stroke-width="2"/>
   <line x1="140" y1="234" x2="140" y2="300" stroke="${live_c}" stroke-width="2" stroke-dasharray="4 4"/><line x1="340" y1="234" x2="340" y2="300" stroke="${live_c}" stroke-width="2" stroke-dasharray="4 4"/><line x1="540" y1="234" x2="540" y2="300" stroke="${live_c}" stroke-width="2" stroke-dasharray="4 4"/>
   <rect x="60" y="300" width="${w-120}" height="60" fill="${ink}"/><text x="76" y="325" font-family="Archivo Narrow" font-weight="700" font-size="13" fill="#FAF9F6" letter-spacing="2">SIGNAL PLATFORM · ON-PREM</text><text x="76" y="347" font-family="Archivo" font-size="13" fill="#CFCBC2">Rules: trip alarm on WT-310 over 1,200 kg → conveyor slowed · 14:22:06</text>
   <rect x="${w-260}" y="392" width="220" height="88" fill="#FAF9F6" stroke="${ink}" stroke-width="1.5"/><text x="${w-246}" y="414" font-family="Archivo Narrow" font-weight="700" font-size="12" fill="${warn}" letter-spacing="1">ALARM · WT-310 OVERLOAD</text><text x="${w-246}" y="436" font-family="Archivo" font-size="13" fill="${ink}">Conveyor slowed automatically.</text><text x="${w-246}" y="458" font-family="Archivo" font-size="13" fill="${live_c}">Resolved in 2.1 s — nobody walked over.</text>
   <text x="60" y="470" font-family="Archivo Narrow" font-weight="600" font-size="12" fill="${ink}" letter-spacing="1">HOVER A NODE → THE DEVICE AND ITS MODULE</text>
  </svg>`;
};
const B_DESK=wrap(B_HEAD,`
<div style="width:1440px;background:#FAF9F6">
  <header style="display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 56px;border-bottom:1.5px solid #1B1B1B">
    ${LOGO('#1B1B1B')}
    <nav style="display:flex;gap:26px">${NAV.map(n=>`<a href="#" class="tag" style="font-size:13px">${n}</a>`).join('')}</nav>
    <div style="display:flex;gap:18px;align-items:center"><a href="#" class="tag" style="font-size:12px;color:#5A574F">Store</a><a href="#" class="tag" style="font-size:12px;color:#5A574F">Log in</a><a class="btn fill" href="#" style="height:40px;padding:0 14px;font-size:13px">Talk to an engineer</a></div>
  </header>
  <section style="display:grid;grid-template-columns:520px minmax(0,1fr);gap:48px;padding:56px 56px 40px;align-items:center;min-height:832px">
    <div style="display:flex;flex-direction:column;gap:24px">
      <div class="tag" style="color:#0E7C66">Connected operations · designed and built in India</div>
      <h1 style="font-size:58px;line-height:1;letter-spacing:-.03em;font-weight:700;margin:0;text-wrap:balance">Every machine, every litre, every vehicle — seen, and acted on.</h1>
      <p style="font-size:18px;line-height:1.5;color:#3E3B35;margin:0;max-width:30em">We put a small device on the things you already run, carry the reading over any link — or none — and let the Signal platform act before anyone has to walk over.</p>
      <div style="display:flex;gap:12px"><a class="btn fill" href="#">Talk to an engineer</a><a class="btn" href="#">Walk the line ↓</a></div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px"><div class="tag" style="color:#5A574F">Fielded with</div><div style="display:flex;gap:16px;flex-wrap:wrap">${PROOF.map(p=>`<span class="proof">${p}</span>`).join('')}</div></div>
    </div>
    <div style="border:1.5px solid #1B1B1B;background:#FAF9F6">${mimicSVG(760,520,true)}</div>
  </section>

  <section style="padding:64px 56px 48px;border-top:1.5px solid #1B1B1B">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px"><div><div class="tag" style="color:#0E7C66;margin-bottom:10px">Signature interaction · walk the line</div><h2 style="font-size:36px;line-height:1.05;letter-spacing:-.025em;font-weight:700;margin:0;max-width:22ch">Scroll walks you from the sensor to the decision.</h2></div><p style="font-size:15px;color:#3E3B35;max-width:34em;margin:0">One diagram component, drawn in the site's own grammar, describes every operation: a plant line here, a depot on the Fuel page, a convoy on the Defence page. Photographs of real sites sit inside the same frames.</p></div>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
      ${[['Stop 1 · the machine','A furnace, a drive, a scale. Tag plates name them the way your panel does.','40 44 560 130'],['Stop 2 · the AID-IoT device','The node lights up; hover shows the product and the Signal module it runs.','40 150 600 140'],['Stop 3 · the decision','A rule fires on the platform; the alarm resolves itself. The number your team sees.','40 290 700 200']].map(([t,d,c])=>`<div style="border:1.5px solid #1B1B1B;padding:18px;display:flex;flex-direction:column;gap:10px;background:#FFFFFF"><div class="tag" style="color:#0E7C66">${t}</div><div style="background:#FAF9F6;border:1px solid #E6E3DC;overflow:hidden">${mimicSVG(400,140,true,c)}</div><p style="margin:0;font-size:14px;color:#3E3B35">${d}</p></div>`).join('')}
    </div>
  </section>
  <section style="padding:8px 56px 72px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-top:1.5px solid #1B1B1B;margin:0 56px">
    ${[['Connect','We get the data off machines that were never designed to share it.'],['Communicate','It reaches the people who decide — on any link, even with none.'],['Automate','The system acts before a human has to.'],['Scale','From one unit to a nationwide rollout, built in India.']].map(([t,d],i)=>`<div style="padding:22px 20px 0 0;border-right:${i<3?'1px solid #E6E3DC':'0'};margin-right:${i<3?'20px':'0'}"><div class="tag" style="color:#0E7C66">0${i+1}</div><div style="font-size:24px;font-weight:700;letter-spacing:-.02em;margin:6px 0">${t}</div><p style="margin:0;font-size:14.5px;color:#3E3B35;line-height:1.5">${d}</p></div>`).join('')}
  </section>
</div>`);
const B_MOB=wrap(B_HEAD,`
<div style="width:390px;background:#FAF9F6">
  <header style="display:flex;align-items:center;justify-content:space-between;height:58px;padding:0 16px;border-bottom:1.5px solid #1B1B1B">${LOGO('#1B1B1B',24)}<div style="display:flex;gap:8px;align-items:center"><a class="btn fill" href="#" style="height:36px;padding:0 10px;font-size:12px">Talk to us</a><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1B1B1B" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></div></header>
  <section style="padding:24px 16px 0;display:flex;flex-direction:column;gap:14px">
    <div class="tag" style="color:#0E7C66">Connected operations · built in India</div>
    <h1 style="font-size:36px;line-height:1.02;letter-spacing:-.03em;font-weight:700;margin:0">Every machine, every litre, every vehicle — seen, and acted on.</h1>
    <p style="font-size:16px;line-height:1.5;color:#3E3B35;margin:0">A small device on what you already run; the reading carried over any link — or none; the Signal platform acting before anyone walks over.</p>
    <a class="btn fill" href="#" style="width:100%">Talk to an engineer</a>
  </section>
  <section style="margin:20px 16px 0;border:1.5px solid #1B1B1B;overflow:hidden">${mimicSVG(760,520,true).replace('width="760" height="520"','width="358" height="245"')}</section>
  <section style="padding:16px 16px 0;display:flex;flex-direction:column;gap:10px"><div class="tag" style="color:#5A574F">Fielded with</div><div style="display:flex;gap:12px;flex-wrap:wrap">${PROOF.slice(0,5).map(p=>`<span class="proof" style="font-size:12px">${p}</span>`).join('')}</div></section>
  <section style="padding:28px 16px 32px;display:flex;flex-direction:column;gap:12px;border-top:1.5px solid #1B1B1B;margin-top:20px">
    <div class="tag" style="color:#0E7C66">Signature interaction · on a phone</div>
    <div style="font-size:24px;font-weight:700;letter-spacing:-.025em;line-height:1.1">The line becomes a column.</div>
    <p style="margin:0;font-size:14px;color:#3E3B35">On mobile the diagram stacks vertically and each stop is a card: machine → device → decision. SVG, so it costs nothing to run.</p>
    ${[['TT-101 · Furnace 1','842 °C','live'],['AID-IoT · IIoT Bridge','reads Modbus, 4G uplink','aid'],['Signal · rule','Trip alarm → conveyor slowed · resolved 2.1 s','decision']].map(([a,b,k])=>`<div style="border:1.5px solid ${k==='aid'?'#0E7C66':'#1B1B1B'};padding:12px 14px;display:flex;flex-direction:column;gap:2px;background:#FFFFFF"><div class="tag" style="color:${k==='aid'?'#0E7C66':'#5A574F'}">${a}</div><div style="font-family:'Archivo Narrow';font-weight:700;font-size:20px">${b}</div></div>`).join('<div style="text-align:center;color:#0E7C66;font-size:18px;line-height:1">↓</div>')}
  </section>
</div>`);

/* ================= DIRECTION C — Field log ================= */
const C_HEAD=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,700;1,6..96,500&family=Public+Sans:wght@400;500;600&family=Caveat:wght@500&display=swap">
<style>
 *{box-sizing:border-box} body{margin:0;font-family:"Public Sans","Helvetica Neue",Arial,sans-serif;color:#17140F;background:#F4F1EA;-webkit-font-smoothing:antialiased}
 a{color:#17140F;text-decoration:none} a:hover{color:#8A4B1E}
 .serif{font-family:"Bodoni Moda","Didot","Times New Roman",serif}
 .kick{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
 .btn{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 24px;border-radius:999px;font-weight:600;font-size:15px}
 .btn.dark{background:#17140F;color:#F4F1EA}.btn.ghost{border:1.5px solid #F4F1EA;color:#F4F1EA}
 .photo{position:relative;background:radial-gradient(120% 80% at 70% 20%, #F2B36B 0%, #B85C2A 28%, #3D2A3A 60%, #141B2B 100%);overflow:hidden}
 .photo::after{content:"";position:absolute;inset:0;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");opacity:.5;mix-blend-mode:overlay;pointer-events:none}
 .ph{position:absolute;left:24px;bottom:22px;z-index:3;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#F4F1EA;opacity:.8;border:1px dashed rgba(244,241,234,.6);padding:5px 9px}
 .proof{font-size:12px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:#F4F1EA;opacity:.9;white-space:nowrap}
</style>`;
const registerSVG=(w=420,h=300)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;max-width:100%;height:auto"><rect width="${w}" height="${h}" fill="#F7F3E8" stroke="#C9BFA8"/>${Array.from({length:9}).map((_,i)=>`<line x1="16" y1="${40+i*28}" x2="${w-16}" y2="${40+i*28}" stroke="#C9BFA8" stroke-width="1"/>`).join('')}<line x1="120" y1="16" x2="120" y2="${h-16}" stroke="#C9BFA8"/><line x1="260" y1="16" x2="260" y2="${h-16}" stroke="#C9BFA8"/><text x="20" y="32" font-family="Bodoni Moda" font-size="13" fill="#5A4E3A">Date</text><text x="128" y="32" font-family="Bodoni Moda" font-size="13" fill="#5A4E3A">Vehicle</text><text x="268" y="32" font-family="Bodoni Moda" font-size="13" fill="#5A4E3A">Litres · sign</text>${['12/06  ','13/06  ','13/06  ','14/06  '].map((d,i)=>`<text x="20" y="${60+i*28}" font-family="Caveat, cursive" font-size="16" fill="#2E2A22" transform="rotate(-1 20 ${60+i*28})">${d}</text><text x="128" y="${60+i*28}" font-family="Caveat, cursive" font-size="16" fill="#2E2A22">HR 55 AB ${1200+i*37}</text><text x="268" y="${60+i*28}" font-family="Caveat, cursive" font-size="16" fill="#2E2A22">${[210,180,'??',195][i]} L  ✓</text>`).join('')}<text x="20" y="${h-24}" font-family="Public Sans" font-size="11" fill="#8A7A5A" letter-spacing="1">PAPER REGISTER · DEPOT 4 · [PHOTO IN BUILD]</text></svg>`;
const recordSVG=(w=420,h=300)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;max-width:100%;height:auto"><rect width="${w}" height="${h}" fill="#17140F"/><text x="20" y="30" font-family="Public Sans" font-weight="600" font-size="11" fill="#B9AE98" letter-spacing="2">SIGNAL · DEPOT 4 · LIVE</text>${[['12 Jun 09:41','HR 55 AB 1200','210.4 L','signed · NavIC 09:41:07'],['13 Jun 07:12','HR 55 AB 1237','180.0 L','signed · NavIC 07:12:51'],['13 Jun 16:58','HR 55 AB 1274','—','drain −38 L flagged'],['14 Jun 08:03','HR 55 AB 1311','195.2 L','signed · NavIC 08:03:19']].map(([a,b,c,d],i)=>`<g transform="translate(20 ${58+i*54})"><text y="0" font-family="Public Sans" font-size="11" fill="#B9AE98">${a}</text><text y="20" font-family="Public Sans" font-weight="600" font-size="15" fill="#F4F1EA">${b}</text><text x="${w-40}" y="20" text-anchor="end" font-family="Public Sans" font-weight="600" font-size="20" fill="${c==='—'?'#F2B36B':'#F4F1EA'}">${c}</text><text x="${w-40}" y="38" text-anchor="end" font-family="Public Sans" font-size="11" fill="${d.includes('flag')?'#F2B36B':'#7BB58F'}">${d}</text><line x1="0" y1="46" x2="${w-40}" y2="46" stroke="#2E2A22"/></g>`).join('')}</svg>`;
const C_DESK=wrap(C_HEAD,`
<div style="width:1440px;background:#F4F1EA">
  <section class="photo" style="height:900px">
    <span class="ph">Photo · fuel depot at dawn · to shoot or generate (blueprint §09 prefix)</span>
    <header style="position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 56px">
      ${LOGO('#F4F1EA')}
      <nav style="display:flex;gap:26px">${NAV.map(n=>`<a href="#" style="font-size:15px;font-weight:500;color:#F4F1EA">${n}</a>`).join('')}</nav>
      <div style="display:flex;gap:18px;align-items:center"><a href="#" style="font-size:14px;color:#F4F1EA;opacity:.85">Store</a><a href="#" style="font-size:14px;color:#F4F1EA;opacity:.85">Log in</a><a class="btn ghost" href="#" style="height:42px;padding:0 16px;font-size:14px">Talk to an engineer</a></div>
    </header>
    <div style="position:absolute;left:56px;right:56px;bottom:64px;z-index:2;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:48px;align-items:end">
      <div style="display:flex;flex-direction:column;gap:22px">
        <div class="kick" style="color:#F2B36B">Chapter one · Fleet &amp; fuel · Depot 4, Haryana</div>
        <h1 class="serif" style="font-size:76px;line-height:.98;letter-spacing:-.01em;font-weight:500;margin:0;color:#F4F1EA;text-wrap:balance">Fuel management still runs on paper and goodwill. <em>Not here.</em></h1>
        <p style="font-size:18px;line-height:1.5;color:#F4F1EA;opacity:.9;margin:0;max-width:34em">A small device on the pump, a record signed by satellite time, and a platform that flags the litre that went missing — before the register is even closed. Designed, written and built in India by one team.</p>
        <div style="display:flex;gap:12px"><a class="btn dark" href="#" style="background:#F4F1EA;color:#17140F">Talk to an engineer</a><a class="btn ghost" href="#">Read the field log ↓</a></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-end"><div class="kick" style="color:#F4F1EA;opacity:.7">Fielded with</div><div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end">${PROOF.map(p=>`<span class="proof">${p}</span>`).join('')}</div></div>
    </div>
  </section>

  <section style="padding:80px 56px 40px">
    <div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:48px;align-items:end;margin-bottom:32px">
      <div><div class="kick" style="color:#8A4B1E;margin-bottom:12px">Signature interaction · before / after</div><h2 class="serif" style="font-size:44px;line-height:1.02;font-weight:500;margin:0">The register dissolves into the record.</h2></div>
      <p style="font-size:16px;color:#3E372C;margin:0;max-width:40em;line-height:1.55">One pinned chapter per page. As you scroll, the paper version of the moment fades and the same numbers appear in Signal — signed, timed, and with the missing litre flagged. Photography carries the site; motion is sparse and cinematic; no 3D.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
      ${[['Scroll 0% · before','The paper register at Depot 4. Handwriting, a question mark, a signature.',registerSVG()],['Scroll 50% · dissolve','The page fades; the rows keep their places.',`<div style="position:relative">${registerSVG()}<div style="position:absolute;inset:0;opacity:.55">${recordSVG()}</div></div>`],['Scroll 100% · after','The same four days in Signal. One drain flagged, everything else signed.',recordSVG()]].map(([t,d,v])=>`<div style="background:#FFFFFF;border:1px solid #D9D2C2;padding:16px;display:flex;flex-direction:column;gap:10px"><div class="kick" style="color:#8A4B1E;font-size:11px">${t}</div><div style="overflow:hidden">${v}</div><p style="margin:0;font-size:14px;color:#3E372C">${d}</p></div>`).join('')}
    </div>
  </section>
  <section style="padding:24px 56px 72px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px">
    ${[['Connect','We get the data off machines that were never designed to share it.'],['Communicate','It reaches the people who decide — on any link, even with none.'],['Automate','The system acts before a human has to.'],['Scale','From one unit to a nationwide rollout, built in India.']].map(([t,d],i)=>`<div style="display:flex;flex-direction:column;gap:8px;border-top:1px solid #17140F;padding-top:14px"><div class="kick" style="color:#8A4B1E">Chapter ${i+1}</div><div class="serif" style="font-size:30px;font-weight:500">${t}</div><p style="margin:0;font-size:14.5px;color:#3E372C;line-height:1.5">${d}</p></div>`).join('')}
  </section>
</div>`);
const C_MOB=wrap(C_HEAD,`
<div style="width:390px;background:#F4F1EA">
  <section class="photo" style="min-height:720px;display:flex;flex-direction:column;justify-content:space-between">
    <span class="ph" style="left:16px;bottom:auto;top:66px;font-size:10px">Photo · depot at dawn</span>
    <header style="position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;height:58px;padding:0 16px">${LOGO('#F4F1EA',24)}<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#F4F1EA" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></header>
    <div style="position:relative;z-index:2;padding:0 16px 28px;display:flex;flex-direction:column;gap:16px">
      <div class="kick" style="color:#F2B36B;font-size:11px">Chapter one · Fleet &amp; fuel</div>
      <h1 class="serif" style="font-size:42px;line-height:1;font-weight:500;margin:0;color:#F4F1EA">Fuel management still runs on paper and goodwill. <em>Not here.</em></h1>
      <p style="font-size:15px;line-height:1.5;color:#F4F1EA;opacity:.9;margin:0">A device on the pump, a record signed by satellite time, a platform that flags the missing litre. Built in India by one team.</p>
      <a class="btn dark" href="#" style="background:#F4F1EA;color:#17140F;width:100%">Talk to an engineer</a>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${PROOF.slice(0,4).map(p=>`<span class="proof" style="font-size:11px">${p}</span>`).join('')}</div>
    </div>
  </section>
  <section style="padding:32px 16px 36px;display:flex;flex-direction:column;gap:14px">
    <div class="kick" style="color:#8A4B1E;font-size:11px">Signature interaction · on a phone</div>
    <h2 class="serif" style="font-size:32px;line-height:1.02;font-weight:500;margin:0">The register dissolves into the record.</h2>
    <p style="margin:0;font-size:14px;color:#3E372C">Pinned for one screen height; a swipe-length of scroll crossfades paper into Signal. Two images, no WebGL.</p>
    <div style="background:#FFFFFF;border:1px solid #D9D2C2;padding:10px">${registerSVG(358,260)}</div>
    <div style="text-align:center;color:#8A4B1E">↓</div>
    <div style="border:1px solid #D9D2C2">${recordSVG(358,260)}</div>
  </section>
</div>`);

fs.writeFileSync('Main.dc.html',A_DESK);
fs.writeFileSync('DirectionAMobile.dc.html',A_MOB);
fs.writeFileSync('DirectionB.dc.html',B_DESK);
fs.writeFileSync('DirectionBMobile.dc.html',B_MOB);
fs.writeFileSync('DirectionC.dc.html',C_DESK);
fs.writeFileSync('DirectionCMobile.dc.html',C_MOB);
console.log('written');
