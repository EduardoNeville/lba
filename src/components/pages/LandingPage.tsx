import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-pink-50 relative">
        <div className="container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary"
        >
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("landingPage.title")}
          </h1>
          <p className="mt-4 text-2xl lg:text-2xl">
            {t("landingPage.subtitle")}
          </p>
          <p className="mt-6">
            {t("landingPage.content")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              to="/contact" 
              onClick={() => window.scrollTo(0, 0)} 
              className="border rounded border-primary mt-6 px-6 py-2 w-1/2
              text-xl hover:bg-lt-primary bg-primary text-pink-50 
              hover:text-pink-50 transition font-zesta-bold uppercase"
            >
              <button>
                {t("landingPage.contactUsButton")}
              </button>
            </Link>
            <Link 
              to="/about"
              onClick={() => window.scrollTo(0, 0)}  
              className="border rounded border-primary mt-6 px-6 py-2 w-1/2
              text-xl hover:bg-lt-primary bg-primary text-pink-50 
              hover:text-pink-50 transition font-zesta-bold uppercase"
            >
              <button>
                {t("landingPage.learnMoreButton")}
              </button>
            </Link>
          </div>
        </div>
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary"
          style={{
            backgroundImage: `url('images/puerto-banus-la-concha.jpeg')`,
          }}
        />
      </header>

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-20"> </div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 lg:px-bdr px-6 space-y-16 z-20">

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
                src="images/hand-pen.jpg"
                alt="Legal Expertise in Real Estate"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Section 2: Buying Properties */}
          <section className="bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center">
            {/* Ideal Image */}
            <div className="lg:w-1/2">
              <img
                src="images/modern-house.jpeg"
                alt="Buying Properties in Marbella"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary">
                {t("main.section2.sectionTitle")}
              </h2>
              <p className="my-4 text-lt-primary">
                {t("main.section2.description")}
              </p>
              <a href={`/invest_and_plan#buy-section`}>
                <button className="border rounded border-primary p-1 w-full 
                            text-xl bg-transparent hover:bg-pink-50 text-primary 
                            uppercase"
                >
                  {t("main.section2.button")}
                </button>
              </a>
            </div>
          </section>

          {/* Section 3: Selling Properties */}
          <section className="p-8 gap-8 items-center justify-center">
            <h2 className="text-3xl font-bold text-primary">
              {t("main.section3.sectionTitle")}
            </h2>
            <p className="mt-4 text-lt-primary">
              {t("main.section3.description")}
            </p>
            <a href={`/invest_and_plan#sell-section`}>
              <button className="border rounded border-primary mt-6 px-6 py-2 
                          w-auto text-xl bg-transparent hover:bg-pink-50 
                          text-primary transition uppercase"
              >
                {t("main.section3.button")}
              </button>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
