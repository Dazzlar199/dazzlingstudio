import { lanes, months, type Lang } from "@/content/company";

/** The hero figure: one person's record laid out like a multitrack session. */
export function RecordSession({ lang, caption, todayLabel }: { lang: Lang; caption: string; todayLabel: string }) {
  return (
    <figure className="co-session">
      <div className="co-session__frame">
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
                  style={{ gridColumn: `${clip.start} / span ${clip.span ?? 1}`, animationDelay: `${120 + clip.start * 90}ms` }}
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
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
