import { useTranslation } from "react-i18next";

import Header from "../components/Header";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("contact.title")}
        content={t("contact.description")}
        backgroundImage="images/casa-la-concha.jpg"
      />

      {/* Contact Form Section */}
      <div className="relative h-4 bg-primary z-3"></div>
      <main className="sticky relative bg-gray-50 z-2">
        <div className="container mx-auto py-16 md:px-bdr px-6 z-2">
          <section className="bg-white shadow-md p-8 rounded-lg max-w-2xl mx-auto relative">
            <h2 className="text-title font-bold text-center mb-6 text-primary">
              {t("contact.title")}
            </h2>
            <form 
              className="space-y-6"
              method="POST"
              action="https://formsubmit.co/eduardoneville82@gmail.com"
            >
              {/* Hidden Fields for Extra Features */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://legal-boutique-advisers-bf25a.web.app/thankyou" />
              
              {/* Honeypot Field for Spam Protection */}
              <input 
                type="text" 
                name="_honey" 
                className="hidden"
                style={{ display: "none" }} 
                tabIndex={-1} 
                autoComplete="off" 
              />

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-content text-lt-primary font-semibold mb-1"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.email-placeholder")}
                  required
                  className="w-full text-content border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-content text-lt-primary font-semibold mb-1"
                >
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t("contact.subject-placeholder")}
                  required
                  className="w-full text-content border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-content text-lt-primary font-semibold mb-1"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t("contact.message-body")}
                  required
                  className="w-full text-content border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="border text-content rounded border-primary px-6 py-2 w-1/2 text-lg bg-transparent hover:bg-pink-50 text-primary transition"
                >
                  {t("contact.submit")}
                </button>
              </div>
            </form>
          </section>

          {/* Additional Contact Image Section */}
          <section className="mt-16 text-center">
            <p className="text-content text-lt-primary font-light text-md mb-8">
              {t("contact.description")}
            </p>
            <img
              src="images/golf-fondo-la-concha.jpg"
              alt="Contact our firm"
              className="mx-auto rounded-lg shadow-lg"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
