import Link from "next/link";

export default function AgencyStartPage() {
  return (
    <main className="entry-page entry-page--agency">
      <p className="entry-page__eyebrow">AGENCY / VERIFIED DEMO</p>
      <h1>인재를 찾는 화면과<br />회사를 움직이는 AX를<br />한곳에서.</h1>
      <p>가상의 검증 완료 엔터사로 인재 탐색, 제안, 파이프라인과 AX 운영 흐름을 체험합니다.</p>
      <Link className="button-solid button-large" href="/agency/discover">엔터사 AX 데모 시작</Link>
    </main>
  );
}
