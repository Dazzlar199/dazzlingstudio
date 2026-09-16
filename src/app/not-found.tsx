import Link from "next/link";

export default function NotFound() {
  return (
    <main className="system-message">
      <section className="system-message__panel">
        <p className="system-message__code">404</p>
        <h1>이 경로에는 아직 무대가 없습니다.</h1>
        <p>주소를 다시 확인하거나 Enter-AX 시작 화면으로 이동해 주세요.</p>
        <div className="system-actions">
          <Link className="button-solid" href="/">홈으로</Link>
        </div>
      </section>
    </main>
  );
}
