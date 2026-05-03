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
    { id: 'yoon-horang', name: '윤호랑', aliases: ['B반 학생'], threat: 'caution', stigma: '왼쪽 등 상단', ability: '수인화. 송곳니와 발톱을 포함한 수인 신체 강화.', bloom: '호쇄결박 (목의 쇠사슬로 속박)', desc: 'B반 학생.', height: '189cm', nationality: '대한민국', quote: '이 정도는 끄떡없어, 좋아♪' }
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
  initDossierModal();
  initMobileNav();
  setupSmoothScroll();
  initFactionCards();
  initClickEffects();
  initLiveComments();
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

function initLiveComments() {
  const feed = document.getElementById('live-comment-feed');
  const viewers = document.getElementById('live-viewers');
  if(!feed) return;

  const comments = [
    { user: '마포잔류자', text: '저거 지금 눈 뜬 거 맞지? 제발 아니라고 해줘' },
    { user: '한강북단', text: '한이대 뭐함??? 저걸 왜 보고만 있어' },
    { user: '배급표12장', text: '채팅 느려지는 거 나만 그래? 플렉서스 검열 들어온 듯' },
    { user: '뼈싫어', text: '백골림 애들 또 신탁이라고 난리치겠네' },
    { user: '종로방공호', text: '소리 꺼놨는데도 심장 뛰는 느낌 남' },
    { user: '녹원꺼져', text: '카데바가 저렇게 조용하면 그게 더 무서운 거 아니냐' },
    { user: '익명_404', text: '좌표 뜨면 절대 공유하지 마라. 따라가는 사람 나온다' },
    { user: '성흔없음', text: '저거 사람이야? 아니 그냥 재난 같은데' },
    { user: '관악기숙사', text: '교전 금지 떴다. 한이대도 답 없다는 뜻임' },
    { user: '흑접목격자', text: '서재윤 선생님 출동 안 함? 진짜 큰일 같은데' },
    { user: '백골림탈주', text: '쟤네는 저걸 신이라고 부름. 미친 집단임' },
    { user: '플렉서스신호', text: 'SYSTEM: 해당 영상은 외부 저장이 제한됩니다' },
    { user: '새벽3시17분', text: '방금 프레임 깨진 거 카데바가 카메라 본 거 아님?' },
    { user: '인천폐선로', text: '녹원 쪽도 조용한 게 이상함. 다들 숨죽인 듯' },
    { user: '댓글그만봐', text: '나 이거 왜 계속 보고 있냐...' }
  ];

  let index = 0;
  let viewerCount = 12482;

  function addComment() {
    const item = comments[index % comments.length];
    const row = document.createElement('div');
    row.className = 'live-comment';
    row.innerHTML = `<span class="live-comment__user">${item.user}</span><span class="live-comment__text">${item.text}</span>`;
    feed.appendChild(row);
    while(feed.children.length > 8) feed.removeChild(feed.firstElementChild);
    feed.scrollTop = feed.scrollHeight;
    index++;

    if(viewers) {
      viewerCount += Math.floor(Math.random() * 47) - 13;
      viewerCount = Math.max(11800, viewerCount);
      viewers.textContent = viewerCount.toLocaleString('ko-KR');
    }
  }

  for(let i = 0; i < 5; i++) addComment();
  setInterval(addComment, 1800);
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
