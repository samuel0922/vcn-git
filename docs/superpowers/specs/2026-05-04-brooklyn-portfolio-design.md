1# Brooklyn Portfolio — Hero Page Design Spec

**Date:** 2026-05-04  
**Scope:** 히어로 섹션 단일 페이지 (스크롤 없는 단일 뷰)

---

## 목표

Brooklyn Gilbert 스타일의 포트폴리오 히어로 페이지. 보라색 계열 디자인, 모바일 반응형.

---

## 파일 구조

```
index.html   — 마크업 구조
style.css    — 스타일 (CSS 변수 + Flexbox + 반응형)
main.js      — 인터랙션 (햄버거 메뉴, 카운트업 애니메이션, 헤더 스크롤 효과)
```

---

## 컴포넌트 상세

### Header / Navigation
- 로고: 보라색 원형 배경 "B" 아이콘 + "Brooklyn" 텍스트
- 메뉴 링크: Home, About, Process, Portfolio, Blog, Services
- Contact 버튼: 보라색 아웃라인 버튼, hover 시 fill
- 모바일: 햄버거 아이콘(☰) → 클릭 시 세로 드롭다운 메뉴 토글

### Hero Section (좌/우 2분할)
- **좌측 (텍스트)**
  - 소제목: "Freelance UI Designer & Developer" (보라색, 소문자)
  - 메인 제목: "Hello, I'm **Brooklyn Gilbert**" (굵은 큰 폰트)
  - 설명: 2~3줄 소개 텍스트 (회색)
  - CTA 버튼: "Say Hello!" (보라색 fill, 둥근 pill 스타일)

- **우측 (이미지)**
  - 보라색~연보라 그라디언트 원형 blob 배경
  - picsum.photos 에서 가져온 인물 플레이스홀더 이미지
  - 이미지는 하단이 잘린 portrait 형태

- **하단 통계 (3개, 가로 배치)**
  - 15 Y. — Experience
  - 250+ — Projects Completed
  - 58 — Happy Clients
  - 카운트업 애니메이션: 페이지 로드 시 0에서 목표값까지

### 배경
- 오른쪽 상단에 연보라 원형 그라디언트 장식 (CSS pseudo element)

---

## 색상 / 타이포그래피

| 변수 | 값 |
|---|---|
| `--purple` | `#7C3AED` |
| `--purple-light` | `#EDE9FE` |
| `--purple-gradient` | `linear-gradient(135deg, #7C3AED, #A78BFA)` |
| Font | Google Fonts — Inter |

---

## 반응형 브레이크포인트

| 구간 | 동작 |
|---|---|
| `> 768px` | 2컬럼 (텍스트 좌 / 이미지 우) |
| `≤ 768px` | 1컬럼, 이미지 먼저 → 텍스트 순, 햄버거 메뉴 |

---

## JS 기능

1. **햄버거 메뉴 토글** — 모바일에서 nav 열기/닫기, 바깥 클릭 시 닫기
2. **카운트업 애니메이션** — `requestAnimationFrame` 사용, 1.5초 동안 0 → 목표값
3. **헤더 스크롤 쉐도우** — `window.scroll` 감지, 헤더에 `box-shadow` 추가
