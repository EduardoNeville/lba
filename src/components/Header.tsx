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
