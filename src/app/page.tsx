import Image from "next/image";
import Link from "next/link";

import { RecordSession } from "@/components/company/RecordSession";
import { apps, company, contactEmail, copy, kakaoUrl, methodLogs, productUrl, type Lang } from "@/content/company";

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
              <Image alt="" className="co-nav__logo" height={32} src="/brand/dazzlar.svg" width={32} />
              {company.brand}
            </Link>
            <nav className="co-nav__links" aria-label={lang === "ko" ? "페이지 내 이동" : "On this page"}>
              <a href="#product">{t.nav.product}</a>
              <a href="#claude">{t.nav.claude}</a>
              <a href="#work">{t.nav.work}</a>
              <a href="#logs">{t.nav.logs}</a>
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
            <div className="co-stack" aria-label={t.stackLabel}>
              <span className="co-mono">{t.stackLabel}</span>
              <a className="co-stack__chip" href="#product"><Image alt="" height={28} src="/brand/enter-ax.svg" width={28} />Enter-AX</a>
              <a className="co-stack__chip" href="#apps">
                <span className="co-stack__icons">
                  {apps.slice(0, 5).map((app) => <Image alt="" height={28} key={app.key} src={`/apps/${app.key}-icon.png`} width={28} />)}
                </span>
                {t.appsTitle}
              </a>
              <a className="co-stack__chip" href="#blog"><i className="co-stack__dot" aria-hidden="true" />the-cyclopedia.com</a>
              <a className="co-stack__chip" href="#store"><Image alt="" className="co-stack__wide" height={22} src="/brand/happiness.png" width={62} /></a>
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
              <h2 className="co-h2logo" id="product-title"><Image alt="" height={64} src="/brand/enter-ax.svg" width={64} />{t.productTitle}</h2>
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

        <section className="co-band co-band--dark" id="work" aria-labelledby="work-title">
          <div className="co">
            <h2 id="work-title">{t.workTitle}</h2>
            <p className="co-lede">{t.workLede}</p>

            <div className="co-apps" id="apps">
              <div className="co-apps__head">
                <div>
                  <p className="co-mono">{t.appsKicker}</p>
                  <h3>{t.appsTitle}</h3>
                  <p>{t.appsBody}</p>
                </div>
                <p className="co-mono co-apps__hint" aria-hidden="true">{t.appsHint} →</p>
              </div>
              <ul className="co-rail">
                {apps.map((app) => (
                  <li className="co-app" key={app.key}>
                    <a href={app.log} rel="noreferrer" target="_blank">
                      <span className="co-phone">
                        <Image alt={`${app.name[lang]} — ${app.line[lang]}`} height={900} sizes="240px" src={`/apps/${app.key}.png`} width={520} />
                      </span>
                      <span className="co-app__meta">
                        <Image alt="" height={40} src={`/apps/${app.key}-icon.png`} width={40} />
                        <span>
                          <strong>{app.name[lang]}</strong>
                          {lang === "en" ? <small lang="ko">{app.name.ko}</small> : null}
                        </span>
                      </span>
                      <span className="co-app__line">{app.line[lang]}</span>
                      <span className="co-app__cta">{t.logCta} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="co-duo">
              <article className="co-tile co-reveal" id="blog">
                <div className="co-tile__shot">
                  <div className="co-shot__bar co-shot__bar--dark" aria-hidden="true"><i /><i /><i /><span>the-cyclopedia.com</span></div>
                  <Image alt={t.blogTitle} height={900} sizes="(max-width: 860px) 100vw, 560px" src="/work/blog.png" width={1440} />
                </div>
                <p className="co-mono">{t.blogKicker}</p>
                <h3>{t.blogTitle}</h3>
                <p>{t.blogBody}</p>
                <a href="https://the-cyclopedia.com" rel="noreferrer" target="_blank">{t.blogCta} ↗</a>
              </article>
              <article className="co-tile co-reveal" id="store">
                <div className="co-tile__shot co-tile__shot--store">
                  <Image alt={t.storeTitle} height={1400} sizes="(max-width: 860px) 100vw, 560px" src="/work/store.png" width={1400} />
                </div>
                <p className="co-mono">{t.storeKicker}</p>
                <h3>{t.storeTitle}</h3>
                <p>{t.storeBody}</p>
              </article>
            </div>

            <div className="co-rules" aria-label={t.rulesTitle}>
              <p className="co-mono">{t.rulesTitle}</p>
              <ol>
                {t.rules.map(([head, body]) => (
                  <li key={head}><strong>{head}</strong><span>{body}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="co-band co-band--surface" id="logs" aria-labelledby="logs-title">
          <div className="co">
            <h2 id="logs-title">{t.logsTitle}</h2>
            <p className="co-lede">{t.logsLede}</p>
            <div className="co-logs">
              <div>
                <p className="co-mono">{t.logsApps}</p>
                <ol className="co-loglist">
                  {apps.map((app, index) => (
                    <li key={app.key}>
                      <a href={app.log} rel="noreferrer" target="_blank">
                        <span className="co-loglist__no">{String(index + 1).padStart(2, "0")}</span>
                        <Image alt="" height={32} src={`/apps/${app.key}-icon.png`} width={32} />
                        <span className="co-loglist__title">{app.name[lang]}{lang === "en" ? <small lang="ko">{app.name.ko}</small> : null}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="co-mono">{t.logsMethod}</p>
                <ol className="co-loglist co-loglist--method">
                  {methodLogs.map((log) => (
                    <li key={log.href}>
                      <a href={log.href} rel="noreferrer" target="_blank">
                        <span className="co-loglist__title">{log.title[lang]}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ol>
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
        <span>dazzlar.dev · Built with Claude</span>
      </footer>
    </div>
  );
}
