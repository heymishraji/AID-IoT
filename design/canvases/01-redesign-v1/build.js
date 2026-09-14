const fs=require('fs');
const FONT='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">';
const CSS=`
  :root{--navy:#0B1F3A;--orange:#E8541C;--orange-ink:#B4400E;--ground:#F3F4F6;--surface:#FFFFFF;--muted:#5B6573;--line:#D8DDE6;--im:#9FB3C8;--green:#1F7A6D;--ink:#0B1F3A;--navy2:#132B4D}
  *{box-sizing:border-box}
  body{margin:0;font-family:"Geist","Segoe UI",Helvetica,Arial,sans-serif;color:#0B1F3A;background:#F3F4F6;-webkit-font-smoothing:antialiased;font-size:16px;line-height:1.55}
  a{color:#B4400E;text-decoration:none} a:hover{color:#8F3209}
  .mono{font-family:"Geist Mono",ui-monospace,Menlo,monospace}
  .eyebrow{font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#B4400E;font-weight:500}
  .eyebrow.im{color:#9FB3C8}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 22px;border-radius:8px;font-weight:600;font-size:15px;white-space:nowrap}
  .btn.primary{background:#E8541C;color:#FFFFFF}
  .btn.secondary{background:transparent;color:#0B1F3A;border:1.5px solid #0B1F3A}
  .btn.onnavy{background:transparent;color:#FFFFFF;border:1.5px solid rgba(255,255,255,.5)}
  .card{background:#FFFFFF;border:1px solid #D8DDE6;border-radius:8px}
  .instr{background:#0B1F3A;color:#E9EEF6;border-radius:10px}
  .instr .lbl{font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#9FB3C8}
  .instr .val{font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:14px;color:#FFFFFF}
  .h2{font-size:40px;line-height:1.08;letter-spacing:-.02em;font-weight:600;margin:0;text-wrap:balance}
  .h3{font-size:20px;line-height:1.25;letter-spacing:-.01em;font-weight:600;margin:0}
  .sub{font-size:18px;line-height:1.5;color:#5B6573;margin:0;max-width:60ch}
  .p{font-size:16px;line-height:1.55;color:#3A465C;margin:0}
  .small{font-size:14px;line-height:1.5;color:#5B6573;margin:0}
  .chip{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:6px;background:#F3F4F6;border:1px solid #D8DDE6;font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:12px;color:#3A465C;white-space:nowrap}
  .stat{font-size:44px;line-height:1;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums;margin:0}
  .navlink{font-size:15px;font-weight:500;color:#0B1F3A}
  .logo-ph{font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:13px;letter-spacing:.04em;color:#5B6573;border:1px dashed #B9C1CF;border-radius:6px;padding:8px 14px;white-space:nowrap}
  .spec td{padding:9px 0;border-bottom:1px solid #D8DDE6;font-size:14px;vertical-align:top}
  .spec td:first-child{font-family:"Geist Mono",ui-monospace,Menlo,monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#5B6573;width:38%;padding-right:10px;padding-top:11px}
  .spec tr:last-child td{border-bottom:0}
  .arrow{display:inline-block;width:16px;height:16px;vertical-align:middle}
  .m .h2{font-size:30px}.m .sub{font-size:17px}.m .stat{font-size:38px}
`;
const ICON_ARROW='<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const ICON_MENU='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0B1F3A" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const ICON_CHECK='<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#1F7A6D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>';
const LOGO=(size=32)=>`<div style="display:flex;align-items:center;gap:10px"><img src="logo.svg" alt="AID-IoT" style="width:${size}px;height:${Math.round(size*0.9)}px;display:block"><span style="font-weight:700;font-size:${size>=32?20:18}px;letter-spacing:-.02em;color:#0B1F3A">AID-IoT</span></div>`;

const wrap=(body,{mobile=false}={})=>`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  ${FONT}
  <style>${CSS}</style>
</helmet>
${body}
</x-dc>
</body>
</html>`;

/* ---------- shared pieces ---------- */
const NAV=['Solutions','Products','Software','Services','Company'];
const headerD=(active)=>`
<header style="display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 64px;background:#FFFFFF;border-bottom:1px solid #D8DDE6">
  ${LOGO(32)}
  <nav style="display:flex;gap:28px;align-items:center">
    ${NAV.map(n=>`<a class="navlink" href="#" style="color:#0B1F3A;${n===active?'border-bottom:2px solid #E8541C;padding-bottom:2px':''}">${n}</a>`).join('')}
  </nav>
  <div style="display:flex;gap:18px;align-items:center">
    <a class="navlink" href="#" style="color:#5B6573">Store</a>
    <a class="navlink" href="#" style="color:#5B6573">Log in</a>
    <a class="btn primary" href="#" style="height:44px;padding:0 18px;font-size:14px">Talk to an engineer</a>
  </div>
</header>`;
const headerM=()=>`
<header style="display:flex;align-items:center;justify-content:space-between;height:60px;padding:0 16px;background:#FFFFFF;border-bottom:1px solid #D8DDE6">
  ${LOGO(28)}
  <div style="display:flex;gap:6px;align-items:center">
    <a class="btn primary" href="#" style="height:40px;padding:0 14px;font-size:13px">Talk to us</a>
    <div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center">${ICON_MENU}</div>
  </div>
</header>`;

const ctaBandD=()=>`
<section style="background:#0B1F3A;color:#FFFFFF;padding:80px 64px">
  <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:48px;align-items:center;max-width:1312px;margin:0 auto">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="eyebrow im">Next step</div>
      <h2 class="h2" style="color:#FFFFFF">Talk to an engineer.</h2>
      <p class="sub" style="color:#9FB3C8">Tell us what you operate and what is going wrong. You’ll hear from an engineer — not a sales desk — within one business day.</p>
    </div>
    <div class="card" style="padding:24px;display:flex;flex-direction:column;gap:12px;border:0">
      <label style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500;color:#0B1F3A">Work email<div style="height:46px;border:1px solid #B9C1CF;border-radius:8px;padding:0 12px;display:flex;align-items:center;color:#8A93A3;font-size:15px">you@company.com</div></label>
      <label style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500;color:#0B1F3A">What are you trying to solve?<div style="height:84px;border:1px solid #B9C1CF;border-radius:8px;padding:10px 12px;color:#8A93A3;font-size:15px">e.g. We run 40 trucks and lose track of fuel</div></label>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:4px"><span class="small">Reply within one business day. No newsletter.</span><a class="btn primary" href="#">Send</a></div>
    </div>
  </div>
</section>`;
const ctaBandM=()=>`
<section style="background:#0B1F3A;color:#FFFFFF;padding:48px 16px;display:flex;flex-direction:column;gap:20px">
  <div style="display:flex;flex-direction:column;gap:10px">
    <div class="eyebrow im">Next step</div>
    <h2 class="h2" style="color:#FFFFFF">Talk to an engineer.</h2>
    <p class="sub" style="color:#9FB3C8">You’ll hear from an engineer — not a sales desk — within one business day.</p>
  </div>
  <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:12px;border:0">
    <label style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500;color:#0B1F3A">Work email<div style="height:46px;border:1px solid #B9C1CF;border-radius:8px;padding:0 12px;display:flex;align-items:center;color:#8A93A3;font-size:15px">you@company.com</div></label>
    <label style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500;color:#0B1F3A">What are you trying to solve?<div style="height:84px;border:1px solid #B9C1CF;border-radius:8px;padding:10px 12px;color:#8A93A3;font-size:15px">e.g. We run 40 trucks and lose track of fuel</div></label>
    <a class="btn primary" href="#" style="width:100%">Send</a>
    <span class="small" style="text-align:center">Reply within one business day. No newsletter.</span>
  </div>
</section>`;

const FOOT_COLS=[
 ['Solutions',['Manufacturing & plants','Fleet & fuel','Defence & secure sites','Cold-chain & retail','Smart vending','Education & skills']],
 ['Products',['Gateways & edge','Fleet & fuel devices','Tracking & convoy','Freshness & retail','Defence systems']],
 ['Software',['AID-IoT platform','AID-ERP','TraceCraft','Fuel suite','Custom software']],
 ['Services',['Product development','PCB design','On-demand manufacturing','Training']],
 ['Company',['About','Why AID-IoT','Case studies','Careers','Contact']],
];
const footerD=()=>`
<footer style="background:#FFFFFF;border-top:1px solid #D8DDE6;padding:56px 64px 32px">
  <div style="display:grid;grid-template-columns:repeat(6, minmax(0, 1fr));gap:32px;max-width:1312px;margin:0 auto">
    <div style="display:flex;flex-direction:column;gap:14px">${LOGO(28)}<p class="small">Devices, software and cloud for connected operations. Designed and built in India.</p></div>
    ${FOOT_COLS.map(([h,items])=>`<div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow" style="color:#0B1F3A">${h}</div>${items.map(i=>`<a href="#" style="font-size:14px;color:#3A465C;line-height:1.4;padding:3px 0">${i}</a>`).join('')}</div>`).join('')}
  </div>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:32px;max-width:1312px;margin:40px auto 0;padding-top:24px;border-top:1px solid #D8DDE6">
    <div style="display:flex;gap:48px">
      <div><div class="eyebrow" style="color:#0B1F3A">India — HQ</div><p class="small" style="margin-top:6px">BP-5, MLU Plots, DDA, Bindapur, Pocket-3, Dwarka, Delhi 110059<br>+91 98701 83306 · hi@aid-iot.com</p></div>
      <div><div class="eyebrow" style="color:#0B1F3A">Canada</div><p class="small" style="margin-top:6px">7880 22 Sideroad, Acton ON L7J 2M1<br>+1 437 551 5139</p></div>
    </div>
    <p class="small mono" style="font-size:12px">© 2026 AID-IoT · Privacy · Terms · Shipping &amp; refunds · Store · Log in</p>
  </div>
</footer>`;
const footerM=()=>`
<footer style="background:#FFFFFF;border-top:1px solid #D8DDE6;padding:36px 16px 28px;display:flex;flex-direction:column;gap:22px">
  <div style="display:flex;flex-direction:column;gap:10px">${LOGO(28)}<p class="small">Devices, software and cloud for connected operations. Designed and built in India.</p></div>
  <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:20px 16px">
    ${FOOT_COLS.map(([h,items])=>`<div style="display:flex;flex-direction:column;gap:4px"><div class="eyebrow" style="color:#0B1F3A;margin-bottom:4px">${h}</div>${items.map(i=>`<a href="#" style="font-size:14px;color:#3A465C;line-height:1.4;padding:6px 0">${i}</a>`).join('')}</div>`).join('')}
  </div>
  <div style="border-top:1px solid #D8DDE6;padding-top:18px;display:flex;flex-direction:column;gap:10px">
    <div><div class="eyebrow" style="color:#0B1F3A">India — HQ</div><p class="small" style="margin-top:4px">Dwarka, Delhi 110059 · +91 98701 83306 · hi@aid-iot.com</p></div>
    <div><div class="eyebrow" style="color:#0B1F3A">Canada</div><p class="small" style="margin-top:4px">Acton ON L7J 2M1 · +1 437 551 5139</p></div>
    <p class="small mono" style="font-size:12px">© 2026 AID-IoT · Privacy · Terms · Store · Log in</p>
  </div>
</footer>`;

/* ---------- content data ---------- */
const PROOF=['Ministry of Defence','Indian Army','IIT Delhi','IIT Jammu','BigBasket','KHub'];
const WAYS=[
 ['Buy a proven device','Gateways, trackers and controllers that are already in the field — shipped with the software they need.','Browse products'],
 ['Have us build your solution','We design the hardware, write the firmware and apps, run the cloud and manufacture in India. One contract.','See how we work'],
 ['Run on our software','Dashboards, ERP and fleet applications that work with our devices — or the ones you already own.','Explore software'],
];
const SECTORS=[
 ['Manufacturing & plants','See every machine live, without re-wiring the plant.',['IIoT Bridge','AID-IoT platform']],
 ['Fleet & fuel','Every litre and every vehicle accounted for — even with no network.',['AID-Fuel','VMS-O','VFMS-O']],
 ['Defence & secure sites','Indigenous systems that never depend on a public network.',['NavIC CMS','TrackNet','Counter-UAS']],
 ['Cold-chain & retail','Pick first-to-expire first; know the temperature the whole way.',['AidFresh','AID-ERP']],
 ['Smart vending','Cashless, stock-aware machines you can run from one screen.',['Vending controller','Vending cloud']],
 ['Education & skills','Hands-on drone, PCB and IoT programmes for campuses.',['TraceCraft','Drone programmes']],
];
const STACK=[
 ['01','Machines & sensors','What you already run','#3A465C'],
 ['02','Device','Our hardware and firmware','#E8541C'],
 ['03','Connectivity','4G, Wi-Fi, satellite or a private mesh — keeps working offline','#E8541C'],
 ['04','Platform','Our cloud, or on your own servers','#E8541C'],
 ['05','Apps & dashboards','What your team actually sees','#E8541C'],
];
const RESULTS=[
 ['5,000+','SKUs at zero stock variance','AID-ERP · multi-branch distributor · [CLIENT]'],
 ['−12.4%','fuel burn on an optimised voyage','AID-Fuel-Marine · [CLIENT / VESSEL]'],
 ['0','SIM cards to track a whole fleet','VMS-O · offline vehicle tracking · [CLIENT]'],
];
const GROUPS=[
 ['Gateways & edge',[['IIoT Bridge','Connects plant machines to one dashboard'],['Ethernet Bridge','Adds a network layer to your product'],['IoT Edge Lite','Small sensor board, every protocol onboard']]],
 ['Fleet & fuel',[['AID-Fuel','Fuel accounting for depots and fleets'],['AID-Fuel-Marine','AI fuel advisory for ships'],['VMS-O / VFMS-O','Vehicle and fuel tracking with no network'],['AID-Auto','Only a sober driver starts the engine']]],
 ['Tracking & convoy',[['TrackNet','People and asset tracking inside a perimeter'],['NavIC CMS','Convoy command when the network goes dark']]],
 ['Freshness & retail',[['AidFresh','Per-item shelf-life from receiving to pick'],['Vending controller','Connected, cashless vending']]],
];
const SOFTWARE=[['AID-IoT platform','One dashboard for every device we ship — hosted by us or on your servers.'],['AID-ERP','Inventory, attendance and operations for multi-branch businesses.'],['TraceCraft','From a PCB design file to a milled board in one app.'],['Fuel suite','FSMS · DEPOT · RAVEN · QUEST — the applications behind AID-Fuel.']];

/* ---------- HOME DESKTOP ---------- */
const homeD=wrap(`
<div style="width:1440px;background:#F3F4F6">
${headerD(null)}
<section style="padding:80px 64px 56px">
  <div style="display:grid;grid-template-columns:minmax(0, 7fr) minmax(0, 5fr);gap:64px;align-items:center;max-width:1312px;margin:0 auto">
    <div style="display:flex;flex-direction:column;gap:22px">
      <div class="eyebrow">Hardware · Software · Cloud · Designed and built in India</div>
      <h1 style="font-size:56px;line-height:1.04;letter-spacing:-.025em;font-weight:600;margin:0;text-wrap:balance">We build the devices, the software and the cloud behind connected operations — as one accountable partner.</h1>
      <p class="sub">From a single sensor in a panel room to a nationwide fleet: one team designs the hardware, writes the software and keeps it running.</p>
      <div style="display:flex;gap:12px;margin-top:6px">
        <a class="btn primary" href="#">Talk to an engineer</a>
        <a class="btn secondary" href="#">See how we work</a>
      </div>
    </div>
    <div style="position:relative">
      <div class="card" style="padding:28px;background:#FFFFFF;border-radius:12px;display:flex;align-items:center;justify-content:center"><img src="device.jpg" alt="AID-IoT IIoT Bridge gateway in its industrial enclosure" style="width:100%;height:auto;display:block;border-radius:6px"></div>
      <div class="instr" style="position:absolute;left:-24px;bottom:24px;padding:12px 16px;display:flex;gap:22px;box-shadow:0 12px 32px rgba(11,31,58,.25)">
        <div><div class="lbl">Device</div><div class="val">IIoT Bridge</div></div>
        <div><div class="lbl">Status</div><div class="val" style="color:#7BD0A3">● Online · 14d 03h</div></div>
        <div><div class="lbl">Links</div><div class="val">4G · Wi-Fi · LAN</div></div>
      </div>
    </div>
  </div>
</section>
<section style="padding:0 64px 72px">
  <div style="display:flex;align-items:center;gap:32px;max-width:1312px;margin:0 auto;padding-top:28px;border-top:1px solid #D8DDE6">
    <div class="eyebrow" style="color:#5B6573;white-space:nowrap">Fielded with</div>
    <div style="display:flex;gap:14px;flex-wrap:wrap">${PROOF.map(p=>`<span class="logo-ph">${p}</span>`).join('')}</div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Three ways to work with us</div><h2 class="h2" style="max-width:20ch">Start with a device, a problem, or the software.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:20px">
      ${WAYS.map(([t,d,l],i)=>`<div class="card" style="padding:28px;display:flex;flex-direction:column;gap:14px;min-height:220px"><div class="mono" style="font-size:12px;color:#B4400E;letter-spacing:.08em">0${i+1}</div><h3 class="h3">${t}</h3><p class="p" style="flex-grow:1">${d}</p><a href="#" style="font-weight:600;font-size:15px;display:inline-flex;align-items:center;gap:6px">${l} ${ICON_ARROW}</a></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:32px"><div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Solutions by sector</div><h2 class="h2" style="max-width:22ch">Built for operations that cannot afford blind spots.</h2></div><a href="#" style="font-weight:600;white-space:nowrap;display:inline-flex;align-items:center;gap:6px">All solutions ${ICON_ARROW}</a></div>
    <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:20px">
      ${SECTORS.map(([t,d,chips])=>`<div class="card" style="padding:24px;display:flex;flex-direction:column;gap:12px;min-height:200px"><h3 class="h3">${t}</h3><p class="p" style="flex-grow:1">${d}</p><div style="display:flex;gap:6px;flex-wrap:wrap">${chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div class="instr" style="max-width:1312px;margin:0 auto;padding:56px;display:flex;flex-direction:column;gap:40px;border-radius:14px">
    <div style="display:grid;grid-template-columns:minmax(0, 5fr) minmax(0, 7fr);gap:48px;align-items:end">
      <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow im">How we build</div><h2 class="h2" style="color:#FFFFFF">We own every layer. You get one team, one contract, one number to call.</h2></div>
      <p class="sub" style="color:#9FB3C8">Most vendors sell one layer and hand you the rest. AID-IoT designs the device, writes the firmware, builds the cloud and the apps, and manufactures in India — so nothing falls between suppliers.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5, minmax(0, 1fr));gap:12px">
      ${STACK.map(([n,t,d,c],i)=>`<div style="background:${i===0?'#132B4D':'#132B4D'};border:1px solid ${i===0?'#2A3F63':'#E8541C'};border-radius:8px;padding:18px;display:flex;flex-direction:column;gap:8px;min-height:150px"><div class="lbl" style="color:${i===0?'#9FB3C8':'#FF8A55'}">${n} ${i===0?'· yours':'· AID-IoT'}</div><div style="font-weight:600;font-size:17px;color:#FFFFFF">${t}</div><div style="font-size:13.5px;color:#9FB3C8;line-height:1.45">${d}</div></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Results in the field</div><h2 class="h2" style="max-width:20ch">Numbers our customers report.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:20px">
      ${RESULTS.map(([n,l,src])=>`<div class="card" style="padding:28px;display:flex;flex-direction:column;gap:10px"><p class="stat">${n}</p><p class="p" style="font-weight:500;color:#0B1F3A">${l}</p><p class="small mono" style="font-size:12px">${src}</p></div>`).join('')}
    </div>
    <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px">Read the case studies ${ICON_ARROW}</a>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:32px"><div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Products</div><h2 class="h2" style="max-width:22ch">Devices already proven in the field.</h2></div><a href="#" style="font-weight:600;white-space:nowrap;display:inline-flex;align-items:center;gap:6px">Full catalogue ${ICON_ARROW}</a></div>
    <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:20px">
      ${GROUPS.map(([g,items])=>`<div style="display:flex;flex-direction:column;gap:10px"><div class="eyebrow" style="color:#0B1F3A;padding-bottom:10px;border-bottom:1px solid #B9C1CF">${g}</div>${items.map(([n,d])=>`<a href="#" class="card" style="padding:14px 16px;display:flex;flex-direction:column;gap:3px;color:#0B1F3A"><span style="font-weight:600;font-size:15px">${n}</span><span class="small">${d}</span></a>`).join('')}</div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:grid;grid-template-columns:minmax(0, 5fr) minmax(0, 7fr);gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:18px">
      <div class="eyebrow">Software</div>
      <h2 class="h2">Every device we ship runs with software we wrote.</h2>
      <p class="sub">Hosted by us or installed on your own servers. Works with our hardware — and, through standard interfaces, with the equipment you already own.</p>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">${SOFTWARE.map(([n,d])=>`<div style="display:flex;gap:12px;align-items:flex-start"><span style="margin-top:4px">${ICON_CHECK}</span><div><span style="font-weight:600">${n}</span> <span class="p">— ${d}</span></div></div>`).join('')}</div>
      <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;margin-top:4px">Explore software ${ICON_ARROW}</a>
    </div>
    <div class="instr" style="padding:22px;display:flex;flex-direction:column;gap:16px;min-height:380px">
      <div style="display:flex;justify-content:space-between;align-items:center"><div class="lbl">AID-IoT platform · Plant 2 · Line B</div><div class="val" style="color:#7BD0A3">● 8 devices online</div></div>
      <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:12px">
        ${[['Furnace 1','842 °C','set 850'],['VFD 3','47.2 Hz','nominal'],['Scale A','1,206 kg','last 09:41']].map(([a,b,c])=>`<div style="background:#132B4D;border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:4px"><div class="lbl">${a}</div><div style="font-family:'Geist Mono',monospace;font-size:22px;color:#FFFFFF">${b}</div><div class="lbl" style="text-transform:none;letter-spacing:0">${c}</div></div>`).join('')}
      </div>
      <div style="background:#132B4D;border-radius:8px;padding:14px;flex-grow:1;display:flex;flex-direction:column;gap:10px">
        <div class="lbl">Uptime · last 24 h</div>
        <svg viewBox="0 0 600 120" width="100%" height="120" preserveAspectRatio="none"><polyline points="0,90 60,80 120,84 180,50 240,56 300,40 360,44 420,30 480,36 540,22 600,26" fill="none" stroke="#E8541C" stroke-width="2.5"/><polyline points="0,90 60,80 120,84 180,50 240,56 300,40 360,44 420,30 480,36 540,22 600,26 600,120 0,120" fill="#E8541C" opacity=".12"/></svg>
      </div>
      <div style="text-align:center" class="lbl">Real dashboard screenshot goes here — this is a placeholder layout</div>
    </div>
  </div>
</section>
${ctaBandD()}
${footerD()}
</div>`);

/* ---------- HOME MOBILE ---------- */
const homeM=wrap(`
<div class="m" style="width:390px;background:#F3F4F6">
${headerM()}
<section style="padding:40px 16px 32px;display:flex;flex-direction:column;gap:18px">
  <div class="eyebrow">Hardware · Software · Cloud · Made in India</div>
  <h1 style="font-size:34px;line-height:1.08;letter-spacing:-.025em;font-weight:600;margin:0;text-wrap:balance">We build the devices, the software and the cloud behind connected operations — as one accountable partner.</h1>
  <p class="sub">From a single sensor to a nationwide fleet: one team designs the hardware, writes the software and keeps it running.</p>
  <div style="display:flex;flex-direction:column;gap:10px"><a class="btn primary" href="#" style="width:100%">Talk to an engineer</a><a class="btn secondary" href="#" style="width:100%">See how we work</a></div>
  <div style="position:relative;margin-top:8px">
    <div class="card" style="padding:16px;border-radius:12px"><img src="device.jpg" alt="AID-IoT IIoT Bridge gateway" style="width:100%;height:auto;display:block;border-radius:6px"></div>
    <div class="instr" style="position:absolute;left:8px;bottom:-14px;padding:10px 14px;display:flex;gap:16px;box-shadow:0 12px 32px rgba(11,31,58,.25)"><div><div class="lbl">Device</div><div class="val">IIoT Bridge</div></div><div><div class="lbl">Status</div><div class="val" style="color:#7BD0A3">● Online</div></div></div>
  </div>
</section>
<section style="padding:24px 16px 40px;display:flex;flex-direction:column;gap:12px;border-top:1px solid #D8DDE6;margin-top:16px">
  <div class="eyebrow" style="color:#5B6573">Fielded with</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">${PROOF.map(p=>`<span class="logo-ph" style="padding:6px 10px;font-size:12px">${p}</span>`).join('')}</div>
</section>

<section style="padding:0 16px 56px;display:flex;flex-direction:column;gap:20px">
  <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow">Three ways to work with us</div><h2 class="h2">Start with a device, a problem, or the software.</h2></div>
  ${WAYS.map(([t,d,l],i)=>`<div class="card" style="padding:20px;display:flex;flex-direction:column;gap:10px"><div class="mono" style="font-size:12px;color:#B4400E;letter-spacing:.08em">0${i+1}</div><h3 class="h3">${t}</h3><p class="p">${d}</p><a href="#" style="font-weight:600;font-size:15px;display:inline-flex;align-items:center;gap:6px;min-height:44px">${l} ${ICON_ARROW}</a></div>`).join('')}
</section>

<section style="padding:0 16px 56px;display:flex;flex-direction:column;gap:16px">
  <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow">Solutions by sector</div><h2 class="h2">Built for operations that cannot afford blind spots.</h2></div>
  ${SECTORS.map(([t,d,chips])=>`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:8px"><h3 class="h3" style="font-size:18px">${t}</h3><p class="p" style="font-size:15px">${d}</p><div style="display:flex;gap:6px;flex-wrap:wrap">${chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div></div>`).join('')}
  <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;min-height:44px">All solutions ${ICON_ARROW}</a>
</section>

<section style="padding:0 16px 56px">
  <div class="instr" style="padding:24px 18px;display:flex;flex-direction:column;gap:20px;border-radius:12px">
    <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow im">How we build</div><h2 class="h2" style="color:#FFFFFF">We own every layer. One team, one contract, one number to call.</h2><p class="p" style="color:#9FB3C8">We design the device, write the firmware, build the cloud and the apps, and manufacture in India — so nothing falls between suppliers.</p></div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${STACK.map(([n,t,d],i)=>`<div style="background:#132B4D;border:1px solid ${i===0?'#2A3F63':'#E8541C'};border-radius:8px;padding:12px 14px;display:flex;gap:12px;align-items:flex-start"><div class="lbl" style="color:${i===0?'#9FB3C8':'#FF8A55'};padding-top:3px;white-space:nowrap">${n}</div><div><div style="font-weight:600;font-size:15px;color:#FFFFFF">${t} <span class="lbl" style="font-weight:400">${i===0?'· yours':'· AID-IoT'}</span></div><div style="font-size:13px;color:#9FB3C8;line-height:1.4">${d}</div></div></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 16px 56px;display:flex;flex-direction:column;gap:14px">
  <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow">Results in the field</div><h2 class="h2">Numbers our customers report.</h2></div>
  ${RESULTS.map(([n,l,src])=>`<div class="card" style="padding:20px;display:flex;flex-direction:column;gap:6px"><p class="stat">${n}</p><p class="p" style="font-weight:500;color:#0B1F3A">${l}</p><p class="small mono" style="font-size:12px">${src}</p></div>`).join('')}
  <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;min-height:44px">Read the case studies ${ICON_ARROW}</a>
</section>

<section style="padding:0 16px 56px;display:flex;flex-direction:column;gap:18px">
  <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow">Products</div><h2 class="h2">Devices already proven in the field.</h2></div>
  ${GROUPS.map(([g,items])=>`<div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow" style="color:#0B1F3A;padding-bottom:8px;border-bottom:1px solid #B9C1CF">${g}</div>${items.map(([n,d])=>`<a href="#" class="card" style="padding:12px 14px;display:flex;flex-direction:column;gap:2px;color:#0B1F3A"><span style="font-weight:600;font-size:15px">${n}</span><span class="small">${d}</span></a>`).join('')}</div>`).join('')}
  <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;min-height:44px">Full catalogue ${ICON_ARROW}</a>
</section>

<section style="padding:0 16px 56px;display:flex;flex-direction:column;gap:16px">
  <div class="eyebrow">Software</div>
  <h2 class="h2">Every device we ship runs with software we wrote.</h2>
  <p class="p">Hosted by us or on your own servers. Works with our hardware and with the equipment you already own.</p>
  <div class="instr" style="padding:16px;display:flex;flex-direction:column;gap:12px">
    <div style="display:flex;justify-content:space-between;align-items:center"><div class="lbl">Plant 2 · Line B</div><div class="val" style="color:#7BD0A3;font-size:12px">● 8 online</div></div>
    <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:8px">${[['Furnace 1','842 °C'],['VFD 3','47.2 Hz'],['Scale A','1,206 kg']].map(([a,b])=>`<div style="background:#132B4D;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:2px"><div class="lbl" style="font-size:10px">${a}</div><div style="font-family:'Geist Mono',monospace;font-size:15px;color:#FFFFFF">${b}</div></div>`).join('')}</div>
    <svg viewBox="0 0 600 120" width="100%" height="80" preserveAspectRatio="none"><polyline points="0,90 60,80 120,84 180,50 240,56 300,40 360,44 420,30 480,36 540,22 600,26" fill="none" stroke="#E8541C" stroke-width="3"/></svg>
    <div class="lbl" style="text-align:center">Placeholder — real screenshot here</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px">${SOFTWARE.map(([n,d])=>`<div style="display:flex;gap:10px;align-items:flex-start"><span style="margin-top:4px">${ICON_CHECK}</span><div><span style="font-weight:600">${n}</span> <span class="p" style="font-size:15px">— ${d}</span></div></div>`).join('')}</div>
  <a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;min-height:44px">Explore software ${ICON_ARROW}</a>
</section>
${ctaBandM()}
${footerM()}
</div>`);

/* ---------- PRODUCT DESKTOP ---------- */
const TABS=['Overview','Who it’s for','How it works','What you get','Specifications','In the field'];
const PROBLEMS=[['Readings stay in the panel','Machines log locally; nobody sees it until someone walks over.'],['One radio, one point of failure','When the link drops, the data is gone — not delayed.'],['Nothing decides on-site','Alerts and simple rules wait on a round-trip to a server.'],['Boxes that lock you in','Off-the-shelf gateways bring their own cloud and pricing.']];
const GETS=[['Talks to what you already own','Modbus, RS-485, RS-232 and analog inputs — no re-wiring, no new sensors.'],['Keeps working when the network doesn’t','Logs to its own storage and reconciles with the cloud when the link returns.'],['Rules and alerts on the device','Set-points, ramps and trip alarms run locally, in milliseconds.'],['Your dashboard, or ours','AID-IoT platform, your SCADA, Android/Windows apps, REST or MQTT — your choice.']];
const SPECS=[
 ['Hardware',[['Display','Integrated OLED, status & network LEDs'],['Clock','On-board real-time clock'],['Mounting','Optional DIN-rail'],['Enclosure','IP-rated industrial housing']]],
 ['Communication',[['Serial','RS-232 · 2× RS-485'],['Modbus','2× RTU stacks, multi-drop'],['USB','Type-C OTG, re-flash from laptop'],['Optional','UART · One-Wire · CAN / OBD2']]],
 ['Network',[['Cellular','4G / 2G via nano-SIM'],['Wireless','Wi-Fi 2.4 GHz · Bluetooth LE'],['Wired','Ethernet LAN (RJ-45)'],['Failover','Configurable carrier priority']]],
 ['Power & storage',[['Power','12–24 V DC'],['Storage','Micro-SD card slot'],['Auth','Optional RFID / NFC reader'],['Vision','Optional camera integration']]],
];
const USES=[['Furnace automation','Closed-loop temperature control with alarms streamed to cloud'],['VFD speed control','Set, ramp and protect drives from one console'],['PID controller master','Cascaded loops with local fallback'],['Mobile tower maintenance','Power, fuel and intrusion telemetry per site'],['Scales + thermal print','Weigh, print, log and post in one motion'],['SCADA-compatible aggregation','Field tags into a Modbus / MQTT view'],['Weather stations','Met and air-quality nodes in remote sites'],['Barcode scanner master','Validate and route scans with on-device dedup']];

const productD=wrap(`
<div style="width:1440px;background:#F3F4F6">
${headerD('Products')}
<div style="display:flex;justify-content:space-between;align-items:center;height:48px;padding:0 64px;background:#FFFFFF;border-bottom:1px solid #D8DDE6">
  <div class="small" style="display:flex;gap:8px;align-items:center"><a href="#" style="color:#5B6573">Home</a><span>›</span><a href="#" style="color:#5B6573">Products</a><span>›</span><a href="#" style="color:#5B6573">Gateways &amp; edge</a><span>›</span><span style="color:#0B1F3A;font-weight:500">IIoT Bridge</span></div>
  <div style="display:flex;gap:4px">${TABS.map((t,i)=>`<a href="#" style="font-size:13px;font-weight:500;padding:6px 12px;border-radius:6px;color:${i===0?'#FFFFFF':'#3A465C'};background:${i===0?'#0B1F3A':'transparent'}">${t}</a>`).join('')}</div>
</div>

<section style="padding:72px 64px 48px">
  <div style="display:grid;grid-template-columns:minmax(0, 7fr) minmax(0, 5fr);gap:64px;align-items:center;max-width:1312px;margin:0 auto">
    <div style="display:flex;flex-direction:column;gap:22px">
      <div class="eyebrow">Gateway · IIoT Bridge</div>
      <h1 style="font-size:52px;line-height:1.05;letter-spacing:-.025em;font-weight:600;margin:0;text-wrap:balance">Connect the machines you already have to one live dashboard.</h1>
      <p class="sub">For plants running PLCs, drives, scales and meters that each speak their own language. The IIoT Bridge sits in the panel, collects every reading, keeps working when the network drops, and sends it all to the AID-IoT dashboard — or your own system.</p>
      <div style="display:flex;gap:12px;margin-top:6px"><a class="btn primary" href="#">Talk to an engineer</a><a class="btn secondary" href="#">Download datasheet</a></div>
    </div>
    <div class="card" style="padding:28px;border-radius:12px"><img src="device.jpg" alt="AID-IoT IIoT Bridge gateway" style="width:100%;height:auto;display:block;border-radius:6px"></div>
  </div>
</section>
<section style="padding:0 64px 96px">
  <div class="instr" style="max-width:1312px;margin:0 auto;padding:20px 28px;display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:24px">
    ${[['Connects to','Modbus · RS-485 ×2 · RS-232 · analog'],['Network','4G / 2G · Wi-Fi · Ethernet · BLE'],['Power','12–24 V DC · DIN-rail'],['Works offline','Yes — logs to SD, syncs on reconnect']].map(([l,v])=>`<div style="display:flex;flex-direction:column;gap:4px"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join('')}
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Who it’s for</div><h2 class="h2" style="max-width:22ch">One device, three people who need it.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:20px">
      ${[['Operations heads','See every line live, from any office, without asking for a report.'],['Plant engineers','Keep the machines and wiring you have. The bridge speaks their protocols.'],['IT and OT teams','Run it on our cloud or your servers; integrate over REST, MQTT or SCADA.']].map(([t,d])=>`<div class="card" style="padding:24px;display:flex;flex-direction:column;gap:8px"><h3 class="h3">${t}</h3><p class="p">${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:grid;grid-template-columns:minmax(0, 5fr) minmax(0, 7fr);gap:48px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">The problem</div><h2 class="h2">Industrial data is everywhere — and nowhere.</h2><p class="sub">Most plants run a patchwork of machines that each log their own way. The data exists; it just never reaches the people who decide.</p></div>
    <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:16px">${PROBLEMS.map(([t,d])=>`<div class="card" style="padding:20px;display:flex;flex-direction:column;gap:6px"><h3 class="h3" style="font-size:17px">${t}</h3><p class="p" style="font-size:15px">${d}</p></div>`).join('')}</div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div class="instr" style="max-width:1312px;margin:0 auto;padding:48px 56px;display:flex;flex-direction:column;gap:36px;border-radius:14px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow im">How it works</div><h2 class="h2" style="color:#FFFFFF;max-width:24ch">From the panel to the screen in four steps.</h2></div>
    <div style="display:grid;grid-template-columns:minmax(0, 3fr) 40px minmax(0, 3fr) 40px minmax(0, 3fr) 40px minmax(0, 3fr);gap:0;align-items:center">
      <div style="display:flex;flex-direction:column;gap:8px">${['PLC · Modbus','VFD · RS-485','Scale · RS-232'].map(x=>`<div style="background:#132B4D;border:1px solid #2A3F63;border-radius:8px;padding:12px 14px;font-family:'Geist Mono',monospace;font-size:13px;color:#E9EEF6">${x}</div>`).join('')}<div class="lbl" style="margin-top:4px">Your machines</div></div>
      <svg viewBox="0 0 40 24" width="40" height="24" fill="none" stroke="#9FB3C8" stroke-width="1.5"><path d="M2 12h30M26 6l6 6-6 6"/></svg>
      <div style="display:flex;flex-direction:column;gap:8px"><div style="background:#0B1F3A;border:2px solid #E8541C;border-radius:10px;padding:18px;display:flex;flex-direction:column;gap:6px"><div style="font-weight:700;font-size:18px;color:#FFFFFF">IIoT Bridge</div><div style="font-size:13px;color:#9FB3C8;line-height:1.4">Collects, checks and stores every reading. Runs your rules and alarms on-site.</div></div><div class="lbl" style="color:#FF8A55">AID-IoT device</div></div>
      <svg viewBox="0 0 40 24" width="40" height="24" fill="none" stroke="#9FB3C8" stroke-width="1.5"><path d="M2 12h30M26 6l6 6-6 6"/></svg>
      <div style="display:flex;flex-direction:column;gap:8px">${['4G / 2G','Wi-Fi · Ethernet','Offline: micro-SD log'].map(x=>`<div style="background:#132B4D;border:1px solid #E8541C;border-radius:8px;padding:12px 14px;font-family:'Geist Mono',monospace;font-size:13px;color:#E9EEF6">${x}</div>`).join('')}<div class="lbl" style="color:#FF8A55;margin-top:4px">Any link, with failover</div></div>
      <svg viewBox="0 0 40 24" width="40" height="24" fill="none" stroke="#9FB3C8" stroke-width="1.5"><path d="M2 12h30M26 6l6 6-6 6"/></svg>
      <div style="display:flex;flex-direction:column;gap:8px">${[['AID-IoT dashboard','#E8541C'],['Your SCADA / ERP','#2A3F63'],['Android / Windows app','#E8541C']].map(([x,c])=>`<div style="background:#132B4D;border:1px solid ${c};border-radius:8px;padding:12px 14px;font-family:'Geist Mono',monospace;font-size:13px;color:#E9EEF6">${x}</div>`).join('')}<div class="lbl" style="margin-top:4px">Where your team sees it</div></div>
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">What you get</div><h2 class="h2" style="max-width:22ch">Built for plants, not pilots.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:20px">${GETS.map(([t,d])=>`<div class="card" style="padding:24px;display:flex;flex-direction:column;gap:8px"><span style="width:28px;height:3px;background:#E8541C;border-radius:2px"></span><h3 class="h3" style="font-size:18px">${t}</h3><p class="p" style="font-size:15px">${d}</p></div>`).join('')}</div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:32px"><div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">Specifications</div><h2 class="h2">Engineered for the panel room.</h2></div><a class="btn secondary" href="#" style="height:44px">Download datasheet (PDF)</a></div>
    <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:20px">
      ${SPECS.map(([g,rows])=>`<div class="card" style="padding:20px 22px"><div class="eyebrow" style="color:#0B1F3A;margin-bottom:10px">${g}</div><table class="spec" style="width:100%;border-collapse:collapse">${rows.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 64px 96px">
  <div style="max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="eyebrow">In the field</div><h2 class="h2" style="max-width:22ch">Eight places the bridge is already working.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:16px">${USES.map(([t,d])=>`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:4px"><span style="font-weight:600;font-size:15px">${t}</span><span class="small">${d}</span></div>`).join('')}</div>
    <div class="card" style="padding:20px 24px;display:flex;justify-content:space-between;align-items:center;gap:24px;background:#FFFFFF"><div><div class="eyebrow" style="color:#0B1F3A">Runs with</div><p class="p" style="margin-top:4px"><b>AID-IoT platform</b> · Android and Windows apps · REST, MQTT and webhooks · custom rules on the device</p></div><a href="#" style="font-weight:600;white-space:nowrap;display:inline-flex;align-items:center;gap:6px">See the software ${ICON_ARROW}</a></div>
  </div>
</section>
${ctaBandD()}
${footerD()}
</div>`);

/* ---------- PRODUCT MOBILE ---------- */
const productM=wrap(`
<div class="m" style="width:390px;background:#F3F4F6">
${headerM()}
<div style="padding:10px 16px;background:#FFFFFF;border-bottom:1px solid #D8DDE6;display:flex;flex-direction:column;gap:8px">
  <div class="small" style="display:flex;gap:6px;align-items:center;font-size:13px"><a href="#" style="color:#5B6573">Products</a><span>›</span><a href="#" style="color:#5B6573">Gateways &amp; edge</a><span>›</span><span style="color:#0B1F3A;font-weight:500">IIoT Bridge</span></div>
  <div style="display:flex;gap:6px;overflow:hidden;position:relative">${TABS.map((t,i)=>`<span style="font-size:13px;font-weight:500;padding:9px 12px;border-radius:6px;white-space:nowrap;color:${i===0?'#FFFFFF':'#3A465C'};background:${i===0?'#0B1F3A':'#F3F4F6'}">${t}</span>`).join('')}<div style="position:absolute;right:0;top:0;bottom:0;width:48px;background:linear-gradient(90deg, rgba(255,255,255,0), #FFFFFF)"></div></div>
</div>
<section style="padding:32px 16px 24px;display:flex;flex-direction:column;gap:16px">
  <div class="eyebrow">Gateway · IIoT Bridge</div>
  <h1 style="font-size:32px;line-height:1.08;letter-spacing:-.025em;font-weight:600;margin:0;text-wrap:balance">Connect the machines you already have to one live dashboard.</h1>
  <p class="sub">For plants running PLCs, drives, scales and meters that each speak their own language. The bridge sits in the panel, collects every reading, keeps working when the network drops, and sends it to your dashboard.</p>
  <div style="display:flex;flex-direction:column;gap:10px"><a class="btn primary" href="#" style="width:100%">Talk to an engineer</a><a class="btn secondary" href="#" style="width:100%">Download datasheet</a></div>
  <div class="card" style="padding:14px;border-radius:12px;margin-top:6px"><img src="device.jpg" alt="AID-IoT IIoT Bridge gateway" style="width:100%;height:auto;display:block;border-radius:6px"></div>
  <div class="instr" style="padding:16px;display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:14px">
    ${[['Connects to','Modbus · RS-485 ×2 · RS-232'],['Network','4G · Wi-Fi · LAN · BLE'],['Power','12–24 V DC'],['Works offline','Yes — logs to SD']].map(([l,v])=>`<div style="display:flex;flex-direction:column;gap:3px"><div class="lbl">${l}</div><div class="val" style="font-size:13px">${v}</div></div>`).join('')}
  </div>
</section>

<section style="padding:24px 16px 48px;display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow">Who it’s for</div><h2 class="h2">One device, three people who need it.</h2>
  ${[['Operations heads','See every line live, from any office, without asking for a report.'],['Plant engineers','Keep the machines and wiring you have. The bridge speaks their protocols.'],['IT and OT teams','Run it on our cloud or your servers; integrate over REST, MQTT or SCADA.']].map(([t,d])=>`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:6px"><h3 class="h3" style="font-size:18px">${t}</h3><p class="p" style="font-size:15px">${d}</p></div>`).join('')}
</section>

<section style="padding:0 16px 48px;display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow">The problem</div><h2 class="h2">Industrial data is everywhere — and nowhere.</h2>
  <p class="p">The data exists; it just never reaches the people who decide.</p>
  ${PROBLEMS.map(([t,d])=>`<div class="card" style="padding:16px;display:flex;flex-direction:column;gap:4px"><h3 class="h3" style="font-size:16px">${t}</h3><p class="p" style="font-size:14px">${d}</p></div>`).join('')}
</section>

<section style="padding:0 16px 48px">
  <div class="instr" style="padding:22px 18px;display:flex;flex-direction:column;gap:18px;border-radius:12px">
    <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow im">How it works</div><h2 class="h2" style="color:#FFFFFF">From the panel to the screen in four steps.</h2></div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${[['Your machines','PLC · Modbus / VFD · RS-485 / Scale · RS-232','#2A3F63','#9FB3C8'],['IIoT Bridge','Collects, checks and stores every reading. Runs your rules on-site.','#E8541C','#FF8A55'],['Any link, with failover','4G / 2G · Wi-Fi · Ethernet · offline log to micro-SD','#E8541C','#FF8A55'],['Where your team sees it','AID-IoT dashboard · your SCADA / ERP · Android / Windows app','#E8541C','#FF8A55']].map(([t,d,b,c],i)=>`<div style="display:flex;flex-direction:column;gap:6px">${i>0?'<svg viewBox="0 0 24 20" width="24" height="20" fill="none" stroke="#9FB3C8" stroke-width="1.5" style="margin-left:14px"><path d="M12 2v14M6 11l6 6 6-6"/></svg>':''}<div style="background:#132B4D;border:1px solid ${b};border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:3px"><div style="font-weight:600;font-size:15px;color:#FFFFFF">${t}</div><div class="lbl" style="text-transform:none;letter-spacing:0;color:${c};font-size:12px;line-height:1.4">${d}</div></div></div>`).join('')}
    </div>
  </div>
</section>

<section style="padding:0 16px 48px;display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow">What you get</div><h2 class="h2">Built for plants, not pilots.</h2>
  ${GETS.map(([t,d])=>`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:6px"><span style="width:28px;height:3px;background:#E8541C;border-radius:2px"></span><h3 class="h3" style="font-size:17px">${t}</h3><p class="p" style="font-size:15px">${d}</p></div>`).join('')}
</section>

<section style="padding:0 16px 48px;display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow">Specifications</div><h2 class="h2">Engineered for the panel room.</h2>
  ${SPECS.map(([g,rows])=>`<div class="card" style="padding:16px 18px"><div class="eyebrow" style="color:#0B1F3A;margin-bottom:8px">${g}</div><table class="spec" style="width:100%;border-collapse:collapse">${rows.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table></div>`).join('')}
  <a class="btn secondary" href="#" style="width:100%">Download datasheet (PDF)</a>
</section>

<section style="padding:0 16px 48px;display:flex;flex-direction:column;gap:12px">
  <div class="eyebrow">In the field</div><h2 class="h2">Eight places the bridge is already working.</h2>
  <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:10px">${USES.map(([t,d])=>`<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:3px"><span style="font-weight:600;font-size:14px">${t}</span><span class="small" style="font-size:13px">${d}</span></div>`).join('')}</div>
  <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:8px"><div class="eyebrow" style="color:#0B1F3A">Runs with</div><p class="p" style="font-size:15px"><b>AID-IoT platform</b> · Android and Windows apps · REST, MQTT and webhooks</p><a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;min-height:44px">See the software ${ICON_ARROW}</a></div>
</section>
${ctaBandM()}
${footerM()}
</div>`);

/* ---------- TOKENS SHEET ---------- */
const tokens=wrap(`
<div style="width:1440px;background:#F3F4F6;padding:56px 64px;display:flex;flex-direction:column;gap:40px;box-sizing:border-box">
  <div style="display:flex;flex-direction:column;gap:8px"><div class="eyebrow">Design system · v0.1</div><h2 class="h2">Precision, plainly.</h2><p class="sub">One visual world. Light is the reading and selling surface; navy “instrument panels” are reserved for devices, diagrams, specs and dashboards.</p></div>
  <div style="display:grid;grid-template-columns:repeat(8, minmax(0, 1fr));gap:14px">
    ${[['Navy ink','#0B1F3A','text · instrument ground','#FFFFFF'],['Navy 2','#132B4D','instrument surface','#FFFFFF'],['Signal orange','#E8541C','buttons · display · fills','#FFFFFF'],['Orange ink','#B4400E','links · eyebrows · small text','#FFFFFF'],['Ground','#F3F4F6','page background','#0B1F3A'],['Surface','#FFFFFF','cards · tables','#0B1F3A'],['Muted','#5B6573','secondary text','#FFFFFF'],['Instrument muted','#9FB3C8','labels on navy','#0B1F3A']].map(([n,h,r,t])=>`<div class="card" style="overflow:hidden"><div style="height:72px;background:${h};display:flex;align-items:flex-end;padding:8px;font-family:'Geist Mono',monospace;font-size:11px;color:${t}">${h}</div><div style="padding:10px 12px;display:flex;flex-direction:column;gap:2px"><span style="font-weight:600;font-size:13px">${n}</span><span class="small" style="font-size:12px">${r}</span></div></div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:24px">
    <div class="card" style="padding:28px;display:flex;flex-direction:column;gap:14px">
      <div class="eyebrow" style="color:#0B1F3A">Type · Geist + Geist Mono</div>
      <div style="font-size:49px;line-height:1.04;letter-spacing:-.025em;font-weight:600">Display 49 / 600</div>
      <div style="font-size:39px;line-height:1.08;letter-spacing:-.02em;font-weight:600">Heading 39 / 600</div>
      <div style="font-size:25px;line-height:1.2;letter-spacing:-.01em;font-weight:600">Subheading 25 / 600</div>
      <div style="font-size:17px;line-height:1.55;color:#3A465C">Body 17 / 400 — running text, 65 characters wide, calm and specific.</div>
      <div style="font-size:14px;line-height:1.5;color:#5B6573">Caption 14 / 400 — never below 12 on any device.</div>
      <div class="mono" style="font-size:13px;color:#5B6573;letter-spacing:.02em">MONO 13 · 12–24 V DC · RS-485 ×2 · −20 to 60 °C — anything that is data</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card" style="padding:24px;display:flex;flex-direction:column;gap:14px">
        <div class="eyebrow" style="color:#0B1F3A">Buttons · 48px · one primary per view</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn primary" href="#">Talk to an engineer</a><a class="btn secondary" href="#">See how it works</a><a href="#" style="font-weight:600;display:inline-flex;align-items:center;gap:6px;height:48px">Text link ${ICON_ARROW}</a></div>
        <div class="instr" style="padding:14px;display:flex;gap:12px;align-items:center"><a class="btn primary" href="#">On navy</a><a class="btn onnavy" href="#">Secondary on navy</a></div>
      </div>
      <div class="card" style="padding:24px;display:flex;flex-direction:column;gap:12px">
        <div class="eyebrow" style="color:#0B1F3A">Instrument panel · chips · spec rows</div>
        <div class="instr" style="padding:14px 18px;display:flex;gap:24px"><div><div class="lbl">Uplink</div><div class="val">4G / CAT-M</div></div><div><div class="lbl">Uptime</div><div class="val">14d 03h</div></div><div><div class="lbl">Status</div><div class="val" style="color:#7BD0A3">● healthy</div></div></div>
        <div style="display:flex;gap:6px"><span class="chip">IIoT Bridge</span><span class="chip">AID-Fuel</span><span class="chip">NavIC CMS</span></div>
        <table class="spec" style="width:100%;border-collapse:collapse"><tr><td>Serial</td><td>RS-232 · 2× RS-485</td></tr><tr><td>Power</td><td>12–24 V DC</td></tr></table>
      </div>
    </div>
  </div>
  <div class="card" style="padding:20px 24px;display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:20px">
    ${[['Grid','12 columns · 1312 max · 24px gutters'],['Spacing','8px scale · sections 96 / 56 (mobile)'],['Radius','8px cards · 10–14px panels · 6px chips'],['Contrast','All text pairs ≥ 4.5:1 · orange ink 5.7:1 on white']].map(([k,v])=>`<div><div class="eyebrow" style="color:#0B1F3A">${k}</div><p class="small" style="margin-top:4px">${v}</p></div>`).join('')}
  </div>
</div>`);

fs.writeFileSync('Main.dc.html',homeD);
fs.writeFileSync('HomeMobile.dc.html',homeM);
fs.writeFileSync('ProductDesktop.dc.html',productD);
fs.writeFileSync('ProductMobile.dc.html',productM);
fs.writeFileSync('Tokens.dc.html',tokens);
console.log('written');
