import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-pink-50 relative">
        <div className="container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary"
        >
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("about.section1.sectionTitle")}
          </h1>
          <p className="mt-4 text-2xl lg:text-2xl">
            {t("about.section1.description")}
          </p>
        </div>
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary"
          style={{
            backgroundImage: `url("images/pool-house.jpg")`,
          }}
        />
      </header>

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 lg:px-bdr px-6 space-y-16 z-20">

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
            {/* Placeholder Team Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Real+Estate+Team"
              alt="Our Real Estate Team"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
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
