"use client";
/* World B signature: a live mimic diagram of Plant 2, Line B. */
import { useEffect, useState } from "react";

export function LiveDiagram() {
  const [v, setV] = useState({ t: 842, hz: 47.2, kg: 1206, clock: "14:22:08" });
  useEffect(() => { const id = setInterval(() => setV({ t: 842 + Math.round((Math.random() - 0.5) * 6), hz: +(47.2 + (Math.random() - 0.5) * 0.6).toFixed(1), kg: 1206 + Math.round((Math.random() - 0.5) * 8), clock: new Date().toTimeString().slice(0, 8) }), 1500); return () => clearInterval(id); }, []);
  const node = (x: number, tag: string, name: string, val: string, warn = false) => (
    <g key={tag}>
      <rect x={x} y={60} width={150} height={86} fill="#FAF8F3" stroke="#1B1A17" strokeWidth={1.5} />
      <rect x={x} y={60} width={150} height={22} fill="#1B1A17" />
      <text x={x + 8} y={76} fontFamily="Khand" fontWeight={600} fontSize={13} fill="#FAF8F3" letterSpacing={1.5}>{tag}</text>
      <text x={x + 8} y={106} fontFamily="Ranade" fontWeight={600} fontSize={14} fill="#1B1A17">{name}</text>
      <text x={x + 8} y={132} fontFamily="Khand" fontWeight={700} fontSize={24} fill={warn ? "#C8451B" : "#0E7C66"}>{val}</text>
      <circle cx={x + 138} cy={126} r={5} fill={warn ? "#C8451B" : "#0E7C66"} />
    </g>
  );
  const dev = (x: number, name: string) => (
    <g key={name + x}>
      <rect x={x} y={190} width={120} height={44} fill="#FAF8F3" stroke="#0E7C66" strokeWidth={2} />
      <rect x={x + 8} y={198} width={10} height={10} fill="#0E7C66" />
      <text x={x + 26} y={208} fontFamily="Khand" fontWeight={700} fontSize={11} fill="#0E7C66" letterSpacing={1.5}>AID-IOT</text>
      <text x={x + 8} y={225} fontFamily="Ranade" fontWeight={600} fontSize={12} fill="#1B1A17">{name}</text>
    </g>
  );
  return (
    <div className="frame paper-grid overflow-hidden">
      <svg viewBox="0 0 760 500" className="block h-auto w-full" role="img" aria-label="Live diagram of a plant line, illustrative">
        <text x={16} y={26} fontFamily="Khand" fontWeight={700} fontSize={14} letterSpacing={2} fill="#1B1A17">PLANT 2 · LINE B · LIVE</text>
        <text x={744} y={26} textAnchor="end" fontFamily="Martian Mono" fontSize={11} fill="#0E7C66">8 devices online · {v.clock}</text>
        <path d="M40 130 H720 M40 130 V380 M720 130 V380" fill="none" stroke="#1B1A17" strokeWidth={2} />
        {node(60, "TT-101", "Furnace 1", `${v.t} °C`)}{node(260, "SC-203", "VFD 3", `${v.hz} Hz`)}{node(460, "WT-310", "Scale A", `${v.kg.toLocaleString("en-IN")} kg`, true)}
        {dev(80, "IIoT Bridge")}{dev(280, "IIoT Bridge")}{dev(480, "IoT Edge Lite")}
        <g stroke="#0E7C66" strokeWidth={2}><line x1={135} y1={146} x2={135} y2={190} /><line x1={335} y1={146} x2={335} y2={190} /><line x1={535} y1={146} x2={535} y2={190} /></g>
        <g stroke="#0E7C66" strokeWidth={2} strokeDasharray="5 5" className="animate-[dash_1s_linear_infinite]"><line x1={140} y1={234} x2={140} y2={300} /><line x1={340} y1={234} x2={340} y2={300} /><line x1={540} y1={234} x2={540} y2={300} /></g>
        <rect x={60} y={300} width={640} height={60} fill="#1B1A17" />
        <text x={76} y={325} fontFamily="Khand" fontWeight={700} fontSize={14} fill="#FAF8F3" letterSpacing={2}>SIGNAL · ON-PREM</text>
        <text x={76} y={347} fontFamily="Ranade" fontSize={13} fill="#C9C4B6">Rule: WT-310 over 1,200 kg → conveyor slowed · 14:22:06</text>
        <rect x={440} y={392} width={260} height={92} fill="#FAF8F3" stroke="#1B1A17" strokeWidth={1.5} />
        <text x={454} y={414} fontFamily="Khand" fontWeight={700} fontSize={13} fill="#C8451B" letterSpacing={1.5}>ALARM · WT-310 OVERLOAD</text>
        <text x={454} y={438} fontFamily="Ranade" fontSize={13} fill="#1B1A17">Conveyor slowed automatically.</text>
        <text x={454} y={462} fontFamily="Ranade" fontSize={13} fill="#0E7C66">Resolved in 2.1 s — nobody walked over.</text>
      </svg>
      <style>{`@keyframes dash{to{stroke-dashoffset:-10}}`}</style>
    </div>
  );
}
