import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";

// Import stylesheets for slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CorporateResponsibility() {
  const { t } = useTranslation();

  // Custom Next Arrow for the slider
  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-primary-light transition focus:outline-none"
      onClick={onClick}
    >
      {">"}
    </button>
  );

  // Custom Previous Arrow for the slider
  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-primary-light transition focus:outline-none z-20"
      onClick={onClick}
    >
      {"<"}
    </button>
  );

  // Slider settings for react-slick
  const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Mobile screens
        settings: {
          arrows: false, // Hide custom arrows on smaller devices
          swipe: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  // Template images for carousel
  const templateImages = [
    {
      src: "images/concierto-piano-viola.jpeg",
      alt: "Image of a piano concert",
    },
    { src: "images/museo-arte.jpeg", alt: "Image of an art museum" },
    { src: "images/polo-game.jpg", alt: "Image of polo game" },
    { src: "images/playing-piano.jpeg", alt: "Image of playing piano" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-4 bg-primary z-2"></div>
      <Header
        title={t("invest.section1.title")}
        content={t("invest.section1.body")}
        backgroundImage="images/las-brisas-landscape.jpg"
      />

      {/* Section 1: Culture and Art */}
      <div className="sticky relative h-4 bg-primary z-2"></div>
      <main className="sticky relative text-center py-16 bg-gray-50 z-2 space-y-16">
        <section className="text-center py-16 lg:px-bdr px-6">
          <h2 className="text-flash font-bold text-primary">
            {t("corporateResposibility.section1.sectionTitle")}
          </h2>
          <p className="mt-4 text-content text-lt-primary max-w-3xl mx-auto">
            {t("corporateResposibility.section1.description")}
          </p>
        </section>

        {/* Carousel */}
        <section>
          <div className="mt-8 mx-auto w-full relative overflow-hidden items-center justify-center">
            <Slider {...sliderSettings}>
              {templateImages.map((image, index) => (
                <div key={index} className="overflow-hidden ">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="px-2 items-center object-cover rounded-2xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Commitment */}
        <section className="text-center py-16">
          <h2 className="text-flash font-bold text-primary">
            {t("corporateResposibility.commitment.title")}
          </h2>
          <p className="mt-4 text-lt-primary text-content">
            {t("corporateResposibility.commitment.description")}
          </p>
          <div className="grid grid-cols-1 gap-8 mt-16 lg:px-bdr px-6">
            {[
              t("corporateResposibility.commitment.value1"),
              t("corporateResposibility.commitment.value2"),
              t("corporateResposibility.commitment.value3"),
            ].map((commitment, index) => (
              <div
                key={index}
                className="border p-8 rounded-lg shadow-lg hover:bg-pink-50 transition text-center"
              >
                <h3 className="text-title font-bold text-primary">
                  {commitment.split(":")[0]}
                </h3>
                <p className="text-content mt-4 text-lt-primary">
                  {commitment.split(":")[1].trim()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
