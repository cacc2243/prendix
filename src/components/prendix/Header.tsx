import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PrendixLogo } from "./Logo";

const links = [
  { label: "Histórias", href: "#historia" },
  { label: "Como funciona", href: "#beneficios" },
  { label: "App", href: "#app" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[rgba(5,3,8,0.7)] border-b border-white/5"
          : "backdrop-blur-md bg-[rgba(5,3,8,0.4)]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="cursor-pointer">
          <PrendixLogo size={72} />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm text-prendix-ink/70 hover:text-prendix-ink transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-prendix-rose transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("#app")}
            className="prendix-btn-primary rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Começar grátis
          </button>
        </div>

        <button
          className="md:hidden p-2 text-prendix-ink"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-[rgba(5,3,8,0.95)] backdrop-blur-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-base text-prendix-ink/80 hover:text-prendix-rose"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#app")}
                className="prendix-btn-primary rounded-full px-5 py-3 text-sm font-semibold mt-2"
              >
                Começar grátis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}