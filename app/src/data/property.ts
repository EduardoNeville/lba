import heroImage from "../assets/lifestyle-golf.jpg";
import bandVilla from "../assets/band-villa.jpg";

// Non-text data for the Property page — copy lives in src/data/locales/property.ts
// The residences strip is fed by Firestore (see PropertyPage), not by this file.
// Hero placeholder: the client sends her golf photograph for the split hero
// (see docs/15-web-edits-plan.md §14 / Waiting on the client).
export const hero = { image: heroImage };

// The brown opportunities box: the client's villa photograph replaces the
// potted-plant terrace shot (part 2).
export const band = { image: bandVilla };
