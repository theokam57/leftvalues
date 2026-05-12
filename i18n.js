// ========== i18n / TRANSLATIONS ==========
// ========== i18n ==========
let currentLang = 'pl';
const t = {
  pl: {
    home_desc: 'Odkryj swoje lewicowe wartości. Quiz z {N} pytaniami obejmującymi 7 osi ideologicznych.',
    start_quiz: 'Rozpocznij quiz →',
    browse_ideo: 'Przeglądaj ideologie',
    history_btn: 'Historia wyników',
    inst_title: 'Zasady',
    inst_desc: 'Quiz zawiera {N} pytań w trybie pełnym. Odpowiedz na każde z nich, wybierając opcję najlepiej opisującą Twoje poglądy. Możesz wrócić do poprzedniego pytania lub pominąć pytanie.',
    inst_mode: 'Wybierz tryb quizu:',
    mode_full: 'Pełny', mode_full_desc: '112 pytań · precyzyjny wynik',
    mode_quick: 'Szybki', mode_quick_desc: '30 pytań · orientacyjny wynik',
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
    axes_names: ['Rewolucja','Nauka','Centralizm','Internacjonalizm','Partyjnizm','Produktywizm','Konserwatyzm'],
    axes_right: ['Reforma','Utopia','Decentralizm','Nacjonalizm','Unionizm','Ekologizm','Progresywizm'],
  },
  en: {
    home_desc: 'Discover your left-wing values. A quiz with {N} questions covering 7 ideological axes.',
    start_quiz: 'Start quiz →',
    browse_ideo: 'Browse ideologies',
    history_btn: 'Results history',
    inst_title: 'Instructions',
    inst_desc: 'The quiz contains {N} questions in full mode. Answer each one by choosing the option that best describes your views. You can go back or skip a question.',
    inst_mode: 'Choose quiz mode:',
    mode_full: 'Full', mode_full_desc: '112 questions · precise result',
    mode_quick: 'Quick', mode_quick_desc: '30 questions · approximate result',
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
    axes_names: ['Revolution','Science','Centralism','Internationalism','Partyism','Productivism','Conservatism'],
    axes_right: ['Reform','Utopia','Decentralism','Nationalism','Unionism','Ecologism','Progressivism'],
  }
};

function T(key, vars) {
  let s = t[currentLang][key] || t['pl'][key] || key;
  if(vars) Object.keys(vars).forEach(k => { s = s.replace('{'+k+'}', vars[k]); });
  return s;
}

function toggleLang() {
  currentLang = currentLang === 'pl' ? 'en' : 'pl';
  document.getElementById('lang-toggle').textContent = currentLang === 'pl' ? 'EN' : 'PL';
  try { localStorage.setItem('lv-lang', currentLang); } catch(e){}
  applyTranslations();
}

// ========== APPLY TRANSLATIONS ==========
function applyTranslations() {
  const N = Object.keys(questions).length;
  document.getElementById('home-desc').innerHTML = T('home_desc',{N:'<span id="q-count">'+N+'</span>'});
  document.getElementById('btn-start-quiz').textContent = T('start_quiz');
  document.getElementById('btn-browse').textContent = T('browse_ideo');
  document.getElementById('btn-history').textContent = T('history_btn');
  document.getElementById('inst-title').textContent = T('inst_title');
  document.getElementById('q-count2').textContent = N;
  document.getElementById('inst-desc').innerHTML = T('inst_desc').replace('{N}','<strong id="q-count2">'+N+'</strong>');
  document.getElementById('inst-mode-label').textContent = T('inst_mode');
  document.getElementById('mode-full-name').textContent = T('mode_full');
  document.getElementById('mode-full-desc').textContent = T('mode_full_desc');
  document.getElementById('mode-quick-name').textContent = T('mode_quick');
  document.getElementById('mode-quick-desc').textContent = T('mode_quick_desc');
  document.getElementById('btn-start').textContent = T('start');
  document.getElementById('btn-back-home').textContent = T('back');
  document.getElementById('ans-sa').textContent = T('ans_sa');
  document.getElementById('ans-a').textContent = T('ans_a');
  document.getElementById('ans-n').textContent = T('ans_n');
  document.getElementById('ans-d').textContent = T('ans_d');
  document.getElementById('ans-sd').textContent = T('ans_sd');
  document.getElementById('nav-back').textContent = T('nav_back');
  document.getElementById('nav-skip').textContent = T('nav_skip');
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
  document.getElementById('page-ideo-title').textContent = T('ideo_title');
  document.getElementById('page-ideo-subtitle').textContent = T('ideo_subtitle');
  document.getElementById('ideo-search').placeholder = T('ideo_search');
  document.getElementById('f-all').textContent = T('f_all');
  document.getElementById('f-communist').textContent = T('f_communist');
  document.getElementById('f-socialist').textContent = T('f_socialist');
  document.getElementById('f-anarchist').textContent = T('f_anarchist');
  document.getElementById('f-other').textContent = T('f_other');
  document.getElementById('hist-title').textContent = T('hist_title');
  document.getElementById('hist-subtitle').textContent = T('hist_subtitle');
  document.getElementById('hist-back').textContent = T('hist_back');
  document.getElementById('hist-clear-btn').textContent = T('hist_clear');
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
  if(savedLang){currentLang=savedLang;document.getElementById('lang-toggle').textContent=savedLang==='pl'?'EN':'PL';}
}catch(e){}