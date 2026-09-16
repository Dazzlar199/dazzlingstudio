const steps = [
  ["01", "지원자 등록", "정면·좌·우 사진과 보컬·댄스 자료"],
  ["02", "동의 설정", "엔터사 전용 기본, 선택적 전체 공개"],
  ["03", "검증된 열람", "검증 완료 엔터사만 비공개 프로필 확인"],
  ["04", "관심·제안", "개인 연락처 없이 공식 오디션 제안"],
  ["05", "지원자 응답", "수락·거절·추가 정보 요청"],
  ["06", "후보 운영", "담당자·메모·다음 행동이 남는 파이프라인"],
  ["07", "AX 실행", "사람 승인 기반 업무와 콘텐츠 자동화"],
];

export function AxFlow() {
  return (
    <section className="flow-section" id="flow" aria-labelledby="flow-title">
      <div className="section-heading">
        <p>CONNECTED OPERATING FLOW</p>
        <h2 id="flow-title">하나의 지원이<br />회사 안의 실행으로 이어집니다.</h2>
      </div>
      <ol className="flow-list">
        {steps.map(([number, title, description]) => (
          <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>
        ))}
      </ol>
    </section>
  );
}
