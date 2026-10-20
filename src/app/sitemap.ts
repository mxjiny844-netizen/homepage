import type {MetadataRoute} from 'next';
import {getPublic} from '@/lib/server';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const {cms}=await getPublic();const origin=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';return [...['','/products','/about','/brands','/consulting','/contact','/journal'],...cms.products.map(p=>'/products/'+p.id)].map(url=>({url:origin+url,changeFrequency:'weekly',priority:url===''?1:.7}));}
