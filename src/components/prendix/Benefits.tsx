import { motion } from "framer-motion";
import { Zap, Heart, Lock, Crown } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Rápido e viciante",
    text: "Capítulos curtos que cabem no seu tempo e prendem do início ao fim.",
  },
  {
    icon: Heart,
    title: "Emoções reais",
    text: "Histórias intensas que mexem com você e ficam na cabeça por dias.",
  },
  {
    icon: Lock,
    title: "Reviravoltas inesquecíveis",
    text: "Cada capítulo traz um novo choque de emoção que você não vê chegar.",
  },
  {
    icon: Crown,
    title: "Personagens marcantes",
    text: "Fortes, imperfeitos e reais. Você torce, ama, odeia e não esquece.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="relative py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-xs font-medium tracking-[0.3em] uppercase text-prendix-rose mb-4">
            Por que Prendix
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Por que você vai se{" "}
            <span className="prendix-gradient-text italic">prender?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="prendix-card rounded-2xl p-6 sm:p-7 group relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                style={{ background: "rgba(255,58,120,.25)" }}
              />
              <div
                className="grid place-items-center w-12 h-12 rounded-xl mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,58,120,.2), rgba(225,29,72,.1))",
                  border: "1px solid rgba(255,58,120,.25)",
                  color: "#ff7aa1",
                }}
              >
                <it.icon size={20} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                {it.title}
              </h3>
              <p className="text-sm text-prendix-mute leading-relaxed">
                {it.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}