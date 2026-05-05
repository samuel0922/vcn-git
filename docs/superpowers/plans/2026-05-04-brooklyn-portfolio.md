# Brooklyn Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Brooklyn Gilbert 스타일의 포트폴리오 히어로 페이지를 index.html / style.css / main.js 3파일로 구현한다.

**Architecture:** HTML 마크업 → CSS 스타일(변수+Flexbox+반응형) → JS 인터랙션(햄버거메뉴, 카운트업, 스크롤 쉐도우) 순서로 빌드. 각 태스크는 브라우저에서 바로 검증한다.

**Tech Stack:** Vanilla HTML5, CSS3 (CSS Variables, Flexbox), Vanilla JS (requestAnimationFrame), Google Fonts (Inter), picsum.photos (플레이스홀더 이미지)

---

## 파일 맵

| 파일 | 역할 |
|---|---|
| `index.html` | 전체 마크업 구조 (header, nav, hero, stats) |
| `style.css` | 디자인 토큰(변수), 레이아웃, 컴포넌트 스타일, 반응형 |
| `main.js` | 햄버거 메뉴 토글, 카운트업 애니메이션, 헤더 스크롤 쉐도우 |

---

## Task 1: index.html — 전체 마크업

**Files:**
- Modify: `index.html`

- [ ] **Step 1: index.html 전체를 아래 내용으로 교체**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Brooklyn Gilbert — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- ===== HEADER ===== -->
  <header class="header" id="header">
    <div class="container header__inner">

      <a href="#" class="logo">
        <span class="logo__icon">B</span>
        <span class="logo__text">Brooklyn</span>
      </a>

      <nav class="nav" id="nav">
        <ul class="nav__list">
          <li><a href="#" class="nav__link nav__link--active">Home</a></li>
          <li><a href="#" class="nav__link">About</a></li>
          <li><a href="#" class="nav__link">Process</a></li>
          <li><a href="#" class="nav__link">Portfolio</a></li>
          <li><a href="#" class="nav__link">Blog</a></li>
          <li><a href="#" class="nav__link">Services</a></li>
        </ul>
      </nav>

      <a href="#" class="btn btn--outline">Contact</a>

      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </header>

  <!-- ===== HERO ===== -->
  <main>
    <section class="hero">
      <div class="container hero__inner">

        <!-- Left: text -->
        <div class="hero__text">
          <p class="hero__sub">Freelance UI Designer &amp; Developer</p>
          <h1 class="hero__title">Hello, I'm<br /><span>Brooklyn Gilbert</span></h1>
          <p class="hero__desc">
            I'm a Freelance UI/UX Designer and Developer based in London, England.
            I strive to build immersive and beautiful web applications through
            carefully crafted code and user-centric design.
          </p>
          <a href="#" class="btn btn--fill">Say Hello!</a>

          <!-- Stats -->
          <div class="stats">
            <div class="stats__item">
              <span class="stats__number" data-target="15">0</span>
              <span class="stats__suffix"> Y.</span>
              <p class="stats__label">Experience</p>
            </div>
            <div class="stats__divider"></div>
            <div class="stats__item">
              <span class="stats__number" data-target="250">0</span>
              <span class="stats__suffix">+</span>
              <p class="stats__label">Projects Completed</p>
            </div>
            <div class="stats__divider"></div>
            <div class="stats__item">
              <span class="stats__number" data-target="58">0</span>
              <p class="stats__label">Happy Clients</p>
            </div>
          </div>
        </div>

        <!-- Right: image -->
        <div class="hero__image-wrap">
          <div class="hero__blob"></div>
          <img
            src="https://picsum.photos/seed/brooklyn/400/500"
            alt="Brooklyn Gilbert"
            class="hero__img"
          />
        </div>

      </div>
    </section>
  </main>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 브라우저에서 index.html 열어 구조 확인**

스타일 없이 텍스트와 이미지가 세로로 나열되면 정상. 콘솔 에러 없어야 함.

---

## Task 2: style.css — 기본 리셋 + 디자인 토큰 + 헤더

**Files:**
- Modify: `style.css`

- [ ] **Step 1: style.css 전체를 아래 내용으로 교체 (리셋 + 토큰 + 레이아웃 유틸)**

```css
/* ===== TOKENS ===== */
:root {
  --purple: #7c3aed;
  --purple-light: #ede9fe;
  --purple-mid: #a78bfa;
  --purple-gradient: linear-gradient(135deg, #7c3aed, #a78bfa);
  --text-dark: #1a1a2e;
  --text-gray: #6b7280;
  --white: #ffffff;
  --font: 'Inter', sans-serif;
  --header-h: 72px;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--text-dark); background: var(--white); overflow-x: hidden; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
img { display: block; max-width: 100%; }

/* ===== CONTAINER ===== */
.container {
  width: min(1200px, 90%);
  margin-inline: auto;
}

/* ===== BUTTONS ===== */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid var(--purple);
}
.btn--fill {
  background: var(--purple);
  color: var(--white);
}
.btn--fill:hover {
  background: #6d28d9;
  border-color: #6d28d9;
}
.btn--outline {
  background: transparent;
  color: var(--purple);
}
.btn--outline:hover {
  background: var(--purple);
  color: var(--white);
}

/* ===== HEADER ===== */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--white);
  height: var(--header-h);
  transition: box-shadow 0.3s ease;
}
.header.scrolled {
  box-shadow: 0 2px 16px rgba(124, 58, 237, 0.1);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
}

/* ===== LOGO ===== */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.logo__icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--purple-gradient);
  color: var(--white);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 0.9rem;
}

/* ===== NAV ===== */
.nav { margin-left: auto; }
.nav__list {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.nav__link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-gray);
  transition: color 0.2s;
  position: relative;
}
.nav__link:hover,
.nav__link--active {
  color: var(--purple);
}
.nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--purple);
  border-radius: 2px;
}

/* ===== HAMBURGER ===== */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

- [ ] **Step 2: 브라우저 새로고침 — 헤더/네비 확인**

보라색 로고, 가로 메뉴, Contact 아웃라인 버튼이 보이면 정상.

---

## Task 3: style.css — 히어로 섹션 + 이미지 Blob

**Files:**
- Modify: `style.css`

- [ ] **Step 1: style.css 맨 아래에 히어로 스타일 추가**

```css
/* ===== HERO ===== */
.hero {
  min-height: calc(100vh - var(--header-h));
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 오른쪽 상단 배경 장식 */
.hero::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #ede9fe 0%, transparent 70%);
  pointer-events: none;
}

.hero__inner {
  display: flex;
  align-items: center;
  gap: 4rem;
  padding-block: 4rem;
  width: 100%;
}

/* ===== HERO TEXT ===== */
.hero__text {
  flex: 1;
  min-width: 0;
}
.hero__sub {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--purple);
  text-transform: lowercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}
.hero__title {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  color: var(--text-dark);
}
.hero__title span {
  color: var(--purple);
}
.hero__desc {
  font-size: 0.98rem;
  color: var(--text-gray);
  line-height: 1.75;
  max-width: 480px;
  margin-bottom: 2rem;
}

/* ===== STATS ===== */
.stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}
.stats__item {
  display: flex;
  flex-direction: column;
}
.stats__item > *:first-line { display: inline; }
.stats__number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1;
}
.stats__suffix {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1;
}
.stats__label {
  font-size: 0.78rem;
  color: var(--text-gray);
  margin-top: 0.3rem;
  font-weight: 500;
}
.stats__divider {
  width: 1px;
  height: 40px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ===== HERO IMAGE ===== */
.hero__image-wrap {
  position: relative;
  flex-shrink: 0;
  width: clamp(260px, 35vw, 420px);
  display: flex;
  justify-content: center;
}
.hero__blob {
  position: absolute;
  inset: 0;
  border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
  background: var(--purple-gradient);
  opacity: 0.18;
  filter: blur(2px);
  transform: scale(1.1);
}
.hero__img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: clamp(320px, 45vw, 520px);
  object-fit: cover;
  object-position: top;
  border-radius: 50% 50% 0 0 / 40% 40% 0 0;
  filter: drop-shadow(0 8px 32px rgba(124, 58, 237, 0.2));
}
```

- [ ] **Step 2: 브라우저 새로고침 — 히어로 2컬럼 레이아웃 확인**

텍스트 좌측, 이미지 우측이 나란히 보이면 정상. 이미지 위에 보라색 blob 효과 확인.

---

## Task 4: style.css — 반응형 (모바일 768px 이하)

**Files:**
- Modify: `style.css`

- [ ] **Step 1: style.css 맨 아래에 미디어 쿼리 추가**

```css
/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {

  /* 햄버거 표시, 데스크톱 nav 숨김 */
  .hamburger { display: flex; }
  .nav {
    position: absolute;
    top: var(--header-h);
    left: 0;
    right: 0;
    background: var(--white);
    padding: 1rem 5%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    margin-left: 0;
  }
  .nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav__list {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  /* header Contact 버튼 숨김 (nav 안에서 접근) */
  .header__inner > .btn--outline { display: none; }

  /* 히어로: 1컬럼, 이미지 위 */
  .hero__inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
    padding-block: 2.5rem;
  }
  .hero__image-wrap {
    width: min(280px, 70vw);
  }
  .hero__img {
    height: 300px;
  }
  .hero__desc { margin-inline: auto; }
  .stats {
    justify-content: center;
    gap: 1.5rem;
  }
}
```

- [ ] **Step 2: 브라우저 개발자 도구에서 모바일 뷰(375px) 전환 후 확인**

- 햄버거 아이콘(☰)이 우측 상단에 보여야 함
- 이미지가 텍스트 위에 배치되어야 함
- 텍스트가 중앙 정렬되어야 함

---

## Task 5: main.js — 인터랙션 3종

**Files:**
- Modify: `main.js`

- [ ] **Step 1: main.js 전체를 아래 내용으로 교체**

```js
// ===== 햄버거 메뉴 토글 =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  }
});

// ===== 헤더 스크롤 쉐도우 =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== 카운트업 애니메이션 =====
const DURATION = 1500; // ms

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.stats__number');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((el) => observer.observe(el));
```

- [ ] **Step 2: 브라우저에서 최종 검증**

1. 페이지 로드 시 숫자 (0 → 15, 0 → 250, 0 → 58) 카운트업 확인
2. 스크롤 시 헤더에 보라색 쉐도우 생기는지 확인
3. 모바일 뷰에서 햄버거 클릭 → 메뉴 드롭다운 열림/닫힘 확인
4. 메뉴 바깥 클릭 시 자동으로 닫히는지 확인

---

## 완료 체크리스트

- [ ] 데스크톱: 2컬럼 히어로, 네비게이션, 통계 표시
- [ ] 모바일(375px): 1컬럼, 햄버거 메뉴, 이미지가 텍스트 위
- [ ] 카운트업 애니메이션 작동
- [ ] 헤더 스크롤 쉐도우 작동
- [ ] 햄버거 메뉴 열기/닫기/바깥클릭닫기 작동
- [ ] 콘솔 에러 없음
