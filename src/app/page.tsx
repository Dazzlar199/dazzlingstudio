import Image from "next/image";
import Link from "next/link";

import { RecordSession } from "@/components/company/RecordSession";
import { company, contactEmail, copy, kakaoUrl, productUrl, type Lang } from "@/content/company";

import "./company.css";

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang: Lang = (await searchParams).lang === "ko" ? "ko" : "en";
  const t = copy[lang];
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Enter-AX")}`;

  return (
    <div className="co" lang={lang}>
      <header className="co-nav">
        <Link className="co-nav__brand" href={lang === "ko" ? "/?lang=ko" : "/"}>Dazzling Studio</Link>
        <nav className="co-nav__links" aria-label={lang === "ko" ? "페이지 내 이동" : "On this page"}>
          <a href="#product">{t.nav.product}</a>
          <a href="#claude">{t.nav.claude}</a>
          <a href="#studio">{t.nav.studio}</a>
          <a href="#contact">{t.nav.contact}</a>
          <Link className="co-nav__lang" href={lang === "ko" ? "/" : "/?lang=ko"} hrefLang={lang === "ko" ? "en" : "ko"}>{t.switchLabel}</Link>
        </nav>
      </header>

      <main>
        <section className="co-hero">
          <p className="co-mono">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="co-hero__lede">{t.lede}</p>
          <div className="co-actions">
            <a className="co-btn co-btn--solid" href="#product">{t.primaryCta}</a>
            {productUrl ? <a className="co-btn co-btn--line" href={productUrl}>{t.productCta}</a> : null}
            <a className="co-btn co-btn--line" href={mailto}>{t.contactCta}</a>
          </div>
          <RecordSession lang={lang} caption={t.sessionCaption} todayLabel={t.todayLabel} />
        </section>

        <section className="co-section" aria-labelledby="why-title">
          <h2 id="why-title">{t.whyTitle}</h2>
          <div className="co-why">
            {t.why.map((item) => (
              <article key={item.head}>
                <h3>{item.head}</h3>
                <p>{item.body}</p>
                {"source" in item ? <a href={item.source.href} rel="noreferrer" target="_blank">{item.source.label} ↗</a> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="co-section" id="product" aria-labelledby="product-title">
          <h2 id="product-title">{t.productTitle}</h2>
          <p className="co-status">{t.productStatus}</p>
          <div className="co-features">
            {t.features.map((item) => (
              <div key={item.head}>
                <h3>{item.head}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="co-shots">
            {t.shots.map((shot) => (
              <figure key={shot.src}>
                <Image alt={shot.alt} height={1522} sizes="(max-width: 820px) 100vw, 560px" src={shot.src} width={2544} />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="co-note">{t.shotsNote}</p>
        </section>

        <section className="co-section" id="claude" aria-labelledby="claude-title">
          <h2 id="claude-title">{t.claudeTitle}</h2>
          <p className="co-section__lede">{t.claudeLede}</p>
          <div className="co-split">
            <div>
              <h3>{t.doesTitle}</h3>
              <ul>{t.does.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>{t.neverTitle}</h3>
              <ul>{t.never.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="co-section" id="studio" aria-labelledby="studio-title">
          <h2 id="studio-title">{t.studioTitle}</h2>
          <p className="co-section__lede">{t.studioBody}</p>
        </section>

        <section className="co-section" id="contact" aria-labelledby="contact-title">
          <div className="co-contact">
            <div>
              <h2 id="contact-title">{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
            </div>
            <div className="co-actions">
              <a className="co-btn co-btn--solid" href={mailto}>{contactEmail}</a>
              <a className="co-btn co-btn--line" href={`tel:${company.phone.tel}`}>{company.phone.display}</a>
              <a className="co-btn co-btn--line" href={kakaoUrl} rel="noreferrer" target="_blank">KakaoTalk</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="co-footer">
        <span>© {new Date().getFullYear()} {t.footer} · {company.name} · {t.representativeLabel} {company.representative[lang]}</span>
        <span><a href={`tel:${company.phone.tel}`}>{company.phone.display}</a> · <a href={mailto}>{contactEmail}</a></span>
        <span>Enter-AX · Built on the Claude API</span>
      </footer>
    </div>
  );
}
