export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dazzling Studio",
    "alternateName": "Dazzlar Studio",
    "url": "https://dazzlingstudio.vercel.app",
    "logo": "https://dazzlingstudio.vercel.app/web_image/share_logo.png",
    "description": "음악과 기술이 만나는 특별한 공간. 전문 음향 녹음 스튜디오와 웹 개발 서비스를 제공합니다.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Dazzlar"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-10-XXXX-XXXX",
      "contactType": "customer service",
      "email": "rlackswn2000@naver.com",
      "availableLanguage": ["Korean", "English"]
    },
    "sameAs": [
      "http://pf.kakao.com/_gxgbxcn/chat"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Audio Engineering & Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Dazzling Studio"
    },
    "areaServed": {
      "@type": "Country",
      "name": "South Korea"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Professional Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "축가 녹음 서비스",
            "description": "결혼식용 맞춤 축가 제작",
            "price": "100000",
            "priceCurrency": "KRW"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "웹사이트 개발",
            "description": "반응형 웹사이트 제작",
            "price": "500000",
            "priceCurrency": "KRW"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "웹 애플리케이션 개발",
            "description": "맞춤형 웹 앱 개발",
            "price": "1500000",
            "priceCurrency": "KRW"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "모바일 앱 개발",
            "description": "iOS/Android 크로스 플랫폼 앱",
            "price": "2000000",
            "priceCurrency": "KRW"
          }
        }
      ]
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dazzling Studio - Professional Audio Engineering & Web Development",
    "description": "음향 엔지니어링과 웹 개발을 제공하는 듀얼 포트폴리오",
    "url": "https://dazzlingstudio.vercel.app",
    "inLanguage": "ko-KR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Dazzling Studio",
      "url": "https://dazzlingstudio.vercel.app"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
