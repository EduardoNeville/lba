import { useTranslation } from "react-i18next";

import Header from "../components/Header";

export default function CorporateResponsibility() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("invest.section1.title")}
        content={t("invest.section1.body")}
        backgroundImage="images/las-brisas-landscape.jpg"
      />

      {/* Section 1: Culture and Art */}
      <div className="relative h-4 bg-primary z-2"></div>
      <main className="relative md:px-bdr px-2 py-16 z-2 space-y-16 bg-gray-50">
        <section className="text-center bg-gray-50 ">
          <h2 className="text-3xl font-bold text-primary">
            {t("corporateResposibility.section1.sectionTitle")}
          </h2>
          <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
            {t("corporateResposibility.section1.description")}
          </p>

          {/* Ideal Image */}
          <img
            src="images/golf-fondo-la-concha.jpg"
            alt="Contemporary Art"
            className="mt-8 mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Section 2 & 3: Patronage + Investing */}
        <section className="flex flex-col lg:flex-row gap-8 mx-auto px-2">
          {/* Patronage */}
          <div className="bg-white shadow-md p-8 rounded-lg lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("corporateResposibility.section2.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("corporateResposibility.section2.description")}
            </p>
          </div>

          {/* Investing */}
          <div className="bg-white shadow-md p-8 rounded-lg lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("corporateResposibility.section3.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("corporateResposibility.section3.description")}
            </p>
            <a href={`/invest_and_plan#sell-section`}>
              <button className="border rounded border-primary mt-6 px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition">
                  {t("corporateResposibility.section3.button")}
              </button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
