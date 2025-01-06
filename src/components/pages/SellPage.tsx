import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SellPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("sell.section1.sectionTitle")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("sell.section1.description")}
          </p>
          {/* Dummy Banner Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                'url("https://via.placeholder.com/1920x1080?text=Luxury+Marbella+Homes")',
            }}
          ></div>
        </div>
      </header>
      
      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto pt-16 px-6 space-y-16 z-20">
          {/* Section 1: Find Your Perfect Match */}
          <section className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("sell.section1.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("sell.section1.description")}
              </p>
            </div>
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Perfect+Real+Estate+Match+Image"
                alt="Find Your Perfect Match"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Sell with Confidence */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("sell.section2.sectionTitle")}
              </h2>
              <p className="my-4 text-lt-primary">
                {t("sell.section2.description")}
              </p>
              <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition">
                <Link to="/contact">
                  {t("landingPage.button1")}
                </Link>
              </button>
            </div>
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Confident+Selling+Experience"
                alt="Sell with Confidence"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Tax Advice */}
          <section className="bg-gray-50 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-primary">
                {t("sell.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("sell.section3.description")}
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              {/* Dummy Image for Tax Advice */}
              <img
                src="https://via.placeholder.com/800x400?text=Expert+Tax+Advice"
                alt="Expert Tax Advice"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
