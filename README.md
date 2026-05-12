# 🚩 LeftValues (v2.0)

> **Odkryj swoje lewicowe wartości.** Kompleksowy quiz polityczny badający niuanse myśli lewicowej na 8 osiach ideologicznych.

---

## 🌟 O projekcie

LeftValues to nowoczesna, responsywna aplikacja webowa (SPA), która pozwala użytkownikowi precyzyjnie określić swoje poglądy polityczne w ramach szerokiego spektrum lewicy. W przeciwieństwie do tradycyjnych kompasów, projekt skupia się na specyficznych dla lewicy sporach taktycznych, filozoficznych i społecznych.

**Kluczowe cechy wersji 2.0:**
* **Modularność:** Kod został rozbity na oddzielne pliki (`app.js`, `data.js`, `i18n.js`), co ułatwia zarządzanie i rozwój.
* **8. Oś:** Dodano oś **Emancypacja ↔ Wspólnotowość**, badającą podejście do kwestii tożsamościowych i genderowych.
* **Kompas 2D:** Wizualizacja wyników na dwuwymiarowej mapie (Internacjonalizm/Nacjonalizm vs Centralizm/Libertarianizm).
* **Interaktywny Słownik:** System tooltipów wyjaśniający trudne pojęcia (np. *Materializm historyczny*) bezpośrednio podczas quizu.

---

## 🛠 Technologie

* **Vanilla JavaScript (ES6+):** Logika oparta na czystym JS, brak ciężkich frameworków.
* **CSS3 z Modern UI:** Wykorzystanie zmiennych, siatek (Grid), Flexboxa oraz zaawansowanych animacji.
* **PWA (Progressive Web App):** Dzięki `sw.js` aplikacja działa w pełni offline i może być zainstalowana na systemach iOS/Android.
* **Canvas & SVG:** Dynamiczne generowanie wykresów radarowych oraz eksport wyników do formatu PNG.

---

## 📊 Osie Ideologiczne

Quiz mierzy poglądy na ośmiu kluczowych płaszczyznach:

| Oś | Lewa Strona (Dodatnia) | Prawa Strona (Ujemna) | Opis |
|:---:|:--- |:--- |:--- |
| **A** | **Rewolucja** | **Reforma** | Metoda zmiany systemu: radykalne obalenie vs stopniowe zmiany. |
| **B** | **Nauka** | **Utopia** | Fundament teorii: materializm dialektyczny vs wizje idealistyczne. |
| **C** | **Centralizm** | **Decentralizm** | Zarządzanie: silne państwo vs oddolne rady/komuny. |
| **D** | **Internacjonalizm** | **Nacjonalizm** | Zasięg ruchu: globalna solidarność vs interes narodowy. |
| **E** | **Partyjnizm** | **Unionizm** | Narzędzie walki: zdyscyplinowana partia vs związki zawodowe (syndykalizm). |
| **F** | **Produktywizm** | **Ekologizm** | Rozwój: industrializacja vs ochrona biosfery i degrowth. |
| **G** | **Konserwatyzm** | **Progresywizm** | Kultura: tradycyjne wartości vs wolność jednostki i postęp społeczny. |
| **H** | **Emancypacja** | **Wspólnotowość** | Tożsamość: walka z patriarchatem vs priorytet wspólnoty klasowej. |

---

## 📂 Struktura Projektu

* `index.html` – Główny szkielet aplikacji i kontenery dla widoków (Home, Quiz, Results, Ideologies).
* `style.css` – Kompletny arkusz stylów (obsługa Dark/Light mode, Accessibility mode).
* `data.js` – Baza 129 pytań, definicje 20 ideologii oraz dane historyczne osi.
* `app.js` – Główny silnik: scoring, routing, generowanie wykresów (Radar, Compass).
* `i18n.js` – System wielojęzyczności (PL, EN, DE, RU) i dynamicznego podmieniania treści.
* `sw.js` – Service Worker umożliwiający działanie w trybie offline i caching zasobów.

---

## 🚀 Funkcje Specjalne

1. **Analiza Wyników:** System analizuje Twoje najbardziej zdecydowane odpowiedzi i wyświetla sekcję "Dlaczego taki wynik?".
2. **Porównywarka:** Możliwość nałożenia wzorca dowolnej z 20 ideologii (np. Trockizmu czy Anarcho-komunizmu) na Twój własny wykres radarowy.
3. **Historia Lokalna:** Wyniki są automatycznie zapisywane w `localStorage`, co pozwala na porównywanie swoich poglądów w czasie.
4. **Eksport do PNG:** Wbudowany generator grafik pozwala pobrać kartę wyników gotową do udostępnienia.
5. **Tryb Dostępności (A+):** Specjalny tryb zwiększający kontrast i powiększający fonty dla osób niedowidzących.

---

## 📥 Instalacja i Uruchomienie

Aplikacja nie wymaga skomplikowanej konfiguracji:

1. Sklonuj repozytorium.
2. Uruchom lokalny serwer (np. `Live Server` w VS Code lub `python -m http.server`).
   * *Uwaga: Service Worker i PWA wymagają serwera HTTP (localhost) do poprawnego działania.*
3. Otwórz `index.html` w przeglądarce.

---
*Autor projektu: Szymon Rokicki*
*Inspirowane oryginalnym projektem LeftValues.*