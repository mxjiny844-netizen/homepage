import {getPublic} from '@/lib/server';
export const metadata={title:'사업자 정보'};
export default async function Business(){const {cms}=await getPublic();const s=cms.settings;return <div className="section-container policy-page"><span className="eyebrow">BUSINESS INFORMATION</span><h1>사업자 정보</h1>{[['사업자명',s.business],['대표자',s.owner],['사업자등록번호',s.businessNumber],['통신판매 정보',s.commerce],['주소',s.address],['연락처',s.phone],['이메일',s.email]].map(([name,value])=><div className="spec-row" key={name}><span>{name}</span><span>{value||'운영자가 입력 예정'}</span></div>)}<p>{s.disclaimer}</p></div>}
