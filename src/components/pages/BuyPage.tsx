import { useTranslation } from "react-i18next";

export default function BuyPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("buy.section1.sectionTitle")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("buy.section1.description")}
          </p>
        </div>
        {/* Dummy Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x1080?text=Modern+Luxury+Home+in+Spain")',
          }}
        ></div>
      </header>

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 px-6 space-y-16 z-20">
          {/* Section 1: Expertise */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold text-primary">
                {t("buy.section2.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("buy.section2.description")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Real+Estate+Market+Expertise"
                alt="Real Estate Expertise"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Knowledge */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("buy.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("buy.section3.description")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Luxury+Properties+Portfolio"
                alt="Luxury Properties Portfolio"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Vision and Mission */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-6xl font-bold text-primary">
              {t("buy.section4.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("buy.section4.description")}
            </p>
            {/* Dummy Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Your+Dream+Home+Marbella"
              alt="Dream Property in Marbella"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
          </section>

          {/* Section 4: Golden Visa */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("buy.section5.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("buy.section5.description")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Golden+Visa+Legal+Support"
                alt="Golden Visa Legal Support"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
