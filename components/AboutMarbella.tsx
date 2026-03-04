"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { value: "300+", label: "Jours de soleil / an" },
  { value: "5★", label: "Puerto Banús Marina" },
  { value: "120+", label: "Clients satisfaits" },
  { value: "0€", label: "Frais DJ cachés" },
];

export default function AboutMarbella() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="marbella" className="relative py-24 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-dark" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: images mosaic */}
          <div className="reveal order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-56 rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80"
                    alt="Marbella Puerto Banus"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=600&q=80"
                    alt="Mediterranean sea"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-40 rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
                    alt="Luxury yacht deck"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                <div className="relative h-56 rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=600&q=80"
                    alt="Sunset on sea"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  {/* Overlay card */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-navy/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gold/20">
                      <p className="text-gold text-xs font-semibold tracking-wider uppercase">Puerto Banús</p>
                      <p className="text-white text-sm font-medium mt-0.5">Marina 5 étoiles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                🇪🇸 Costa del Sol
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Le Glamour de{" "}
                <span className="gold-shimmer">Marbella</span>
                <br />
                <span className="text-3xl font-normal italic text-white/70">
                  comme nulle part ailleurs
                </span>
              </h2>
              <div className="gold-divider mb-6 ml-0" style={{ margin: "0 0 1.5rem 0" }} />
            </div>

            <div className="reveal">
              <p className="text-white/65 leading-relaxed text-lg mb-6">
                Marbella, joyau de la Costa del Sol, accueille l'élite mondiale sur ses
                plages dorées. <span className="text-white font-medium">Puerto Banús</span>,
                son port légendaire, est le point d'ancrage des yachts les plus luxueux
                d'Europe.
              </p>
              <p className="text-white/65 leading-relaxed">
                Avec <span className="text-gold font-medium">300 jours de soleil par an</span>,
                des eaux cristallines à 22°C en été et une scène festive inégalée, Marbella
                est la destination idéale pour une expérience yacht hors du commun.
                Naviguez entre les côtes de l'Andalousie et vivez le rêve méditerranéen.
              </p>
            </div>

            {/* Stats */}
            <div className="reveal grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center hover:border-gold/30 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-gold mb-1 font-serif">{s.value}</div>
                  <div className="text-white/50 text-xs tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Locations */}
            <div className="reveal flex flex-wrap gap-2">
              {["Puerto Banús", "Estepona", "Fuengirola", "Gibraltar", "Cabo Pino", "Benalmádena"].map((loc) => (
                <span
                  key={loc}
                  className="text-xs bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full hover:border-gold/30 hover:text-white transition-colors"
                >
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
