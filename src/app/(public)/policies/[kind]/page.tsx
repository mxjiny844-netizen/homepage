import {getPublic} from '@/lib/server';
import {notFound} from 'next/navigation';
const names:Record<string,string>={terms:'이용약관',privacy:'개인정보처리방침',shipping:'배송 정책',returns:'교환·반품 정책',refund:'환불 정책'};
export default async function Policy({params}:{params:Promise<{kind:string}>}){const {kind}=await params;if(!names[kind])notFound();const {cms}=await getPublic();return <div className="section-container policy-page"><span className="eyebrow">POLICY</span><h1>{names[kind]}</h1><div className="mode-note">운영 전 확인과 확정이 필요한 정책 템플릿입니다.</div><p>{cms.settings.policies[kind]||'운영자가 내용을 입력해 주세요.'}</p></div>}
