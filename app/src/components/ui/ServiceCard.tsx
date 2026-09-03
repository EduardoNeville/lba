import { Link } from "react-router-dom";
import { Checklist } from "./Checklist";

export function ServiceCard({
  image,
  alt,
  num,
  title,
  body,
  checks,
  link,
}: {
  image?: string;
  alt?: string;
  num?: string;
  title: string;
  body: string;
  checks?: string[];
  link: string;
}) {
  return (
    <Link to={link} className="group flex flex-col">
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={alt ?? ""}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      {num && <p className="micro mt-4 text-oxblood">{num}</p>}
      <h3
        className={`font-display text-sm uppercase tracking-[0.12em] ${num ? "mt-2" : "mt-4"}`}
      >
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-taupe">{body}</p>
      {checks && (
        <div className="mt-4">
          <Checklist items={checks} />
        </div>
      )}
    </Link>
  );
}
