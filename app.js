// ========== GLOBAL STATE ==========
let resultSavedInSession = false; // Zapobiega duplikatom w historii

// ========== AXIS HELPERS ==========
function getAxisLeft(i){ return T('axes_names')[i]; }
function getAxisRight(i){ return T('axes_right')[i]; }

// ========== QUIZ STATE & LOGIC ==========
const TOTAL_Q=Object.keys(questions).length;
const QUICK_Q=35;
let quizMode='full';
let scores={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
let maxScores={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
let qOrder=[];
let qi=0;
let quizHistory=[];
let currentPcts={};
let skippedCount=0;
let history_back_to_results=false;

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}

function calcMax(){
  const keys = quizMode==='quick' ? qOrder.slice(0,QUICK_Q).map(i=>'question_'+i) : Object.keys(questions);
  maxScores={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0}; 
  keys.forEach(k=>{
    const q=questions[k];
    if(!q)return;
    ['a','b','c','d','e','f','g','h'].forEach(ax=>{maxScores[ax]+=Math.abs(q[ax]||0);});
  });
}

function calcPct(score,max){if(max===0)return 50;return parseFloat((100*(max+score)/(2*max)).toFixed(1));}

function selectMode(mode, btn){
  quizMode=mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function startQuiz(){
  scores={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0}; 
  quizHistory=[];qi=0;skippedCount=0;
  resultSavedInSession = false; 
  qOrder=shuffle(Object.keys(questions).map((_,i)=>i));
  calcMax();
  showPage('quiz');
  renderQuestion();
  setTimeout(initLiveRadar, 300);
}

function totalForMode(){ return quizMode==='quick' ? QUICK_Q : TOTAL_Q; }

function renderQuestion() {
  const total = totalForMode();
  const qKey = 'question_' + qOrder[qi];
  const q = questions[qKey];
  const el = document.getElementById('q-text');

  el.classList.remove('slide-in');
  el.classList.add('slide-out');

  setTimeout(() => {
    let questionText = (currentLang === 'en' && q.en) ? q.en : q.pl;

    // Obsługa słownika pojęć (Tooltips)
    if (typeof dictionary !== 'undefined') {
      Object.keys(dictionary).forEach(term => {
        const regex = new RegExp(`\\b(${term})\\b`, "gi");
        const entry = dictionary[term];
        const def = typeof entry === 'string'
          ? entry
          : (entry[currentLang] || entry.pl || '');
    
        questionText = questionText.replace(regex,
          `<span class="dict-term" title="${def}">$1</span>`
        );
      });
    }

    el.innerHTML = questionText;
    
    // Animacja wejścia
    el.classList.remove('slide-out');
    el.classList.add('slide-in');
  }, 160);

  document.getElementById('q-number').textContent = T('q_label', { n: qi + 1, total });
  document.getElementById('progress-fill').style.width = `${(qi / total) * 100}%`;
  document.getElementById('btn-back').disabled = (qi === 0);

  const axNames = T('axes_names');
  const axes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const dominant = axes.reduce((a, b) => Math.abs(q[b] || 0) > Math.abs(q[a] || 0) ? b : a, 'a');
  const domIdx = axes.indexOf(dominant);
  
  document.getElementById('q-axis-label').textContent = Math.abs(q[dominant] || 0) > 0 
    ? `${T('axis_prefix')}: ${axNames[domIdx]}` 
    : '';

  document.getElementById('header-status').textContent = `${qi + 1}/${total}`;
}

function answer(mult){
  const ans=document.getElementById('answers');
  ans.classList.remove('answer-pulse');void ans.offsetWidth;ans.classList.add('answer-pulse');
  const qKey='question_'+qOrder[qi];
  const q=questions[qKey];
  ['a','b','c','d','e','f','g','h'].forEach(ax=>{scores[ax]+=mult*(q[ax]||0);});
  quizHistory.push({qi,mult,qKey});
  qi++;
  const total=totalForMode();

  // Live radar update
  updateLiveRadar();

  if(qi>=total){showResults();return;}
  renderQuestion();
}

function skipQ(){
  quizHistory.push({qi,mult:0,qKey:'question_'+qOrder[qi],skipped:true});
  skippedCount++;
  qi++;
  const total=totalForMode();
  if(qi>=total){showResults();return;}
  renderQuestion();
}

function prevQ(){
  if(quizHistory.length===0)return;
  const last=quizHistory.pop();
  qi=last.qi;
  if(!last.skipped){
    const q=questions[last.qKey];
    ['a','b','c','d','e','f','g','h'].forEach(ax=>{scores[ax]-=last.mult*(q[ax]||0);});
  } else { skippedCount--; }
  renderQuestion();
}

function showPage(p){
  const current = document.querySelector('.page.active');
  const next = document.getElementById('page-'+p);
  if (!next) return;

  if (current && current !== next) {
    current.classList.add('page-exit');
    setTimeout(() => {
      current.classList.remove('active', 'page-exit');
      next.classList.add('active', 'page-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.classList.remove('page-enter');
        });
      });
    }, 220);
  } else {
    document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
    next.classList.add('active');
  }

  window.scrollTo(0,0);
  if(p==='home')document.getElementById('header-status').textContent='';
  if(p==='ideologies')setTimeout(()=>renderIdeologiesPage(), 240);
  if(p==='history')setTimeout(()=>renderHistoryPage(), 240);
}

function goHome(){showPage('home');}

// ========== RESULTS ==========
function showResults() {
  showPage('results');
  document.getElementById('header-status').textContent = T('r_title');
  
  const pcts = {};
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach(k => { // Musi być 'h'
    pcts[k] = calcPct(scores[k], maxScores[k]);
  });
  currentPcts = pcts;

  // 1. Renderowanie osi (Progress Bars)
  const axesEl = document.getElementById('axes-display');
  axesEl.innerHTML = '';
  axisData.forEach((ax, i) => {
    const pct = pcts[ax.key];
    const lc = axisColors[i].lc, rc = axisColors[i].rc;
    const row = document.createElement('div');
    row.className = 'axis-row';
    row.id = 'axis-row-' + ax.key;
    const leftName = getAxisLeft(i), rightName = getAxisRight(i);
    row.innerHTML = `
      <div class="axis-label-row">
        <span class="axis-label" style="color:${lc}" onclick="openAxisDetail(${i},true)">${leftName} <span style="color:var(--text3);font-size:.7rem">${pct.toFixed(0)}%</span></span>
        <span class="axis-label" style="color:${rc}" onclick="openAxisDetail(${i},true)">${rightName} <span style="color:var(--text3);font-size:.7rem">${(100 - pct).toFixed(0)}%</span></span>
      </div>
      <div class="axis-bar-track">
        <div class="axis-left-fill" id="bar-${ax.key}" style="width:0%;background:${lc};opacity:.85">
          ${pct > 20 ? `<span class="axis-pct">${pct.toFixed(0)}%</span>` : ''}
        </div>
        <div class="axis-compare-marker" id="marker-${ax.key}" style="left:50%;display:none"></div>
      </div>`;
    axesEl.appendChild(row);
  });

  // Animacja pasków
  setTimeout(() => {
    axisData.forEach((ax) => {
      const bar = document.getElementById('bar-' + ax.key);
      if (bar) bar.style.width = pcts[ax.key] + '%';
    });
  }, 80);

  // 2. Dopasowanie Ideologii
  const dists = [];
  Object.keys(ideologies).forEach(name => {
  const id = ideologies[name];
  let dist = 0;
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach(k => { // Musi być 'h'
    dist += Math.pow(id[k] - pcts[k], 2); 
  });
  dists.push({ name, dist });
  });
  dists.sort((a, b) => a.dist - b.dist);
  
  const closest = dists[0];
  const farthest = dists[dists.length - 1];
  const span = farthest.dist - closest.dist;
  const closestIdeo = ideologies[closest.name];

  document.getElementById('r-ideology').textContent = closestIdeo.name[currentLang] || closestIdeo.name.pl;
  document.getElementById('r-desc').textContent = (closestIdeo.desc[currentLang] || closestIdeo.desc.pl);

  // 3. Renderowanie wykresów i analizy
  drawRadar(pcts, null);
  if (typeof renderCompass === "function") renderCompass(pcts); // Wywołanie kompasu 2D
  renderAnalysis(); // Sekcja "Dlaczego taki wynik?"

  // 4. Panel porównawczy (Select)
  const sel = document.getElementById('compare-select');
  sel.innerHTML = `<option value="">${T('compare_default')}</option>`;
  dists.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.name;
    opt.textContent = ideologies[d.name].name[currentLang] || ideologies[d.name].name.pl;
    sel.appendChild(opt);
  });

  // 5. Lista innych dopasowań
  const listEl = document.getElementById('ideology-list');
  listEl.innerHTML = '';
  dists.slice(1, 9).forEach(d => {
    const rel = span > 0 ? Math.round(1000 * (1 - (d.dist - closest.dist) / span)) / 10 : 50;
    const item = document.createElement('div');
    item.className = 'ideology-item';
    item.onclick = () => openIdeoDetail(d.name);
    item.innerHTML = `
      <div class="ideology-item-name">${ideologies[d.name].name[currentLang] || ideologies[d.name].name.pl}</div>
      <div class="ideology-item-bar"><div class="ideology-item-fill" style="width:0%" data-w="${rel}"></div></div>
      <div class="ideology-item-pct">${rel.toFixed(1)}%</div>`;
    listEl.appendChild(item);
  });
  setTimeout(() => { document.querySelectorAll('.ideology-item-fill').forEach(el => { el.style.width = el.dataset.w + '%'; }); }, 100);

  // 6. Udostępnianie i Historia (Bez duplikatów)
  generateShareUrl();
  
  if (!resultSavedInSession) {
    saveResultToHistory(closest.name, pcts);
    resultSavedInSession = true; 
  }
}

// Funkcja pomocnicza do analizy "Dlaczego taki wynik?"
function renderAnalysis() {
  const container = document.getElementById('r-disclaimer');
  let analysisHTML = `<div class="analysis-box fade-up fade-up-3" style="margin: 2rem 0; padding: 1.5rem; background: var(--bg2); border: 1px solid var(--border); border-radius: 3px;">
    <div class="mono-tag" style="margin-bottom: 1rem">Kluczowe czynniki Twojego wyniku:</div>`;
  
  // Pobieramy 3 najbardziej zdecydowane odpowiedzi
  const strongAnswers = quizHistory.filter(h => Math.abs(h.mult) === 1).slice(0, 3);
  
  if (strongAnswers.length > 0) {
    strongAnswers.forEach(h => {
      const q = questions[h.qKey];
      const text = (currentLang === 'en' && q.en) ? q.en : q.pl;
      analysisHTML += `<p style="font-size: 0.85rem; color: var(--text2); margin-bottom: 0.6rem; line-height: 1.4;">• Twoja silna postawa wobec: <i>"${text}"</i></p>`;
    });
  } else {
    analysisHTML += `<p style="font-size: 0.85rem; color: var(--text3);">Twoje odpowiedzi były umiarkowane, co sugeruje zbalansowane podejście.</p>`;
  }
  
  analysisHTML += `</div>`;
  
  // Wstawiamy przed sekcją disclaimer
  const oldBox = document.querySelector('.analysis-box');
  if (oldBox) oldBox.remove();
  container.insertAdjacentHTML('beforebegin', analysisHTML);
}

// ========== RADAR CHART ==========
function drawRadar(pcts, compareKey){
  if(!pcts) pcts=currentPcts;
  const svg=document.getElementById('radar-chart');
  if(!svg) return;
  svg.innerHTML='';
  const cx=190,cy=175,r=130,n=8;
  const axes=['a','b','c','d','e','f','g','h'];
  const axNames=T('axes_names');
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  const textCol=isDark?'#9090a0':'#4a3f30';
  const gridCol=isDark?'#2a2a32':'#c8bfad';

  function polar(i,pct){
    const angle=(2*Math.PI*i/n)-(Math.PI/2);
    const d=r*(pct/100);
    return [cx+d*Math.cos(angle), cy+d*Math.sin(angle)];
  }
  function polarR(i,frac){
    const angle=(2*Math.PI*i/n)-(Math.PI/2);
    return [cx+r*frac*Math.cos(angle), cy+r*frac*Math.sin(angle)];
  }

  [.25,.5,.75,1].forEach(f=>{
    const pts=axes.map((_,i)=>polarR(i,f).join(',')).join(' ');
    const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('points',pts);
    poly.setAttribute('fill','none');
    poly.setAttribute('stroke',gridCol);
    poly.setAttribute('stroke-width','1');
    svg.appendChild(poly);
  });

  axes.forEach((_,i)=>{
    const [x,y]=polarR(i,1);
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',cx);line.setAttribute('y1',cy);
    line.setAttribute('x2',x);line.setAttribute('y2',y);
    line.setAttribute('stroke',gridCol);line.setAttribute('stroke-width','1');
    svg.appendChild(line);
  });

  if(compareKey && ideologies[compareKey]){
    const id=ideologies[compareKey];
    const pts=axes.map((k,i)=>polar(i,id[k]).join(',')).join(' ');
    const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('points',pts);
    poly.setAttribute('fill','rgba(240,192,96,.12)');
    poly.setAttribute('stroke','#f0c060');
    poly.setAttribute('stroke-width','2');
    svg.appendChild(poly);
  }

  const pts=axes.map((k,i)=>polar(i,pcts[k]||50).join(',')).join(' ');
  const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('points',pts);
  poly.setAttribute('fill','rgba(192,57,43,.25)');
  poly.setAttribute('stroke','#c0392b');
  poly.setAttribute('stroke-width','2.5');
  svg.appendChild(poly);

  axes.forEach((k,i)=>{
    const [x,y]=polar(i,pcts[k]||50);
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r','4');
    c.setAttribute('fill','#e74c3c');
    svg.appendChild(c);
  });

  axes.forEach((_,i)=>{
    const [x,y]=polarR(i,1.2);
    const text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('x',x);text.setAttribute('y',y);
    text.setAttribute('text-anchor','middle');
    text.setAttribute('dominant-baseline','middle');
    text.setAttribute('font-family','IBM Plex Mono,monospace');
    text.setAttribute('font-size','9.5');
    text.setAttribute('fill',textCol);
    text.textContent=axNames[i];
    svg.appendChild(text);
  });

  const legendEl=document.getElementById('radar-legend');
  legendEl.innerHTML = `
    <div class="radar-legend-item"><div class="radar-legend-dot" style="background:#c0392b"></div>${T('radar_you')}</div>
    ${compareKey?`<div class="radar-legend-item"><div class="radar-legend-dot" style="background:#f0c060"></div>${T('radar_compare')}: ${ideologies[compareKey].name[currentLang]||ideologies[compareKey].name.pl}</div>`:''}
  `;
}

// ========== COMPARE ==========
function renderCompare(){
  const sel = document.getElementById('compare-select').value;
  
  // 1. Logika markerów na paskach osi (istniejąca)
  axisData.forEach((ax, i) => {
    const marker = document.getElementById('marker-' + ax.key);
    if (!marker) return;
    if (!sel) {
      marker.style.display = 'none';
      return;
    }
    const ideo = ideologies[sel];
    marker.style.display = 'block';
    marker.style.left = ideo[ax.key] + '%';
  });

  // 2. Logika kropki na kompasie 2D
  const dotCompare = document.getElementById('compass-dot-compare') || createCompareDot();
  
  if (!sel) {
    dotCompare.style.display = 'none';
  } else {
    const ideo = ideologies[sel];
    dotCompare.style.display = 'block';
    // Mapowanie X: Oś D (Internacjonalizm), Y: Oś C (Centralizm)
    dotCompare.style.left = (100 - ideo.d) + '%';
    dotCompare.style.top = (100 - ideo.c) + '%';
  }
  
  // 3. Odświeżenie radaru
  drawRadar(currentPcts, sel || null);
}

// Funkcja pomocnicza tworząca złotą kropkę porównawczą
function createCompareDot() {
  const dot = document.createElement('div');
  dot.id = 'compass-dot-compare';
  dot.className = 'compass-dot';
  // Stylizacja złotej kropki, aby odróżniała się od kropki użytkownika
  dot.style.borderColor = 'var(--gold2)';
  dot.style.background = 'var(--bg)';
  dot.style.zIndex = '9'; // Nieco pod kropką użytkownika
  
  const container = document.querySelector('.compass-container');
  if (container) container.appendChild(dot);
  return dot;
}

// ========== SHARE ==========
function generateShareUrl(){
  const axes=['a','b','c','d','e','f','g','h'];
  const encoded=axes.map(k=>Math.round(currentPcts[k]||50)).join('-');
  const url=window.location.href.split('#')[0]+'#r='+encoded;
  document.getElementById('share-url').value=url;
}

function copyShareUrl(){
  const input=document.getElementById('share-url');
  input.select();
  try{document.execCommand('copy');}catch(e){navigator.clipboard.writeText(input.value).catch(()=>{})}
  const btn=document.getElementById('copy-btn');
  btn.textContent=T('copied');btn.classList.add('copied');
  setTimeout(()=>{btn.textContent=T('copy_btn');btn.classList.remove('copied');},2000);
}

function loadSharedResults(){
  const hash=window.location.hash;
  if(!hash.startsWith('#r='))return;
  const parts=hash.slice(3).split('-').map(Number);
  if(parts.length!==8)return;
  const axes=['a','b','c','d','e','f','g','h'];
  axes.forEach((k,i)=>{currentPcts[k]=parts[i]||50;});
  calcMax();
  axes.forEach(k=>{scores[k]=((currentPcts[k]/100)*2-1)*maxScores[k];});
  showResults();
}

// ========== HISTORY ==========
function getResultHistory(){
  try{return JSON.parse(localStorage.getItem('lv-history')||'[]');}catch(e){return [];}
}

function saveResultToHistory(ideologyKey, pcts){
  try{
    const h=getResultHistory();
    h.unshift({
      ideology:ideologyKey,
      pcts:{...pcts},
      mode:quizMode,
      date:new Date().toISOString(),
    });
    localStorage.setItem('lv-history',JSON.stringify(h.slice(0,20)));
  }catch(e){}
}

function clearHistory(){
  try{localStorage.removeItem('lv-history');}catch(e){}
  renderHistoryPage();
}

function renderHistoryPage(){
  const hist=getResultHistory();
  const wrap=document.getElementById('history-list-wrap');
  if(!hist.length){
    wrap.innerHTML=`<div class="history-empty">${T('hist_empty')}</div>`;
    return;
  }
  wrap.innerHTML=`<div class="history-grid">${hist.map((item,idx)=>{
    const ideo=ideologies[item.ideology];
    const name=ideo?(ideo.name[currentLang]||ideo.name.pl):'?';
    const date=new Date(item.date).toLocaleDateString(currentLang==='en'?'en-GB':'pl-PL',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
    const modeLbl=item.mode==='quick'?T('hist_mode_quick'):T('hist_mode_full');
    const chips=['a','b','c','d','e','f','g','h'].map((k,i)=>`<span class="hist-axis-chip">${T('axes_names')[i].substring(0,4)} ${Math.round(item.pcts[k]||50)}%</span>`).join('');
    return `<div class="history-item" onclick='loadHistoryResult(${JSON.stringify(item)})'>
      <div class="history-item-num">${String(idx+1).padStart(2,'0')}</div>
      <div class="history-item-main">
        <div class="history-item-ideo">${name}</div>
        <div class="history-item-date">${date}</div>
        <div class="history-item-mode">${modeLbl}</div>
        <div class="history-item-axes">${chips}</div>
      </div>
      <div class="history-item-right">
        ${drawMiniRadar(item.pcts)}
        <div class="history-item-view">${T('hist_view')}</div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function loadHistoryResult(item){
  currentPcts={...item.pcts};
  const axes=['a','b','c','d','e','f','g','h'];
  calcMax();
  axes.forEach(k=>{scores[k]=((currentPcts[k]/100)*2-1)*maxScores[k];});
  quizMode=item.mode||'full';
  
  resultSavedInSession = true; // Zapobiegamy ponownemu zapisaniu starego wyniku
  showResults();
}

function drawMiniRadar(pcts){
  const cx=40,cy=40,r=28,n=8;
  const axes=['a','b','c','d','e','f','g','h'];
  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  const gc=isDark?'#2a2a32':'#c8bfad';
  function polar(i,pct){
    const a=(2*Math.PI*i/n)-(Math.PI/2);
    const d=r*(pct/100);
    return [cx+d*Math.cos(a), cy+d*Math.sin(a)];
  }
  function polarR(i,f){
    const a=(2*Math.PI*i/n)-(Math.PI/2);
    return [cx+r*f*Math.cos(a), cy+r*f*Math.sin(a)];
  }
  let lines='';
  [.5,1].forEach(f=>{
    const pts=axes.map((_,i)=>polarR(i,f).join(',')).join(' ');
    lines+=`<polygon points="${pts}" fill="none" stroke="${gc}" stroke-width="0.8"/>`;
  });
  axes.forEach((_,i)=>{
    const [x,y]=polarR(i,1);
    lines+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${gc}" stroke-width="0.8"/>`;
  });
  const pts=axes.map((k,i)=>polar(i,pcts[k]||50).join(',')).join(' ');
  lines+=`<polygon points="${pts}" fill="rgba(192,57,43,.3)" stroke="#c0392b" stroke-width="1.5"/>`;
  return `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">${lines}</svg>`;
}

// ========== IDEOLOGY DETAIL ==========
function openIdeoDetail(key, fromResults){
  const ideo=ideologies[key];
  if(!ideo) return;
  document.getElementById('dd-tag').textContent=tagLabel(ideo.tag);
  document.getElementById('dd-name').textContent=ideo.name[currentLang]||ideo.name.pl;
  document.getElementById('dd-overview-title').textContent=T('dd_overview');
  document.getElementById('dd-desc').textContent=(ideo.longDesc&&(ideo.longDesc[currentLang]||ideo.longDesc.pl))||ideo.desc[currentLang]||ideo.desc.pl;
  document.getElementById('dd-figures-title').textContent=T('dd_figures');
  document.getElementById('dd-works-title').textContent=T('dd_works');
  document.getElementById('dd-movements-title').textContent=T('dd_movements');
  document.getElementById('dd-back').textContent=T('dd_back');

  const axesEl=document.getElementById('dd-axes');
  axesEl.innerHTML='<div class="mono-tag" style="margin-bottom:1rem">'+T('r_axes')+'</div>';
  axisData.forEach((ax,i)=>{
    const pct=ideo[ax.key];
    const lc=axisColors[i].lc, rc=axisColors[i].rc;
    const color=pct>50?lc:rc;
    const w=pct>50?pct:(100-pct);
    axesEl.innerHTML+=`<div class="ideo-mini-row" style="gap:.8rem;margin-bottom:.5rem">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:.65rem;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);width:110px;flex-shrink:0">${pct>50?getAxisLeft(i):getAxisRight(i)}</div>
      <div style="flex:1;height:8px;background:var(--border);border-radius:2px;overflow:hidden"><div style="width:${w}%;height:100%;background:${color};border-radius:2px"></div></div>
      <span style="font-family:'IBM Plex Mono',monospace;font-size:.65rem;color:var(--text3);min-width:3rem;text-align:right">${pct}%</span>
    </div>`;
  });

  const figEl=document.getElementById('dd-figures');
  const hasBios = (ideo.figures||[]).some(f => typeof f === 'object' && f.desc);
  if(hasBios) {
    figEl.innerHTML = `<div class="figures-bio-list">${(ideo.figures||[]).map((f,i)=>{
      if(typeof f !== 'object') return `<div class="figure-bio-item"><span class="ideo-figure-tag">${f}</span></div>`;
      const bio = f.desc ? (f.desc[currentLang]||f.desc.pl) : '';
      return `<div class="figure-bio-item">
        <button class="figure-bio-toggle" onclick="toggleFigureBio(${i},'fig-bio-${i}')">
          <span class="ideo-figure-tag">${f.name}</span>
          <span class="figure-bio-arrow" id="fig-arrow-${i}">▾</span>
        </button>
        <div class="figure-bio-text" id="fig-bio-${i}" style="display:none">${bio}</div>
      </div>`;
    }).join('')}</div>`;
  } else {
    figEl.innerHTML=(ideo.figures||[]).map(f=>{
      const name = typeof f === 'object' ? f.name : f;
      return `<span class="ideo-figure-tag">${name}</span>`;
    }).join('');
  }

  const worksEl=document.getElementById('dd-works');
  worksEl.innerHTML=(ideo.works||[]).map(w=>`<div class="ideo-work-item">${w}</div>`).join('');

  const movEl=document.getElementById('dd-movements');
  movEl.innerHTML=(ideo.movements||[]).map(m=>`<span class="ideo-movement-tag">${m}</span>`).join('');

  const quizBtn=document.getElementById('dd-quiz-btn');
  quizBtn.style.display='inline-flex';
  quizBtn.textContent=T('dd_quiz');

  showPage('ideo-detail');
}

function openIdeoDetailFromResult(){
  const name=document.getElementById('r-ideology').textContent;
  const key=Object.keys(ideologies).find(k=>(ideologies[k].name[currentLang]||ideologies[k].name.pl)===name);
  if(key) openIdeoDetail(key,true);
}

// ========== AXIS DETAIL OPEN ==========
function openAxisDetail(idx, fromResults){
  history_back_to_results=!!fromResults;
  const d=axisDetails[idx];
  const leftName=getAxisLeft(idx), rightName=getAxisRight(idx);
  document.getElementById('ad-name').textContent=`${leftName} — ${rightName}`;
  document.getElementById('ad-subtitle').textContent=`${T('axis_prefix')} ${String.fromCharCode(65+idx)} · ${T('axes_names')[idx]}`;
  document.getElementById('ad-context-title').textContent=T('ad_context');
  document.getElementById('ad-context').textContent=d.context[currentLang]||d.context.pl;
  document.getElementById('ad-debate-title').textContent=T('ad_debate');
  document.getElementById('ad-debate').textContent=d.debate[currentLang]||d.debate.pl;

  const polesEl=document.getElementById('ad-poles');
  const lc=axisColors[idx].lc, rc=axisColors[idx].rc;
  polesEl.innerHTML=`
    <div class="axis-pole-card">
      <div class="axis-pole-name" style="color:${lc}">${leftName}</div>
      <div class="axis-pole-desc">${getPolePl(idx,0)}</div>
      <div class="axis-ideo-list">${(d.leftIdeologies||[]).map(k=>`<span class="ideo-figure-tag" style="cursor:pointer;color:var(--red3)" onclick="openIdeoDetail('${k}')">${ideologies[k]?ideologies[k].name[currentLang]||ideologies[k].name.pl:k}</span>`).join('')}</div>
    </div>
    <div class="axis-pole-card">
      <div class="axis-pole-name" style="color:${rc}">${rightName}</div>
      <div class="axis-pole-desc">${getPolePl(idx,1)}</div>
      <div class="axis-ideo-list">${(d.rightIdeologies||[]).map(k=>`<span class="ideo-figure-tag" style="cursor:pointer;color:var(--red3)" onclick="openIdeoDetail('${k}')">${ideologies[k]?ideologies[k].name[currentLang]||ideologies[k].name.pl:k}</span>`).join('')}</div>
    </div>
  `;
  document.getElementById('ad-back-btn').textContent=`← ${T('back')}`;
  showPage('axis-detail');
}

function getPolePl(idx,pole){
  const poles=[
    [
      {pl:'Przekonanie, że zmiana społeczeństwa możliwa jest tylko przez radykalne obalenie istniejącego porządku i struktur władzy.',en:'The belief that social change is only possible through radical overthrow of the existing order and power structures.'},
      {pl:'Wiara w stopniowe ulepszanie kapitalizmu przez legislację, wybory i naciski społeczne.',en:'Belief in gradually improving capitalism through legislation, elections and social pressure.'}
    ],
    [
      {pl:'Przekonanie, że socjalizm musi być oparty na analizie materialnych sił historycznych, a nie na apelach moralnych.',en:'The belief that socialism must be based on analysis of material historical forces, not moral appeals.'},
      {pl:'Wiara w możliwość budowania idealnych społeczności przez apel do rozumu, moralności i wizjonerskiego planowania.',en:'Belief in the possibility of building ideal communities through appeals to reason, morality and visionary planning.'}
    ],
    [
      {pl:'Postulat silnej centralnej władzy państwowej jako narzędzia planowania i koordynacji zasobów.',en:'Postulate of a strong central state authority as a tool for planning and coordinating resources.'},
      {pl:'Postulat zdecentralizowanych, samorządnych wspólnot jako alternatywy dla hierarchicznego państwa.',en:'Postulate of decentralized, self-governing communities as an alternative to the hierarchical state.'}
    ],
    [
      {pl:'Przekonanie, że klasa robotnicza wszystkich krajów ma wspólne interesy i powinna solidarnie walczyć ponad podziałami narodowymi.',en:'The belief that the working class of all countries has common interests and should fight together across national divisions.'},
      {pl:'Przekonanie, że tożsamość narodowa i interesy narodu mogą być zgodne z socjalizmem, a wyzwolenie narodowe jest warunkiem emancypacji.',en:'The belief that national identity and national interests can be compatible with socialism, and national liberation is a condition for emancipation.'}
    ],
    [
      {pl:'Przekonanie, że zdyscyplinowana partia polityczna jest niezbędnym narzędziem walki o władzę i przeprowadzenia reform.',en:'The belief that a disciplined political party is a necessary tool for the struggle for power and implementing reforms.'},
      {pl:'Przekonanie, że związki zawodowe i bezpośrednia akcja robotnicza są skuteczniejsze niż polityka parlamentarna.',en:'The belief that trade unions and direct worker action are more effective than parliamentary politics.'}
    ],
    [
      {pl:'Przekonanie, że industrializacja, technologia i wzrost produkcji są kluczem do wyzwolenia ludzkości od biedy i pracy.',en:'The belief that industrialization, technology and growth of production are the key to liberating humanity from poverty and toil.'},
      {pl:'Przekonanie, że nieskończony wzrost jest niemożliwy i że ochrona środowiska naturalnego musi być priorytetem.',en:'The belief that infinite growth is impossible and that protecting the natural environment must be a priority.'}
    ],
    [
      {pl:'Przywiązanie do tradycyjnych wartości kulturowych, struktury rodziny i instytucji społecznych jako fundamentu spójności.',en:'Attachment to traditional cultural values, family structure and social institutions as a foundation of cohesion.'},
      {pl:'Wiara w konieczność ciągłej emancypacji społecznej — równości płci, praw LGBTQ+, wielokulturowości i wolności jednostki.',en:'Belief in the necessity of continuous social emancipation — gender equality, LGBTQ+ rights, multiculturalism and individual freedom.'}
    ],
    [
      {pl:'Przekonanie, że wyzwolenie kobiet, mniejszości i uciskanych grup jest integralną częścią lewicowego projektu emancypacyjnego.',en:'The belief that the liberation of women, minorities and oppressed groups is an integral part of the left-wing emancipatory project.'},
      {pl:'Przekonanie, że tradycyjne wspólnoty, role i instytucje mogą być zgodne z lewicową ekonomią i nie powinny być odgórnie demontowane.',en:'The belief that traditional communities, roles and institutions can be compatible with left-wing economics and should not be dismantled top-down.'}
    ],
  ];
  return (poles[idx][pole][currentLang]||poles[idx][pole].pl);
}

// ========== IDEOLOGIES PAGE ==========
let currentFilter='all';
function renderIdeologiesPage(){
  const grid=document.getElementById('ideo-grid');
  grid.innerHTML='';
  const searchVal=(document.getElementById('ideo-search')?.value||'').toLowerCase();
  Object.keys(ideologies).forEach(key=>{
    const id=ideologies[key];
    const name=id.name[currentLang]||id.name.pl;
    if(currentFilter!=='all' && id.tag!==currentFilter)return;
    if(searchVal && !name.toLowerCase().includes(searchVal) && !(id.desc[currentLang]||id.desc.pl).toLowerCase().includes(searchVal))return;
    const card=document.createElement('div');
    card.className='ideo-card';
    card.onclick=()=>openIdeoDetail(key);
    const miniAxes=axisData.map((ax,i)=>{
      const pct=id[ax.key];
      const lc=axisColors[i].lc, rc=axisColors[i].rc;
      const color=pct>50?lc:rc;
      const w=pct>50?pct:(100-pct);
      const label=pct>50?getAxisLeft(i):getAxisRight(i);
      return `<div class="ideo-mini-row">
        <div class="ideo-mini-label">${label.substring(0,8)}</div>
        <div class="ideo-mini-bar"><div class="ideo-mini-fill" style="width:${w}%;background:${color}"></div></div>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:.6rem;color:var(--text3);margin-left:.3rem">${pct}%</span>
      </div>`;
    }).join('');
    card.innerHTML=`
      <div class="ideo-card-name">${name}</div>
      <div class="ideo-card-tag">${tagLabel(id.tag)}</div>
      <div class="ideo-card-desc">${(id.desc[currentLang]||id.desc.pl)}</div>
      <div class="ideo-mini-axes">${miniAxes}</div>
      <div class="ideo-card-cta">${T('value_link')}</div>`;
    grid.appendChild(card);
  });
}

function tagLabel(t2){
  const m={communist:T('tag_communist'),socialist:T('tag_socialist'),anarchist:T('tag_anarchist'),other:T('tag_other')};
  return m[t2]||t2;
}

function filterIdeologies(filter,btn){
  currentFilter=filter;
  document.querySelectorAll('.ideo-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderIdeologiesPage();
}

// ========== VALUES GRID ==========
function buildValuesGrid(){
  const grid=document.getElementById('values-grid');
  if(!grid) return;
  const axesNames=T('axes_names'), axesRight=T('axes_right');
  const descs={
    pl:['Jak daleko powinna sięgnąć zmiana i jakimi środkami?','Materializm historyczny kontra idealistyczne wizje społeczeństwa.','Scentralizowane planowanie czy oddolna organizacja?','Solidarność ponadgraniczna czy priorytety narodowe?','Partie polityczne czy ruch związkowy?','Wzrost przemysłowy czy ochrona przyrody?','Tradycyjne wartości czy postęp społeczny?','Wyzwolenie kobiet i mniejszości czy wspólnota i tradycja?'],
    en:['How far should change go, and by what means?','Historical materialism versus idealist visions of society.','Centralized planning or bottom-up organization?','Cross-border solidarity or national priorities?','Political parties or the union movement?','Industrial growth or protection of nature?','Traditional values or social progress?','Liberation of women and minorities or community and tradition?'],
  };
  grid.innerHTML = axisData.map((ax,i)=>`
    <div class="value-card" onclick="openAxisDetail(${i},false)">
      <div class="value-card-title">Oś ${String.fromCharCode(65+i)}</div>
      <div class="value-pair">${axesNames[i]} <span class="vs">vs</span> ${axesRight[i]}</div>
      <div class="value-desc">${(descs[currentLang]||descs.pl)[i]}</div>
      <div class="value-card-link">${T('value_link')}</div>
    </div>`).join('');
}

function toggleFigureBio(idx, bioId) {
  const bio = document.getElementById(bioId);
  const arrow = document.getElementById('fig-arrow-'+idx);
  if(!bio) return;
  const isOpen = bio.style.display !== 'none';
  bio.style.display = isOpen ? 'none' : 'block';
  if(arrow) arrow.textContent = isOpen ? '▾' : '▴';
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
  const quizActive = document.getElementById('page-quiz').classList.contains('active');
  if (!quizActive) return;
  
  const key = e.key;
  const keyMap = {'1': 1.0, '2': 0.5, '3': 0.0, '4': -0.5, '5': -1.0};
  
  if (keyMap.hasOwnProperty(key)) {
    e.preventDefault();
    // Highlight the button briefly
    const btns = document.querySelectorAll('.answer-btn');
    const idx = parseInt(key) - 1;
    if (btns[idx]) {
      btns[idx].classList.add('key-activated');
      setTimeout(() => btns[idx].classList.remove('key-activated'), 200);
    }
    answer(keyMap[key]);
    return;
  }
  
  if (key === 'ArrowLeft' || key === 'Backspace') {
    const backBtn = document.getElementById('btn-back');
    if (backBtn && !backBtn.disabled) prevQ();
  }
  if (key === 'ArrowRight' || key === 's' || key === 'S') {
    skipQ();
  }
});

// Show keyboard hint in quiz
function showKeyboardHint() {
  const existing = document.getElementById('kb-hint');
  if (existing) return;
  const hint = document.createElement('div');
  hint.id = 'kb-hint';
  hint.className = 'kb-hint';
  hint.innerHTML = '<span>Klawisze: <kbd>1</kbd>–<kbd>5</kbd> · <kbd>←</kbd> wróć · <kbd>S</kbd> pomiń</span>';
  const navBtns = document.querySelector('.nav-buttons');
  if (navBtns) navBtns.appendChild(hint);
}

// ========== ACCESSIBILITY MODE ==========
let accessibilityMode = false;

function toggleAccessibility() {
  accessibilityMode = !accessibilityMode;
  const html = document.documentElement;
  if (accessibilityMode) {
    html.setAttribute('data-a11y', 'on');
  } else {
    html.removeAttribute('data-a11y');
  }
  const btn = document.getElementById('a11y-toggle');
  if (btn) btn.classList.toggle('active', accessibilityMode);
  try { localStorage.setItem('lv-a11y', accessibilityMode ? '1' : '0'); } catch(e) {}
}

// ========== PWA SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

window.addEventListener('load',()=>{
  try{
    const savedLang=localStorage.getItem('lv-lang');
    if(savedLang && LANGS.includes(savedLang)){
      currentLang=savedLang;
      const labels = {pl:'EN', en:'DE', de:'RU', ru:'PL'};
      document.getElementById('lang-toggle').textContent=labels[savedLang]||'EN';
    }
  }catch(e){}
  try{const a11y=localStorage.getItem('lv-a11y');if(a11y==='1'){accessibilityMode=true;document.documentElement.setAttribute('data-a11y','on');const btn=document.getElementById('a11y-toggle');if(btn)btn.classList.add('active');}}catch(e){}
  applyTranslations();
  loadSharedResults();
  // Show keyboard hint after quiz starts
  document.getElementById('page-quiz').addEventListener('transitionend', showKeyboardHint);
  // Show onboarding for first-time visitors
  showOnboarding();
});

function renderCompass(pcts) {
  const dot = document.getElementById('compass-dot');
  if(!dot) return;
  
  const x = 100 - pcts.d; // Lewo (Int) / Prawo (Nac)
  const y = 100 - pcts.c; // Góra (Aut) / Dół (Lib)
  
  dot.style.left = x + '%';
  dot.style.top = y + '%';

  // Opcjonalne: Dodanie nazwy kwadrantu do UI
  let quadrant = "";
  if (y < 50) {
    quadrant = x < 50 ? "Autorytarna Lewica" : "Autorytarna Prawica";
  } else {
    quadrant = x < 50 ? "Libertariańska Lewica" : "Libertariańska Prawica";
  }
  
  // Możesz dodać element <div id="quadrant-name"> w HTML i go tu aktualizować
  const quadEl = document.getElementById('quadrant-name');
  if(quadEl) quadEl.textContent = quadrant;
}

function renderDictionaryPage() {
  const list = document.getElementById('dictionary-list');
  if (!list) return;

  // Czyścimy listę i generujemy karty dla każdego słowa ze słownika
  list.innerHTML = Object.keys(dictionary).map(term => `
    <div class="value-card">
      <div class="value-card-title">${term}</div>
      <div class="value-desc">${dictionary[term][currentLang]}</div>
    </div>
  `).join('');
}

// ========== LIVE RADAR IN QUIZ ==========
let liveRadarVisible = false;

function initLiveRadar() {
  if (document.getElementById('live-radar-wrap')) return;
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  const wrap = document.createElement('div');
  wrap.id = 'live-radar-wrap';
  wrap.className = 'live-radar-wrap';
  wrap.innerHTML = `
    <div class="live-radar-label">Live</div>
    <svg id="live-radar-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="120" height="120"></svg>
  `;
  quizContainer.appendChild(wrap);

  // Show with a small delay so first render is meaningful
  setTimeout(() => { wrap.classList.add('visible'); }, 400);
}

function updateLiveRadar() {
  const svg = document.getElementById('live-radar-svg');
  if (!svg) return;
  svg.innerHTML = '';
  const cx = 60, cy = 60, r = 44, n = 8;
  const axes = ['a','b','c','d','e','f','g','h'];
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gc = isDark ? '#2a2a32' : '#c8bfad';

  function polar(i, pct) {
    const angle = (2 * Math.PI * i / n) - (Math.PI / 2);
    const d = r * (pct / 100);
    return [cx + d * Math.cos(angle), cy + d * Math.sin(angle)];
  }
  function polarR(i, f) {
    const angle = (2 * Math.PI * i / n) - (Math.PI / 2);
    return [cx + r * f * Math.cos(angle), cy + r * f * Math.sin(angle)];
  }

  // Grid rings
  [0.25, 0.5, 0.75, 1].forEach(f => {
    const pts = axes.map((_, i) => polarR(i, f).join(',')).join(' ');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', gc);
    poly.setAttribute('stroke-width', '0.8');
    svg.appendChild(poly);
  });

  // Axis lines
  axes.forEach((_, i) => {
    const [x, y] = polarR(i, 1);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', x); line.setAttribute('y2', y);
    line.setAttribute('stroke', gc); line.setAttribute('stroke-width', '0.8');
    svg.appendChild(line);
  });

  // User polygon — compute current partial pcts
  const livePcts = {};
  axes.forEach(k => {
    livePcts[k] = maxScores[k] > 0 ? calcPct(scores[k], maxScores[k]) : 50;
  });

  const pts = axes.map((k, i) => polar(i, livePcts[k]).join(',')).join(' ');
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', pts);
  poly.setAttribute('fill', 'rgba(192,57,43,.3)');
  poly.setAttribute('stroke', '#c0392b');
  poly.setAttribute('stroke-width', '1.8');
  svg.appendChild(poly);
}

// ========== ONBOARDING TOUR ==========
function showOnboarding() {
  try { if (localStorage.getItem('lv-onboarded')) return; } catch(e) {}

  const steps = [
    { icon: '✦', titleKey: 'onb_1_title', bodyKey: 'onb_1_body' },
    { icon: '◈', titleKey: 'onb_2_title', bodyKey: 'onb_2_body' },
    { icon: '⌨', titleKey: 'onb_3_title', bodyKey: 'onb_3_body' },
  ];
  let step = 0;

  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.className = 'onb-overlay';

  function render() {
    const s = steps[step];
    const isLast = step === steps.length - 1;
    overlay.innerHTML = `
      <div class="onb-card">
        <div class="onb-icon">${s.icon}</div>
        <div class="onb-step">${step + 1} / ${steps.length}</div>
        <h2 class="onb-title">${T(s.titleKey)}</h2>
        <p class="onb-body">${T(s.bodyKey)}</p>
        <div class="onb-dots">
          ${steps.map((_, i) => `<div class="onb-dot${i === step ? ' active' : ''}"></div>`).join('')}
        </div>
        <div class="onb-buttons">
          <button class="btn-ghost onb-skip-btn" onclick="closeOnboarding()">${T('onb_skip')}</button>
          <button class="btn-primary" onclick="onbNext()">${isLast ? T('onb_start') : T('onb_next')}</button>
        </div>
      </div>`;
  }

  window.onbNext = function() {
    if (step < steps.length - 1) {
      step++;
      render();
    } else {
      closeOnboarding();
    }
  };

  window.closeOnboarding = function() {
    overlay.classList.add('onb-fade-out');
    setTimeout(() => overlay.remove(), 350);
    try { localStorage.setItem('lv-onboarded', '1'); } catch(e) {}
  };

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('onb-visible'));
  render();
}

// ========== PNG EXPORT ==========
function exportResultsPNG() {
  const btn = document.getElementById('export-png-btn');
  if (btn) { btn.textContent = T('exporting'); btn.disabled = true; }

  const axes = ['a','b','c','d','e','f','g','h'];
  const axNames = T('axes_names');
  const axRight = T('axes_right');
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  // Powrót do oryginalnych wymiarów
  const W = 800, H = 560;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = isDark ? '#0a0a0b' : '#f5f0e8';
  ctx.fillRect(0, 0, W, H);

  // Header stripe (Stary styl)
  ctx.fillStyle = isDark ? '#111114' : '#ede8dc';
  ctx.fillRect(0, 0, W, 64);

  // Logo text
  ctx.fillStyle = isDark ? '#e8e8ec' : '#1a1410';
  ctx.font = 'bold 22px Georgia, serif';
  ctx.fillText('Left', 36, 40);
  ctx.fillStyle = '#e74c3c';
  ctx.fillText('Values', 36 + ctx.measureText('Left').width, 40);

  // Ideology name
  const ideoName = document.getElementById('r-ideology')?.textContent || '';
  ctx.fillStyle = isDark ? '#e8e8ec' : '#1a1410';
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillText(ideoName, 36, 116);

  // Subtitle
  ctx.fillStyle = isDark ? '#9090a0' : '#4a3f30';
  ctx.font = '14px IBM Plex Sans, sans-serif';
  ctx.fillText('leftvalues.szymonrokicki.pl', 36, 140);

  // Draw radar (Pozycje oryginalne)
  const rcx = 580, rcy = 300, rr = 150, n = 8;

  function polar(i, pct) {
    const angle = (2 * Math.PI * i / n) - (Math.PI / 2);
    const d = rr * (pct / 100);
    return [rcx + d * Math.cos(angle), rcy + d * Math.sin(angle)];
  }
  function polarR(i, f) {
    const angle = (2 * Math.PI * i / n) - (Math.PI / 2);
    return [rcx + rr * f * Math.cos(angle), rcy + rr * f * Math.sin(angle)];
  }

  const gc = isDark ? '#2a2a32' : '#c8bfad';
  ctx.strokeStyle = gc;
  ctx.lineWidth = 1;

  [0.25, 0.5, 0.75, 1].forEach(f => {
    ctx.beginPath();
    axes.forEach((_, i) => {
      const [x, y] = polarR(i, f);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  });

  axes.forEach((_, i) => {
    const [x, y] = polarR(i, 1);
    ctx.beginPath();
    ctx.moveTo(rcx, rcy);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // User polygon
  ctx.beginPath();
  axes.forEach((k, i) => {
    const [x, y] = polar(i, currentPcts[k] || 50);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(192,57,43,0.25)';
  ctx.fill();
  ctx.strokeStyle = '#c0392b';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  axes.forEach((k, i) => {
    const [x, y] = polar(i, currentPcts[k] || 50);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
  });

  // Axis labels
  ctx.font = '11px monospace';
  ctx.fillStyle = isDark ? '#9090a0' : '#4a3f30';
  axes.forEach((k, i) => {
    const [x, y] = polarR(i, 1.22);
    ctx.textAlign = 'center';
    const pct = Math.round(currentPcts[k] || 50);
    const label = pct >= 50 ? axNames[i] : axRight[i];
    ctx.fillText(label, x, y);
  });

  // Left side — axis bars (Oryginalne paski kolorowe)
  ctx.textAlign = 'left';
  const barX = 36, barStartY = 170, barH = 8, barW = 300, gap = 32;

  axes.forEach((k, i) => {
    const pct = currentPcts[k] || 50;
    const y = barStartY + i * gap;
    const leftName = axNames[i];
    const rightName = axRight[i];
    const dominantName = pct >= 50 ? leftName : rightName;
    const displayPct = pct >= 50 ? pct : 100 - pct;

    ctx.fillStyle = isDark ? '#5a5a6a' : '#8a7a65';
    ctx.font = '10px monospace';
    ctx.fillText(dominantName.substring(0, 14), barX, y - 2);

    ctx.fillStyle = isDark ? '#2a2a32' : '#c8bfad';
    ctx.beginPath();
    ctx.roundRect(barX, y + 2, barW, barH, 2);
    ctx.fill();

    const colors = ['#c0392b','#8e44ad','#2980b9','#16a085','#e67e22','#27ae60','#d35400','#2c3e50'];
    ctx.fillStyle = colors[i] || '#c0392b';
    ctx.beginPath();
    ctx.roundRect(barX, y + 2, barW * (displayPct / 100), barH, 2);
    ctx.fill();

    ctx.fillStyle = isDark ? '#9090a0' : '#4a3f30';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(displayPct) + '%', barX + barW + 30, y + 10);
    ctx.textAlign = 'left';
  });

  // Footer (Powrót do standardowej daty)
  ctx.fillStyle = isDark ? '#2a2a32' : '#c8bfad';
  ctx.fillRect(0, H - 36, W, 36);
  ctx.fillStyle = isDark ? '#5a5a6a' : '#8a7a65';
  ctx.font = '11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('leftvalues.szymonrokicki.pl · ' + new Date().toLocaleDateString(), 36, H - 14);

  // Download
  const link = document.createElement('a');
  link.download = 'leftvalues-result.png';
  link.href = canvas.toDataURL('image/png');
  link.click();

  if (btn) { btn.textContent = T('export_png'); btn.disabled = false; }
}

function showDictionary() {
  renderDictionaryPage(); // Najpierw budujemy listę
  showPage('page-dictionary'); // Potem przełączamy widok na stronę słownika
}
