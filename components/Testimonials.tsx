"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sophie M.",
    location: "Paris, France",
    event: "Enterrement de vie de jeune fille",
    rating: 5,
    text: "Une expérience absolument magique ! Le DJ était incroyable, il a su lire l'ambiance de notre groupe dès le départ. On a dansé de 17h jusqu'au coucher du soleil sur la Méditerranée. Le yacht était somptueux et l'équipage aux petits soins. Je recommande à 1000% — c'était la meilleure journée de ma vie avant mon mariage !",
    avatar: "S",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Thomas & Julie B.",
    location: "Lyon, France",
    event: "Anniversaire de mariage",
    rating: 5,
    text: "Notre 10ème anniversaire de mariage méritait quelque chose d'exceptionnel. BookYachtParty a dépassé toutes nos espérances. Le champagne nous attendait à bord, le DJ jouait notre chanson préférée, et le coucher de soleil sur Puerto Banús... on ne l'oubliera jamais. Le service était digne d'un palace 5 étoiles.",
    avatar: "T",
    color: "from-blue-500 to-cyan-600",
    featured: true,
  },
  {
    name: "Alexandre R.",
    location: "Monaco",
    event: "Team building entreprise",
    rating: 5,
    text: "Nous avons organisé notre séminaire d'entreprise (30 personnes) avec BookYachtParty. Organisation impeccable, réponse ultra-rapide, personnalisation parfaite. Le DJ a adapté sa musique pour créer une ambiance festive mais professionnelle. Toute l'équipe est repartie galvanisée. On renouvelle l'année prochaine, c'est certain !",
    avatar: "A",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add("visible"), i * 150);
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
    <section id="avis" className="relative py-24 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Ils nous font confiance
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Ce que Disent Nos{" "}
            <span className="gold-shimmer">Clients</span>
          </h2>
          <div className="gold-divider mb-6" />
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold text-lg">★</span>
              ))}
            </div>
            <span>4.9/5 · 120+ avis vérifiés</span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`reveal group cursor-pointer rounded-3xl p-7 border transition-all duration-500 ${
                active === i
                  ? "border-gold/50 bg-gold/5 shadow-xl shadow-gold/10 scale-[1.01]"
                  : "border-white/10 bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04]"
              }`}
            >
              {/* Quote mark */}
              <div className="text-gold/30 text-6xl font-serif leading-none mb-4 -mt-2">"</div>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-gold text-base">★</span>
                ))}
              </div>

              {/* Text */}
              <p className={`text-sm leading-relaxed mb-6 transition-colors ${
                active === i ? "text-white/80" : "text-white/55"
              }`}>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.location}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-gold/10 border border-gold/20 text-gold/80 px-2 py-1 rounded-full">
                    {t.event}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="reveal mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            { icon: "🛡️", text: "Paiement 100% sécurisé" },
            { icon: "✅", text: "Avis vérifiés" },
            { icon: "🏆", text: "N°1 à Marbella" },
            { icon: "📱", text: "Support 7j/7" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
              <span className="text-lg">{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
