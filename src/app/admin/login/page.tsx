import {redirect} from 'next/navigation';
import {adminAllowed,mode} from '@/lib/server';
import {AdminLogin} from '@/components/admin/login';
export const dynamic='force-dynamic';
export const metadata={title:'관리자 로그인',robots:{index:false,follow:false}};
export default async function Login(){if(await adminAllowed())redirect('/admin');return <AdminLogin mode={mode()}/>}
