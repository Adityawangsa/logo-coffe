import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Data link utama dipisah dari component agar render lebih mudah dibaca.
// Jika nanti ingin menambah menu, cukup ubah array ini tanpa menyentuh JSX utama.
const NAV_LINKS = [
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

// Data dropdown desktop dan mobile dibuat satu sumber agar isi menunya konsisten.
const DROPDOWN_LINKS = ["Blog", "Karir", "Komunitas"];

export default function Navbar() {
  // Menentukan apakah navbar sudah melewati titik scroll tertentu.
  const [scrolled, setScrolled] = useState(false);

  // Mengatur panel menu mobile terbuka atau tertutup.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mengatur dropdown "Lainnya" pada desktop.
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mengatur dropdown "Lainnya" pada mobile.
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Menyimpan id timeout agar delay tutup dropdown desktop bisa dibatalkan saat mouse masuk lagi.
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar diberi style solid setelah user scroll lebih dari 20px.
      setScrolled(window.scrollY > 20);
    };

    // Listener ini baru bekerja saat user melakukan scroll, sesuai alur kode awal.
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Saat menu mobile terbuka, body dikunci supaya halaman belakang tidak ikut scroll.
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      // Cleanup ini memastikan style body kembali normal ketika Navbar unmount.
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      // Mencegah timeout yang masih tertunda berjalan setelah component dilepas.
      clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((isOpen) => !isOpen);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((isOpen) => !isOpen);
  };

  const handleDropdownMouseEnter = () => {
    // Jika mouse masuk lagi sebelum timeout selesai, dropdown tetap terbuka.
    clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    // Delay singkat membuat dropdown tidak langsung hilang saat pointer bergerak sedikit.
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  };

  return (
    <>
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
          <div className="flex items-center gap-14">
            {/* Logo selalu mengarah ke root website. */}
            <a href="/" className="flex items-center">
              <img
                src="/WebLogo.png"
                alt="Web Logo"
                className="h-11 w-auto object-contain"
              />
            </a>

            {/* Navigasi desktop hanya muncul pada breakpoint lg ke atas. */}
            <ul className="hidden items-center gap-10 lg:flex">
              {NAV_LINKS.map((link) => (
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

              <li
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                {/* Button ini membuka dropdown desktop lewat event hover pada parent li. */}
                <button
                  type="button"
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

                {/* Dropdown tetap dirender agar transisi opacity dan translate berjalan halus. */}
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
                  {DROPDOWN_LINKS.map((item) => (
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

          {/* Action desktop disembunyikan pada mobile agar layout header tetap ringkas. */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
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

            <button
              type="button"
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

          {/* Tombol hamburger hanya muncul pada mobile dan berubah menjadi ikon X saat aktif. */}
          <button
            type="button"
            onClick={toggleMobileMenu}
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

      {/* Overlay mobile tetap ada di DOM agar animasi masuk dan keluar bisa memakai class Tailwind. */}
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
            {NAV_LINKS.map((link) => (
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
              {/* Dropdown mobile memakai click karena tidak ada interaksi hover di layar sentuh. */}
              <button
                type="button"
                onClick={toggleMobileDropdown}
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

              {/* Dropdown mobile hanya dirender saat terbuka, sama seperti kode awal. */}
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
                  {/* Wrapper ini menjaga isi dropdown tetap rapi jika animasi tinggi ditambahkan. */}
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 w-full">
                      {DROPDOWN_LINKS.map((item) => (
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
              type="button"
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
              type="button"
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