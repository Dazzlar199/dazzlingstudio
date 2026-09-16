"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error("Enter-AX application error", error), [error]);

  return (
    <main className="system-message">
      <section className="system-message__panel">
        <p className="status-badge" data-tone="warning">SYSTEM ERROR</p>
        <h1>작업을 이어가지 못했습니다.</h1>
        <p>입력 내용은 외부로 전송되지 않았습니다. 다시 시도하거나 홈으로 돌아가 주세요.</p>
        {error.digest ? <p><code>오류 ID: {error.digest}</code></p> : null}
        <div className="system-actions">
          <button className="button-solid" onClick={reset} type="button">다시 시도</button>
          <Link className="button-outline" href="/">홈으로</Link>
        </div>
      </section>
    </main>
  );
}
