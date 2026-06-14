# 기능 설명서

박예찬 KW Internet Final Project는 기본 포트폴리오 페이지에 6개의 JavaScript 실습과 추가 기능을 결합한 웹 프로젝트입니다.

배포 주소: https://devchanpark.github.io/KW-InterneT/

## 핵심 페이지

| 페이지 | 파일 | 주요 기능 |
| --- | --- | --- |
| Home | `index.html` | 프로젝트 소개, 타이핑 애니메이션, 주요 기능 카드 |
| About | `about.html` | 자기소개, 학습 방향, 제작 흐름 타임라인 |
| Portfolio | `portfolio.html` | 프로젝트 카드 목록, 카테고리 필터 |
| Dashboard | `dashboard.html` | 실습 진행률, 즐겨찾기, 최근 방문, 체크리스트, 퀴즈, 메모 |
| Search | `search.html` | 사이트 전체 기능 검색, 키워드 칩 |
| Pitch | `presentation.html` | 발표용 슬라이드, 이전/다음 버튼, 방향키 조작 |
| Contact | `contact.html` | 폼 검증, 글자 수 표시, 초안 저장 |
| 404 | `404.html` | 없는 주소 접근 시 안내 페이지 |

## 실습 기능

### 실습 1. D-Day Keeper

- 파일: `dday.html`
- 사용 개념: `Date` 객체, 날짜 차이 계산, 배열 데이터 저장
- 기능:
  - 일정 이름과 목표 날짜 입력
  - D-Day, D+Day 자동 계산
  - +7일, +30일, +100일 빠른 날짜 선택
  - 여러 일정을 `localStorage`에 저장
  - 저장된 일정 개별 삭제 및 전체 삭제

### 실습 2. Random Picker

- 파일: `random.html`
- 사용 개념: `String`, `Array`, `Math.random()`
- 기능:
  - 콤마 또는 줄바꿈으로 항목 입력
  - 항목 배열 변환 후 무작위 선택
  - 최근 뽑기 결과 기록
  - 입력값과 결과 기록을 브라우저에 저장

### 실습 3. DOM 스타일 변환기

- 파일: `dom_style.html`
- 사용 개념: DOM 객체, `getElementById`, `style` 프로퍼티
- 기능:
  - 글자색 변경
  - 글자 크기 변경
  - 배경색 강조
  - 숨기기/보이기
  - 기본 스타일 초기화

### 실습 4. 댓글 추가/삭제

- 파일: `dom_list.html`
- 사용 개념: `createElement`, `appendChild`, `removeChild`
- 기능:
  - 입력창으로 댓글 추가
  - `prompt()`로 댓글 추가
  - 댓글 클릭 시 해당 댓글 삭제
  - 댓글 목록 전체 삭제
  - 댓글 데이터를 `localStorage`에 저장

### 실습 5. 스마트 피자 주문서

- 파일: `event_order.html`
- 사용 개념: form 이벤트, checkbox, number input, submit 제어
- 기능:
  - 피자 메뉴 선택
  - 수량 변경 시 총액 자동 계산
  - 주소 미입력 시 주문 방지
  - 주문 완료 시 영수증 표시
  - 선택 메뉴와 총액을 실시간으로 확인

### 실습 6. 키보드 자동차

- 파일: `event_car.html`
- 사용 개념: `keydown` 이벤트, 좌표 계산, 화면 경계 체크
- 기능:
  - 방향키로 자동차 이동
  - 화면 버튼으로 자동차 이동
  - 느리게/빠르게 속도 조절
  - 이동 영역 밖으로 나가지 않게 제한
  - 위치와 이동 거리 상태 표시

## 추가 기능

### 다크 모드

- 모든 페이지에서 테마 버튼으로 밝은/어두운 모드 전환
- 선택한 테마를 `localStorage`에 저장
- 다시 접속해도 이전 테마 유지

### 스크롤 진행률

- 화면 상단에 현재 스크롤 위치를 진행 바 형태로 표시
- 긴 페이지를 볼 때 현재 위치를 쉽게 파악 가능

### 프로젝트 필터

- `portfolio.html`에서 전체, 실습, DOM, Event, 추가 기능으로 카드 필터링
- 각 프로젝트 카드에 태그를 두고 JavaScript로 표시 여부를 전환

### Final Project Dashboard

- 파일: `dashboard.html`
- 기능:
  - 실습 6개의 완료율 원형 그래프 표시
  - 실습별 완료 체크 저장
  - 즐겨찾기 실습 저장
  - 최근 방문 페이지 자동 기록
  - 제출 체크리스트 저장
  - JavaScript 개념 자기평가 퀴즈
  - 프로젝트 메모 자동 저장
  - 대시보드 데이터 JSON 파일 내보내기
  - 빠른 검색 기능

### 사이트 검색

- 파일: `search.html`
- 기능:
  - 전체 페이지와 실습을 키워드로 검색
  - DOM, 이벤트, 저장, 발표 키워드 버튼 제공
  - 검색 결과에서 해당 페이지로 바로 이동

### 발표 모드

- 파일: `presentation.html`
- 기능:
  - 프로젝트 설명을 슬라이드 형식으로 제공
  - 이전/다음 버튼으로 이동
  - 키보드 좌우 방향키로 슬라이드 이동
  - 마지막으로 본 슬라이드 위치 저장

### 커스텀 404 페이지

- 파일: `404.html`
- 기능:
  - 없는 주소로 들어왔을 때 기본 GitHub 404 대신 프로젝트 스타일 안내 화면 표시
  - Home, Search, Dashboard로 이동 버튼 제공

### 실습 이전/다음 이동

- 각 실습 페이지 하단에 이전 실습, Dashboard, 다음 실습 링크 자동 표시
- 실습 페이지를 순서대로 탐색하기 쉽게 구성

### Contact Draft

- 파일: `contact.html`
- 기능:
  - 이름, 이메일, 메시지 입력 폼
  - 이메일 형식 검사
  - 메시지 글자 수 표시
  - 입력한 초안을 `localStorage`에 자동 저장
  - 초안 삭제 기능

## 사용한 기술

- HTML: 페이지 구조, 폼, 시맨틱 태그
- CSS: 반응형 레이아웃, 카드 UI, 다크 모드, 애니메이션
- JavaScript:
  - DOM 선택과 조작
  - 이벤트 처리
  - 배열, 문자열, 날짜, 수학 객체 활용
  - `localStorage` 저장
  - 동적 HTML 렌더링
  - JSON 데이터 내보내기
- GitHub Pages: 실제 웹 배포

## 시연 순서 추천

1. `index.html`에서 전체 프로젝트 소개 확인
2. `portfolio.html`에서 필터 기능 시연
3. `dday.html`, `random.html`, `dom_list.html`, `event_order.html`, `event_car.html` 중 2~3개 실습 시연
4. `dashboard.html`에서 완료 체크, 즐겨찾기, 메모, 퀴즈, 데이터 내보내기 시연
5. `search.html`에서 `DOM`, `피자`, `발표` 검색 시연
6. `presentation.html`에서 발표 모드 슬라이드 시연
7. 없는 주소로 접속해 404 안내 페이지 확인
