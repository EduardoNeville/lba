import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const MENU_LIST = [
  { textKey: "navbar.b3", path: "/corporate_responsibility" },
  { textKey: "navbar.b4", path: "/about" },
  { textKey: "navbar.b5", path: "/contact" },
];

const INVEST_SECTIONS = [
  { textKey: "navbar.sections.buy.title", id: "buy-section", descriptionKey: "navbar.sections.buy.description" },
  { textKey: "navbar.sections.sell.title", id: "sell-section", descriptionKey: "navbar.sections.sell.description" },
  { textKey: "navbar.sections.invest.title", id: "invest-section", descriptionKey: "navbar.sections.invest.description" },
  { textKey: "navbar.sections.legal.title", id: "legal-aspect-section", descriptionKey: "navbar.sections.legal.description" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [navbar, setNavbar] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(t("lang"));
  const [langToggle, setToggle] = useState(false);
  const [showInvestDropdown, setShowInvestDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Tracks navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY >= 100) {
      // Scrolling down
      setNavbar(false);
      setIsVisible(false);
      setShowInvestDropdown(false);
      setToggle(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  // Adding scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed z-30 w-full bg-white font-zesta-bold transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="justify-between px-8 md:w-full md:mx-auto lg:max-w-7xl md:items-center md:flex md:px-16 md:mx-16">
        
        {/* Logo & Toggle Button */}
        <div className="flex items-center justify-between w-full md:w-auto md:mr-5">
          <Link 
            to="/" 
            className="flex items-center"
            onClick={() => {
              window.scrollTo(0, 0);
              if (showInvestDropdown) {
                setShowInvestDropdown(!showInvestDropdown);
              }
              setNavbar(!navbar);
            }}
          >
            <img
              alt="LBA_Logo"
              className="hidden md:block w-full max-w-[10rem] h-auto"
              src="icons/LBA_Logo.jpg"
            />
            <span className="block md:hidden text-lg font-bold text-primary ">
              L-B-A
            </span>
          </Link>

          <button
            className="md:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Items & Language Select */}
        <div
          className={`w-full md:flex flex-col md:flex-row items-center justify-between ${
            navbar ? "block" : "hidden"
          }`}
        >
          {/* Menu List */}
          <ul className="flex flex-col md:flex-row justify-left items-left space-y-4 mx-3 md:space-y-0 md:space-x-8 lg:py-4 py-4">

            {/* Dropdown for Invest Sections */}
            <li className="relative text-sm md:text-base font-medium text-primary hover:text-secondary ">
              <span 
                className="cursor-pointer flex items-center justify-between uppercase" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  setShowInvestDropdown(!showInvestDropdown);
                }}
              >
                {t("navbar.b2")}
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    showInvestDropdown ? "rotate-180" : ""
                  }`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {/* Dropdown items for Invest */}
              {showInvestDropdown && (
                <ul className="pt-4 md:pb-4 w-full md:absolute md:w-max md:mt-4 md:bg-white md:shadow-md md:rounded-b-md">
                  {INVEST_SECTIONS.map((section) => (
                    <li 
                      key={section.id} 
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowInvestDropdown(!showInvestDropdown)}
                    >
                      <span className="mr-2">{">"}</span> {/* Arrow for list item */}
                      <a href={`/invest_and_plan#${section.id}`} className="block text-primary">
                        <h2 className="uppercase">
                          {t(section.textKey)}
                        </h2>
                        <p className="text-sm">
                          {t(section.descriptionKey)}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {MENU_LIST.map((menu) => (
              <li
                key={menu.textKey}
                className="text-sm md:text-base font-medium text-primary hover:text-secondary uppercase"
              >
                <Link 
                  to={menu.path}
                  onClick={() => {
                    setNavbar(!navbar);
                    window.scrollTo(0, 0);
                    if (showInvestDropdown) {
                      setShowInvestDropdown(!showInvestDropdown);
                    }
                  }}
                >
                  {t(menu.textKey)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language T */}
          <div className="flex items-left justify-left mx-3 pb-4 lg:py-4">
            <div className="relative">
              <span 
                className="cursor-pointer flex items-center justify-between" 
                onClick={() => setToggle(!langToggle)}
              >
                <span className="font-bold text-primary text-sm md:text-base">
                  {selectedLanguage.toUpperCase()}
                </span>
                <svg 
                  className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                    langToggle ? "rotate-180" : ""
                  }`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {langToggle && (
                <div className="absolute bg-white rounded-b-md md:mt-1 py-2 -mx-3">
                  <div className="flex flex-col">
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setToggle(false);
                        changeLanguage("en");
                      }}
                    >
                      <span className="text-primary">EN</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setToggle(false);
                        changeLanguage("fr");
                      }}
                    >
                      <span className="text-primary">FR</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
