"use client";

import { useEffect, useRef } from "react";

const perks = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: "DJ Professionnel",
    desc: "DJ certifié avec 5+ ans d'expérience en événements de luxe",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12m-4.536-2.464a5 5 0 010-7.072M12 18v3m0-18v3" />
      </svg>
    ),
    title: "Son Premium",
    desc: "Système audio haute-fidélité adapté à votre yacht",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Playlist Personnalisée",
    desc: "Vos genres préférés : house, deep, latin, R&B, lounge…",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "100% Gratuit",
    desc: "Inclus dans votre location, sans supplément caché",
  },
];

export default function DJBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dj" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          {/* Big badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 mb-6 mx-auto">
            <span className="text-3xl">🎵</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Offre exclusive
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            DJ Gratuit{" "}
            <span className="gold-shimmer">Inclus</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal italic text-white/80">
              dans chaque location de yacht
            </span>
          </h2>

          <div className="gold-divider mb-6" />

          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Transformez votre croisière en soirée inoubliable. Notre DJ professionnel
            monte à bord et crée l'ambiance parfaite pour votre event sur la Méditerranée.
          </p>
        </div>

        {/* Hero DJ card */}
        <div className="reveal mb-16">
          <div className="relative rounded-3xl overflow-hidden border border-gold/20 bg-gradient-to-br from-navy-light to-navy">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
            <div className="relative grid md:grid-cols-2 gap-0">
              {/* Left: visual */}
              <div className="relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-navy-dark flex items-center justify-center">
                  {/* DJ Console Illustration */}
                  <div className="text-center p-8">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold/50 flex items-center justify-center bg-gold/10 mx-auto mb-4 animate-[spin_10s_linear_infinite]">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-gold" />
                        </div>
                      </div>
                    </div>
                    {/* Sound waves */}
                    <div className="flex items-end justify-center gap-1 h-12 mt-4">
                      {[4, 8, 12, 16, 20, 16, 12, 8, 4, 8, 12, 16, 20, 12, 8].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gold rounded-full opacity-70"
                          style={{
                            height: h * 2 + "px",
                            animation: `float ${0.8 + i * 0.1}s ease-in-out ${i * 0.05}s infinite alternate`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-gold/80 text-sm tracking-widest uppercase mt-4 font-medium">
                      Live DJ Set
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Valeur : 250€ — 100% Offert
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                  Votre DJ Privé<br />
                  <span className="text-gold">à Bord</span>
                </h3>

                <p className="text-white/60 leading-relaxed mb-8">
                  Qu'il s'agisse d'un anniversaire, d'un enterrement de vie de garçon/jeune fille,
                  d'un team building ou simplement d'une soirée entre amis — notre DJ crée
                  l'ambiance parfaite pour votre groupe.
                </p>

                <ul className="space-y-3">
                  {["Deep House & Afro Beats", "Latin Vibes & Reggaeton", "R&B & Hip-Hop Premium", "Lounge & Chillout Sunset"].map((genre) => (
                    <li key={genre} className="flex items-center gap-3 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <div
              key={i}
              className="reveal group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-500 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <h4 className="font-serif text-lg font-semibold text-white mb-2">{p.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
