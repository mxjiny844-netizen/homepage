import {getPublic} from '@/lib/server';
import {ProductComparison} from '@/components/comparison';
import {parseCompareIds} from '@/lib/comparison';
export const metadata={title:'제품 비교',description:'커피머신의 확인된 사양과 사용 환경을 한 화면에서 비교합니다.',alternates:{canonical:'/compare'}};
export default async function ComparePage({searchParams}:{searchParams:Promise<{ids?:string}>}){const {cms}=await getPublic();const params=await searchParams;return <ProductComparison products={cms.products} initialIds={parseCompareIds(params.ids,cms.products)}/>;}
