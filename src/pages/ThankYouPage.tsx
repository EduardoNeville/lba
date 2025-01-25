import { useTranslation } from "react-i18next";

export default function ThankYouPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto md:px-bdr px-6 py-16 text-center relative">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("thankyou.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("thankyou.description")}
          </p>
        </div>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("images/casa-la-concha.jpg")',
          }}
        ></div>
      </header>

      {/* Thank You Section */}
      <div className="relative h-4 bg-primary z-10"></div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 md:px-bdr px-6 z-20">
          <section className="bg-white shadow-md p-8 rounded-lg max-w-2xl mx-auto relative text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {t("thankyou.header")}
            </h2>
            <p className="text-lt-primary font-light text-md">
              {t("thankyou.body")}
            </p>
          </section>

          {/* Additional Contact Image Section */}
          <section className="mt-16 text-center">
            <p className="text-lt-primary font-light text-md mb-8">
              {t("thankyou.additionalInfo")}
            </p>
            <img
              src="https://via.placeholder.com/800x400?text=Thank+You+Image"
              alt="Thank you placeholder"
              className="mx-auto rounded-lg shadow-lg"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
