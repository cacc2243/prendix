import { motion } from "framer-motion";
import { Download, Bell, Play, ChevronRight } from "lucide-react";

const recos = [
  { title: "Desejo Proibido", tag: "Romance" },
  { title: "Jogo de Aparências", tag: "Drama" },
  { title: "O Contrato Final", tag: "Suspense" },
  { title: "Segredo de Família", tag: "Reviravolta" },
];

export function AppShowcase() {
  return (
    <section id="app" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateY: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative flex justify-center order-last lg:order-first"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,58,120,.35), transparent 70%)",
            }}
          />
          <div
            className="prendix-float relative w-[300px] sm:w-[340px] aspect-[9/19] rounded-[3rem] p-3"
            style={{
              background:
                "linear-gradient(135deg, #1a1014, #0a0508)",
              boxShadow:
                "0 50px 120px -20px rgba(255,58,120,.3), 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.08)",
            }}
          >
            <div
              className="w-full h-full rounded-[2.4rem] overflow-hidden flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #0a0508 0%, #15080f 100%)",
              }}
            >
              {/* Notch */}
              <div className="h-7 flex items-center justify-center">
                <div className="w-20 h-5 rounded-full bg-black" />
              </div>

              {/* App content */}
              <div className="flex-1 overflow-hidden px-4 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-lg font-bold prendix-gradient-text">
                    Prendix
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                </div>

                <div className="text-[10px] uppercase tracking-widest text-prendix-mute mb-2">
                  Continue lendo
                </div>

                {/* Featured card */}
                <div
                  className="rounded-2xl p-3 mb-4 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,58,120,.18), rgba(40,10,25,.6))",
                    border: "1px solid rgba(255,58,120,.2)",
                  }}
                >
                  <div className="flex gap-3">
                    <div
                      className="w-14 h-20 rounded-lg shrink-0"
                      style={{
                        background:
                          "linear-gradient(180deg, #ff3a78, #2a0612)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-prendix-rose font-semibold tracking-wider uppercase">
                        Em andamento
                      </div>
                      <div className="text-sm font-bold leading-tight mt-0.5 truncate">
                        Ela Voltou Mais Forte
                      </div>
                      <div className="text-[10px] text-prendix-mute mt-0.5">
                        Capítulo 12
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "72%",
                            background:
                              "linear-gradient(90deg, #ff3a78, #f0c674)",
                          }}
                        />
                      </div>
                      <div className="text-[9px] text-prendix-mute mt-1">
                        72%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-widest text-prendix-mute">
                    Recomendadas para você
                  </div>
                  <ChevronRight size={12} className="text-prendix-mute" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {recos.map((r, i) => (
                    <div
                      key={r.title}
                      className="rounded-xl p-2 relative overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <div
                        className="aspect-[3/4] rounded-md mb-1.5"
                        style={{
                          background:
                            i % 2
                              ? "linear-gradient(160deg, #4a1030, #0a0510)"
                              : "linear-gradient(160deg, #2a0a3a, #0a0510)",
                        }}
                      />
                      <div className="text-[10px] font-semibold leading-tight truncate">
                        {r.title}
                      </div>
                      <div className="text-[8px] text-prendix-rose tracking-wider uppercase mt-0.5">
                        {r.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab bar */}
              <div className="h-12 border-t border-white/5 flex items-center justify-around px-6">
                <Play size={14} className="text-prendix-rose" />
                <Bell size={14} className="text-prendix-mute" />
                <div className="w-3.5 h-3.5 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs font-medium tracking-[0.3em] uppercase text-prendix-rose mb-4">
            O app
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            Sua próxima{" "}
            <span className="prendix-gradient-text italic">obsessão</span>{" "}
            começa agora.
          </h2>
          <p className="mt-5 text-base text-prendix-mute leading-relaxed max-w-md">
            Baixe o app Prendix e mergulhe em histórias feitas para quem sente
            tudo intensamente.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button className="prendix-btn-primary rounded-full px-7 py-4 text-base font-semibold inline-flex items-center justify-center gap-2">
              <Download size={16} />
              Baixar o app grátis
            </button>
            <button className="prendix-btn-ghost rounded-full px-7 py-4 text-base font-medium inline-flex items-center justify-center gap-2">
              <Bell size={16} />
              Quero receber novidades
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}