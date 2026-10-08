# Dazzling Studio

회사 사이트(<https://dazzlar.dev>)입니다. Dazzling Studio와, 이 스튜디오가 만드는 K-pop 기획사 운영 플랫폼 **Enter-AX**를 소개합니다. 제품 코드는 별도 저장소(`enter-AX`)에 있습니다.

이전의 녹음 스튜디오·웹 개발 포트폴리오 사이트는 `archive/portfolio-2026-10` 브랜치에 보관되어 있습니다.

## 실행

```bash
npm install
npm run dev
```

배포 전 확인:

```bash
npm run build:production   # lint + build
```

## 구성

- `src/app/page.tsx` — 한 페이지짜리 회사 사이트. 기본은 영어, `/?lang=ko`는 한국어
- `src/content/company.ts` — 모든 문구(영어·한국어)와 첫 화면 기록 그림의 예시 데이터
- `src/components/company/RecordSession.tsx` — 첫 화면의 "한 사람의 기록" 그림
- `src/app/company.css`, `src/app/globals.css` — 스타일과 색·서체 토큰
- `public/enter-ax/` — Enter-AX 프로토타입 화면 캡처

## 환경변수

모두 선택입니다.

| 이름 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 주소. 기본값 `https://dazzlar.dev` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 문의 메일. 기본값은 `src/content/company.ts`에 있고, 회사 도메인 메일을 만들면 여기에 넣습니다 |
| `NEXT_PUBLIC_ENTER_AX_URL` | Enter-AX 제품 주소. 넣으면 첫 화면에 "Open Enter-AX" 버튼이 나타납니다 |

## 문구를 고칠 때

사이트의 문장은 Claude for Startups 신청서와 같은 사실을 말해야 합니다. 제품 상태, 파일럿 고객, Claude가 하는 일은 실제와 다르게 쓰지 않습니다. 근거와 신청서 문안은 `enter-AX` 저장소의 `docs/claude-for-startups-application.md`에 있습니다.
