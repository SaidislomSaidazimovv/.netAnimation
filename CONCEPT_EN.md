# Butterfly Challenge — Standalone Animated Microsite
## Project Concept (v5.0)

**Date:** 2026-05-14

---

## 0. EXECUTIVE SUMMARY

### The project in one sentence:
We are building a **standalone, cinematic scroll-driven animated microsite** for the Butterfly Challenge movement — a complement to `butterflychallenge.net`, delivering a 4-second "reveal" experience that engages users on an emotional level.

### Why this is needed:
- The main site **informs** — the new microsite **makes people feel**
- This is an industry-standard approach used by Apple iPhone reveal, Ford Mustang launch campaigns
- High viral content potential on social media (ideal for sharing on TikTok / Instagram)
- An emotional entry point for the movement

### Key numbers:
| Metric | Value |
|---|---|
| **Budget** | $15 (1-month AI tool subscription) |
| **Hosting** | Vercel (free) |
| **Time** | 3-4 days |
| **Start date** | 2026-05-14 |
| **Launch date** | 2026-05-17 |
| **Team** | Project Owner + Developer + AI Assistant |
| **Will the main site change?** | NO — it will not be touched |
| **Scope** | Hero/header section only (standalone cinematic experience) |

### Core technology:
Next.js + GSAP + Canvas (the **Scroll-Driven Image Sequence Animation** technique used by Apple/Ford/BMW). Asset generation via AI video, then extracted into 240 frames using FFmpeg.

### Risk level:
**Low-to-medium** — proven technology, AI tools are available, small budget. Main risk: AI video quality may not be acceptable on the first attempt (mitigation: multiple iterations).

---

## 1. PROJECT GOAL AND POSITIONING

### What this is:
The **animated version** of `butterflychallenge.net` — built as a **completely separate** site. Like the Ford "Rediscover the Classics" campaign, it consists of **only a header + hero** cinematic landing experience. The animation plays as the user scrolls, and at the end they are directed to the `.net` site.

### What this is NOT:
- Not an update to `butterflychallenge.net`
- Not adding animation to the main site
- The main site's code will not be touched
- Text/content from the `.net` site will not be reused

### CONTENT POLICY (important):
This animated microsite has **its own dedicated content**. Text from the `.net` site is **not copied**. Only:
- Its own minimal cinematic copy (title + tagline + interaction prompt + CTA)
- Like the Ford reference — the animation itself is the primary "message," text is minimal
- The only connection: the final CTA button links to `butterflychallenge.net`

### Relationship:
```
┌──────────────────────────────┐         ┌─────────────────────────────┐
│   butterflychallenge.net     │         │  NEW: animated microsite    │
│   (existing — ready)         │ ◄─────► │  (separate project, from 0) │
│                              │  link   │                             │
│   - Core information         │         │  - Cinematic reveal         │
│   - Resources, partners      │         │  - Scroll experience only   │
│   - Press kit                │         │  - "Experience the movement"│
└──────────────────────────────┘         └─────────────────────────────┘
```

### Primary goal:
In the first 5-10 seconds after a user lands on the page, they should feel the emotional power of the **"Butterfly Sign"** gesture — just like Ford's classic car is mystically revealed from beneath a cover. At the end of the experience — a link to `butterflychallenge.net`.

---

## 2. ANIMATION TECHNIQUE (official name)

**Scroll-Driven Image Sequence Animation**
(synonyms: Frame Scrubbing on Scroll • Scrollytelling Pin • Canvas Frame Sequencer)

### Mechanism:
1. **240 image frames** are prepared in advance (AI generation)
2. Images are converted from **PNG → WebP** (~70% smaller)
3. The current frame is drawn inside an **HTML Canvas**
4. **GSAP ScrollTrigger** maps the scroll position to a 0.00 → 1.00 range
5. This progress value is converted to `frameIndex = Math.floor(progress * 239)`
6. No video element is used — each frame is a separate image

### Why not a `<video>` tag with `currentTime`:
- Glitches and stalls on iOS Safari
- No frame-perfect accuracy (keyframe seeking lag)
- Freezes on reverse scroll
- Breaks on fast scrolling
- **Canvas sequence is the industry standard** (Apple, Ford, BMW use this technique)

---

## 3. ASSET PRODUCTION PIPELINE

### Step-by-step:

**Step 1: AI video generation** (Runway Gen-3 or similar)
- One continuous 4-second video
- 1080p (minimum) or 4K, 60fps recommended
- Done by the developer

**Step 2: Frame extraction (FFmpeg)**
```bash
# Extract frames from the video at 60fps
ffmpeg -i reveal_animation.mp4 -vf fps=60 frames/frame_%04d.png

# Output: frame_0001.png ... frame_0240.png (4 sec × 60fps = 240 frames)
```

**Step 3: WebP optimization**
```bash
# Convert each PNG to WebP (70-80% smaller)
for f in frames/*.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done

# Smaller version for mobile
for f in frames/*.webp; do
  ffmpeg -i "$f" -vf scale=720:-1 "mobile/$(basename $f)"
done
```

**Step 4: Integration into the site**
- Upload to the ScrollSequence Canvas player component
- Display with lazy loading

---

## 4. FORD → BUTTERFLY CHALLENGE mapping (1:1)

| Original Ford element | Butterfly Challenge equivalent |
|---|---|
| Classic Mustang car | Human silhouette (in Butterfly Sign pose) |
| White cloth/sheet (cover) | **Silk-like flowing fabric** — which transforms **into butterflies** |
| Crossed neon line lights | Soft backlit butterfly wing contour (neon glow) |
| Concrete garage | Open cosmic / infinite horizon background (cosmic dust + bokeh) |
| "REDISCOVER the CLASSICS" | **"THE BUTTERFLY SIGN"** (main title, original copy) |
| Subtitle: "It's a look that has spanned generations" | **"A gesture seen. A signal felt."** (short tagline, original) |
| "DRAG TO REVEAL" | **"SCROLL TO REVEAL"** |
| Showing the license plate (APC 420) | Final frame: **brand mark / logo** |
| Ford logo | Butterfly mark (image) |
| "BUILD & PRICE" / "CURRENT OFFERS" buttons | **"LEARN MORE"** → `butterflychallenge.net` (the only connection point) |

**Note:** The text strings above are **proposals** — final copy will be written specifically for the animated site; text from the `.net` site will not be used.

---

## 5. SCENE-BY-SCENE STORYBOARD (240 frames / 4-second scroll length)

**Text note:** The strings below are **placeholders** — final copy to be written later. Text from `.net` will **not be used**.

### FRAMES 0-40 (Opening — "Wide shot")
- **Camera:** wide, the full scene is visible
- **Subject:** a human silhouette fully covered by fabric, centered
- **Lighting:** soft spotlight from above
- **Background:** dark, starry/misty
- **Text overlay (sticky left):** `THE BUTTERFLY SIGN` (large serif)
- **Right side:** `SCROLL TO REVEAL` + circular indicator
- **Bottom (short tagline):** `A gesture seen. A signal felt.`

### FRAMES 40-100 (Zoom-in — closer)
- **Camera:** slowly pushes in toward the silhouette
- **Fabric:** begins to sway in a gentle wind
- **Lighting:** stronger rim light starts to form
- **Text:** the left title fades out (`opacity: 1 → 0`)

### FRAMES 100-160 (Reveal — fabric lifting)
- **Camera:** orbits to the side
- **Fabric:** flies into the air, **begins transforming into butterflies** — each fold becomes a butterfly
- **Text:** no text (the animation's strongest moment — content is not needed)

### FRAMES 160-220 (Climax — "Butterfly Sign" revealed)
- **Camera:** focused directly on the hands
- **The person's hands** are visible in the Butterfly Sign pose (thumbs crossed, fingers spread like wings)
- **Around them:** dozens of butterflies flying away (the remnants of the fabric)
- **Lighting:** sharp contrast, hands in golden/warm tones
- **Text (center, fade-in):** keyword (placeholder, e.g., `"THIS IS THE SIGN"`)

### FRAMES 220-240 (Calm ending — CTA)
- **Camera:** stops, hands centered
- **Butterfly mark logo** appears at the bottom
- **CTA button enters with animation:**
  - `LEARN MORE` → `butterflychallenge.net` (the only external link)

---

## 6. ANIMATION LAYERS (Layered Approach)

Five layers running simultaneously on the page:

```
┌─────────────────────────────────────────────┐
│ LAYER 5: Floating UI elements (nav, logo)   │ ← always visible
├─────────────────────────────────────────────┤
│ LAYER 4: Animated text overlays             │ ← GSAP timeline
├─────────────────────────────────────────────┤
│ LAYER 3: Particle effects (butterflies, dust)│ ← real-time canvas
├─────────────────────────────────────────────┤
│ LAYER 2: Image sequence (main render)       │ ← scroll-controlled
├─────────────────────────────────────────────┤
│ LAYER 1: Background gradient + bokeh        │ ← CSS animation
└─────────────────────────────────────────────┘
```

Each layer is independent and adds additional life to the main image sequence.

---

## 7. TECHNICAL ARCHITECTURE

### Project structure:
```
NetAnimation/
├── /app/
│   ├── page.tsx                    ← Main reveal page
│   ├── layout.tsx
│   └── globals.css
├── /components/
│   ├── ScrollSequence.tsx          ← Canvas frame player
│   ├── ButterflyParticles.tsx      ← Particle layer
│   ├── HeroTextOverlay.tsx         ← Sticky text animation
│   ├── ProgressIndicator.tsx       ← "SCROLL TO REVEAL" indicator
│   └── CTABlock.tsx                ← Final CTA
├── /public/
│   └── sequence/
│       ├── desktop/frame_0001.webp ... frame_0240.webp
│       └── mobile/frame_0001.webp ... frame_0240.webp
├── /hooks/
│   ├── useScrollProgress.ts
│   └── useImagePreloader.ts
├── /lib/
│   └── canvas-utils.ts
├── /scripts/
│   ├── extract-frames.sh           ← FFmpeg video → frames
│   └── optimize-webp.sh            ← PNG → WebP
└── package.json
```

### Technology stack:
```
Framework:    Next.js 15 (App Router)
Language:     TypeScript
Styling:      Tailwind CSS
Animation:    GSAP + ScrollTrigger
Smooth:       Lenis (smooth scroll)
Canvas:       Native HTML5 Canvas 2D
Particles:    tsParticles or custom canvas
Deploy:       Vercel
```

### Core component (pseudocode):
```typescript
function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useImagePreloader('/sequence/desktop/', 240);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * 239);
        drawFrame(canvasRef.current, images[frame]);
      }
    });
  });

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
```

---

## 8. PERFORMANCE BUDGETS

| Metric | Target | Strategy |
|---|---|---|
| **LCP (Largest Contentful Paint)** | < 2.5s | First frame inlined as base64, rest lazy |
| **TTI (Time to Interactive)** | < 3.5s | Sequence images deferred load |
| **Total Page Weight** | < 15 MB (desktop), < 6 MB (mobile) | WebP + responsive sequences |
| **FPS during scroll** | 60 FPS | RequestAnimationFrame + offscreen canvas |
| **Memory** | < 200 MB | Image bitmap recycling, ImageBitmap API |

### Fallback strategy:
- **Slow 3G:** Sequence is skipped, a static hero image is shown
- **prefers-reduced-motion:** Animation is disabled, a few static images shown
- **No JS:** SSR fallback with a static hero

---

## 9. IMPLEMENTATION PHASES (3-4 days)

The entire project is delivered within **3-4 days**. The site consists of **only a hero/header** — small scope, fast delivery. **All technical work is performed by the developer.**

### **Day 1: Asset generation and setup**
Developer.
- [ ] AI video generation (Runway / Sora / Kling) — images and video
- [ ] 4-second high-quality video (1080p, 60fps)
- [ ] Next.js project setup
- [ ] Convert video → 240 PNG frames via FFmpeg (AI assistant script)
- [ ] WebP optimization (AI assistant script)
- [ ] Place assets in `/public/sequence/`

### **Day 2: Core animation**
Developer.
- [ ] ScrollSequence Canvas component
- [ ] GSAP ScrollTrigger integration
- [ ] Image preloader hook
- [ ] Sticky pin + scrub logic
- [ ] Text overlay animations (title, tagline, CTA)

### **Day 3: Polish, Responsive, Deploy**
Developer.
- [ ] Particle layer (butterflies — optional, if time allows)
- [ ] Smooth scroll (Lenis)
- [ ] Mobile sequence (smaller version)
- [ ] Progress indicator
- [ ] CTA block — link to `butterflychallenge.net`
- [ ] Cross-browser test (Chrome, Safari, Firefox, Edge)
- [ ] Mobile test (iOS + Android)
- [ ] Deploy to Vercel

### **Day 4 (buffer):**
- [ ] Final QA and polish
- [ ] Lighthouse audit
- [ ] Analytics integration
- [ ] Launch

**Total: 3-4 days**

---

## 10. COLORS AND TYPOGRAPHY

### Color palette:
```
--bg-deep:      #0A0E1A   (deep navy blue)
--bg-mid:       #1A1F2E
--text-primary: #F5F1E8   (warm cream)
--accent-gold:  #D4AF37   (hand light)
--accent-cyan:  #5EEAD4   (butterfly glow)
--accent-pink:  #F0ABFC   (butterfly transform)
```

### Typography:
- **Hero title:** `Fraunces` (free Google Font, serif)
- **Body:** `Inter` or `Geist Sans` (free)
- **UI elements:** `JetBrains Mono` (free)

---

## 11. CONFIRMED DECISIONS

| Question | Decision |
|---|---|
| Asset source | **AI video generation** (Runway / Sora / Kling) |
| Hosting | **Vercel** (Free tier) |
| Animation style | **Real human silhouette** |
| Sequence length | **240 frames** (4-second scroll) |
| Site language | **English only** |
| Asset producer | **Developer** |
| Code author | **Developer** |
| AI assistant role | **Debug, FFmpeg, optimization** (does not write code) |

---

## 12. VIDEO → SCROLL FRAME-BY-FRAME FLOW

```
[Developer] AI video generation (Runway/Sora/Kling)
        ↓
[AI assistant] Extracts frames via FFmpeg script (240 PNGs)
        ↓
[AI assistant] PNG → WebP optimization (3-4× smaller)
        ↓
[Developer] Integrates into the site — writes Canvas + GSAP code
        ↓
[AI assistant] Debug, performance optimization
        ↓
[Result] On scroll: frame-by-frame, 1:1 like Ford
```

**Important note:**
- A `<video currentTime>` tag is **not used** — it works poorly
- The video is used **as a source only**, then split into frames
- Each frame is stored on the site as a separate image
- This is the standard approach used by major companies like Apple, Ford, BMW

---

## 13. INSPIRATION / REFERENCE LINKS

- **Apple AirPods Pro reveal** — the best example
- **Ford Mustang** "Rediscover the Classics" — direct reference
- **Wieden+Kennedy "The Boat"** — long-scroll storytelling
- **Stripe.com Annual Reports** — text + image sequence integration

---

## 14. BUDGET

### Single expense — AI video tool subscription:

| Item | Price | Duration |
|---|---|---|
| **Runway Standard plan** | **$15** | 1 month |
| Hosting (Vercel Hobby) | $0 | Free |
| Fonts (Google Fonts) | $0 | Free |
| Stock SVG (butterflies — if needed) | $0 | Pixabay/Freepik free |

### **TOTAL: $15** (one-time, 1-month subscription)

Alternatives (optional):
- ChatGPT Plus + Sora — $20/month
- Kling AI Pro — $10/month
- Hailuo — free (with limits)

---

## 15. DEADLINE AND TIMELINE

### Key dates:

| Day | Date | Phase |
|---|---|---|
| **1** | 2026-05-14 | AI video + Setup + Frame pipeline |
| **2** | 2026-05-15 | Core animation (Canvas + GSAP) |
| **3** | 2026-05-16 | Polish + Responsive + Deploy |
| **4** (buffer) | 2026-05-17 | Final QA + Launch |

**Total: 3-4 days** — starting today.

### Milestones:

| # | Milestone | Date |
|---|---|---|
| M1 | Concept approved | 2026-05-14 |
| M2 | AI video ready + setup | 2026-05-14 |
| M3 | Core animation working | 2026-05-15 |
| M4 | Polish + responsive done | 2026-05-16 |
| M5 | Production launch | 2026-05-17 |

---

## 16. TEAM AND RESPONSIBILITIES

### 3 roles:

| Role | Responsibility |
|---|---|
| **Project Owner** | Approve the concept, accept milestones, final quality review |
| **Developer** | All technical work: AI video generation, image generation, Next.js, GSAP, Canvas, components, deploy |
| **AI Assistant (Claude)** | **Only:** debug, FFmpeg scripts, video → frame pipeline, WebP optimization, performance tuning |

### What the AI assistant does NOT do:
- Does not write code (the developer does)
- Does not make design decisions
- Does not deploy automatically

### What the AI assistant DOES do:
- Debugs code (identifies and explains errors)
- Prepares FFmpeg commands (video → frames)
- Writes WebP optimization scripts
- Analyzes performance issues and recommends fixes
- Answers technical questions

---

## 17. RISKS AND MITIGATIONS

### Technical risks:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI video quality is poor | **HIGH** | High | 3-5 iterations, different prompts |
| Slow load on mobile | Medium | High | Adaptive quality, smaller mobile sequence |
| iOS Safari Canvas bugs | Low | Medium | Polyfill and testing, ImageBitmap API |
| 240 frames — RAM exhausted | Low | Medium | Progressive loading, frame recycling |
| FPS drops | Medium | Medium | `will-change`, offscreen canvas, throttle |

### Project risks:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 3-4 day deadline is tight | **HIGH** | High | Scope is very short (hero only), particle layer optional |
| AI video not ready on Day 1 | Medium | High | Test multiple tools in parallel (Runway + Kling) |
| Asset quality insufficient | Medium | High | Quality confirmation on Day 1 — if delayed, reduce scope |

### Risk mitigation strategy:
1. **Minimal scope** — hero only, no extra features
2. **Parallel work** — asset generation runs alongside setup
3. **Fallback** — particle layer/Lenis optional, can be added post-launch
4. **Early quality validation** — if AI video is not confirmed on Day 1, the deadline is shifted

---

## 18. SUCCESS METRICS (KPI)

### Technical KPI:

| Metric | Target | Measurement tool |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Vercel Speed Insights / Lighthouse |
| TTI (Time to Interactive) | < 3.5s | Lighthouse |
| FPS (during scroll) | ≥ 60 FPS | Chrome DevTools Performance |
| Page weight | < 15 MB (desktop) / < 6 MB (mobile) | Lighthouse |
| Lighthouse Performance Score | > 85 | Lighthouse |
| Cross-browser support | 100% (Chrome, Safari, Firefox, Edge) | Manual test |

### User experience KPI:

| Metric | Target | Measurement tool |
|---|---|---|
| Scroll completion rate | > 70% | Vercel Analytics scroll depth |
| Average time on page | > 30 seconds | Analytics |
| Bounce rate | < 50% | Analytics |
| CTA click-through (`LEARN MORE` → `.net`) | > 15% | Click tracking |

### Business KPI:

| Metric | Target |
|---|---|
| Social shares | > 500 in the first month |
| Traffic referred to `butterflychallenge.net` | > 1000 referrals/month |

---

## 19. NEXT STEPS

### Today (2026-05-14):
- [ ] Approve the concept
- [ ] **Subscribe to Runway Standard** ($15)
- [ ] **AI video generation** (developer)
- [ ] **Next.js project setup** (developer)

### Days 2-4 (2026-05-15 — 2026-05-17):
- [ ] **FFmpeg pipeline** — 240 WebP frames (AI assistant)
- [ ] **ScrollSequence component** (developer)
- [ ] **GSAP ScrollTrigger** integration (developer)
- [ ] **Polish + mobile** (developer)
- [ ] **Vercel deploy** (developer)
- [ ] Launch
