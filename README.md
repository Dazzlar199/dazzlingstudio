# 🌟 AI CONTENTS STUDIO - Dazzling Studio

> **풀스택 개발자 + AI 전문가 + 아티스트의 조합으로 창의적인 디지털 솔루션을 제공하는 듀얼 포트폴리오**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 🎯 프로젝트 소개

**Dazzling Studio**는 웹 개발과 음향 엔지니어링 두 분야의 전문성을 보여주는 혁신적인 듀얼 포트폴리오 웹사이트입니다. 사용자는 하나의 플랫폼에서 두 가지 완전히 다른 창작 세계를 탐험할 수 있습니다.

### ✨ 핵심 특징

- 🎨 **듀얼 모드**: 웹 개발자와 음향 엔지니어 포트폴리오 분리
- 🤖 **AI 챗봇**: 각 분야별 전문 상담 AI 어시스턴트
- 🎵 **인터랙티브 오디오**: 실시간 음악 재생 및 파형 시각화
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- ⚡ **고성능**: Next.js 15 + Turbopack 기반 초고속 로딩
- 🌙 **다크/라이트 모드**: 사용자 선호에 맞는 테마 전환

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion 12.23
- **Icons**: Lucide React
- **State Management**: React Context API

### Backend & AI
- **API Routes**: Next.js API Routes
- **AI Integration**: OpenAI GPT-4
- **Language Chain**: LangChain 0.3.34
- **Audio Processing**: Web Audio API

### Development & Deployment
- **Build Tool**: Turbopack (Next.js 15 실험적 기능)
- **Deployment**: Vercel
- **Version Control**: Git & GitHub
- **Package Manager**: npm

## 🌍 라이브 데모

🔗 **[https://dazzlingstudio.vercel.app](https://dazzlingstudio.vercel.app)**

### 페이지 구조
- `/main` - 메인 선택 페이지
- `/dev` - 웹 개발 포트폴리오
- `/music` - 음향 엔지니어 포트폴리오

## 🎨 주요 프로젝트 소개

### 웹 개발 포트폴리오
1. **현대 AI 리더십 코칭 플랫폼** - 데이터 기반 개인맞춤 리더십 진단 시스템
2. **9e 엔터테인먼트 공식 웹사이트** - K-POP 그룹 전문 엔터테인먼트 플랫폼
3. **신과의 대화 (Godai)** - Three.js 3D + AI 인식 기반 인터랙티브 게임
4. **뮤직 스트리밍 모바일 앱** - 독립 아티스트를 위한 크로스 플랫폼 앱

### 음향 엔지니어링 서비스
- 🎤 **축가 녹음 서비스** - 전문 스튜디오 웨딩송 제작
- 🎵 **커버 녹음 서비스** - 인기곡 리메이크 및 편곡
- 🤖 **AI 음악 제작** - 인공지능 기반 맞춤형 음악 생성
- 🎛️ **Pro Mixing & Mastering** - 전문가급 후반 작업

## 🚀 로컬 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/Dazzlar199/dazzlingstudio.git
cd dazzlingstudio
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/chat/          # AI 챗봇 API
│   ├── dev/               # 웹 개발 페이지
│   ├── main/              # 메인 선택 페이지
│   └── music/             # 음향 엔지니어 페이지
├── components/
│   ├── audio/             # 오디오 관련 컴포넌트
│   ├── shared/            # 공통 컴포넌트
│   └── webdev/            # 웹 개발 관련 컴포넌트
├── contexts/              # React Context
├── types/                 # TypeScript 타입 정의
└── utils/                 # 유틸리티 함수
```

## 🎯 핵심 기능

### 🤖 AI 상담 챗봇
- 각 분야별 전문 지식 기반 상담
- OpenAI GPT-4 기반 자연어 처리
- 실시간 대화 및 프로젝트 문의

### 🎵 오디오 플레이어
- 실시간 음악 재생 및 일시정지
- 진행 상황 표시 및 제어
- 다중 트랙 관리

### 📱 반응형 인터페이스
- 모바일, 태블릿, 데스크톱 최적화
- 터치 제스처 지원
- 접근성 고려 설계

### ⚡ 성능 최적화
- 이미지 lazy loading
- 코드 스플리팅
- SEO 최적화
- 캐싱 전략

## 🔧 빌드 및 배포

### 빌드
```bash
npm run build
# 또는 프로덕션 빌드 (린트 포함)
npm run build:production
```

### 린트 검사
```bash
npm run lint
```

### 배포
이 프로젝트는 Vercel에 최적화되어 있으며, GitHub과 연동하여 자동 배포됩니다.

## 📞 연락처

- **이메일**: rlackswn2000@naver.com
- **카카오톡**: [상담 채널](http://pf.kakao.com/_gxgbxcn/chat)
- **GitHub**: [@Dazzlar199](https://github.com/Dazzlar199)

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

---

**© 2025 Dazzling Studio. All rights reserved.**

*풀스택 개발자 + AI 전문가 + 아티스트의 조합으로 창의적인 디지털 솔루션을 제공합니다.*