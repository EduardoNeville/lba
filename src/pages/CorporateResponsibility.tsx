import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";

// Import stylesheets for slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CorporateResponsibility() {
  const { t } = useTranslation();

  // Slider settings for react-slick
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: "0",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768, // Mobile screens
        settings: {
          arrows: false,
          swipe: true,
        },
      },
    ],
  };

  // Template images for carousel
  const templateImages = [
    { src: "images/concierto-piano-viola.jpeg", alt: "Template Image 2" },
    { src: "images/cuardo-puerto.jpeg", alt: "Template Image 3" },
    { src: "images/museo-arte.jpeg", alt: "Template Image 4" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <Header
        title={t("invest.section1.title")}
        content={t("invest.section1.body")}
        backgroundImage="images/las-brisas-landscape.jpg"
      />

      {/* Section 1: Culture and Art */}
      <div className="sticky relative h-4 bg-primary z-2"></div>
      <main className="sticky relative text-center py-16 bg-gray-50 z-2 space-y-16">
        <section className="text-center">
          <h2 className="text-flash font-bold text-primary">
            {t("corporateResposibility.section1.sectionTitle")}
          </h2>
          <p className="mt-4 text-content text-lt-primary max-w-3xl mx-auto">
            {t("corporateResposibility.section1.description")}
          </p>

          {/* Carousel           
          <div className="mt-8 mx-auto max-w-xl relative">
            <Slider {...sliderSettings}>
              {templateImages.map((image, index) => (
                <div key={index} className="stack-container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="stacked-image rounded-lg shadow-lg w-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        */}
        </section>


        {/* Section 2 & 3: Patronage and Investing */}
        <section className="flex flex-col lg:flex-row gap-8 mx-auto px-2 md:px-8">
          {/* Patronage */}
          <div className="bg-white shadow-md p-8 rounded-lg lg:w-1/2">
            <h2 className="text-title font-bold text-primary">
              {t("corporateResposibility.section2.sectionTitle")}
            </h2>
            <p className="mt-4 text-content text-lt-primary">
              {t("corporateResposibility.section2.description")}
            </p>
          </div>

          {/* Investing */}
          <div className="bg-white shadow-md p-8 rounded-lg lg:w-1/2">
            <h2 className="text-title font-bold text-primary">
              {t("corporateResposibility.section3.sectionTitle")}
            </h2>
            <p className="my-4 text-content text-lt-primary">
              {t("corporateResposibility.section3.description")}
            </p>
            <a href={`/invest_and_plan#sell-section`}>
              <button className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase text-button">
                {t("buttons.learn")}
              </button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
