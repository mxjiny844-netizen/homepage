import {redirect} from 'next/navigation';
import {adminAllowed,getAdmin} from '@/lib/server';
import {AdminWorkspace} from '@/components/admin/workspace';
export const dynamic='force-dynamic';
export const metadata={title:'사이트 관리',robots:{index:false,follow:false}};
export default async function Admin({params}:{params:Promise<{section?:string[]}>}){if(!await adminAllowed())redirect('/admin/login');const {section}=await params;const initial=await getAdmin();const tab=section?.[0]||'dashboard';return <AdminWorkspace key={tab} initial={initial} tab={tab}/>}
