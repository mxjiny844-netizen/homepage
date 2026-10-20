import type {Metadata} from 'next';
import './globals.css';
import './admin.css';
import {getPublic} from '@/lib/server';
export async function generateMetadata():Promise<Metadata>{const {cms}=await getPublic();const origin=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';return {metadataBase:new URL(origin),title:{default:cms.settings.seoTitle,template:`%s | ${cms.settings.name}`},description:cms.settings.seoDescription,openGraph:{title:cms.settings.seoTitle,description:cms.settings.seoDescription,locale:'ko_KR',type:'website',images:[{url:cms.products[0]?.image||'/machines/machine-01.webp'}]},icons:cms.settings.favicon?{icon:cms.settings.favicon}:undefined};}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">본문으로 건너뛰기</a>{children}</body></html>}

