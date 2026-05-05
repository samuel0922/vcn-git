# Netflix Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** TMDB now_playing API를 사용해 현재 상영 중인 영화를 넷플릭스 스타일로 보여주는 단일 index.html 파일을 만든다.

**Architecture:** 모든 HTML/CSS/JS를 하나의 index.html에 작성. JS는 페이지 로드 시 TMDB API를 fetch하고, 받아온 movies 배열로 Hero Banner와 가로 스크롤 포스터 행을 렌더링한다. 검색창 input 이벤트로 제목 필터링 후 행을 재렌더링한다.

**Tech Stack:** HTML5, CSS3 (Flexbox, CSS Variables, transition), Vanilla JavaScript (fetch API), TMDB API v3, Google Fonts (Noto Sans KR)

---

## 파일 구조

```
pjt-netflix/
└── index.html   ← 이번 구현에서 생성하는 유일한 파일
    ├── <head>   Google Fonts, meta, <style>
    ├── <body>   Navbar + Hero + Section
    └── <script> API fetch, 렌더링, 이벤트 핸들러
```

---

### Task 1: HTML 뼈대 + CSS 변수 + 전역 스타일

**Files:**
- Create: `index.html`

- [ ] **Step 1: index.html 생성 — HTML 뼈대 작성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NOONA FLIX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    /* Task 2에서 채운다 */
  </style>
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar" id="navbar">
    <div class="nav-logo">NOONA FLIX</div>
    <input class="nav-search" id="searchInput" type="text" placeholder="영화 검색..." />
  </nav>

  <!-- Hero Banner -->
  <section class="hero" id="hero">
    <div class="hero-overlay"></div>
    <div class="hero-info" id="heroInfo"></div>
  </section>

  <!-- Movie Row -->
  <section class="movie-section">
    <h2 class="section-title">🎬 현재 상영 중</h2>
    <div class="row-wrapper">
      <button class="scroll-btn left" id="scrollLeft">&#8249;</button>
      <div class="movie-row" id="movieRow"></div>
      <button class="scroll-btn right" id="scrollRight">&#8250;</button>
    </div>
  </section>

  <script>
    /* Task 3~7에서 채운다 */
  </script>
</body>
</html>
```

- [ ] **Step 2: 브라우저에서 index.html 열어 뼈대 확인**

파일 탐색기에서 index.html 더블클릭 → 빈 흰 페이지에 "NOONA FLIX" 텍스트와 검색창, "🎬 현재 상영 중" 제목이 보이면 OK.

- [ ] **Step 3: 커밋**

```bash
git add index.html
git commit -m "feat: HTML 뼈대 생성"
```

---

### Task 2: CSS — 전역 스타일, Navbar, Hero Banner

**Files:**
- Modify: `index.html` — `<style>` 블록 채우기

- [ ] **Step 1: `<style>` 블록에 CSS 작성**

`<style>` 태그 안의 주석을 아래 전체 CSS로 교체한다:

```css
:root {
  --bg: #141414;
  --red: #E50914;
  --white: #ffffff;
  --card-w: 160px;
  --card-h: 240px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--white);
  font-family: 'Noto Sans KR', sans-serif;
  overflow-x: hidden;
}

/* ── Navbar ── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 48px;
  transition: background 0.4s;
}

.navbar.scrolled {
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(6px);
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 2px;
  cursor: pointer;
}

.nav-search {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  color: var(--white);
  font-size: 0.9rem;
  padding: 6px 14px;
  width: 220px;
  outline: none;
  transition: border 0.2s;
}

.nav-search::placeholder { color: rgba(255,255,255,0.5); }
.nav-search:focus { border-color: var(--white); }

/* ── Hero Banner ── */
.hero {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: flex-end;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.85) 30%, transparent 100%),
              linear-gradient(to top, rgba(20,20,20,1) 0%, transparent 30%);
}

.hero-info {
  position: relative;
  z-index: 1;
  padding: 0 48px 80px;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 12px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
}

.hero-rating {
  font-size: 1.1rem;
  color: #f5c518;
  margin-bottom: 10px;
}

.hero-overview {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
}

/* ── Movie Section & Row ── */
.movie-section {
  padding: 32px 48px 60px;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 16px;
}

.row-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.movie-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 24px 0;
  scrollbar-width: none;
}

.movie-row::-webkit-scrollbar { display: none; }

/* ── Scroll Buttons ── */
.scroll-btn {
  position: absolute;
  z-index: 10;
  background: rgba(0,0,0,0.7);
  border: none;
  color: var(--white);
  font-size: 2.5rem;
  cursor: pointer;
  padding: 8px 4px;
  height: 100%;
  transition: background 0.2s;
}

.scroll-btn:hover { background: rgba(0,0,0,0.95); }
.scroll-btn.left  { left: -36px; }
.scroll-btn.right { right: -36px; }

/* ── Movie Card ── */
.movie-card {
  position: relative;
  flex-shrink: 0;
  width: var(--card-w);
  height: var(--card-h);
  border-radius: 4px;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0s;
  z-index: 1;
}

.movie-card:hover {
  transform: scale(1.3);
  z-index: 20;
}

.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.card-info {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 70%, transparent);
  padding: 10px 8px 8px;
  border-radius: 0 0 4px 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .card-info { opacity: 1; }

.card-title {
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.card-meta {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.75);
}

/* ── Error Message ── */
.error-msg {
  text-align: center;
  padding: 80px 20px;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.6);
}

/* ── Placeholder (포스터 없을 때) ── */
.poster-placeholder {
  width: 100%;
  height: 100%;
  background: #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  text-align: center;
}
```

- [ ] **Step 2: 브라우저에서 확인**

새로고침 → 배경이 #141414 검정, 상단에 빨간 "NOONA FLIX" 로고와 검색창이 보이면 OK. (아직 영화 데이터 없으므로 Hero는 빈 검정 영역)

- [ ] **Step 3: 커밋**

```bash
git add index.html
git commit -m "feat: 전체 CSS 스타일 추가 (Navbar, Hero, Card, Row)"
```

---

### Task 3: JS — TMDB API fetch

**Files:**
- Modify: `index.html` — `<script>` 블록

- [ ] **Step 1: `<script>` 안에 상수 및 fetchMovies 함수 작성**

`<script>` 태그 안의 주석을 아래 코드로 교체한다:

```js
const API_KEY = '0fc5b4f8dc99f632e69a7e2971d00b5a';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
const IMG_BASE = 'https://image.tmdb.org/t/p/';

let allMovies = [];

async function fetchMovies() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API 오류');
    const data = await res.json();
    allMovies = data.results;
    init(allMovies);
  } catch (err) {
    document.getElementById('movieRow').innerHTML =
      '<p class="error-msg">영화 정보를 불러오지 못했습니다.</p>';
    console.error(err);
  }
}

fetchMovies();
```

- [ ] **Step 2: 브라우저 DevTools Network 탭에서 확인**

새로고침 → DevTools(F12) → Network 탭 → `now_playing` 요청이 200 OK로 뜨면 OK. Console에 에러 없으면 OK.

- [ ] **Step 3: 커밋**

```bash
git add index.html
git commit -m "feat: TMDB API fetch 함수 추가"
```

---

### Task 4: JS — Hero Banner 렌더링

**Files:**
- Modify: `index.html` — `<script>` 블록 (fetchMovies 아래에 추가)

- [ ] **Step 1: renderHero 함수 추가**

`fetchMovies();` 바로 위에 아래 함수들을 삽입한다:

```js
function renderHero(movie) {
  const hero = document.getElementById('hero');
  const heroInfo = document.getElementById('heroInfo');

  if (movie.backdrop_path) {
    hero.style.backgroundImage = `url(${IMG_BASE}original${movie.backdrop_path})`;
  }

  const overview = movie.overview
    ? movie.overview.slice(0, 150) + (movie.overview.length > 150 ? '...' : '')
    : '';

  const stars = '⭐'.repeat(Math.round(movie.vote_average / 2));

  heroInfo.innerHTML = `
    <h1 class="hero-title">${movie.title}</h1>
    <p class="hero-rating">${stars} ${movie.vote_average.toFixed(1)}</p>
    <p class="hero-overview">${overview}</p>
  `;
}
```

- [ ] **Step 2: init 함수 추가 (renderHero 아래)**

```js
function init(movies) {
  if (!movies.length) return;
  renderHero(movies[0]);
  renderMovieRow(movies);
}
```

- [ ] **Step 3: 브라우저에서 확인**

새로고침 → Hero 영역에 영화 배경 이미지, 제목, 별점, 설명이 보이면 OK.

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "feat: Hero Banner 렌더링 추가"
```

---

### Task 5: JS — 포스터 카드 행 렌더링

**Files:**
- Modify: `index.html` — `<script>` 블록 (init 아래에 추가)

- [ ] **Step 1: renderMovieRow 함수 추가**

```js
function renderMovieRow(movies) {
  const row = document.getElementById('movieRow');
  if (!movies.length) {
    row.innerHTML = '<p class="error-msg">검색 결과가 없습니다.</p>';
    return;
  }

  row.innerHTML = movies.map(movie => {
    const posterSrc = movie.poster_path
      ? `${IMG_BASE}w342${movie.poster_path}`
      : null;

    const imgTag = posterSrc
      ? `<img src="${posterSrc}" alt="${movie.title}" loading="lazy" />`
      : `<div class="poster-placeholder">포스터<br>없음</div>`;

    const release = movie.release_date ? movie.release_date.slice(0, 4) : '-';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';

    return `
      <div class="movie-card">
        ${imgTag}
        <div class="card-info">
          <p class="card-title">${movie.title}</p>
          <p class="card-meta">⭐ ${rating} &nbsp; 📅 ${release}</p>
        </div>
      </div>
    `;
  }).join('');
}
```

- [ ] **Step 2: 브라우저에서 확인**

새로고침 → Hero 아래에 포스터 카드들이 가로로 나열되고, 마우스 호버 시 카드가 확대되며 제목/평점/개봉연도가 나타나면 OK.

- [ ] **Step 3: 커밋**

```bash
git add index.html
git commit -m "feat: 포스터 카드 행 렌더링 추가"
```

---

### Task 6: JS — 가로 스크롤 버튼 + Navbar 스크롤 효과

**Files:**
- Modify: `index.html` — `<script>` 블록 (renderMovieRow 아래에 추가)

- [ ] **Step 1: 스크롤 버튼 이벤트 리스너 추가**

```js
document.getElementById('scrollLeft').addEventListener('click', () => {
  document.getElementById('movieRow').scrollLeft -= 500;
});

document.getElementById('scrollRight').addEventListener('click', () => {
  document.getElementById('movieRow').scrollLeft += 500;
});
```

- [ ] **Step 2: Navbar 스크롤 효과 리스너 추가**

```js
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
```

- [ ] **Step 3: 브라우저에서 확인**

- 좌/우 화살표 클릭 시 포스터 행이 부드럽게 스크롤되면 OK.
- 페이지를 아래로 스크롤하면 Navbar 배경이 반투명 검정으로 바뀌면 OK.

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "feat: 스크롤 버튼 및 Navbar 스크롤 효과 추가"
```

---

### Task 7: JS — 검색 필터링

**Files:**
- Modify: `index.html` — `<script>` 블록 (스크롤 리스너 아래에 추가)

- [ ] **Step 1: 검색창 input 이벤트 리스너 추가**

```js
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
  renderMovieRow(filtered);
});
```

- [ ] **Step 2: 브라우저에서 확인**

검색창에 영화 제목 일부를 입력 → 포스터 행이 즉시 필터링되어 해당 영화만 표시되면 OK.  
검색어를 지우면 전체 영화가 다시 표시되면 OK.

- [ ] **Step 3: 커밋**

```bash
git add index.html
git commit -m "feat: 검색 필터링 기능 추가"
```

---

### Task 8: 최종 점검 및 마무리 커밋

- [ ] **Step 1: 전체 기능 체크리스트 확인**

브라우저에서 index.html을 열고 아래 항목을 하나씩 확인한다:

| 항목 | 확인 |
|------|------|
| Navbar가 상단에 고정되는가 | ☐ |
| 스크롤 시 Navbar 배경이 어두워지는가 | ☐ |
| Hero Banner에 배경 이미지가 표시되는가 | ☐ |
| Hero에 제목, 별점, 설명이 표시되는가 | ☐ |
| 포스터 카드가 가로로 나열되는가 | ☐ |
| 호버 시 카드가 확대되고 정보가 보이는가 | ☐ |
| 좌/우 화살표 버튼으로 스크롤되는가 | ☐ |
| 검색창 입력 시 실시간 필터링되는가 | ☐ |
| 포스터 없는 영화에 플레이스홀더가 뜨는가 | ☐ |

- [ ] **Step 2: 최종 커밋**

```bash
git add index.html
git commit -m "feat: Netflix 클론 완성"
```
