import { motion } from "framer-motion";
import { Play } from "lucide-react";
import s1 from "@/assets/story-1.webp";
import s2 from "@/assets/story-2.webp";
import s3 from "@/assets/story-3.webp";
import s4 from "@/assets/story-4.webp";

const stories = [
  {
    img: s1,
    title: "Desejo Proibido",
    tags: "Romance • Tabu",
    desc: "Ela jurou nunca mais sentir. Até ele atravessar a porta.",
    chapters: 18,
  },
  {
    img: s2,
    title: "Jogo de Aparências",
    tags: "Drama • Traição",
    desc: "Um casamento perfeito esconde a verdade mais cruel.",
    chapters: 22,
  },
  {
    img: s3,
    title: "O Contrato Final",
    tags: "Suspense • Vingança",
    desc: "Ele assinou pensando ser o predador. Acabou virando a presa.",
    chapters: 30,
  },
  {
    img: s4,
    title: "Segredo de Família",
    tags: "Mistério • Reviravolta",
    desc: "Cada carta revelava uma mentira. A última, uma morte.",
    chapters: 16,
  },
];

export function StoriesGallery() {
  return (
    <section className="relative py-20 sm:py-28 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-prendix-rose mb-3">
              Catálogo
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl leading-tight">
              Histórias para você{" "}
              <span className="prendix-gradient-text italic">não dormir</span>.
            </h2>
          </div>
          <p className="text-prendix-mute max-w-md">
            Novos capítulos toda semana. Toque em qualquer capa para começar.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stories.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: "0 20px 60px -20px rgba(0,0,0,.7)",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(5,3,8,.4) 60%, rgba(5,3,8,.95) 100%)",
                  }}
                />
                {/* hover rose tint */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 100%, rgba(255,58,120,.35), transparent 60%)",
                  }}
                />

                {/* play */}
                <div className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                  style={{ background: "rgba(255,58,120,.95)", boxShadow: "0 8px 24px rgba(255,58,120,.5)" }}
                >
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-prendix-rose font-semibold mb-1">
                    {s.tags}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-prendix-ink/75 leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500">
                    {s.desc}
                  </p>
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-prendix-mute">
                    {s.chapters} capítulos
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}