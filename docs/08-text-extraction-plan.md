# 08 — Text Extraction (lean)

Companion to `00`–`07`. Scope: get the EN copy from `texts/text.docx` into the site, and keep FR/ES parked without building dead architecture.

## 1. Reality check

- The site already ships EN copy in `src/data/*.ts` (commit `802c376`), derived from `texts/text.docx`. The extraction is ~90% done — what remains is reconciling a handful of deltas (§2).
- Full FR/ES translations sit in `texts/Legal_Boutique_Advisers_FR_ES.docx` (ES = paragraphs 258+). **They stay there** — the docx is a fine store until a toggle is actually required (`01` parks i18n). Extracting ~400 strings into `src/data/locales/` now would be dead code with no consumer.
- Note: docx stores labels in ALL CAPS; the app stores sentence case and renders uppercase via CSS (`micro` class). That's normalization, not a delta.

## 2. Reconciliation (EN docx ↔ app) — the only real work

| Slot | docx (EN) | app today | Action |
|---|---|---|---|
| home intro heading | `MORE THAN PROPERTY.` | `More than property.` | docx |
| home hero sub | `A private advisory for international clients…` | identical | — |
| legal hero title | `LEGAL EXPERTISE AT OUR CORE` | `Legal expertise at our core` | docx |
| legal hero subline | (absent in docx) | `Legal Advisory` | keep app |
| property hero subline | `A CONSIDERED APPROACH TO PROPERTY IN SPAIN.` | `A considered approach…` | docx |
| about hero title | `BUILT ON TRUST EVOLVED AROUND OUR CLIENTS.` | `Built on trust. Evolved around our clients.` | keep app (better) |
| inquiry aside body | `Your enquiry is confidential and will be handled personally…` | `Your enquiry is read only by a partner…` | keep app (sharper) |
| footer contact | absent in EN docx | address/phones/email present | keep app |
| residences | "dejalo en blank" | 1 placeholder card | keep app (per `home.ts` note) |

Rule: docx wins on phrasing; the marked keeps are deliberate (better copy or a docx gap).

## 3. Work items

1. Apply the docx-wins strings to `src/data/*.ts` (4–5 string swaps). No shape changes, no new files.
2. `tsc -b` clean; visual smoke of the touched pages.

**When the FR/ES toggle is actually required:** unzip the docx, pull paragraphs in order (ES starts at para 258), map to the same slot shapes, wire a header control. ~15 minutes, no layout rework — every string already lives in a data file, and the toggle's own pass can move the few inline component strings (footer/form/header) at that point.

## Not doing

- `src/data/locales/{fr,es}/*.ts` sibling files now — dead code until the toggle ships.
- Moving inline component strings (footer/form/header) into data files now — refactor for a parked feature; do it in the toggle's own pass.
- A coverage/parity check script — policing dead code.
- Keeping `extract_docx.py` in the repo — one-off; recreate from this doc when needed.
