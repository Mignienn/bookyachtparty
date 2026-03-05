"use client";

import { useState, useEffect, useMemo } from "react";

/* ─── background per step (Pexels – verified URLs) ─── */
const BG = [
  // Step 1 – Boat party in Marbella (custom photo)
  "/hero-party.jpg",
  // Step 2 – Girls dancing on yacht
  "/step2-yacht-girls.jpg",
  // Step 3 – Puerto Banús marina
  "/step3-marina.jpg",
  // Step 4 – DJ set on yacht at sunset
  "/step4-dj-sunset.jpg",
];

/* overlay gradient per step — festive colour theme */
const OVERLAY = [
  // marina – clean dark navy
  "from-[#0a0f2c]/70 via-[#0a1540]/45 to-[#0a0f2c]/75",
  // boat party – warm dark with purple tint to enhance festive feel
  "from-[#0a0f2c]/60 via-[#1a0535]/40 to-[#0a0f2c]/70",
  // DJ/crowd – deep dark to make the lights pop
  "from-[#050010]/70 via-[#0d0020]/50 to-[#050010]/80",
  // champagne party – warm amber-dark tint
  "from-[#0a0f2c]/65 via-[#1a0a00]/40 to-[#0a0f2c]/75",
];

/* ─── floating particles (reduced to 10 for performance) ─── */
function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: 2 + (i % 3) * 1.5,
        left: (i * 10) + 3,
        delay: i * 1.2,
        duration: 10 + (i % 4) * 3,
        color: i % 3 === 0 ? "#64B5F6" : i % 3 === 1 ? "#a78bfa" : "#ffffff",
        opacity: 0.15 + (i % 5) * 0.06,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bottom-0 will-change-transform"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            background: d.color,
            opacity: d.opacity,
            animation: `floatUp ${d.duration}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── animated DJ equaliser bars (reduced to 5) ─── */
function EqBars() {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[0.3, 0.8, 1, 0.6, 0.9].map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-[#64B5F6] origin-bottom will-change-transform"
          style={{
            height: `${h * 20}px`,
            animation: `eq ${0.8 + i * 0.15}s ${i * 0.1}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── mini calendar ─── */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WDAYS  = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Calendar({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  const [today] = useState(() => new Date());
  const [v, setV] = useState(() => ({ m: today.getMonth(), y: today.getFullYear() }));
  const first  = new Date(v.y, v.m, 1).getDay();
  const count  = new Date(v.y, v.m + 1, 0).getDate();
  const str    = (d: number) => `${v.y}-${String(v.m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const past   = (d: number) => new Date(str(d)) < new Date(today.toDateString());
  const isTod  = (d: number) => str(d) === today.toISOString().split("T")[0];
  const isSel  = (d: number) => str(d) === value;
  return (
    <div className="w-full max-w-md md:max-w-2xl mx-auto select-none">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setV(vv => vv.m===0?{m:11,y:vv.y-1}:{m:vv.m-1,y:vv.y})}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-[#64B5F6] hover:bg-white/10 text-xl transition-colors">‹</button>
        <span className="text-white font-bold tracking-wide text-base md:text-lg">{MONTHS[v.m]} {v.y}</span>
        <button onClick={() => setV(vv => vv.m===11?{m:0,y:vv.y+1}:{m:vv.m+1,y:vv.y})}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-[#64B5F6] hover:bg-white/10 text-xl transition-colors">›</button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {WDAYS.map(d=><div key={d} className="text-center text-white/40 text-sm py-1 font-medium">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1 md:gap-y-2">
        {Array(first).fill(null).map((_,i)=><div key={`b${i}`}/>)}
        {Array.from({length:count},(_,i)=>i+1).map(d=>{
          const p=past(d),s=isSel(d),t=isTod(d);
          return (
            <button key={d} disabled={p} onClick={()=>onChange(str(d))}
              className={[
                "h-9 w-9 md:h-11 md:w-11 mx-auto rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors duration-150",
                s ? "bg-[#64B5F6] text-[#0a0f2c] font-bold shadow-lg shadow-[#64B5F6]/50 scale-110 " :
                p ? "text-white/15 cursor-not-allowed" :
                t ? "border border-[#64B5F6]/60 text-[#64B5F6] hover:bg-[#64B5F6]/20" :
                    "text-white hover:bg-white/10 hover:text-[#64B5F6]"
              ].join(" ")}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── step progress bar ─── */
const LABELS = ["Date","Guests","Budget","Discover\nYachts"];
const ICONS  = [
  <svg key="c" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  <svg key="p" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  <svg key="e" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg key="u" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
];
const CHECK = <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>;

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mt-4">
      {LABELS.map((label, i) => {
        const done=i<step, active=i===step;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={[
                "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm transition-colors duration-400 border-2",
                done   ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30" :
                active ? "bg-[#64B5F6] border-[#64B5F6] text-[#0a0f2c] " :
                         "bg-white/5 border-white/20 text-white/40"
              ].join(" ")}>
                {done ? CHECK : ICONS[i]}
              </div>
              <span className={["text-[11px] font-medium whitespace-pre-line text-center leading-tight",
                active?"text-[#64B5F6]":done?"text-green-400":"text-white/30"
              ].join(" ")}>{label}</span>
            </div>
            {i<3&&<div className={["w-12 md:w-20 h-px mb-4 mx-1 transition-colors duration-500",
              i<step?"bg-green-500 shadow-sm shadow-green-400":"bg-white/15"
            ].join(" ")}/>}
          </div>
        );
      })}
    </div>
  );
}

/* ─── option card ─── */
function Card({ icon, title, sub, selected, onClick }: {
  icon: React.ReactNode; title: string; sub: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick}
      className={[
        "group relative w-full rounded-2xl border transition-colors duration-200 cursor-pointer",
        /* mobile: vertical centered layout | desktop: horizontal */
        "flex flex-col items-center text-center px-3 py-4 gap-2",
        "md:flex-row md:text-left md:items-center md:gap-5 md:px-7 md:py-6",
        selected
          ? "bg-white/10 border-[#64B5F6] shadow-xl shadow-[#64B5F6]/25"
          : "bg-black/25 border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-[#64B5F6]/40"
      ].join(" ")}>
      <div className={[
        "flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
        selected ? "bg-[#64B5F6]/20 border-[#64B5F6] text-[#64B5F6]"
                 : "bg-white/5 border-white/15 text-white/50 group-hover:border-[#64B5F6]/50 group-hover:text-white/80"
      ].join(" ")}>{icon}</div>
      <div>
        <div className="font-semibold text-sm md:text-base text-white">{title}</div>
        <div className="text-white/45 text-xs md:text-sm mt-0.5 inline-block bg-white/5 rounded-full px-2 py-0.5 md:bg-transparent md:px-0 md:py-0 md:rounded-none">{sub}</div>
      </div>
      {selected && (
        <div className="absolute right-2 top-2 md:right-4 md:top-1/2 md:-translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#64B5F6] flex items-center justify-center shadow-lg shadow-[#64B5F6]/40">
          <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      )}
    </button>
  );
}

/* ─── logo badge (static, no animations) ─── */
function Logo() {
  return (
    <div className="flex-shrink-0 flex justify-center">
      <div className="relative bg-[#0a0f2c] border border-white/10 border-t-0 rounded-b-2xl px-8 py-3 overflow-hidden">
        {/* blue glow at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-10"
             style={{background:"radial-gradient(ellipse at top, rgba(100,181,246,0.4) 0%, transparent 70%)"}}/>
        {/* content */}
        <div className="relative flex flex-col items-center gap-1">
          <div className="inline-flex items-center gap-2.5">
            <span className="text-lg">⚓</span>
            <span className="text-[#0077B6] font-sans font-bold text-base tracking-wide">Book</span>
            <span className="text-white font-sans font-bold text-base tracking-wide">Yacht</span>
            <span className="text-[#0077B6] font-sans font-bold text-base tracking-wide">Party</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <span className="text-white/50 text-[10px] font-medium tracking-wide">By</span>
            <img src="/kaprilux-logo.png" alt="Kaprilux" className="w-4 h-4 rounded-full"/>
            <span className="text-white/70 text-[10px] font-semibold tracking-wide">Kaprilux</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── dj pill badge ─── */
function DJBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-[#64B5F6]/15 border border-[#64B5F6]/40 text-[#64B5F6] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#64B5F6] animate-pulse"/>
      🎵 Free DJ Included
    </div>
  );
}

/* ─── bottom trust bar ─── */
function BottomBar() {
  return (
    <>
      {/* MOBILE: white bar below content */}
      <div className="flex-shrink-0 md:hidden bg-[#111827] px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-white font-bold text-[10px]">4.9/5</span>
            <span className="text-white/40 text-[10px]">| 2400+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span className="text-white/50">Secured by</span>
            <span className="font-semibold text-white/80">Stripe</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="bg-white rounded px-1.5 py-0.5 text-[8px] font-black text-blue-800 tracking-widest">VISA</div>
          <div className="flex">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 -mr-1.5"/>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"/>
          </div>
          <div className="bg-[#003087] rounded px-1.5 py-0.5 text-[8px] font-bold text-white">Pay<span className="text-[#009cde]">Pal</span></div>
          <div className="bg-[#007bc1] rounded px-1.5 py-0.5 text-[8px] font-bold text-white tracking-wide">AMEX</div>
        </div>
      </div>
      {/* DESKTOP: dark translucent bar at bottom */}
      <div className="hidden md:flex flex-shrink-0 items-center justify-between bg-black border-t border-white/10 px-8 py-2.5">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded px-1.5 py-0.5 text-[10px] font-black text-blue-800 tracking-widest">VISA</div>
          <div className="flex">
            <div className="w-4 h-4 rounded-full bg-red-500 -mr-1.5"/>
            <div className="w-4 h-4 rounded-full bg-yellow-400"/>
          </div>
          <div className="bg-[#003087] rounded px-1.5 py-0.5 text-[9px] font-bold text-white">Pay<span className="text-[#009cde]">Pal</span></div>
          <div className="bg-[#007bc1] rounded px-1.5 py-0.5 text-[9px] font-bold text-white tracking-wide">AMEX</div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-yellow-400 tracking-wider">★★★★★</span>
          <span className="text-white font-bold">4.9/5</span>
          <span className="text-white/25">|</span>
          <span className="text-white/50">2400+ Happy Clients · Google · Trustpilot</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/45 text-xs">
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span className="text-white/40">Secured by</span>
          <span className="font-semibold text-white/70">Stripe</span>
        </div>
      </div>
    </>
  );
}

/* ─── form input ─── */
function Input({ label, type, placeholder, value, onChange, icon }: {
  label: string; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-white/50 text-[11px] font-semibold tracking-widest uppercase mb-1.5">
        {icon} {label} <span className="text-[#64B5F6]">*</span>
      </label>
      <input type={type} placeholder={placeholder} value={value} required
        onChange={e=>onChange(e.target.value)}
        className="w-full bg-white/90 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#64B5F6]/60 transition-colors"
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN WIZARD
════════════════════════════════════════════ */
const GUESTS = [
  { title:"2–4 Guests", sub:"Intimate experience",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { title:"5–8 Guests", sub:"Family or small group",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
  { title:"9–12 Guests", sub:"Celebration group",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { title:"12+ Guests", sub:"Large group experience",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
];
const BUDGETS = [
  { title:"€900 – €1,500",  sub:"Usually 2–3 hours",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" strokeWidth={1.5}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2"/></svg> },
  { title:"€1,500 – €3,000", sub:"Standard Half Day / Day",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  { title:"€3,000 – €5,000", sub:"Premium Experience",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg> },
  { title:"€5,000+",         sub:"Ultra Exclusive Experience",
    icon:<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg> },
];

export default function BookingWizard() {
  const [mounted,   setMounted]   = useState(false);
  const [step,      setStep]      = useState(0);
  const [animating, setAnimating] = useState(false);
  const [date,      setDate]      = useState("");
  const [guests,    setGuests]    = useState<string|null>(null);
  const [budget,    setBudget]    = useState<string|null>(null);
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [apiFailed, setApiFailed] = useState(false);

  /* wait for client mount + preload images before showing anything */
  useEffect(() => {
    let loaded = 0;
    BG.forEach(src => {
      const img = new window.Image();
      img.onload = img.onerror = () => { loaded++; if (loaded >= BG.length) setMounted(true); };
      img.src = src;
    });
    /* fallback: show after 3s even if images are slow */
    const t = setTimeout(() => setMounted(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const goTo = (target: number) => {
    setStep(target);
  };
  const next = () => { if (step<3) goTo(step+1); };
  const back = () => { if (step>0) goTo(step-1); };

  const pickGuests = (v: string) => { setGuests(v);  setTimeout(next, 400); };
  const pickBudget = (v: string) => { setBudget(v); setTimeout(next, 400); };

  const submit = async () => {
    if (!name||!email||!phone) return;
    setLoading(true);
    setApiFailed(false);
    let ok = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, date, guests, budget }),
      });
      ok = res.ok;
      if (!ok) console.error("Lead save failed:", await res.text());
    } catch (err) {
      console.error("Lead save error:", err);
    }
    // Google Ads conversion tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-758350698/NxjPCJSJtoMcEOqGzukC",
        value: 1.0,
        currency: "CAD",
      });
    }
    setLoading(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setApiFailed(true);
    }
  };

  const contentClass = "";

  /* render nothing on server / while images load — prevents hydration flicker */
  if (!mounted) return <div className="w-screen h-screen bg-[#0a0f2c]" />;

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden" style={{fontFamily:"'Poppins',system-ui,sans-serif"}}>

      {/* ── crossfade backgrounds ── */}
      {BG.map((src, i) => (
        <div key={src} className="absolute inset-0 transition-opacity duration-700"
             style={{opacity: i===step?1:0, zIndex:0}}>
          <div className="absolute inset-0" style={{backgroundImage:`url(${src})`, backgroundSize:"cover", backgroundPosition:"center"}}/>
          <div className={`absolute inset-0 bg-gradient-to-b ${OVERLAY[i]}`}/>
          {/* radial glow */}
          <div className="absolute inset-0"
               style={{background:"radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 70%)"}}/>
        </div>
      ))}

      {/* particles & glow removed for stability */}

      {/* ── layout ── */}
      <div className="relative z-10 flex flex-col h-full">

        {/* logo */}
        <Logo/>

        {/* headline + stepper */}
        <div className={`text-center px-4 mt-1 md:mt-3 flex-shrink-0 ${contentClass}`}>

          <div style={{display: step===0 ? "block" : "none"}}>
              <h1 className="text-white font-bold text-xl md:text-4xl lg:text-5xl leading-tight mt-1 md:mt-3">
                Check Yacht Availability
              </h1>
              <div className="mt-1 md:mt-2 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                <span className="inline-block bg-[#64B5F6] text-white font-bold text-lg md:text-3xl px-4 md:px-5 py-1 rounded-xl" style={{fontFamily:"'Poppins',sans-serif"}}>
                  In Marbella
                </span>
                <span className="hidden md:inline-block bg-white/10 border border-[#64B5F6]/50 text-[#64B5F6] font-bold text-2xl px-5 py-1 rounded-xl backdrop-blur-sm shadow-lg shadow-[#64B5F6]/20">Free DJ Included</span>
              </div>
              <div className="mt-1.5 md:hidden">
                <span className="inline-block bg-white/10 border border-[#64B5F6]/50 text-[#64B5F6] font-bold text-sm px-3 py-1 rounded-xl backdrop-blur-sm">Free DJ Included</span>
              </div>
              <p className="text-white/55 mt-1.5 md:mt-2.5 text-xs md:text-sm">Pick your date to view available yachts on live calendar</p>
          </div>
          <div style={{display: step===1 ? "block" : "none"}}>
              <h1 className="text-white font-bold text-2xl md:text-5xl" style={{fontFamily:"'Poppins',sans-serif"}}>
                Who&apos;s Coming Aboard?
              </h1>
              <p className="text-white/55 mt-1 md:mt-2 text-sm md:text-base">How many people are in your trip group?</p>
          </div>
          <div style={{display: step===2 ? "block" : "none"}}>
              <h1 className="text-white font-bold text-2xl md:text-5xl" style={{fontFamily:"'Poppins',sans-serif"}}>
                What Is Your Budget Range?
              </h1>
              <p className="text-white/55 mt-1 md:mt-2 text-sm md:text-base">This helps us find the perfect yacht for you.</p>
          </div>
          <div style={{display: step===3 && !submitted ? "block" : "none"}}>
              <h1 className="text-white font-bold text-2xl md:text-4xl leading-tight" style={{fontFamily:"'Poppins',sans-serif"}}>
                Get a <span className="gold-shimmer">Free DJ</span> With<br className="hidden md:block"/> Your First Booking!
              </h1>
              <p className="text-white/50 mt-2 text-sm max-w-md mx-auto">Fill out the form to unlock your free DJ and be redirected to the calendar with yacht availability.</p>
          </div>

          <div className="mt-2 md:mt-4"><Stepper step={step}/></div>
        </div>

        {/* step content */}
        <div className={`flex-1 ${step===0 ? "overflow-hidden" : "overflow-y-auto"} px-4 md:px-8 mt-2 md:mt-4 min-h-0 ${contentClass}`}>
          <div className="w-full max-w-2xl mx-auto">

            {/* step 0 – date */}
            <div style={{display: step===0 ? "block" : "none"}}>
              <div className="rounded-3xl p-2 md:p-8">
                <p className="text-white font-semibold text-[11px] tracking-widest uppercase mb-2 md:mb-5">SELECT DATE</p>
                <Calendar value={date} onChange={setDate}/>
              </div>
            </div>

            {/* step 1 – guests */}
            <div style={{display: step===1 ? "block" : "none"}}>
                <p className="text-white/35 text-[11px] font-semibold tracking-widest uppercase mb-3 md:mb-5 md:mt-8">SELECT THE GROUP SIZE FOR YOUR TRIP</p>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {GUESTS.map(o=><Card key={o.title} icon={o.icon} title={o.title} sub={o.sub} selected={guests===o.title} onClick={()=>pickGuests(o.title)}/>)}
                </div>
            </div>

            {/* step 2 – budget */}
            <div style={{display: step===2 ? "block" : "none"}}>
                <p className="text-white/35 text-[11px] font-semibold tracking-widest uppercase mb-3 md:mb-5 md:mt-8">SELECT YOUR BUDGET RANGE</p>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {BUDGETS.map(o=><Card key={o.title} icon={o.icon} title={o.title} sub={o.sub} selected={budget===o.title} onClick={()=>pickBudget(o.title)}/>)}
                </div>
            </div>

            {/* step 3 – contact */}
            <div style={{display: step===3 ? "block" : "none"}}>
            {submitted ? (
                <div className="max-w-md mx-auto bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-[#64B5F6]/30 text-center"
                     style={{boxShadow:"0 0 60px rgba(201,168,76,0.15)"}}>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2" style={{fontFamily:"'Poppins',sans-serif"}}>Request Sent!</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Thank you <span className="text-white font-semibold">{name}</span>. Our team will reach out within 2 hours with your yacht + free DJ confirmed.</p>
                  <p className="text-[#64B5F6] text-sm mt-2 font-medium">{email}</p>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[#64B5F6] text-sm font-semibold">
                    Free DJ Included With Your Booking
                  </div>
                </div>
              ) : (
                <div className="max-w-lg mx-auto space-y-3">
                  <Input label="FIRST NAME" type="text" placeholder="Your First Name" value={name} onChange={setName}
                    icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}/>
                  <Input label="EMAIL ADDRESS" type="email" placeholder="you@example.com" value={email} onChange={setEmail}
                    icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}/>
                  <Input label="PHONE NUMBER" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={setPhone}
                    icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}/>
                  <p className="text-white/30 text-xs text-center pt-1">By submitting, discover every available option on our instant live calendar.</p>
                  {apiFailed && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                      <p className="text-white/80 text-sm mb-2">Something went wrong. Contact us directly:</p>
                      <a href={`https://wa.me/14388883791?text=${encodeURIComponent(`Hi, I'm ${name}. I'd like to book a yacht in Marbella.\nDate: ${date || "flexible"}\nGuests: ${guests || "TBD"}\nBudget: ${budget || "TBD"}\nEmail: ${email}\nPhone: ${phone}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors"
                        style={{boxShadow:"0 4px 20px rgba(34,197,94,0.4)"}}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Contact via WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── action buttons + stripe row ── */}
        {!submitted && (
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-2 z-20">
            {/* left: back or secured by stripe */}
            <div>
              {step>0 && (
                <button onClick={back}
                  className="flex items-center gap-2 text-white text-sm font-medium hover:text-white/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
              )}
            </div>
            {/* right: CTA */}
            <div>
              {step===0 && (
                <button onClick={next} disabled={!date}
                  className="group flex items-center gap-2 md:gap-3 bg-[#64B5F6] hover:bg-[#90CAF9] text-white font-bold px-5 py-2.5 md:px-10 md:py-4 rounded-full text-sm md:text-lg transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{boxShadow: date ? "0 4px 30px rgba(100,181,246,0.4)" : undefined}}>
                  Continue
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
              )}
              {(step===1||step===2) && (
                <a href="https://wa.me/14388883791?text=Hi%2C%20I%27m%20interested%20in%20booking%20a%20yacht%20in%20Marbella!" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm transition-colors"
                  style={{boxShadow:"0 4px 20px rgba(34,197,94,0.4)"}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Connect with Agent
                </a>
              )}
              {step===3 && (
                <button onClick={submit} disabled={loading||!name||!email||!phone}
                  className="flex items-center gap-2 bg-[#64B5F6] hover:bg-[#90CAF9] text-white font-bold px-4 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{boxShadow:(name&&email&&phone)?"0 4px 30px rgba(201,168,76,0.4)":undefined}}>
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-[#0a0f2c]/30 border-t-[#0a0f2c] rounded-full animate-spin"/>Sending…</>
                    : <>Check Availability <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>
                  }
                </button>
              )}
            </div>
          </div>
        )}

        <BottomBar/>
      </div>
    </div>
  );
}
