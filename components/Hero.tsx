"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, subRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + i * 250);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-party.jpg"
          alt="Yacht party in Marbella"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay with navy tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        {/* Extra depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/50 via-transparent to-navy/50" />
      </div>

      {/* Animated particles / stars */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Puerto Banús · Marbella · Costa del Sol
        </div>

        {/* Main headline */}
        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.9s ease" }}
        >
          Louez un Yacht à{" "}
          <span className="gold-shimmer">Marbella</span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl italic font-normal">
            🎵 DJ Inclus Gratuitement
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.9s ease" }}
        >
          L'expérience 5 étoiles sur la Méditerranée. Yacht de luxe, DJ professionnel,
          son premium et coucher de soleil inoubliable sur la Costa del Sol.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.9s ease" }}
        >
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gold/40 hover:scale-105 tracking-wide"
          >
            <span>Réserver Maintenant</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-gold border border-white/20 hover:border-gold/40 px-8 py-4 rounded-full transition-all duration-300 text-sm tracking-wider uppercase"
          >
            Découvrir nos services
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/50 text-xs tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="text-gold">★★★★★</span>
            <span>5/5 sur 120+ avis</span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Paiement sécurisé</span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Réponse en 2h</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
