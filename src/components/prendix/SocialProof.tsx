import { motion } from "framer-motion";

const stats = [
  { value: "500k+", label: "Leitores apaixonados" },
  { value: "10k+", label: "Histórias disponíveis" },
  { value: "2 min", label: "Capítulos em média" },
  { value: "4.8", label: "Avaliação dos leitores" },
];

export function SocialProof() {
  return (
    <section className="relative py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prendix-card rounded-3xl p-10 sm:p-14 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,58,120,.15), transparent 60%)",
            }}
          />
          <div className="relative text-center mb-10">
            <p className="font-display text-xl sm:text-2xl text-prendix-ink/95 max-w-2xl mx-auto leading-snug">
              Mais de <span className="prendix-gradient-text font-bold">500 mil leitores</span> já se renderam
              às histórias do Prendix.
            </p>
          </div>
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold prendix-gradient-text">
                  {s.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-prendix-mute uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}