import { useMemo } from "react";
import { motion } from "framer-motion";

// Disabled on mobile — too CPU heavy
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function Particles({ count = 40 }: { count?: number }) {
  // On mobile render nothing
  if (isMobile) return null;

  // On desktop reduce to 15 particles max
  const realCount = Math.min(count, 15);

  const items = useMemo(
    () =>
      Array.from({ length: realCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        hue: Math.random() > 0.5 ? "#ff3a78" : "#f0c674",
      })),
    [realCount],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [-15, 15, -15] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
