# Konsepsiya 3 — Anyone. Anywhere.
## Vertical Scroll Card Stack Transition

**Sana:** 2026-05-15
**Texnik nom:** Vertical Scroll-Triggered Card Stack with Background Crossfade
**Inspiratsiya:** "Stylish/Laugh/Sports" 3D cartoon character sayt
**Asosiy g'oya:** 5 ta turli odam Butterfly Sign'ni qiladi — universal gesture

---

## 1. KONSEPSIYA UMUMIY

`.net` saytining eng kuchli xabari: **"One gesture. Any language. Anywhere in the world."**

Konsepsiya 3 da har **card** = boshqa odam, boshqa kontekst — lekin **hammasi bir xil Butterfly Sign**'ni qiladi. Foydalanuvchi scroll qilganda kartalar **vertikal yo'nalishda** almashinadi: oldingisi pastga qulaydi, yangisi yuqoridan tushadi.

---

## 2. ANIMATSIYA MEXANIZMI

```
Boshlanish:
   ┌─────────────────────────┐
   │  CARD 1 (TEAL)          │  ← Birinchi card to'liq ko'rinadi
   │  TEEN                   │
   │  [Yosh tinejer + Sign]  │
   └─────────────────────────┘
            ↓ scroll
Transition (50%):
   ┌─────────────────────────┐
   │  CARD 2 (ORANGE)        │  ← Yuqoridan tushadi
   │  STRONG                 │
   │  [Sportchi + Sign]      │
   ┝━━━━━━━━━━━━━━━━━━━━━━━━━┥
   │  CARD 1                 │  ← Pastga qulamoqda
   │  [Tinejer fading down]  │
   └─────────────────────────┘
            ↓
Card 2 to'liq:
   ┌─────────────────────────┐
   │  CARD 2 (ORANGE)        │
   │  STRONG                 │
   │  [Sportchi + Sign]      │
   └─────────────────────────┘
```

Texnologiya:
- **GSAP ScrollTrigger** + `pin: true` + `scrub: true`
- Har card `position: fixed` yoki absolute
- `translateY` transition: yangi card -100% → 0, eski 0 → 100%
- `background-color` interpolate
- Big background text fade in/out

---

## 3. 5 TA CARD — STRUKTURA

```
Card 1 — TEEN         (Teal bg)     Yosh tinejer
Card 2 — STRONG       (Orange bg)   Sportchi
Card 3 — TIRED        (Gray bg)     Ishchi (charchagan)
Card 4 — WISE         (Navy bg)     Keksa kishi
Card 5 — PRESENT      (Green bg)    Do'st (yonida)
```

Har card'da:
- **Big background text** (TEEN, STRONG, ...)
- **Title left side:** "Anyone. Anywhere."
- **Subtitle:** card-specific quote
- **Right text:** mental health context
- **Person photo** markazda — Butterfly Sign'ni qiladi

---

## 4. HAR CARD UCHUN TASVIR

### 🌱 Card 1 — TEEN ("The first sign")
```
Big background text: TEEN
Background color: TEAL (#5EEAD4 → darker tone)
Person: 16-18 yoshli tinejer, neutral kiyim, samimiy
Pose: Butterfly Sign ko'krak oldida, kameraga qarab
Quote: "Mental health doesn't wait until you're older."
Subtitle: "The Butterfly Sign — for anyone, at any age."
```

### 💪 Card 2 — STRONG ("Showing up is strength")
```
Big background text: STRONG
Background color: ORANGE (#F59E0B → warm)
Person: Sportchi (25-30 yosh), sport kiyim, yarim ter
Pose: Butterfly Sign ko'krak oldida, kameraga qarab
Quote: "Athletes show what strength looks like. Showing up is strength."
Subtitle: "Even the strongest need to be seen."
```

### 😴 Card 3 — TIRED ("It's okay not to be okay")
```
Big background text: TIRED
Background color: GRAY (#6B7280 → muted)
Person: Ishchi 30-40 yosh, ish kiyimi, charchagan
Pose: Butterfly Sign ko'krak oldida, ko'zlari nam
Quote: "Sometimes showing up is the hardest thing."
Subtitle: "But it counts. Always."
```

### 🌙 Card 4 — WISE ("Carrying others")
```
Big background text: WISE
Background color: NAVY (#1E3A8A → deep)
Person: Keksa kishi 60+, kiyimi sodda, hikmatli
Pose: Butterfly Sign ko'krak oldida, tinch
Quote: "I've seen what silence does. This sign is louder than any word."
Subtitle: "Every generation needs this gesture."
```

### 🤝 Card 5 — PRESENT ("Show up for someone") — FINAL
```
Big background text: PRESENT
Background color: GREEN (#10B981 → fresh)
Person: Ikki kishi — bir-biriga qarab Butterfly Sign qilmoqda
Pose: Ikki yuz, ikki sign, hissiy moment
Quote: "Show up for someone you care about. That's the call."
Subtitle: "One billion hands. One signal."
CTA: "Learn More" → butterflychallenge.net
```

---

## 5. VIZUAL STRUKTURA (har card)

```
┌────────────────────────────────────────────────┐
│  [Top nav transparent]              [Menu]    │
│                                                │
│  [Title left]              [Description right] │
│   Anyone.                    Mental health     │
│   Anywhere.                  doesn't ask...    │
│                                                │
│                                                │
│        [PERSON IMAGE — markazda]              │
│        [Person making Butterfly Sign]          │
│                                                │
│                                                │
│   [BIG BACKGROUND TEXT — STRONG]              │
│                                                │
│        [↓ next card indicator]                │
└────────────────────────────────────────────────┘
```

Reference saytdagi kabi:
- Big background text — outline yoki katta sans-serif
- Person photo — markazda, half-body (chest up)
- Subtle navigation
- Left column: title + meta
- Right column: description

---

## 6. RANG VA TIPOGRAFIYA

### Ranglar (har card uchun):
```
Card 1 (TEEN):    bg #5EEAD4 → #134E4A   (teal gradient)
Card 2 (STRONG):  bg #F59E0B → #92400E   (orange gradient)
Card 3 (TIRED):   bg #9CA3AF → #374151   (gray gradient)
Card 4 (WISE):    bg #3B82F6 → #1E3A8A   (navy gradient)
Card 5 (PRESENT): bg #10B981 → #064E3B   (green gradient)
```

### Tipografiya:
- **Big bg text:** `Anton` yoki `Bebas Neue` (bold, condensed) — bepul Google
- **Title:** `Fraunces` (serif, italic)
- **Body:** `Inter` (sans, regular)

---

## 7. ASSET — RASMLAR

5 ta person photo kerak — har biri **Butterfly Sign**'ni qiladi:

| Card | Asset | AI generatsiya kerak |
|---|---|---|
| 1. TEEN | Yosh tinejer photo | Midjourney |
| 2. STRONG | Sportchi photo | Midjourney |
| 3. TIRED | Charchagan ishchi photo | Midjourney |
| 4. WISE | Keksa kishi photo | Midjourney |
| 5. PRESENT | Ikki kishi photo | Midjourney |

**Style consistency:**
- Hammasi half-body portrait (ko'krak yuqorisi)
- Hammasida butterfly sign pozasi
- Studio yorug'lik (fon transparent, keyin biz qo'shamiz)
- Photorealistic, no cartoon

---

## 8. TEXNIK IMPLEMENTATSIYA (qisqacha)

```typescript
// Pinned scroll with card stack:
<section ref={containerRef} className="card-stack-container">
  {cards.map((card, i) => (
    <div 
      key={i}
      className="card"
      style={{
        position: 'fixed',
        zIndex: cards.length - i,
        backgroundColor: card.bgColor,
      }}
      ref={el => cardRefs.current[i] = el}
    >
      <BigText>{card.bigText}</BigText>
      <PersonImage src={card.image} />
      <Quote>{card.quote}</Quote>
    </div>
  ))}
</section>

// GSAP timeline:
useGSAP(() => {
  cards.forEach((card, i) => {
    if (i === 0) return;
    
    gsap.fromTo(cardRefs.current[i], 
      { y: '-100%' },
      {
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${(i-1) * 100}% top`,
          end: `${i * 100}% top`,
          scrub: 1,
        }
      }
    );
  });
});
```

---

## 9. IMPLEMENTATSIYA BOSQICHLARI

| Kun | Vazifa |
|---|---|
| Kun 1 | 5 ta person photo AI generatsiya (Midjourney) |
| Kun 2 | Image background remove + composite |
| Kun 3 | Next.js + GSAP setup, card stack basic |
| Kun 4 | Background colors, big text, transitions |
| Kun 5 | Polish, mobile, deploy |

**Jami: 5 kun**

---

## 10. KEYINGI QADAMLAR

Agar bu konsepsiya ma'qul bo'lsa:
1. **5 ta person AI prompt** yozaman (Midjourney/Flux)
2. **Background remove + composite** strategiyasi
3. **CONCEPT_3_IMAGES.md** — to'liq promptlar bilan

Yoki boshqa g'oya kerak bo'lsa, ayting:
- G'oya 2 — Bir kishining emotion bosqichlari
- G'oya 5 — 1→Billion progression
- G'oya 6 — Hissiyotlar (ranglar)
- G'oya 7 — Butterfly Effect (1→world)

---

## SAVOL — SIZGA

Bu plan (G'oya 1 — Turli odamlar) sizga ma'qulmi?

Yoki:
- Card sonini o'zgartirish (5 emas, 4 yoki 6)?
- Boshqa odamlar (yosh guruh)?
- Boshqa fon ranglar?
- Boshqa katta matnlar (TEEN o'rniga boshqa so'z)?

Tasdiqlasangiz **CONCEPT_3_IMAGES.md** ni yozaman.
