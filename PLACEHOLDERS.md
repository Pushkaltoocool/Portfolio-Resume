# Images and links still needed

Anything under "still needed" renders a generated grey stand-in on the site. Nothing is broken, but each one
is visibly a placeholder until the real file lands.

## How to replace an image

Save your file into `react-app/public/assets/`, then update the one path in
`react-app/src/constants/index.js` (search for the old filename, every placeholder path is tagged
`// PLACEHOLDER`). Screenshots are worth converting to WebP first, typically a 10x saving with no visible
loss.

---

# Done

| Asset | File | Note |
|---|---|---|
| All 7 project screenshots | `*-demo.*` | no card shows "screenshot pending" any more |
| NAISC 2026 award photo | `naisc-2026-comp.jpg` | |
| Dell Innovate Dash award photo | `dell-innovate-dash-comp.webp` | |
| ArchAIve logo | `archaive-logo.jpg` | |
| AMZTech.ai logo | `amztech-logo.png` | |
| NAISC 2026 + Dell LinkedIn links | | live on their award cards |

---

# Still needed: images

## 1. Project logos

Small square marks, shown in the rounded tile on each project's detail page header beside the title.

| File | What to send | Size |
|---|---|---|
| `logo-neopulse.png` | NeoPulse logo | 400 x 400 |
| `logo-careswap.png` | CareSwap logo | 400 x 400 |
| `logo-factoriq.png` | FactorIQ logo | 400 x 400 |

## 2. Award photo

| File | What to send | Size |
|---|---|---|
| `award-apsara.png` | Apsara Conference photo, or the Alibaba Cloud feature | 1000 x 750 |

## 3. Organisation logos

Beside each role in the Experience timeline, and on the Education cards. Transparent PNG is ideal, they sit
on a dark tile.

| File | What to send | Size |
|---|---|---|
| `logo-epitex.png` | epitex logo | 400 x 400 |
| `logo-nyp.png` | Nanyang Polytechnic crest | 400 x 400 |
| `logo-woosong.png` | Woosong University crest | 400 x 400 |

> The AMZTech, DIS and epitex logos used to point at LinkedIn CDN URLs that **expired on 26 Feb 2026**, so
> they had been broken on the live site since then. ArchAIve, AMZTech and DIS are fixed; epitex still needs
> yours.

## 4. Certification badges

From Credly, the official badge art.

| File | What to send | Size |
|---|---|---|
| `cert-aws-ccp.png` | AWS Certified Cloud Practitioner badge | 400 x 400 |
| `cert-snowpro.png` | SnowPro Associate: Platform badge | 400 x 400 |

## 5. Portrait

| File | What to send | Size |
|---|---|---|
| `portrait.png` | A square headshot for the About section | 900 x 900 |

---

# Still needed: links and facts

Each is left blank rather than guessed, so nothing false is published.

1. **NeoPulse, CareSwap and FactorIQ repo / live demo URLs.** All blank. Those detail pages show a
   "Request a walkthrough" button instead of dead links. For FactorIQ you may want it kept private, given the
   commercial discussions.
2. **LinkedIn post link for the Apsara invitation.** Every other award now links to a post.
3. **The 2026 competition's name.** Your trophy photo's backdrop reads **"National AI Student Challenge
   2026"** and you called it "NAISC 26", but the site names that award **"National AI Student Developer
   Conference"**, per the content brief. If it is the Challenge both years that is a much stronger story
   (2025 Silver with SGResolve, 2026 1st Place with NeoPulse) and it should be renamed.
4. **AuraSentinel and AI Learning System dates.** Neither is recorded anywhere in the repo. AuraSentinel is
   sorted as Dec 2025, inferred from its LinkedIn post postdating the MaritimeONE one, and displays as just
   "2025". AI Learning System has no date at all and sorts last.
5. **SGResolve demo link.** The old `lnkd.in/enzJHjgq` shortlink was never resolved, so it is gone from the
   award copy. The site still links to `sgresolve.netlify.app`, which was already there. Confirm that is right.
6. **Internship dates.** Not published anywhere yet: NYP's email said 29 Mar 2027 to 28 Jan 2028, you said
   1 Apr 2027 to 30 Mar 2028. Tell me which if you want availability shown.
7. **Mobile framework** for the AMZTech project stays unnamed, per your note that it is undecided.
8. **`trophy.png`, `silver-medal.png`, `top-5.png`, `project-logo5.png`** are unreferenced but look like
   intended art rather than dead weight, so they were left in place. Say if they can go.

# Judgement calls

- **Kept AuraSentinel and the AI Learning System.** Neither is in the content brief, but both were already on
  the site with working demos, and HacX has a LinkedIn post behind it.
- **Academic honours live in Education, not Awards**, rather than being duplicated as award cards.
- **FactorIQ is labelled "in commercial discussions"**, never as a signed deal.
- **Woosong is marked "In progress"**, since the exchange runs Aug to Dec 2026.
- **No em dashes** in any copy written for the site, per your preference.
