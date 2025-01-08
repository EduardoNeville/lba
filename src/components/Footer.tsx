import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bottom-0 bg-primary text-white py-12 font-zesta-regular">
      <div className="container mx-auto md:px-bdr px-6 text-center">
        <h2 className="text-3xl font-bold">
          {t("callToAction.title")}
        </h2>
        <p className="mt-4 text-white">{t("callToAction.body")}</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-white hover:text-primary text-white transition uppercase" to="/contact" onClick={() => window.scrollTo(0, 0)}>
            <button>
                {t("callToAction.contactUsButton")}
            </button>
          </Link>
          <Link className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition uppercase" to="/about" onClick={() => window.scrollTo(0, 0)}>
            <button>
                {t("callToAction.learnMoreButton")}
            </button>
          </Link>
        </div>

        {/* Social Links and Contact Info */}
        <div className="mt-12">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://www.linkedin.com/company/legal-boutique-advisers/"
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
              <img src="icons/telephone.png" className="w-icon" alt="Phone Icon" />
              <a href="tel:+34 952 777 991" className="hover:underline">
                +34 952 777 991
              </a>
            </div>

            {/* Email Section */}
            <div className="flex items-center gap-4">
              <img src="icons/email.png" className="w-icon" alt="Email Icon" />
              <a href="mailto:info@legalboutiqueadvisers.com" className="hover:underline">
                info@legalboutiqueadvisers.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
