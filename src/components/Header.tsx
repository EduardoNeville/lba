import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
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
    <header className="sticky top-0 text-pink-50 relative z-0">
      <div className="container mx-auto lg:px-bdr px-6 py-16 text-center relative z-10 text-primary">
        <h1 className="text-flash uppercase">{title}</h1>
        <p className="mt-4 text-title">{subtitle}</p>
        <p className="mt-6 text-content">{content}</p>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              onClick={() => window.scrollTo(0, 0)}
              className="border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-100 text-primary transition uppercase text-button"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-30 bg-transparent"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
    </header>
  );
}
