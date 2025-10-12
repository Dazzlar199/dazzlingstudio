# 🚀 SEO 및 검색 엔진 노출 가이드

## 1. Google Search Console 등록

### 단계별 가이드:

1. **Google Search Console 접속**
   - 링크: https://search.google.com/search-console
   - Google 계정으로 로그인

2. **속성 추가**
   - "속성 추가" 클릭
   - URL 입력: `https://dazzlingstudio.vercel.app` (또는 커스텀 도메인)

3. **소유권 확인 방법 (추천: HTML 파일)**
   - Google이 제공하는 HTML 파일 다운로드
   - `public/` 폴더에 업로드
   - Git 커밋 및 푸시
   - Google에서 "확인" 클릭

4. **사이트맵 제출**
   - 좌측 메뉴 → Sitemaps
   - 사이트맵 URL 입력: `https://dazzlingstudio.vercel.app/sitemap.xml`
   - "제출" 클릭

5. **URL 검사 및 색인 요청**
   - 상단 검색창에 URL 입력
   - "색인 생성 요청" 클릭
   - 주요 페이지 모두 요청:
     - https://dazzlingstudio.vercel.app/
     - https://dazzlingstudio.vercel.app/main
     - https://dazzlingstudio.vercel.app/dev
     - https://dazzlingstudio.vercel.app/music

---

## 2. 네이버 웹마스터 도구 등록

### 단계별 가이드:

1. **네이버 웹마스터 도구 접속**
   - 링크: https://searchadvisor.naver.com
   - 네이버 계정으로 로그인

2. **사이트 등록**
   - "사이트 추가" 클릭
   - URL 입력: `https://dazzlingstudio.vercel.app`

3. **소유권 확인 방법 (추천: HTML 파일)**
   - 네이버가 제공하는 HTML 파일 다운로드
   - `public/` 폴더에 업로드
   - Git 커밋 및 푸시
   - 네이버에서 "확인" 클릭

4. **사이트맵 제출**
   - 요청 → 사이트맵 제출
   - URL 입력: `https://dazzlingstudio.vercel.app/sitemap.xml`

5. **RSS 제출 (선택)**
   - 블로그나 뉴스가 있을 경우만

---

## 3. 추가 SEO 최적화 작업

### ✅ 이미 완료된 항목:
- ✅ robots.txt 설정
- ✅ sitemap.xml 생성
- ✅ 구조화된 데이터 (JSON-LD) 추가
- ✅ Open Graph 메타 태그
- ✅ Twitter Card 메타 태그
- ✅ 의미있는 페이지 제목 및 설명

### 📋 추가로 할 수 있는 작업:

#### A. OG 이미지 추가
현재 `/og-image.jpg` 파일이 누락되어 있습니다.
- 권장 크기: 1200x630px
- 내용: "Dazzlar Studio - 음악과 기술의 만남" 텍스트 + 로고
- 위치: `public/og-image.jpg`

#### B. Favicon 추가
- 현재 설정: `/favicon.ico`, `/apple-touch-icon.png`
- 다양한 크기 아이콘 추가 권장

#### C. 성능 최적화
- 이미지 최적화 (WebP 포맷 사용)
- Next.js Image 컴포넌트 활용
- 코드 분할 및 레이지 로딩

#### D. 콘텐츠 마케팅
- 블로그 섹션 추가 (SEO에 매우 효과적)
- 프로젝트 상세 페이지 추가
- 정기적인 콘텐츠 업데이트

---

## 4. 검색 노출 확인 방법

### 구글 검색 확인:
```
site:dazzlingstudio.vercel.app
```

### 네이버 검색 확인:
네이버에서 직접 사이트 URL 검색

### 예상 시간:
- Google: 1-3일 (빠르면 몇 시간)
- 네이버: 3-7일

---

## 5. 키워드 전략

### 추천 키워드:
- "음향 녹음 스튜디오"
- "축가 녹음"
- "믹싱 마스터링"
- "Next.js 개발자"
- "풀스택 개발자"
- "웹 개발 포트폴리오"

### 지역 키워드 추가 (주소가 있다면):
- "서울 음향 스튜디오"
- "강남 녹음 스튜디오"

---

## 6. Google Analytics 추가 (선택)

웹사이트 방문자 분석을 위해:

1. Google Analytics 계정 생성
2. 추적 ID 발급
3. Next.js에 Google Analytics 추가:

```bash
npm install @next/third-parties
```

`src/app/layout.tsx`에 추가:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

---

## 7. 소셜 미디어 연동

### 카카오톡 공유 최적화:
- 현재 Open Graph 설정 완료 ✅
- 카카오톡 공유 시 미리보기 잘 나옴

### 인스타그램 프로필 링크:
- 프로필에 웹사이트 URL 추가

### 유튜브 채널:
- 영상 설명란에 웹사이트 링크 추가

---

## 📊 모니터링

### 주기적으로 확인할 것:
1. Google Search Console - 검색 노출 수, 클릭 수
2. Vercel Analytics - 방문자 수, 페이지 로딩 속도
3. 404 에러 페이지 확인
4. 모바일 반응형 테스트

### 도구:
- PageSpeed Insights: https://pagespeed.web.dev
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Rich Results Test: https://search.google.com/test/rich-results

---

## 🎯 다음 단계

1. ✅ Vercel 배포 완료
2. ⏭️ OG 이미지 생성 및 추가
3. ⏭️ Google Search Console 등록
4. ⏭️ 네이버 웹마스터 도구 등록
5. ⏭️ 커스텀 도메인 연결 (선택)
6. ⏭️ Google Analytics 추가 (선택)

---

## 📞 문의사항

SEO 관련 추가 질문이나 도움이 필요하시면 언제든지 문의하세요!
