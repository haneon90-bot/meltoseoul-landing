/**
 * 멸도회랑 — Main Logic
 */

// 캐릭터 데이터 (Restored)
const CHARACTERS = {
  hanidae: [
    { id: 'plexus', name: '플렉서스', aliases: ['한국이능대학 총장', '시스템 관제자'], threat: 'disaster', stigma: '불명', ability: '초전도신경망. 서울에 전력과 통신망을 공급하고 통제한다.', bloom: '불명', desc: '한국이능대학 총장. 중앙관제실 시스템 관제자.', height: '약 190cm', nationality: '불명', quote: '다수의 생존을 위해 소수의 희생은 계산 범위 내에 있다.', img: '/plexus.jpg' },
    { id: 'eun-haeseong', name: '은해성', aliases: ['A반 담임', '보건교사'], threat: 'threat', stigma: '(?)', ability: '성흔력 코팅. 사물에 성흔력을 입혀 절단력을 극대화한다.', bloom: '(?)', desc: '보건교사 겸 A반 담임.', height: '177cm', nationality: '한국/영국 혼혈', quote: '다친 곳 있으면 이리 와. 혼자 참지 말고.', img: '/eun-haeseong.jpg' },
    { id: 'seo-jaeyoon', name: '서재윤', aliases: ['B반 담임'], threat: 'disaster', stigma: '왼쪽 어깨', ability: '흑접 조종. 검은 나비를 생성하여 총탄 궤도를 조작하거나 폭파시킨다.', bloom: '흑접만발 (대량 나비 돌격/폭발)', desc: 'B반 담임.', height: '181cm', nationality: '대한민국', quote: '씨발... 귀찮게. 안 뒤졌으면 대답해라.', img: '/seo-jaeyoon.jpg' },
    { id: 'ha-woonjin', name: '하운진', aliases: ['A반 학생'], threat: 'threat', stigma: '왼쪽 어깨 (연꽃무늬)', ability: '무공. 성흔력으로 무공을 구현하여 압도적인 체술을 발휘한다.', bloom: '만다라 폭발 (천수 환영 소환)', desc: 'A반 학생.', height: '179cm', nationality: '중국', quote: '내 뒤에 서 있어! 방해만 하지 말라고.' },
    { id: 'yomiya-kaname', name: '요미야 카나메', aliases: ['A반 학생'], threat: 'threat', stigma: '왼쪽 눈 (붕대로 은폐)', ability: '영혼절단. 죽음의 기운을 전기톱에 둘러 육체와 영혼을 분리한다.', bloom: '유골도문 (죽음의 영역, 영혼 약화)', desc: 'A반 학생.', height: '183cm', nationality: '일본', quote: '에~ 피 나올까요? 뼈 모양 이쁘겠다, 그쵸?' },
    { id: 'choi-geon', name: '최건', aliases: ['B반 학생', '탈 쓴 은둔형 강자'], threat: 'disaster', stigma: '사타구니', ability: '즉석 메카조립. 주변 무기물과 부품을 조합해 전투용 메카를 즉석에서 조립한다.', bloom: '테디메기드 (기계 테디베어 소환)', desc: 'B반 학생.', height: '192cm', nationality: '대한민국', quote: '`[ 님 쫄? ㅋㅋ ]`' },
    { id: 'yoon-horang', name: '윤호랑', aliases: ['B반 학생', '부산 사투리 분위기메이커'], threat: 'caution', stigma: '왼쪽 등 상단', ability: '수인화. 송곳니와 발톱을 포함한 수인 신체 강화.', bloom: '호쇄결박 (목의 쇠사슬로 속박)', desc: 'B반 학생. 부산 사투리를 쓰며 플러팅과 가벼운 농담이 잦은 낙천적인 분위기메이커.', height: '189cm', nationality: '대한민국', quote: '이 정도는 끄떡없다 아이가, 좋아♪' }
  ],
  baekgolrim: [
    { id: 'cadeba', name: '카데바', aliases: ['백골림의 살아있는 신', '무소속 재앙'], threat: 'apocalypse', stigma: '전신을 덮은 검은 부족 문신', ability: '골격 증식. 자신의 뼈를 증식, 변형, 사출하여 무기로 쓴다.', bloom: '백골만상 (뼈다발 광역 돌출 및 폭격)', desc: '백골림이 신으로 떠받드는 한반도 종말의 원인. 본인은 그 집단에 속하지도, 관심을 두지도 않는다.', height: '210cm', nationality: '불명', quote: '비명 질러!!! 더 크게!!! 아하하하하!!!' }
  ],
  nokwon: [
    { id: 'lee-rok', name: '이록', aliases: ['녹원 보스'], threat: 'disaster', stigma: '오른쪽 종아리', ability: '식생 조종. 자신의 몸이나 주변의 식물을 거대한 촉수처럼 부린다.', bloom: '녹식융해 (초광역 식생 침식, 포자와 맹독)', desc: '녹원의 보스.', height: '173cm', nationality: '불명', quote: '노려보는 얼굴도 좋네. 너무 애쓰지 마.' }
  ],
  unaffiliated: [
    { id: 'yomiya-shigure', name: '요미야 시구레', aliases: ['청부업자', '무소속'], threat: 'disaster', stigma: '없음 (이레귤러)', ability: '일반인을 초월한 압도적 피지컬. 주변 잡동사니를 치명적 살상 무기로 사용.', bloom: '없음', desc: '소속 불명의 청부업자.', height: '187cm', nationality: '일본', quote: '귀찮네. 한 번에 끝내준다.' }
  ]
};

const COMMUNITY_POSTS = [
  { category: 'intel', time: '02:40', title: '인천 구역 진입 불가', body: '식생 침식 속도가 미쳤음. 어제까지만 해도 멀쩡하던 도로가 완전 밀림이 됐다. 이록 수하들인 듯.', footer: '조회 1,241 | 댓글 44' },
  { category: 'sighting', time: '01:15', title: '강남에서 백골림 목격', body: '뼈 꼬리 달린 덩치 큰 놈 봤다. 다들 강남역 근처는 무조건 피해라. 카데바 직접 뜬 거면 끝장이다.', footer: '조회 3,420 | 댓글 102' },
  { category: 'bounty', time: '00:30', title: '[긴급] A급 브로커 류시온 찾음', body: '내 물건 들고 튄 류시온 찾는다. 소속 불문, 산 채로 데려오면 배급표 100장.', footer: '조회 890 | 댓글 12' },
  { category: 'missing', time: '23:45', title: '종로 방공호 실종자 수색', body: '동생이 어제 구호물자 받으러 나갔다가 아직 안 들어왔어요. 파란색 패딩 입은 14살...', footer: '조회 510 | 댓글 8' }
];

document.addEventListener('DOMContentLoaded', () => {
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  initIntroScreen();
  initParticles();
  initCharacters();
  initCommunityBoard();
  initInteractiveTabs();
  initStigmaGenerator();
  initFactionTest();
  initHanidaeSim();
  initDossierModal();
  initMobileNav();
  setupSmoothScroll();
  initFactionCards();
  initClickEffects();
  initBreakingNews();
});

function initIntroScreen() {
  const intro = document.getElementById('intro-screen');
  const status = document.getElementById('intro-status');
  const gaugeFill = document.getElementById('intro-gauge-fill');
  const gaugeContainer = document.getElementById('intro-gauge');
  if(!intro) return;
  document.body.classList.add('locked');
  window.scrollTo(0, 0);
  
  if(gaugeContainer) gaugeContainer.classList.add('active');
  
  let charge = 0; // 0 to 100
  let granted = false;
  
  function grantAccess() {
    if(granted) return;
    granted = true;
    if(status) {
      status.innerText = 'AUTHORIZATION GRANTED_';
      status.classList.add('granted');
    }
    if(gaugeFill) gaugeFill.classList.add('complete');
    
    const gateTop = document.getElementById('split-gate-top');
    const gateBottom = document.getElementById('split-gate-bottom');
    
    // Phase 1 (0.6s delay): Show gate images + fade out intro overlay
    setTimeout(() => {
      if(gateTop) gateTop.classList.add('visible');
      if(gateBottom) gateBottom.classList.add('visible');
      
      // Phase 2 (0.4s later): Fade out intro (reveals gates behind text)
      setTimeout(() => {
        intro.classList.add('fade-out');
        
        // Phase 3 (0.5s later): Gates slide apart, revealing main page
        setTimeout(() => {
          if(gateTop) gateTop.classList.add('open');
          if(gateBottom) gateBottom.classList.add('open');
          
          // Phase 4 (1.3s later): Cleanup - remove everything
          setTimeout(() => {
            intro.classList.add('hidden');
            if(gateTop) gateTop.style.display = 'none';
            if(gateBottom) gateBottom.style.display = 'none';
            document.body.classList.remove('locked');
            window.scrollTo(0, 0);
            const heroVideo = document.querySelector('.hero__footage-video');
            if(heroVideo) {
              heroVideo.currentTime = 0;
              heroVideo.play().catch(() => {});
            }
          }, 1300);
        }, 500);
      }, 400);
    }, 600);
  }

  function tick() {
    if(!granted) {
      charge += 1.0; // Auto fill speed (takes ~1.6 seconds to reach 100 at 60fps)
      if(charge >= 100) {
        charge = 100;
        grantAccess();
      }
    }
    if(gaugeFill) gaugeFill.style.width = charge + '%';
    
    if(status && !granted) {
      status.innerText = `SYNCING PLEXUS_NET... ${Math.floor(charge)}%`;
      status.style.color = 'var(--accent)';
    }
    if(!granted) {
       requestAnimationFrame(tick);
    }
  }
  
  // Start auto-fill after brief delay
  setTimeout(() => {
    requestAnimationFrame(tick);
  }, 500);
}

function initParticles() {
  const cvs = document.getElementById('particles');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  let w = cvs.width = window.innerWidth;
  let h = cvs.height = window.innerHeight;
  const p = Array.from({length: 40}, () => ({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.5+0.5, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-1)*0.5, a: Math.random()*0.5+0.1 }));
  function anim() {
    ctx.clearRect(0,0,w,h);
    p.forEach(i => {
      i.x += i.vx; i.y += i.vy;
      if(i.y < 0) { i.y = h; i.x = Math.random()*w; }
      ctx.fillStyle = `rgba(184, 152, 48, ${i.a})`;
      ctx.beginPath(); ctx.arc(i.x, i.y, i.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
  }
  anim();
  window.addEventListener('resize', () => { w = cvs.width = window.innerWidth; h = cvs.height = window.innerHeight; });
}

function initCharacters() {
  const tabs = document.querySelectorAll('.char-tab');
  const grid = document.getElementById('characters-grid');
  if(!tabs.length || !grid) return;
  function render(factionKey) {
    grid.innerHTML = '';
    const chars = CHARACTERS[factionKey] || [];
    chars.forEach((c, idx) => {
      const el = document.createElement('div');
      el.className = `char-card char-card--${factionKey}`;
      el.style.animationDelay = `${idx * 0.05}s`;
      let threatLevel = c.threat==='disaster'?'참사급' : c.threat==='threat'?'위협급' : c.threat==='apocalypse'?'종말급' : '주의급';
      if(c.id === 'eun-haeseong') threatLevel = '주의급(?)';
      
      let portraitHtml = `
        <div class="char-card__silhouette">?</div>
        <img src="/${c.id}.jpg" alt="${c.name}" class="char-card__image" style="display:none;" onload="this.style.display='block';" onerror="this.onerror=null; this.style.display='none';" />
      `;
      
      el.innerHTML = `<div class="char-card__portrait">${portraitHtml}<div class="char-card__classified">RESTRICTED</div><div class="char-card__access">ACCESS LEVEL 3</div></div><div class="char-card__body"><div class="char-card__meta">${c.aliases.join(' · ')}</div><div class="char-card__name">${c.name}</div><div class="char-card__ability">${c.ability}</div><div class="char-card__footer"><span class="char-card__threat threat--${c.threat}">${threatLevel}</span><span class="char-card__stigma">성흔: ${c.stigma}</span></div></div>`;
      el.addEventListener('click', (event) => {
        createAbilityBurst(c.id, factionKey, event.clientX, event.clientY);
        openDossier(c, factionKey);
      });
      grid.appendChild(el);
    });
  }
  tabs.forEach(t => t.addEventListener('click', () => { tabs.forEach(x => x.classList.remove('active')); t.classList.add('active'); render(t.dataset.tab); }));
  render('hanidae');
}

function initClickEffects() {
  document.addEventListener('click', (event) => {
    if(event.target.closest('#intro-screen')) return;
    createStigmaRipple(event.clientX, event.clientY);
  });
}

function initBreakingNews() {
  const feed = document.getElementById('breaking-news-feed');
  const ticker = document.getElementById('breaking-news-ticker');
  const severity = document.getElementById('breaking-severity');
  if(!feed) return;

  const news = [
    { tag: '긴급', title: '마포 외곽 폐허지대에서 종말급 생체반응 재확인', body: '한이대 관제망은 해당 개체를 카데바로 추정. 현장 접근 및 독자적 교전을 금지했다.', level: 'CLASS-5' },
    { tag: '속보', title: '백골림 잔당, 감시 영상 공개 직후 집단 이동', body: '일부 추종 세력이 카데바 출현을 신탁으로 해석하며 서울 외곽으로 집결 중이다.', level: 'CLASS-4' },
    { tag: '관제', title: '플렉서스 위성망, 영상 좌표 자동 삭제 조치', body: '좌표 확산으로 인한 민간인 접근을 차단하기 위해 원본 위치 정보가 검열 처리됐다.', level: 'LOCKED' },
    { tag: '경고', title: '외곽 방공호 7곳에 대피 권고 발령', body: '인접 구역 주민은 지하 통로 이용을 중단하고 한이대 임시 대피선 안쪽으로 이동해야 한다.', level: 'ALERT' },
    { tag: '분석', title: '카데바 활동량 감소, 교전 전조 가능성 제기', body: '움직임이 없다는 사실 자체가 위험 신호라는 분석이 종말넷 생존자 게시판에서 확산 중이다.', level: 'CLASS-5' },
    { tag: '차단', title: '종말넷 관련 게시물 238건 위험 정보로 분류', body: '카데바 감시 영상의 무단 저장본과 추적 루머가 플렉서스 필터에 의해 차단됐다.', level: 'FILTER' }
  ];

  let index = 0;

  function showNews() {
    const item = news[index % news.length];
    feed.innerHTML = `
      <article class="breaking-item">
        <div class="breaking-item__meta"><span>${item.tag}</span><strong>${item.level}</strong></div>
        <div class="breaking-item__title">${item.title}</div>
        <div class="breaking-item__body">${item.body}</div>
      </article>
    `;
    if(ticker) ticker.textContent = `${item.tag} · ${item.title}`;
    if(severity) severity.textContent = item.level;
    index++;
  }

  showNews();
  setInterval(showNews, 3600);
}

function createStigmaRipple(x, y) {
  const glyphs = ['◈', '✺', '⬢', '⎊', '⧨', '✦'];
  const el = document.createElement('div');
  el.className = 'click-stigma';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.innerHTML = `<span>${glyphs[Math.floor(Math.random() * glyphs.length)]}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function createAbilityBurst(id, faction, x, y) {
  const el = document.createElement('div');
  el.className = `ability-burst ability-burst--${faction} ability-burst--${id}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  for(let i = 0; i < 12; i++) {
    const shard = document.createElement('span');
    shard.style.setProperty('--i', i);
    shard.style.setProperty('--rot', `${i * 30}deg`);
    shard.style.setProperty('--dist', `${58 + (i % 4) * 12}px`);
    el.appendChild(shard);
  }
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function initCommunityBoard() {
  const board = document.getElementById('community-board');
  if(!board) return;
  COMMUNITY_POSTS.forEach(p => {
    const el = document.createElement('div');
    el.className = 'board-post';
    el.innerHTML = `<div class="board-post__header"><span class="board-post__category board-post__category--${p.category}">${p.category.toUpperCase()}</span><span class="board-post__time">${p.time}</span></div><div class="board-post__title">${p.title}</div><div class="board-post__body">${p.body}</div><div class="board-post__footer">${p.footer}</div>`;
    board.appendChild(el);
  });
}

function initInteractiveTabs() {
  const tabs = document.querySelectorAll('.inter-tab');
  const panels = document.querySelectorAll('.inter-panel');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active')); panels.forEach(x => x.classList.remove('active'));
    t.classList.add('active'); document.getElementById(`panel-${t.dataset.panel}`).classList.add('active');
  }));
}

function initStigmaGenerator() {
  const btn = document.getElementById('stigma-btn');
  const display = document.getElementById('stigma-display');
  if(!btn || !display) return;
  btn.addEventListener('click', () => {
    display.innerHTML = '<div class="stigma-gen__idle"><div class="stigma-gen__symbol" style="animation-duration:0.2s">◎</div><p>유전자 분석 중...</p></div>';
    btn.disabled = true;
    setTimeout(() => {
      const stigmas = [
        '절대영도 결빙', '혈액 조작 제어', '공간 왜곡 및 단절', '존재 개념 붕괴', '시간선 간섭', '시냅스 강제 해킹',
        '중력장 역전', '에테르 연소', '환상체 구현화', '기억 삭제 및 대체', '진공 음속 이동', '생체 플라즈마 방어막',
        '질량 무한 증폭', '방사성 포자 생성', '차원단층 절단', '망자 사령 제어', '음파 진동 분쇄', '광원 굴절 은폐',
        '분자 단위 재구축', '체액 산성 변이', '그림자 촉수화', '감각 전이 및 동기화', '유기물 금속화', '사이오닉 염동력',
        '생명력 강탈', '확률론 측면 붕괴', '중금속 결정화 투척', '기상 이변 폭풍', '지진파 공명 활성', '광역 신경 마비',
        '생체 전기 방전', '질병성 포자 확산', '다차원 환영 생성', '절대 침묵 영역', '핵융합 구체 투사', '운동 에너지 포식',
        '환각 가스 분출', '동조 폭파 각인', '신체 재생력 증폭', '동식물 지배 네트워크', '유리 결정 증식', '금속성 골격 강화',
        '영혼 잔향 추적', '고통 감각 증폭', '자기장 궤도 편향', '도시 전력 흡수', '살점 봉합 및 변형', '독성 안개 장막',
        '거울상 분신 투영', '불완전 예지', '심박 동기화 제압', '기계 지성 교란', '사념 탄환 생성', '수면 강제 유도',
        '열량 강탈', '부식성 비 생성', '수은 혈류 변환', '청각 기억 재생', '저주 매듭 각인', '공포 페로몬 방출',
        '충격파 저장 및 반사', '식물성 신경 침식', '뼈 갑주 형성', '암흑 물질 압축', '타인의 그림자 봉인', '문자 명령 현실화',
        '피부 표면 경화', '허공 발판 생성', '사물 관성 제거', '화염 벌레 군집화', '전투 직감 가속', '기억 잔해 실체화',
        '폐허 지형 동화', '상처 위치 전이', '체온 폭주', '전자기 흔적 추적'
      ];
      
      const locs = [
        '우안(右眼) 동공 주변', '척추 하단 신경절', '심장부 부근', '목줄기 쇄골 근처', '양손 손등 전체', 
        '뒤통수 하단', '오른팔 동맥 경로', '가슴 흉골 중앙', '혀뿌리 아래', '사타구니 안쪽', 
        '왼쪽 갈비뼈 아래', '이마 정중앙', '양쪽 아킬레스건', '턱선 및 목덜미', '어깨 날개뼈'
      ];

      const patterns = [
        { name: '검은 연꽃', glyph: '✺' }, { name: '기하학 육각', glyph: '⬢' }, { name: '찢어진 십자가', glyph: '✚' },
        { name: '일그러진 눈', glyph: '⎊' }, { name: '뱀의 똬리', glyph: '∾' }, { name: '조각난 칼날', glyph: '∆' },
        { name: '혈관 가지', glyph: '⑂' }, { name: '이빨 자국', glyph: '≋' }, { name: '불타는 왕관', glyph: '⚝' },
        { name: '세 개의 점', glyph: '⠇' }, { name: '거대 나방', glyph: '⋈' }, { name: '무한의 고리', glyph: '∞' },
        { name: '검은 태양', glyph: '☀' }, { name: '톱니바퀴', glyph: '✇' }, { name: '사슬 매듭', glyph: '⧨' },
        { name: '깨진 달', glyph: '◐' }, { name: '뒤집힌 별', glyph: '✦' }, { name: '가시 원환', glyph: '⊛' },
        { name: '비늘 문양', glyph: '◈' }, { name: '심전도 선', glyph: '⌁' }, { name: '피 묻은 문', glyph: '▣' }
      ];

      const rank = [
        { name: '주의급', className: 'caution' },
        { name: '주의급', className: 'caution' },
        { name: '위협급', className: 'threat' },
        { name: '위협급', className: 'threat' },
        { name: '참사급', className: 'disaster' },
        { name: '종말급', className: 'apocalypse' }
      ];

      const sideEffects = [
        '능력 사용 후 3분간 체온이 급락한다.',
        '감정이 격해질수록 성흔 부위가 갈라진다.',
        '발동 중 가까운 전자기기가 오작동한다.',
        '사용자의 기억 일부가 꿈처럼 흐려진다.',
        '혈액 산소 농도가 급격히 떨어져 호흡이 거칠어진다.',
        '성흔 주변 피부가 금속처럼 굳어 감각이 둔해진다.',
        '반경 5m 안의 타인에게 미약한 두통을 유발한다.',
        '과사용 시 환청 형태의 잔류 명령이 남는다.',
        '발동 직후 신체 균형감각이 일시적으로 무너진다.',
        '사용할수록 수면 욕구가 비정상적으로 증가한다.',
        '성흔력이 고갈되면 오래된 상처가 다시 열린다.',
        '주변 그림자가 사용자를 향해 끌려오는 현상이 발생한다.',
        '강한 빛에 노출되면 능력 정밀도가 낮아진다.',
        '능력 사용 흔적이 플렉서스 망에 오래 남는다.',
        '통증 감각이 늦게 도착해 부상 인지가 지연된다.',
        '발동 중 목소리에 잡음이 섞여 통신 판독률이 낮아진다.',
        '과부하 시 성흔 부위에서 검은 입자가 떨어진다.',
        '사용 직후 10초간 타인의 표정을 읽기 어려워진다.',
        '능력 반동으로 손끝 또는 발끝부터 마비가 온다.',
        '밤에는 출력이 증가하지만 제어 난도가 함께 상승한다.'
      ];

      const bloomNames = [
        '백야절단', '흑우만개', '유리장례', '월식회랑', '심장봉인', '만화경 붕괴',
        '사슬천궁', '적막성역', '녹식관문', '철혈왕관', '나선참회', '허공낙인',
        '천수역류', '명계기동', '홍련압살', '성운장벽', '망각정원', '극야방주',
        '파열기도', '영면극장', '혈월개문', '초전도 묵시록', '백골성채', '무음처형',
        '독화만상', '잔향폭풍', '검은 해일', '인과절벽', '도시포식', '추락성좌'
      ];
      
      const st = stigmas[Math.floor(Math.random()*stigmas.length)];
      const lc = locs[Math.floor(Math.random()*locs.length)];
      const pt = patterns[Math.floor(Math.random()*patterns.length)];
      const rk = rank[Math.floor(Math.random()*rank.length)];
      const sideEffect = sideEffects[Math.floor(Math.random()*sideEffects.length)];
      const bloomName = bloomNames[Math.floor(Math.random()*bloomNames.length)];

      let res = `<div class="stigma-result">
        <div class="stigma-result__glyph">${pt.glyph}</div>
        <div class="stigma-result__name">각성 완료</div>
        <div class="stigma-result__ability">능력: ${st}</div>
        <div class="stigma-result__details">
          <div class="stigma-result__row"><span class="label">발현 부위</span><span class="value">${lc}</span></div>
          <div class="stigma-result__row"><span class="label">성흔 형상</span><span class="value">${pt.name}</span></div>
          <div class="stigma-result__row"><span class="label">위계</span><span class="value stigma-result__rank stigma-result__rank--${rk.className}">${rk.name}</span></div>
          <div class="stigma-result__row stigma-result__row--wide"><span class="label">부작용</span><span class="value">${sideEffect}</span></div>
          <div class="stigma-result__row stigma-result__row--wide"><span class="label">만개명</span><span class="value bright">${bloomName}</span></div>
        </div>
      </div>`;
      
      display.innerHTML = res; 
      btn.disabled = false; 
      btn.innerHTML = '<span class="btn__icon">◈</span> 재검사';
    }, 1500);
  });
}

function initFactionTest() {
  const cnt = document.getElementById('faction-test-container');
  if(!cnt) return;
  const questions = [
    { 
      q: '방벽 밖에서 미등록 거주민이 무장한 상태로 접근을 시도하고 있다. 생존 확률은 희박하다. 당신의 대응 방식은?', 
      a: [ 
        { text: '[ 접근 차단 및 경고 사격으로 현 질서를 수호한다 ]', val: 'hanidae' }, 
        { text: '[ 쓸데없는 소모전이다. 즉시 섬멸하여 화근을 차단한다 ]', val: 'baekgolrim' }, 
        { text: '[ 관망한다. 어느 쪽이든 이 세계의 도태 과정일 뿐이다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '서울의 생명줄인 중앙 관제망 \'플렉서스\'의 통제 권한이 1분간 주어졌다.', 
      a: [ 
        { text: '[ 비상 방어막을 최대로 전개하여 생존자들을 지킨다 ]', val: 'hanidae' }, 
        { text: '[ 전력을 폭주시켜 방벽을 통째로 파괴하고 무법지대화 한다 ]', val: 'baekgolrim' }, 
        { text: '[ 전력을 차단하여 문명의 흔적을 거대한 숲과 암흑 속으로 묻는다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '당신과 동료들이 적성 세력에 완전히 포위당했다. 식량도, 성흔력도 바닥난 상태다.', 
      a: [ 
        { text: '[ 최후의 한 명까지 방어 진형을 유지하며 절망 속에서도 원칙을 고수한다 ]', val: 'hanidae' }, 
        { text: '[ 살 수 있는 유일한 방법은 동료를 미끼로 던지는 것뿐이다. 실행한다 ]', val: 'baekgolrim' }, 
        { text: '[ 무의미한 발버둥이다. 우리도 결국 자연의 거름이 될 뿐이므로 조용히 죽음을 맞이한다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '구호 물자를 훔친 배고픈 고아를 잡았다. 규정상 생존권 내의 도둑질은 엄벌에 처해야 한다.', 
      a: [ 
        { text: '[ 원칙은 원칙이다. 물자를 회수하고 절차에 따라 처벌한다 ]', val: 'hanidae' }, 
        { text: '[ 약자는 도태되어야 한다. 그 자리에서 숨을 끊어 본보기를 보여준다 ]', val: 'baekgolrim' }, 
        { text: '[ 그 또한 살고자 하는 유기체의 발버둥. 도시 밖 숲으로 추방하여 운명에 맡긴다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '과거의 서울, 평화로웠던 시절의 사진을 보았을 때 당신의 감정은?', 
      a: [ 
        { text: '[ 반드시 되출발하고 재건해야만 하는 잃어버린 인류의 위대한 유산 ]', val: 'hanidae' }, 
        { text: '[ 나약하고 위선으로 가득 찼던 거대한 쓰레기통, 파괴되어 마땅했다 ]', val: 'baekgolrim' }, 
        { text: '[ 오만한 기생충들이 콘크리트로 빚어낸 끔찍한 종양, 자연으로 돌아가야 한다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '새로운 미등록 이능력자가 출현했다. 당신보다 잠재력이 뛰어나지만 아직 힘을 통제하지 못한다.', 
      a: [ 
        { text: '[ 안전한 시설로 구금하여 통제법을 가르치고 우리의 전력으로 편입시킨다 ]', val: 'hanidae' }, 
        { text: '[ 나를 위협하기 전에 사지를 부러뜨려 내 밑에서 평생 복종하게 만든다 ]', val: 'baekgolrim' }, 
        { text: '[ 그 힘이 폭주하여 주변 콘크리트를 파괴하도록 내버려둔다. 훌륭한 촉매제다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '압도적인 성흔력 만개가 일어났다. 당신이 가장 갈망하는 종착점은 어디인가?', 
      a: [ 
        { text: '[ 더 이상 누구도 공포에 떨지 않는 질서 정연하고 구원받은 세계 ]', val: 'hanidae' }, 
        { text: '[ 나의 직관력과 파괴 본능만이 규율이 되는 절대적인 생존투쟁 피라미드 ]', val: 'baekgolrim' }, 
        { text: '[ 콘크리트가 무너진 자리에 피어나는, 조용하고 영원한 식물의 바다 ]', val: 'nokwon' } 
      ] 
    }
  ];
  let cur = 0; let scores = { hanidae:0, baekgolrim:0, nokwon:0 };
  function renderQ() {
    if(cur>=questions.length) return renderR();
    let q=questions[cur];
    let html = `<div style="font-family:var(--font-mono);font-size:0.6rem;color:var(--danger);letter-spacing:0.2em;margin-bottom:12px;">PSYCHO-PASS PROTOCOL [${cur+1}/${questions.length}]</div><div class="ft-question" style="font-size:1.05rem;line-height:1.4;">${q.q}</div><div class="ft-options">`;
    q.a.forEach(opt => { html += `<div class="ft-option" data-val="${opt.val}" style="font-size:0.8rem;">${opt.text}</div>`; });
    cnt.innerHTML = html + `</div>`;
  }
  function renderR() {
    let max = -1, f = '';
    for(let k in scores) { if(scores[k]>max) { max=scores[k]; f=k; } }
    let title='', html='';
    if(f==='hanidae') { title='한국이능대학'; html='당신은 굳건한 질서의 수호자입니다. 한이대에 배속되어 이 도시의 심장부를 수호할 강력한 인재로 평가되었습니다.'; }
    if(f==='baekgolrim') { title='백골림'; html='파괴와 혼돈을 향한 본능이 강렬합니다. 척박한 무법지대에서 폭력을 쾌락으로 삼으며 살아남을 포식자 적성입니다.'; }
    if(f==='nokwon') { title='녹원'; html='자연 회귀를 향한 서늘한 갈망이 엿보입니다. 통제된 세계를 무너뜨리고 맹독과 포자 속에 다함께 안식할 자비로운 파괴자입니다.'; }
    cnt.innerHTML = `<div class="ft-result"><div class="ft-result__faction">${title}</div><div class="ft-result__alignment">심리 스캔 및 적성 판별 완료 (7단계)</div><div class="ft-result__desc">${html}</div><button class="btn btn--ghost btn--block" id="ft-restart" style="margin-top:24px;">프로토콜 재시작</button></div>`;
    document.getElementById('ft-restart')?.addEventListener('click', ()=>{ cur=0; scores={hanidae:0,baekgolrim:0,nokwon:0}; renderQ(); });
  }
  cnt.addEventListener('click', e => {
    let opt = e.target.closest('.ft-option'); if(!opt) return;
    scores[opt.dataset.val]++; cur++; renderQ();
  });
  renderQ();
}

function initHanidaeSim() {
  const root = document.getElementById('hanidae-sim');
  const bg = document.getElementById('vn-bg');
  const sprite = document.getElementById('vn-sprite');
  const guest = document.getElementById('vn-guest');
  const stage = root.querySelector('.hero-vn__stage');
  const location = document.getElementById('vn-location');
  const speaker = document.getElementById('vn-speaker');
  const line = document.getElementById('vn-line');
  const choices = document.getElementById('vn-choices');
  const prev = document.getElementById('vn-prev');
  const next = document.getElementById('vn-next');
  const restart = document.getElementById('vn-restart');
  if(!root || !bg || !sprite || !guest || !stage || !location || !speaker || !line || !choices || !prev || !next || !restart) return;

  const ha = {
    normal: '/vn-ha-woonjin-normal.png',
    embarrassed: '/vn-ha-woonjin-embarrassed.png',
    shy: '/vn-ha-woonjin-shy.png',
    angry: '/vn-ha-woonjin-angry.png'
  };

  const scenes = {
    campus: '/vn-bg-campus.png',
    classroom: '/vn-bg-classroom.png',
    control: '/vn-bg-control-room.png',
    dorm: '/vn-bg-dormitory.png',
    training: '/vn-bg-training-ground.png',
    baekgolrim: '/vn-bg-baekgolrim-zone.png'
  };

  const cast = {
    eun: '/vn-eun-haeseong.png',
    seo: '/vn-seo-jaeyoon.png',
    kaname: '/vn-kaname.png',
    yoon: '/vn-yoon-horang.png'
  };

  const script = {
    start: { bg: scenes.campus, loc: '한이대 캠퍼스', face: ha.normal, speaker: '하운진', text: '...신입? 거기 멀뚱히 서 있지 말고 따라와. 여긴 구경하러 오는 곳 아니거든.', next: 'classroom' },
    classroom: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, speaker: '하운진', text: '여기가 A반. 수업은 수업이고, 실전은 실전이야. 졸면 다치고, 멋대로 나서면 더 다쳐.', next: 'control' },
    control: { bg: scenes.control, loc: '중앙관제실', face: ha.normal, speaker: '하운진', text: '저쪽이 중앙관제실. 플렉서스가 서울 전력, 방벽, 감시망을 전부 물고 있어. 기분 나쁠 정도로 정확하지.', next: 'eunIntro' },
    eunIntro: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.normal, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '신입분이시군요. 너무 긴장하지 않으셔도 괜찮아요. 다친 곳이 있으면 이쪽으로 와주세요. 혼자 참지 않으셔도 됩니다.', next: 'eunChoice' },
    eunChoice: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '은 선생님은 웃으면서 사람을 꿰뚫어 보니까 대충 넘길 생각 하지 마. 너라면 뭐라고 대답할 건데?', choices: [
      { label: '조금 다친 것 같다고 말한다', next: 'eunHonest', impact: { trust: 2, stability: 2 }, effect: 'good' },
      { label: '괜찮다고 숨긴다', next: 'eunHide', impact: { trust: -1, risk: 1, stability: -1 }, effect: 'danger' },
      { label: '하운진도 검사받으라고 한다', next: 'eunTease', impact: { trust: 1, aclass: 1 }, effect: 'good' }
    ] },
    eunHonest: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.normal, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '말씀해주셔서 고마워요. 솔직하게 알리는 건 생존률을 높입니다. 상처는 제가 볼 테니, 다음부터도 먼저 보고해주세요.', next: 'seoIntro' },
    eunHide: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.angry, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '괜찮다고 말씀하시는 분들이 제일 걱정됩니다. 무리하지 마세요. 하운진 씨, 이분은 잠깐 더 확인하고 보내겠습니다.', next: 'haEunReact' },
    eunTease: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '야, 왜 갑자기 나야? 난 멀쩡하거든. ...은 선생님, 웃지 마세요.', next: 'seoIntro' },
    haEunReact: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.angry, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '봤지? 여기선 안 아픈 척하는 게 제일 빨리 들켜. 다음부터는 그냥 말해.', next: 'seoIntro' },
    seoIntro: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '신입? 씨발... 또 늘었네. 안 뒤졌으면 대답해라. A반이든 B반이든, 느린 놈부터 갈려나가.', next: 'seoChoice' },
    seoChoice: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '서 선생님 말은 험해도 틀리진 않아. 지금 대답 잘못하면 바로 굴려질걸. 어떻게 할래?', choices: [
      { label: '버틸 수 있다고 답한다', next: 'seoBrave', impact: { risk: 1, bclass: 1 }, effect: 'good' },
      { label: '살려달라고 농담한다', next: 'seoJoke', impact: { risk: 2, bclass: 2 }, effect: 'danger' },
      { label: '하운진 뒤로 조용히 숨는다', next: 'seoHide', impact: { trust: 1, aclass: 1 }, effect: 'soft' }
    ] },
    seoBrave: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '말은 하네. 좋아, 그 허세가 언제 꺾이는지 보자. 하운진, 훈련소로 데려가.', next: 'dorm' },
    seoJoke: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '농담할 힘 있으면 팔굽혀펴기 백 개는 하겠네. 축하한다, 오늘 일정 생겼다.', next: 'haSeoReact' },
    seoHide: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '내 뒤에 서 있으랬지, 내 뒤에 숨으랬냐? ...그래도 처음이면 그럴 수 있어. 이번만 봐준다.', next: 'dorm' },
    haSeoReact: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '그러게 왜 서 선생님 앞에서 입을 털어. 나까지 분위기 이상해졌잖아.', next: 'dorm' },
    dorm: { bg: scenes.dorm, loc: '기숙사', face: ha.shy, speaker: '하운진', text: '기숙사는... 뭐, 생각보다 멀쩡해. 시끄럽게 굴지만 않으면 나쁘진 않아. 진짜로.', next: 'training' },
    training: { bg: scenes.training, loc: '훈련소', face: ha.angry, speaker: '하운진', text: '훈련소에서는 장난치지 마. 성흔력은 멋있는 장식이 아니라, 네 몸을 갉아먹는 무기니까.', next: 'routeChoice' },
    routeChoice: { bg: scenes.training, loc: '훈련소', face: ha.normal, speaker: '하운진', text: '자, 신입. 첫날부터 물어볼게. 너라면 어디부터 더 확인할 건데?', choices: [
      { label: 'A반 교실', next: 'kanameIntro', impact: { aclass: 1, risk: 1 }, effect: 'soft' },
      { label: '훈련소', next: 'yoonIntro', impact: { bclass: 1 }, effect: 'good' },
      { label: '백골림 권역', next: 'baekgolrimWarn', impact: { risk: 2, stability: -1 }, effect: 'danger' }
    ] },
    kanameIntro: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '에~ 신입이에요? 무서워하지 마세요. 아직은 안 자를 거니까요?', next: 'kanameChoice' },
    kanameChoice: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '요미야. 첫 안내에서 그런 소리 하지 말라고 했지. 신입, 뭐라고 받아칠래?', choices: [
      { label: '안 자르면 괜찮다고 한다', next: 'kanameBold', impact: { risk: 2, aclass: 1 }, effect: 'danger' },
      { label: '하운진 뒤로 물러난다', next: 'kanameHide', impact: { trust: 1, stability: 1 }, effect: 'good' },
      { label: '전기톱은 어디 있냐고 묻는다', next: 'kanameSaw', impact: { risk: 2, aclass: 1 }, effect: 'danger' }
    ] },
    kanameBold: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '와아, 담력 좋다. 그런 사람일수록 안쪽이 어떻게 생겼는지 궁금해지는데요?', next: 'haKanameReact' },
    kanameHide: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '잘했어. 쟤 웃고 있어도 절대 등 돌리지 마. 특히 “궁금하다”는 말 나오면 바로 피해.', next: 'ending' },
    kanameSaw: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '에헤헤. 궁금해요? 보여드릴까요? 뼈 모양 이쁘게 남는 쪽으로요.', next: 'haKanameReact' },
    haKanameReact: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '요미야, 그만. 그리고 신입, 너도 이상한 쪽으로 호기심 보이지 마. 여기 그런 애들 이미 충분히 많아.', next: 'ending' },
    yoonIntro: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '훈련부터 보겠다고? 좋다 아이가. 몸으로 부딪히는 아들은 오래 살아남는다. 근데 신입아, 너무 빡빡하게 굴진 마라. 밤엔 좀 풀 줄도 알아야지, 좋아♪', next: 'yoonChoice' },
    yoonChoice: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '윤호랑 선배. 입문 안내 중에 그런 식으로 들이대지 마세요. 신입, 저 사람한테 뭐라고 할래?', choices: [
      { label: '훈련만 부탁한다고 선 긋는다', next: 'yoonLine', impact: { stability: 1, bclass: 1 }, effect: 'good' },
      { label: '부산 사투리를 따라 해본다', next: 'yoonDialect', impact: { bclass: 2, risk: 1 }, effect: 'soft' },
      { label: '하운진에게 대신 말해달라고 한다', next: 'yoonHa', impact: { trust: 1, stability: 1 }, effect: 'good' }
    ] },
    yoonLine: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '오, 선 긋는 거 보소. 좋다. 훈련은 진짜로 봐줄게. 대신 쓰러지면 내가 업고 간다, 좋아♪', next: 'haYoonReact' },
    yoonDialect: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '억양 와 그라노? 귀엽긴 한데, 부산 사람 앞에서 그라면 혼난다 아이가.', next: 'haYoonReact' },
    yoonHa: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '나한테 떠넘기지 마. ...그래도 윤호랑 선배, 신입 겁먹었잖아요. 적당히 하세요.', next: 'ending' },
    haYoonReact: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '저 사람 말은 반만 들어. 실력은 진짜니까 거기까지만 믿고, 나머지는 전부 흘려.', next: 'ending' },
    baekgolrimWarn: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, speaker: '하운진', text: '야, 미쳤어? 거긴 입문 코스가 아니라 사망 코스야. 지도에서 봤다고 실제로 갈 생각 하지 마.', next: 'baekgolrimChoice' },
    baekgolrimChoice: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '외곽? 신입이 첫날부터 자살 관광 코스를 고르네. 이유나 들어보자.', choices: [
      { label: '위험 구역부터 알고 싶다고 한다', next: 'baekgolrimSerious', impact: { risk: 1, stability: 1 }, effect: 'soft' },
      { label: '실수로 눌렀다고 한다', next: 'baekgolrimMistake', impact: { stability: 1 }, effect: 'good' },
      { label: '카데바가 궁금하다고 한다', next: 'baekgolrimCadeba', impact: { risk: 3, stability: -1 }, effect: 'danger' }
    ] },
    baekgolrimSerious: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '방향은 틀렸지만 태도는 낫네. 위험 구역은 현장 가서 배우는 게 아니라 살아 돌아온 기록으로 배우는 거다.', next: 'ending' },
    baekgolrimMistake: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.embarrassed, speaker: '하운진', text: '...그럴 줄 알았어. 첫날부터 외곽 누르는 신입이 정상일 리가 없지. 돌아가자.', next: 'ending' },
    baekgolrimCadeba: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '카데바가 궁금하면 관제 영상이나 봐. 실제로 보면 궁금증보다 유언이 먼저 나온다.', next: 'ending' },
    ending: { bg: scenes.campus, loc: '한이대 캠퍼스', face: ha.shy, speaker: '하운진', text: '...그래도 여기까지 들었으면 됐어. 살아남고 싶으면 혼자 잘난 척하지 마. 내 뒤에 서. 방해만 하지 말고.' }
  };

  let index = 'start';
  const history = [];
  let vnAudioContext;
  let stats = { trust: 1, risk: 0, stability: 1, aclass: 0, bclass: 0 };
  const statEls = {
    trust: { fill: root.querySelector('[data-stat-fill="trust"]'), value: root.querySelector('[data-stat-value="trust"]') },
    risk: { fill: root.querySelector('[data-stat-fill="risk"]'), value: root.querySelector('[data-stat-value="risk"]') },
    stability: { fill: root.querySelector('[data-stat-fill="stability"]'), value: root.querySelector('[data-stat-value="stability"]') },
    aclass: { fill: root.querySelector('[data-stat-fill="aclass"]'), value: root.querySelector('[data-stat-value="aclass"]') },
    bclass: { fill: root.querySelector('[data-stat-fill="bclass"]'), value: root.querySelector('[data-stat-value="bclass"]') }
  };

  function playVnClick(tone = 'soft') {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return;
    vnAudioContext ??= new AudioCtx();
    const fire = () => {
      const now = vnAudioContext.currentTime + 0.01;
      const osc = vnAudioContext.createOscillator();
      const gain = vnAudioContext.createGain();
      const filter = vnAudioContext.createBiquadFilter();
      const freq = tone === 'choice' ? 900 : 620;
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.58, now + 0.075);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.15, now);
      filter.Q.setValueAtTime(7, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.13, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(vnAudioContext.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    };

    if(vnAudioContext.state === 'suspended') {
      vnAudioContext.resume().then(fire).catch(() => {});
      return;
    }
    fire();
  }

  function snapshot() {
    return { index, stats: { ...stats } };
  }

  function restore(state) {
    index = state.index;
    stats = { ...state.stats };
  }

  function applyImpact(impact = {}) {
    Object.entries(impact).forEach(([key, value]) => {
      stats[key] = Math.max(0, Math.min(5, (stats[key] ?? 0) + value));
    });
  }

  function updateStats() {
    Object.entries(statEls).forEach(([key, el]) => {
      const value = stats[key] ?? 0;
      if(el.fill) el.fill.style.width = `${value * 20}%`;
      if(el.value) el.value.textContent = value;
    });
  }

  function flashStage(effect = 'soft') {
    root.classList.remove('vn-effect--soft', 'vn-effect--good', 'vn-effect--danger');
    void root.offsetWidth;
    root.classList.add(`vn-effect--${effect}`);
    setTimeout(() => root.classList.remove(`vn-effect--${effect}`), 520);
  }

  function getEndingResult() {
    if(stats.risk >= 5) {
      return {
        title: 'ENDING 04 — 외곽 출입 금지',
        desc: '호기심과 위험 감수 성향이 높게 감지되었습니다. 플렉서스는 당분간 외곽 임무 접근 권한을 제한합니다.',
        assign: '추천 배속: 한이대 임시 보호 관찰'
      };
    }
    if(stats.bclass >= 4) {
      return {
        title: 'ENDING 03 — B반 관심 대상',
        desc: '서재윤과 윤호랑의 관심권에 들어왔습니다. 생존 가능성은 있으나 훈련 강도가 급상승할 가능성이 큽니다.',
        assign: '추천 배속: B반 합동 훈련 후보'
      };
    }
    if(stats.trust >= 4 && stats.stability >= 3) {
      return {
        title: 'ENDING 01 — 한이대 정규 신입',
        desc: '보고 태도와 성흔 안정도가 양호합니다. 하운진의 안내 아래 기본 적응 과정을 진행할 수 있습니다.',
        assign: '추천 배속: A반 임시 관찰'
      };
    }
    if(stats.aclass >= 3) {
      return {
        title: 'ENDING 02 — A반 보호 관찰',
        desc: 'A반 인물들과의 접점이 강하게 형성되었습니다. 카나메 관련 위험 대응 교육이 필요합니다.',
        assign: '추천 배속: A반 보호 관찰'
      };
    }
    return {
      title: 'ENDING 00 — 관찰 대상',
      desc: '특정 적성이 두드러지지 않습니다. 한이대 기본 관찰 기간을 거친 뒤 세부 배속을 결정합니다.',
      assign: '추천 배속: 미정'
    };
  }

  function renderReport() {
    if(index !== 'ending') return;
    const result = getEndingResult();
    const rows = [
      ['신뢰도', stats.trust],
      ['위험도', stats.risk],
      ['성흔 안정도', stats.stability],
      ['A반 적응', stats.aclass],
      ['B반 관심', stats.bclass]
    ].map(([label, value]) => `<div class="hero-vn__report-row"><span>${label}</span><strong>${value}/5</strong></div>`).join('');
    choices.innerHTML = `
      <div class="hero-vn__report">
        <div class="hero-vn__report-kicker">PLEXUS ORIENTATION RESULT</div>
        <div class="hero-vn__report-title">${result.title}</div>
        <div class="hero-vn__report-desc">${result.desc}</div>
        <div class="hero-vn__report-grid">${rows}</div>
        <div class="hero-vn__report-assign">${result.assign}</div>
      </div>
    `;
  }

  function render() {
    const scene = script[index];
    root.dataset.face = scene.face === ha.normal ? 'normal' : 'variant';
    root.dataset.speaker = scene.speaker === '하운진' ? 'ha' : 'guest';
    root.dataset.guest = scene.guestName || 'none';
    bg.src = scene.bg;
    sprite.src = scene.face;
    location.textContent = scene.loc;
    speaker.textContent = scene.speaker;
    line.textContent = scene.text;
    choices.innerHTML = '';
    guest.classList.remove('active');
    guest.removeAttribute('src');
    guest.removeAttribute('alt');
    if(scene.guest) {
      guest.src = scene.guest;
      guest.alt = scene.guestName || scene.speaker;
      guest.classList.add('active');
    }
    if(scene.choices) {
      next.disabled = true;
      scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'hero-vn__choice';
        btn.type = 'button';
        btn.textContent = choice.label;
        btn.addEventListener('click', () => {
          playVnClick('choice');
          history.push(snapshot());
          applyImpact(choice.impact);
          index = choice.next;
          flashStage(choice.effect);
          render();
        });
        choices.appendChild(btn);
      });
    } else {
      next.disabled = false;
      renderReport();
    }
    prev.disabled = history.length === 0 && index === 'start';
    updateStats();
    root.classList.remove('is-advancing');
    void root.offsetWidth;
    root.classList.add('is-advancing');
  }

  function advanceScene() {
    const scene = script[index];
    if(scene.choices) return;
    playVnClick('soft');
    history.push(snapshot());
    index = scene.next ?? 'start';
    render();
  }

  next.addEventListener('click', advanceScene);
  stage.addEventListener('click', advanceScene);

  prev.addEventListener('click', () => {
    if(history.length) {
      playVnClick('soft');
      restore(history.pop());
      render();
    }
  });

  restart.addEventListener('click', () => {
    playVnClick('choice');
    index = 'start';
    stats = { trust: 1, risk: 0, stability: 1, aclass: 0, bclass: 0 };
    history.length = 0;
    render();
  });

  render();
}

function initDossierModal() {
  const modal = document.getElementById('dossier-modal');
  const close = document.getElementById('modal-close');
  if(!modal || !close) return;
  close.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => { if(e.target===modal) modal.classList.remove('active'); });

  window.openDossier = (c, faction) => {
    const body = document.getElementById('modal-body');
    let factionLabel = faction === 'hanidae' ? '한국이능대학' : faction === 'baekgolrim' ? '백골림' : faction === 'nokwon' ? '녹원' : '무소속';
    let threatLevel = c.threat === 'disaster' ? '참사급' : (c.threat === 'threat' ? '위협급' : (c.threat === 'apocalypse' ? '종말급' : '주의급'));
    
    if (c.id === 'eun-haeseong') threatLevel = '주의급(?)';
    let cleanBloom = c.bloom.split('(')[0].trim();
    
    let avatarHtml = `<img src="/${c.id}.jpg" class="dossier__avatar" style="display:none;" onload="this.style.display='block'; this.closest('.dossier').classList.add('dossier--has-img');" onerror="this.style.display='none';" />`;

    body.innerHTML = `
      <div class="dossier">
        <div class="dossier__top-banner">
          ${avatarHtml}
          <div class="dossier__header">
            <div class="dossier__scan">IDENTITY MATCH: VALID</div>
            <div class="dossier__name-en">CODE: ${c.id.toUpperCase()}</div>
            <div class="dossier__name">${c.name}</div>
          </div>
        </div>
        <div class="dossier__content">
          <div class="dossier__section">
            <div class="dossier__section-title">기본 정보</div>
            <div class="dossier__row"><span class="label">소속</span><span class="value bright">${factionLabel}</span></div>
            <div class="dossier__row"><span class="label">분류</span><span class="value">${threatLevel}</span></div>
            <div class="dossier__row"><span class="label">국적</span><span class="value">${c.nationality || '불명'}</span></div>
            <div class="dossier__row"><span class="label">신장</span><span class="value">${c.height || '불명'}</span></div>
            <div class="dossier__row"><span class="label">설명</span><span class="value" style="text-align:left; line-height:1.6; margin-top:4px;">${c.desc}</span></div>
          </div>
          <div class="dossier__section">
            <div class="dossier__section-title">이능력 명세</div>
            <div class="dossier__row"><span class="label">성흔 위치</span><span class="value">${c.stigma}</span></div>
            <div class="dossier__row"><span class="label">신체능력</span><span class="value" style="text-align:left; line-height:1.6; margin-top:4px;">${c.ability}</span></div>
            <div class="dossier__row"><span class="label">성흔 만개</span><span class="value bright">${cleanBloom}</span></div>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('active');
  };
}

function initMobileNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.mobile-nav__item');
  if(!sections.length || !navItems.length) return;
  
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        navItems.forEach(i => i.classList.remove('active'));
        const activeNav = document.querySelector(`.mobile-nav__item[href="#${e.target.id}"]`);
        if(activeNav) activeNav.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const tg = document.querySelector(this.getAttribute('href'));
      if(tg) tg.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initFactionCards() {
  const cards = document.querySelectorAll('.faction-card');
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const f = card.dataset.faction;
      if(!f) return;
      const tab = document.querySelector(`.char-tab[data-tab="${f}"]`);
      if(tab) tab.click();
      const charSec = document.getElementById('characters');
      if(charSec) charSec.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
