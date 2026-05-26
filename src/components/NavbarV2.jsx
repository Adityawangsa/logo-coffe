export default function Navbar() {
  return (
    <header className="fixed top-0 z-40 w-full px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/80 px-6 py-4 backdrop-blur-xl shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        {/* Logo + Navigation */}
        <div className="flex items-center gap-10">
          <img src="/WebLogo.png" alt="Web Logo" className="h-9 w-auto" />

          <ul className="hidden lg:flex items-center gap-8">
            {["Menu", "Promo & Acara", "Kontak"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}

            <li>
              <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                Lainnya
              </button>
            </li>
          </ul>
        </div>

        {/* CTA */} 
        <div className="hidden lg:flex items-center gap-3">
          <button className="rounded-full bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Masuk
          </button>

          <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            Daftar
          </button>
        </div>

        {/* Mobile Button */}
        <button className="lg:hidden">
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 rounded-full bg-zinc-900 dark:bg-white"></span>
            <span className="block h-0.5 w-6 rounded-full bg-zinc-900 dark:bg-white"></span>
          </div>
        </button>
      </nav>
    </header>
  );
}
