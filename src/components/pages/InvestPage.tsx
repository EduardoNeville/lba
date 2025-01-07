import { useTranslation } from "react-i18next";

export default function InvestComponent() {
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
        <div className="relative h-4 bg-primary z-20"></div>
      </header>

      {/* Main Content */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 px-6 space-y-16 z-20">
        {/* Section 1: Why Choose Marbella */}
        <section className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("invest.section1.title")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("invest.section1.body")}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400?text=Marbella+Scenery"
              alt="Why Choose Marbella"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Section 2: A Long-term Commitment */}
        <section className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("invest.section2.title")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("invest.section2.body")}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400?text=Sunny+Lifestyle"
              alt="Long-term Investment"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Section 3: Marbella’s Luxurious Lifestyle */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("invest.section3.title")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("invest.section3.body")}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400?text=Luxury+Living"
              alt="Marbella’s Luxurious Lifestyle"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Section 4: Securing Your Legacy */}
        <section className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-primary">
            {t("invest.section4.title")}
          </h2>
          <p className="mt-4 text-lt-primary">
            {t("invest.section4.body")}
          </p>
          <img
            src="https://via.placeholder.com/800x400?text=Legacy+Planning"
            alt="Securing Your Legacy"
            className="mt-8 mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Section 5: The Art of Investment */}
        <section className="flex flex-col lg:flex-row items-center gap-8 p-8">
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400?text=Modern+Art+Investment"
              alt="The Art of Investment"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary">
              {t("invest.section5.title")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("invest.section5.body")}
            </p>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}
