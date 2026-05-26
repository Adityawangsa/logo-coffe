export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50">
      <nav className="bg-light dark:bg-dark shadow-md max-w-lg lg:max-w-6xl mx-4 rounded-lg md:mx-auto flex items-center justify-between mt-4 py-3 px-5">
        {/* div 1 - Logo and Navigation */}
        <div className="flex items-center space-x-7">
          <img src="/WebLogo.png" alt="Web Logo" className="h-10" />
          <ul className="hidden lg:flex items-center space-x-7 font-medium">
            <li>
              <a href="#menu" className="font-inter text-sm md:text-base">
                Menu
              </a>
            </li>
            <li>
              <a href="#promo" className="font-inter text-sm md:text-base">
                Promo & Acara
              </a>
            </li>
            <li>
              <a href="#kontak" className="font-inter text-sm md:text-base">
                Kontak
              </a>
            </li>
            <li>
              <button className="flex items-center gap-2 font-inter text-sm md:text-base">
                Lainnya <i class="fa-solid fa-angle-down"></i>
              </button>
            </li>
          </ul>
        </div>
        {/* div 2 - Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="#"
            className="px-5 py-2 font-medium bg-[#f2f2f2] font-inter text-sm md:text-base rounded-full"
          >
            Masuk
          </a>
          <a
            href="#"
            className="text-white px-5 py-2 font-medium bg-[#3E2C23] font-inter text-sm md:text-base rounded-full"
          >
            Daftar
          </a>
        </div>
        {/* div 3 - Mobile */}
        <div className="lg:hidden flex items-center">
          <button className="p-2">
            <span className="block w-6 h-[0.2rem] bg-dark dark:bg-light mb-1"></span>
            <span className="block w-6 h-[0.2rem] bg-dark dark:bg-light mb-1"></span>
            <span className="block w-6 h-[0.2rem] bg-dark dark:bg-light"></span>
          </button>
        </div>
      </nav>
      {/* div 4 - Mobile Menu */}
      {/* div untuk menu mobile bisa ditambahkan di sini, misalnya dengan kondisi state untuk toggle visibility */}
      <div className="flex lg:hidden mt-3 px-4 text-dark font-medium">
        {/* Warna div */}
        <div className="w-full flex flex-col px-6 pb-6 pt-4 bg-light rounded-lg shadow-md items-center justify-center">
          <ul className="w-full">
            <li className="w-full py-4 px-2 border-b border-gray-500">
              <a
                href="#menu"
                className="font-inter font-semibold text-sm md:text-base w-full"
              >
                Menu
              </a>
            </li>
            <li className="w-full py-4 px-2 border-b border-gray-500">
              <a
                href="#promo"
                className="font-inter font-semibold text-sm md:text-base w-full"
              >
                Promo & Acara
              </a>
            </li>
            <li className="w-full py-4 px-2 border-b border-gray-500">
              <a
                href="#kontak"
                className="font-inter font-semibold text-sm md:text-base w-full"
              >
                Kontak
              </a>
            </li>
            <li className="w-full py-4 px-2 border-b border-gray-500">
              <button className="flex items-center justify-between mb-2 font-inter font-semibold text-sm md:text-base w-full">
                Lainnya <i class="fa-solid fa-angle-down"></i>
              </button>
              {/* Pengbungkus button untuk memastikan seluruh area bisa diklik, termasuk ikon dropdown */}
              <div className="w-full font-normal text-sm md:text-base">
                <a href="#" className="block w-full p-2">
                  Sub Menu 1
                </a>
                <a href="#" className="block w-full p-2 ">
                  Sub Menu 2
                </a>
                <a href="#" className="block w-full p-2">
                  Sub Menu 3
                </a>
              </div>
            </li>
          </ul>
          {/* Auth Buttons */}
          <div className="w-full flex flex-col mt-6 items-center space-y-2">
            <a
              href="#"
              className="w-full text-center px-5 py-2 font-medium bg-[#f2f2f2] font-inter text-sm md:text-base rounded-full"
            >
              Masuk
            </a>
            <a
              href="#"
              className="w-full text-white text-center px-5 py-2 font-medium bg-[#3E2C23] font-inter text-sm md:text-base rounded-full"
            >
              Daftar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
