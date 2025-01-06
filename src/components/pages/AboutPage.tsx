import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-white text-primary relative z-20">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("about.section1.sectionTitle")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("about.section1.description")}
          </p>
        </div>
        {/* Dummy Header Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-10"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x1080?text=Teamwork+at+Marbella+Luxury")',
          }}
        ></div>
      </header>

      {/* Divider */}
      <div className="relative h-4 bg-primary"></div>

      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 space-y-16">

          {/* Section 1: Who are we? */}
          <section className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("about.section1.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("about.section1.description")}
              </p>
            </div>
            {/* Placeholder Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Professional+Real+Estate+Team"
                alt="Professional Real Estate Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

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
                src="https://via.placeholder.com/600x400?text=Global+Legal+Advice"
                alt="Global Legal Advice"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 3: Providing Trust */}
          <section className="flex flex-col-reverse lg:flex-row-reverse gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("about.section3.sectionTitle")}
              </h2>
              <p className="mt-4 text-lt-primary">
                {t("about.section3.description")}
              </p>
            </div>
            {/* Placeholder Image */}
            <div className="lg:w-1/2">
              <img
                src="https://via.placeholder.com/600x400?text=Reliable+Real+Estate+Services"
                alt="Reliable Real Estate Services"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 4: The Team */}
          <section className="text-center bg-gray-50 py-16">
            <h2 className="text-3xl font-bold text-primary">
              {t("about.section4.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary max-w-3xl mx-auto">
              {t("about.section4.description")}
            </p>
            {/* Placeholder Team Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Real+Estate+Team"
              alt="Our Real Estate Team"
              className="mt-8 mx-auto rounded-lg shadow-lg"
            />
          </section>

        </div>
      </main>
    </div>
  );
}
