import { useTranslation } from "react-i18next";

export default function CorporateResponsibility() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-pink-50 relative">
        <div className="container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary"
        >
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("invest.section1.title")}
          </h1>
          <p className="mt-4 text-2xl lg:text-2xl">
            {t("invest.section1.body")}
          </p>
        </div>
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary"
          style={{
              backgroundImage: 'url("images/las-brisas-landscape.jpg")',
          }}
        />
      </header>

      {/* Section 1: Culture and Art */}
      <div className="relative h-4 bg-primary z-20"></div>
      <main className="relative md:px-bdr px-2 py-16 z-20 space-y-16 bg-gray-50">
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
