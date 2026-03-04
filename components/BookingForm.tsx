"use client";

import { useState, useEffect, useRef } from "react";

const durations = [2, 3, 4, 5, 6, 8];

export default function BookingForm() {
  const [guests, setGuests] = useState(8);
  const [duration, setDuration] = useState(4);
  const [date, setDate] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const estimatedPrice = guests <= 6 ? 490 : guests <= 10 ? 690 : guests <= 15 ? 890 : 1190;
  const totalPrice = Math.round(estimatedPrice * (duration / 4));

  return (
    <section id="booking" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-dark" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Demande de réservation
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Réservez Votre{" "}
            <span className="gold-shimmer">Expérience</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 max-w-xl mx-auto">
            Remplissez le formulaire et notre équipe vous contacte sous 2 heures
            pour confirmer votre soirée de rêve.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-3 reveal">
            {submitted ? (
              <div className="rounded-3xl border border-gold/30 bg-gold/5 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-3">
                  Demande Envoyée !
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Merci {form.name || ""}. Notre équipe va examiner votre demande et vous
                  contacter à <span className="text-gold">{form.email}</span> sous 2 heures.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold px-6 py-3 rounded-full text-sm transition-all"
                  >
                    Suivre sur Instagram
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-white/50 hover:text-white text-sm underline-offset-4 hover:underline"
                  >
                    Nouvelle demande
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 space-y-6"
              >
                {/* Date */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2 tracking-wide">
                    Date souhaitée *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/60 rounded-xl px-4 py-3.5 text-white text-base outline-none transition-colors duration-300 [color-scheme:dark]"
                  />
                </div>

                {/* Guests slider */}
                <div>
                  <label className="flex items-center justify-between text-white/70 text-sm font-medium mb-3 tracking-wide">
                    <span>Nombre d&apos;invités *</span>
                    <span className="text-gold font-bold text-lg">{guests} personnes</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(+e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-3 tracking-wide">
                    Durée de la croisière *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {durations.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setDuration(h)}
                        className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                          duration === h
                            ? "bg-gold text-navy border-gold font-bold"
                            : "bg-white/5 text-white/60 border-white/10 hover:border-gold/40 hover:text-white"
                        }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal info grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2 tracking-wide">Prénom & Nom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jean Dupont"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold/60 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2 tracking-wide">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 6 12 34 56 78"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-gold/60 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2 tracking-wide">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jean@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/60 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2 tracking-wide">
                    Message / Occasion particulière
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Anniversaire, EVJF, team building... Dites-nous tout !"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/60 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-light text-navy font-bold text-base py-5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed tracking-wide flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-white/30 text-xs text-center">
                  Sans engagement · Réponse garantie sous 2h · Paiement sécurisé
                </p>
              </form>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2 space-y-5 reveal">
            {/* Price estimate */}
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <h4 className="font-serif text-xl font-bold text-white mb-1">Estimation</h4>
              <p className="text-white/50 text-xs mb-4">Tarif indicatif, confirmé sous 2h</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold text-gold">{totalPrice}€</span>
                <span className="text-white/50 text-sm mb-1">pour {duration}h</span>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center justify-between">
                  <span>{guests} personnes × {duration}h</span>
                  <span className="text-white">{totalPrice}€</span>
                </li>
                <li className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> DJ + Son premium
                  </span>
                  <span className="text-green-400 font-semibold">Gratuit</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Carburant inclus
                  </span>
                  <span className="text-green-400 font-semibold">Inclus</span>
                </li>
              </ul>
            </div>

            {/* Why us */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <h4 className="font-serif text-lg font-semibold text-white">Pourquoi nous ?</h4>
              {[
                { icon: "🎵", text: "DJ professionnel inclus (valeur 250€)" },
                { icon: "⚓", text: "Yachts de luxe certifiés" },
                { icon: "🥂", text: "Champagne & boissons en option" },
                { icon: "🌅", text: "Couchers de soleil spectaculaires" },
                { icon: "📞", text: "Support 7j/7 en français" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Contact direct */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h4 className="text-white/70 text-sm font-medium mb-3">Contact direct</h4>
              <a
                href="tel:+34600000000"
                className="flex items-center gap-3 text-white hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">+34 600 000 000</div>
                  <div className="text-white/40 text-xs">Disponible 9h–21h</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
