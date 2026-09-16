import Link from "next/link";

export default function TalentStartPage() {
  return (
    <main className="entry-page">
      <p className="entry-page__eyebrow">TALENT / PRIVATE BY DEFAULT</p>
      <h1>보여줄 자료와<br />보여줄 범위를<br />직접 선택하세요.</h1>
      <p>데모 파일은 서버로 전송되지 않습니다. 등록 흐름과 공개 범위 설정을 먼저 체험할 수 있습니다.</p>
      <Link className="button-solid button-large" href="/talent/onboarding">프로필 등록 시작</Link>
    </main>
  );
}
