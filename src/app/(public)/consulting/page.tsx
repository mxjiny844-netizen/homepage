import {getPublic} from '@/lib/server';
import {InquiryForm} from '@/components/inquiry-form';
export const metadata={title:'고객상담',alternates:{canonical:'/consulting'}};
export default async function Consulting({searchParams}:{searchParams:Promise<{product?:string}>}){const {cms,mode}=await getPublic();const {product}=await searchParams;return <div className="section-container consult-page"><div className="page-intro"><span className="eyebrow">PERSONAL MACHINE CURATION</span><h1>좋은 한 잔을 향한,<br/>첫 번째 대화.</h1></div><InquiryForm products={cms.products} kind="consulting" product={product} mode={mode}/></div>}
