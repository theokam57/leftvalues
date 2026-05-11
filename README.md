# LeftValues

> Quiz polityczny badający Twoje lewicowe wartości na 7 osiach ideologicznych.

---

## O projekcie

LeftValues to jednostronicowy quiz w czystym HTML/CSS/JS. Działa lokalnie po otwarciu pliku w przeglądarce i w pełni offline po pierwszym załadowaniu (Service Worker).

Inspirowany oryginalnym projektem [LeftValues](https://github.com/LeftValues/leftvalues.github.io), rozbudowany o nowe pytania, ideologie i funkcje.

---

## Funkcje

- **112 pytań** w 7 kategoriach tematycznych
- **7 osi ideologicznych** — każda odpowiedź wpływa na jedną lub więcej osi
- **20 ideologii** — dopasowanie wyników do najbliższej ideologii lewicowej
- **Tryb porównaj** — nałóż wzorzec dowolnej ideologii na swoje wyniki
- **Udostępnianie wyników** — wyniki zakodowane w URL (`#r=...`), link działa bez serwera
- **Strona encyklopedyczna** — przeglądaj wszystkie ideologie z filtrami i mini-paskami osi
- **Ciemny / jasny motyw** — przełącznik w headerze, preferencja zapisana w `localStorage`
- **PWA** — możliwość instalacji jako aplikacja na telefonie (iOS i Android)
- **Tryb offline** — Service Worker cachuje stronę po pierwszym załadowaniu

---

## Osie ideologiczne

| Oś | Lewa strona         | Prawa strona         |
|----|---------------------|----------------------|
| A  | Rewolucja           | Reforma              |
| B  | Nauka (materializm) | Utopia               |
| C  | Centralizm          | Decentralizm         |
| D  | Internacjonalizm    | Nacjonalizm          |
| E  | Partyjnizm          | Unionizm             |
| F  | Produktywizm        | Ekologizm            |
| G  | Konserwatyzm        | Progresywizm         |

Każde pytanie ma przypisane wagi dla każdej osi (od -10 do +10). Odpowiedź "Zdecydowanie się zgadzam" mnoży wagę przez 1.0, "Zgadzam się" przez 0.5, "Nie mam zdania" przez 0.0, itd. Wynik końcowy każdej osi jest normalizowany do skali 0–100%.

---

## Ideologie

Quiz rozpoznaje 20 ideologii podzielonych na 4 grupy:

**Komunistyczne** — Marksizm-Leninizm, Marksizm Ortodoksyjny, Eko-Marksizm, Marksizm Centrystyczny, Komunizm Rad Pracowniczych, Lewicowy Komunizm, Maoizm, Titoizm, Trockizm

**Socjalistyczne** — Utopijny Socjalizm, Demokratyczny Socjalizm, Socjaldemokracja, Zielony Socjalizm

**Anarchistyczne** — Anarcho-Komunizm, Eko-Anarchizm, Anarchizm Rynkowy, Syndykalizm, Libertariański Socjalizm

**Inne** — Lewicowy Nacjonalizm, Socjalizm Islamski

Dopasowanie obliczane jest jako odległość euklidesowa w przestrzeni 7-wymiarowej między wynikami użytkownika a wzorcowymi wartościami każdej ideologii.

---

## Struktura pliku

Cały projekt to jeden plik `index.html`:

```
<head>
  meta tags, PWA manifest (inline blob), Service Worker, czcionki
<body>
  #page-home         — strona startowa z kartami osi
  #page-instructions — instrukcje
  #page-quiz         — quiz z paskiem postępu
  #page-results      — wyniki z osiami, porównywarką i udostępnianiem
  #page-ideologies   — encyklopedia ideologii z filtrami
<script>
  questions{}        — 112 pytań z wagami osi
  ideologies{}       — 20 ideologii ze wzorcowymi wartościami
  logika quizu       — shuffle, scoring, renderowanie, routing stron
```

---

## Uruchamianie

Otwórz plik bezpośrednio w przeglądarce:

```bash
# Lokalnie
open index.html

# Lub przez prosty serwer HTTP (wymagany dla Service Workera)
python3 -m http.server 8080
# → http://localhost:8080/index.html
```

> Service Worker wymaga kontekstu HTTPS lub `localhost` — przy otwieraniu pliku przez `file://` tryb offline nie zadziała, ale cała reszta quizu działa normalnie.

---

## Instalacja jako aplikacja mobilna

**Android (Chrome)**
1. Otwórz stronę w Chrome
2. Menu → "Dodaj do ekranu głównego"
3. Aplikacja pojawia się w launcherze bez paska przeglądarki

**iOS (Safari)**
1. Otwórz stronę w Safari
2. Przycisk udostępniania → "Dodaj do ekranu głównego"
3. Aplikacja działa w trybie pełnoekranowym

---

## Udostępnianie wyników

Wyniki są kodowane w hashu URL jako 7 liczb (wartości procentowe każdej osi):

```
https://leftvalues.szymonorkicki.pl/quiz.html#r=72-45-60-80-55-30-88
```

Każda liczba odpowiada osi A–G w kolejności. Link można skopiować przyciskiem na stronie wyników — odbiorca zobaczy dokładnie te same wyniki.

---

## Wkład i sugestie

Projekt jest otwarty na rozszerzenia:

- Dodanie pytań — rozszerz obiekt `questions` w skrypcie, zachowując format `{pl:"...", a:N, b:N, ...}`
- Dodanie ideologii — rozszerz obiekt `ideologies` z polem `tag` (communist/socialist/anarchist/other)
- Tłumaczenia — pytania mają pole `pl`, można dodać `en`, `de` itp. i przełączać język dynamicznie

---

## Technologie

- Czysty HTML5 / CSS3 / JavaScript (ES6+) — zero zależności runtime
- [Google Fonts](https://fonts.google.com) — Playfair Display, IBM Plex Mono, IBM Plex Sans
- Web App Manifest (generowany inline jako Blob URL)
- Service Worker (rejestrowany inline jako Blob URL)

---

## Licencja

Projekt na licencji MIT. Możesz swobodnie używać, modyfikować i dystrybuować.