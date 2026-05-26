import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  // =========================================================
  // STATE
  // =========================================================

  // Navbar berubah style ketika discroll
  const [scrolled, setScrolled] = useState(false);

  // Mobile menu open / close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown desktop open / close
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dropdown mobile open / close
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Ref untuk timeout dropdown
  const dropdownTimeoutRef = useRef(null);

  // =========================================================
  // EFFECT
  // =========================================================

  // Detect scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Disable scroll ketika mobile menu terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // =========================================================
  // NAVIGATION DATA
  // =========================================================

  const navLinks = [
    {
      name: "Beranda",
      href: "#beranda",
    },
    {
      name: "Talenta",
      href: "#talenta",
    },
    {
      name: "Tentang Kami",
      href: "#tentang-kami",
    },
  ];

  // =========================================================
  // DROPDOWN HANDLER
  // =========================================================

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);

    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={`
            mx-auto
            flex
            items-center
            justify-between
            max-w-5xl
            rounded-3xl
            border
            px-6
            py-4
            transition-all
            duration-300

            ${
              scrolled
                ? `
                  border-zinc-200/70
                  bg-white
                  backdrop-blur-none
                  shadow-sm
                  lg:bg-white/80
                  lg:backdrop-blur-xl

                `
                : `
                  border-transparent
                  bg-transparent
                `
            }
          `}
        >
          {/* ========================================================= */}
          {/* LEFT SIDE */}
          {/* ========================================================= */}

          <div className="flex items-center gap-14">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/WebLogo.png"
                alt="Web Logo"
                className="h-11 w-auto object-contain"
              />
            </a>

            {/* ========================================================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ========================================================= */}

            <ul className="hidden items-center gap-10 lg:flex">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="
                      relative
                      inline-flex
                      items-center
                      py-1
                      text-sm
                      md:text-base
                      font-medium
                      text-zinc-500
                      transition-all
                      duration-300

                      hover:text-zinc-900

                      after:absolute
                      after:left-1/2
                      after:-bottom-3
                      after:h-[2px]
                      after:w-0
                      after:-translate-x-1/2
                      after:rounded-full
                      after:bg-zinc-900
                      after:transition-all
                      after:duration-300

                      hover:after:w-[140%]
                    "
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              {/* ========================================================= */}
              {/* DROPDOWN */}
              {/* ========================================================= */}

              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="
                    flex
                    items-center
                    justify-between
                    py-2
                    gap-1
                    text-sm
                    sm:text-base
                    md:text-base
                    font-medium
                    text-zinc-500
                    transition-all
                    duration-300

                    hover:text-zinc-900
                  "
                >
                  Lainnya
                  <ChevronDown
                    size={16}
                    className={`
                      transition-transform
                      duration-300
                      mt-0.5

                      ${dropdownOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* ========================================================= */}
                {/* DROPDOWN MENU */}
                {/* ========================================================= */}

                <div
                  className={`
                    absolute
                    right-0
                    top-16
                    w-56
                    rounded-3xl
                    border
                    border-zinc-200/70
                    bg-white
                    p-2
                    shadow-xl
                    shadow-black/5
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${
                      dropdownOpen
                        ? `
                          visible
                          translate-y-0
                          opacity-100
                        `
                        : `
                          invisible
                          -translate-y-2
                          opacity-0
                        `
                    }
                  `}
                >
                  {["Blog", "Karir", "Komunitas"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="
                        block
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        md:text-base
                        font-medium
                        text-zinc-600
                        transition-all
                        duration-300

                        hover:bg-zinc-100
                        hover:text-zinc-900
                      "
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE */}
          {/* ========================================================= */}

          <div className="hidden items-center gap-3 lg:flex">
            {/* Login */}
            <button
              className="
                rounded-full
                bg-zinc-100
                px-6
                py-2.5
                text-sm
                md:text-base
                font-semibold
                cursor-pointer
                text-zinc-700
                transition-all
                duration-300

                hover:bg-zinc-200
              "
            >
              Masuk
            </button>

            {/* Register */}
            <button
              className="
                rounded-full
                bg-zinc-900
                px-6
                py-2.5
                text-sm
                md:text-base
                font-semibold
                text-white
                cursor-pointer
                shadow-lg
                shadow-black/5
                transition-all
                duration-300

                hover:bg-zinc-700
                active:scale-[0.98]
              "
            >
              Daftar
            </button>
          </div>

          {/* ========================================================= */}
          {/* MOBILE BUTTON */}
          {/* ========================================================= */}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              lg:hidden
            "
          >
            {/* Top */}
            <span
              className={`
                absolute
                h-0.5
                w-6
                rounded-full
                bg-zinc-900
                transition-all
                duration-300

                ${mobileMenuOpen ? "rotate-45" : "-translate-y-2"}
              `}
            />

            {/* Middle */}
            <span
              className={`
                absolute
                h-0.5
                w-6
                rounded-full
                bg-zinc-900
                transition-all
                duration-300

                ${mobileMenuOpen ? "opacity-0" : "opacity-100"}
              `}
            />

            {/* Bottom */}
            <span
              className={`
                absolute
                h-0.5
                w-6
                rounded-full
                bg-zinc-900
                transition-all
                duration-300

                ${mobileMenuOpen ? "-rotate-45" : "translate-y-2"}
              `}
            />
          </button>
        </nav>
      </header>

      {/* ========================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ========================================================= */}

      <div
        className={`
        fixed inset-0 z-40
        px-4 pt-26
        bg-zinc-900/20
        dark:bg-white/20
        backdrop-blur-sm
        transition-all duration-300
        lg:hidden

    ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
  `}
      >
        <div
          className={`
      mx-auto max-w-md sm:max-w-full
      rounded-3xl
      border border-zinc-200
      bg-white
      p-6
      shadow-2xl shadow-black/10
      transition-all duration-300

      ${
        mobileMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0"
      }
    `}
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-zinc-200">
                <a
                  href={link.href}
                  className="
              flex items-center justify-between
              py-5
              text-lg
              font-semibold
              text-zinc-700
            "
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="
                    flex
                    items-center
                    justify-between
                    w-full
                    py-5
                    text-lg
                    font-semibold
                    text-zinc-700
                    transition-all
                    duration-300

                    hover:text-zinc-900
                  "
              >
                Lainnya
                <ChevronDown
                  size={18}
                  className={`
                      transition-transform
                      duration-300

                      ${mobileDropdownOpen ? "rotate-180" : ""}
                    `}
                />
              </button>

              {/* ========================================================= */}
              {/* DROPDOWN MENU */}
              {/* ========================================================= */}

              {mobileDropdownOpen && (
                <div
                  className="
                    right-0
                    top-16
                    w-56
                    bg-white
                    p-2
                    w-full

                    transition-all
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                  "
                >
                  {/* Wrapper penting agar overflow animation smooth */}
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 w-full">
                      {["Blog", "Karir", "Komunitas"].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="
                             group
                             flex
                             items-center
                             justify-between
                              rounded-lg
                              active:bg-zinc-200/70
                              w-full
                             px-4
                              py-4
                              text-base
                             font-medium
                              text-zinc-600
                             transition-all
                             duration-300

                              hover:bg-zinc-100
                              hover:text-zinc-900
            "
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <button
              className="
          w-full rounded-2xl
          border border-zinc-300
          py-4 text-lg font-semibold
          text-zinc-700
          active:bg-zinc-200/70
          transition-all duration-300
        "
            >
              Daftar
            </button>

            <button
              className="
          w-full rounded-2xl
          bg-zinc-900
          py-4 text-lg font-semibold
          text-white
          active:bg-zinc-700
          transition-all duration-300
        "
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </>
  );
}