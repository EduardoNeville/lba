import { useTranslation } from "react-i18next";

export default function LegalAspectComponent() {
  const { t } = useTranslation();

  return (
    <div
      id="legal-aspect-section"
      className="bg-gray-50 min-h-screen font-zesta-regular"
    >
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-pink-50 relative z-0">
        <div className="container mx-auto lg:px-bdr px-6 py-16 text-center 
                        relative z-10 text-primary">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("legalAspect.description.paragraph2.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("legalAspect.description.paragraph2.text")}
          </p>
        </div>
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
            opacity-50 bg-primary"
          style={{
            backgroundImage:
              `url('images/golf-lake-villa-padierna.jpg')`,
          }}
        />
      </header>

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <main className="relative bg-gray-50 z-2">
        <div className="container mx-auto py-16 md:px-bdr px-6 space-y-16 z-20">

          {/* Section 2: Inheritance Law */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("legalAspect.description.paragraph3.title")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("legalAspect.description.paragraph3.text")}
              </p>
              {/* CTA Button */}
              <div className="mt-4">
                <button className="border rounded border-primary px-6 py-2 text-lg bg-transparent hover:bg-pink-50 text-primary transition uppercase">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="images/golf-sand-bunker-pink-trees-crop.jpg"
                alt="Inheritance Planning"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3 & 4 Merged: Comprehensive Banking Advice */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-6xl font-bold text-primary">
              {t("legalAspect.description.paragraph4.title")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("legalAspect.description.paragraph4.text")}
            </p>

            {/* CTA Button */}
            <div className="mt-4">
              <button className="border rounded border-primary px-6 py-2 text-lg bg-transparent hover:bg-pink-50 text-primary transition uppercase">
                {t("landingPage.learnMoreButton")}
              </button>
            </div>
          </section>

          {/* Section 5: Legal Service Areas */}
          <section className="bg-gray-50 text-center py-16">
            <h2 className="text-4xl font-bold text-primary">
              {t("legalAspect.title")}
            </h2>
            <p className="mt-4 text-lt-primary text-lg">We specialize in the following areas:</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {[
                t("legalAspect.description.services.area1"),
                t("legalAspect.description.services.area2"),
                t("legalAspect.description.services.area3"),
                t("legalAspect.description.services.area4"),
                t("legalAspect.description.services.area5"),
              ].map((service, index) => (
                <div
                  key={index}
                  className="border p-8 rounded-lg shadow-lg hover:bg-pink-50 transition"
                >
                  <h3 className="text-xl font-bold text-primary">
                    {service}
                  </h3>
                  <p className="mt-4 text-lt-primary">
                    Comprehensive solutions tailored for your needs.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
