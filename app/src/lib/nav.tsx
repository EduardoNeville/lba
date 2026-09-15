import { useLang } from "../lib/lang";
import { NAV } from "../data/navigation";
import {
  nav as navEn,
  footer as footerEn,
  ui as uiEn,
} from "../data/locales/en";
import {
  nav as navFr,
  footer as footerFr,
  ui as uiFr,
} from "../data/locales/fr";
import {
  nav as navEs,
  footer as footerEs,
  ui as uiEs,
} from "../data/locales/es";

export function useNav() {
  const { lang } = useLang();
  const labels: Record<string, string> =
    lang === "fr"
      ? { ...navEn.label, ...navFr.label }
      : lang === "es"
        ? { ...navEn.label, ...navEs.label }
        : navEn.label;
  return NAV.map((item) => ({
    key: item.key,
    to: item.to,
    label: labels[item.key] ?? item.key,
  }));
}

export function useFooter() {
  const { lang } = useLang();
  if (lang === "fr") return { ...footerEn, ...footerFr };
  if (lang === "es") return { ...footerEn, ...footerEs };
  return footerEn;
}

export function useUi() {
  const { lang } = useLang();
  if (lang === "fr") return { ...uiEn, ...uiFr };
  if (lang === "es") return { ...uiEn, ...uiEs };
  return uiEn;
}

export const FOOTER_NAV_KEYS = [
  "property",
  "legal",
  "privateClient",
  "about",
] as const;
export type FooterNavKey = (typeof FOOTER_NAV_KEYS)[number];
