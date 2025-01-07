import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function InvestComponent() {
  const { t } = useTranslation();

  return (
    <div 
      id="invest-section"
      className="bg-gray-50 min-h-screen font-zesta-bold"
    >
      {/* Header Section */}
      <div className="sticky top-0 relative h-4 bg-primary z-20"></div>
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto md:px-bdr px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("investPlan.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("investPlan.description")}
          </p>
          {/* Dummy Banner Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                'url("images/ronda-cliff.jpeg")',
            }}
          ></div>
        </div>
      </header>
      
      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto pt-16 md:px-bdr px-6 space-y-16 z-20">

          {/* Section 1: Comprehensive Asset Management */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
              src="images/bugambilla-terace.jpg"
              alt="Sell with Confidence"
              className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("investPlan.section2.sectionTitle")}
              </h2>
              <p className="my-4 text-lt-primary">
                {t("investPlan.section2.description")}
              </p>
              <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase">
                <Link to="/contact">
                  {t("investPlan.section2.button")}
                </Link>
              </button>
            </div>
          </section>

          {/* Section 3: Tax Advice */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-6xl font-bold text-primary">
              {t("investPlan.section3.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("investPlan.section3.description")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
