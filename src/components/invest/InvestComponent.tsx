import { useTranslation } from "react-i18next";

export default function InvestComponent() {
  const { t } = useTranslation();

  return (
    <div 
      id="invest-section"
      className="bg-gray-50 min-h-screen"
    >
      {/* Header Section */}
      <div className="sticky top-0 relative h-4 bg-primary z-20"></div>
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center relative">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("invest_plan.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl max-w-4xl mx-auto">
            {t("invest_plan.description.paragraph1")}
          </p>
        </div>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x1080?text=Professional+Advisory+Firm")',
          }}
        ></div>
      </header>

      {/* Main Content */}
      <div className="sticky top-0 relative h-4 bg-primary z-20"></div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 px-6 space-y-16 z-20">
          {/* Section 1: Asset Management Overview */}
          <section className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-primary">
                {t("invest_plan.description.paragraph2")}
              </h2>
              <p className="mt-4 text-lt-primary">{t("invest_plan.description.paragraph3")}</p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Asset+Management+Consulting"
                alt="Asset Management Consulting"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Personalized Investment */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col-reverse lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-primary">
                {t("invest_plan.description.paragraph4")}
              </h2>
              <p className="mt-4 text-lt-primary">{t("invest_plan.description.paragraph5")}</p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Vacation+Residences"
                alt="Vacation Residences"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Art Investments */}
          <section className="py-16 text-center bg-gray-50">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Investment in Art
            </h2>
            <p className="mt-4 text-lt-primary max-w-4xl mx-auto">
              {t("invest_plan.description.paragraph6")}
            </p>
            {/* Dummy Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Art+Investment+Tax+Benefits"
              alt="Art Investment Tax Benefits"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
          </section>

          {/* Section 4: Golden Visa */}
          <section className="bg-gray-50 p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-primary">
                Golden Visa Opportunity
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("invest_plan.description.paragraph7")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Golden+Visa+Advisor"
                alt="Golden Visa Advisor"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 5: Corporate Social Responsibility */}
          <section className="text-center bg-gray-100 py-16">
            <h2 className="text-5xl font-bold text-primary">
              {t("invest_plan.description.conclusion")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("invest_plan.description.paragraph8")}
            </p>
            {/* Dummy Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Sustainable+Investments"
              alt="Sustainable Investments"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
