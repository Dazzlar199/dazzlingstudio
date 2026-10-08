import Link from "next/link";

import "./company.css";

export default function NotFound() {
  return (
    <main className="co-plain">
      <h1>Page not found</h1>
      <p>This page does not exist or has moved.</p>
      <p><Link href="/">Back to Dazzling Studio</Link></p>
    </main>
  );
}
