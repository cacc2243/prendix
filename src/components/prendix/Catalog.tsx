import { useEffect, useMemo, useState } from "react";
import {
  Play, Star, Plus, Menu, Lock, X, Home, Compass, Flame, Bookmark, User,
  ChevronRight, Heart, Search, Settings, Bell, CreditCard, LogOut, Crown,
  Sparkles, MessageCircle, ShieldCheck, Check, TrendingUp, Eye, Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerOverlay, DrawerPortal } from "@/components/ui/drawer";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Send } from "lucide-react";
import { SERIES, CATEGORIES, FEATURED_ID, type Series, type Category } from "./seriesData";
import prendixLogo from "@/assets/prendix-logo.webp";
import heroBg from "@/assets/hero-naked-gun.webp";
import heroRotate1 from "@/assets/hero-rotate-1.webp";
import heroRotate2 from "@/assets/hero-rotate-2.webp";
import heroRotate3 from "@/assets/hero-rotate-3.webp";

const HERO_BACKGROUNDS = [heroBg, heroRotate1, heroRotate2, heroRotate3];

type Filter = Category | "Todas";
const TABS: Filter[] = ["Todas", "+18", "Proibido", "Romance", "Drama", "Desejo", "Crime", "Hospital", "Vingança", "Reviravolta", "Suspense", "Comédia", "Mistério"];

type NavId = "home" | "explore" | "trend" | "saved" | "me";
const NAV_ITEMS: { id: NavId; label: string; icon: typeof Home }[] = [
  { id: "explore", label: "Explorar",  icon: Compass },
  { id: "trend",   label: "Em alta",   icon: Flame },
  { id: "home",    label: "Início",    icon: Home },
  { id: "saved",   label: "Salvos",    icon: Bookmark },
  { id: "me",      label: "Eu",        icon: User },
];

// Deterministic pseudo-random "k avaliações" count per series
function reviewsCount(s: Series): string {
  let hash = 0;
  for (let i = 0; i < s.id.length; i++) hash = (hash * 31 + s.id.charCodeAt(i)) >>> 0;
  const n = 800 + (hash % 14200);
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".", ",")}k` : String(n);
}

function CoverImage({
  src, alt, className = "", fit = "cover", loading = "lazy", objectPosition,
}: { src: string; alt: string; className?: string; fit?: "cover" | "contain"; loading?: "lazy" | "eager"; objectPosition?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 prendix-skeleton" />
      )}
      <img
        src={src}
        alt=""
        aria-hidden
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover scale-110 blur-xl transition-opacity duration-500 ${loaded ? "opacity-45" : "opacity-0"}`}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={objectPosition ? { objectPosition } : undefined}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${fit === "contain" ? "object-contain p-1" : objectPosition ? "object-cover" : "object-cover object-center"} ${className}`}
      />
    </>
  );
}

/* ============ Premium skeleton primitives ============ */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`prendix-skeleton rounded-xl ${className}`} />;
}

function SkeletonPosterCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/5 ${className}`}>
      <div className="prendix-skeleton absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-3 space-y-2 z-[2]">
        <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
        <div className="h-2 w-1/2 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function SkeletonRow({ count = 6, w = "w-32", h = "h-44" }: { count?: number; w?: string; h?: string }) {
  return (
    <div className="flex gap-3 overflow-hidden px-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonPosterCard key={i} className={`${w} ${h} shrink-0`} />
      ))}
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="pt-20 pb-10 space-y-8">
      {/* Hero */}
      <div className="px-5">
        <div className="relative h-[460px] rounded-[28px] overflow-hidden border border-white/10">
          <div className="prendix-skeleton absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 space-y-3 z-[2]">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="h-6 w-2/3 rounded-full bg-white/15" />
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
            <div className="flex gap-2 pt-3">
              <div className="h-11 w-32 rounded-full bg-white/15" />
              <div className="h-11 w-11 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 px-5 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full prendix-skeleton shrink-0" />
        ))}
      </div>
      {/* Section title + row */}
      {[0, 1, 2].map((s) => (
        <div key={s} className="space-y-3">
          <div className="px-5 flex items-center justify-between">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-3 w-12 rounded-full bg-white/10" />
          </div>
          <SkeletonRow count={6} />
        </div>
      ))}
    </div>
  );
}

function GridSkeleton({ title = true }: { title?: boolean }) {
  return (
    <div className="pt-20 pb-10 space-y-6 px-5">
      {title && (
        <>
          <div className="h-6 w-44 rounded-full bg-white/10" />
          <div className="h-3 w-64 rounded-full bg-white/10" />
        </>
      )}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full prendix-skeleton shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonPosterCard key={i} className="h-56" />
        ))}
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="pt-20 pb-10 space-y-4 px-5">
      <div className="h-6 w-40 rounded-full bg-white/10" />
      <div className="h-3 w-56 rounded-full bg-white/10" />
      <div className="space-y-3 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center rounded-2xl border border-white/5 p-2">
            <div className="prendix-skeleton w-16 h-20 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded-full bg-white/10" />
              <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
              <div className="h-2 w-1/3 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeSkeleton() {
  return (
    <div className="pt-20 pb-10 space-y-5 px-5">
      <div className="relative h-44 rounded-3xl overflow-hidden border border-white/10">
        <div className="prendix-skeleton absolute inset-0" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl prendix-skeleton" />
        ))}
      </div>
      <div className="h-24 rounded-3xl prendix-skeleton" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded-2xl prendix-skeleton" />
        ))}
      </div>
    </div>
  );
}

function useBoot(delay = 700) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

function BottomNav({ active, onChange }: { active: NavId; onChange: (id: NavId) => void }) {
  const idx = Math.max(0, NAV_ITEMS.findIndex((i) => i.id === active));
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 px-3 pb-3 pt-6 pointer-events-none">
      {/* fade behind nav so content doesn't clip into it */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-prendix-bg via-prendix-bg/80 to-transparent -z-10" />
      <nav
        className="pointer-events-auto relative mx-auto w-full max-w-sm rounded-[28px] border border-white/10 px-2 py-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,12,28,0.9), rgba(10,5,16,0.95))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Animated active pill */}
        <motion.div
          aria-hidden
          className="absolute top-2 bottom-2 rounded-2xl"
          style={{
            width: `calc((100% - 1rem) / ${NAV_ITEMS.length})`,
            background:
              "linear-gradient(135deg, rgba(255,58,120,0.95), rgba(179,15,59,0.95))",
            boxShadow:
              "0 10px 30px -8px rgba(255,58,120,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
          initial={false}
          animate={{ left: `calc(0.5rem + ${idx} * ((100% - 1rem) / ${NAV_ITEMS.length}))` }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
        {/* glow under pill */}
        <motion.div
          aria-hidden
          className="absolute -bottom-3 h-6 rounded-full blur-2xl opacity-70"
          style={{
            width: `calc((100% - 1rem) / ${NAV_ITEMS.length})`,
            background:
              "radial-gradient(closest-side, rgba(255,58,120,0.9), transparent 70%)",
          }}
          initial={false}
          animate={{ left: `calc(0.5rem + ${idx} * ((100% - 1rem) / ${NAV_ITEMS.length}))` }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />

        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${NAV_ITEMS.length}, minmax(0,1fr))` }}>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const a = id === active;
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                aria-label={label}
                aria-current={a ? "page" : undefined}
                className="relative h-12 grid place-items-center rounded-2xl"
              >
                <div className="flex flex-col items-center justify-center gap-0.5 leading-none">
                  <Icon
                    className={`size-[20px] transition-colors ${a ? "text-white" : "text-white/55"}`}
                    strokeWidth={a ? 2.4 : 1.9}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-wide transition-all mt-0.5 ${
                      a ? "text-white opacity-100" : "text-white/55 opacity-100"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [active, setActive] = useState<Series | null>(null);
  const [paywall, setPaywall] = useState<Series | null>(null);
  const [tab, setTab] = useState<NavId>("home");
  const [bootedTabs, setBootedTabs] = useState<Set<NavId>>(new Set());
  const tabReady = bootedTabs.has(tab);

  useEffect(() => {
    if (bootedTabs.has(tab)) return;
    const t = setTimeout(() => {
      setBootedTabs((prev) => {
        const next = new Set(prev);
        next.add(tab);
        return next;
      });
    }, 750);
    return () => clearTimeout(t);
  }, [tab, bootedTabs]);

  const featured = SERIES.find((s) => s.id === FEATURED_ID)!;

  const popular = useMemo(
    () => [...SERIES].filter(s => filter === "Todas" || s.category === filter).sort((a, b) => b.rating - a.rating),
    [filter]
  );
  const newest = useMemo(() => [...SERIES].slice().reverse(), []);
  const adult = useMemo(() => SERIES.filter((s) => s.category === "+18"), []);

  const byCategory = useMemo(() => {
    const map = new Map<string, Series[]>();
    for (const s of SERIES) {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    }
    return map;
  }, []);

  const topRated = useMemo(
    () => [...SERIES].sort((a, b) => b.rating - a.rating).slice(0, 10),
    []
  );
  const trending = useMemo(
    () => [...SERIES].sort((a, b) => (b.year - a.year) || (b.rating - a.rating)).slice(0, 12),
    []
  );

  // Floating posters for the hero collage
  const heroPosters = useMemo(
    () => [SERIES[3], SERIES[0], SERIES[6], SERIES[4], SERIES[8]],
    []
  );

  return (
    <div className="relative mx-auto w-full max-w-md min-h-screen bg-prendix-bg text-prendix-ink pb-24 overflow-hidden">
      {/* Fixed top bar */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40">
        <div className="relative">
          {/* transparent header — no backdrop */}
          <div className="relative flex items-center justify-between px-5 pt-4 pb-3">
            <button
              aria-label="Menu"
              className="size-9 grid place-items-center rounded-lg text-white/85 hover:bg-white/5"
            >
              <Menu className="size-5" strokeWidth={2.5} />
            </button>
            <img
              src={prendixLogo}
              alt="Prendix"
              className="h-8 w-auto select-none drop-shadow-[0_2px_10px_rgba(255,58,120,0.45)]"
              draggable={false}
            />
            <button
              onClick={() => setPaywall(featured)}
              aria-label="Assinar"
              className="size-9 grid place-items-center rounded-full bg-prendix-rose/15 border border-prendix-rose/30 text-prendix-rose"
            >
              <Lock className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${tab}-${tabReady ? "ready" : "skeleton"}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {!tabReady && tab === "home" && <HomeSkeleton />}
          {!tabReady && tab === "explore" && <GridSkeleton />}
          {!tabReady && tab === "trend" && <GridSkeleton />}
          {!tabReady && tab === "saved" && <ListSkeleton />}
          {!tabReady && tab === "me" && <MeSkeleton />}

          {tabReady && tab === "home" && (
            <HomeView
              featured={featured}
              heroPosters={heroPosters}
              filter={filter}
              setFilter={setFilter}
              popular={popular}
              newest={newest}
              adult={adult}
              byCategory={byCategory}
              topRated={topRated}
              trending={trending}
              onPick={setActive}
              onSubscribe={() => setPaywall(featured)}
            />
          )}
          {tabReady && tab === "explore" && (
            <ExploreView filter={filter} setFilter={setFilter} onPick={setActive} />
          )}
          {tabReady && tab === "trend" && <TrendView onPick={setActive} />}
          {tabReady && tab === "saved" && <SavedView onExplore={() => setTab("explore")} />}
          {tabReady && tab === "me" && <MeView onSubscribe={() => setPaywall(featured)} />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={tab} onChange={setTab} />

      <DetailModal
        series={active}
        onClose={() => setActive(null)}
        onPlay={(s) => { setActive(null); setTimeout(() => setPaywall(s), 150); }}
      />
      <PaywallModal series={paywall} onClose={() => setPaywall(null)} />
    </div>
  );
}

function HomeView({
  featured, heroPosters, filter, setFilter, popular, newest, adult,
  byCategory, topRated, trending, onPick, onSubscribe,
}: {
  featured: Series;
  heroPosters: Series[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  popular: Series[];
  newest: Series[];
  adult: Series[];
  byCategory: Map<string, Series[]>;
  topRated: Series[];
  trending: Series[];
  onPick: (s: Series) => void;
  onSubscribe: () => void;
}) {
  const catRows: { title: string; key: string }[] = [
    { title: "Romance que aquece o peito", key: "Romance" },
    { title: "Amores proibidos", key: "Proibido" },
    { title: "Vingança que arde", key: "Vingança" },
    { title: "Drama de tirar o fôlego", key: "Drama" },
    { title: "Desejo proibido", key: "Desejo" },
    { title: "Crimes da madrugada", key: "Crime" },
    { title: "Plantão do coração", key: "Hospital" },
    { title: "Mistérios sem resposta", key: "Mistério" },
    { title: "Suspense até o último capítulo", key: "Suspense" },
    { title: "Reviravoltas inesperadas", key: "Reviravolta" },
    { title: "Comédia pra relaxar", key: "Comédia" },
  ];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setBgIndex((i) => (i + 1) % HERO_BACKGROUNDS.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {/* HERO — about the app */}
      <section className="relative isolate pt-16 pb-10 overflow-hidden">
        {/* Background story */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <AnimatePresence>
            <motion.img
              key={bgIndex}
              src={HERO_BACKGROUNDS[bgIndex]}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-prendix-bg/40 to-prendix-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-prendix-bg/30 via-transparent to-prendix-bg/30" />
        </div>

        {/* Spacer to let the cover breathe */}
        <div className="h-[260px]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="px-5"
        >
          <img
            src={prendixLogo}
            alt="Prendix"
            className="h-20 w-auto mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-prendix-rose/20 border border-prendix-rose/40 text-prendix-rose font-semibold">
              +18 · SUSPENSE
            </span>
            <span className="text-[10px] text-white/70 inline-flex items-center gap-1">
              <Star className="size-3 fill-prendix-gold text-prendix-gold" /> 4.9 · 12.4k avaliações
            </span>
          </div>
          <h1 className="font-display text-[34px] leading-[0.95] font-black tracking-tight">
            Histórias que te <span className="prendix-gold-text">prendem</span><br />
            do começo ao <span className="italic">fim</span>.
          </h1>
          <p className="mt-3 text-[14px] text-white/75 leading-relaxed max-w-sm">
            Mais de <span className="text-white font-semibold">1.200 séries e novelas</span> brasileiras de romance, vingança, mistério e desejo — direto no seu bolso.
          </p>

          {/* Social proof bar */}
          <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/45 backdrop-blur-md pl-2 pr-4 py-1.5">
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/64?img=47",
                "https://i.pravatar.cc/64?img=32",
                "https://i.pravatar.cc/64?img=15",
                "https://i.pravatar.cc/64?img=68",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="size-7 rounded-full border-2 border-prendix-bg object-cover"
                />
              ))}
              <span className="size-7 rounded-full border-2 border-prendix-bg bg-prendix-rose text-white text-[10px] font-bold grid place-items-center">
                +2k
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-[12px] text-white font-semibold flex items-center gap-1">
                <Star className="size-3 fill-prendix-gold text-prendix-gold" />
                <span>+2.000 leitoras</span>
              </div>
              <div className="text-[10px] text-white/60">já estão viciadas esta semana</div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={onSubscribe}
              className="prendix-btn-primary rounded-full px-8 py-4 text-base font-bold inline-flex items-center gap-2.5 shadow-[0_15px_40px_-10px_rgba(255,58,120,0.6)]"
            >
              <Play className="size-5 fill-white" /> Começar a ler
            </button>
          </div>
          <p className="mt-3 text-[11px] text-white/50">
            Sem anúncios · novos capítulos toda semana
          </p>
        </motion.div>
      </section>

      {/* Category tabs */}
      <div id="catalogo" className="mt-2 flex gap-2 overflow-x-auto no-scrollbar px-5">
        {TABS.map((t) => {
          const isActive = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition ${
                isActive
                  ? "bg-prendix-rose text-white border-prendix-rose"
                  : "bg-white/5 text-white/70 border-white/10"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* +18 QUENTE — card especial */}
      {adult.length >= 3 && (
        <SpicyHotCard
          items={adult}
          onTapAll={() => {
            setFilter("+18");
            onSubscribe();
          }}
          onPick={onPick}
        />
      )}

      {(() => {
        const usedFirst = new Set<string>();
        const rotateAvoid = (arr: Series[]): Series[] => {
          if (arr.length <= 1) return arr;
          const out = [...arr];
          for (let i = 0; i < out.length && usedFirst.has(out[0].id); i++) {
            out.push(out.shift()!);
          }
          usedFirst.add(out[0].id);
          return out;
        };
        const rows: { title: string; items: Series[] }[] = [
          { title: "Em alta", items: rotateAvoid(popular) },
          { title: "Novos episódios", items: rotateAvoid(newest) },
          ...(adult.length > 0 ? [{ title: "Só para maiores · +18", items: rotateAvoid(adult) }] : []),
          { title: "Mais bem avaliadas", items: rotateAvoid(topRated) },
          { title: "Bombando esta semana", items: rotateAvoid(trending) },
          ...catRows
            .map((r) => ({ title: r.title, items: byCategory.get(r.key) ?? [] }))
            .filter((r) => r.items.length >= 2)
            .map((r) => ({ title: r.title, items: rotateAvoid(r.items) })),
          { title: "Continue explorando", items: rotateAvoid([...SERIES].sort(() => 0.5 - Math.random()).slice(0, 12)) },
        ];
        return rows.map((r) => (
          <Row key={r.title} title={r.title} items={r.items} onPick={onPick} />
        ));
      })()}
    </>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="pt-20 pb-4 px-5">
      {eyebrow && (
        <span className="block text-[10px] uppercase tracking-[0.3em] text-prendix-gold/90">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display text-[26px] leading-tight font-bold mt-1">{title}</h1>
      {subtitle && <p className="mt-2 text-[13px] text-prendix-mute leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function SpicyHotCard({
  items, onTapAll, onPick,
}: { items: Series[]; onTapAll: () => void; onPick: (s: Series) => void }) {
  const collage = useMemo(() => items.slice(0, 5), [items]);
  const featured = collage[0];
  const thumbs = collage.slice(1, 5);
  if (!featured) return null;
  return (
    <section className="mt-6 px-5">
      <div
        className="relative rounded-3xl overflow-hidden border border-prendix-rose/40 shadow-[0_25px_60px_-30px_rgba(255,58,120,0.7)]"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(255,58,120,0.45), transparent 60%), radial-gradient(120% 80% at 100% 100%, rgba(140,0,40,0.55), transparent 55%), linear-gradient(135deg,#1a0610,#0a0307)",
        }}
      >
        {/* glow flame */}
        <div className="pointer-events-none absolute -top-12 -right-12 size-44 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle,#ff3a78,transparent 70%)" }} />

        <div className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-prendix-rose text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 shadow-lg">
              <Flame className="size-3" /> +18 Quente
            </div>
            <span className="text-[10px] text-white/60">{items.length} séries</span>
          </div>

          <h3 className="mt-3 font-display text-[22px] leading-tight font-black">
            Histórias <span className="prendix-gold-text">proibidas</span> esta noite
          </h3>
          <p className="text-[12px] text-white/70 mt-1.5 leading-snug max-w-xs">
            Romances ardentes, segredos sussurrados e encontros que ninguém pode saber.
          </p>

          {/* Collage */}
          <div className="mt-4 grid grid-cols-5 gap-1.5">
            <button
              onClick={() => onPick(featured)}
              className="col-span-3 row-span-2 relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 active:scale-[0.98] transition"
            >
              <CoverImage src={featured.cover} alt={featured.title} fit="contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-prendix-rose/90 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                <Flame className="size-2.5" /> Hot
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <div className="text-[9px] uppercase tracking-widest text-white/70">{featured.category}</div>
                <div className="font-display text-[13px] font-bold leading-tight line-clamp-2">{featured.title}</div>
              </div>
            </button>
            <div className="col-span-2 grid grid-cols-2 gap-1.5">
              {thumbs.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onPick(s)}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10 active:scale-[0.96] transition"
                >
                  <CoverImage src={s.cover} alt={s.title} fit="contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-1 left-1 right-1 text-[9px] font-bold leading-tight line-clamp-2 text-white/95">
                    {s.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onTapAll}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-prendix-bg font-bold text-sm py-3 active:scale-[0.99] transition shadow-xl"
          >
            <Flame className="size-4 text-prendix-rose" />
            Explorar todas as +18
            <ChevronRight className="size-4" />
          </button>
          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-prendix-rose/25 bg-prendix-rose/[0.06] px-3 py-2.5">
            <ShieldCheck className="size-4 text-prendix-rose mt-0.5 shrink-0" />
            <p className="text-[11px] leading-snug text-white/70">
              <span className="font-semibold text-white/90">Aviso +18:</span>{" "}
              estas histórias podem conter cenas explícitas, linguagem sensual,
              nudez sugerida e temas adultos. Conteúdo recomendado apenas para
              maiores de 18 anos — acesse por sua conta e risco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExploreView({
  filter, setFilter, onPick,
}: { filter: Filter; setFilter: (f: Filter) => void; onPick: (s: Series) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relev" | "rating" | "novos">("relev");
  const list = useMemo(() => {
    const filtered = SERIES.filter((s) => {
      const okCat = filter === "Todas" || s.category === filter;
      const q = query.trim().toLowerCase();
      const okQ = !q || s.title.toLowerCase().includes(q) || s.hook.toLowerCase().includes(q);
      return okCat && okQ;
    });
    if (sort === "rating") return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === "novos") return [...filtered].slice().reverse();
    return filtered;
  }, [filter, query, sort]);

  const hotPicks = useMemo(() => [...SERIES].sort((a, b) => b.rating - a.rating).slice(0, 6), []);
  const sugestoes = ["chefe", "vingança", "proibido", "casamento", "mafioso", "hospital"];

  const moods: { label: string; emoji: string; cat: Filter; from: string; to: string }[] = [
    { label: "Sem dormir hoje",    emoji: "🔥", cat: "+18",         from: "#ff3a78", to: "#7a0e2a" },
    { label: "Coração na mão",     emoji: "💔", cat: "Drama",       from: "#9b3dff", to: "#3a0d6b" },
    { label: "Quem matou?",        emoji: "🔪", cat: "Crime",       from: "#1f2937", to: "#0b0b10" },
    { label: "Reviravolta brutal", emoji: "🌀", cat: "Reviravolta", from: "#0ea5a4", to: "#082f49" },
    { label: "Amor proibido",      emoji: "🚫", cat: "Proibido",    from: "#e11d48", to: "#3b0764" },
    { label: "Pra rir um pouco",   emoji: "😂", cat: "Comédia",     from: "#f59e0b", to: "#7c2d12" },
  ];

  const totalCat = (cat: Filter) => cat === "Todas" ? SERIES.length : SERIES.filter(s => s.category === cat).length;

  return (
    <>
      <SectionHeader
        eyebrow="Catálogo completo"
        title="Explorar"
        subtitle={`${SERIES.length} séries · ${TABS.length - 1} categorias para você devorar.`}
      />

      {/* Busca premium */}
      <div className="px-5">
        <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] px-3.5 py-3 shadow-[0_10px_30px_-20px_rgba(255,58,120,0.6)] focus-within:border-prendix-rose/60 transition">
          <Search className="size-4 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, vibe ou personagem..."
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-white/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="size-5 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Limpar busca"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
        {!query && (
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase tracking-widest text-white/40 shrink-0 mr-1">Trending</span>
            {sugestoes.map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-white/75 hover:bg-white/10"
              >
                <TrendingUp className="size-2.5 text-prendix-rose" /> {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Coleções por humor */}
      {!query && filter === "Todas" && (
        <div className="mt-6">
          <div className="px-5 flex items-end justify-between mb-2">
            <h3 className="font-display text-[15px] font-bold">Por humor</h3>
            <span className="text-[10px] text-white/40">deslize ›</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 pb-1">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setFilter(m.cat)}
                className="shrink-0 w-[150px] h-[90px] rounded-2xl border border-white/10 p-3 text-left flex flex-col justify-between active:scale-[0.97] transition relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
              >
                <span className="text-2xl leading-none">{m.emoji}</span>
                <div>
                  <div className="font-display text-[13px] font-bold leading-tight">{m.label}</div>
                  <div className="text-[10px] text-white/70 mt-0.5">{totalCat(m.cat)} séries</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categorias */}
      <div className="mt-6 px-5 flex items-end justify-between mb-2">
        <h3 className="font-display text-[15px] font-bold">Categorias</h3>
        {filter !== "Todas" && (
          <button
            onClick={() => setFilter("Todas")}
            className="text-[11px] text-prendix-rose font-semibold inline-flex items-center gap-1"
          >
            <X className="size-3" /> Limpar
          </button>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5">
        {TABS.map((t) => {
          const a = filter === t;
          const count = totalCat(t);
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                a
                  ? "bg-gradient-to-r from-prendix-rose to-[#b30f3b] text-white border-prendix-rose shadow-[0_8px_20px_-8px_rgba(255,58,120,0.7)]"
                  : "bg-white/5 text-white/75 border-white/10 hover:bg-white/10"
              }`}
            >
              {t}
              <span className={`text-[10px] ${a ? "text-white/80" : "text-white/40"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Resultado + ordenação */}
      <div className="px-5 mt-5 flex items-center justify-between">
        <div className="text-[12px] text-white/65">
          <span className="font-semibold text-white">{list.length}</span> {list.length === 1 ? "série" : "séries"}
          {filter !== "Todas" && <span className="text-white/40"> em {filter}</span>}
          {query && <span className="text-white/40"> · "{query}"</span>}
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px]">
          {([
            { id: "relev",  label: "Top" },
            { id: "rating", label: "★" },
            { id: "novos",  label: "Novos" },
          ] as const).map((o) => (
            <button
              key={o.id}
              onClick={() => setSort(o.id)}
              className={`px-2.5 py-1 rounded-full font-semibold transition ${
                sort === o.id ? "bg-white text-prendix-bg" : "text-white/60"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid principal */}
      <div className="mt-3 px-5 grid grid-cols-2 gap-3">
        {list.map((s, i) => (
          <ExploreCard key={s.id} series={s} onPick={onPick} hot={hotPicks.includes(s)} novo={i < 2 && sort === "novos"} />
        ))}
        {list.length === 0 && (
          <div className="col-span-2 text-center py-16 px-4">
            <div className="mx-auto size-14 rounded-2xl grid place-items-center bg-white/5 border border-white/10 mb-3">
              <Search className="size-6 text-white/40" />
            </div>
            <div className="font-display text-base font-bold">Nada por aqui</div>
            <p className="text-[12px] text-prendix-mute mt-1">Tente outra palavra ou limpe os filtros.</p>
            <button
              onClick={() => { setQuery(""); setFilter("Todas"); }}
              className="mt-4 inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold bg-prendix-rose text-white"
            >
              <X className="size-3" /> Limpar tudo
            </button>
          </div>
        )}
      </div>

      {list.length > 0 && (
        <div className="px-5 mt-6 mb-2 text-center text-[11px] text-white/40">
          Você chegou ao fim · {list.length} {list.length === 1 ? "resultado" : "resultados"}
        </div>
      )}
    </>
  );
}

function ExploreCard({
  series, onPick, hot, novo,
}: { series: Series; onPick: (s: Series) => void; hot?: boolean; novo?: boolean }) {
  return (
    <button
      onClick={() => onPick(series)}
      className="group relative text-left active:scale-[0.97] transition-transform"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.95)]">
        <CoverImage src={series.cover} alt={series.title} fit="contain" className="transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hot && (
            <span className="inline-flex items-center gap-1 rounded-md bg-prendix-rose px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
              <Flame className="size-2.5" /> Hot
            </span>
          )}
          {novo && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
              Novo
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2 py-0.5 text-[10px] text-white">
          <Star className="size-2.5 fill-prendix-gold text-prendix-gold" /> {series.rating}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <div className="inline-block rounded-md bg-white/10 backdrop-blur-sm border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-white/85">
            {series.category}
          </div>
          <h3 className="font-display text-[13.5px] font-bold leading-tight mt-1 line-clamp-2">{series.title}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/65">
            <Clock className="size-2.5" />
            <span>{series.episodes} caps</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function GridCard({ series, onPick }: { series: Series; onPick: (s: Series) => void }) {
  return (
    <button
      onClick={() => onPick(series)}
      className="group relative text-left active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.9)]">
        <CoverImage src={series.cover} alt={series.title} fit="contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[10px] text-white">
          <Star className="size-2.5 fill-prendix-gold text-prendix-gold" /> {series.rating}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="text-[9px] uppercase tracking-[0.15em] text-white/65">{series.category}</div>
          <h3 className="font-display text-[14px] font-bold leading-tight mt-0.5 line-clamp-2">{series.title}</h3>
        </div>
      </div>
    </button>
  );
}

function TrendView({ onPick }: { onPick: (s: Series) => void }) {
  const top = useMemo(() => [...SERIES].sort((a, b) => b.rating - a.rating).slice(0, 10), []);
  const hero = top[0];
  const rest = top.slice(1);
  // pseudo-random but stable view counts
  const views = (id: string, base: number) => {
    let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    const v = base + (h % 850);
    return v > 1000 ? `${(v / 1000).toFixed(1)}M` : `${v}K`;
  };
  const trendDelta = (id: string, i: number) => {
    let h = 0; for (let i2 = 0; i2 < id.length; i2++) h = (h * 17 + id.charCodeAt(i2)) >>> 0;
    if (i === 0) return { dir: "up" as const, n: 0, label: "Em primeiro" };
    const r = h % 5;
    if (r === 0) return { dir: "same" as const, n: 0, label: "=" };
    if (r < 3) return { dir: "up" as const, n: (h % 4) + 1, label: `+${(h % 4) + 1}` };
    return { dir: "down" as const, n: (h % 3) + 1, label: `-${(h % 3) + 1}` };
  };
  return (
    <>
      <SectionHeader
        eyebrow="Top 10 da semana"
        title="Em alta agora"
        subtitle="As séries mais assistidas no Prendix nos últimos 7 dias."
      />

      {/* Faixa de status estilo bolsa */}
      <div className="px-5 -mt-2 mb-4 flex items-center gap-2 text-[11px] text-white/65">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-prendix-rose/15 border border-prendix-rose/30 px-2.5 py-1 text-prendix-rose font-semibold">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-prendix-rose animate-ping opacity-75" />
            <span className="relative rounded-full size-1.5 bg-prendix-rose" />
          </span>
          AO VIVO
        </span>
        <span>Atualizado agora · 7 dias</span>
      </div>

      {/* HERO #1 */}
      {hero && (
        <div className="px-5">
          <button
            onClick={() => onPick(hero)}
            className="relative w-full text-left rounded-3xl overflow-hidden border border-white/10 active:scale-[0.99] transition group"
          >
            <div className="relative aspect-[16/10]">
              <CoverImage src={hero.cover} alt={hero.title} fit="cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
              {/* Número 1 gigante */}
              <div
                className="absolute -left-2 bottom-2 font-display font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: 180,
                  WebkitTextStroke: "2px rgba(255,255,255,0.85)",
                  color: "transparent",
                  textShadow: "0 8px 30px rgba(255,58,120,0.35)",
                }}
              >
                1
              </div>
              {/* Badge #1 */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-lg"
                style={{ background: "linear-gradient(135deg,#ff3a78,#b30f3b)" }}>
                <Crown className="size-3.5 text-prendix-gold" /> Nº 1 da semana
              </div>
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] text-white">
                <Star className="size-3 fill-prendix-gold text-prendix-gold" /> {hero.rating}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 pl-24">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">{hero.category}</div>
                <h3 className="font-display text-xl font-black leading-tight mt-1 line-clamp-2">{hero.title}</h3>
                <p className="text-[12px] text-white/75 mt-1 line-clamp-2">{hero.hook}</p>
                <div className="mt-2.5 flex items-center gap-3 text-[11px] text-white/80">
                  <span className="inline-flex items-center gap-1"><Eye className="size-3" /> {views(hero.id, 1200)}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {hero.episodes} caps</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400"><TrendingUp className="size-3" /> +{42}%</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Lista 2 a 10 */}
      <div className="px-5 mt-5 space-y-2.5">
        {rest.map((s, idx) => {
          const i = idx + 1; // posição real (1..9 -> #2..#10)
          const rank = i + 1;
          const t = trendDelta(s.id, rank - 1);
          return (
            <button
              key={s.id}
              onClick={() => onPick(s)}
              className="relative w-full flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-2.5 pr-3 active:scale-[0.99] transition overflow-hidden"
            >
              {/* Número outline gigante */}
              <span
                className="font-display font-black leading-none select-none pointer-events-none w-[70px] text-center shrink-0"
                style={{
                  fontSize: 76,
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.55)",
                  color: "transparent",
                }}
              >
                {rank}
              </span>
              <div className="relative h-[88px] w-[66px] shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <CoverImage src={s.cover} alt={s.title} fit="contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-1 right-1 inline-flex items-center gap-0.5 rounded-md bg-black/70 backdrop-blur-sm px-1 py-0.5 text-[9px] text-white">
                  <Star className="size-2 fill-prendix-gold text-prendix-gold" /> {s.rating}
                </div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-[14px] font-bold truncate">{s.title}</h3>
                </div>
                <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">{s.hook}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/60">
                  <span className="inline-flex items-center gap-1"><Eye className="size-2.5" /> {views(s.id, 120)}</span>
                  <span className="text-white/25">·</span>
                  <span>{s.category}</span>
                  <span className="text-white/25">·</span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-semibold ${
                      t.dir === "up" ? "text-emerald-400" : t.dir === "down" ? "text-rose-400" : "text-white/40"
                    }`}
                  >
                    {t.dir === "up" && <TrendingUp className="size-2.5" />}
                    {t.dir === "down" && <TrendingUp className="size-2.5 rotate-180" />}
                    {t.label}
                  </span>
                </div>
              </div>
              <div className="size-9 shrink-0 grid place-items-center rounded-full bg-white/10 border border-white/15">
                <Play className="size-3.5 fill-white text-white ml-0.5" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-6 mb-2 text-center text-[11px] text-white/40">
        Ranking baseado em leituras, salvamentos e avaliações.
      </div>
    </>
  );
}

function SavedView({ onExplore }: { onExplore: () => void }) {
  return (
    <>
      <SectionHeader eyebrow="Sua lista" title="Salvos" subtitle="Suas séries favoritas aparecem aqui para assistir depois." />
      <div className="px-5 mt-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <div className="mx-auto size-16 rounded-2xl grid place-items-center bg-prendix-rose/15 border border-prendix-rose/30">
            <Bookmark className="size-7 text-prendix-rose" />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold">Nada salvo ainda</h3>
          <p className="mt-1 text-sm text-prendix-mute">Toque no coração de uma série para guardá-la aqui.</p>
          <button
            onClick={onExplore}
            className="prendix-btn-primary mt-5 rounded-full px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <Compass className="size-4" /> Explorar séries
          </button>
        </div>
      </div>
    </>
  );
}

function MeView({ onSubscribe }: { onSubscribe: () => void }) {
  const stats = [
    { value: "—", label: "Séries lidas", icon: Bookmark, color: "text-prendix-rose" },
    { value: "—", label: "Capítulos",    icon: Play,     color: "text-prendix-gold" },
    { value: "—", label: "Tempo total",  icon: Clock,    color: "text-emerald-400" },
    { value: "—", label: "Sequência",    icon: Flame,    color: "text-orange-400" },
  ];

  const achievements = [
    { emoji: "🔥", label: "Maratonista",  unlocked: false },
    { emoji: "💔", label: "Coração mole", unlocked: false },
    { emoji: "🌙", label: "Coruja",       unlocked: false },
    { emoji: "👑", label: "Realeza",      unlocked: false },
    { emoji: "🎭", label: "Dramaturga",   unlocked: false },
  ];

  const account = [
    { icon: User,     label: "Editar perfil",      hint: "" },
    { icon: Bell,     label: "Notificações",       hint: "Ativadas" },
    { icon: Heart,    label: "Preferências de leitura", hint: "" },
    { icon: Lock,     label: "Privacidade",        hint: "" },
  ];
  const support = [
    { icon: MessageCircle, label: "Central de ajuda",   hint: "" },
    { icon: ShieldCheck,   label: "Termos e políticas", hint: "" },
    { icon: Star,          label: "Avaliar o Prendix",  hint: "" },
  ];
  const session = [
    { icon: LogOut, label: "Sair", hint: "", danger: true },
  ];

  const xp = 0, xpMax = 500;
  const xpPct = 0;

  return (
    <>
      {/* HERO PERFIL */}
      <div className="px-5 pt-2">
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          {/* banner */}
          <div
            className="relative h-28"
            style={{
              background:
                "radial-gradient(120% 100% at 0% 0%, rgba(255,58,120,0.55), transparent 60%), radial-gradient(120% 100% at 100% 0%, rgba(212,175,55,0.35), transparent 55%), linear-gradient(135deg, #1a0a14, #0a0a10)",
            }}
          >
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
            />
            <button className="absolute top-3 right-3 size-8 rounded-full grid place-items-center bg-black/40 backdrop-blur-md border border-white/15 text-white/85">
              <Settings className="size-4" />
            </button>
          </div>
          {/* corpo */}
          <div className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 pt-0">
            <div className="-mt-10 flex items-end gap-3">
              <div className="relative">
                <div className="size-20 rounded-3xl grid place-items-center bg-gradient-to-br from-prendix-rose to-[#7a0e2a] text-white border-4 border-prendix-bg shadow-xl">
                  <User className="size-9" />
                </div>
                <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-0.5 rounded-full bg-white/20 text-white/70 text-[9px] font-black px-1.5 py-0.5 border-2 border-prendix-bg">
                  Lv 1
                </span>
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display text-lg font-black truncate">Convidado</h2>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-white/10 border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/70">
                    Free
                  </span>
                </div>
                <p className="text-[11px] text-prendix-mute truncate">Faça login para salvar seu progresso</p>
              </div>
              <button className="rounded-full bg-white text-prendix-bg text-[11px] font-bold px-3.5 py-1.5 shadow">
                Entrar
              </button>
            </div>

            {/* XP */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] text-white/55 mb-1">
                <span className="inline-flex items-center gap-1"><Sparkles className="size-3 text-prendix-gold" /> XP de leitora</span>
                <span>{xp}/{xpMax}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${xpPct}%`, background: "linear-gradient(90deg,#ff3a78,#d4af37)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="px-5 mt-4 grid grid-cols-4 gap-2">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-center">
              <Icon className={`size-3.5 mx-auto ${s.color}`} />
              <div className="font-display text-[18px] font-black mt-1 leading-none">{s.value}</div>
              <div className="text-[9px] text-white/55 mt-1 leading-tight">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* PREMIUM CTA */}
      <div className="px-5 mt-5">
        <button
          onClick={onSubscribe}
          className="relative w-full rounded-3xl overflow-hidden p-5 text-left border border-prendix-gold/40 active:scale-[0.99] transition shadow-[0_20px_50px_-25px_rgba(212,175,55,0.5)]"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(255,58,120,0.18) 60%, rgba(0,0,0,0.4))" }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #d4af37, transparent 70%)" }}
          />
          <div className="flex items-start gap-3 relative">
            <div className="size-11 rounded-2xl grid place-items-center bg-prendix-gold/25 border border-prendix-gold/50 shadow-inner">
              <Crown className="size-5 text-prendix-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-black">Vire Premium</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-prendix-gold bg-prendix-gold/15 border border-prendix-gold/40 rounded-md px-1.5 py-0.5">
                  -50%
                </span>
              </div>
              <p className="text-[12px] text-white/75 mt-1 leading-snug">
                Capítulos ilimitados, sem anúncios, estreias antecipadas e modo offline.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-white/50 line-through">R$ 15,90</div>
                  <div className="font-display text-lg font-black">R$ 11,90<span className="text-[11px] font-normal text-white/60">/mês</span></div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-prendix-gold text-prendix-bg text-[11px] font-bold px-3 py-1.5">
                  Assinar <ChevronRight className="size-3" />
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* CONQUISTAS */}
      <div className="mt-6 px-5 flex items-end justify-between mb-2">
        <h3 className="font-display text-[15px] font-bold">Conquistas</h3>
        <span className="text-[11px] text-white/45">3 de 5</span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5">
        {achievements.map((a) => (
          <div
            key={a.label}
            className={`shrink-0 w-[78px] rounded-2xl border p-2.5 text-center ${
              a.unlocked
                ? "border-prendix-gold/40 bg-prendix-gold/10"
                : "border-white/10 bg-white/[0.03] opacity-50 grayscale"
            }`}
          >
            <div className="text-2xl">{a.emoji}</div>
            <div className="text-[10px] mt-1 leading-tight">{a.label}</div>
            {!a.unlocked && (
              <div className="text-[8px] uppercase tracking-wider text-white/40 mt-0.5 inline-flex items-center gap-0.5 justify-center">
                <Lock className="size-2" /> Bloq
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CONTA */}
      <div className="mt-6 px-5">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 px-1">Conta</div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 overflow-hidden">
          {account.map(({ icon: Icon, label, hint }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-white/5">
              <div className="size-8 rounded-xl grid place-items-center bg-white/5 border border-white/10">
                <Icon className="size-4 text-white/75" />
              </div>
              <span className="flex-1 text-sm font-medium">{label}</span>
              {hint && <span className="text-[11px] text-prendix-mute">{hint}</span>}
              <ChevronRight className="size-4 text-white/30" />
            </button>
          ))}
        </div>
      </div>

      {/* SUPORTE */}
      <div className="mt-5 px-5">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 px-1">Suporte</div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 overflow-hidden">
          {support.map(({ icon: Icon, label, hint }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-white/5">
              <div className="size-8 rounded-xl grid place-items-center bg-white/5 border border-white/10">
                <Icon className="size-4 text-white/75" />
              </div>
              <span className="flex-1 text-sm font-medium">{label}</span>
              {hint && <span className="text-[11px] text-prendix-mute">{hint}</span>}
              <ChevronRight className="size-4 text-white/30" />
            </button>
          ))}
        </div>
      </div>

      {/* SESSÃO */}
      <div className="mt-5 px-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {session.map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-white/5 text-rose-400">
              <div className="size-8 rounded-xl grid place-items-center bg-rose-500/10 border border-rose-500/25">
                <Icon className="size-4" />
              </div>
              <span className="flex-1 text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 mb-3 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-white/45">
          <span className="font-display font-black tracking-wide">PRENDIX</span>
          <span className="text-white/25">·</span>
          <span>v1.0.0</span>
        </div>
        <div className="text-[10px] text-white/30 mt-1">Feito com 💔 para você não dormir cedo.</div>
      </div>
    </>
  );
}

function Row({
  title, items, onPick,
}: { title: string; items: Series[]; onPick: (s: Series) => void }) {
  return (
    <section className="mt-7">
      <div className="px-5 flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        <button className="text-[11px] text-prendix-mute inline-flex items-center gap-0.5">
          Ver tudo <ChevronRight className="size-3" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {items.map((s) => (
          <PosterCard key={s.id} series={s} onPick={onPick} />
        ))}
      </div>
    </section>
  );
}

function PosterCard({ series, onPick }: { series: Series; onPick: (s: Series) => void }) {
  const w = "w-[230px]";
  return (
    <button
      onClick={() => onPick(series)}
      className={`group shrink-0 ${w} relative text-left transition-transform duration-300 active:scale-[0.98]`}
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.9)]">
        <CoverImage src={series.cover} alt={series.title} fit="contain" className="transition-transform duration-700 group-hover:scale-[1.03]" />
        {/* dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {/* subtle inner ring */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />

        {/* category chip */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white/90">
          {series.category}
        </div>

        {/* rating chip */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-2 py-1 text-[11px] text-white">
          <Star className="size-3 fill-prendix-gold text-prendix-gold" />
          {series.rating}
        </div>

        {/* bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-[18px] font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {series.title}
          </h3>
          <p className="mt-1 text-[11px] text-white/70 line-clamp-2 leading-snug">
            {series.hook}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] tracking-wider text-white/70 inline-flex items-center gap-1">
              <Star className="size-3 fill-prendix-gold text-prendix-gold" />
              <span className="font-semibold">{series.rating}</span>
              <span className="text-white/50">· {reviewsCount(series)} aval.</span>
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onPick(series); }}
              aria-label="Tocar"
              className="size-9 grid place-items-center rounded-full bg-prendix-rose text-white shadow-[0_8px_22px_-6px_rgba(255,58,120,0.9)] active:scale-95 transition"
            >
              <Play className="size-4 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

function DetailModal({
  series, onClose, onPlay,
}: { series: Series | null; onClose: () => void; onPlay: (s: Series) => void }) {
  const [expanded, setExpanded] = useState(true);
  // pick a couple of "cast" stand-ins from other series covers
  const cast = useMemo(() => {
    if (!series) return [];
    return SERIES.filter((s) => s.id !== series.id).slice(0, 6);
  }, [series]);

  return (
    <Drawer open={!!series} onOpenChange={(o) => !o && onClose()} shouldScaleBackground>
      <DrawerPortal>
        <DrawerOverlay className="bg-black/70 backdrop-blur-sm" />
        <DrawerContent
          className="bg-transparent border-0 p-0 h-[95vh] max-h-[95vh] mx-auto max-w-md focus:outline-none flex flex-col"
        >
          {series && (
            <div className="relative w-full h-full bg-[#0a0510] rounded-t-[28px] overflow-hidden border-t border-white/10 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.9)] flex flex-col">
              {/* Cover */}
              <div className="relative w-full shrink-0 h-[38vh]">
                <CoverImage src={series.cover} alt={series.title} fit="cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] via-[#0a0510]/30 to-transparent" />
                {/* drag handle */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-white/30" />
                {/* close */}
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="absolute top-4 right-4 size-9 grid place-items-center rounded-full bg-black/60 border border-white/10"
                >
                  <X className="size-4" />
                </button>
                {/* Big play button */}
                <button
                  onClick={() => onPlay(series)}
                  aria-label="Tocar"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 grid place-items-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 active:scale-95 transition"
                >
                  <Play className="size-7 fill-white text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 pt-5 pb-7 flex-1 overflow-y-auto no-scrollbar">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold inline-flex items-center gap-2">
                    {series.title}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/15 text-white/90 align-middle">16+</span>
                  </h3>
                  <p className="mt-1 text-sm text-prendix-mute italic">{series.hook}</p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/85">
                      {series.category}
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/85">
                      16+
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white inline-flex items-center gap-1">
                      <Star className="size-3 fill-prendix-gold text-prendix-gold" /> {series.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Compartilhar" className="size-9 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white/80">
                      <Send className="size-4" />
                    </button>
                    <button aria-label="Favoritar" className="size-9 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white/80">
                      <Heart className="size-4" />
                    </button>
                  </div>
                </div>

                <section className="mt-6">
                  <h4 className="font-display font-semibold text-base mb-2">Sinopse</h4>
                  <p className={`text-[15px] text-white/85 leading-relaxed whitespace-pre-line ${expanded ? "" : "line-clamp-4"}`}>
                    {series.synopsis}
                  </p>
                  {series.synopsis && series.synopsis.length > 220 && (
                    <button
                      onClick={() => setExpanded((v) => !v)}
                      className="mt-2 text-xs text-prendix-rose font-semibold"
                    >
                      {expanded ? "Mostrar menos" : "Ler mais"}
                    </button>
                  )}
                </section>

                <section className="mt-6">
                  <h4 className="font-display font-semibold text-base mb-3">Elenco</h4>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
                    {cast.map((c) => (
                      <div key={c.id} className="shrink-0 w-[88px]">
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                          <CoverImage src={c.cover} alt="" fit="contain" />
                        </div>
                        <div className="mt-1.5 text-[11px] text-white/85 truncate">{c.title.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <button
                  onClick={() => onPlay(series)}
                  className="prendix-btn-primary mt-6 w-full rounded-full py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  <Play className="size-4 fill-white" /> Assistir capítulo 1
                </button>
              </div>
            </div>
          )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

function PaywallModal({ series, onClose }: { series: Series | null; onClose: () => void }) {
  const plans = [
    { id: "mensal", label: "Mensal", price: "R$ 15,90", per: "/mês", note: "Sem fidelidade" },
    { id: "anual", label: "Anual", price: "R$ 11,90", per: "/mês", note: "Economize 25%", best: true },
  ] as const;
  const [chosen, setChosen] = useState<string>("anual");
  const [showUpsell, setShowUpsell] = useState(false);

  const basePrice = chosen === "anual" ? 11.90 : 15.90;
  const upsellPrice = (basePrice + 6.99).toFixed(2).replace(".", ",");
  const basePriceFormatted = basePrice.toFixed(2).replace(".", ",");

  return (
    <DialogPrimitive.Root open={!!series} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <DialogPrimitive.Title className="sr-only">Prendix Premium</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Assine para desbloquear todas as séries
          </DialogPrimitive.Description>
          {series && (
            <div
              className="relative w-full sm:max-w-md sm:my-6 sm:rounded-3xl bg-[#0a0510] overflow-hidden sm:border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] flex flex-col h-[100dvh] sm:h-auto sm:max-h-[92vh]"
              style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Top bar */}
              <div className="relative shrink-0 pt-3 pb-2 px-4 flex items-center justify-end bg-[#0a0510] z-20">
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="size-9 grid place-items-center rounded-full bg-white/10 border border-white/15 active:scale-95 transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Cover header */}
              <div className="relative w-full shrink-0 h-[200px] sm:h-[220px]">
                <CoverImage
                  src={series.cover}
                  alt=""
                  fit="cover"
                  loading="eager"
                  objectPosition="center 18%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] via-[#0a0510]/55 to-transparent" />
                <div className="absolute left-5 bottom-3 right-5">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-prendix-gold font-semibold">
                    <Crown className="size-3" /> Prendix Premium
                  </span>
                  <h4 className="font-display text-[26px] leading-tight font-black mt-1">
                    Desbloqueie <span className="prendix-gold-text">todas as séries</span>
                  </h4>
                  <p className="mt-1.5 text-[12px] text-white/75 leading-snug">
                    Uma única assinatura libera <span className="text-white font-semibold">{series.title}</span> e todo o catálogo Prendix. Sem pagar por episódio.
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 pt-5 pb-8 flex-1 overflow-y-auto no-scrollbar">
                {/* Highlight banner */}
                <div className="rounded-2xl border border-prendix-gold/40 bg-gradient-to-r from-prendix-gold/15 to-prendix-rose/10 px-4 py-3 flex items-center gap-3">
                  <div className="size-10 grid place-items-center rounded-xl bg-prendix-gold/25 border border-prendix-gold/40 shrink-0">
                    <Crown className="size-5 text-prendix-gold" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13px] font-bold text-white">Tudo liberado com 1 assinatura</div>
                    <div className="text-[11px] text-white/70">+1.200 séries completas, sem pagar nada por episódio.</div>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="mt-4 space-y-2.5">
                  {[
                    { icon: Check, t: "Catálogo 100% liberado", s: "Assista qualquer série, qualquer episódio, sem cobrança extra." },
                    { icon: Sparkles, t: "Capítulos novos todo dia", s: "Histórias inéditas adicionadas direto na sua assinatura." },
                    { icon: ShieldCheck, t: "Sem anúncios, sem pegadinhas", s: "Cancele quando quiser. Nada de pagar por episódio." },
                    { icon: MessageCircle, t: "Comunidade direto no app", s: "Discuta cada reviravolta com outras leitoras." },
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5">
                      <div className="size-8 rounded-lg bg-white/8 grid place-items-center shrink-0">
                        <b.icon className="size-4 text-prendix-gold" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-[13px] font-semibold text-white">{b.t}</div>
                        <div className="text-[11px] text-white/60">{b.s}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Plans */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold">
                      Escolha seu plano
                    </div>
                    <div className="text-[10px] text-white/45">Toque para selecionar</div>
                  </div>
                  <div role="radiogroup" aria-label="Planos" className="space-y-2.5">
                    {plans.map((p) => {
                      const a = chosen === p.id;
                      const isBest = "best" in p && p.best;
                      return (
                        <button
                          key={p.id}
                          role="radio"
                          aria-checked={a}
                          onClick={() => setChosen(p.id)}
                          className={`relative w-full rounded-2xl border-2 px-4 py-3.5 text-left flex items-center gap-3 transition-all ${
                            a
                              ? "border-prendix-rose bg-prendix-rose/10 shadow-[0_12px_36px_-14px_rgba(255,58,120,0.7)] scale-[1.01]"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
                          }`}
                        >
                          {/* Radio indicator */}
                          <div
                            className={`shrink-0 size-6 rounded-full border-2 grid place-items-center transition-colors ${
                              a ? "border-prendix-rose bg-prendix-rose" : "border-white/30 bg-transparent"
                            }`}
                          >
                            {a && <Check className="size-3.5 text-white" strokeWidth={3.5} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-bold text-white">
                                {p.label}
                              </span>
                              {isBest && (
                                <span className="text-[9px] uppercase bg-prendix-gold text-black rounded-full px-1.5 py-0.5 font-black tracking-wider">
                                  Melhor oferta
                                </span>
                              )}
                            </div>
                            {p.note && (
                              <div className="text-[11px] text-prendix-gold/90 mt-0.5 font-medium">
                                {p.note}
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-display text-[20px] font-black leading-none text-white">
                              {p.price}
                            </div>
                            <div className="text-[10px] text-white/55 mt-0.5">{p.per}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative mt-5">
                  <motion.button
                    onClick={() => setShowUpsell(true)}
                    className="prendix-btn-primary relative w-full rounded-full py-4 text-base font-bold inline-flex items-center justify-center gap-2 shadow-[0_15px_40px_-10px_rgba(255,58,120,0.7)]"
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play className="size-5 fill-white" />
                    Assinar plano {chosen === "anual" ? "Anual" : "Mensal"}
                  </motion.button>
                </div>
                <p className="text-[11px] text-white/55 mt-3 text-center">
                  Cancele quando quiser · Pagamento seguro
                </p>
              </div>

              {/* ── Upsell +18 popup ── */}
              <AnimatePresence>
                {showUpsell && (
                  <>
                    {/* backdrop */}
                    <motion.div
                      className="absolute inset-0 z-10 bg-black/75 backdrop-blur-md rounded-[inherit]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />

                    {/* card — centrado verticalmente */}
                    <motion.div
                      className="absolute inset-x-3 z-20 my-auto rounded-3xl overflow-hidden border border-prendix-rose/30 shadow-[0_0_80px_-10px_rgba(255,58,120,0.45)]"
                      style={{
                        top: "50%",
                        translateY: "-50%",
                        background: "linear-gradient(170deg,#1e0a1c 0%,#0d0510 55%,#150810 100%)",
                      }}
                      initial={{ opacity: 0, scale: 0.88, y: "-42%" }}
                      animate={{ opacity: 1, scale: 1, y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.9, y: "-42%" }}
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    >
                      {/* top glow bar */}
                      <div
                        className="h-1 w-full"
                        style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,58,120,1) 50%,transparent 100%)" }}
                      />

                      {/* ambient glow orb */}
                      <div
                        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 size-48 rounded-full blur-3xl opacity-25"
                        style={{ background: "radial-gradient(circle,#ff3a78,transparent 70%)" }}
                      />

                      <div className="relative px-6 pt-6 pb-7">

                        {/* Badge */}
                        <div className="flex justify-center mb-5">
                          <span className="inline-flex items-center gap-2 rounded-full border border-prendix-rose/60 bg-prendix-rose/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-prendix-rose">
                            🔥 Conteúdo exclusivo +18
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-[24px] font-black leading-tight text-white text-center">
                          Adicionar histórias{" "}
                          <span className="prendix-rose-text">+18 sem censura</span>{" "}
                          ao seu plano?
                        </h3>
                        <p className="mt-2.5 text-[13px] text-white/60 leading-relaxed text-center">
                          Capítulos explícitos, cenas sem corte e histórias adultas exclusivas — tudo dentro do app.
                        </p>

                        {/* Price breakdown */}
                        <div className="mt-5 rounded-2xl border border-white/10 overflow-hidden">
                          {/* row 1 */}
                          <div className="flex items-center justify-between px-4 py-3.5 bg-white/[0.03]">
                            <span className="text-[13px] text-white/65">Plano {chosen === "anual" ? "Anual" : "Mensal"}</span>
                            <span className="font-display text-[16px] font-black text-white">
                              R$ {basePriceFormatted}<span className="text-[11px] font-normal text-white/45">/mês</span>
                            </span>
                          </div>
                          {/* divider */}
                          <div className="h-px bg-white/8" />
                          {/* row 2 — highlight */}
                          <div className="flex items-center justify-between px-4 py-3.5 bg-prendix-rose/10">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-white/80 font-medium">+ Histórias +18</span>
                              <span className="text-[9px] bg-prendix-rose text-white rounded-full px-2 py-0.5 font-black tracking-wide">ADD-ON</span>
                            </div>
                            <span className="font-display text-[16px] font-black text-prendix-rose">
                              +R$ 6,99<span className="text-[11px] font-normal text-white/45">/mês</span>
                            </span>
                          </div>
                          {/* divider */}
                          <div className="h-px bg-white/8" />
                          {/* row 3 — total */}
                          <div className="flex items-center justify-between px-4 py-4 bg-white/[0.06]">
                            <span className="text-[14px] font-bold text-white">Total</span>
                            <div className="text-right">
                              <span className="font-display text-[22px] font-black text-white">
                                R$ {upsellPrice}
                              </span>
                              <span className="text-[11px] font-normal text-white/45">/mês</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA button */}
                        <div className="mt-5 relative">
                          <motion.a
                            href={chosen === "anual"
                              ? "https://go.perfectpay.com.br/PPU38CQCULP"
                              : "https://go.perfectpay.com.br/PPU38CQCULK"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="prendix-btn-primary relative w-full rounded-full py-5 text-[16px] font-black inline-flex items-center justify-center gap-2.5 shadow-[0_15px_40px_-8px_rgba(255,58,120,0.7)]"
                            whileTap={{ scale: 0.97 }}
                          >
                            🔥 Sim! Quero +18 por R$ {upsellPrice}/mês
                          </motion.a>
                        </div>

                        {/* Decline — sem +18 */}
                        <a
                          href={chosen === "anual"
                            ? "https://go.perfectpay.com.br/PPU38CQCULO"
                            : "https://go.perfectpay.com.br/PPU38CQCULJ"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 w-full py-3.5 text-[14px] font-semibold text-white border border-white/25 rounded-full text-center hover:border-white/50 hover:bg-white/5 transition-all block"
                        >
                          Não, manter plano normal por R$ {basePriceFormatted}/mês
                        </a>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
