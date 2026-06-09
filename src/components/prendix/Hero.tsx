import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";
import featuredCover from "@/assets/featured-cover.webp";
import heroRotate1 from "@/assets/hero-rotate-1.webp";
import heroRotate2 from "@/assets/hero-rotate-2.webp";
import heroRotate3 from "@/assets/hero-rotate-3.webp";

const TITLE = "Prendix";
const ROTATING_COVERS = [featuredCover, heroRotate1, heroRotate2, heroRotate3];

export function Hero() {
  const scrollTo = (sel: string) =>
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

  const [coverIndex, setCoverIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setCoverIndex((i) => (i + 1) % ROTATING_COVERS.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
    >
      {/* Subtle dark backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 prendix-grid"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 40%, rgba(255,58,120,.16), transparent 60%), radial-gradient(ellipse 60% 60% at 10% 90%, rgba(120,40,180,.15), transparent 60%), #050308",
        }}
      />
      <Particles count={35} />

      <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-6 lg:px-10 pt-28 lg:pt-32 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT: copy */}
        <div className="relative">
          {/* tiny eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6"
            style={{
              background: "rgba(255,58,120,.1)",
              color: "#ffb3c8",
              border: "1px solid rgba(255,58,120,.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-prendix-rose animate-pulse" />
            Novo · App brasileiro de séries
          </motion.div>

          {/* TITLE */}
          <div className="relative">
            <motion.div
              aria-hidden
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.9 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full origin-left pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(245,217,138,.9), rgba(255,58,120,.7), transparent)",
                filter: "blur(1px)",
                boxShadow: "0 0 20px rgba(245,217,138,.5)",
              }}
            />
            <h1 className="font-cinema font-black tracking-wide leading-none prendix-gold-glow">
              <span className="sr-only">Prendix</span>
              <span
                aria-hidden
                className="block text-[clamp(3.5rem,8vw,6.5rem)]"
              >
                {TITLE.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block prendix-gold-text"
                    initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + i * 0.1,
                      ease: [0.2, 0.7, 0.2, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] text-prendix-ink max-w-xl"
          >
            Histórias rápidas, intensas e{" "}
            <span className="italic prendix-gold-text">impossíveis de largar</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.85 }}
            className="mt-5 text-base text-prendix-mute max-w-xl leading-relaxed"
          >
            Capítulos curtos de{" "}
            <span className="text-prendix-rose">romance</span>,{" "}
            <span className="text-prendix-rose">drama</span>,{" "}
            <span className="text-prendix-rose">desejo</span>,{" "}
            <span className="text-prendix-rose">vingança</span> e{" "}
            <span className="text-prendix-rose">reviravolta</span> direto no
            celular. Você começa por curiosidade e continua porque precisa
            saber o final.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.05 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => scrollTo("#app")}
              className="prendix-btn-primary rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <Play size={14} fill="white" />
              Começar grátis
            </button>
            <button
              onClick={() => scrollTo("#historia")}
              className="prendix-btn-ghost rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Ver história em destaque
            </button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3 }}
            className="mt-10 flex items-center gap-6 text-xs text-prendix-mute"
          >
            <div className="flex items-center gap-1.5 text-prendix-gold">
              <Star size={13} fill="currentColor" />
              <span className="font-semibold">4.8</span>
              <span className="text-prendix-mute">App Store</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div>
              <span className="text-prendix-ink font-semibold">500k+</span>{" "}
              leitores
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div>
              <span className="text-prendix-ink font-semibold">10k+</span>{" "}
              histórias
            </div>
          </motion.div>
        </div>

        {/* RIGHT: cinematic poster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative aspect-[3/4] lg:aspect-[4/5] max-w-md mx-auto w-full lg:max-w-none rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 50px 120px -30px rgba(255,58,120,.4), 0 0 0 1px rgba(255,255,255,.06)",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={coverIndex}
              src={ROTATING_COVERS[coverIndex]}
              alt="Capa em destaque"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 30%, rgba(5,3,8,.5) 65%, rgba(5,3,8,.95) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255,58,120,.5), transparent 60%)",
            }}
          />

          {/* poster meta */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <div className="text-[10px] tracking-[0.35em] uppercase text-prendix-gold font-cinema mb-2">
              Prendix Original · Novo
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
              Ela Voltou Mais Forte
            </h3>
            <div className="mt-2 text-xs text-prendix-rose font-medium tracking-wide">
              Romance · Vingança · Reviravolta
            </div>
            <button
              onClick={() => scrollTo("#historia")}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white hover:text-prendix-gold transition-colors group"
            >
              <span className="grid place-items-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-prendix-rose transition-colors">
                <Play size={12} fill="white" className="text-white ml-0.5" />
              </span>
              <span className="font-medium">Ver capítulo 1</span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.button
        aria-label="Continuar"
        onClick={() => scrollTo("#historia")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 prendix-arrow text-prendix-gold/60 hover:text-prendix-gold"
      >
        <ChevronDown size={26} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}