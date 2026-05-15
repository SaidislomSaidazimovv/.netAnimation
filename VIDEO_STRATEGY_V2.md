# Video Generatsiya Strategiyasi v2.0
## Birinchi urinishdan saboq + yangi yondashuv

**Sana:** 2026-05-14
**Status:** Birinchi prompt muvaffaqiyatsiz — yangi strategiya

---

## 1. BIRINCHI URINISHDA NIMA XATO BO'LDI

### Aniqlangan muammolar:
1. **Multik (cartoon) ko'rinishi** — photorealism kalit so'zlari yetarli emas edi
2. **Kamera qimirlamadi** — AI default'da static camera ishlaydi
3. **Kapalak qanotlari insonga "yopishdi"** — mato → kapalak transformatsiya AI uchun juda qiyin
4. **Mato fizikasi tabiiy emas** — silk physics talab qilinmadi

### Texnik sabab:
AI video model'lar (Runway, Sora, Kling) **bitta uzluksiz harakat** ni yaxshi bajaradi. Bizning birinchi prompt'da **5-6 ta murakkab voqea** bor edi — bu modelni "chayqalishga" majbur qildi.

---

## 2. YANGI YONDASHUV — Soddalashtirilgan AI + JavaScript Layering

### Asosiy g'oya:
**AI faqat asosiy ko'rinishni** qiladi (inson + mato + kamera). **Kapalaklar JavaScript bilan** alohida qatlamda qo'shiladi.

### Bu nima uchun ishlaydi:

| Element | Eski (yomon) | Yangi (yaxshi) |
|---|---|---|
| AI vazifasi | 6 ta murakkab harakat | **3 ta sodda harakat** |
| Kapalak transformatsiya | AI qildi (xato) | **JavaScript** (aniq nazorat) |
| Kamera harakati | Tilab edi, lekin yo'q edi | **Aniq kalit so'zlar bilan** |
| Photorealism | "photorealistic" deyilgan | **Aniq kamera modeli + lens** |
| Mato fizikasi | "realistic silk" | **"slow motion silk falling, gravity, weight"** |

---

## 3. YANGI VIDEO PROMPT (sinab ko'rilgan format)

### Asosiy prompt (Runway Gen-3 uchun, copy/paste):

```
A slow cinematic orbital tracking shot, camera slowly circles 
around a person standing still, completely covered by a flowing 
white silk sheet that drapes down to the floor. The silk slowly 
slides off the figure due to gravity, falling naturally to the 
ground in slow motion, revealing the person's silhouette and 
raised hands beneath. 

Camera movement: smooth dolly orbit, 45 degree rotation, gentle 
push-in toward the subject.

Lighting: single key light from above creating dramatic rim light, 
deep shadows, volumetric god rays, dust particles floating in air.

Background: dark empty studio, deep black void, slight bokeh.

Shot on ARRI Alexa Mini LF with 50mm anamorphic lens, 4K, 60fps, 
shallow depth of field, cinematic color grading inspired by 
Roger Deakins, photorealistic, no animation, no cartoon, 
no fantasy elements.

Reference: Apple product reveal commercials, Ford Mustang 
"Rediscover the Classics" cinematography.
```

### Nima uchun bu prompt ishlaydi:

| Kalit so'z | Nima beradi |
|---|---|
| `slow cinematic orbital tracking shot` | Kamera 100% harakatlanadi |
| `camera slowly circles` | Aniq harakat turi |
| `45 degree rotation` | Aniq miqdor — AI "biror nima" qilmaydi, aniq 45° |
| `gravity, falling naturally` | Mato fizikasi real |
| `slow motion` | Sekinlik — chiroyli ko'rinadi |
| `ARRI Alexa Mini LF`, `anamorphic lens` | Aniq kamera modeli = real ko'rinish |
| `Roger Deakins` | Mashhur kinochi nomi = AI uning stilini emulatsiya qiladi |
| `no animation, no cartoon, no fantasy` | **NEGATIVE prompt** — multik chiqarmaydi |
| `volumetric god rays, dust particles` | Atmosfera, cinema look |

### MUHIM: Kapalak SO'ZINI prompt'da YOZMAYMIZ!

Bu eng muhim o'zgarish. AI kapalak so'zini ko'rsa, **insonga kapalak qanot chizishga harakat qiladi**. Kapalaklarni biz **JavaScript bilan alohida qatlamda** qo'shamiz.

---

## 4. NEGATIVE PROMPT (Runway "Negative" maydoniga)

Bularni AI generatsiya qilmasligi kerak:
```
butterflies, cartoon, animation, anime, fantasy, magic, 
glowing, neon colors, smooth gradient, illustration, 
painted, drawn, stylized, surreal, dreamlike, ethereal, 
sparkles, particles attached to body, wings on person
```

---

## 5. STORYBOARD QAYTA QURISH (kapalaksiz AI video)

### Yangi 4 soniyali AI video:

| Vaqt | Sahna | Eslatma |
|---|---|---|
| 0.0-1.0s | Wide shot, mato yopilgan inson | Kamera asta-sekin kirib boradi |
| 1.0-2.5s | Kamera 45° yon tomonga aylanadi | Mato shamol bilan tebranadi |
| 2.5-3.5s | Mato gravitatsiya bilan tushadi | Pastga sekin qulaydi |
| 3.5-4.0s | Inson qo'llari ko'rinadi (raised) | Yarim final pozasida |

**Endi kapalaklar yo'q. Inson hatto Butterfly Sign pozasini ham qilmaydi — faqat qo'llari yuqoriga ko'tarilgan.**

### Kapalaklarni JavaScript qiladi:
- 50-100 ta SVG kapalak (Pixabay'dan bepul)
- Mato tushgan paytidan boshlab, har bir kapalak ekranga uchib chiqadi
- Scroll progress 0.5 dan boshlab ko'rinadi
- Inson qo'llari ko'rinishi bilan kapalaklar atrofida ko'p bo'ladi

Bu **yaxshiroq** ko'rinadi, chunki:
1. Kapalaklar har safar boshqacha uchadi (no static animation)
2. Mobile'da kam resurs ishlatadi
3. Interaktiv (hover effekt qo'shsa bo'ladi)
4. AI muammosi yo'q

---

## 6. QO'L POZASINI ALOHIDA HAL QILISH

"Butterfly Sign" pozasi murakkab — boshmaldoqlar kesishgan, barmoqlar yoyilgan. AI buni har xil chiqaradi.

### Yechim: 2 ta alohida video clipini birlashtirish

**Clip 1 (3 soniya): Mato yechilishi**
- Inson silueti, mato tushadi, oddiy "qo'llar yuqoriga" pozasida

**Clip 2 (1 soniya): Yaqin kadr — qo'llar**
- Faqat 2 ta qo'l, Butterfly Sign pozasida
- Ushbu pozani **rasm sifatida** (Midjourney) generatsiya qilish osonroq
- So'ng rasm→video (Runway image-to-video) bilan 1 soniya animatsiya

**FFmpeg bilan ulaymiz:**
```bash
ffmpeg -i clip1.mp4 -i clip2.mp4 -filter_complex \
  "[0:v][1:v]concat=n=2:v=1" output.mp4
```

### Butterfly Sign pozasi uchun aniq Midjourney prompt:

```
Close-up photograph of two hands forming a butterfly with 
crossed thumbs and spread fingers like wings, isolated on 
dark background, golden warm lighting, photorealistic, 
shot on 50mm macro lens, shallow depth of field, 
sign language gesture, hand symbol, sharp focus, 
high detail skin texture, no jewelry, neutral skin tone
```

---

## 7. KONKRET HARAKAT REJASI

### Bugun (Day 1):

1. **Runway Standard obuna** ($15) — agar yo'q bo'lsa
2. **Yuqoridagi yangi promptni** Runway'ga joylash
3. **Negative prompt** qo'shish
4. **Gen-3 Alpha Turbo** model
5. **4 soniyali** so'rash
6. **3-5 ta variant** generatsiya — eng yaxshisini tanlash
7. Agar **kamera hali ham qimirlamasa:**
   - Promptga `"strong camera movement, dynamic orbital tracking, NOT static"` qo'shish
   - Yoki Kling AI'ga o'tish (kamera harakatlarini yaxshiroq bajaradi)

### Kunning oxirida tekshirish:

- [ ] Mato realistik tushadi?
- [ ] Kamera aniq harakatda?
- [ ] Photorealistic (multik emas)?
- [ ] Inson tanasi tabiiy?
- [ ] Hech qaerda kapalak qanot yo'q (kerak emas)?

Agar 4 tasi ham ✅ bo'lsa — Day 2'ga o'tamiz. Aks holda — qayta prompt.

---

## 8. ZAXIRA REJALAR (agar Yondashuv A ishlamasa)

### Plan B: Image-to-Video (aniqroq nazorat)

1. Midjourney bilan **5 ta keyframe rasm** generatsiya
2. Runway "Image to Video" rejimida har bir rasmni 1 soniyaga animatsiya
3. FFmpeg bilan birlashtirish

**Misol Midjourney prompts:**
```
Frame 1: Wide shot person covered in white silk fabric, dark studio
Frame 2: Same scene, camera angle 30 degrees rotated, fabric slightly billowing
Frame 3: Same scene, camera at 60 degrees, fabric beginning to slide
Frame 4: Camera at 90 degrees side view, fabric half off, silhouette visible
Frame 5: Person revealed with hands raised, fabric pooled on floor
```

### Plan C: Real video + AI stylization

1. Telefonda 4 soniya video olish: kishi mato bilan yopilgan, mato yechadi
2. Telefonni qo'lda asta-sekin aylantirish (kamera harakati)
3. Runway "Video to Video" → cinematic stilizatsiya
4. Yoki Topaz Video AI → cinema look

Bu eng tezkor variant, lekin setup kerak.

---

## 9. KAMERA HARAKATI UCHUN MAXSUS KALIT SO'ZLAR

Agar kamera hech qachon qimirlamasa, quyidagilarni sinab ko'ring:

| Kerak | Kalit so'z |
|---|---|
| Aylana harakat | `orbital tracking shot`, `360 degree pan around subject` |
| Yaqinlashish | `dolly zoom in`, `push-in shot`, `gradual zoom` |
| Yon tomon | `lateral tracking`, `side dolly shot` |
| Yuqori-past | `crane shot`, `vertical pan` |
| Aralash | `complex cinematic camera move`, `motion control rig` |

**Eng muhim:** Promptda **"camera"** so'zini **kamida 3 marta** takrorlang.

---

## 10. KAMERA SIFATI UCHUN KALIT SO'ZLAR

Multik chiqmasligi uchun **majburiy**:

- `shot on ARRI Alexa` / `RED Komodo` / `Sony Venice` (kamera modeli)
- `50mm anamorphic lens` / `35mm prime` (lens turi)
- `Kodak Vision3 500T` / `Fujifilm Eterna` (film stock)
- `shallow depth of field, f/1.8`
- `color grading by Roger Deakins` / `cinematography of Emmanuel Lubezki`
- `practical lighting, no CGI`
- `documentary realism`
- `IMAX quality, 70mm`

**Stildan saqlanish:**
- ❌ `dreamy`, `ethereal`, `magical`, `surreal`
- ❌ `vibrant colors`, `saturated`
- ❌ `painted look`, `illustration style`
- ❌ `Pixar style`, `animated`

---

## 11. YAKUNIY MASLAHATLAR

1. **3-5 ta urinish** odatiy — birinchi urinishda mukammal chiqmaydi
2. **Bir vaqtning o'zida bir o'zgarish** sinash (prompt'da bir-bir element o'zgartirish)
3. **Eng yaxshi variantlarni** SAQLAB qolish (keyin solishtirish uchun)
4. **Runway "Extend"** funksiyasi — agar 4 soniya kam bo'lsa, oxiridan davom ettirish mumkin
5. **AI yordamchidan** prompt analizi so'rash — har urinishdan keyin "nima xato edi?" deb so'rash

---

## STATUS

Birinchi prompt muvaffaqiyatsiz tugadi (multik + statik kamera + kapalak xato). Yangi prompt va yondashuv tayyor. **Day 1'ni qaytadan boshlaymiz** — yangi prompt bilan.
