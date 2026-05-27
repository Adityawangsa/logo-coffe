import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { name: "Beranda", href: "#beranda" },
  { name: "Talenta", href: "#talenta" },
  { name: "Tentang Kami", href: "#tentang-kami" },
];

const DROPDOWN_LINKS = ["Blog", "Karir", "Komunitas"];

const styles = {
  navBase:
    "mx-auto flex items-center justify-between max-w-5xl rounded-3xl border px-6 py-4 transition-all duration-300",
  navScrolled:
    "border-zinc-200/70 bg-white backdrop-blur-none shadow-sm lg:bg-white/80 lg:backdrop-blur-xl",
  navTop: "border-transparent bg-transparent",
  navLink:
    "relative inline-flex items-center py-1 text-sm md:text-base font-medium text-zinc-500 transition-all duration-300 hover:text-zinc-900 after:absolute after:left-1/2 after:-bottom-3 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-zinc-900 after:transition-all after:duration-300 hover:after:w-[140%]",
  dropdownButton:
    "flex items-center justify-between py-2 gap-1 text-sm sm:text-base md:text-base font-medium text-zinc-500 transition-all duration-300 hover:text-zinc-900",
  dropdownMenu:
    "absolute right-0 top-16 w-56 rounded-3xl border border-zinc-200/70 bg-white p-2 shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
  dropdownMenuOpen: "visible translate-y-0 opacity-100",
  dropdownMenuClosed: "invisible -translate-y-2 opacity-0",
  dropdownItem:
    "block rounded-2xl px-4 py-3 text-sm md:text-base font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900",
  desktopActionSecondary:
    "rounded-full bg-zinc-100 px-6 py-2.5 text-sm md:text-base font-semibold cursor-pointer text-zinc-700 transition-all duration-300 hover:bg-zinc-200",
  desktopActionPrimary:
    "rounded-full bg-zinc-900 px-6 py-2.5 text-sm md:text-base font-semibold text-white cursor-pointer shadow-lg shadow-black/5 transition-all duration-300 hover:bg-zinc-700 active:scale-[0.98]",
  mobileButtonLine:
    "absolute h-0.5 w-6 rounded-full bg-zinc-900 transition-all duration-300",
  mobileOverlay:
    "fixed inset-0 z-40 px-4 pt-26 bg-zinc-900/20 dark:bg-white/20 backdrop-blur-sm transition-all duration-300 lg:hidden",
  mobilePanel:
    "mx-auto max-w-md sm:max-w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-black/10 transition-all duration-300",
  mobileNavLink:
    "flex items-center justify-between py-5 text-lg font-semibold text-zinc-700",
  mobileDropdownButton:
    "flex items-center justify-between w-full py-5 text-lg font-semibold text-zinc-700 transition-all duration-300 hover:text-zinc-900",
  mobileDropdownMenu:
    "right-0 top-16 w-56 bg-white p-2 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
  mobileDropdownItem:
    "group flex items-center justify-between rounded-lg active:bg-zinc-200/70 w-full px-4 py-4 text-base font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900",
  mobileActionSecondary:
    "w-full rounded-2xl border border-zinc-300 py-4 text-lg font-semibold text-zinc-700 active:bg-zinc-200/70 transition-all duration-300",
  mobileActionPrimary:
    "w-full rounded-2xl bg-zinc-900 py-4 text-lg font-semibold text-white active:bg-zinc-700 transition-all duration-300",
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => clearTimeout(dropdownTimeoutRef.current);
  }, []);

  const handleDropdownMouseEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 100);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={cn(
            styles.navBase,
            scrolled ? styles.navScrolled : styles.navTop
          )}
        >
          <div className="flex items-center gap-14">
            <Logo />
            <DesktopNavigation
              dropdownOpen={dropdownOpen}
              onDropdownMouseEnter={handleDropdownMouseEnter}
              onDropdownMouseLeave={handleDropdownMouseLeave}
            />
          </div>

          <DesktopActions />
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          />
        </nav>
      </header>

      <MobileOverlay
        isOpen={mobileMenuOpen}
        dropdownOpen={mobileDropdownOpen}
        onDropdownClick={() => setMobileDropdownOpen((isOpen) => !isOpen)}
      />
    </>
  );
}

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

function DesktopNavigation({
  dropdownOpen,
  onDropdownMouseEnter,
  onDropdownMouseLeave,
}) {
  return (
    <ul className="hidden items-center gap-10 lg:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.name}>
          <a href={link.href} className={styles.navLink}>
            {link.name}
          </a>
        </li>
      ))}

      <li
        className="relative"
        onMouseEnter={onDropdownMouseEnter}
        onMouseLeave={onDropdownMouseLeave}
      >
        <DropdownTrigger isOpen={dropdownOpen} iconSize={16} />
        <DesktopDropdown isOpen={dropdownOpen} />
      </li>
    </ul>
  );
}

function DropdownTrigger({ isOpen, iconSize, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.dropdownButton, className)}
    >
      Lainnya
      <ChevronDown
        size={iconSize}
        className={cn(
          "transition-transform duration-300",
          iconSize === 16 && "mt-0.5",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

function DesktopDropdown({ isOpen }) {
  return (
    <div
      className={cn(
        styles.dropdownMenu,
        isOpen ? styles.dropdownMenuOpen : styles.dropdownMenuClosed
      )}
    >
      {DROPDOWN_LINKS.map((item) => (
        <a key={item} href="#" className={styles.dropdownItem}>
          {item}
        </a>
      ))}
    </div>
  );
}

function DesktopActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <button type="button" className={styles.desktopActionSecondary}>
        Masuk
      </button>
      <button type="button" className={styles.desktopActionPrimary}>
        Daftar
      </button>
    </div>
  );
}

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center lg:hidden"
    >
      <span
        className={cn(
          styles.mobileButtonLine,
          isOpen ? "rotate-45" : "-translate-y-2"
        )}
      />
      <span
        className={cn(
          styles.mobileButtonLine,
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          styles.mobileButtonLine,
          isOpen ? "-rotate-45" : "translate-y-2"
        )}
      />
    </button>
  );
}

function MobileOverlay({ isOpen, dropdownOpen, onDropdownClick }) {
  return (
    <div
      className={cn(
        styles.mobileOverlay,
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <div
        className={cn(
          styles.mobilePanel,
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        )}
      >
        <MobileNavigation
          dropdownOpen={dropdownOpen}
          onDropdownClick={onDropdownClick}
        />
        <MobileActions />
      </div>
    </div>
  );
}

function MobileNavigation({ dropdownOpen, onDropdownClick }) {
  return (
    <ul className="flex flex-col">
      {NAV_LINKS.map((link) => (
        <li key={link.name} className="border-b border-zinc-200">
          <a href={link.href} className={styles.mobileNavLink}>
            {link.name}
          </a>
        </li>
      ))}

      <li>
        <DropdownTrigger
          isOpen={dropdownOpen}
          iconSize={18}
          onClick={onDropdownClick}
          className={styles.mobileDropdownButton}
        />
        {dropdownOpen && <MobileDropdown />}
      </li>
    </ul>
  );
}

function MobileDropdown() {
  return (
    <div className={styles.mobileDropdownMenu}>
      <div className="overflow-hidden">
        <div className="flex flex-col gap-2 w-full">
          {DROPDOWN_LINKS.map((item) => (
            <a key={item} href="#" className={styles.mobileDropdownItem}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileActions() {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <button type="button" className={styles.mobileActionSecondary}>
        Daftar
      </button>
      <button type="button" className={styles.mobileActionPrimary}>
        Masuk
      </button>
    </div>
  );
}
