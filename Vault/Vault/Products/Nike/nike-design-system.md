# NIKE PODIUM — VISUAL DESIGN SYSTEM
> For Claude Code · Cristian @ Interpublic
> Built on the Podium system developed by Kurppa Hosk for Nike.
> Use this as the visual DNA for all Nike-adjacent creative work: product photography prompts, campaign assets, UI components, and AI image generation briefs.

---

## CONTENTS
- 01 — Color System
- 02 — Typography Scale
- 03 — Layout & Grid
- 04 — Spacing Tokens
- 05 — Motion Principles
- 06 — Design Principles (Podium)
- 07 — AI Image Prompt Templates (Nano Banana Pro)
- 08 — Prompt Engineering Rules

---

## 01 — COLOR SYSTEM

Nike operates on maximum contrast. The black/white dualism dominates every layout. Orange (`#FA5400`) is reserved exclusively for high-intention moments: action, urgency, sport. **Never use orange decoratively.** Grayscale is the default range for all UI chrome.

**COLOR RULE**
One dominant contrast pair per layout (Black + White). Orange enters only when there is a clear call to action or a single point of emphasis. Any design using orange in more than one context per view is violating the system.

| Token | Hex | Usage |
|---|---|---|
| Black | `#111111` | Primary / hero backgrounds |
| White | `#FAFAFA` | Default / light surfaces |
| Orange | `#FA5400` | Accent / CTAs / action only |
| Charcoal | `#1A1A1A` | Dark surfaces / display type |
| Gray 700 | `#424242` | Body text |
| Gray 500 | `#757575` | Secondary text / borders |
| Gray 300 | `#CCCCCC` | Dividers / rules |
| Gray 100 | `#F5F5F5` | Cards / containers / surfaces |

---

## 02 — TYPOGRAPHY SCALE

Nike's display type is compressed, ultra-heavy, and all-caps. Headlines carry emotion — they shout. Body type steps down to neutral, clean, and breathable. The jump between weights is dramatic and intentional. Tight negative tracking (`-0.03em`) on hero text is non-negotiable.

**TYPE RULES**
- Display type is ALL CAPS always. Never sentence case at hero scale.
- Tracking is negative on display (`-0.03em`), neutral on body (`0em`), positive on labels (`+0.10em`).
- Font pairing: **Bebas Neue** (or equivalent compressed sans) for display / **Barlow Condensed** for body.
- Weight jumps are extreme: **800 → 400**. Never 700 → 600 — the gap must be felt.
- Line height compresses with scale: display at **0.88**, body at **1.6**.

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Display | 72px | 800 | -0.03em | ALL CAPS · hero · one short phrase |
| Headline | 40px | 700 | -0.02em | Section title |
| Title | 24px | 600 | -0.01em | Product name, card title |
| Body | 16px | 400 | 0em | Primary reading text |
| Label | 11px | 500 | +0.10em | ALL CAPS · tags · categories |

---

## 03 — LAYOUT & GRID

Nike's layout is built on restraint and scale. Maximum white space around product. Content never fights itself. Hierarchy is extreme — one dominant element per view. Padding scales with breakpoint but always generous.

**GRID**
12-column grid. Base unit: **8px**. Gutters: 24px desktop, 16px mobile. Margins: 5% desktop, 24px mobile.

**LAYOUT PATTERNS**

**Hero / Full Bleed**
Edge-to-edge. Image dominant. Text minimal, anchored bottom-left. Single message. No competing elements.

**Card Grid**
Equal units. Strict 24px spacing. Zero decorative borders. Product image occupies 80% of card height.

**Editorial Split**
Asymmetric: 60/40 or 66/33. Image left, copy right — or reversed for rhythm. **Never 50/50** (too neutral).

**Campaign Banner**
16:9 aspect ratio. One typographic hero, one product, one CTA. Nothing else allowed in frame.

---

## 04 — SPACING TOKENS

All spacing is derived from an **8px base unit**. Never use arbitrary values. The scale jumps deliberately — small gaps read as relationship, large gaps read as separation.

| Token | Value | Multiplier | Usage |
|---|---|---|---|
| sp-01 | 4px | 0.5× | Micro — icon-to-label, inline gap |
| sp-02 | 8px | 1× | Tight — related element gap |
| sp-03 | 16px | 2× | Default — component internal spacing |
| sp-04 | 24px | 3× | Comfortable — card padding, gutter |
| sp-05 | 40px | 5× | Section — between content blocks |
| sp-06 | 64px | 8× | Layout — between major sections |
| sp-07 | 96px+ | 12×+ | Hero — editorial breathing room |

---

## 05 — MOTION PRINCIPLES

Motion is inspired by the athlete's journey — decisive, powerful, purposeful. Every transition mirrors athleticism: fast entry, precise stop. Motion has direction and intent. **Never animate without a reason.**

**EASING**
```
Primary:  cubic-bezier(0.16, 1, 0.3, 1)    /* ease-out-expo */
Data:     linear
Physical: spring(stiffness: 300, damping: 25)
```

**DURATION**
```
Micro:    150ms   /* hover states, toggles */
Standard: 250ms   /* panel open, card expand */
Hero:     800ms   /* page entry, hero reveal */
Max:      1000ms  /* never exceed this */
```

**RULES**
- Animate only `transform` and `opacity`. Never animate `width`, `height`, or `color` directly.
- Entry: fast (ease-out-expo). Exit: slightly slower, ease-in.
- Stagger reveals by **80ms** per element when animating lists.
- No bounce on dismiss. Bounce only on entry of physical/playful elements.
- Wrap every animation in `prefers-reduced-motion: no-preference`.

---

## 06 — DESIGN PRINCIPLES (PODIUM)

Six structural principles extracted from the Kurppa Hosk × Nike Podium system. They govern every design decision — from AI image prompts to UI component architecture.

**— Athlete-first hierarchy**
Every layout decision serves the athlete's need. Product and performance lead; branding follows. Remove anything that competes with the hero element. If two elements compete for attention, one must be eliminated.

**— Maximum contrast**
Black on white or white on black. No middle ground in hero moments. Accessibility and impact are the same objective. The eye should be able to read the hierarchy in 300ms without trying.

**— Scale as emotion**
Typography and imagery scale dramatically across breakpoints. Large type = energy. Small type = function. Never reverse this relationship. Display type is emotion; body type is information.

**— Fewer, better elements**
One message per view. One CTA per section. White space is not emptiness — it is the product breathing. Every element earns its place by removing something else. If you cannot justify an element's presence, remove it.

**— System consistency**
Tokens propagate — color, spacing, type. No local decisions that override the system. Flexibility lives in composition, not in exceptions. When in doubt, follow the token, not the instinct.

**— Motion tells a story**
Transitions mirror athleticism: fast entry, precise stop. Motion has direction and purpose. Never animate without intention. The animation should communicate what is happening, not just decorate it.

---

## 07 — AI IMAGE PROMPT TEMPLATES (NANO BANANA PRO)

Calibrated for **Nano Banana Pro** (Freepik / Gemini 3.1 Flash Image). Each follows the 6-block NB2 creative brief structure:

> photograph type → product identity → angle/composition → environment/light → lighting setup → camera + paint + grade

**GOLDEN RULE**
Never write tag soup. Always write a creative brief narrative. NB2 is a reasoning model — treat it like a full photography crew. Name real camera bodies, real lenses, real locations. Positive framing only (no "no" or "avoid").

---

### QUICK REFERENCE — ASSET TYPE VS CONSTRAINTS

| Asset Type | Constraints |
|---|---|
| Studio product shot | Pure black or white bg · edge-lit · max contrast · no set dressing · single product · Hasselblad H6D-400c · HC 120mm f/4 · f/8 · ISO 100 |
| Hero – athlete | Real athlete · kinetic blur edges · dark moody bg · single directional light · sweat detail · dramatic crop · Nike apparel visible, not dominant |
| Campaign banner | Ultra-compressed bold headline type · white on black or orange accent · minimal imagery · strong hierarchy · edge-to-edge layout · editorial feel |
| Product – white studio | Pure white cyclorama · high-key even illumination · ground shadow only · Phase One IQ4 · Schneider 110mm · f/11 · ISO 50 · max sharpness |
| Product – dark studio | Matte black backdrop · softbox 45° camera-left · rim light camera-right 30% intensity · snoot overhead for midsole · deep shadow retention |

---

### FULL TEMPLATE — PRODUCT STUDIO (DARK)

```
Commercial product photograph. [PRODUCT FULL NAME] in [COLOR DESCRIPTION].
[ANGLE]: lateral three-quarter profile, shoe angled 25° to camera axis,
camera at 18cm ground height. Full product visible, no cropping.

Pure black seamless backdrop, matte black floor with imperceptible
surface reflection. Studio environment, no ambient light pollution.

Primary light: large softbox 45° camera-left, 120cm from product at 80cm
height. Fill: narrow strip light camera-right, 30% intensity. Accent: snoot
overhead grazing midsole to reveal geometry and gradient.

Hasselblad H6D-400c, HC Macro 120mm f/4, f/8, 1/125s, ISO 100.
Medium format rendering: extreme material differentiation.

[PAINT BEHAVIOR]: upper mesh texture, midsole semi-gloss gradient,
Swoosh gloss specular, outsole flat matte black.

Color grade: deep blacks crushed, white upper at full brightness without
blowout, accent color fully saturated. Single product composition,
clean image, no markings. Preserve composition and colors exactly. 4K output.
```

---

## 08 — PROMPT ENGINEERING RULES

These rules apply to every AI image generation prompt created in this system, regardless of model (Nano Banana Pro, FLUX.2, Sora, Kling, or others).

**ALWAYS**
- Open every prompt with the type of photograph (`Commercial product photograph` / `Automotive editorial photograph` / `Motorsport action photograph`).
- Name real camera hardware: **body + lens + aperture + shutter + ISO**. This activates NB2's optical signature learning.
- Describe every light source with: type, position, direction, intensity relative to others, and behavioral effect on surface.
- End every prompt with: **"Preserve composition and colors exactly. 4K output."**
- Use positive framing for all constraints. Never use "no", "avoid", or "don't".
- Describe paint/material surface behavior: gloss, matte, satin, metallic, clearcoat, specular behavior.
- Name real locations when shooting exterior: Porto Ribeira, Stelvio Pass, Circuit de Catalunya — NB2 uses search grounding.

**NEVER**
- Write tag soup: "cinematic, 8k, dramatic, stunning, beautiful, masterpiece."
- Use abstract quality descriptors without physical anchors ("luxurious", "aggressive", "sporty").
- Skip the camera specification — it is the highest-leverage single decision.
- Skip the lighting description — light defines material, material defines product.
- Use negative framing.

**POSITIVE CONSTRAINT TRANSLATIONS**

| Wrong (negative) | Correct (positive) |
|---|---|
| No people | Solitary product, no human presence |
| No other products | Single product composition |
| No text overlay | Clean image, no markings, no watermark |
| No background clutter | Seamless empty backdrop |
| Don't distort the product | Preserve body geometry exactly |
| Don't change the color | Preserve colors exactly |
| No shadows on bg | Shadow confined to ground plane contact point only |

---

---

## 09 — VISUAL REFERENCE STANDARD

Full catalog of 17 reference images is in `refs-catalog.md`. Summary of the visual standard:

**6 visual archetypes in order of frequency:**
1. **Dark Studio** — pure black bg, product floating, rim-lit, midsole snoot. Primary format.
2. **Athlete Editorial** — extreme low angle, shoe dominant foreground, fashion editorial.
3. **Outdoor/Action** — worm's eye, motion blur, real environment, kinetic energy.
4. **Gradient BG** — dark radial gradient echoing product colorway, product floating.
5. **Atmospheric** — dark cinematic environment or abstract blur. Brand storytelling.
6. **Tech/Scan** — teal x-ray glow on black, HUD grid overlay, data callouts.
7. **Heritage Print** — white bg, flat-lay, JUST DO IT, classic minimalism.

**4 non-negotiables across all refs:**
- Product is always in focus and perfectly readable
- Portrait format default (4:5 or 9:16) — landscape only for banners
- Product floats or is shot from below — never eye-level flat placement
- One dominant visual statement per frame — no competing FX

**Camera height rule:** 60% of refs are ground level (0–20cm). Nike shows shoes from below — the athlete's POV looking down at their foot, or the ground looking up. Never a bystander's eye-level view.

---

*NIKE PODIUM DESIGN SYSTEM — End of Document*
*Source: PDF by Cristian @ Interpublic, based on Kurppa Hosk × Nike Podium case study.*
*Visual refs: 17 images analyzed in `refs/` folder, cataloged in `refs-catalog.md`.*
