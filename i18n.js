// ========== i18n / TRANSLATIONS ==========
// ========== i18n ==========
let currentLang = 'pl';
const LANGS = ['pl', 'en', 'de', 'ru'];
const t = {
  pl: {
    home_desc: 'Odkryj swoje lewicowe wartości. Quiz z {N} pytaniami obejmującymi 8 osi ideologicznych.',
    start_quiz: 'Rozpocznij quiz →',
    browse_ideo: 'Przeglądaj ideologie',
    history_btn: 'Historia wyników',
    inst_title: 'Zasady',
    inst_desc: 'Quiz zawiera {N} pytań w trybie pełnym. Odpowiedz na każde z nich, wybierając opcję najlepiej opisującą Twoje poglądy. Możesz wrócić do poprzedniego pytania lub pominąć pytanie.',
    inst_mode: 'Wybierz tryb quizu:',
    mode_full: 'Pełny', mode_full_desc: '112 pytań · precyzyjny wynik',
    mode_quick: 'Szybki', mode_quick_desc: '35 pytań · orientacyjny wynik',
    start: 'Zacznij →', back: 'Wróć',
    ans_sa: 'Zdecydowanie się zgadzam', ans_a: 'Zgadzam się', ans_n: 'Nie mam zdania',
    ans_d: 'Nie zgadzam się', ans_sd: 'Zdecydowanie się nie zgadzam',
    nav_back: 'Wróć', nav_skip: 'Pomiń',
    q_label: 'Pytanie {n} z {total}', axis_prefix: 'Oś',
    r_title: 'Twój wynik', r_radar: 'Wykres radarowy', r_axes: 'Twoje wartości na osiach',
    r_compare: 'Porównaj z ideologią', compare_default: '— wybierz ideologię —',
    legend_you: 'Twoje wartości', legend_ideo: 'Wzorzec ideologii',
    r_other: 'Inne ideologie', r_home: 'Strona główna', r_retake: 'Rozwiąż ponownie',
    r_ideologies: 'Wszystkie ideologie', r_history: 'Historia', r_share: 'Udostępnij wyniki',
    copy_btn: 'Kopiuj link', copied: 'Skopiowano!',
    r_disclaimer: 'Pamiętaj, że celem nie jest uzyskanie 100% w każdej kategorii.',
    ideo_title: 'Wszystkie ideologie', ideo_subtitle: 'Poznaj wartości każdej lewicowej ideologii według 7 osi. Kliknij kartę, aby dowiedzieć się więcej.',
    ideo_search: 'Szukaj ideologii…',
    f_all: 'Wszystkie', f_communist: 'Komunistyczne', f_socialist: 'Socjalistyczne', f_anarchist: 'Anarchistyczne', f_other: 'Inne',
    dd_overview: 'Przegląd', dd_figures: 'Kluczowe postacie', dd_works: 'Kluczowe teksty', dd_movements: 'Przykładowe ruchy / partie',
    dd_back: 'Wróć', dd_quiz: 'Rozwiąż quiz',
    ad_context: 'Kontekst historyczny', ad_debate: 'Główne debaty',
    hist_title: 'Historia wyników', hist_subtitle: 'Twoje poprzednie podejścia do quizu, zapisane lokalnie.',
    hist_back: 'Wróć', hist_clear: 'Wyczyść historię',
    hist_empty: 'Brak zapisanych wyników. Rozwiąż quiz, by zobaczyć historię.',
    hist_view: 'Zobacz wyniki →', hist_mode_full: 'PEŁNY', hist_mode_quick: 'SZYBKI',
    tag_communist: 'Komunistyczna', tag_socialist: 'Socjalistyczna', tag_anarchist: 'Anarchistyczna', tag_other: 'Inne',
    value_link: 'Dowiedz się więcej →',
    radar_you: 'Twoje', radar_compare: 'Ideologia',
    axes_names: ['Rewolucja','Nauka','Centralizm','Internacjonalizm','Partyjnizm','Produktywizm','Konserwatyzm','Emancypacja'],
    axes_right: ['Reforma','Utopia','Decentralizm','Nacjonalizm','Unionizm','Ekologizm','Progresywizm','Wspólnotowość'],
    export_png: 'Eksportuj PNG', exporting: 'Generowanie…',
    onb_skip: 'Pomiń', onb_next: 'Dalej →', onb_start: 'Zaczynamy!',
    onb_1_title: 'Witaj w LeftValues', onb_1_body: 'Ten quiz pomoże Ci odkryć, gdzie na mapie lewicy się znajdujesz. Odpowiedz na pytania i sprawdź, która ideologia najbardziej odpowiada Twoim poglądom.',
    onb_2_title: '7 osi ideologicznych', onb_2_body: 'Twoje odpowiedzi są mierzone na 7 osiach: od Rewolucji/Reformy po Emancypację/Wspólnotowość. Każda oś pokazuje inny wymiar lewicowej myśli.',
    onb_3_title: 'Jak odpowiadać?', onb_3_body: 'Wybierz opcję najbliższą Twoim poglądom. Możesz używać klawiszy 1–5, wrócić do poprzedniego pytania lub pominąć pytanie.',
  },
  en: {
    home_desc: 'Discover your left-wing values. A quiz with {N} questions covering 8 ideological axes.',
    start_quiz: 'Start quiz →',
    browse_ideo: 'Browse ideologies',
    history_btn: 'Results history',
    inst_title: 'Instructions',
    inst_desc: 'The quiz contains {N} questions in full mode. Answer each one by choosing the option that best describes your views. You can go back or skip a question.',
    inst_mode: 'Choose quiz mode:',
    mode_full: 'Full', mode_full_desc: '112 questions · precise result',
    mode_quick: 'Quick', mode_quick_desc: '35 questions · approximate result',
    start: 'Start →', back: 'Back',
    ans_sa: 'Strongly agree', ans_a: 'Agree', ans_n: 'No opinion',
    ans_d: 'Disagree', ans_sd: 'Strongly disagree',
    nav_back: 'Back', nav_skip: 'Skip',
    q_label: 'Question {n} of {total}', axis_prefix: 'Axis',
    r_title: 'Your result', r_radar: 'Radar chart', r_axes: 'Your values on axes',
    r_compare: 'Compare with ideology', compare_default: '— choose an ideology —',
    legend_you: 'Your values', legend_ideo: 'Ideology template',
    r_other: 'Other ideologies', r_home: 'Home', r_retake: 'Retake quiz',
    r_ideologies: 'All ideologies', r_history: 'History', r_share: 'Share results',
    copy_btn: 'Copy link', copied: 'Copied!',
    r_disclaimer: 'Remember the goal is not to score 100% in every category.',
    ideo_title: 'All ideologies', ideo_subtitle: 'Explore the values of each left-wing ideology across 7 axes. Click a card to learn more.',
    ideo_search: 'Search ideologies…',
    f_all: 'All', f_communist: 'Communist', f_socialist: 'Socialist', f_anarchist: 'Anarchist', f_other: 'Other',
    dd_overview: 'Overview', dd_figures: 'Key figures', dd_works: 'Key texts', dd_movements: 'Example movements / parties',
    dd_back: 'Back', dd_quiz: 'Take the quiz',
    ad_context: 'Historical context', ad_debate: 'Main debates',
    hist_title: 'Results history', hist_subtitle: 'Your previous quiz attempts, saved locally.',
    hist_back: 'Back', hist_clear: 'Clear history',
    hist_empty: 'No saved results. Take the quiz to see history.',
    hist_view: 'View results →', hist_mode_full: 'FULL', hist_mode_quick: 'QUICK',
    tag_communist: 'Communist', tag_socialist: 'Socialist', tag_anarchist: 'Anarchist', tag_other: 'Other',
    value_link: 'Learn more →',
    radar_you: 'Yours', radar_compare: 'Ideology',
    axes_names: ['Revolution','Science','Centralism','Internationalism','Partyism','Productivism','Conservatism','Emancipation'],
    axes_right: ['Reform','Utopia','Decentralism','Nationalism','Unionism','Ecologism','Progressivism','Communitarianism'],
    export_png: 'Export PNG', exporting: 'Generating…',
    onb_skip: 'Skip', onb_next: 'Next →', onb_start: 'Let\'s go!',
    onb_1_title: 'Welcome to LeftValues', onb_1_body: 'This quiz will help you discover where you stand on the left-wing map. Answer the questions and find out which ideology best matches your views.',
    onb_2_title: '7 ideological axes', onb_2_body: 'Your answers are measured on 7 axes: from Revolution/Reform to Emancipation/Communitarianism. Each axis shows a different dimension of left-wing thought.',
    onb_3_title: 'How to answer?', onb_3_body: 'Choose the option closest to your views. You can use keys 1–5, go back to the previous question, or skip a question.',
  },
  de: {
    home_desc: 'Entdecke deine linken Werte. Ein Quiz mit {N} Fragen zu 8 ideologischen Achsen.',
    start_quiz: 'Quiz starten →',
    browse_ideo: 'Ideologien erkunden',
    history_btn: 'Ergebnishistorie',
    inst_title: 'Anleitung',
    inst_desc: 'Das Quiz enthält im Vollmodus {N} Fragen. Beantworte jede, indem du die Option wählst, die deinen Ansichten am besten entspricht. Du kannst zurückgehen oder eine Frage überspringen.',
    inst_mode: 'Quiz-Modus wählen:',
    mode_full: 'Vollständig', mode_full_desc: '112 Fragen · präzises Ergebnis',
    mode_quick: 'Schnell', mode_quick_desc: '35 Fragen · ungefähres Ergebnis',
    start: 'Starten →', back: 'Zurück',
    ans_sa: 'Stimme voll zu', ans_a: 'Stimme zu', ans_n: 'Keine Meinung',
    ans_d: 'Stimme nicht zu', ans_sd: 'Stimme überhaupt nicht zu',
    nav_back: 'Zurück', nav_skip: 'Überspringen',
    q_label: 'Frage {n} von {total}', axis_prefix: 'Achse',
    r_title: 'Dein Ergebnis', r_radar: 'Radardiagramm', r_axes: 'Deine Werte auf den Achsen',
    r_compare: 'Mit Ideologie vergleichen', compare_default: '— Ideologie wählen —',
    legend_you: 'Deine Werte', legend_ideo: 'Ideologie-Muster',
    r_other: 'Andere Ideologien', r_home: 'Startseite', r_retake: 'Quiz wiederholen',
    r_ideologies: 'Alle Ideologien', r_history: 'Historie', r_share: 'Ergebnisse teilen',
    copy_btn: 'Link kopieren', copied: 'Kopiert!',
    r_disclaimer: 'Denke daran: Das Ziel ist nicht, in jeder Kategorie 100% zu erreichen.',
    ideo_title: 'Alle Ideologien', ideo_subtitle: 'Entdecke die Werte jeder linken Ideologie auf 7 Achsen. Klicke auf eine Karte für mehr Infos.',
    ideo_search: 'Ideologien suchen…',
    f_all: 'Alle', f_communist: 'Kommunistisch', f_socialist: 'Sozialistisch', f_anarchist: 'Anarchistisch', f_other: 'Sonstige',
    dd_overview: 'Überblick', dd_figures: 'Schlüsselfiguren', dd_works: 'Schlüsseltexte', dd_movements: 'Beispielbewegungen / -parteien',
    dd_back: 'Zurück', dd_quiz: 'Quiz machen',
    ad_context: 'Historischer Kontext', ad_debate: 'Hauptdebatten',
    hist_title: 'Ergebnishistorie', hist_subtitle: 'Deine früheren Quiz-Versuche, lokal gespeichert.',
    hist_back: 'Zurück', hist_clear: 'Historie löschen',
    hist_empty: 'Keine gespeicherten Ergebnisse. Mache das Quiz, um die Historie zu sehen.',
    hist_view: 'Ergebnisse anzeigen →', hist_mode_full: 'VOLLSTÄNDIG', hist_mode_quick: 'SCHNELL',
    tag_communist: 'Kommunistisch', tag_socialist: 'Sozialistisch', tag_anarchist: 'Anarchistisch', tag_other: 'Sonstige',
    value_link: 'Mehr erfahren →',
    radar_you: 'Deine', radar_compare: 'Ideologie',
    axes_names: ['Revolution','Wissenschaft','Zentralismus','Internationalismus','Parteiismus','Produktivismus','Konservatismus','Emanzipation'],
    axes_right: ['Reform','Utopie','Dezentralismus','Nationalismus','Gewerkschaftismus','Ökologismus','Progressivismus','Kommunitarismus'],
    export_png: 'PNG exportieren', exporting: 'Wird erstellt…',
    onb_skip: 'Überspringen', onb_next: 'Weiter →', onb_start: 'Los geht\'s!',
    onb_1_title: 'Willkommen bei LeftValues', onb_1_body: 'Dieses Quiz hilft dir herauszufinden, wo du auf der linken Karte stehst. Beantworte die Fragen und finde heraus, welche Ideologie am besten zu dir passt.',
    onb_2_title: '7 ideologische Achsen', onb_2_body: 'Deine Antworten werden auf 7 Achsen gemessen: von Revolution/Reform bis Emanzipation/Kommunitarismus. Jede Achse zeigt eine andere Dimension linken Denkens.',
    onb_3_title: 'Wie antworten?', onb_3_body: 'Wähle die Option, die deinen Ansichten am nächsten kommt. Du kannst die Tasten 1–5 verwenden, zur vorherigen Frage zurückgehen oder eine Frage überspringen.',
  },
  ru: {
    home_desc: 'Узнайте свои левые ценности. Тест из {N} вопросов по 8 идеологическим осям.',
    start_quiz: 'Начать тест →',
    browse_ideo: 'Просмотр идеологий',
    history_btn: 'История результатов',
    inst_title: 'Инструкция',
    inst_desc: 'Тест содержит {N} вопросов в полном режиме. Ответьте на каждый, выбрав вариант, наиболее точно описывающий ваши взгляды. Вы можете вернуться или пропустить вопрос.',
    inst_mode: 'Выберите режим теста:',
    mode_full: 'Полный', mode_full_desc: '112 вопросов · точный результат',
    mode_quick: 'Быстрый', mode_quick_desc: '35 вопросов · приблизительный результат',
    start: 'Начать →', back: 'Назад',
    ans_sa: 'Полностью согласен', ans_a: 'Согласен', ans_n: 'Нет мнения',
    ans_d: 'Не согласен', ans_sd: 'Категорически не согласен',
    nav_back: 'Назад', nav_skip: 'Пропустить',
    q_label: 'Вопрос {n} из {total}', axis_prefix: 'Ось',
    r_title: 'Ваш результат', r_radar: 'Радарная диаграмма', r_axes: 'Ваши значения по осям',
    r_compare: 'Сравнить с идеологией', compare_default: '— выберите идеологию —',
    legend_you: 'Ваши ценности', legend_ideo: 'Шаблон идеологии',
    r_other: 'Другие идеологии', r_home: 'Главная', r_retake: 'Пройти снова',
    r_ideologies: 'Все идеологии', r_history: 'История', r_share: 'Поделиться результатами',
    copy_btn: 'Копировать ссылку', copied: 'Скопировано!',
    r_disclaimer: 'Помните: цель — не набрать 100% в каждой категории.',
    ideo_title: 'Все идеологии', ideo_subtitle: 'Изучите ценности каждой левой идеологии по 7 осям. Нажмите на карточку, чтобы узнать больше.',
    ideo_search: 'Поиск идеологий…',
    f_all: 'Все', f_communist: 'Коммунистические', f_socialist: 'Социалистические', f_anarchist: 'Анархистские', f_other: 'Прочие',
    dd_overview: 'Обзор', dd_figures: 'Ключевые фигуры', dd_works: 'Ключевые тексты', dd_movements: 'Примеры движений / партий',
    dd_back: 'Назад', dd_quiz: 'Пройти тест',
    ad_context: 'Исторический контекст', ad_debate: 'Основные дискуссии',
    hist_title: 'История результатов', hist_subtitle: 'Ваши предыдущие попытки, сохранённые локально.',
    hist_back: 'Назад', hist_clear: 'Очистить историю',
    hist_empty: 'Нет сохранённых результатов. Пройдите тест, чтобы увидеть историю.',
    hist_view: 'Смотреть результаты →', hist_mode_full: 'ПОЛНЫЙ', hist_mode_quick: 'БЫСТРЫЙ',
    tag_communist: 'Коммунистическая', tag_socialist: 'Социалистическая', tag_anarchist: 'Анархистская', tag_other: 'Прочее',
    value_link: 'Узнать больше →',
    radar_you: 'Ваши', radar_compare: 'Идеология',
    axes_names: ['Революция','Наука','Централизм','Интернационализм','Партийность','Продуктивизм','Консерватизм','Эмансипация'],
    axes_right: ['Реформа','Утопия','Децентрализм','Национализм','Юнионизм','Экологизм','Прогрессивизм','Коммунитаризм'],
    export_png: 'Экспорт PNG', exporting: 'Создание…',
    onb_skip: 'Пропустить', onb_next: 'Далее →', onb_start: 'Начнём!',
    onb_1_title: 'Добро пожаловать в LeftValues', onb_1_body: 'Этот тест поможет вам узнать, где вы находитесь на левой карте. Ответьте на вопросы и выясните, какая идеология лучше всего соответствует вашим взглядам.',
    onb_2_title: '7 идеологических осей', onb_2_body: 'Ваши ответы измеряются по 7 осям: от Революции/Реформы до Эмансипации/Коммунитаризма. Каждая ось показывает иное измерение левой мысли.',
    onb_3_title: 'Как отвечать?', onb_3_body: 'Выберите вариант, наиболее близкий к вашим взглядам. Вы можете использовать клавиши 1–5, вернуться к предыдущему вопросу или пропустить вопрос.',
  },
};

function T(key, vars) {
  let s = t[currentLang][key] || t['pl'][key] || key;
  if(vars) Object.keys(vars).forEach(k => { s = s.replace('{'+k+'}', vars[k]); });
  return s;
}

function toggleLang() {
  const idx = LANGS.indexOf(currentLang);
  currentLang = LANGS[(idx + 1) % LANGS.length];
  const labels = {pl:'EN', en:'DE', de:'RU', ru:'PL'};
  document.getElementById('lang-toggle').textContent = labels[currentLang];
  try { localStorage.setItem('lv-lang', currentLang); } catch(e){}
  applyTranslations();
}

// ========== APPLY TRANSLATIONS ==========
function applyTranslations() {
  // Pobieramy aktualną liczbę pytań z obiektu questions
  const N = Object.keys(questions).length;

  // Strona Główna
  document.getElementById('home-desc').innerHTML = T('home_desc', { N: `<span id="q-count">${N}</span>` });
  document.getElementById('btn-start-quiz').textContent = T('start_quiz');
  document.getElementById('btn-browse').textContent = T('browse_ideo');
  document.getElementById('btn-history').textContent = T('history_btn');

  // Instrukcje i Tryby
  document.getElementById('inst-title').textContent = T('inst_title');
  document.getElementById('inst-desc').innerHTML = T('inst_desc').replace('{N}', `<strong id="q-count2">${N}</strong>`);
  document.getElementById('inst-mode-label').textContent = T('inst_mode');
  
  document.getElementById('mode-full-name').textContent = T('mode_full');
  // Dynamicznie podmieniamy "112" na aktualną liczbę pytań w opisie trybu pełnego
  document.getElementById('mode-full-desc').textContent = T('mode_full_desc').replace('112', N);
  
  document.getElementById('mode-quick-name').textContent = T('mode_quick');
  document.getElementById('mode-quick-desc').textContent = T('mode_quick_desc');
  document.getElementById('btn-start').textContent = T('start');
  document.getElementById('btn-back-home').textContent = T('back');

  // Quiz
  document.getElementById('ans-sa').textContent = T('ans_sa');
  document.getElementById('ans-a').textContent = T('ans_a');
  document.getElementById('ans-n').textContent = T('ans_n');
  document.getElementById('ans-d').textContent = T('ans_d');
  document.getElementById('ans-sd').textContent = T('ans_sd');
  document.getElementById('nav-back').textContent = T('nav_back');
  document.getElementById('nav-skip').textContent = T('nav_skip');

  // Wyniki
  document.getElementById('r-title').textContent = T('r_title');
  document.getElementById('r-radar-title').textContent = T('r_radar');
  document.getElementById('r-axes-title').textContent = T('r_axes');
  document.getElementById('r-compare-title').textContent = T('r_compare');
  document.getElementById('compare-default').textContent = T('compare_default');
  document.getElementById('legend-you').textContent = T('legend_you');
  document.getElementById('legend-ideo').textContent = T('legend_ideo');
  document.getElementById('r-other-title').textContent = T('r_other');
  document.getElementById('btn-r-home').textContent = T('r_home');
  document.getElementById('btn-r-retake').textContent = T('r_retake');
  document.getElementById('btn-r-ideologies').textContent = T('r_ideologies');
  document.getElementById('btn-r-history').textContent = T('r_history');
  document.getElementById('r-share-title').textContent = T('r_share');
  document.getElementById('copy-btn').textContent = T('copy_btn');
  document.getElementById('r-disclaimer').textContent = T('r_disclaimer');
  const exportLabel = document.getElementById('export-png-label');
  if (exportLabel) exportLabel.textContent = T('export_png');

  // Strona Ideologii
  document.getElementById('page-ideo-title').textContent = T('ideo_title');
  document.getElementById('page-ideo-subtitle').textContent = T('ideo_subtitle');
  document.getElementById('ideo-search').placeholder = T('ideo_search');
  document.getElementById('f-all').textContent = T('f_all');
  document.getElementById('f-communist').textContent = T('f_communist');
  document.getElementById('f-socialist').textContent = T('f_socialist');
  document.getElementById('f-anarchist').textContent = T('f_anarchist');
  document.getElementById('f-other').textContent = T('f_other');

  // Historia
  document.getElementById('hist-title').textContent = T('hist_title');
  document.getElementById('hist-subtitle').textContent = T('hist_subtitle');
  document.getElementById('hist-back').textContent = T('hist_back');
  document.getElementById('hist-clear-btn').textContent = T('hist_clear');

  // Przeładowanie komponentów zależnych od języka
  buildValuesGrid();
  if(document.getElementById('page-ideologies').classList.contains('active')) renderIdeologiesPage();
  if(document.getElementById('page-history').classList.contains('active')) renderHistoryPage();
}

// ========== THEME TOGGLE ==========
// ========== THEME ==========
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  const next=isDark?'light':'dark';
  html.setAttribute('data-theme',next);
  document.getElementById('theme-toggle').textContent=isDark?'☾':'☀';
  try{localStorage.setItem('lv-theme',next)}catch(e){}
  if(document.getElementById('page-results').classList.contains('active')) drawRadar();
}
try{
  const saved=localStorage.getItem('lv-theme');
  if(saved){document.documentElement.setAttribute('data-theme',saved);document.getElementById('theme-toggle').textContent=saved==='light'?'☾':'☀';}
  const savedLang=localStorage.getItem('lv-lang');
  if(savedLang && LANGS.includes(savedLang)){
    currentLang=savedLang;
    const labels = {pl:'EN', en:'DE', de:'RU', ru:'PL'};
    document.getElementById('lang-toggle').textContent=labels[savedLang]||'EN';
  }
}catch(e){}
