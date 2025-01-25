import { useTranslation } from "react-i18next";
import Header from "../components/Header";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("about.section1.sectionTitle")}
        content={t("about.section1.description")}
        backgroundImage="images/pool-house.jpg"
      />

      {/* Main Sections */}
      <div className="sticky relative h-4 bg-primary z-2"> </div>
      <main className="sticky relative bg-gray-50 z-2">
        <div className="container mx-auto py-16 lg:px-bdr px-6 space-y-16 z-2">
          {/* Section 2: An Attentive Relationship */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("about.section2.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("about.section2.description")}
              </p>
            </div>
            {/* Placeholder Image */}
            <div className="lg:w-1/2">
              <img
                src="images/catedral-malaga-crop.jpeg"
                alt="Global Legal Advice"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 4: The Team */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-3xl font-bold text-primary">
              {t("about.section3.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("about.section3.description")}
            </p>
          </section>

          {/* New Section: Marisela - The Founder */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            {/* Marisela's Profile Image */}
            <div className="lg:w-1/3">
              <img
                src="images/marisela-castro.jpg"
                alt={t("about.marisela.name")}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Marisela's Profile Details */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-primary">
                {t("about.marisela.name")}
              </h2>
              <h3 className="mt-2 text-xl font-semibold text-lt-primary">
                {t("about.marisela.title")}
              </h3>
              <p className="mt-4 text-lt-primary whitespace-pre-wrap">
                {t("about.marisela.description")}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
