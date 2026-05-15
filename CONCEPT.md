# Butterfly Challenge — Standalone Animated Microsite
## Loyiha Konsepsiyasi (v5.0)

**Sana:** 2026-05-14

---

## 0. EXECUTIVE SUMMARY (qisqacha)

### Loyiha bir gapda:
Butterfly Challenge harakati uchun **alohida, cinematic scroll-driven animatsion microsite** yaratamiz — `butterflychallenge.net` ga qo'shimcha sifatida, foydalanuvchini hissiy darajada jalb qiluvchi 4 soniyalik "reveal" tajribasi bilan.

### Nima uchun bu kerak:
- Asosiy sayt **ma'lumot beradi** — yangi microsite **his qildiradi**
- Bu Apple iPhone reveal, Ford Mustang launch reklamasi kabi industry standart usul
- Social media'da viral kontent potensiali yuqori (TikTok / Instagram'da ulashish uchun ideal)
- Movement uchun emotsional kirish nuqtasi

### Qisqacha raqamlar:
| Ko'rsatkich | Qiymat |
|---|---|
| **Budjet** | $15 (1 oylik AI tool obunasi) |
| **Hosting** | Vercel (bepul) |
| **Vaqt** | 3-4 kun |
| **Boshlanish** | 2026-05-14 |
| **Ishga tushish** | 2026-05-17 |
| **Jamoa** | Loyiha egasi + Dasturchi + AI yordamchi |
| **Asosiy sayt o'zgaradimi** | YO'Q — tegmaydi |
| **Hajmi** | Faqat **hero/header sahifa** (alohida cinematic experience) |

### Asosiy texnologiya:
Next.js + GSAP + Canvas (Apple/Ford/BMW ishlatadigan **Scroll-Driven Image Sequence Animation** texnikasi). AI video orqali asset generatsiya, keyin FFmpeg bilan 240 ta kadrga ajratish.

### Risk darajasi:
**Past-o'rtacha** — texnologiya sinab ko'rilgan, AI tool mavjud, budjet kichik. Asosiy risk: AI video sifati birinchi urinishda kelmasligi (yechim: bir necha iteratsiya).

---

## 1. LOYIHA MAQSADI VA POSITIONING

### Bu nima:
`butterflychallenge.net` saytining **animatsion versiyasi** — **butunlay alohida** sayt sifatida quriladi. Bu Ford "Rediscover the Classics" reklamasi kabi **faqat header + hero** dan iborat cinematic landing experience. Foydalanuvchi scroll qilganda animatsiya o'ynaydi, oxirida `.net` saytiga yo'naltiriladi.

### Bu nima EMAS:
- `butterflychallenge.net` ning yangilanishi emas
- Asosiy saytga animatsiya qo'shish emas
- Asosiy sayt kodiga tegmaydi
- `.net` saytidagi matnlar/kontent ishlatilmaydi

### KONTENT SIYOSATI (muhim):
Bu animatsion sayt **o'zining alohida kontentiga** ega. `.net` saytidan matnlar **ko'chirilmaydi**. Faqat:
- O'z minimal cinematic copy (title + tagline + interaction prompt + CTA)
- Ford referensi kabi — animatsiya o'zi asosiy "xabar", matn juda kam
- Yagona aloqasi: oxirgi CTA tugmasi `butterflychallenge.net` ga olib boradi

### Munosabati:
```
┌──────────────────────────────┐         ┌─────────────────────────────┐
│   butterflychallenge.net     │         │  YANGI: animated microsite  │
│   (mavjud — tayyor)          │ ◄─────► │  (alohida proyekt, 0dan)    │
│                              │  link   │                             │
│   - Asosiy ma'lumot          │         │  - Cinematic reveal         │
│   - Resurslar, partnerlar    │         │  - Faqat scroll experience  │
│   - Press kit                │         │  - "Experience the movement"│
└──────────────────────────────┘         └─────────────────────────────┘
```

### Asosiy maqsad:
Foydalanuvchi sahifaga kirgan birinchi 5-10 soniyada **"Butterfly Sign"** harakatining hissiy quvvatini his qilishi — xuddi Ford klassik mashinasi sirli ravishda choyshab ostidan ochilganidek. Tugmaning oxirida — `butterflychallenge.net` ga link.

---

## 2. ANIMATSIYA TEXNIKASI (rasmiy nomi)

**Scroll-Driven Image Sequence Animation**
(sinonimlar: Frame Scrubbing on Scroll • Scrollytelling Pin • Canvas Frame Sequencer)

### Mexanizm:
1. **240 ta rasm (frame)** oldindan tayyorlanadi (AI generatsiya)
2. Rasmlar **PNG → WebP** ga konvertatsiya qilinadi (~70% kichik)
3. **HTML Canvas** ichida joriy kadr chiziladi
4. **GSAP ScrollTrigger** scroll pozitsiyasini 0.00 → 1.00 oralig'iga aylantiradi
5. Bu progress qiymati `frameIndex = Math.floor(progress * 239)` ga aylantiriladi
6. Hech qanday video tegida ijro etilmaydi — har bir kadr alohida rasm

### Nima uchun video tegi emas (`<video currentTime>`):
- iOS Safari'da glitch beradi va to'xtaydi
- Frame-perfect aniqlik yo'q (keyframe seeking lag)
- Reverse scroll'da freezing
- Fast scroll'da uziladi
- **Canvas sequence — industry standart** (Apple, Ford, BMW shu texnikani ishlatadi)

---

## 3. ASSET PRODUCTION PIPELINE

### Step-by-step:

**1-qadam: AI Video generatsiya** (Runway Gen-3 yoki shunga o'xshash)
- Bitta uzluksiz 4 soniyali video generatsiya
- 1080p (minimum) yoki 4K, 60fps tavsiya etiladi
- Dasturchi tomonidan bajariladi

**2-qadam: Frame ekstraksiya (FFmpeg)**
```bash
# Videoni 60fps da kadrlarga ajratish
ffmpeg -i reveal_animation.mp4 -vf fps=60 frames/frame_%04d.png

# Natija: frame_0001.png ... frame_0240.png (4 sec × 60fps = 240 kadr)
```

**3-qadam: WebP optimizatsiya**
```bash
# Har bir PNG ni WebP ga (70-80% kichikroq)
for f in frames/*.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done

# Mobile uchun kichikroq versiya
for f in frames/*.webp; do
  ffmpeg -i "$f" -vf scale=720:-1 "mobile/$(basename $f)"
done
```

**4-qadam: Sayt'ga integratsiya**
- ScrollSequence Canvas player komponentiga upload
- Lazy loading bilan ko'rsatish

---

## 4. FORD → BUTTERFLY CHALLENGE moslashuvi (1:1 mapping)

| Ford asl elementi | Butterfly Challenge ekvivalenti |
|---|---|
| Klassik Mustang mashina | Inson silueti (Butterfly Sign pozasida) |
| Oq mato/choyshab (cover) | **Ipakdek oqar mato** — bu o'zgarib **kapalakka aylanadi** |
| Neon chiziqli yorug'liklar (kross) | Yumshoq orqaga yoritilgan kapalak qanot konturi (neon glow) |
| Beton garaj | Och kosmik / cheksiz ufq fon (cosmic dust + bokeh) |
| "REDISCOVER the CLASSICS" | **"THE BUTTERFLY SIGN"** (asosiy title, original copy) |
| Subtitr: "It's a look that has spanned generations" | **"A gesture seen. A signal felt."** (qisqa tagline, original) |
| "DRAG TO REVEAL" | **"SCROLL TO REVEAL"** |
| Mashina nomerini ko'rsatish (APC 420) | Yakuniy kadrda: **brand mark / logo** |
| Ford logo | Butterfly mark (rasm) |
| "BUILD & PRICE" / "CURRENT OFFERS" tugmalari | **"LEARN MORE"** → `butterflychallenge.net` (asosiy aloqa nuqtasi) |

**Eslatma:** Yuqoridagi matnlar **taklif** — yakuniy copy animatsion sayt o'zi uchun yoziladi, `.net` saytidagi matnlar ishlatilmaydi.

---

## 5. SCENE-BY-SCENE STORYBOARD (240 kadr / 4 soniya scroll uzunligi)

**Tekst eslatma:** Quyidagi matnlar **placeholder** — yakuniy copy keyin yoziladi. `.net` matnlari **ishlatilmaydi**.

### KADR 0-40 (Boshlanish — "Wide shot")
- **Kamera:** uzoq, butun sahna ko'rinadi
- **Obyekt:** mato bilan to'liq yopilgan inson silueti, markazda
- **Yorug'lik:** yuqoridan tushgan yumshoq spotlight
- **Fon:** qorong'i, yulduzli/tumanli
- **Tekst overlay (sticky left):** `THE BUTTERFLY SIGN` (katta serif)
- **O'ng tomonda:** `SCROLL TO REVEAL` + aylanma indikator
- **Pastda (qisqa tagline):** `A gesture seen. A signal felt.`

### KADR 40-100 (Zoom-in — yaqinroq)
- **Kamera:** asta-sekin yaqinlashadi, silueti tomon
- **Mato:** boshlang'ich shamol harakatida tebrana boshlaydi
- **Yorug'lik:** stronger rim light hosil bo'ladi
- **Tekst:** chap title yo'q bo'la boshlaydi (`opacity: 1 → 0`)

### KADR 100-160 (Reveal — mato ko'tarilishi)
- **Kamera:** chetga yon tomondan kirib boradi (orbit)
- **Mato:** havoda uchadi, **butterflies'ga aylana boshlaydi** — har bir mato burmasi kapalakka transformatsiya
- **Tekst:** matn yo'q (animatsiyaning eng kuchli kadri — kontent kerak emas)

### KADR 160-220 (Climax — "Butterfly Sign" ochiladi)
- **Kamera:** to'g'ridan-to'g'ri qo'llarga qaratilgan
- **Inson qo'llari** Butterfly Sign pozasida ko'rinadi (boshmaldoqlar kesishgan, barmoqlar qanot kabi yoyilgan)
- **Atrofda:** o'nlab kapalaklar uchib ketmoqda (matoning qoldig'i)
- **Yorug'lik:** keskin kontrast, qo'llar oltin/iliq rangda
- **Tekst (markaz, fade-in):** kalit so'z (placeholder, masalan `"THIS IS THE SIGN"`)

### KADR 220-240 (Tinch yakun — CTA)
- **Kamera:** to'xtaydi, qo'llar markazda
- **Butterfly mark logosi** pastda paydo bo'ladi
- **CTA tugma animatsiya bilan kiradi:**
  - `LEARN MORE` → `butterflychallenge.net` (yagona tashqi link)

---

## 6. ANIMATSIYA QATLAMLARI (Layered Approach)

Saytda bir vaqtning o'zida ishlaydigan **5 ta qatlam**:

```
┌─────────────────────────────────────────────┐
│ LAYER 5: Floating UI elements (nav, logo)   │ ← har doim ko'rinadi
├─────────────────────────────────────────────┤
│ LAYER 4: Animated text overlays             │ ← GSAP timeline
├─────────────────────────────────────────────┤
│ LAYER 3: Particle effects (kapalaklar, chang)│ ← real-time canvas
├─────────────────────────────────────────────┤
│ LAYER 2: Image sequence (asosiy render)     │ ← scroll-controlled
├─────────────────────────────────────────────┤
│ LAYER 1: Background gradient + bokeh        │ ← CSS animatsiya
└─────────────────────────────────────────────┘
```

Har bir qatlam mustaqil ishlaydi va asosiy image sequence'ga qo'shimcha hayotiylik beradi.

---

## 7. TEXNIK ARXITEKTURA

### Proyekt strukturasi:
```
NetAnimation/
├── /app/
│   ├── page.tsx                    ← Asosiy reveal sahifa
│   ├── layout.tsx
│   └── globals.css
├── /components/
│   ├── ScrollSequence.tsx          ← Canvas frame player
│   ├── ButterflyParticles.tsx      ← Particle layer
│   ├── HeroTextOverlay.tsx         ← Sticky text animatsiya
│   ├── ProgressIndicator.tsx       ← "SCROLL TO REVEAL" indikator
│   └── CTABlock.tsx                ← Yakuniy CTA
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

### Texnologiya stack:
```
Framework:    Next.js 15 (App Router)
Language:     TypeScript
Styling:      Tailwind CSS
Animation:    GSAP + ScrollTrigger
Smooth:       Lenis (smooth scroll)
Canvas:       Native HTML5 Canvas 2D
Particles:    tsParticles yoki custom canvas
Deploy:       Vercel
```

### Asosiy komponent (pseudocode):
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

| Metric | Maqsad | Strategiya |
|---|---|---|
| **LCP (Largest Contentful Paint)** | < 2.5s | Birinchi kadr inline base64, qolgani lazy |
| **TTI (Time to Interactive)** | < 3.5s | Sequence images defer load |
| **Total Page Weight** | < 15 MB (desktop), < 6 MB (mobile) | WebP + responsive sequences |
| **FPS during scroll** | 60 FPS | RequestAnimationFrame + offscreen canvas |
| **Memory** | < 200 MB | Image bitmap recycling, ImageBitmap API |

### Fallback strategiya:
- **Slow 3G:** Sequence skip qilinadi, static hero rasm ko'rsatiladi
- **prefers-reduced-motion:** Animatsiya o'chiriladi, bir necha static rasm
- **No JS:** SSR fallback bilan static hero

---

## 9. IMPLEMENTATSIYA BOSQICHLARI (3-4 kun)

To'liq loyiha **3-4 kun** ichida bajariladi. Sayt **faqat hero/header** dan iborat — kichik scope, tezkor delivery. **Barcha texnik ishlar dasturchi tomonidan** bajariladi.

### **Kun 1: Asset generatsiya va setup**
Dasturchi.
- [ ] AI video generatsiya (Runway / Sora / Kling) — rasmlar va video
- [ ] 4 soniyali sifatli video (1080p, 60fps)
- [ ] Next.js loyiha setup
- [ ] FFmpeg orqali video → 240 ta PNG kadr (AI yordamchi skripti)
- [ ] WebP optimizatsiya (AI yordamchi skripti)
- [ ] Asset'lar `/public/sequence/` ga joylash

### **Kun 2: Core animatsiya**
Dasturchi.
- [ ] ScrollSequence Canvas komponenti
- [ ] GSAP ScrollTrigger integratsiyasi
- [ ] Image preloader hook
- [ ] Sticky pin + scrub logic
- [ ] Text overlay animatsiyalari (title, tagline, CTA)

### **Kun 3: Polish, Responsive, Deploy**
Dasturchi.
- [ ] Particle layer (kapalaklar — optional, agar vaqt qolsa)
- [ ] Smooth scroll (Lenis)
- [ ] Mobile sequence (kichikroq versiya)
- [ ] Progress indicator
- [ ] CTA bloki — `butterflychallenge.net` linki
- [ ] Cross-browser test (Chrome, Safari, Firefox, Edge)
- [ ] Mobile test (iOS + Android)
- [ ] Vercel'ga deploy

### **Kun 4 (zaxira/buffer):**
- [ ] Final QA va polish
- [ ] Lighthouse audit
- [ ] Analytics ulanish
- [ ] Launch

**Jami: 3-4 kun**

---

## 10. RANG VA TIPOGRAFIYA

### Rang paletka:
```
--bg-deep:      #0A0E1A   (chuqur tungi ko'k)
--bg-mid:       #1A1F2E
--text-primary: #F5F1E8   (iliq krem)
--accent-gold:  #D4AF37   (qo'llar yorug'lik)
--accent-cyan:  #5EEAD4   (kapalak glow)
--accent-pink:  #F0ABFC   (kapalak transform)
```

### Tipografiya:
- **Hero title:** `Fraunces` (bepul Google Font, serif)
- **Body:** `Inter` yoki `Geist Sans` (bepul)
- **UI elements:** `JetBrains Mono` (bepul)

---

## 11. TASDIQLANGAN QARORLAR

| Savol | Qaror |
|---|---|
| Asset manbai | **AI video generatsiya** (Runway / Sora / Kling) |
| Hosting | **Vercel** (Free tier) |
| Animatsiya stili | **Real inson silueti** |
| Sequence uzunligi | **240 kadr** (4 soniya scroll) |
| Sayt tili | **Faqat inglizcha** |
| Asset bajaruvchisi | **Dasturchi** |
| Kod bajaruvchisi | **Dasturchi** |
| AI yordamchi roli | **Debug, FFmpeg, optimizatsiya** (kod yozmaydi) |

---

## 12. VIDEO → SCROLL FRAME-BY-FRAME OQIMI

```
[Dasturchi] AI video generatsiya (Runway/Sora/Kling)
        ↓
[AI yordamchi] FFmpeg skripti orqali kadrlarga ajratadi (240 ta PNG)
        ↓
[AI yordamchi] PNG → WebP optimizatsiya (3-4× kichikroq)
        ↓
[Dasturchi] Sayt'ga integratsiya — Canvas + GSAP kodini yozadi
        ↓
[AI yordamchi] Debug, performance optimizatsiya
        ↓
[Natija] Scroll surganda 1:1 Ford kabi kadr-by-kadr
```

**MUHIM eslatma:**
- **Video tegida `<video currentTime>` ishlatilmaydi** — bu yomon ishlaydi
- Videoni faqat **manba sifatida** ishlatiladi, keyin kadrlarga ajratiladi
- Saytda har bir kadr alohida rasm sifatida saqlanadi
- Bu Apple, Ford, BMW kabi yirik kompaniyalar ishlatadigan standart usul

---

## 13. INSPIRATSIYA REFERENS LINKLAR

- **Apple AirPods Pro reveal** — eng yaxshi misol
- **Ford Mustang** "Rediscover the Classics" — to'g'ridan-to'g'ri referens
- **Wieden+Kennedy "The Boat"** — long-scroll storytelling
- **Stripe.com Annual Reports** — text + image sequence integratsiyasi

---

## 14. BUDJET

### Yagona xarajat — AI video tool obunasi:

| Bilet | Narx | Davomiyligi |
|---|---|---|
| **Runway Standard plan** | **$15** | 1 oy |
| Hosting (Vercel Hobby) | $0 | Bepul |
| Shriftlar (Google Fonts) | $0 | Bepul |
| Stock SVG (kapalaklar — agar kerak) | $0 | Pixabay/Freepik bepul |

### **JAMI: $15** (bir martalik, 1 oylik obuna)

Alternativalar (xohish bilan):
- ChatGPT Plus + Sora — $20/oy
- Kling AI Pro — $10/oy
- Hailuo — bepul (limit bilan)

---

## 15. DEADLINE VA TIMELINE

### Asosiy sanalar:

| Kun | Sana | Bosqich |
|---|---|---|
| **1** | 2026-05-14 | AI video + Setup + Frame pipeline |
| **2** | 2026-05-15 | Core animatsiya (Canvas + GSAP) |
| **3** | 2026-05-16 | Polish + Responsive + Deploy |
| **4** (zaxira) | 2026-05-17 | Final QA + Launch |

**Jami: 3-4 kun** — bugundan boshlab.

### Milestone'lar:

| # | Milestone | Sana |
|---|---|---|
| M1 | Konsepsiya tasdiqlandi | 2026-05-14 |
| M2 | AI video tayyor + setup | 2026-05-14 |
| M3 | Core animatsiya ishlaydi | 2026-05-15 |
| M4 | Polish + responsive tugadi | 2026-05-16 |
| M5 | Production launch | 2026-05-17 |

---

## 16. JAMOA VA MAS'ULIYAT

### 3 ta rol:

| Rol | Mas'uliyat |
|---|---|
| **Loyiha egasi** | Konsepsiyani tasdiqlash, milestone qabul qilish, oxirgi sifat nazorati |
| **Dasturchi** | Barcha texnik ishlar: AI video generatsiya, rasm generatsiya, Next.js, GSAP, Canvas, components, deploy |
| **AI yordamchi (Claude)** | **Faqat:** debug, FFmpeg skriptlari, video → frame pipeline, WebP optimizatsiya, performance tuning |

### AI yordamchi NIMA QILMAYDI:
- Kod yozmaydi (dasturchi yozadi)
- Dizayn qaror qabul qilmaydi
- Deploy qilmaydi avtomatik

### AI yordamchi NIMA QILADI:
- Kodni debug qiladi (xatolar aniqlash va tushuntirish)
- FFmpeg buyruqlarini tayyorlaydi (video → frames)
- WebP optimizatsiya skriptlari yozadi
- Performance muammolar bo'yicha tahlil va tavsiya
- Texnik savollarga javob beradi

---

## 17. RISKLAR VA ULARNING YECHIMI

### Texnik risklar:

| Risk | Ehtimol | Ta'sir | Yechim |
|---|---|---|---|
| AI video sifati past chiqadi | **YUQORI** | Yuqori | 3-5 ta iteratsiya, har xil prompt |
| Mobile'da sekin yuklanadi | O'rta | Yuqori | Adaptive quality, kichik mobile sequence |
| iOS Safari Canvas bug'lar | Past | O'rta | Polyfill va testing, ImageBitmap API |
| 240 kadr — RAM yetmaydi | Past | O'rta | Progressive loading, frame recycling |
| FPS tushib ketadi | O'rta | O'rta | `will-change`, offscreen canvas, throttle |

### Loyiha risklari:

| Risk | Ehtimol | Ta'sir | Yechim |
|---|---|---|---|
| 3-4 kunlik deadline tor | **YUQORI** | Yuqori | Scope juda qisqa (faqat hero), particle layer optional |
| AI video 1-kunda tayyor bo'lmaydi | O'rta | Yuqori | Bir nechta tool parallel sinash (Runway + Kling) |
| Asset sifati yetmaydi | O'rta | Yuqori | Birinchi kun sifat tasdig'i — kech bo'lsa scope qisqartirish |

### Riskni kamaytirish strategiyasi:
1. **Minimal scope** — faqat hero, ortiqcha funksiyalar yo'q
2. **Parallel ish** — asset generatsiya bilan setup parallel boradi
3. **Fallback** — particle layer/Lenis optional, yetib bormasa launch'dan keyin qo'shiladi
4. **Erta sifat tasdig'i** — AI video 1-kun ichida tasdiqlanmasa, deadline siljitiladi

---

## 18. MUVAFFAQIYAT METRIKALARI (KPI)

### Texnik KPI:

| Metric | Maqsad | O'lchov vositasi |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Vercel Speed Insights / Lighthouse |
| TTI (Time to Interactive) | < 3.5s | Lighthouse |
| FPS (scroll davomida) | ≥ 60 FPS | Chrome DevTools Performance |
| Page weight | < 15 MB (desktop) / < 6 MB (mobile) | Lighthouse |
| Lighthouse Performance Score | > 85 | Lighthouse |
| Cross-browser ishlash | 100% (Chrome, Safari, Firefox, Edge) | Manual test |

### Foydalanuvchi tajribasi KPI:

| Metric | Maqsad | O'lchov vositasi |
|---|---|---|
| Scroll completion rate | > 70% | Vercel Analytics scroll depth |
| Average time on page | > 30 soniya | Analytics |
| Bounce rate | < 50% | Analytics |
| CTA click-through (`LEARN MORE` → `.net`) | > 15% | Click tracking |

### Biznes KPI:

| Metric | Maqsad |
|---|---|
| Social shares | > 500 birinchi oyda |
| `butterflychallenge.net` ga trafik yo'naltirish | > 1000 referral/oy |

---

## 19. KEYINGI QADAMLAR

### Bugun (2026-05-14):
- [ ] Konsepsiya tasdiqlash
- [ ] **Runway Standard obuna** ($15)
- [ ] **AI video generatsiya** (dasturchi)
- [ ] **Next.js loyiha setup** (dasturchi)

### Kun 2-4 (2026-05-15 — 2026-05-17):
- [ ] **FFmpeg pipeline** — 240 ta WebP kadr (AI yordamchi)
- [ ] **ScrollSequence komponenti** (dasturchi)
- [ ] **GSAP ScrollTrigger** integratsiyasi (dasturchi)
- [ ] **Polish + mobile** (dasturchi)
- [ ] **Vercel deploy** (dasturchi)
- [ ] Launch
