import { useTranslation } from "react-i18next";

export default function LegalAspectComponent() {
  const { t } = useTranslation();

  return (
    <div 
      id="legal-aspect-section"
      className="bg-gray-50 min-h-screen"
    >
      {/* Header Section */}
      <div className="sticky top-0 relative h-4 bg-primary z-20"> </div>
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("legalAspect.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("legalAspect.description.paragraph1")}
          </p>
        </div>
        {/* Dummy Header Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x1080?text=Legal+and+Advisory+Services")',
          }}
        ></div>
      </header>

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 px-6 space-y-16 z-20">

          {/* Section 1: Personalized Approach */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold text-primary">
                {t("legalAspect.title")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("legalAspect.description.paragraph2")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Property+Investment+Support"
                alt="Property Investment Advisory"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Inheritance Law */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("legalAspect.description.paragraph3").split(",")[0]}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("legalAspect.description.paragraph3")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Inheritance+Law+Support"
                alt="Inheritance Planning"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Banking Advisory */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-6xl font-bold text-primary">
              {t("legalAspect.description.paragraph4").split(",")[0]}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("legalAspect.description.paragraph4")}
            </p>
            {/* Dummy Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Banking+Entity+Advisory"
              alt="Advisory on Banking Relationships"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
          </section>

          {/* Section 4: Real-Time Communication */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("legalAspect.description.paragraph5").split(",")[0]}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("legalAspect.description.paragraph5")}
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Dummy Image */}
              <img
                src="https://via.placeholder.com/600x400?text=Real-Time+Communication"
                alt="Real-Time Client Communication"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 5: Legal Service Areas */}
          <section className="bg-gray-50 text-center py-16">
            <h2 className="text-4xl font-bold text-primary">
              {t("legalAspect.title")}
            </h2>
            <p className="mt-4 text-lg">
              We specialize in the following areas:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="border p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  {t("legalAspect.description.services.area1")}
                </h3>
                <p className="mt-4 text-lt-primary">
                  Comprehensive legal strategies for real estate transactions.
                </p>
              </div>
              <div className="border p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  {t("legalAspect.description.services.area2")}
                </h3>
                <p className="mt-4 text-lt-primary">
                  Navigating complex international legal challenges.
                </p>
              </div>
              <div className="border p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  {t("legalAspect.description.services.area3")}
                </h3>
                <p className="mt-4 text-lt-primary">
                  Supporting families through legal matters with care.
                </p>
              </div>
              <div className="border p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  {t("legalAspect.description.services.area4")}
                </h3>
                <p className="mt-4 text-lt-primary">
                  Expert advisory on contracts and legal obligations.
                </p>
              </div>
              <div className="border p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  {t("legalAspect.description.services.area5")}
                </h3>
                <p className="mt-4 text-lt-primary">
                  Reducing tax burdens through strategic legal counsel.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
