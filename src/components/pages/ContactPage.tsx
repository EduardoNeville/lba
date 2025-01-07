import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <header className="sticky top-0 bg-white text-primary">
        <div className="container mx-auto md:px-bdr px-6 py-16 text-center relative">
          <h1 className="text-4xl lg:text-6xl font-bold uppercase">
            {t("contact.title")}
          </h1>
          <p className="mt-4 font-light text-lg lg:text-2xl">
            {t("contact.description")}
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

      {/* Contact Form Section */}
      <div className="relative h-4 bg-primary z-10"></div>
      <main className="relative bg-gray-50">
        <div className="container mx-auto py-16 md:px-bdr px-6 z-20">
          <section className="bg-white shadow-md p-8 rounded-lg max-w-2xl mx-auto relative">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {t("contact.title")}
            </h2>
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lt-primary font-semibold mb-1"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.email-placeholder")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-lt-primary font-semibold mb-1"
                >
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t("contact.subject-placeholder")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-lt-primary font-semibold mb-1"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t("contact.message-body")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="border rounded border-primary px-6 py-2 w-1/2 text-lg bg-transparent hover:bg-pink-50 text-primary transition"
                >
                  {t("contact.submit")}
                </button>
              </div>
            </form>
          </section>

          {/* Additional Contact Image Section */}
          <section className="mt-16 text-center">
            <p className="text-lt-primary font-light text-md mb-8">
              {t("contact.description")}
            </p>
            {/* Dummy Image */}
            <img
              src="https://via.placeholder.com/800x400?text=Contact+Your+Real+Estate+Expert"
              alt="Contact our firm"
              className="mx-auto rounded-lg shadow-lg"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
