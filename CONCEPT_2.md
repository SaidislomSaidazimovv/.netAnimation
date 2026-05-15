# Konsepsiya 2 — Butterfly Lifecycle Journey
## Pinned Scroll-Driven Scale Animation (Spaceedu uslubi)

**Sana:** 2026-05-14
**Texnik nom:** Pinned Scroll-Driven Scale Animation with Sequential Scene Transitions
**Inspiratsiya:** spaceedu (sayyoralar) + brendning boshqa saytidagi 5 bosqich
**Kontent manbai:** Brendning boshqa rasmiy saytidan olingan (Claude qo'shilgan emas)

---

## 1. KONSEPSIYA UMUMIY

Kapalakning **5 ta hayot bosqichi** = mental health journey metaphori. Bu **rasmiy brend kontenti** — brendning boshqa saytida ishlatilgan. Har bosqich = bir scroll section. Foydalanuvchi scroll qilganda har bosqich obyekt **zoom in → zoom out** bo'ladi va keyingisiga o'tadi.

---

## 2. 5 TA BOSQICH (rasmiy)

```
Section 1 — EGG            "The season of beginning"
Section 2 — CATERPILLAR    "The season of growth"
Section 3 — COCOON         "The season of retreat"
Section 4 — METAMORPHOSIS  "The season of change"
Section 5 — BUTTERFLY      "The season of alignment"
```

Hech qaysi nom yoki subtitle **o'zgartirilmaydi** — bu brendning rasmiy kontenti.

---

## 3. ANIMATSIYA MEXANIZMI

```
[Section 1 — EGG]                    ← pin: true
   Scroll 0-50%: Tuxum kichik → katta (zoom in)
   Scroll 50-100%: Katta → kichik + crossfade

[Section 2 — CATERPILLAR]            ← pin: true
   Scroll 0-50%: Qurt kichik → katta
   Scroll 50-100%: Katta → kichik + crossfade

[Section 3 — COCOON]
   ... (xuddi shunday)

[Section 4 — METAMORPHOSIS]
   ... (yoriqdan yorug'lik chiqayotgan effekt)

[Section 5 — BUTTERFLY] (FINAL)
   Scroll 0-100%: Kapalak chiqib uchadi
   CTA: "Learn More" → butterflychallenge.net
```

Texnologiya: **GSAP ScrollTrigger** + `pin: true` + `scrub: true` + scale/opacity transforms.

---

## 4. HAR SECTION — VIZUAL TASVIR

### 🥚 Section 1 — EGG
```
Title:    "EGG"
Subtitle: "The season of beginning"
Accent color: TEAL/CYAN (#5EEAD4)

Visual:   Yopiq, sirli tuxum (chuqur teal/yashil rangda)
          Yorug'lik tuxum ichidan chiqayotgandek (subtle glow)
          Yoriq chiziq bor — yangi hayot kelayotganidan ishora
          Fon: chuqur qora, atmosferik

Animation: Tuxum kichik holatdan markazga uchib chiqadi, 
           scroll'da kattalashadi, yorug'lik kuchayadi.

Ma'no:    "Mental health journey boshlanadi — kichik, ko'rinmas, 
           lekin ichida hayot bor"
```

### 🐛 Section 2 — CATERPILLAR
```
Title:    "CATERPILLAR"
Subtitle: "The season of growth"
Accent color: YASHIL (#10B981)

Visual:   Jonli qurt, har xil to'qimadagi, segmentlangan tanasi 
          atrofida barglar, chang-zarralari uchayapti
          Sekin harakatlanmoqda, ozuqalanmoqda
          Fon: yumshoq tabiiy (bargli, lekin atmosferik)

Animation: Qurt markazga keladi, scroll'da kattalashadi va 
           tana harakatlanadi (segmentlar moving)

Ma'no:    "O'sish davri — sekin, og'ir, lekin majburiy. 
           Hayot o'zlashtiruvchi davr"
```

### 🪨 Section 3 — COCOON
```
Title:    "COCOON"
Subtitle: "The season of retreat"
Accent color: AMBER / ORANGE (#F59E0B)

Visual:   Tosh-koplangan pilla (chrysalis), tashqaridan oddiy, 
          ichida yorqin yashil yorug'lik nuri (yoriqdan ko'rinadi)
          Yopiq, ammo "hayot ichida" hissi
          Fon: chuqur qora, faqat pilla ko'rinadi

Animation: Pilla markazga keladi, scroll'da kattalashadi. 
           Ichidagi yorug'lik kuchayadi, pulslaydi.

Ma'no:    "Chekinish davri — tashqi olamdan o'zini ajratish 
           kerak bo'lgan vaqt. Tinchlik va izlanish"
```

### ✨ Section 4 — METAMORPHOSIS
```
Title:    "METAMORPHOSIS"
Subtitle: "The season of change"
Accent color: KO'K/TEAL (#06B6D4)

Visual:   Yarim ochilgan pilla, ichida kristall shakl ko'rinadi 
          (kelayotgan kapalakning shakli, lekin hali to'liq emas)
          Yorqin yashil/teal yorug'lik chiqib turibti
          Yoriqdan kuchli energiya
          Fon: chuqur qora, dramatik

Animation: Pilla ochila boshlaydi (scroll'da), nur chiqadi, 
           ichidagi shakl ko'rinadi va yoyiladi

Ma'no:    "O'zgarish davri — eski o'lib, yangi tug'iladigan moment. 
           Eng og'ir va eng kuchli moment"
```

### 🦋 Section 5 — BUTTERFLY (FINAL)
```
Title:    "BUTTERFLY"
Subtitle: "The season of alignment"
Accent color: OCH KO'K (#7DD3FC)

Visual:   To'liq kapalak — och ko'k/teal, shaffof qanotlar, 
          go'zal va erkin. Uchib turibti.
          Fon: chuqur qora + atmosferik yorug'lik
          Possible: kapalak uzoqlashadi (cheksizlikka uchadi)

Animation: Kapalak markazga uchib keladi, qanotlar yoyiladi, 
           erkin uchadi. Scroll oxirida CTA paydo bo'ladi.

CTA:      "Learn More" → butterflychallenge.net

Ma'no:    "Moslashish davri — kim bo'lganingni qabul qilish, 
           hayotda joyingni topish. Erkinlik."
```

---

## 5. SECTION'LAR ARASIDAGI TRANSITION

Spaceedu kabi **crossfade** + **scale**:

```
Section 1 (Egg)          
   ↓ End of section: Egg fades + scales down
   ↓ Beginning of next: Caterpillar fades + scales up
Section 2 (Caterpillar)
   ↓ ...
```

Yoki **morph transition** (yanada ilg'or):
- Tuxum yorilib qurt chiqadi (visual transition)
- Qurt pilla'ga aylanadi
- Pilla yorilib kapalak chiqadi
- Bu yanada **kuchli hikoya** beradi

---

## 6. VIZUAL STRUKTURASI (har section)

```
┌────────────────────────────────────────────────┐
│   [Top nav]                  [Menu items]     │
│                                                │
│                                                │
│            ┌─────────────────┐                │
│            │                 │                │
│            │  [OBJECT/IMAGE] │  ← scroll'da   │
│            │  scale 0.5 → 2x │     zoom       │
│            │                 │                │
│            └─────────────────┘                │
│                                                │
│            [TITLE — katta serif]              │
│            ────────                            │
│            [Subtitle]                          │
│                                                │
│            [↓ scroll indicator]               │
└────────────────────────────────────────────────┘
```

Spaceedu kabi:
- Obyekt **markazda**, scroll'da scaling
- Title **pastda** (obyekt ostida)
- Subtitle title ostida
- Top navigation doimo yuqorida

---

## 7. RANG VA UMUMIY USLUB

Brand guidelines'ga muvofiq:

```
Background:      Chuqur qora navy (#0A0E1A)
Card background: Subtle gradient (#1A1F2E → #0A0E1A)
Text primary:    Issiq krem (#F5F1E8)

Section accents (har bosqichda boshqa rang):
- Egg:          Teal/cyan  (#5EEAD4)
- Caterpillar:  Green      (#10B981)
- Cocoon:       Amber      (#F59E0B)
- Metamorph:    Cyan       (#06B6D4)
- Butterfly:    Light blue (#7DD3FC)
```

Tipografiya:
- **Hero title:** `Fraunces` (serif, katta, bold) — bepul Google Font
- **Subtitle:** `Inter` (italic, regular)
- **Accent words:** Section'ga mos rangda (highlighted)

---

## 8. ASSETS — NIMA KERAK

Har section uchun **3D model yoki PNG transparent** + animation:

| Section | Asset | Format |
|---|---|---|
| 1. Egg | Kristall-tuxum 3D | .glb yoki PNG sequence |
| 2. Caterpillar | Qurt 3D + barglar | .glb yoki PNG sequence |
| 3. Cocoon | Tosh-pilla 3D + glow | .glb yoki PNG sequence |
| 4. Metamorphosis | Yarim-ochilgan pilla + emerging shape | .glb yoki PNG sequence |
| 5. Butterfly | Kapalak 3D + flight animation | .glb yoki PNG sequence |

**Asset variantlari:**
- **a) 3D real-time** (Three.js + react-three-fiber) — interaktiv, og'irroq
- **b) Pre-rendered PNG sequence** (har section 30-60 kadr) — yengilroq, statik

**Tavsiya:** Variant **b** (PNG sequence) — Konsepsiya 1 kabi, oson va arzon.

---

## 9. TEXNIK IMPLEMENTATSIYA (qisqacha)

```typescript
// Har section uchun:
<section ref={sectionRef} className="lifecycle-stage">
  <div className="object-container" ref={objectRef}>
    <img src={`/objects/${stage}.png`} />
    {/* yoki canvas + PNG sequence */}
  </div>
  <div className="text-content">
    <h1 className={accentColor}>{title}</h1>
    <p>{subtitle}</p>
  </div>
</section>

// ScrollTrigger:
gsap.to(objectRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  scale: 2.5,
  opacity: 1,
  duration: 1,
})
```

---

## 10. IMPLEMENTATSIYA BOSQICHLARI

| Kun | Vazifa |
|---|---|
| Kun 1 | 5 ta obyekt AI'da generatsiya (Midjourney/Flux) |
| Kun 2 | PNG sequence (har obyekt uchun 30-60 kadr) |
| Kun 3 | Next.js + GSAP ScrollTrigger setup |
| Kun 4 | 5 ta pinned section + scroll animation |
| Kun 5 | Polish, transitions, mobile, deploy |

**Jami: 5 kun** (Konsepsiya 1 ga o'xshash hajm)

---

## 11. RASM PROMPTLARI (keyingi qadam)

Tasdiqlasangiz, har bosqich uchun **AI rasm prompt** yozaman:

```
1. Egg prompt — kristall tuxum, teal glow
2. Caterpillar prompt — realistik qurt
3. Cocoon prompt — tosh pilla, yashil ichki glow
4. Metamorphosis prompt — yarim ochilgan pilla + emerging form
5. Butterfly prompt — to'liq kapalak, light blue
```

Har prompt'da:
- `--ar 16:9` (landscape) yoki `--ar 1:1` (kvadrat — sizning reference rasmingiz kabi)
- Bir xil `--seed` — consistency uchun
- Bir xil background style — har section'da bir xil atmosfera

---

## 12. KEYINGI QADAMLAR

Agar bu konsepsiya tasdiqlansa:

1. **Stillistik tasdiq** — sizning reference rasmingiz uslubi (kristall, dark, accent glow) saqlanadimi yoki o'zgartiramizmi?
2. **Asset variant** — 3D real-time yoki PNG sequence?
3. **Final stage** — Section 5 (Butterfly) shu yerda tugaydimi, yoki **Konsepsiya 1 reveal** (hands + butterfly) qo'shilamizmi?
4. **Rasm promptlari** — yozishni boshlash

---

**STATUS:** Brand kontentidan to'g'ridan-to'g'ri olingan. Tasdiqlashga tayyor.
