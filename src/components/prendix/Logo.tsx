import { motion } from "framer-motion";

export function PrendixLogo({ size = 32 }: { size?: number }) {
  const wordmarkSize = Math.max(18, Math.round(size * 0.44));

  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ rotate: -8, scale: 1.05 }}
        className="relative grid place-items-center rounded-xl"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #ff3a78, #b30f3b)",
          boxShadow: "0 6px 24px -6px rgba(255,58,120,.55), inset 0 1px 0 rgba(255,255,255,.25)",
        }}
      >
        <span
          className="font-display font-black text-white"
          style={{ fontSize: size * 0.55, lineHeight: 1 }}
        >
          P
        </span>
        <span
          className="absolute -inset-1 rounded-2xl opacity-60 blur-md -z-10"
          style={{ background: "linear-gradient(135deg, #ff3a78, transparent)" }}
        />
      </motion.div>
      <span
        className="font-cinema font-bold tracking-[0.15em] text-prendix-ink"
        style={{ fontSize: wordmarkSize, lineHeight: 1 }}
      >
        Prendix
      </span>
    </div>
  );
}