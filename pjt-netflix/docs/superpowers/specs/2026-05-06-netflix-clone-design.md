# Netflix Clone — Design Spec
Date: 2026-05-06

## Overview
현재 상영 중인 영화를 넷플릭스 스타일로 보여주는 단일 HTML 파일 웹페이지.  
TMDB API에서 `now_playing` 데이터를 가져와 포스터, 제목, 평점을 표시한다.

---

## 파일 구조
```
pjt-netflix/
└── index.html   (CSS + JS 모두 포함)
```

---

## 화면 구성

### 1. Navbar (고정 상단바)
- `position: fixed`, 스크롤해도 항상 상단 고정
- 좌측: `NOONA FLIX` 로고 (넷플릭스 빨간색 #E50914)
- 우측: 검색창 — 입력 시 영화 제목을 실시간 필터링
- 배경: 투명 → 스크롤 시 반투명 검정(backdrop-filter blur)

### 2. Hero Banner
- 첫 번째 영화의 `backdrop_path` 이미지를 풀스크린 배경으로 사용
- 이미지 위에 좌→우 검정 그라디언트 오버레이
- 좌측 하단에 영화 제목(대형), 평점(별표), 간단 설명(overview 최대 150자) 표시
- 높이: `100vh`

### 3. 가로 스크롤 영화 행
- 섹션 타이틀: "🎬 현재 상영 중"
- 포스터 카드들이 `display: flex`로 가로 나열
- 좌/우 화살표 버튼으로 스크롤 제어 (`scrollLeft` 조작)
- 스크롤바 숨김 (`scrollbar-width: none`)

### 4. 포스터 카드 호버 효과
- 기본: 포스터 이미지만 표시 (w:160px, h:240px)
- 호버 시:
  - `transform: scale(1.3)`, `z-index` 상승
  - 카드 하단에 영화 제목, ⭐ 평점, 📅 개봉일 표시
  - 부드러운 `transition: 0.3s ease`

---

## 데이터 흐름

```
페이지 로드
  → fetch TMDB API (now_playing)
  → JSON 파싱 → movies 배열
  → Hero Banner에 movies[0] 렌더링
  → 포스터 행에 전체 movies 렌더링
  → 검색창 입력 이벤트 → movies 필터링 → 행 재렌더링
```

---

## API

- **Endpoint:** `https://api.themoviedb.org/3/movie/now_playing`
- **Params:** `api_key`, `language=ko-KR`, `page=1`
- **이미지 베이스 URL:** `https://image.tmdb.org/t/p/`
  - 포스터: `w342` + `poster_path`
  - 히어로 배경: `original` + `backdrop_path`

---

## 스타일 기조

| 항목 | 값 |
|------|-----|
| 배경색 | `#141414` (넷플릭스 다크) |
| 로고색 | `#E50914` |
| 텍스트 | `#ffffff` |
| 폰트 | `'Noto Sans KR'` (Google Fonts) |
| 카드 반경 | `4px` |

---

## 에러 처리

- API 실패 시: 화면에 "영화 정보를 불러오지 못했습니다." 메시지 표시
- 포스터 이미지 없을 시: 회색 플레이스홀더 표시

---

## 범위 외 (이번 구현에서 제외)

- 백엔드/서버
- 로그인/회원가입
- 장르별 다중 행 (API 추가 호출)
- 동영상 재생
