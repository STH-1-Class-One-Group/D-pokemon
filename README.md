# 🐾 DOKEMON (도케몬)
> **탐색과 도전이 함께하는 나만의 포켓몬 도감 & 퀴즈 플랫폼**

💡 프로젝트 소개
**DOKEMON**은 어릴 적 즐겨보던 포켓몬스터의 향수를 현대적이고 세련된 웹 UI로 재해석한 프로젝트입니다. 
단순히 포켓몬의 정보를 나열하는 것을 넘어, **Glassmorphism(유리 질감)**과 **다크 테마**를 적용하여 깊이 있는 몰입감을 제공합니다. 포켓몬의 상세 정보를 탐색하고, 실루엣 퀴즈를 통해 나의 포켓몬 지식을 테스트해보세요!
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/9dbc24fa-053e-4055-9324-ede2907b9420" />
<br/>

## 🔗 배포 링크
👉 **[DOKEMON 플레이하러 가기](https://d-pokemon.pages.dev)**

<br/>

## ✨ 주요 기능 (Key Features)

### 1. 포켓몬 도감 (Pokedex)
* **3D Flip Card UI**: 마우스를 올리면 부드럽게 뒤집히는 3D 카드 애니메이션 적용.
* **반응형 그리드**: PC, 태블릿, 모바일 기기에 맞춰 최적화된 화면 레이아웃 제공.
* **상세 정보 모달 (Modal)**: 카드를 클릭하면 포켓몬의 타입, 특성, 기술 목록 등 상세 데이터를 한눈에 확인할 수 있는 팝업 제공.
* **검색 기능**: 원하는 포켓몬을 이름으로 빠르게 찾을 수 있는 직관적인 검색창 지원.

### 2. 포켓몬 능력 고사 (Quiz)
* **실루엣 퀴즈**: 포켓몬의 실루엣만 보고 어떤 포켓몬인지 맞추는 미니 게임 기능.
* **직관적인 피드백**: 정답/오답에 따른 즉각적인 시각적 피드백 제공.

### 3. UI/UX 디자인 (Design)
* **다크 & 심해 테마**: 전체적으로 어둡고 신비로운 블루/네이비 계열의 배경을 사용하여 고급스러운 느낌 연출.
* **Glassmorphism (유리 질감)**: 투명도와 블러(Blur) 효과를 적절히 배합하여 백그라운드 이미지가 은은하게 비치는 세련된 컴포넌트 디자인.

<br/>

## 🛠 기술 스택 (Tech Stack)
* **Frontend**: React, TypeScript, React Router
* **Styling**: Vanilla CSS (CSS Grid, Flexbox, Glassmorphism, CSS 3D Animations)
* **API**: PokeAPI (포켓몬 데이터 연동)
* **Deployment**: Cloudflare Pages (배포 환경)

<br/>

## 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하는 방법입니다.

```bash
# 1. 저장소 클론
$ git clone [https://github.com/STH-1-Class-One-Group/d-pokemon.git](https://github.com/STH-1-Class-One-Group/d-pokemon.git)

# 2. 프로젝트 폴더로 이동
$ cd d-pokemon

# 3. 패키지 설치
$ npm install

# 4. 개발 서버 실행
$ npm run dev
