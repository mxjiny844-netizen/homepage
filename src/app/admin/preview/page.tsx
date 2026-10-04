import {redirect} from 'next/navigation';
import {adminAllowed,getAdmin} from '@/lib/server';
import {PageRenderer} from '@/components/blocks';
import {Header,Footer} from '@/components/shell';
export const dynamic='force-dynamic';
export const metadata={title:'초안 미리보기',robots:{index:false,follow:false}};
export default async function Preview({searchParams}:{searchParams:Promise<{slug?:string}>}){if(!await adminAllowed())redirect('/admin/login');const data=await getAdmin();const {slug}=await searchParams;const page=data.pages[slug||'home'];if(!page)return <p>페이지를 찾을 수 없습니다.</p>;return <><div className="draft-banner">저장된 초안 미리보기 · 공개 홈페이지에는 게시본이 표시됩니다.</div><Header cms={data.cms}/><main id="main-content"><PageRenderer document={page.draft} cms={data.cms}/></main><Footer cms={data.cms}/></>}
