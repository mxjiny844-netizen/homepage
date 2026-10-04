import {getPublic} from '@/lib/server';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
export const metadata={title:'브랜드',alternates:{canonical:'/brands'}};
export default async function Brands(){const {cms}=await getPublic();return <div className="section-container"><div className="page-intro"><span className="eyebrow">THE BRANDS</span><h1>서로 다른 방식으로,<br/>좋은 커피를 향해.</h1><p>제품 사진을 바탕으로 구성한 초기 브랜드 컬렉션입니다.<br/>실제 취급 모델과 판매 관계는 운영자가 확인 후 안내합니다.</p></div><div className="brand-grid">{cms.brands.map(name=>{const product=cms.products.find(p=>p.brand===name);return <Link href="/products" className="brand-card" key={name}><span className="eyebrow">COFFEE MACHINE COLLECTION</span><h2>{name}</h2>{product&&<div><Image src={product.image} alt={`${name} 머신`} fill sizes="45vw"/></div>}<span>컬렉션 만나보기 <ArrowUpRight size={17}/></span></Link>;})}</div></div>}
