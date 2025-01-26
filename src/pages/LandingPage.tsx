import { useTranslation } from "react-i18next";

import Header from "../components/Header";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("landingPage.title")}
        subtitle={t("landingPage.subtitle")}
        content={t("landingPage.content")}
        backgroundImage="images/puerto-banus-la-concha.jpeg"
        buttons={[
          {
            text: t("buttons.contact"),
            to: "/contact",
          },
          {
            text: t("buttons.learn"),
            to: "/about",
          },
        ]}
      />

      {/* Main Sections */}
      <div className="sticky relative h-4 bg-primary z-2"> </div>
      <main className="sticky relative bg-gray-50 z-2">
        <div className="container mx-auto py-16 lg:px-bdr px-6 space-y-16">
          {/* Section 1: Expertise */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-flash text-primary">
                {t("main.section1.sectionTitle")}
              </h2>
              <p className="mt-4 text-content text-lt-primary">
                {t("main.section1.description")}
              </p>
            </div>
            {/* Ideal Image: Lawyer working on property management */}
            <div className="lg:w-1/2">
              <img
                src="images/hand-pen.jpg"
                alt="Legal Expertise in Real Estate"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Buying Properties */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="images/modern-house.jpeg"
                alt="Buying Properties in Marbella"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-title text-primary">
                {t("main.section2.sectionTitle")}
              </h2>
              <p className="my-4 text-content text-lt-primary">
                {t("main.section2.description")}
              </p>
              <a href={`/invest_and_plan#buy-section`}>
                <button
                  className="border rounded border-primary p-1 w-full 
                            text-button bg-transparent hover:bg-pink-50 text-primary 
                            uppercase"
                >
                  {t("buttons.buy")}
                </button>
              </a>
            </div>
          </section>

          {/* Section 3: Selling Properties */}
          <section className="p-8 gap-8 items-center justify-center">
            <h2 className="text-title text-primary">
              {t("main.section3.sectionTitle")}
            </h2>
            <p className="mt-4 text-content text-lt-primary">
              {t("main.section3.description")}
            </p>
            <a href={`/invest_and_plan#sell-section`}>
              <button
                className="border rounded border-primary mt-6 px-6 py-2 
                          w-full text-button bg-transparent hover:bg-pink-50 
                          text-primary transition uppercase"
              >
                {t("buttons.market")}
              </button>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
