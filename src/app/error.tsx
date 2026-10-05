'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main-content" className="section-container policy-page"><h1>화면을 불러오지 못했습니다.</h1><p>잠시 후 다시 시도하세요. 연결된 프로젝트의 설정이 완료되었는지 확인해 주세요.</p><button className="button dark" onClick={reset}>다시 시도</button></main>}
