import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Header from "../Header";

export default function InvestComponent() {
  const { t } = useTranslation();

  return (
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
      <main className="relative bg-gray-50 z-2">
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
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase">
                  {t("investPlan.section2.button")}
                </button>
              </Link>
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
