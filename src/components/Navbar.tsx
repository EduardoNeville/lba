import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MENU_LIST = [
  { textKey: "navbar.b2", path: "/buy" },
  { textKey: "navbar.b3", path: "/sell" },
  { textKey: "navbar.b4", path: "/invest" },
  { textKey: "navbar.b5", path: "/about" },
  { textKey: "navbar.b6", path: "/contact" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [navbar, setNavbar] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(t('lang'));
  const [langToggle, setToggle] = useState(false);

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white bg-opacity-90 shadow">
      <div className="justify-between px-8 md:w-[55rem] md:mx-auto lg:max-w-7xl md:items-center md:flex md:px-16 md:mx-16">
        {/* Logo & Toggle Button */}
        <div className="flex items-center justify-between w-full md:w-auto md:mr-5">
          <Link to="/" className="flex items-center">
            {/* Logo for larger screens */}
            <img
              alt="LBA_Logo"
              className="hidden md:block w-full max-w-[10rem] h-auto"
              src="icons/LBA_Logo.jpg"
            />
            {/* Text Logo for smaller screens */}
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
          <ul className="flex flex-col md:flex-row justify-left items-left space-y-4 mx-3 md:space-y-0 md:space-x-8 py-4 md:py-0">
            {MENU_LIST.map((menu) => (
              <li
                key={menu.textKey}
                className="text-sm md:text-base font-medium text-primary hover:text-secondary"
              >
                <Link to={menu.path}>{t(menu.textKey)}</Link>
              </li>
            ))}
          </ul>

          {/* Language Toggle */}
          <div className="flex items-left justify-left space-x-4 ">
            <div className="relative">
              <button
                className="flex items-center px-3 py-2"
                onClick={() => setToggle((prevState) => !prevState)}
              >
                <img
                  src={`/flags/${selectedLanguage}.png`}
                  alt={`${selectedLanguage} flag`}
                  className="w-icon"
                />
              </button>

              {langToggle && (
                <div className="absolute bg-white border rounded-md shadow-lg">
                  <div className="flex flex-col">
                    <button
                      className="flex items-center px-3 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setToggle((prevState) => !prevState)
                        changeLanguage("en")
                      }}
                    >
                      <img
                        src="/flags/en.png"
                        alt="English"
                        className="w-icon"
                      />
                    </button>
                    <button
                      className="flex items-center px-3 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setToggle((prevState) => !prevState)
                        changeLanguage("fr")}
                      }
                    >
                      <img
                        src="/flags/fr.png"
                        alt="French"
                        className="w-icon"
                      />
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
