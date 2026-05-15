# Konsepsiya 4 — Emotional Journey
## Horizontal Scroll-Triggered Emotional Object Carousel

**Sana:** 2026-05-15
**Texnik nom:** Horizontal Scroll-Triggered Product Carousel with Pinned Scroll
**Inspiratsiya:** Zero Point energy drink (horizontal slide pattern)
**Asosiy g'oya:** Mental health journey — 5 ta universal hissiy ramz

---

## 1. KONSEPSIYA UMUMIY

Mental health journey'ning 5 ta **universal hissiy bosqichi**, har biri bitta **emotional object** orqali ifodalanadi:

1. **Tear drop** — feeling vulnerable (zaiflikni his qilish)
2. **Heart beat** — realizing you're alive (hayotda ekanligingni anglash)
3. **Flower** — growing through it (o'sish)
4. **Candle** — finding hope (umid topish)
5. **Sunrise** — new beginning (yangi boshlanish)

Hech qanday butterfly yoki imo-ishora yo'q — har obyekt **o'z hissiyoti** bilan tushinarli.

---

## 2. ANIMATSIYA MEXANIZMI

```
[Card 1 — TEAR DROP]                  ← To'liq ko'rinadi
   ↓ user scrolls
[Card 1 LEFT, Card 2 RIGHT]           ← Transition
   ↓
[Card 2 — HEART BEAT]                 ← To'liq ko'rinadi
   ↓ ...
[Card 5 — SUNRISE]                    ← FINAL (CTA)
```

### Texnologiya:
- **GSAP ScrollTrigger** + `pin: true` + `scrub: true`
- Container `position: sticky`
- Inner cards `translateX` orqali harakatlanadi
- Background o'zgaradi (rang gradient transition)
- Asosiy obyekt va atrofdagi floating elementlar almashinadi

---

## 3. 5 TA CARD — STRUKTURA

```
Card 1 — TEAR DROP    "It's okay to feel"     Cool blue gradient
Card 2 — HEART BEAT   "You matter"             Warm red gradient
Card 3 — FLOWER       "Recovery is possible"   Pink-green gradient
Card 4 — CANDLE       "Light in darkness"      Golden warm gradient
Card 5 — SUNRISE      "Tomorrow is yours"      Pink-gold gradient
```

---

## 4. HAR CARD UCHUN TASVIR

### 💧 Card 1 — TEAR DROP ("It's okay to feel")
```
Title:    "VULNERABILITY"
Subtitle: "It's okay to feel"
Accent color: Cool blue (#3B82F6 → #1E3A8A)

Visual:   Single perfect tear drop on glass/skin surface,
          macro photography, crystal clear water droplet,
          reflecting light, catching the light beautifully
Floating: Subtle water particles, gentle ripples, soft mist
Background: Cool blue cinematic atmosphere

Ma'no:    "It's okay to not be okay. Feeling is human."
```

### 💗 Card 2 — HEART BEAT ("You matter")
```
Title:    "LIFE SIGNAL"
Subtitle: "You matter"
Accent color: Warm red (#EF4444 → #991B1B)

Visual:   ECG heart beat line on a dark medical monitor,
          glowing red/orange line pulsing across the screen,
          rhythmic peaks of a healthy heartbeat
Floating: Subtle light pulses, particles flowing with rhythm
Background: Dark monitor with red accent glow

Ma'no:    "Your heart still beats. Your life still counts."
```

### 🌸 Card 3 — BLOOMING FLOWER ("Recovery is possible")
```
Title:    "GROWTH"
Subtitle: "Recovery is possible"
Accent color: Pink + green (#EC4899 → #10B981)

Visual:   A single cherry blossom or wildflower opening from
          a bud into full bloom, captured at peak beauty,
          delicate petals, soft natural light
Floating: Pollen particles, soft petals drifting, gentle breeze
Background: Soft natural blur, dawn-like atmosphere

Ma'no:    "From small things, beauty grows."
```

### 🕯️ Card 4 — CANDLE FLAME ("Light in darkness")
```
Title:    "HOPE"
Subtitle: "Light in darkness"
Accent color: Golden warm (#F59E0B → #FBBF24)

Visual:   A single lit candle with a tall warm flame,
          casting golden light, beeswax candle on simple stand,
          flame dancing gently, smoke rising softly
Floating: Glowing embers, dust particles in light beam,
          soft volumetric god rays from the flame
Background: Deep dark contrast, dramatic chiaroscuro

Ma'no:    "Even one small light can break the darkness."
```

### 🌅 Card 5 — SUNRISE ("Tomorrow is yours") — FINAL
```
Title:    "NEW BEGINNING"
Subtitle: "Tomorrow is yours"
Accent color: Pink + gold (#F472B6 → #FCD34D)

Visual:   Sunrise over a calm horizon line, sun just cresting
          the edge, soft pink and gold sky, peaceful atmosphere,
          first rays of new day
Floating: Soft light particles, morning mist, gentle dust
Background: Wide horizontal sky, sense of expanse

Animation: Sun slowly rising, light intensifying

CTA: "Learn More" → butterflychallenge.net

Ma'no:    "Every sunrise is a chance. Tomorrow is yours."
```

---

## 5. VIZUAL STRUKTURA (har card)

```
┌────────────────────────────────────────────────┐
│  [Top nav]                       [Menu items] │
│                                                │
│   [Title left]               [Subtitle right] │
│   VULNERABILITY                It's okay to    │
│   ─                            feel.           │
│                                                │
│            ╭───────────────╮                  │
│            │               │                  │
│            │  [OBJECT]     │  ← markaziy      │
│            │  centered     │     obyekt       │
│            │               │                  │
│            ╰───────────────╯                  │
│                                                │
│        [floating elements around]              │
│        [← →  navigation]                       │
└────────────────────────────────────────────────┘
```

Zero Point uslubidagi kabi:
- Obyekt **markazda**
- Atrofda **floating elements**
- Background **rang temasi** bilan
- Faqat obyekt + accent elementlar almashinadi

---

## 6. RANG VA UMUMIY USLUB

Har card o'z **rang temasi**, lekin uslub bir xil:

```
Card 1 (TEAR DROP):   Cool blue gradient (#3B82F6 → #1E3A8A)
Card 2 (HEART BEAT):  Warm red gradient (#EF4444 → #991B1B)
Card 3 (FLOWER):      Pink + green (#EC4899 → #10B981)
Card 4 (CANDLE):      Golden warm (#F59E0B → #FBBF24)
Card 5 (SUNRISE):     Pink + gold (#F472B6 → #FCD34D)
```

### Tipografiya:
- **Title (big):** `Fraunces` (serif) yoki `Playfair Display`
- **Subtitle (italic):** `Fraunces` italic
- **Description:** `Inter` regular

---

## 7. ASSETS — RASMLAR

Har card uchun **bir asosiy obyekt** + **atrof elementlar**:

| Card | Asosiy obyekt | Floating elementlar |
|---|---|---|
| 1. Tear drop | Single water droplet | Mist, ripples, water particles |
| 2. Heart beat | ECG line on monitor | Pulse particles, light rhythms |
| 3. Flower | Single blooming flower | Petals, pollen, soft breeze |
| 4. Candle | Lit candle with flame | Embers, dust, god rays |
| 5. Sunrise | Sun cresting horizon | Mist, light particles |

**Format:** PNG transparent (yoki PNG with gradient background).

---

## 8. TEXNIK IMPLEMENTATSIYA (qisqacha)

```typescript
<section className="emotion-carousel-container" ref={containerRef}>
  <div className="cards-track" ref={trackRef}>
    {emotionCards.map((card, i) => (
      <div className="emotion-card" key={i} style={{ background: card.gradient }}>
        <h2>{card.title}</h2>
        <p>{card.subtitle}</p>
        <img src={card.image} alt={card.title} />
        <FloatingElements particles={card.particles} />
      </div>
    ))}
  </div>
</section>

// GSAP horizontal scroll:
useGSAP(() => {
  gsap.to(trackRef.current, {
    x: () => -(trackRef.current.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 1,
      end: () => '+=' + trackRef.current.scrollWidth,
    }
  });
});
```

---

## 9. IMPLEMENTATSIYA BOSQICHLARI

| Kun | Vazifa |
|---|---|
| Kun 1 | 5 ta emotional object AI generatsiya |
| Kun 2 | Floating elements (transparent PNG) |
| Kun 3 | Next.js + GSAP horizontal scroll setup |
| Kun 4 | Background gradients, text overlay |
| Kun 5 | Mobile, polish, deploy |

**Jami: 5 kun**

---

## 10. KEYINGI QADAMLAR

Tasdiqlasangiz **CONCEPT_4_IMAGES.md** (5 ta to'liq prompt) yozaman.

---

## SAVOL — SIZGA

1. **5 ta hissiy bosqich** to'g'ri kelyaptimi?
   - Tear drop → Heart beat → Flower → Candle → Sunrise
   - Yoki boshqa bosqichlar?
   
2. **Title/Subtitle** ma'qulmi?
   - Vulnerability / Life Signal / Growth / Hope / New Beginning
   - Yoki boshqacha?

3. **Final card** — Sunrise ("Tomorrow is yours") ma'qulmi?

Tanlovingizni ayting.
