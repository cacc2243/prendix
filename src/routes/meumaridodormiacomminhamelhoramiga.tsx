import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Bookmark, Heart, Share2, Type, Sun, Moon, Star, Clock, Sparkles, Play, ChevronRight,
} from "lucide-react";
import {
  STORY_TITLE,
  STORY_SUBTITLE,
  STORY_AUTHOR,
  STORY_READ_TIME,
  STORY_CATEGORY,
  STORY_TAGS,
  STORY_HOOK,
  STORY_PARAGRAPHS,
} from "@/content/story-marido-melhor-amiga";
import coverImg from "@/assets/story-marido-melhor-amiga-cover.webp";
import inline1 from "@/assets/story-marido-inline-1.webp";
import inline2 from "@/assets/story-marido-inline-2.webp";
import inline3 from "@/assets/story-marido-inline-3.webp";
import inline4 from "@/assets/story-marido-inline-4.webp";

// Mapa de imagens inline: após o parágrafo de índice N, renderiza a imagem.
const INLINE_IMAGES: Record<number, { src: string; alt: string; caption?: string }> = {
  99: { src: inline1, alt: "Sala decorada para o aniversário de casamento", caption: "Dez anos pendurados na parede, presos por barbante e luzinhas." },
  129: { src: inline2, alt: "Laura chegando com vestido vinho", caption: "Bonita demais para uma festa simples dos outros." },
  199: { src: inline3, alt: "Pulseira de maternidade na mão de Bianca", caption: "O nome era o dela. O bebê, não." },
  386: { src: inline4, alt: "Corredor de hospital com a porta 304 entreaberta", caption: "Atrás daquela porta, a vida que ela achava ser a sua." },
};

type StoryData = {
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  hook: string;
  paragraphs: string[];
  cover: string;
};

const STORY: StoryData = {
  title: STORY_TITLE,
  subtitle: STORY_SUBTITLE,
  author: STORY_AUTHOR,
  readTime: STORY_READ_TIME,
  category: STORY_CATEGORY,
  tags: STORY_TAGS,
  hook: STORY_HOOK,
  paragraphs: STORY_PARAGRAPHS,
  cover: coverImg,
};

export const Route = createFileRoute("/meumaridodormiacomminhamelhoramiga")({
  loader: (): StoryData => STORY,
  head: () => ({
    meta: [
      { title: `${STORY.title} — Prendix` },
      { name: "description", content: STORY.hook },
      { property: "og:title", content: `${STORY.title} — Prendix` },
      { property: "og:description", content: STORY.hook },
      { property: "og:image", content: STORY.cover },
      { name: "twitter:image", content: STORY.cover },
    ],
  }),
  component: StoryPage,
});

const FONT_SIZES = [
  { id: "sm", px: 16, leading: 1.5 },
  { id: "md", px: 18, leading: 1.55 },
  { id: "lg", px: 20, leading: 1.6 },
  { id: "xl", px: 22, leading: 1.65 },
] as const;

type FontId = (typeof FONT_SIZES)[number]["id"];
type Theme = "dark" | "light";

function classifyParagraph(p: string): "dialogue" | "impact" | "normal" {
  if (p.startsWith("—") || p.startsWith("–") || p.startsWith("-")) return "dialogue";
  // Curtas e secas = batida emocional (sem pontuação final ou com "." / "!" / "?" / "…").
  const noPunct = p.replace(/[.,!?…—\-"“”]/g, "").trim();
  const wordCount = noPunct.split(/\s+/).filter(Boolean).length;
  if (wordCount > 0 && wordCount <= 5) return "impact";
  return "normal";
}

// Theme tokens — built so the "light" state is genuinely bright and readable.
const THEMES: Record<Theme, {
  page: string;
  surface: string;
  surfaceBorder: string;
  textBody: string;
  textMute: string;
  textImpact: string;
  dialogueBorder: string;
  divider: string;
  topbar: string;
  pill: string;
  pillActive: string;
  iconBtn: string;
  iconBtnActive: string;
}> = {
  dark: {
    page: "bg-[#050308] text-white",
    surface: "bg-white/[0.04]",
    surfaceBorder: "border-white/10",
    textBody: "text-white/85",
    textMute: "text-white/55",
    textImpact: "text-prendix-gold",
    dialogueBorder: "border-prendix-rose/60",
    divider: "bg-white/15",
    topbar: "bg-black/40 border-white/5",
    pill: "bg-white/5 border-white/10 text-white/70",
    pillActive: "bg-prendix-rose/20 border-prendix-rose/50 text-white",
    iconBtn: "bg-white/5 border-white/10 text-white/80",
    iconBtnActive: "bg-prendix-rose/20 border-prendix-rose/60 text-prendix-rose",
  },
  light: {
    page: "bg-[#fdf8f2] text-[#1a0d12]",
    surface: "bg-white",
    surfaceBorder: "border-[#1a0d12]/10",
    textBody: "text-[#1a0d12]",
    textMute: "text-[#1a0d12]/60",
    textImpact: "text-[#b30f3b]",
    dialogueBorder: "border-[#b30f3b]/60",
    divider: "bg-[#1a0d12]/15",
    topbar: "bg-white/85 border-[#1a0d12]/8",
    pill: "bg-[#1a0d12]/[0.04] border-[#1a0d12]/10 text-[#1a0d12]/65",
    pillActive: "bg-[#b30f3b]/10 border-[#b30f3b]/40 text-[#b30f3b]",
    iconBtn: "bg-[#1a0d12]/[0.04] border-[#1a0d12]/10 text-[#1a0d12]/75",
    iconBtnActive: "bg-[#b30f3b]/10 border-[#b30f3b]/50 text-[#b30f3b]",
  },
};

function StoryPage() {
  const story = Route.useLoaderData() as StoryData;

  const [fontId, setFontId] = useState<FontId>("md");
  const [theme, setTheme] = useState<Theme>("dark");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingHome, setLoadingHome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingHome) return;
    const id = setTimeout(() => {
      navigate({ to: "/" });
    }, 2500);
    return () => clearTimeout(id);
  }, [loadingHome, navigate]);

  const font = useMemo(
    () => FONT_SIZES.find((f) => f.id === fontId) ?? FONT_SIZES[1],
    [fontId],
  );
  const t = THEMES[theme];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pré-carrega apenas o módulo da home (sem baixar 40+ imagens em background).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const run = () => { import("@/components/prendix/seriesData").catch(() => {}); };
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else setTimeout(run, 1500);
  }, []);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (d: ShareData) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: story.title,
          text: story.hook,
          url,
        });
      } catch { /* ignored */ }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <main className={"relative min-h-screen overflow-x-clip transition-colors duration-500 " + t.page}>
      {/* Reading progress */}
      <div className="fixed top-0 inset-x-0 z-50 h-[3px] bg-black/10">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #ff3a78 0%, #f0c674 60%, #ff3a78 100%)",
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Top bar */}
      <header className={"fixed top-0 inset-x-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 " + t.topbar}>
        <div className="mx-auto max-w-2xl flex items-center gap-2 px-3 py-2.5">
          <Link
            to="/"
            preload="render"
            className={"size-10 grid place-items-center rounded-full border active:scale-95 transition " + t.iconBtn}
            aria-label="Voltar"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex-1 min-w-0 px-1">
            <p className={"text-[11px] uppercase tracking-[0.18em] truncate " + t.textMute}>
              {story.category}
            </p>
            <h2 className="text-sm font-semibold truncate">{story.title}</h2>
          </div>
          <button
            onClick={() => setTheme((v) => (v === "dark" ? "light" : "dark"))}
            className={"size-10 grid place-items-center rounded-full border active:scale-95 transition " + t.iconBtn}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button
            onClick={onShare}
            className={"size-10 grid place-items-center rounded-full border active:scale-95 transition " + t.iconBtn}
            aria-label="Compartilhar"
          >
            <Share2 className="size-5" />
          </button>
        </div>
      </header>

      {/* Hero / cover — full-bleed cinematic */}
      <section className="relative pt-14">
        <div className="relative h-[78vh] min-h-[560px] max-h-[820px] w-full overflow-hidden">
          <img
            src={story.cover}
            alt={story.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Always-dark overlay so text is legible in both themes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-[#050308]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl h-full px-5 flex flex-col justify-end pb-10">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/80">
              <Sparkles className="size-3.5 text-prendix-rose" />
              <span>Prendix Original · Capítulo 01</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-cinema text-[44px] sm:text-[60px] leading-[1.02] mt-3 prendix-gradient-text prendix-glow"
            >
              {story.title}
            </motion.h1>

            <p className="mt-2 text-white/75 text-sm">{story.subtitle}</p>

            <div className="mt-4 flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 text-prendix-gold fill-prendix-gold" /> 4,9
              </span>
              <span className="size-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {story.readTime}
              </span>
              <span className="size-1 rounded-full bg-white/30" />
              <span className="truncate">{story.author}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 bg-white/10 text-white/85 backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button className="prendix-btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm">
                <Play className="size-4 fill-current" /> Começar a ler
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                className={
                  "size-11 grid place-items-center rounded-full border backdrop-blur transition active:scale-95 " +
                  (saved
                    ? "bg-prendix-gold/25 border-prendix-gold/60 text-prendix-gold"
                    : "bg-white/10 border-white/20 text-white")
                }
                aria-label="Salvar"
              >
                <Bookmark className={"size-5 " + (saved ? "fill-current" : "")} />
              </button>
              <button
                onClick={() => setLiked((v) => !v)}
                className={
                  "size-11 grid place-items-center rounded-full border backdrop-blur transition active:scale-95 " +
                  (liked
                    ? "bg-prendix-rose/25 border-prendix-rose/60 text-prendix-rose"
                    : "bg-white/10 border-white/20 text-white")
                }
                aria-label="Curtir"
              >
                <Heart className={"size-5 " + (liked ? "fill-current" : "")} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hook + reading toolbar */}
      <section className="relative">
        <div className="mx-auto max-w-2xl px-5 -mt-6">
          <div className={"rounded-2xl border backdrop-blur-md p-5 " + t.surface + " " + t.surfaceBorder}>
            <p className={"text-[11px] uppercase tracking-[0.22em] " + t.textMute}>Sinopse</p>
            <p className={"mt-2 text-[15px] leading-relaxed italic border-l-2 pl-4 " + t.dialogueBorder + " " + t.textBody}>
              “{story.hook}”
            </p>
          </div>

          <div className={"mt-4 flex items-center justify-between gap-3 rounded-2xl border backdrop-blur-md px-3 py-2 " + t.surface + " " + t.surfaceBorder}>
            <div className="flex items-center gap-1">
              <Type className={"size-4 mr-1 " + t.textMute} />
              {FONT_SIZES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontId(f.id)}
                  className={
                    "size-8 rounded-lg grid place-items-center transition border " +
                    (f.id === fontId ? t.pillActive : t.pill + " border-transparent")
                  }
                  style={{ fontSize: f.id === "sm" ? 11 : f.id === "md" ? 13 : f.id === "lg" ? 15 : 17 }}
                  aria-label={`Tamanho ${f.id}`}
                >
                  A
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className={"text-[11px] uppercase tracking-[0.18em] " + t.textMute}>
                {theme === "dark" ? "Modo escuro" : "Modo claro"}
              </span>
              <button
                onClick={() => setTheme((v) => (v === "dark" ? "light" : "dark"))}
                className={"relative h-7 w-12 rounded-full border transition " + t.surfaceBorder + " " + (theme === "dark" ? "bg-prendix-rose/30" : "bg-prendix-gold/30")}
                aria-label="Alternar tema de leitura"
              >
                <span
                  className={
                    "absolute top-0.5 size-6 rounded-full bg-white shadow-md transition-all duration-300 grid place-items-center " +
                    (theme === "dark" ? "left-0.5" : "left-[calc(100%-1.625rem)]")
                  }
                >
                  {theme === "dark" ? <Moon className="size-3.5 text-[#1a0d12]" /> : <Sun className="size-3.5 text-[#b30f3b]" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story body */}
      <article
        className="relative mx-auto max-w-2xl px-5 pt-8 pb-40 text-left"
        style={{ fontSize: `${font.px}px`, lineHeight: font.leading }}
      >
        {story.paragraphs.flatMap((p, i) => {
          const kind = classifyParagraph(p);
          const isFirst = i === 0;
          const inline = INLINE_IMAGES[i];

          let node: ReactElement;
          if (kind === "dialogue") {
            node = (
              <p
                key={i}
                className={
                  "my-2.5 pl-4 border-l-2 italic text-left font-medium " +
                  t.dialogueBorder + " " + t.textBody
                }
              >
                {p}
              </p>
            );
          } else if (kind === "impact") {
            node = (
              <p
                key={i}
                className={
                  "my-3 text-left font-cinema tracking-wide font-semibold " + t.textImpact
                }
                style={{ fontSize: `${font.px + 1}px` }}
              >
                {p}
              </p>
            );
          } else {
            node = (
              <p
              key={i}
              className={
                "my-2.5 text-left font-medium " + t.textBody +
                (isFirst
                  ? " first-letter:font-cinema first-letter:text-[64px] first-letter:leading-[0.9] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-bold " +
                    (theme === "dark" ? "first-letter:text-prendix-rose" : "first-letter:text-[#b30f3b]")
                  : "")
              }
              >
                {p}
              </p>
            );
          }

          if (!inline) return [node];
          return [
            node,
            <motion.figure
              key={`fig-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={"my-7 -mx-2 sm:mx-0 overflow-hidden rounded-2xl border " + t.surfaceBorder}
            >
              <img
                src={inline.src}
                alt={inline.alt}
                loading="lazy"
                decoding="async"
                width={1280}
                height={832}
                className="block w-full h-auto object-cover"
              />
              {inline.caption && (
                <figcaption className={"px-4 py-3 text-[12px] italic " + t.textMute}>
                  {inline.caption}
                </figcaption>
              )}
            </motion.figure>,
          ];
        })}

      </article>

      {/* Floating "Continuar lendo" — always visible, leads to home */}
      <div className="fixed bottom-5 inset-x-0 z-40 px-5 pointer-events-none">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => setLoadingHome(true)}
            disabled={loadingHome}
            className="prendix-btn-primary pointer-events-auto flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base shadow-2xl disabled:opacity-90"
          >
            Continuar lendo <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {loadingHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0510]/95 backdrop-blur-xl"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="flex flex-col items-center gap-6 px-8 text-center">
              <div className="relative size-20">
                <span className="absolute inset-0 rounded-full border-2 border-white/10" />
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-prendix-rose border-r-prendix-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 grid place-items-center"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                >
                  <Sparkles className="size-7 text-prendix-gold" />
                </motion.div>
              </div>
              <div className="space-y-1.5">
                <p className="font-cinema tracking-[0.4em] text-[11px] text-prendix-gold">
                  PRENDIX
                </p>
                <p className="text-white/90 text-sm font-medium">
                  Preparando seu próximo capítulo…
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}