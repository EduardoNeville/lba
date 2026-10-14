import heroImage from "../assets/lifestyle-golf.jpg";
import approachImage from "../assets/panel-legal.jpg";
import bandImage from "../assets/pc-terrace-hero.jpg";
import ctaCoast from "../assets/cta-coast.jpg";

// Non-text data for the Property page — copy lives in src/data/locales/property.ts
// The residences strip is fed by Firestore (see PropertyPage), not by this file.
export const hero = { image: heroImage };

// Placeholders: the client sends the final imagery for the curated split and the
// featured grid (see docs/13-web-edits-plan.md §3).
export const approach = { image: approachImage };
export const band = { image: bandImage };

export const cta = { image: ctaCoast };
