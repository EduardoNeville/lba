import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CorporateResponsibility() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center relative">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("invest.section1.title")}
          </h1>
          <p className="mt-6 font-light text-lg lg:text-2xl">
            {t("invest.section1.body")}
          </p>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                'url("https://via.placeholder.com/1920x1080?text=Marbella+Real+Estate+Market")',
            }}
          ></div>
        </div>
      </header>

      {/* Section 1: Culture and Art */}
      <div className="relative h-4 bg-primary z-20"></div>
      <main className="relative z-20 bg-gray-50">
        <section className="text-center bg-gray-50 py-16">
          <h2 className="text-3xl font-bold text-primary">
            {t("corporateResposibility.section1.sectionTitle")}
          </h2>
          <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
            {t("corporateResposibility.section1.description")}
          </p>
          {/* Ideal Image */}
          <img
            src="https://via.placeholder.com/800x400?text=Contemporary+Art+Exhibition"
            alt="Contemporary Art"
            className="mt-8 mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Section 2 & 3: Patronage + Investing */}
        <section className="flex flex-col lg:flex-row gap-8 mx-auto px-12">
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
            <button className="border rounded border-primary mt-6 px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition">
              <Link to="/sell">
                {t("corporateResposibility.section3.button")}
              </Link>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
