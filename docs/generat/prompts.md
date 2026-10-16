# Prompts utilitzats a Stitch

Projecte: **PixelPrat** (botiga en línia de videojocs, to acollidor i tranquil).
Eina: Stitch de Google. Pantalla dissenyada: catàleg (capçalera + targetes), en versió web i mòbil.

Els prompts estan en anglès perquè Stitch dóna millors resultats així. Es mostren en l'ordre exacte en què es van fer servir.

---

## Prompt 1 · Pantalla del catàleg (web)

```
Design a desktop catalog page for "PixelPrat", an online video game store with a cozy, calm, indie look. Clean and friendly, not aggressive or neon.

COLOR PALETTE (use ONLY these colors, no others):
- Cream #F4F1EA: page background and card background
- Dark navy #2C2E45: all main text and headings
- Soft blue #7A9ECC: primary buttons, active navigation link, focus outlines
- Peach #F2C6B8: cart badge, selected category chip, price highlight
- Grey-blue #9BA4C4: borders, dividers, secondary text, search bar outline
- Olive green #6B705C: "Sold out" badge and category label text
Text on soft blue buttons must be dark navy #2C2E45 for good contrast.

STYLE: rounded corners (12px on cards, 999px on chips and badges), soft subtle shadows, generous white space, 8px spacing grid, friendly rounded sans-serif font (like Nunito or Poppins), clear visual hierarchy.

HEADER (sticky, cream background, thin grey-blue bottom border):
- Left: logo text "PixelPrat" in bold navy with a small pixel-style game controller icon.
- Center/right: navigation links "Home" and "Catalog". The active link "Catalog" is highlighted with a soft blue underline.
- Far right: a shopping cart icon with a small round peach badge showing the number 3.

MAIN CONTENT:
1. Page title "Catalog" with a short subtitle "Cozy games for every mood".
2. A search bar with a magnifier icon, placeholder "Search games by name...", grey-blue outline, rounded.
3. A row of category filter chips: "All", "Adventure", "Action", "Strategy". "All" is selected (peach background), the others have a grey-blue outline.
4. A small text line: "Showing 12 of 12 games".
5. A responsive grid of 12 product cards, 4 columns on desktop.

PRODUCT CARD (cream background, grey-blue border, rounded 12px, soft shadow):
- A square cover area on top with a soft colored background and a large emoji or simple illustration as the game cover.
- Category label in small olive green text (e.g. "Adventure").
- Game title in bold navy (e.g. "Last Lantern").
- Short one-line description in grey-blue.
- Price in bold (e.g. "24.99 €") with a subtle peach highlight.
- Full-width button "Add to cart" in soft blue with dark navy text, rounded.

Use these games: Last Lantern, Moonlit Trails, Sky Drifters, Forgotten Isle (Adventure); Neon Rush, Iron Vanguard, Shadow Dojo, Crimson Arena (Action); Realm Architects, Star Merchants, Tiny Tactics, Clockwork Wars (Strategy).

FOOTER: simple, cream background, grey-blue top border, centered small text "© 2026 PixelPrat · Cozy games".
```

---

## Prompt 2 · Refinat 1: variant «esgotat» de la targeta

Objectiu: que els dos productes sense estoc de les dades (Forgotten Isle i Crimson Arena) siguin les targetes esgotades.

```
Keep everything exactly as it is. Only change the sold-out state: remove the "Sold out" badge from "Moonlit Trails" so it becomes a normal available card, and make "Forgotten Isle" and "Crimson Arena" the sold-out cards. For those two: dimmed cover image at 50% opacity, an olive green #6B705C "Sold out" badge in the top-left corner, and a disabled grey-blue #9BA4C4 button with the text "Sold out".
```

---

## Prompt 3 · Refinat 2: globus del carro a la capçalera

```
Keep everything else unchanged. In the header, make the cart icon larger and add a clearly visible round peach #F2C6B8 badge in its top-right corner showing the number 3, with bold dark navy #2C2E45 text.
```

---

## Prompt 4 · Refinat 3: versió mòbil (390 px)

```
Generate the mobile version of this same page at 390px width. Keep the same palette, header with the cart badge, search bar full width, category chips in a horizontally scrollable row, and the product grid in a single column, including the two sold-out cards.
```

---

## Fitxers exportats

| Fitxer | Contingut |
|---|---|
| `docs/generat/code_pc.html` | HTML i CSS de la pantalla web, tal com els va generar Stitch |
| `docs/generat/code_mobile.html` | HTML i CSS de la pantalla mòbil, tal com els va generar Stitch |
| `docs/disseny/screen_pc.png` | Captura de la pantalla web |
| `docs/disseny/screen_mobile.png` | Captura de la pantalla mòbil |
