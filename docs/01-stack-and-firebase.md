# 01 — Stack & Firebase

## Source project facts (`~/projects/marisela/lba`)

- **React 18.3 + TypeScript + Vite 7**, Tailwind **3.4** (PostCSS), `react-router-dom` **7**, `firebase` **12**, `i18next` + `react-i18next`, `react-slick`/`slick-carousel`, `js-cookie`.
- Firebase config in `src/App.tsx`: `apiKey` from `import.meta.env.VITE_FIREBASE_API_KEY`; project **`legal-boutique-advisers-bf25a`** (authDomain `…bf25a.firebaseapp.com`, storageBucket `…firebasestorage.app`). `getAnalytics` initialized.
- `firebase.json`: **Web Frameworks** style — `"hosting": {"source": ".", "frameworksBackend": {"region": "europe-west1"}}`. Firebase detects Vite and builds/deploys.
- Existing tailwind tokens (`primary #8C2851`, Zesta/CocoGothic fonts) belong to the OLD brand — **not reused** visually; config gets rewritten per `02-design-system.md`.

## Keep / drop

| Dep | Verdict |
|---|---|
| react, react-dom, react-router-dom, vite, tailwind, typescript | keep |
| firebase | keep (Hosting now; Firestore for `/inquiry` + later content) |
| i18next + react-i18next + languagedetector | keep only if EN/ES ship is required — templates are EN-only. **Drop for v1**, re-add later without layout changes (all copy lives in `data/*.js` slots → trivially i18n-able). |
| react-slick / slick-carousel | **drop** — no carousel appears in any template; grids replace sliders. |
| js-cookie | drop unless consent banner mandated; use `localStorage` if ever needed. |

## Firebase reuse

- Same project `legal-boutique-advisers-bf25a`. Keep `.env` pattern: `VITE_FIREBASE_API_KEY` (never commit).
- Move config to `src/lib/firebase.ts` with **lazy init**: `initializeApp` on module load is fine for hosting/analytics, but `getFirestore` only inside `lib/submitInquiry.ts` so Firestore SDK lands in the lazy `/inquiry` chunk.
- Drop `getAnalytics` or gate behind `isSupported()` (SSR/preview safety).

### Firestore schema (v1)

- `inquiries` (write-only from client):
  `{interest, fullName, email, phone, country, message, consent, createdAt}`.
  Rules: `allow create: if request.resource.data.email is string && request.resource.data.consent == true; allow read,update,delete: if false;`
- Later (optional, client-editable): `team`, `residences`, `partners` collections with `order` field; static `data/*.js` remains the loading fallback.

### Hosting

Two valid paths; **prefer (a)** to reuse working credentials/CI:

a) Keep Web Frameworks `firebase.json` as-is → `firebase deploy` (Firebase builds Vite in `europe-west1` webapp container). SPA routing handled by frameworks adapter.
b) Switch to static: `"hosting": {"public": "dist", "rewrites": [{"source": "**", "destination": "/index.html"}]}` + `npm run build && firebase deploy --only hosting`. Required rewrite for `/about` etc. deep links either way.

Custom domain/DNS already configured for the project — no change.

## Env & scripts

- `.env.local`: `VITE_FIREBASE_API_KEY=…` (copy from source project's env).
- Scripts unchanged: `dev`, `build` (`tsc -b && vite build`), `preview`.
