# 🌐 도메인 구매 및 연결 가이드

## 1. 도메인 구매 추천

### 🥇 가장 쉬운 방법: Vercel Domains
**추천 대상**: 빠르게 시작하고 싶은 분

1. Vercel 대시보드 접속
   - https://vercel.com/dazzlars-projects/dual-portfolio
2. Settings → Domains
3. "Buy a domain" 클릭
4. 원하는 도메인 검색 (예: `dazzlar.studio`)
5. 구매 완료 → 자동으로 연결됨! ✅

**장점**:
- DNS 설정 자동 완료
- SSL 인증서 자동 발급
- 추가 설정 불필요

**가격**:
- .com: $15~20/년
- .studio: $25~30/년
- .dev: $12~15/년

---

### 🥈 가장 저렴한 방법: Cloudflare
**추천 대상**: 비용을 절약하고 싶은 분

1. Cloudflare Registrar 접속
   - https://www.cloudflare.com/products/registrar/
2. 계정 생성 후 도메인 검색
3. 도메인 구매 (원가 판매!)
4. DNS 설정:
   - A 레코드: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

**장점**:
- 가장 저렴 (원가 판매, 숨은 비용 없음)
- 빠른 DNS
- 무료 CDN, SSL, DDoS 방어 포함

**가격**:
- .com: $9.77/년
- .studio: $20/년
- .dev: $12.18/년

---

### 🥉 안정적인 방법: Namecheap
**추천 대상**: 검증된 서비스를 원하는 분

1. Namecheap 접속
   - https://www.namecheap.com
2. 도메인 검색 및 구매
3. 첫해 할인 쿠폰 검색 (보통 20~30% 할인)
4. Domain List → Manage → Advanced DNS
5. DNS 레코드 추가

**장점**:
- 믿을 수 있는 오래된 서비스
- 첫해 무료 Whois Privacy (개인정보 보호)
- 자주 할인 행사

**가격**:
- .com: $10~15/년 (첫해 할인)
- .studio: $20~30/년
- .dev: $12~15/년

---

### 🇰🇷 한국 업체: 가비아 / 카페24
**추천 대상**: 한글 지원이 필요한 분

**가비아**: https://www.gabia.com
**카페24**: https://www.cafe24.com

**장점**:
- 한글 고객 지원
- 국내 결제 수단 (계좌이체, 카드)
- .co.kr 도메인 구매 가능

**단점**:
- 조금 비쌈 (15,000~25,000원/년)
- DNS 설정이 복잡할 수 있음

---

## 2. 도메인 이름 추천

### 프로젝트 기반 추천:
1. **dazzlar.studio** ⭐ (최고 추천!)
   - 창작자/스튜디오 느낌
   - 짧고 기억하기 쉬움

2. **dazzlingstudio.com**
   - 전통적이고 안정적
   - .com은 신뢰도 높음

3. **dazzlar.dev**
   - 개발자 포트폴리오 강조
   - 개발 커뮤니티에서 인기

4. **dazzlar.io**
   - 테크 스타트업 느낌
   - 짧고 모던함

5. **dazzlar.co.kr**
   - 한국 고객 타겟
   - 국내 신뢰도 높음

### 확인 도구:
- Namecheap: https://www.namecheap.com/domains/registration/
- Cloudflare: https://www.cloudflare.com/products/registrar/
- 가비아: https://www.gabia.com

---

## 3. Vercel에 도메인 연결하기

### A. Vercel Domains로 구매한 경우
✅ **아무것도 안 해도 됩니다!** 자동으로 연결됨

---

### B. 외부에서 구매한 경우

#### Step 1: Vercel 설정

1. Vercel 대시보드 접속
   ```
   https://vercel.com/dazzlars-projects/dual-portfolio
   ```

2. Settings → Domains 클릭

3. "Add" 또는 "Add Domain" 클릭

4. 구매한 도메인 입력
   ```
   예: dazzlar.studio
   ```

5. Vercel이 DNS 설정 방법을 알려줌
   - Nameservers 방식 (권장)
   - A/CNAME 레코드 방식

---

#### Step 2: DNS 설정 (도메인 구매처)

**방법 1: Nameservers 변경 (권장)**

도메인 구매처 관리 페이지에서:
```
기존 Nameservers 삭제 후 추가:

ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Cloudflare:**
- Dashboard → Domain → DNS → Nameservers

**Namecheap:**
- Domain List → Manage → Nameservers → Custom DNS

**가비아:**
- My 가비아 → 도메인 → 관리도구 → 네임서버

---

**방법 2: A/CNAME 레코드 추가**

도메인 구매처 DNS 설정 페이지에서:

**Root 도메인 (예: dazzlar.studio):**
```
Type: A
Name: @ (또는 비워두기)
Value: 76.76.21.21
TTL: 자동 또는 3600
```

**www 서브도메인 (예: www.dazzlar.studio):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 자동 또는 3600
```

---

#### Step 3: 확인 및 대기

1. Vercel 대시보드로 돌아가기

2. "Refresh" 또는 "Verify" 클릭

3. 상태 확인:
   - ✅ "Valid Configuration" → 완료!
   - ⏳ "Pending" → DNS 전파 대기 중 (10분~48시간)
   - ❌ "Invalid Configuration" → DNS 설정 다시 확인

4. SSL 인증서 자동 발급 대기 (보통 10분 내)

---

## 4. 도메인 연결 후 할 일

### ✅ 필수 작업

#### 1. 환경변수 업데이트
Vercel 대시보드 → Settings → Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://dazzlar.studio
```

재배포 필요!

---

#### 2. 메타데이터 업데이트

**src/app/layout.tsx**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://dazzlar.studio'), // 변경
  // ...
  openGraph: {
    url: "https://dazzlar.studio", // 변경
    // ...
  }
}
```

---

#### 3. sitemap.xml 업데이트

**public/sitemap.xml**
```xml
<url>
  <loc>https://dazzlar.studio/</loc>
  <!-- 모든 dazzlingstudio.vercel.app를 새 도메인으로 변경 -->
</url>
```

---

#### 4. robots.txt 업데이트

**public/robots.txt**
```
Sitemap: https://dazzlar.studio/sitemap.xml
```

---

#### 5. StructuredData.tsx 업데이트

**src/components/shared/StructuredData.tsx**
```typescript
"url": "https://dazzlar.studio",
"logo": "https://dazzlar.studio/web_image/share_logo.png",
```

---

#### 6. Git 커밋 및 배포
```bash
git add .
git commit -m "chore: 도메인을 dazzlar.studio로 업데이트"
git push origin main
```

Vercel이 자동으로 재배포합니다.

---

### 📋 선택 작업

#### 1. Google Search Console 재등록
- 새 도메인으로 속성 추가
- 사이트맵 재제출

#### 2. 네이버 웹마스터 도구 재등록
- 새 도메인 등록
- 사이트맵 재제출

#### 3. Google Analytics 도메인 변경
- 속성 설정에서 도메인 업데이트

#### 4. SNS 링크 업데이트
- 인스타그램 프로필
- 유튜브 채널 설명
- 카카오톡 채널

---

## 5. 자주 묻는 질문 (FAQ)

### Q1: DNS 전파는 얼마나 걸리나요?
A: 보통 10분~1시간이지만, 최대 48시간까지 걸릴 수 있습니다.

확인 방법:
```bash
# Mac/Linux
dig dazzlar.studio

# Windows
nslookup dazzlar.studio
```

---

### Q2: www 있는 버전과 없는 버전 둘 다 작동하나요?
A: 네! Vercel이 자동으로 리다이렉트 설정합니다.
- `dazzlar.studio` → 메인
- `www.dazzlar.studio` → `dazzlar.studio`로 리다이렉트

---

### Q3: 이메일도 사용할 수 있나요?
A: 도메인만 구매하면 이메일은 별도 설정이 필요합니다.

추천:
- **Google Workspace**: $6/월 (전문적)
- **Zoho Mail**: 무료 (기본 기능)
- **ImprovMX**: 무료 (포워딩만)

---

### Q4: 도메인 이전은 어떻게 하나요?
A:
1. 기존 업체에서 "Auth Code" 발급
2. 새 업체에서 "Transfer" 요청
3. 7~10일 소요
4. 비용: 보통 1년 연장 포함

---

### Q5: .com vs .studio vs .dev 뭐가 좋나요?
A:
- **.com**: 가장 신뢰도 높음, 기억하기 쉬움
- **.studio**: 크리에이티브 업종에 완벽 ⭐
- **.dev**: 개발자 포트폴리오에 적합
- **.io**: 테크 스타트업 느낌

---

## 6. 비용 총정리

### 연간 비용 (1년 기준):

| 항목 | Vercel Domains | Cloudflare | Namecheap | 가비아 |
|------|----------------|------------|-----------|--------|
| .com | $15~20 | $9.77 | $10~15 | ₩15,000 |
| .studio | $25~30 | $20 | $20~30 | ₩30,000 |
| .dev | $12~15 | $12.18 | $12~15 | ₩18,000 |
| Whois Privacy | 포함 | 포함 | 첫해 무료 | 별도 |
| 갱신 가격 | 동일 | 동일 | 인상될 수 있음 | 동일 |

### 추천:
- **편의성 우선**: Vercel Domains
- **가격 우선**: Cloudflare
- **밸런스**: Namecheap
- **한글 지원**: 가비아

---

## 7. 체크리스트

### 도메인 구매 전:
- [ ] 프로젝트에 맞는 도메인 이름 선택
- [ ] 가격 비교 (갱신 비용 확인)
- [ ] 확장자 결정 (.com, .studio, .dev 등)

### 도메인 연결:
- [ ] Vercel에 도메인 추가
- [ ] DNS 설정 완료
- [ ] SSL 인증서 발급 확인
- [ ] www 리다이렉트 확인

### 코드 업데이트:
- [ ] 환경변수 변경 (NEXT_PUBLIC_SITE_URL)
- [ ] layout.tsx 메타데이터 변경
- [ ] sitemap.xml 업데이트
- [ ] robots.txt 업데이트
- [ ] StructuredData.tsx 업데이트
- [ ] Git 커밋 및 배포

### SEO 재설정:
- [ ] Google Search Console 재등록
- [ ] 네이버 웹마스터 도구 재등록
- [ ] Google Analytics 도메인 변경
- [ ] SNS 링크 업데이트

---

## 📞 도움이 필요하시면

도메인 구매나 연결 중 문제가 생기면:
1. Vercel 공식 문서: https://vercel.com/docs/projects/domains
2. 도메인 업체 고객 센터 문의
3. 저에게 질문하기!

---

**마지막 업데이트**: 2025-10-12
**작성자**: Dazzlar Studio
