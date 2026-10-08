import Image from "next/image";
import Link from "next/link";

import { RecordSession } from "@/components/company/RecordSession";
import { company, contactEmail, copy, kakaoUrl, productUrl, type Lang } from "@/content/company";

import "./company.css";

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang: Lang = (await searchParams).lang === "ko" ? "ko" : "en";
  const t = copy[lang];
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Enter-AX")}`;
  const [mainShot, sideShot] = t.shots;

  return (
    <div className="co-page" lang={lang}>
      <div className="co-band co-band--dark co-band--hero">
        <div className="co">
          <header className="co-nav">
            <Link className="co-nav__brand" href={lang === "ko" ? "/?lang=ko" : "/"}>
              <span className="co-nav__mark" aria-hidden="true">DS</span>
              Dazzling Studio
            </Link>
            <nav className="co-nav__links" aria-label={lang === "ko" ? "페이지 내 이동" : "On this page"}>
              <a href="#product">{t.nav.product}</a>
              <a href="#claude">{t.nav.claude}</a>
              <a href="#studio">{t.nav.studio}</a>
              <a href="#contact">{t.nav.contact}</a>
              <Link className="co-nav__lang" href={lang === "ko" ? "/" : "/?lang=ko"} hrefLang={lang === "ko" ? "en" : "ko"}>{t.switchLabel}</Link>
            </nav>
          </header>

          <section className="co-hero">
            <p className="co-mono">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="co-hero__lede">{t.lede}</p>
            <div className="co-actions">
              <a className="co-btn co-btn--solid" href="#product">{t.primaryCta}</a>
              {productUrl ? <a className="co-btn co-btn--line" href={productUrl}>{t.productCta}</a> : null}
              <a className="co-btn co-btn--line" href={mailto}>{t.contactCta}</a>
            </div>
            <RecordSession caption={t.sessionCaption} lang={lang} range={t.sessionRange} title={t.sessionTitle} todayLabel={t.todayLabel} />
          </section>
        </div>
      </div>

      <main>
        <section className="co-band" aria-labelledby="why-title">
          <div className="co">
            <h2 id="why-title">{t.whyTitle}</h2>
            <div className="co-why">
              {t.why.map((item) => (
                <article className="co-reveal" key={item.head}>
                  <p className="co-why__figure">{item.figure}</p>
                  <p className="co-mono">{item.figureLabel}</p>
                  <h3>{item.head}</h3>
                  <p className="co-why__body">{item.body}</p>
                  {"source" in item ? <a href={item.source.href} rel="noreferrer" target="_blank">{item.source.label} ↗</a> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="co-band co-band--surface" id="product" aria-labelledby="product-title">
          <div className="co">
            <div className="co-headrow">
              <h2 id="product-title">{t.productTitle}</h2>
              <p className="co-status"><i aria-hidden="true" />{t.productStatus}</p>
            </div>
            <div className="co-features">
              {t.features.map((item) => (
                <article className={`co-feature co-feature--${item.lane} co-reveal`} key={item.head}>
                  <p className="co-mono co-feature__lane">{t.laneTag[item.lane]}</p>
                  <h3>{item.head}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="co-shots">
              <figure className="co-shot co-shot--main co-reveal">
                <div className="co-shot__bar" aria-hidden="true"><i /><i /><i /><span>enter-ax · pipeline</span></div>
                <Image alt={mainShot.alt} height={1800} sizes="(max-width: 900px) 100vw, 760px" src={mainShot.src} width={2880} />
                <figcaption>{mainShot.caption}</figcaption>
              </figure>
              <figure className="co-shot co-shot--side co-reveal">
                <div className="co-shot__bar" aria-hidden="true"><i /><i /><i /><span>enter-ax · workflow</span></div>
                <Image alt={sideShot.alt} height={1522} sizes="(max-width: 900px) 100vw, 520px" src={sideShot.src} width={2544} />
                <figcaption>{sideShot.caption}</figcaption>
              </figure>
            </div>
            <p className="co-note">{t.shotsNote}</p>
          </div>
        </section>

        <section className="co-band co-band--claude" id="claude" aria-labelledby="claude-title">
          <div className="co">
            <div className="co-claude">
              <div>
                <h2 id="claude-title">{t.claudeTitle}</h2>
                <p className="co-lede">{t.claudeLede}</p>
              </div>
              <aside className="co-mock co-reveal" aria-label={t.mock.label}>
                <p className="co-mono">{t.mock.label}</p>
                <div className="co-mock__card">
                  <header>
                    <strong>{t.mock.title}</strong>
                    <span>{t.mock.meta}</span>
                  </header>
                  <div className="co-mock__attention">
                    <b>{t.mock.attentionTitle}</b>
                    <p>{t.mock.attention}</p>
                  </div>
                  <dl>
                    <dt>{t.mock.changedTitle}</dt>
                    <dd>{t.mock.changed.map(([area, change]) => <span key={area}><em>{area}</em>{change}</span>)}</dd>
                    <dt>{t.mock.differTitle}</dt>
                    <dd>{t.mock.differ}</dd>
                    <dt>{t.mock.draftTitle}</dt>
                    <dd className="co-mock__draft">{t.mock.draft}</dd>
                  </dl>
                </div>
              </aside>
            </div>
            <div className="co-split">
              <div className="co-split__does co-reveal">
                <h3>{t.doesTitle}</h3>
                <ul>{t.does.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="co-split__never co-reveal">
                <h3>{t.neverTitle}</h3>
                <ul>{t.never.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="co-band" id="studio" aria-labelledby="studio-title">
          <div className="co">
            <div className="co-studio">
              <div>
                <h2 id="studio-title">{t.studioTitle}</h2>
                <p className="co-lede">{t.studioBody}</p>
              </div>
              <dl className="co-facts co-reveal" aria-label={t.factsTitle}>
                {t.facts.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="co-band co-band--tight" id="contact" aria-labelledby="contact-title">
          <div className="co">
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
          </div>
        </section>
      </main>

      <footer className="co co-footer">
        <span>© {new Date().getFullYear()} {t.footer} · {company.name} · {t.representativeLabel} {company.representative[lang]}</span>
        <span><a href={`tel:${company.phone.tel}`}>{company.phone.display}</a> · <a href={mailto}>{contactEmail}</a></span>
        <span>Enter-AX · Built on the Claude API</span>
      </footer>
    </div>
  );
}
