import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">
          {t("callToAction.title")}
        </h2>
        <p className="mt-4 text-lt-primary">{t("callToAction.body")}</p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-white hover:text-primary text-white transition">
            <Link to="/contact">{t("callToAction.contactUsButton")}</Link>
          </button>
          <button className="border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition">
            <Link to="/about">{t("callToAction.learnMoreButton")}</Link>
          </button>
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
          <div className="flex flex-col items-center mt-6 text-sm gap-2 text-black text-xl">
            <div className="flex items-center gap-2">
              <img src="icons/telephone.png" className="w-icon" />
              <a href="tel:+1234567890" className="hover:underline">
                +123-456-7890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img src="icons/email.png" className="w-icon" />
              <a href="mailto:info@example.com" className="hover:underline">
                info@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
