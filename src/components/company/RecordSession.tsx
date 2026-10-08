import { lanes, months, type Lang } from "@/content/company";

/** The hero figure: one person's record laid out like a multitrack session. */
export function RecordSession({ lang, title, range, caption, todayLabel }: {
  lang: Lang;
  title: string;
  range: string;
  caption: string;
  todayLabel: string;
}) {
  return (
    <figure className="co-session">
      <div className="co-session__frame">
        <div className="co-session__bar">
          <span className="co-session__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="co-session__title">{title}</span>
          <span className="co-session__range">{range}</span>
        </div>
        <div className="co-session__body">
          <div className="co-session__ruler" aria-hidden="true">
            <span />
            {months.map((month) => <span key={month}>{month}</span>)}
          </div>
          {lanes.map((lane) => (
            <div className={`co-lane co-lane--${lane.key}`} key={lane.key}>
              <span className="co-lane__name">{lane.name[lang]}</span>
              <ol className="co-lane__track">
                {lane.clips.map((clip, index) => (
                  <li
                    className={`co-clip${clip.flagged ? " co-clip--flagged" : ""}`}
                    key={index}
                    style={{ gridColumn: `${clip.start} / span ${clip.span ?? 1}`, animationDelay: `${250 + clip.start * 190}ms` }}
                  >
                    <span className="co-clip__month">{months[clip.start - 1]}</span>
                    {clip.label[lang]}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <span className="co-session__playhead" aria-hidden="true"><i>{todayLabel}</i></span>
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
