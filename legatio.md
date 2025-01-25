# PROMPT 76c0233b-1339-4cfe-bd78-d085a4cea6ae


I want to create this header into a component in which we pass with texts we want to use.
As well as the background picture. I also want the buttons to be optional in the
sense that if they are use I want them to pass on where the link should go (to="/contact") as well as their texts


# OUTPUT 76c0233b-1339-4cfe-bd78-d085a4cea6ae
To achieve this, you can refactor the header into a reusable component that takes props as input. These props will allow you to customize the text, background image, and button options. Here's how you can do it:

### Refactored Header Component

```tsx
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle: string;
  content: string;
  backgroundImage: string;
  buttons?: {
    text: string;
    to: string;
  }[];
}

export default function Header({
  title,
  subtitle,
  content,
  backgroundImage,
  buttons = [],
}: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white text-pink-50 relative z-0">
      <div
        className="container mx-auto lg:px-bdr px-6 py-16 text-center 
                    relative z-10 text-primary"
      >
        <h1 className="text-4xl lg:text-6xl font-bold uppercase">{title}</h1>
        <p className="mt-4 text-2xl lg:text-2xl">{subtitle}</p>
        <p className="mt-6">{content}</p>
        <div className="mt-8 flex justify-center gap-4">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              onClick={() => window.scrollTo(0, 0)}
              className="border rounded border-primary mt-6 px-6 py-2 w-1/2
              text-xl hover:bg-lt-primary bg-primary text-pink-50 
              hover:text-pink-50 transition font-zesta-bold uppercase"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
    </header>
  );
}
```

---

### Updating the `LandingPage.tsx` to Use the Header Component

Here's how you can use the new `Header` component and pass the necessary props:

```tsx
import { useTranslation } from "react-i18next";
import Header from "./Header";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen font-zesta-regular">
      {/* Header Section */}
      <Header
        title={t("landingPage.title")}
        subtitle={t("landingPage.subtitle")}
        content={t("landingPage.content")}
        backgroundImage="images/puerto-banus-la-concha.jpeg"
        buttons={[
          {
            text: t("landingPage.contactUsButton"),
            to: "/contact",
          },
          {
            text: t("landingPage.learnMoreButton"),
            to: "/about",
          },
        ]}
      />

      {/* Main Sections */}
      <div className="relative h-4 bg-primary z-2"> </div>
      <main className="sticky relative bg-gray-50 z-2">
        <div className="container mx-auto py-16 lg:px-bdr px-6 space-y-16">
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
                <button
                  className="border rounded border-primary p-1 w-full 
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
              <button
                className="border rounded border-primary mt-6 px-6 py-2 
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
```

---

### Key Features of the Refactored Header
1. **Customizable**:
   - Pass the `title`, `subtitle`, `content`, and `backgroundImage` via props.
2. **Optional Buttons**:
   - If no buttons are provided (by default `buttons` is an empty array), the header will not render any buttons.
3. **Reusability**:
   - The component can now be reused in other parts of your application by simply providing the desired props.

This approach makes the component modular and easy to maintain. 🎉

# ASK MODEL BELLOW