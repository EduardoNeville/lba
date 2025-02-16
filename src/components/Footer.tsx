import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bottom-0 bg-primary text-white py-32 font-zesta-regular">
      <div className="container mx-auto md:px-bdr px-6 text-center">
        <h2 className="text-flash font-bold">{t("callToAction.title")}</h2>
        <p className="mt-8 text-content text-white">{t("callToAction.body")}</p>

        <div className="mt-8 flex flex-col md:flex-row justify-center md:gap-16 gap-4">
          <Link
            className="border rounded border-white mt-6 px-6 py-2 w-full md:w-1/3 bg-transparent hover:bg-pink-100 hover:text-primary text-white transition text-button"
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
          >
            <button className="uppercase">
              {t("callToAction.contactUsButton")}
            </button>
          </Link>
          <Link
            className="border rounded border-white mt-6 px-6 py-2 w-full md:w-1/3 bg-transparent hover:bg-pink-100 hover:text-primary text-white transition text-button"
            to="/about"
            onClick={() => window.scrollTo(0, 0)}
          >
            <button className="uppercase">
              {t("callToAction.learnMoreButton")}
            </button>
          </Link>
        </div>

        {/* Social Links and Contact Info */}
        <div className="mt-12">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://www.linkedin.com/in/marisela-castro-abad-a87b0b295/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline w-icon"
            >
              <img src="icons/linkedin.png" />
            </a>
            <a
              href="https://x.com/legalboutiquea"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline w-icon"
            >
              <img src="icons/twitter.png" />
            </a>
            <a
              href="https://www.instagram.com/legalboutiqueadvisers/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline w-icon"
            >
              <img src="icons/instagram.png" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center justify-center items-start mt-6 text-sm gap-4 text-black text-xl">
            {/* Telephone Section */}
            <div className="flex items-center gap-4">
              <img
                src="icons/telephone.png"
                className="w-icon"
                alt="Phone Icon"
              />
              <a
                href="tel:+34 663 109 014"
                className="hover:underline text-content"
              >
                +34 663 109 014
              </a>
            </div>

            {/* Email Section */}
            <div className="flex items-center gap-4">
              <img src="icons/email.png" className="w-icon" alt="Email Icon" />
              <a
                href="mailto:info@mariselacastro.com"
                className="hover:underline text-content"
              >
                info@mariselacastro.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
