import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function StoryModal({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="prendix-card relative w-full max-w-lg rounded-3xl p-8 sm:p-10"
            style={{
              boxShadow:
                "0 30px 80px -20px rgba(255,58,120,.25), 0 0 0 1px rgba(255,255,255,.06)",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 p-2 rounded-full text-prendix-ink/60 hover:text-prendix-ink hover:bg-white/5"
            >
              <X size={18} />
            </button>

            <div className="text-xs font-medium tracking-[0.25em] uppercase text-prendix-rose mb-3">
              Prévia da história
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Ela Voltou Mais Forte
            </h3>
            <p className="mt-5 text-prendix-ink/80 leading-relaxed">
              Ela saiu pela porta dos fundos, humilhada por todos. Meses depois,
              voltou pela entrada principal, dona da empresa que eles juravam
              controlar.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="prendix-btn-primary rounded-full px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2">
                <BookOpen size={16} />
                Começar pelo capítulo 1
              </button>
              <button
                onClick={onClose}
                className="prendix-btn-ghost rounded-full px-6 py-3 text-sm font-medium"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}