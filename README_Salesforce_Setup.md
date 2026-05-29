# Eastland Yards — Salesforce Email Template Setup

HTML email + agent flyers for the **4% Buyer Agency Commission** promotion at
Eastland Yards (Charlotte, NC). Agent: **Thomasena Washington**, Saussy Burbank.

## Which file to use

| File | What it is |
|------|------------|
| **`Eastland_Yards_Salesforce_Email_v2.html`** | **CURRENT** email template. Paste into Salesforce (HTML/source view). Mobile-safe rewrite. |
| `Eastland_Yards_Salesforce_Email.html` | OLD version — do not use (broke on mobile Gmail). |
| `Eastland_Yards_Lot115_Agent_Flyer.pdf` | One-page agent flyer, Lot 115 (9109 Maybry Park, $529,900) |
| `Eastland_Yards_Lot116_Agent_Flyer.pdf` | One-page agent flyer, Lot 116 (9113 Maybry Park, $549,900) |
| `logo-white.png` | White Saussy Burbank logo, transparent (PNG, NOT SVG) |
| `Saussy Burbank Eastland Yards Community.png` / `_cropped.png` | Hero community photo |

## What v2 fixed (vs. the old version)

The old email scrambled on mobile (especially the Gmail Android app). Three causes,
all fixed in v2:

1. **Hero used `position:absolute` / `transform` / `flex`** — Gmail strips these, so the
   headline detached from the photo. v2 rebuilds the gradient ribbon with a
   vertically-centered table cell + CSS `linear-gradient` background. Same look
   (navy fading to transparent, centered, not touching top/bottom) with **no absolute
   positioning**, so it can't scramble.
2. **Salesforce injected oversized inline widths** (`width:674px`, `max-width:1468px`)
   onto images → mobile overflow. v2 uses `width:100%; max-width; height:auto`.
3. **Logo was an SVG** — Gmail/Outlook don't render SVG, and it was squished to the
   wrong aspect ratio. v2 uses `logo-white.png` at its true proportions.

## CRITICAL — image hosting format

All images in the email are `<img src>` tags, so each URL **must serve the raw image
bytes** (`Content-Type: image/png` or `image/jpeg`). Salesforce has THREE link formats
and only ONE works for inline images:

| Format | Example | Serves | Use for |
|--------|---------|--------|---------|
| ✅ **Asset file (public)** | `.../file-asset-public/NAME?oid=...` | the image | **email `<img>` images** |
| ❌ Public link / distribution | `.../sfc/p/...` | an HTML page | **PDF flyer button links only** |
| ❌ Chatter download | `.../sfc/servlet.shepherd/version/download/...` | login redirect | nothing external |

**Rule of thumb:** if the URL contains `file-asset-public`, it's an image and works.
If it contains `/sfc/p/` or `servlet.shepherd`, it will show as a **broken image**.
(The `/sfc/p/` format IS correct for the clickable "View Property Flyer" PDF buttons,
because those are links the recipient clicks — not images.)

All five image assets in v2 are already wired to working `file-asset-public` URLs:
logo (header + footer), hero community photo, Lot 115 photo, Lot 116 photo, headshot.

## Steps to deploy

1. Open `Eastland_Yards_Salesforce_Email_v2.html`.
2. In Salesforce: Email Templates → New → switch the body to **HTML / source** view → paste.
   (The recipient first name is wired as `{{{Recipient.FirstName}}}` — leave as-is.)
3. Send yourself a test, then **open it on a phone (Gmail app) AND in Apple Mail / Gmail web**.

## Client rendering notes (hero background photo)

The hero photo is a CSS background image with live text over it. Background-image
support varies, but it never breaks — worst case is a clean fallback:

- **Apple Mail, Gmail (web), iOS Mail:** full photo + gradient ribbon + text. ✅
- **Gmail app (Android):** that app blocks background images, so the hero shows as a
  solid-navy band with the white "4%" text (no photo). Readable and on-brand.
- **Outlook desktop:** photo shows via VML; the CSS gradient doesn't render, so text
  sits directly on the photo.

## Rebuilding assets

- `build_flyers.js` — flyer HTML + PDF
- `build_hero.js` — baked hero image (backup; v2 uses live CSS, not a baked image)
- `build_logo.js` — rasterize `logo-white.svg` → `logo-white.png`
