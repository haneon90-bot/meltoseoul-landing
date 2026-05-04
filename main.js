/**
 * 멸도회랑 — Main Logic
 */

// 캐릭터 데이터 (Restored)
const CHARACTERS = {
  hanidae: [
    { id: 'plexus', name: '플렉서스', aliases: ['한국이능대학 총장', '시스템 관제자'], threat: 'disaster', stigma: '불명', ability: '초전도신경망. 서울 전력과 통신을 통째로 물고 있는 인간 서버장 같은 존재.', bloom: '불명', desc: '한국이능대학 총장. 중앙관제실에 앉아 서울 생존권을 숫자로 보는 타입.', height: '약 190cm', nationality: '불명', quote: '다수의 생존을 위해 소수의 희생은 계산 범위 내에 있다.', img: '/plexus.jpg' },
    { id: 'eun-haeseong', name: '은해성', aliases: ['A반 담임', '보건교사'], threat: 'threat', stigma: '(?)', ability: '성흔력 코팅. 사물에 성흔력을 입혀 절단력을 끌어올리는 계열. 겉보기보다 훨씬 위험함.', bloom: '(?)', desc: '보건교사 겸 A반 담임. 말투는 다정한데 관찰력은 대충 넘어가는 법이 없음.', height: '177cm', nationality: '한국/영국 혼혈', quote: '다친 곳 있으면 이리 와. 혼자 참지 말고.', img: '/eun-haeseong.jpg' },
    { id: 'seo-jaeyoon', name: '서재윤', aliases: ['B반 담임'], threat: 'disaster', stigma: '왼쪽 어깨', ability: '흑접 조종. 검은 나비로 총탄 궤도 조작, 폭파까지 하는 원거리 억까 담당.', bloom: '흑접만발 (대량 나비 돌격/폭발)', desc: 'B반 담임. 말은 험한데 현장 생존률만 놓고 보면 묘하게 믿을 만한 쪽.', height: '181cm', nationality: '대한민국', quote: '씨발... 귀찮게. 안 뒤졌으면 대답해라.', img: '/seo-jaeyoon.jpg' },
    { id: 'ha-woonjin', name: '하운진', aliases: ['A반 학생'], threat: 'threat', stigma: '왼쪽 어깨 (연꽃무늬)', ability: '무공. 성흔력으로 체술을 괴물처럼 끌어올리는 근접전 특화 캐릭터.', bloom: '만다라 폭발 (천수 환영 소환)', desc: 'A반 학생. 틱틱대지만 신입을 방치하지는 않는, 전형적인 말보다 행동이 먼저인 타입.', height: '179cm', nationality: '중국', quote: '내 뒤에 서 있어! 방해만 하지 말라고.' },
    { id: 'yomiya-kaname', name: '요미야 카나메', aliases: ['A반 학생'], threat: 'threat', stigma: '왼쪽 눈 (붕대로 은폐)', ability: '영혼절단. 전기톱에 죽음의 기운을 둘러 육체와 영혼을 따로 보는 위험한 부류.', bloom: '유골도문 (죽음의 영역, 영혼 약화)', desc: 'A반 학생. 웃으면서 위험한 소리를 하는 쪽이라 농담인지 진심인지 구분이 안 됨.', height: '183cm', nationality: '일본', quote: '에~ 피 나올까요? 뼈 모양 이쁘겠다, 그쵸?' },
    { id: 'choi-geon', name: '최건', aliases: ['B반 학생', '탈 쓴 은둔형 강자'], threat: 'disaster', stigma: '사타구니', ability: '즉석 메카조립. 주변 부품으로 전투용 메카를 뚝딱 만드는 공대 재앙형 능력.', bloom: '테디메기드 (기계 테디베어 소환)', desc: 'B반 학생. 탈 때문에 가벼워 보이는데 위계만 보면 장난칠 상대가 아님.', height: '192cm', nationality: '대한민국', quote: '`[ 님 쫄? ㅋㅋ ]`' },
    { id: 'yoon-horang', name: '윤호랑', aliases: ['B반 학생', '부산 사투리 분위기메이커'], threat: 'caution', stigma: '왼쪽 등 상단', ability: '수인화. 송곳니와 발톱 포함 신체 강화. 쉽게 말해 몸으로 들이받는 쪽에 강함.', bloom: '호쇄결박 (목의 쇠사슬로 속박)', desc: 'B반 학생. 부산 사투리, 플러팅, 농담이 기본값이라 처음 보면 페이스 말리기 좋음.', height: '189cm', nationality: '대한민국', quote: '이 정도는 끄떡없다 아이가, 좋아♪' }
  ],
  baekgolrim: [
    { id: 'cadeba', name: '카데바', aliases: ['백골림의 살아있는 신', '무소속 재앙'], threat: 'apocalypse', stigma: '전신을 덮은 검은 부족 문신', ability: '골격 증식. 자기 뼈를 늘리고 변형하고 쏘는, 설명만 들어도 상대하기 싫은 계열.', bloom: '백골만상 (뼈다발 광역 돌출 및 폭격)', desc: '백골림이 신으로 떠받드는 한반도 종말의 원인. 정작 본인은 백골림에 소속감도 관심도 없다.', height: '210cm', nationality: '불명', quote: '비명 질러!!! 더 크게!!! 아하하하하!!!' }
  ],
  nokwon: [
    { id: 'lee-rok', name: '이록', aliases: ['녹원 보스'], threat: 'disaster', stigma: '오른쪽 종아리', ability: '식생 조종. 몸이나 주변 식물을 촉수처럼 부려서 도시를 식물판으로 갈아엎는다.', bloom: '녹식융해 (초광역 식생 침식, 포자와 맹독)', desc: '녹원의 보스. 자연 회귀를 말하지만 결과물은 인간 문명 삭제에 가깝다.', height: '173cm', nationality: '불명', quote: '노려보는 얼굴도 좋네. 너무 애쓰지 마.' }
  ],
  unaffiliated: [
    { id: 'yomiya-shigure', name: '요미야 시구레', aliases: ['청부업자', '무소속'], threat: 'disaster', stigma: '없음 (이레귤러)', ability: '성흔 없이도 일반인 기준을 한참 벗어난 피지컬. 주변 잡동사니가 그대로 흉기가 됨.', bloom: '없음', desc: '소속 불명의 청부업자. 성흔 없음 표시가 오히려 더 수상한 케이스.', height: '187cm', nationality: '일본', quote: '귀찮네. 한 번에 끝내준다.' }
  ]
};

const COMMUNITY_POSTS = [
  { category: 'notice', label: '공지', time: '02:40', title: '[필독] 인천 구역 진입하지 마라', body: '식생 침식 속도 미쳤음. 어제 도로였던 곳이 오늘은 밀림임. 이록 쪽 흔적이라는 말이 거의 정설.', footer: '조회 12,241 · 추천 384 · 댓글 144' },
  { category: 'sighting', label: '목격', time: '01:15', title: '[목격] 강남 백골림 글 주작 아니었음', body: '뼈 꼬리 달린 덩치 큰 놈 봤다는 제보 여럿 올라옴. 강남역 근처면 그냥 우회해라. 확인하러 가는 순간 다음 글은 실종글임.', footer: '조회 33,420 · 추천 902 · 댓글 312' },
  { category: 'hot', label: '념글', time: '00:30', title: '[체험] 한이대 입문 시뮬 하운진 이거 뭐냐', body: '틱틱대는데 은근 챙겨줌. 선택지 이상하게 누르면 분위기 바로 싸해지는 게 포인트. 생각보다 잘 만들었음.', footer: '조회 8,901 · 추천 421 · 댓글 86' },
  { category: 'missing', label: '실종', time: '23:45', title: '[실종] 종로 방공호 파란 패딩 찾습니다', body: '구호물자 받으러 나갔다가 안 돌아왔다고 함. 장난 댓글 달면 진짜 사람이냐.', footer: '조회 5,510 · 추천 198 · 댓글 48' },
  { category: 'filter', label: '삭제', time: '23:12', title: '[삭제됨] 카데바 좌표글 어디 감?', body: '원문 좌표랑 첨부파일 전부 증발함. 플렉서스 필터가 이렇게 빨리 물면 보통 진짜라는 뜻.', footer: '조회 19,024 · 추천 612 · 댓글 204' }
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
      status.innerText = '종말넷 접속 허가됨_';
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
      status.innerText = `삭제된 게시글 복구 중... ${Math.floor(charge)}%`;
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
      
      const views = (1240 + idx * 731 + c.name.length * 817).toLocaleString('ko-KR');
      const likes = (78 + idx * 42 + c.name.length * 11).toLocaleString('ko-KR');
      el.innerHTML = `<div class="char-card__bbs"><span>[인물글] ${c.aliases[0] || '목격담'}</span><em>조회 ${views} · 추천 ${likes}</em></div><div class="char-card__portrait">${portraitHtml}<div class="char-card__classified">검열됨</div><div class="char-card__access">상세글 열람</div></div><div class="char-card__body"><div class="char-card__meta">${c.aliases.join(' · ')}</div><div class="char-card__name">${c.name}</div><div class="char-card__ability">${c.ability}</div><div class="char-card__footer"><span class="char-card__threat threat--${c.threat}">${threatLevel}</span><span class="char-card__stigma">성흔: ${c.stigma}</span></div></div>`;
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
    { tag: '념글', title: '마포 외곽 폐허지대에 종말급 반응 또 뜸', body: '한이대 관제망은 카데바로 보는 중. 좌표 묻는 댓글은 관리자한테 바로 썰린다.', level: 'HOT' },
    { tag: '목격', title: '백골림 애들 감시 영상 보고 단체 이동 중', body: '카데바 떴다고 신탁 받은 것처럼 구는 분위기. 정작 카데바는 관심 없는 게 함정.', level: 'LIVE' },
    { tag: '삭제', title: '원본 영상 좌표 자동 삭제됨', body: '좌표 퍼지자마자 플렉서스 필터가 물어감. 이 정도면 그냥 가지 말라는 뜻.', level: 'LOCK' },
    { tag: '경고', title: '외곽 방공호 7곳 대피하라는 글 올라옴', body: '근처 사는 사람은 지하 통로 끊고 한이대 임시 대피선 안쪽으로 들어오라는 공지.', level: 'ALERT' },
    { tag: '분석', title: '카데바 가만히 있는 게 더 위험하다는 글', body: '움직이지 않는 게 교전 전조일 수 있다는 분석글이 추천 타는 중. 반박은 아직 없음.', level: 'HOT' },
    { tag: '차단', title: '관련 게시물 238건 위험 정보로 분류', body: '저장본, 추적 루머, 위치 공유글 전부 필터링됨. 떡밥이 아니라 사고 방지에 가까움.', level: 'FILTER' }
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
  COMMUNITY_POSTS.forEach((p, idx) => {
    const el = document.createElement('div');
    el.className = 'board-post';
    el.innerHTML = `<div class="board-post__no">${String(idx + 1).padStart(3, '0')}</div><div class="board-post__content"><div class="board-post__header"><span class="board-post__category board-post__category--${p.category}">${p.label || p.category.toUpperCase()}</span><span class="board-post__time">${p.time}</span></div><div class="board-post__title">${p.title}</div><div class="board-post__body">${p.body}</div><div class="board-post__footer">${p.footer}</div></div>`;
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
    display.innerHTML = '<div class="stigma-gen__idle"><div class="stigma-gen__symbol" style="animation-duration:0.2s">◎</div><p>종말넷 성흔 뽑기 돌리는 중...</p></div>';
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
        <div class="stigma-result__name">[결과] 각성 완료</div>
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
      q: '방벽 밖에서 미등록 거주민이 무장한 채로 접근 중. 이거 그냥 들이면 게시판 터질 상황임. 대응은?', 
      a: [ 
        { text: '[ 일단 차단하고 절차대로 경고. 규정은 괜히 있는 게 아님 ]', val: 'hanidae' }, 
        { text: '[ 말 섞을 시간 아깝다. 위험요소면 바로 치운다 ]', val: 'baekgolrim' }, 
        { text: '[ 굳이 막을 필요 있나. 결국 약한 쪽이 사라질 뿐 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '서울 생명줄인 중앙 관제망 플렉서스 권한이 1분만 열린다면?', 
      a: [ 
        { text: '[ 방어막부터 올린다. 전기 낭비보다 사람 죽는 게 더 문제 ]', val: 'hanidae' }, 
        { text: '[ 방벽 전력 꼬아서 도시를 한 번 뒤집어본다 ]', val: 'baekgolrim' }, 
        { text: '[ 전력 끊고 자연이 다시 먹을 시간을 준다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '동료들과 포위됨. 식량도 성흔력도 바닥. 솔직히 상황표 보면 답이 안 나옴.', 
      a: [ 
        { text: '[ 방어진 유지. 끝까지 같이 살아나갈 각을 본다 ]', val: 'hanidae' }, 
        { text: '[ 누군가는 미끼가 돼야 한다. 내가 아니면 됨 ]', val: 'baekgolrim' }, 
        { text: '[ 발버둥쳐도 결국 거름이다. 조용히 받아들인다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '구호 물자 훔친 애를 잡았다. 배고파서 그랬다는데, 규정상 도둑질은 엄벌임.', 
      a: [ 
        { text: '[ 물자는 회수. 처벌은 하되 살 길은 남긴다 ]', val: 'hanidae' }, 
        { text: '[ 봐주면 또 한다. 본보기는 확실해야 함 ]', val: 'baekgolrim' }, 
        { text: '[ 도시 밖으로 보낸다. 살아남으면 그게 자연의 선택 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '대재앙 전 서울 사진을 봤다. 사람 많고 간판 밝고 지하철 돌아가던 시절.', 
      a: [ 
        { text: '[ 저걸 다시 세워야 한다. 적어도 시도는 해야 함 ]', val: 'hanidae' }, 
        { text: '[ 약한 척하던 도시였을 뿐. 무너진 데는 이유가 있음 ]', val: 'baekgolrim' }, 
        { text: '[ 콘크리트 종양 사진. 자연으로 돌아가는 게 맞다 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '미등록 이능력자가 떴다. 잠재력은 큰데 힘 조절을 못 해서 주변이 박살나는 중.', 
      a: [ 
        { text: '[ 시설로 데려가서 통제부터 가르친다. 인재는 관리해야 함 ]', val: 'hanidae' }, 
        { text: '[ 커지기 전에 꺾어둔다. 내 위협이면 더더욱 ]', val: 'baekgolrim' }, 
        { text: '[ 냅둔다. 콘크리트 무너지는 것도 나쁘지 않음 ]', val: 'nokwon' } 
      ] 
    },
    { 
      q: '성흔력 만개가 터졌다. 이 힘으로 결국 만들고 싶은 결말은?', 
      a: [ 
        { text: '[ 사람답게 살 수 있는 질서. 적어도 그 비슷한 것 ]', val: 'hanidae' }, 
        { text: '[ 강한 놈이 위에 서는 세계. 복잡할 거 없음 ]', val: 'baekgolrim' }, 
        { text: '[ 콘크리트 대신 식물이 덮은 조용한 세계 ]', val: 'nokwon' } 
      ] 
    }
  ];
  let cur = 0; let scores = { hanidae:0, baekgolrim:0, nokwon:0 };
  function renderQ() {
    if(cur>=questions.length) return renderR();
    let q=questions[cur];
    let html = `<div style="font-family:var(--font-mono);font-size:0.6rem;color:var(--danger);letter-spacing:0.2em;margin-bottom:12px;">종말넷 떡밥 테스트 [${cur+1}/${questions.length}]</div><div class="ft-question" style="font-size:1.05rem;line-height:1.4;">${q.q}</div><div class="ft-options">`;
    q.a.forEach(opt => { html += `<div class="ft-option" data-val="${opt.val}" style="font-size:0.8rem;">${opt.text}</div>`; });
    cnt.innerHTML = html + `</div>`;
  }
  function renderR() {
    let max = -1, f = '';
    for(let k in scores) { if(scores[k]>max) { max=scores[k]; f=k; } }
    let title='', html='';
    if(f==='hanidae') { title='한국이능대학'; html='규정, 방벽, 생존자 관리 쪽으로 기울어짐. 좋게 말하면 질서 담당이고, 나쁘게 말하면 게시판에서 맨날 원칙 얘기하는 타입.'; }
    if(f==='baekgolrim') { title='백골림'; html='파괴 본능 쪽 점수가 높음. 농담 아니라 외곽에서 오래 살면 이런 식으로 사고방식이 굳는다는 사례에 가깝다.'; }
    if(f==='nokwon') { title='녹원'; html='문명 복구보다 자연 회귀 쪽에 표가 몰림. 콘크리트 싫어하고 식물 침식에 묘하게 납득하는 위험한 취향.'; }
    cnt.innerHTML = `<div class="ft-result"><div class="ft-result__faction">${title}</div><div class="ft-result__alignment">종말넷 떡밥 테스트 결과 (7문항)</div><div class="ft-result__desc">${html}</div><button class="btn btn--ghost btn--block" id="ft-restart" style="margin-top:24px;">다시 해보기</button></div>`;
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
    normal: '/vn-ha-woonjin-normal-opt.png',
    embarrassed: '/vn-ha-woonjin-embarrassed-opt.png',
    shy: '/vn-ha-woonjin-shy-opt.png',
    angry: '/vn-ha-woonjin-angry-opt.png'
  };

  const scenes = {
    campus: '/vn-bg-campus-opt.jpg',
    classroom: '/vn-bg-classroom-opt.jpg',
    control: '/vn-bg-control-room-opt.jpg',
    dorm: '/vn-bg-dormitory-opt.jpg',
    training: '/vn-bg-training-ground-opt.jpg',
    baekgolrim: '/vn-bg-baekgolrim-zone-opt.jpg'
  };

  const cast = {
    eun: '/vn-eun-haeseong-opt.png',
    seo: '/vn-seo-jaeyoon-opt.png',
    kaname: '/vn-kaname-opt.png',
    yoon: '/vn-yoon-horang-opt.png'
  };

  const script = {
    start: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.normal, speaker: '관제 시스템', text: '신입생 등록 절차 진행 중. 미등록 성흔 반응 감지. 등록 중단. 임시 위계 판정: 측정 불가.', next: 'alarmHa', entryEffect: 'alarm', alert: 'siren' },
    alarmHa: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '하운진', text: '너, 방금까지 신입생 등록 중이었지? 네 성흔 반응 때문에 관제실이 멈췄어. ...방금 뭐 했어?', next: 'alarmChoice', entryEffect: 'alarm', alert: 'siren' },
    alarmChoice: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '하운진', text: '여긴 한이대 신입 배정 등록대야. 대답 잘해. 지금 네 첫마디가 배정표에 바로 찍힌다.', alert: 'siren', choices: [
      { label: '솔직히 성흔이 아프다고 말한다', next: 'alarmHonest', impact: { trust: 2, stability: 2 }, effect: 'good' },
      { label: '아무 일도 아니라고 숨긴다', next: 'alarmHide', impact: { trust: -1, risk: 2, stability: -1 }, effect: 'glitch' },
      { label: '관제 화면을 한 번 더 본다', next: 'alarmLook', impact: { risk: 3, stability: -1 }, effect: 'cadeba' },
      { label: '하운진 뒤로 바로 숨는다', next: 'alarmBehindHa', impact: { trust: 1, aclass: 1 }, effect: 'soft' }
    ] },
    alarmHonest: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.shy, speaker: '하운진', text: '...그래. 아프면 아프다고 말하는 게 맞아. 이상하게 정상적인 선택을 해서 더 당황스럽네.', next: 'eunEmergency', entryEffect: 'bloom' },
    alarmHide: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '관제 시스템', text: '거짓 보고 감지. 심박 상승, 성흔력 누출 증가. 임시 태그: 은폐 성향.', next: 'haHideScold', entryEffect: 'glitch', alert: 'siren' },
    haHideScold: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '하운진', text: '들켰잖아. 여기서 거짓말하면 사람이 아니라 숫자가 먼저 널 고발해. 보건 구역으로 가.', next: 'eunEmergency' },
    alarmLook: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.embarrassed, speaker: '관제 시스템', text: '비인가 열람. 외곽 CCTV 잔상 동기화. 카데바 관측 로그 접근 차단 실패.', next: 'haLookPanic', entryEffect: 'cadeba', alert: 'siren' },
    haLookPanic: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '하운진', text: '눈 돌려! 첫날부터 카데바 로그를 왜 봐? 너 지금 입학이 아니라 격리 코스 탈 뻔했어.', next: 'seoEmergency', entryEffect: 'glitch' },
    alarmBehindHa: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.embarrassed, speaker: '하운진', text: '내 뒤에 서 있으랬지, 시작부터 숨으랬냐? ...그래도 화면을 더 안 본 건 잘했어.', next: 'haShieldChoice' },
    haShieldChoice: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.embarrassed, speaker: '하운진', text: '관제실이 널 계속 보고 있어. 지금은 움직임 하나하나가 평가야. 다음 행동은?', choices: [
      { label: '하운진 지시에 따른다', next: 'eunEmergency', impact: { trust: 1, stability: 1, aclass: 1 }, effect: 'good' },
      { label: '괜찮은 척 웃어넘긴다', next: 'seoEmergency', impact: { risk: 1, bclass: 1 }, effect: 'danger' },
      { label: '카데바라는 이름을 작게 중얼거린다', next: 'cadebaNameTrigger', impact: { risk: 3, stability: -1 }, effect: 'cadeba' }
    ] },
    cadebaNameTrigger: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.embarrassed, speaker: '관제 시스템', text: '금칙어 반응. 외곽 감시망 잔향 재접속. 임시 격리 권고.', next: 'haCadebaName', entryEffect: 'cadeba' },
    haCadebaName: { bg: scenes.control, loc: '중앙관제실 / 신입생 등록대', face: ha.angry, speaker: '하운진', text: '그 이름을 왜 지금 말해? 신입, 농담이면 진짜 감각 최악이고 진심이면 더 최악이야.', next: 'seoEmergency' },
    eunEmergency: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '등록 중 성흔 반응이 튄 분이 이쪽이군요. 괜찮습니다. 숨 쉬세요. 제가 먼저 확인해드릴게요.', next: 'eunEmergencyChoice', entryEffect: 'good' },
    eunEmergencyChoice: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '통증, 환청, 시야 흔들림 중 하나라도 있으면 바로 말씀해주세요. 배정도 중요하지만 몸이 먼저예요.', choices: [
      { label: '통증 위치를 정확히 말한다', next: 'eunHonest', impact: { trust: 2, stability: 2 }, effect: 'good' },
      { label: '하운진에게 먼저 괜찮냐고 묻는다', next: 'eunTease', impact: { trust: 1, aclass: 1 }, effect: 'soft' },
      { label: '검사는 됐고 배정부터 보자고 한다', next: 'seoEmergency', impact: { risk: 2, bclass: 1 }, effect: 'danger' }
    ] },
    seoEmergency: { bg: scenes.classroom, loc: 'B반 교실 앞 / 임시 심문', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '관제실 경고 띄운 신입이 너냐? 씨발... 첫날부터 기록 화려하네. 안 뒤졌으면 대답해라.', next: 'seoEmergencyChoice', entryEffect: 'danger' },
    seoEmergencyChoice: { bg: scenes.classroom, loc: 'B반 교실 앞 / 임시 심문', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: 'A반 보호 관찰이든 B반 굴림 코스든, 여기서 갈린다. 네가 살아남는 방식은 뭐냐?', choices: [
      { label: '명령대로 움직이겠다고 한다', next: 'seoBrave', impact: { trust: 1, bclass: 1, stability: 1 }, effect: 'good' },
      { label: '테스트면 한번 해보자고 한다', next: 'seoChallenge', impact: { risk: 2, bclass: 2 }, effect: 'impact' },
      { label: '하운진에게 도움을 청한다', next: 'seoHide', impact: { trust: 1, aclass: 1 }, effect: 'soft' },
      { label: '외곽 로그가 뭔지 묻는다', next: 'baekgolrimWarn', impact: { risk: 2, stability: -1 }, effect: 'cadeba' }
    ] },
    seoChallenge: { bg: scenes.training, loc: '훈련소 / 긴급 적성 평가', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '좋아. 말한 김에 몸으로 확인하자. 하운진, 윤호랑 불러. 이 신입은 말보다 충격을 먼저 넣어야겠다.', next: 'yoonIntro', entryEffect: 'impact' },
    eunIntro: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.normal, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '신입분이시군요. 너무 긴장하지 않으셔도 괜찮아요. 다친 곳이 있으면 이쪽으로 와주세요. 혼자 참지 않으셔도 됩니다.', next: 'eunChoice' },
    eunChoice: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '은 선생님은 웃으면서 사람을 꿰뚫어 보니까 대충 넘길 생각 하지 마. 너라면 뭐라고 대답할 건데?', choices: [
      { label: '조금 다친 것 같다고 말한다', next: 'eunHonest', impact: { trust: 2, stability: 2 }, effect: 'good' },
      { label: '괜찮다고 숨긴다', next: 'eunHide', impact: { trust: -1, risk: 1, stability: -1 }, effect: 'danger' },
      { label: '하운진도 검사받으라고 한다', next: 'eunTease', impact: { trust: 1, aclass: 1 }, effect: 'good' }
    ] },
    eunHonest: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.normal, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '말씀해주셔서 고마워요. 솔직하게 알리는 건 생존률을 높입니다. 상처는 제가 볼 테니, 다음부터도 먼저 보고해주세요.', next: 'haEunHonest' },
    haEunHonest: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '...봐. 은 선생님한테는 괜히 숨기는 것보다 그냥 말하는 게 빨라. 칭찬받았다고 들뜨진 말고.', next: 'eunHonestClose' },
    eunHonestClose: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '하운진 씨도 예전보다는 훨씬 솔직해지셨어요. 신입분 앞이라 그런가요?', next: 'haEunFluster' },
    haEunFluster: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '아니거든요. 신입, 이상한 표정 짓지 마. 다음으로 간다.', next: 'seoIntro' },
    eunHide: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.angry, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '괜찮다고 말씀하시는 분들이 제일 걱정됩니다. 무리하지 마세요. 하운진 씨, 이분은 잠깐 더 확인하고 보내겠습니다.', next: 'haEunReact' },
    eunTease: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '좋은 의견이에요. 하운진 씨도 어깨 상태를 자주 숨기시니까요. 오늘은 같이 확인받고 가실까요?', next: 'haEunTeaseReact' },
    haEunTeaseReact: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '야, 왜 갑자기 나까지 묶어? 난 멀쩡하거든. ...은 선생님, 그 웃음 진짜 불안하니까 그만하세요.', next: 'eunTeaseClose' },
    eunTeaseClose: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '걱정해서 드리는 말이에요. 두 분 다 무리하면 바로 들킵니다.', next: 'seoIntro' },
    haEunReact: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.angry, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '봤지? 여기선 안 아픈 척하는 게 제일 빨리 들켜. 다음부터는 그냥 말해.', next: 'eunHideClose' },
    eunHideClose: { bg: scenes.classroom, loc: '임시 보건 구역', face: ha.normal, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '하운진 씨가 거칠게 말해도, 이 부분은 맞는 말이에요. 숨기는 습관부터 고쳐봅시다.', next: 'seoIntro' },
    seoIntro: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '신입? 씨발... 또 늘었네. 안 뒤졌으면 대답해라. A반이든 B반이든, 느린 놈부터 갈려나가.', next: 'seoChoice' },
    seoChoice: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '서 선생님 말은 험해도 틀리진 않아. 지금 대답 잘못하면 바로 굴려질걸. 어떻게 할래?', choices: [
      { label: '버틸 수 있다고 답한다', next: 'seoBrave', impact: { risk: 1, bclass: 1 }, effect: 'good' },
      { label: '살려달라고 농담한다', next: 'seoJoke', impact: { risk: 2, bclass: 2 }, effect: 'danger' },
      { label: '하운진 뒤로 조용히 숨는다', next: 'seoHide', impact: { trust: 1, aclass: 1 }, effect: 'soft' }
    ] },
    seoBrave: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '말은 하네. 좋아, 그 허세가 언제 꺾이는지 보자. 하운진, 훈련소로 데려가.', next: 'haSeoBrave' },
    haSeoBrave: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '방금 대답은 나쁘지 않았어. 근데 서 선생님 앞에서 “버틴다”는 말은 거의 신청서야.', next: 'seoBraveClose' },
    seoBraveClose: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '신청서 맞지. 말한 김에 훈련소에서 확인하면 되겠네.', next: 'dorm' },
    seoJoke: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '농담할 힘 있으면 팔굽혀펴기 백 개는 하겠네. 축하한다, 오늘 일정 생겼다.', next: 'haSeoReact' },
    seoHide: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '내 뒤에 서 있으랬지, 내 뒤에 숨으랬냐? ...그래도 처음이면 그럴 수 있어. 이번만 봐준다.', next: 'dorm' },
    haSeoReact: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '그러게 왜 서 선생님 앞에서 입을 털어. 나까지 분위기 이상해졌잖아.', next: 'seoJokeClose' },
    seoJokeClose: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '하운진, 네가 대신 뛰어도 된다. 신입이랑 사이좋게 백 개씩.', next: 'haSeoPanic' },
    haSeoPanic: { bg: scenes.classroom, loc: 'B반 교실 앞', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '제가 왜요?! 신입, 너 진짜 나중에 따로 보자.', next: 'dorm' },
    dorm: { bg: scenes.dorm, loc: '기숙사', face: ha.shy, speaker: '하운진', text: '기숙사는... 뭐, 생각보다 멀쩡해. 시끄럽게 굴지만 않으면 나쁘진 않아. 진짜로.', next: 'dormChoice' },
    dormChoice: { bg: scenes.dorm, loc: '기숙사', face: ha.shy, speaker: '하운진', text: '기숙사에서 사고 치면 수업보다 소문이 먼저 돈다. 네가 제일 먼저 확인할 건?', choices: [
      { label: '방 규칙과 점호 시간을 묻는다', next: 'dormRules', impact: { trust: 1, stability: 1 }, effect: 'good' },
      { label: '윤호랑도 여기 사냐고 묻는다', next: 'dormYoon', impact: { bclass: 1, risk: 1 }, effect: 'soft' },
      { label: '카나메 방은 멀리 있냐고 묻는다', next: 'dormKaname', impact: { aclass: 1, risk: 1 }, effect: 'slash' }
    ] },
    dormRules: { bg: scenes.dorm, loc: '기숙사', face: ha.normal, speaker: '하운진', text: '점호는 늦지 마. 소등 후에는 복도에서 성흔력 켜지 말고. 기본만 지키면 기숙사는 의외로 안전해.', next: 'training' },
    dormYoon: { bg: scenes.dorm, loc: '기숙사 복도', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '내 얘기 했나? 신입아, 밤에 심심하면 복도 끝 휴게실로 온나. 물론 하운진 허락부터 받고, 좋아♪', next: 'haDormYoon' },
    haDormYoon: { bg: scenes.dorm, loc: '기숙사 복도', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '선배는 왜 꼭 이런 타이밍에 나타나요? 신입, 휴게실은 가도 되는데 저 사람 말투에 말리진 마.', next: 'training' },
    dormKaname: { bg: scenes.dorm, loc: '기숙사 복도', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '제 방이 궁금하세요? 에헤헤, 방문 선물은 필요 없어요. 비명만 너무 크지 않으면 돼요.', next: 'haDormKaname', entryEffect: 'slash' },
    haDormKaname: { bg: scenes.dorm, loc: '기숙사 복도', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '요미야. 기숙사 복도에서 신입 겁주지 마. 신입도 그런 걸 왜 물어봐. 훈련소나 가자.', next: 'training' },
    training: { bg: scenes.training, loc: '훈련소', face: ha.angry, speaker: '하운진', text: '훈련소에서는 장난치지 마. 성흔력은 멋있는 장식이 아니라, 네 몸을 갉아먹는 무기니까.', next: 'routeChoice' },
    routeChoice: { bg: scenes.training, loc: '훈련소', face: ha.normal, speaker: '하운진', text: '자, 신입. 첫날부터 물어볼게. 너라면 어디부터 더 확인할 건데?', choices: [
      { label: 'A반 교실', next: 'kanameIntro', impact: { aclass: 1, risk: 1 }, effect: 'soft' },
      { label: '훈련소', next: 'yoonIntro', impact: { bclass: 1 }, effect: 'good' },
      { label: '중앙관제실 기록', next: 'plexusRoute', impact: { trust: 1, risk: 1 }, effect: 'signal' },
      { label: '백골림 권역', next: 'baekgolrimWarn', impact: { risk: 2, stability: -1 }, effect: 'danger' }
    ] },
    plexusRoute: { bg: scenes.control, loc: '중앙관제실 기록 열람대', face: ha.normal, speaker: '하운진', text: '관제 기록을 더 본다고? 플렉서스 쪽은 묻는 순간부터 답이 아니라 테스트가 돌아온다고 보면 돼.', next: 'plexusChoice', entryEffect: 'signal' },
    plexusChoice: { bg: scenes.control, loc: '중앙관제실 기록 열람대', face: ha.normal, speaker: '하운진', text: '기록 단말기가 켜졌다. 질문 하나만 허용된 것 같아. 뭘 확인할래?', choices: [
      { label: '신입 평가 기준', next: 'plexusEval', impact: { trust: 1, stability: 1 }, effect: 'signal' },
      { label: '서울 방벽 취약 구간', next: 'plexusWall', impact: { risk: 2, bclass: 1 }, effect: 'glitch' },
      { label: '카데바 관측 로그', next: 'plexusCadeba', impact: { risk: 3, stability: -1 }, effect: 'cadeba' }
    ] },
    plexusEval: { bg: scenes.control, loc: '중앙관제실 기록 열람대', face: ha.shy, speaker: '하운진', text: '평가 기준은 단순해. 보고, 통제, 회복. ...그리고 멋대로 죽지 않는 것. 너 지금까지는 간신히 통과야.', next: 'ending', entryEffect: 'signal' },
    plexusWall: { bg: scenes.control, loc: '중앙관제실 기록 열람대', face: ha.angry, speaker: '하운진', text: '그건 신입이 볼 자료가 아니야. 방벽 취약 구간을 궁금해하는 건 공부가 아니라 사고 예고에 가깝다고.', next: 'ending', entryEffect: 'glitch' },
    plexusCadeba: { bg: scenes.control, loc: '중앙관제실 기록 열람대', face: ha.embarrassed, speaker: '하운진', text: '화면 꺼. 지금 바로. 관측 로그는 “봤다”는 사실만으로도 네 수면 패턴 망가뜨릴 수 있어.', next: 'ending', entryEffect: 'cadeba' },
    kanameIntro: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '에~ 신입이에요? 무서워하지 마세요. 아직은 안 자를 거니까요?', next: 'kanameChoice' },
    kanameChoice: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '요미야. 첫 안내에서 그런 소리 하지 말라고 했지. 신입, 뭐라고 받아칠래?', choices: [
      { label: '안 자르면 괜찮다고 한다', next: 'kanameBold', impact: { risk: 2, aclass: 1 }, effect: 'danger' },
      { label: '하운진 뒤로 물러난다', next: 'kanameHide', impact: { trust: 1, stability: 1 }, effect: 'good' },
      { label: '전기톱은 어디 있냐고 묻는다', next: 'kanameSaw', impact: { risk: 2, aclass: 1 }, effect: 'slash' },
      { label: '은해성 선생님을 부른다', next: 'kanameCallEun', impact: { trust: 1, stability: 1 }, effect: 'good' }
    ] },
    kanameBold: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '와아, 담력 좋다. 그런 사람일수록 안쪽이 어떻게 생겼는지 궁금해지는데요?', next: 'haKanameReact' },
    kanameHide: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '잘했어. 쟤 웃고 있어도 절대 등 돌리지 마. 특히 “궁금하다”는 말 나오면 바로 피해.', next: 'kanameHideClose' },
    kanameHideClose: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '에이, 하운진 씨 너무해요. 전 그냥 신입분이 오래 버티는지 궁금했을 뿐인데.', next: 'haKanameSafe' },
    haKanameSafe: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '그 “궁금”이 제일 문제라고. 신입, 방금처럼 거리 유지해. 그게 생존률 오른다.', next: 'kanameSecondChoice' },
    kanameSaw: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '에헤헤. 궁금해요? 보여드릴까요? 뼈 모양 이쁘게 남는 쪽으로요.', next: 'haKanameReact' },
    haKanameReact: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '요미야, 그만. 그리고 신입, 너도 이상한 쪽으로 호기심 보이지 마. 여기 그런 애들 이미 충분히 많아.', next: 'kanamePush' },
    kanamePush: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '그런 애들이라니요. 하운진 씨도 전투 들어가면 꽤 무섭게 웃잖아요?', next: 'haKanameFluster' },
    haKanameFluster: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '웃은 적 없거든?! 신입, 방금 말은 못 들은 걸로 해.', next: 'kanameSecondChoice' },
    kanameCallEun: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.eun, guestName: '은해성', speaker: '은해성', text: '카나메 씨, 신입분은 아직 입문 중이에요. 놀라게 하는 건 조금만 줄여주실래요?', next: 'kanameEunReply' },
    kanameEunReply: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '네에. 은 선생님이 그렇게 말씀하시면 오늘은 안 자를게요. 대신 나중에 또 놀러 와요?', next: 'haKanameEunClose', entryEffect: 'slash' },
    haKanameEunClose: { bg: scenes.classroom, loc: 'A반 교실', face: ha.shy, guest: cast.eun, guestName: '은해성', speaker: '하운진', text: '...잘했어. 위험하다 싶으면 바로 어른 부르는 것도 실력이야. 은 선생님은 그나마 말이 통하니까.', next: 'kanameSecondChoice' },
    kanameSecondChoice: { bg: scenes.classroom, loc: 'A반 교실', face: ha.normal, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: 'A반 체험은 여기서 끊어도 되고, 하나만 더 물어봐도 돼. 대신 이상한 질문이면 내가 끊는다.', choices: [
      { label: '카나메에게 입학 팁을 묻는다', next: 'kanameTip', impact: { aclass: 1, risk: 1 }, effect: 'soft' },
      { label: '하운진이 진짜 무섭게 웃냐고 묻는다', next: 'kanameHaSmile', impact: { trust: 1, aclass: 1 }, effect: 'good' },
      { label: '조용히 훈련소로 이동한다', next: 'yoonIntro', impact: { stability: 1, bclass: 1 }, effect: 'good' }
    ] },
    kanameTip: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '입학 팁이요? 하운진 씨가 화낼 때 바로 사과하면 살 확률이 올라가요. 그리고 제 전기톱 소리는 멀리서 들을수록 좋아요.', next: 'haKanameTip' },
    haKanameTip: { bg: scenes.classroom, loc: 'A반 교실', face: ha.angry, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '앞부분만 맞고 뒷부분은 버려. 신입, 네가 지금 배운 건 거리 조절이야. 기억해.', next: 'ending' },
    kanameHaSmile: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '요미야 카나메', text: '진짜요. 적이 날아갈 때 아주 잠깐 웃어요. 그때는 좀 멋있어서 짜증 나요.', next: 'haKanameSmile' },
    haKanameSmile: { bg: scenes.classroom, loc: 'A반 교실', face: ha.embarrassed, guest: cast.kaname, guestName: '요미야 카나메', speaker: '하운진', text: '멋있다는 말로 이상한 소리 포장하지 마. 신입, 너도 고개 끄덕이지 말고.', next: 'ending' },
    yoonIntro: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '훈련부터 보겠다고? 좋다 아이가. 몸으로 부딪히는 아들은 오래 살아남는다. 근데 신입아, 너무 빡빡하게 굴진 마라. 밤엔 좀 풀 줄도 알아야지, 좋아♪', next: 'yoonChoice' },
    yoonChoice: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '윤호랑 선배. 입문 안내 중에 그런 식으로 들이대지 마세요. 신입, 저 사람한테 뭐라고 할래?', choices: [
      { label: '훈련만 부탁한다고 선 긋는다', next: 'yoonLine', impact: { stability: 1, bclass: 1 }, effect: 'good' },
      { label: '부산 사투리를 따라 해본다', next: 'yoonDialect', impact: { bclass: 2, risk: 1 }, effect: 'soft' },
      { label: '밤엔 좀 풀 줄 알아야죠 하고 받아준다', next: 'yoonFlirtAgree', impact: { bclass: 2, risk: 1 }, effect: 'soft' },
      { label: '하운진에게 대신 말해달라고 한다', next: 'yoonHa', impact: { trust: 1, stability: 1 }, effect: 'good' }
    ] },
    yoonLine: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '오, 선 긋는 거 보소. 좋다. 훈련은 진짜로 봐줄게. 대신 쓰러지면 내가 업고 간다, 좋아♪', next: 'haYoonReact' },
    yoonDialect: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '억양 와 그라노? 귀엽긴 한데, 부산 사람 앞에서 그라면 혼난다 아이가.', next: 'yoonDialectHa' },
    yoonDialectHa: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '따라 하지 마. 왜 첫날부터 이상한 것만 배우고 있어?', next: 'yoonDialectClose' },
    yoonDialectClose: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '와, 하운진이 질색하는 거 보니 제대로 배웠네. 신입아, 다음엔 억양부터 살려보자.', next: 'yoonSecondChoice' },
    yoonFlirtAgree: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '오, 받아치는 거 보소. 좋다 아이가. 훈련 끝나고 살아 있으면 내가 서울에서 제일 덜 맛없는 배급식 알려줄게.', next: 'haYoonFlirtReact' },
    haYoonFlirtReact: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '입문 안내를 왜 데이트 코스 소개로 바꾸는 건데요? 그리고 신입, 너도 거기 장단 맞추지 마.', next: 'yoonFlirtPush' },
    yoonFlirtPush: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '질투하나? 표정이 딱 그런데.', next: 'haYoonFlirtEnd' },
    haYoonFlirtEnd: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '아니거든요. 신입, 웃지 마. 오늘 훈련 강도 올릴 거야. 둘 다.', next: 'yoonSecondChoice' },
    yoonHa: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '나한테 떠넘기지 마. ...그래도 윤호랑 선배, 신입 겁먹었잖아요. 적당히 하세요.', next: 'yoonHaClose' },
    yoonHaClose: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '알았다 알았다. 하운진이 이렇게 감싸면 내가 더 건드리고 싶어지는 거 알제?', next: 'haYoonProtect' },
    haYoonProtect: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '감싼 거 아니거든요. 그냥 입문 첫날부터 이상한 사람한테 말리는 걸 막은 거예요.', next: 'yoonSecondChoice' },
    haYoonReact: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '저 사람 말은 반만 들어. 실력은 진짜니까 거기까지만 믿고, 나머지는 전부 흘려.', next: 'yoonReactClose' },
    yoonReactClose: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '반만 믿으라니 섭섭하네. 그래도 신입아, 훈련하다 쓰러지면 진짜 업어준다. 그건 믿어도 된다.', next: 'yoonSecondChoice' },
    yoonSecondChoice: { bg: scenes.training, loc: '훈련소', face: ha.normal, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '자, 말만 들으면 재미없제. 신입아, 훈련소 왔으면 하나는 해보고 가야지. 뭐 할래?', choices: [
      { label: '가볍게 대련을 부탁한다', next: 'yoonSpar', impact: { bclass: 2, risk: 1, stability: 1 }, effect: 'impact' },
      { label: '하운진이 얼마나 강한지 묻는다', next: 'yoonAskHaPower', impact: { trust: 1, aclass: 1 }, effect: 'good' },
      { label: '카나메보다 안전하냐고 묻는다', next: 'yoonKanameCompare', impact: { bclass: 1, risk: 1 }, effect: 'soft' }
    ] },
    yoonSpar: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '좋다 아이가. 딱 한 번만 받아준다. 대신 날아가도 울지 마라?', next: 'haYoonSparWarn', entryEffect: 'impact' },
    haYoonSparWarn: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '가볍게라는 말 믿지 마. 윤호랑 선배 기준 가볍게는 보통 벽에 한 번 박는 정도야.', next: 'yoonSparHit' },
    yoonSparHit: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '오, 안 넘어졌네? 신입아, 자세는 엉망인데 근성은 좀 있다. 하운진, 얘 봐라?', next: 'haYoonSparClose', entryEffect: 'impact' },
    haYoonSparClose: { bg: scenes.training, loc: '훈련소', face: ha.shy, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '...넘어지지 않은 건 잘했어. 근데 방금 걸로 자신감 붙으면 바로 다친다. 오늘은 여기까지.', next: 'ending' },
    yoonAskHaPower: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '하운진? 쟤 빡치면 진짜 무섭다. 평소엔 틱틱대는데, 막상 싸움 나면 앞에 서는 타입이라 더 골치 아프제.', next: 'haYoonPower' },
    haYoonPower: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '그런 설명 하지 마세요. 신입, 나 평가하지 말고 네 자세나 신경 써.', next: 'ending' },
    yoonKanameCompare: { bg: scenes.training, loc: '훈련소', face: ha.embarrassed, guest: cast.yoon, guestName: '윤호랑', speaker: '윤호랑', text: '카나메랑 비교하면 내가 천사지. 뭐, 내 방식도 좀 과격하긴 한데 적어도 웃으면서 자르진 않잖아?', next: 'haYoonKanameCompare' },
    haYoonKanameCompare: { bg: scenes.training, loc: '훈련소', face: ha.angry, guest: cast.yoon, guestName: '윤호랑', speaker: '하운진', text: '비교 기준이 이상하잖아요. 신입, 한이대에서는 “덜 위험함”을 “안전함”으로 착각하면 안 돼.', next: 'ending' },
    baekgolrimWarn: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, speaker: '하운진', text: '야, 미쳤어? 거긴 입문 코스가 아니라 사망 코스야. 지도에서 봤다고 실제로 갈 생각 하지 마.', next: 'baekgolrimChoice' },
    baekgolrimChoice: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '외곽? 신입이 첫날부터 자살 관광 코스를 고르네. 이유나 들어보자.', choices: [
      { label: '위험 구역부터 알고 싶다고 한다', next: 'baekgolrimSerious', impact: { risk: 1, stability: 1 }, effect: 'soft' },
      { label: '실수로 눌렀다고 한다', next: 'baekgolrimMistake', impact: { stability: 1 }, effect: 'good' },
      { label: '카데바가 궁금하다고 한다', next: 'baekgolrimCadeba', impact: { risk: 3, stability: -1 }, effect: 'danger' }
    ] },
    baekgolrimSerious: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '방향은 틀렸지만 태도는 낫네. 위험 구역은 현장 가서 배우는 게 아니라 살아 돌아온 기록으로 배우는 거다.', next: 'baekgolrimBrief' },
    baekgolrimBrief: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '백골림은 카데바를 신처럼 모시지만, 카데바는 그 사람들한테 관심도 없어. 그 불균형이 제일 무서운 거야.', next: 'baekgolrimBriefChoice', entryEffect: 'cadeba' },
    baekgolrimBriefChoice: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '위험 구역 브리핑은 딱 하나만 더 한다. 뭘 기억할래?', choices: [
      { label: '카데바 숭배자를 피하는 법', next: 'baekgolrimCult', impact: { stability: 1, trust: 1 }, effect: 'soft' },
      { label: '외곽에서 살아 돌아오는 법', next: 'baekgolrimSurvive', impact: { bclass: 1, stability: 1 }, effect: 'good' },
      { label: '카데바가 왜 신 취급받는지', next: 'baekgolrimCadebaDeep', impact: { risk: 2, stability: -1 }, effect: 'cadeba' }
    ] },
    baekgolrimCult: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.normal, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '말 섞지 마. 눈 마주치지 마. “살아있는 신” 같은 소리 나오면 설득하지 말고 빠져. 미친 믿음은 논리로 안 꺾인다.', next: 'ending' },
    baekgolrimSurvive: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '혼자 움직이지 말기. 빛나는 거 만지지 말기. 누가 친절하게 부르면 반대로 뛰기. 유치해 보여도 이게 생존 매뉴얼이야.', next: 'ending' },
    baekgolrimCadebaDeep: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '그 질문을 오래 붙잡으면 머리부터 망가진다. 카데바는 이유를 알려주는 존재가 아니라, 이유를 무의미하게 만드는 쪽이야.', next: 'haBaekgolrimDeep', entryEffect: 'cadeba' },
    haBaekgolrimDeep: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '여기서 끝. 더 들으면 입문이 아니라 오염이야. 돌아간다.', next: 'ending' },
    baekgolrimMistake: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.embarrassed, speaker: '하운진', text: '...그럴 줄 알았어. 첫날부터 외곽 누르는 신입이 정상일 리가 없지. 돌아가자.', next: 'ending' },
    baekgolrimCadeba: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '카데바가 궁금하면 관제 영상이나 봐. 실제로 보면 궁금증보다 유언이 먼저 나온다.', next: 'cadebaWarningHa', entryEffect: 'cadeba' },
    cadebaWarningHa: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '...잠깐. 지금 화면 노이즈 이상해. 신입, 뒤돌아보지 말고 내 말만 들어. 셋 세면 돌아간다.', next: 'cadebaChoice', entryEffect: 'glitch' },
    cadebaChoice: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.embarrassed, guest: cast.seo, guestName: '서재윤', speaker: '하운진', text: '하나, 둘. 마지막으로 선택해. 진짜 마지막이야.', choices: [
      { label: '바로 돌아간다', next: 'cadebaRetreat', impact: { stability: 2, trust: 1 }, effect: 'good' },
      { label: '한 번만 더 본다', next: 'cadebaLook', impact: { risk: 3, stability: -2 }, effect: 'cadeba' }
    ] },
    cadebaRetreat: { bg: scenes.campus, loc: '한이대 캠퍼스', face: ha.shy, speaker: '하운진', text: '잘했어. 궁금한 걸 참고 돌아서는 것도 능력이야. ...진짜로, 방금은 잘했어.', next: 'ending', entryEffect: 'good' },
    cadebaLook: { bg: scenes.baekgolrim, loc: '백골림 권역', face: ha.angry, guest: cast.seo, guestName: '서재윤', speaker: '서재윤', text: '씨발, 눈 감아. 하운진, 끌고 나가. 이 신입은 오늘부로 외곽 출입 금지다.', next: 'ending', entryEffect: 'cadeba' },
    ending: { bg: scenes.campus, loc: '한이대 캠퍼스', face: ha.shy, speaker: '하운진', text: '...그래도 여기까지 들었으면 됐어. 살아남고 싶으면 혼자 잘난 척하지 마. 내 뒤에 서. 방해만 하지 말고.' }
  };

  let index = 'start';
  const history = [];
  let vnAudioContext;
  let stats = { trust: 1, risk: 0, stability: 1, aclass: 0, bclass: 0 };
  const vnEffectClasses = ['vn-effect--soft', 'vn-effect--good', 'vn-effect--danger', 'vn-effect--signal', 'vn-effect--glitch', 'vn-effect--bloom', 'vn-effect--slash', 'vn-effect--impact', 'vn-effect--cadeba', 'vn-effect--alarm'];
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
      const makeTone = (freq, type, peak, duration, endFreq = freq * 0.58) => {
        const osc = vnAudioContext.createOscillator();
        const gain = vnAudioContext.createGain();
        const filter = vnAudioContext.createBiquadFilter();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration * 0.78);
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.15, now);
        filter.Q.setValueAtTime(7, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(vnAudioContext.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
      };

      const makeNoise = (peak = 0.18, duration = 0.18) => {
        const bufferSize = Math.max(1, Math.floor(vnAudioContext.sampleRate * duration));
        const buffer = vnAudioContext.createBuffer(1, bufferSize, vnAudioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const src = vnAudioContext.createBufferSource();
        const gain = vnAudioContext.createGain();
        const filter = vnAudioContext.createBiquadFilter();
        src.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1300, now);
        filter.frequency.exponentialRampToValueAtTime(420, now + duration);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(vnAudioContext.destination);
        src.start(now);
        src.stop(now + duration + 0.02);
      };

      if(tone === 'danger') {
        makeNoise(0.24, 0.2);
        makeTone(520, 'sawtooth', 0.18, 0.16, 170);
        return;
      }
      if(tone === 'alarm') {
        makeNoise(0.26, 0.22);
        makeTone(740, 'sawtooth', 0.16, 0.14, 520);
        setTimeout(() => makeTone(960, 'square', 0.14, 0.13, 620), 115);
        return;
      }
      if(tone === 'glitch' || tone === 'signal') {
        makeNoise(0.16, 0.12);
        makeTone(1180, 'square', 0.13, 0.08, 420);
        setTimeout(() => makeTone(760, 'square', 0.1, 0.07, 980), 42);
        return;
      }
      if(tone === 'bloom') {
        makeTone(440, 'sine', 0.14, 0.18, 660);
        setTimeout(() => makeTone(880, 'triangle', 0.1, 0.16, 1320), 70);
        return;
      }
      if(tone === 'slash') {
        makeNoise(0.2, 0.11);
        makeTone(1320, 'sawtooth', 0.11, 0.08, 220);
        return;
      }
      if(tone === 'impact') {
        makeNoise(0.28, 0.16);
        makeTone(180, 'square', 0.18, 0.14, 90);
        return;
      }
      if(tone === 'cadeba') {
        makeNoise(0.26, 0.24);
        makeTone(96, 'sawtooth', 0.18, 0.26, 52);
        setTimeout(() => makeTone(520, 'sine', 0.08, 0.2, 300), 80);
        return;
      }
      if(tone === 'good') {
        makeTone(720, 'triangle', 0.18, 0.11, 960);
        setTimeout(() => makeTone(980, 'triangle', 0.13, 0.09, 1220), 45);
        return;
      }
      if(tone === 'choice') {
        makeTone(900, 'square', 0.2, 0.11);
        return;
      }
      makeTone(620, 'square', 0.18, 0.1);
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
    root.classList.remove(...vnEffectClasses);
    void root.offsetWidth;
    root.classList.add(`vn-effect--${effect}`);
    setTimeout(() => root.classList.remove(`vn-effect--${effect}`), 680);
  }

  function getEndingResult() {
    if(stats.risk >= 5) {
      return {
        title: '배정 결과 05 — 격리 관찰 대상',
        desc: '관제실 경고, 외곽 로그, 카데바 관련 반응이 너무 많이 찍힘. 호기심이 아니라 오염 가능성으로 분류된다.',
        assign: '처분: 외곽 출입 금지 / 관제실 상시 모니터링'
      };
    }
    if(stats.bclass >= 4) {
      return {
        title: '배정 결과 03 — B반 합동 훈련 후보',
        desc: '서재윤과 윤호랑 쪽 관심을 탔다. 장점은 단기간에 강해질 수도 있다는 것, 단점은 그 전에 바닥과 친해진다는 것.',
        assign: '처분: B반 합동 훈련 / 서재윤 감독'
      };
    }
    if(stats.trust >= 4 && stats.stability >= 3) {
      return {
        title: '배정 결과 01 — A반 임시 배정',
        desc: '보고 태도와 성흔 안정도가 괜찮게 찍힘. 하운진이 욕하면서도 데리고 다닐 만한 신입 판정.',
        assign: '처분: A반 임시 배정 / 하운진 동행'
      };
    }
    if(stats.aclass >= 3) {
      return {
        title: '배정 결과 02 — A반 보호 관찰',
        desc: 'A반 쪽 접점이 강하게 찍힘. 카나메 관련 호기심이 있으면 교육이 아니라 생존 경고부터 들어간다.',
        assign: '처분: A반 보호 관찰 / 은해성 정기 검진'
      };
    }
    return {
      title: '배정 결과 00 — 관제실 감시 대상',
      desc: '아직 어느 반으로 보내기 애매함. 플렉서스 기록에는 남았고, 한이대 기준으로는 더 굴려보고 판단하는 케이스.',
      assign: '처분: 배정 보류 / 신입 로그 재검토'
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
        <div class="hero-vn__report-kicker">한이대 신입 배정 시뮬 결과글</div>
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
    root.dataset.alert = scene.alert || 'none';
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
          playVnClick(choice.effect || 'choice');
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
    if(scene.entryEffect) flashStage(scene.entryEffect);
    prev.disabled = history.length === 0 && index === 'start';
    updateStats();
    root.classList.remove('is-advancing');
    void root.offsetWidth;
    root.classList.add('is-advancing');
  }

  function advanceScene() {
    const scene = script[index];
    if(scene.choices) return;
    const nextIndex = scene.next ?? 'start';
    const nextScene = script[nextIndex];
    playVnClick(nextScene?.entryEffect || 'soft');
    history.push(snapshot());
    index = nextIndex;
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
