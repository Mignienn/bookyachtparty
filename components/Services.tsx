"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const services = [
  {
    icon: "⚓",
    title: "Yacht de Luxe",
    description:
      "Yachts de 10 à 25 mètres, entretenus aux plus hauts standards. Pont supérieur, salon intérieur climatisé, cabines privées.",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80",
    badge: "Flotte Premium",
  },
  {
    icon: "🎵",
    title: "DJ Professionnel",
    description:
      "DJ certifié, équipement haut de gamme. Deep house, afro beats, reggaeton, R&B — la playlist de vos rêves.",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80",
    badge: "100% Gratuit",
    highlight: true,
  },
  {
    icon: "🔊",
    title: "Système Son Premium",
    description:
      "Enceintes Bose Marine, caissons de basses étanches. Un son cristallin même en pleine mer, pour une ambiance club.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    badge: "Inclus",
  },
  {
    icon: "🥂",
    title: "Champagne & Boissons",
    description:
      "Option service premium : champagne, cocktails préparés à bord, plateau de mignardises, service steward dédié.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    badge: "En option",
  },
  {
    icon: "🌅",
    title: "Croisière Coucher de Soleil",
    description:
      "Partez 2h avant le coucher du soleil pour vivre le moment magique de la dorure sur la mer depuis votre yacht.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    badge: "Expérience unique",
  },
  {
    icon: "🤿",
    title: "Équipements Nautiques",
    description:
      "Paddle, masques de plongée, bouées, jet ski sur demande. La mer comme terrain de jeu pour tous les aventuriers.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    badge: "Disponible",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-24 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Ce qui est inclus
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Une Expérience{" "}
            <span className="gold-shimmer">Complète</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            Chaque détail est pensé pour que votre journée sur l'eau soit
            absolument parfaite, du départ à l'arrivée.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal group rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                s.highlight
                  ? "border-gold/40 hover:shadow-gold/20"
                  : "border-white/10 hover:border-gold/20 hover:shadow-gold/10"
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide ${
                    s.badge === "100% Gratuit"
                      ? "bg-green-500/90 text-white"
                      : s.badge === "Inclus"
                        ? "bg-green-500/70 text-white"
                        : "bg-gold/90 text-navy"
                  }`}
                >
                  {s.badge}
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${s.highlight ? "bg-gold/5" : "bg-white/[0.02]"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 reveal">
          <p className="text-white/50 text-sm mb-6">
            Tous les services inclus dès la première heure. Aucun frais caché.
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy font-bold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
          >
            Réserver avec tous les services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
