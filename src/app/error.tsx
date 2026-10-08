"use client";

import "./company.css";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="co-plain">
      <h1>Something went wrong</h1>
      <p>The page could not be shown. Try loading it again.</p>
      <p><button className="co-btn co-btn--line" onClick={reset} type="button">Reload</button></p>
    </main>
  );
}
