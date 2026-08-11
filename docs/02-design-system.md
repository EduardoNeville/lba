# 02 — Design System

## Tokens (tailwind.config.js `extend`)

```js
colors: {
  cream:     "#F3EEE5",  // page bg
  parchment: "#ECE5D8",  // alternate band / panel bg
  ink:       "#241E18",  // headings, primary text
  taupe:     "#7D7266",  // body copy, secondary
  hairline:  "#D9D0C0",  // 1px rules & borders
  oxblood:   "#6D2A24",  // accent: buttons, links, icons
  maroon:    "#4A1D1A",  // footer bg (deep oxblood)
},
fontFamily: {
  display: ['"Cormorant Garamond"', 'serif'],  // headings, serif italics
  micro:   ['"Inter"', 'system-ui', 'sans-serif'], // optional; serif small-caps acceptable
},
```

Fonts via `@fontsource` or Google Fonts `<link>` in `index.html` (display=swap). Fallback stack `Georgia, serif` keeps look offline.

## Type voices

| Voice | Classes | Use |
|---|---|---|
| Display H1 | `font-display uppercase text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-wide` | page heroes |
| Display H2 | `font-display uppercase text-2xl md:text-4xl leading-snug` | section heads |
| Display sentence | `font-display text-2xl md:text-3xl leading-snug` (no uppercase) | inquiry/CTA emotional lines |
| Micro label | `text-[10px] md:text-[11px] uppercase tracking-[0.2em..0.3em]` | nav, eyebrows, buttons, roles, footer |
| Body | `text-[13px] md:text-sm leading-relaxed text-taupe max-w-prose` | paragraphs |
| Serif italic | `font-display italic text-sm md:text-base` | sublines |

## Devices (the visual grammar)

- Hairline rules (`border-hairline`) as structure: section tops, list separators, panel borders, column dividers.
- Eyebrow = micro label + 32px left rule (`w-8 h-px bg-ink/60`).
- Sharp corners everywhere; `rounded-none` is the default by omission.
- No shadows/gradients; scrims only: `bg-ink/35..50` over hero/CTA images.
- Icons: inline SVG, `stroke="currentColor" strokeWidth={1}`, `h-5..7 w-5..7`, color `text-oxblood`.
- Hover language: links → oxblood + arrow nudge (`group-hover:translate-x-1`); buttons → bg swap (`oxblood↔ink` or invert); images → optional slow scale on property cards only.

## Primitives (props contract)

```
Container            {children, wide?}        max-w-[1200px] mx-auto px-6 md:px-10
Eyebrow              {children, center?}      rule + micro label
ButtonLink           {to, variant: solid|outline, tone: light|dark, children}
ArrowLink            {to, children}           micro + → nudge
StatementBand        {children}               centered serif sentence, border-b
PageHero             {eyebrow, title, subline?, body?, cta?, image, alt, titleCase: upper|sentence}
CtaBand              {heading, subline?, cta, variant: image|accent, tone, image?}
Checklist            {items, marker: square|check, columns: 1|2}
ValueItem            {icon, title, body, link?}   centered icon column
ServiceColumn        {icon, title, body, link}    left-aligned stacked (property trio)
ContactPoint         {icon, title, sub}           icon-left row item
ServiceCard          {image, alt, title, body, checks?, link}
PropertyCard         {image, alt, title, meta, slug, showLink?}
Field                {id, label, error?, children(control)}
MosaicGrid           {images[6]}
SiteHeader           uses data/navigation.js (dropdowns / mobile accordion)
SiteFooter           expanded dark 4-col (inquiry.md §1.4)
```

## Spacing rhythm

- Sections: `py-20 md:py-28`; hero `min-h-[75vh]`; container as above.
- Grid gaps: `gap-8..14` for splits, `gap-5..8` for card grids.
- Breakpoints: mobile-first; `sm` = 2-col grids; `md` = 3-col/rows; `lg` = full layouts + nav visible.

## A11y contract (site-wide)

- `focus-visible:outline outline-oxblood outline-offset-4` on all interactives.
- Single tab stop per card (`<a>` wrapper, inner arrows `aria-hidden`).
- Real `<label for>`, `role="alert"` field errors, radios for interest selector.
- Decorative images/botanicals `alt=""` + `aria-hidden`.
- Contrast: ink/oxblood on cream AA; never taupe-on-parchment for micro text; scrims guarantee cream-on-image.
