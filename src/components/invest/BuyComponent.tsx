import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Header from "../Header";

export default function BuyComponent() {
  const { t } = useTranslation();

  return (
    <div
      id="buy-section"
      className="bg-gray-50 min-h-screen font-zesta-regular"
    >
      {/* Header Section */}
      <div className="sticky relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("buy.section1.sectionTitle")}
        content={t("buy.section1.description")}
        backgroundImage="images/puente-romano-peer.jpeg"
      />

      {/* Main Sections */}
      <div className="sticky relative h-4 bg-primary z-20"> </div>
      <section className="sticky relative bg-gray-50">
        <div className="container mx-auto py-16 md:px-bdr px-6 space-y-16 z-20">
          {/* Section 1: Expertise */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-flash font-bold text-primary">
                {t("buy.section2.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary">
                {t("buy.section2.description")}
              </p>
            </div>

            <div className="lg:w-1/2">
              <img
                src="images/ayuntamiento-marbella.jpg"
                alt="Luxury Properties Portfolio"
                className="rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </section>

          {/* Section 2: Knowledge */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-title font-bold text-primary">
                {t("buy.section3.sectionTitle")}
              </h2>
              <p className="my-4 text-content text-lt-primary">
                {t("buy.section3.description")}
              </p>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button">
                  {t("buttons.market")}
                </button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="images/marbella-old-town-flowers.jpg"
                alt="Luxury Properties Portfolio"
                className="rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </section>

          {/* Section 3: Vision and Mission */}
          <section className="text-center bg-gray-50">
            <div className="py-16">
              <h2 className="text-flash font-bold text-primary">
                {t("buy.section4.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary max-w-3xl mx-auto">
                {t("buy.section4.description")}
              </p>
            </div>
            <img
              src="images/puerto-banus.jpg"
              alt="Dream Property in Marbella"
              className="mt-16 mx-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </section>

          {/* Section 4: Golden Visa */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div>
              <h2 className="text-title font-bold text-primary">
                {t("buy.section5.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary">
                {t("buy.section5.description")}
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
