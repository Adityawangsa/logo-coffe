import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Talenta", href: "#talenta" },
  { label: "Tentang Kami", href: "#tentang-kami" },
];

const moreLinks = [
  { label: "Blog", href: "#blog" },
  { label: "Karir", href: "#karir" },
  { label: "Komunitas", href: "#komunitas" },
];


const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((currentValue) => !currentValue);
    setIsMoreMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={cx(
            "mx-auto flex max-w-5xl items-center justify-between rounded-3xl border px-6 py-4 transition-all duration-300",
            isScrolled
              ? "border-zinc-200/70 bg-white shadow-sm lg:bg-white/80 lg:backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <div className="flex items-center gap-14">
            <Logo />

            <ul className="hidden items-center gap-10 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={desktopLinkClass}>
                    {link.label}
                  </a>
                </li>
              ))}

              <li
                className="relative"
                onMouseEnter={() => setIsMoreMenuOpen(true)}
                onMouseLeave={() => setIsMoreMenuOpen(false)}
              >
                <MoreButton isOpen={isMoreMenuOpen} />
                <MoreDropdown isOpen={isMoreMenuOpen} />
              </li>
            </ul>
          </div>

          <DesktopActions />

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="Buka menu navigasi"
          >
            <span
              className={cx(
                hamburgerLineClass,
                isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
              )}
            />
            <span
              className={cx(
                hamburgerLineClass,
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cx(
                hamburgerLineClass,
                isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
              )}
            />
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu
          isMoreMenuOpen={isMoreMenuOpen}
          onClose={closeMobileMenu}
          onToggleMoreMenu={() =>
            setIsMoreMenuOpen((currentValue) => !currentValue)
          }
        />
      )}
    </>
  );
}

const desktopLinkClass =
  "relative inline-flex items-center py-1 text-sm font-medium text-zinc-500 transition-all duration-300 after:absolute after:left-1/2 after:-bottom-3 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-zinc-900 after:transition-all after:duration-300 hover:text-zinc-900 hover:after:w-[140%] md:text-base";

const hamburgerLineClass =
  "absolute h-0.5 w-6 rounded-full bg-zinc-900 transition-all duration-300";

function Logo() {
  return (
    <a href="/" className="flex items-center">
      <img
        src="/WebLogo.png"
        alt="Web Logo"
        className="h-11 w-auto object-contain"
      />
    </a>
  );
}

function MoreButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between gap-1 py-5 lg:py-2 text-lg font-medium text-zinc-700 lg:text-zinc-500 transition-all duration-300 hover:text-zinc-900 sm:text-base"
    >
      Lainnya
      <ChevronDown
        size={18}
        className={cx(
          "transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

function MoreDropdown({ isOpen }) {
  return (
    <div
      className={cx(
        "absolute right-0 top-16 w-56 rounded-3xl border border-zinc-200/70 bg-white p-2 shadow-xl shadow-black/5 transition-all duration-300",
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      )}
    >
      {moreLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900 md:text-base"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function DesktopActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <button
        type="button"
        className="cursor-pointer rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:bg-zinc-200 md:text-base"
      >
        Masuk
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/5 transition-all duration-300 hover:bg-zinc-700 active:scale-[0.98] md:text-base"
      >
        Daftar
      </button>
    </div>
  );
}

function MobileMenu({ isMoreMenuOpen, onToggleMoreMenu, onClose }) {
  return (
    <div className="fixed inset-0 z-40 bg-zinc-900/20 px-4 pt-26 backdrop-blur-sm lg:hidden">
      <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-black/10 sm:max-w-full">
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.label} className="border-b border-zinc-200">
              <a
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-5 text-lg font-semibold text-zinc-700"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <MoreButton isOpen={isMoreMenuOpen} onClick={onToggleMoreMenu} />

            {isMoreMenuOpen && (
              <div className="flex w-full flex-col gap-2 bg-white p-2">
                {moreLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="rounded-lg px-4 py-4 text-base font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200/70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className="w-full rounded-2xl border border-zinc-300 py-4 text-lg font-semibold text-zinc-700 transition-all duration-300 active:bg-zinc-200/70"
          >
            Daftar
          </button>
          <button
            type="button"
            className="w-full rounded-2xl bg-zinc-900 py-4 text-lg font-semibold text-white transition-all duration-300 active:bg-zinc-700"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
