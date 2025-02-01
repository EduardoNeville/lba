import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function InvestPlanPage() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-hidden">
      {/* Legal Section */}
      <div
        id="legal-aspect-section"
        className="bg-gray-50 min-h-screen font-zesta-regular"
      >
        {/* Header Section */}
        <div className="sticky relative h-4 bg-primary z-2"> </div>
        <Header
          title={t("legalServices.introduction.title")}
          content={t("legalServices.introduction.description")}
          backgroundImage="images/golf-lake-villa-padierna.jpg"
        />

        {/* Main Sections */}
        <div className="relative h-4 bg-primary z-2"> </div>
        <section className="sticky relative bg-gray-50 z-2">
          <div className="container mx-auto py-16 md:px-bdr px-6 space-y-16 z-2">
            {/* Advisory Services */}
            <section className="text-center bg-gray-50 py-16">
              <h2 className="text-flash font-bold text-primary">
                {t("legalServices.advisoryServices.title")}
              </h2>
              <p className="mt-8 mb-4 text-content text-lt-primary max-w-3xl mx-auto">
                {t("legalServices.advisoryServices.description")}
              </p>

              <h2 className="text-[1.25rem] font-bold text-primary">
                {t("legalServices.clientFocus.title")}
              </h2>
              <p className="mt-4 mb-8 text-content text-lt-primary max-w-3xl mx-auto">
                {t("legalServices.clientFocus.description")}
              </p>

              {/* CTA Button */}
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <button className="border rounded border-primary px-6 py-2 text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button w-1/2 items-center">
                  {t("buttons.learn")}
                </button>
              </Link>
            </section>

            {/* Specialized Advisory */}
            <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-content font-bold text-primary">
                  {t("legalServices.specializedAdvisory.title")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("legalServices.specializedAdvisory.description")}
                </p>
                <h2 className="text-content font-bold text-primary">
                  {t("legalServices.complianceSupport.title")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("legalServices.complianceSupport.description")}
                </p>
                <h2 className="text-content font-bold text-primary">
                  {t("legalServices.businessStartups.title")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("legalServices.businessStartups.description")}
                </p>
                {/* CTA Button */}
                <div className="mt-4">
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                    <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button">
                      {t("buttons.contact")}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="images/golf-sand-bunker-pink-trees-crop.jpg"
                  alt="Inheritance Planning"
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </section>

            {/* Expertise Sections */}
            <section className="bg-gray-50 text-center py-16">
              <h2 className="text-flash font-bold text-primary">
                {t("legalServices.services.title")}
              </h2>
              <p className="my-4 text-lt-primary text-content">
                {t("legalServices.services.description")}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {[
                  t("legalServices.services.area1"),
                  t("legalServices.services.area2"),
                  t("legalServices.services.area3"),
                  t("legalServices.services.area4"),
                  t("legalServices.services.area5"),
                  t("legalServices.services.area6"),
                ].map((service, index) => (
                  <div
                    key={index}
                    className="border p-8 rounded-lg shadow-lg hover:bg-pink-50 transition"
                  >
                    <h3 className="text-title font-bold text-primary">
                      {service.split(":")[0]}
                    </h3>
                    <p className="text-content mt-4 text-lt-primary">
                      {service.split(":")[1].trim()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* Buy Section */}
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

      {/* Sell Section */}
      <div
        id="sell-section"
        className="bg-gray-50 min-h-screen font-zesta-bold"
      >
        {/* Header Section */}
        <div className="relative h-4 bg-primary z-2"> </div>
        <Header
          title={t("sell.section1.sectionTitle")}
          content={t("sell.section1.description")}
          backgroundImage="images/plaza-los-naranjos.jpg"
        />

        {/* Main Sections */}
        <div className="relative h-4 bg-primary z-2"> </div>
        <section className="sticky relative bg-gray-50 z-2">
          <div className="container mx-auto pt-16 md:px-bdr px-6 space-y-16 z-2">
            {/* Section 1: Sell with Confidence */}
            <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-title font-bold text-primary">
                  {t("sell.section2.sectionTitle")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("sell.section2.description")}
                </p>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-button text-primary transition uppercase">
                    {t("buttons.learn")}
                  </button>
                </Link>
              </div>
              {/* Ideal Image */}
              <div className="lg:w-1/2">
                <img
                  src="images/palmera-house.jpeg"
                  alt="Sell with Confidence"
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </section>

            {/* Section 3: Tax Advice */}
            <section className="text-center bg-gray-50 pt-16 pb-32">
              <h2 className="text-flash font-bold text-primary">
                {t("sell.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary max-w-3xl mx-auto">
                {t("sell.section3.description")}
              </p>
            </section>
          </div>
        </section>
      </div>

      {/* Invest Section */}
      <div
        id="invest-section"
        className="bg-gray-50 min-h-screen font-zesta-bold"
      >
        {/* Header Section */}
        <div className="relative h-4 bg-primary z-2"> </div>
        <Header
          title={t("investPlan.title")}
          content={t("investPlan.description")}
          backgroundImage="images/ronda-cliff.jpeg"
        />

        {/* Main Sections */}
        <div className="relative h-4 bg-primary z-2"> </div>
        <section className="sticky relative bg-gray-50 z-2">
          <div className="container mx-auto pt-16 pb-32 md:px-bdr px-6 space-y-16 z-20">
            {/* Section 1: Comprehensive Asset Management */}
            <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
              {/* Ideal Image */}
              <div className="lg:w-1/2">
                <img
                  src="images/bugambilla-terace.jpg"
                  alt="Sell with Confidence"
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-title font-bold text-primary">
                  {t("investPlan.section2.sectionTitle")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("investPlan.section2.description")}
                </p>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button">
                    {t("buttons.market")}
                  </button>
                </Link>
              </div>
            </section>

            {/* Section 3: Tax Advice */}
            <section className="text-center bg-gray-50 pt-16">
              <h2 className="text-flash font-bold text-primary">
                {t("investPlan.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary max-w-3xl mx-auto">
                {t("investPlan.section3.description")}
              </p>
            </section>

            {/* Section 1: The art of investing */}
            <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
              {/* Ideal Image */}
              <div className="lg:w-1/2">
                <img
                  src="images/art-gallery.jpg"
                  alt="Sell with Confidence"
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-title font-bold text-primary">
                  {t("investPlan.artInvesting.title")}
                </h2>
                <p className="my-4 text-content text-lt-primary">
                  {t("investPlan.artInvesting.description")}
                </p>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button">
                    {t("buttons.market")}
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
