import { motion } from "framer-motion";
import { useState } from "react";
import { Flame, Clock, Gift, BookOpen, Zap, Star } from "lucide-react";
import { StoryModal } from "./StoryModal";
import featuredCover from "@/assets/featured-cover.webp";

const indicators = [
  { icon: Clock, label: "Capítulos curtos" },
  { icon: Gift, label: "Comece grátis" },
  { icon: BookOpen, label: "Leitura em episódios" },
  { icon: Zap, label: "Reviravolta logo no início" },
];

export function FeaturedStory() {
  const [open, setOpen] = useState(false);

  return (
    <section id="historia" className="relative py-20 sm:py-32 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0d050a, #050308)",
            border: "1px solid rgba(255,255,255,.06)",
            boxShadow:
              "0 50px 140px -30px rgba(255,58,120,.4), 0 0 0 1px rgba(255,255,255,.05)",
          }}
        >
          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-0">
            {/* Left content */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex self-start items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{
                  background: "rgba(255,58,120,.12)",
                  color: "#ffb3c8",
                  border: "1px solid rgba(255,58,120,.35)",
                }}
              >
                <Flame size={12} />
                História em destaque
              </motion.div>

              <h2 className="mt-6 font-display font-black text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-tight">
                <span className="text-prendix-ink">Ela Voltou</span>
                <br />
                <span className="prendix-gradient-text">Mais Forte</span>
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-prendix-rose font-medium tracking-wide">
                <span>Romance</span>
                <span className="text-prendix-mute/40">•</span>
                <span>Vingança</span>
                <span className="text-prendix-mute/40">•</span>
                <span>Reviravolta</span>
              </div>

              <p className="mt-6 text-base sm:text-lg text-prendix-ink/85 leading-relaxed max-w-xl">
                Depois de ser humilhada e deixada para trás, ela reaparece no
                topo. Agora todos querem saber até onde ela vai para virar o
                jogo.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 max-w-md">
                {indicators.map((it) => (
                  <div
                    key={it.label}
                    className="flex items-center gap-2.5 text-sm text-prendix-ink/75"
                  >
                    <span
                      className="grid place-items-center w-8 h-8 rounded-full shrink-0"
                      style={{
                        background: "rgba(255,58,120,.1)",
                        color: "#ffb3c8",
                        border: "1px solid rgba(255,58,120,.2)",
                      }}
                    >
                      <it.icon size={14} />
                    </span>
                    {it.label}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-5">
                <button
                  onClick={() => setOpen(true)}
                  className="prendix-btn-primary rounded-full px-7 sm:px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
                >
                  <BookOpen size={16} />
                  Ler história completa
                </button>
                <div className="hidden sm:flex items-center gap-1.5 text-prendix-gold text-sm">
                  <Star size={14} fill="currentColor" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-prendix-mute">· 28k leitores</span>
                </div>
              </div>
            </div>

            {/* Right cover */}
            <FeaturedCover />
          </div>
        </motion.div>
      </div>

      <StoryModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function FeaturedCover() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="relative min-h-[460px] lg:min-h-[680px] overflow-hidden order-1 lg:order-2"
    >
      <img
        src={featuredCover}
        alt="Cena cinematográfica de Ela Voltou Mais Forte"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* gradient overlays */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,3,8,.85) 0%, rgba(5,3,8,.4) 25%, transparent 55%), linear-gradient(180deg, transparent 50%, rgba(5,3,8,.7) 100%)",
        }}
      />
      {/* rose tint */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 40%, rgba(255,58,120,.5), transparent 60%)",
        }}
      />
      {/* bottom caption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-center justify-between"
      >
        <div>
          <div className="font-cinema text-prendix-gold/90 text-[10px] tracking-[0.4em] uppercase">
            Capítulo 01
          </div>
          <div className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
            O Retorno
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.3em] uppercase text-prendix-gold/70 font-cinema">
            Prendix Original
          </div>
          <div className="text-xs text-prendix-mute mt-1">Temp. 1 · 24 cap.</div>
        </div>
      </motion.div>
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </motion.div>
  );
}