# Enter-AX

지원자의 오디션 프로필 등록부터 검증된 엔터사의 탐색·컨택·후보 운영, Hermes-ready AX 작업 관제와 홍보 콘텐츠 준비까지 연결하는 엔터테인먼트 AX 데모입니다.

## 실행

```bash
npm install
npm run dev
```

검증 명령:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## 데모 데이터 경계

- 실제 로그인, 데이터베이스, 파일 저장소, 외부 메시지 발송은 없습니다.
- 선택한 사진과 영상은 브라우저 객체 URL로만 미리보며 서버로 전송하지 않습니다.
- YouTube는 공식 임베드 재생 전용이며 다운로드·캐시·분리 분석하지 않습니다.
- 자동 합격·탈락과 외모 점수화는 제공하지 않습니다.
- 가상 AI 결과에는 `데모` 또는 `API 연동 예정`을 표시합니다.

## 향후 Hermes 경계

웹 UI는 작업 생성과 사람 승인을 담당하고, 정책 계층 뒤의 Hermes 런타임이 회사별 스킬과 MCP/API 도구를 실행하도록 설계했습니다. 외부 발송·게시·지원자 상태 변경은 기본적으로 사람 승인을 요구합니다.

## 배포

작업 브랜치를 Vercel Preview로 먼저 배포해 전체 흐름과 반응형 화면을 확인합니다. Preview 승인 전에는 Production을 교체하지 않습니다.
