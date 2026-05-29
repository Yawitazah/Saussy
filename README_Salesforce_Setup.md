# Eastland Yards — Salesforce Email Template Setup

This folder contains an HTML email template for the **4% Buyer Agency Commission**
opportunity at Eastland Yards. Email clients (Outlook, Gmail, etc.) block
base64-embedded images, so the template references images by **URL placeholder**.
You upload the images once, then paste their URLs into the template.

## Files you'll use

| File | What it is |
|------|------------|
| `Eastland_Yards_Salesforce_Email.html` | The email template (paste into Salesforce, HTML source view) |
| `../assets/email_hero.png` | Hero banner (1200×600) with the "4%" headline baked in |
| `../assets/lot115_hero.jpg` | Photo for the 9109 Maybry Park (Lot 115) card |
| `../assets/lot116_hero.jpg` | Photo for the 9113 Maybry Park (Lot 116) card |
| `../flyers/Eastland_Yards_Lot115_Agent_Flyer.pdf` | One-page agent flyer, Lot 115 |
| `../flyers/Eastland_Yards_Lot116_Agent_Flyer.pdf` | One-page agent flyer, Lot 116 |

## Step 1 — Host the 3 images

In Salesforce: **Setup → Files** (or your email image library / a CDN). Upload
`email_hero.png`, `lot115_hero.jpg`, `lot116_hero.jpg` and copy each one's
**public URL**. (In Lightning email builder you can also use *Insert Image*,
which hosts the file and gives you a URL automatically.)

## Step 2 — Replace the placeholders

Open `Eastland_Yards_Salesforce_Email.html` and swap these tokens for real URLs:

| Placeholder | Replace with |
|-------------|--------------|
| `{{HERO_IMAGE_URL}}` | public URL of `email_hero.png` |
| `{{LOT115_IMAGE_URL}}` | public URL of `lot115_hero.jpg` |
| `{{LOT116_IMAGE_URL}}` | public URL of `lot116_hero.jpg` |
| `{{LOT115_FLYER_URL}}` | link to the Lot 115 flyer PDF (or remove the button — see below) |
| `{{LOT116_FLYER_URL}}` | link to the Lot 116 flyer PDF |

The recipient's first name is already wired up as `{{{Recipient.FirstName}}}`
(Salesforce Lightning merge syntax) — leave it as-is.

> **Flyers:** you can host the two PDFs and link them via the
> `{{LOTxxx_FLYER_URL}}` buttons, **or** simply attach the PDFs to the email
> and delete the two "View Property Flyer" buttons.

## Step 3 — Load into Salesforce

- **Lightning:** Email Templates → New → switch the body to **HTML / source**
  view → paste the edited HTML.
- **Classic:** New Template → *Custom (without using Letterhead)* → HTML →
  paste into the HTML body.

Send yourself a test before using it with clients.

## Rebuilding

If you change wording, prices, or photos, edit `build/build_email.py` and
`build/build_flyers.py` and run:

```bash
pip install -r requirements.txt
python build/build_flyers.py   # regenerates flyer HTML + PDF
python build/build_email.py    # regenerates hero image + email HTML
```
