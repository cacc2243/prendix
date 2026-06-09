import { PrendixLogo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-4 mt-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <PrendixLogo />
          <p className="mt-4 font-display italic text-prendix-ink/80 max-w-md">
            Histórias rápidas, intensas e impossíveis de largar.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-4">
          <nav className="flex flex-wrap gap-6 text-sm text-prendix-mute">
            <a href="#" className="hover:text-prendix-rose transition-colors">Termos</a>
            <a href="#" className="hover:text-prendix-rose transition-colors">Privacidade</a>
            <a href="#" className="hover:text-prendix-rose transition-colors">Contato</a>
          </nav>
          <p className="text-xs text-prendix-mute/70">
            © 2026 Prendix. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}