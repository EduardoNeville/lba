import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("landingPage.title")}
          </h1>
          <p className="mt-4 font-light text-2xl lg:text-2xl">
            {t("landingPage.subtitle")}
          </p>
          <p className="mt-6 text-lt-primary">
            {t("landingPage.content")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="border rounded border-primary mt-6 px-6 py-2 w-1/2 text-xl bg-transparent hover:bg-blue-50 text-primary transition">
              <Link to="/contact">
                {t("landingPage.contactUsButton")}
              </Link>
            </button>
            <button className="border rounded border-primary mt-6 px-6 py-2 w-1/2 text-xl bg-transparent hover:bg-pink-50 text-primary transition">
              <Link to="/about">
                {t("landingPage.learnMoreButton")}
              </Link>
            </button>
          </div>
        </div>
        {/* Dummy Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x1080?text=Modern+Spanish+Real+Estate+Landscape")',
          }}
        ></div>
      </header>

      <div className="relative h-4 bg-primary z-20"> </div>
      {/* Main Sections */}
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 px-6 space-y-16 z-20">

          {/* Section 1: Expertise */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("main.section1.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("main.section1.description")}
              </p>
            </div>
            {/* Ideal Image: Lawyer working on property management */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Legal+Expertise+Image"
                alt="Legal Expertise in Real Estate"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Buying Properties */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("main.section2.sectionTitle")}
              </h2>
              <p className="my-4 text-lt-primary">
                {t("main.section2.description")}
              </p>
              <button className="border rounded border-primary p-1 w-full text-xl bg-transparent hover:bg-pink-50 text-primary">
                <Link to="/buy">
                  {t("main.section2.button")}
                </Link>
              </button>
            </div>
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Buying+Marbella+Homes"
                alt="Buying Properties in Marbella"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Selling Properties */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("main.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("main.section3.description")}
              </p>
              <button className="border rounded border-primary mt-6 px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition">
                <Link to="/sell">
                  {t("main.section3.button")}
                </Link>
              </button>
            </div>
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Marketing+Luxury+Properties"
                alt="Selling Properties in Marbella"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
