import { useTranslation } from "react-i18next";

import Header from "../components/Header";

export default function ThankYouPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("thankyou.title")}
        subtitle={t("landingPage.subtitle")}
        content={t("thankyou.description")}
        backgroundImage="images/casa-la-concha.jpg"
      />

      {/* Thank You Section */}
      <div className="relative h-4 bg-primary z-2"></div>
      <main className="sticky relative bg-gray-50 z-2">
        <div className="container mx-auto py-32 md:px-bdr px-6 z-20">
          <section className="bg-white shadow-md p-8 rounded-lg max-w-2xl mx-auto relative text-center">
            <h2 className="text-title font-bold mb-6 text-primary">
              {t("thankyou.header")}
            </h2>
            <p className="text-content text-lt-primary font-light text-md">
              {t("thankyou.body")}
            </p>
          </section>

          {/* Additional Contact Image Section */}
          <section className="mt-16 text-center">
            <p className="text-content text-lt-primary font-light text-md">
              {t("thankyou.additionalInfo")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
