import {notFound} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight,ArrowLeft,Check} from 'lucide-react';
import {getPublic} from '@/lib/server';
import {ProductCards} from '@/components/blocks';
import {DetailCompareButton} from '@/components/comparison';

export async function generateMetadata({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const {cms}=await getPublic();
  const product=cms.products.find(p=>p.id===id);
  if(!product)return {};
  return {title:product.seoTitle||product.name,description:product.seoDescription||product.description,alternates:{canonical:`/products/${id}`},openGraph:{images:[product.image],title:product.seoTitle||product.name,description:product.seoDescription||product.description}};
}

export default async function Detail({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const {cms}=await getPublic();
  const p=cms.products.find(p=>p.id===id);
  if(!p)notFound();
  const specs=[['모델',p.model],['크기',p.size],['무게',p.weight],['전원',p.power],['급수 방식',p.water],['하루 권장 추출량',p.usage],['설치 환경',p.environment],['공급 상태',p.stock]].filter(([,value])=>value);
  const detail=p.detail;
  const visualImages=[p.image,...p.gallery].filter(Boolean);
  const highlights=detail?.highlights?.length?detail.highlights:p.features.slice(0,6).map((feature,index)=>({title:feature,body:undefined,image:visualImages[index%visualImages.length]}));
  const stories=detail?.sections??[];
  const options=detail?.options??[];
  const taglineTitle=detail?.tagline?.split('·')[0]?.trim()||'공간에 맞는 커피 경험.';
  const structured={'@context':'https://schema.org','@type':'Product',name:p.name,image:p.image,description:p.description,brand:{'@type':'Brand',name:p.brand},...(p.model?{model:p.model}:{})};
  return <div className="detail">
    <div className="detail-subnav-wrap"><div className="section-container detail-subnav"><a href="#overview">제품 소개</a><a href="#features">주요 특징</a><a href="#specs">제품 사양</a>{options.length>0&&<a href="#options">옵션</a>}{p.gallery.length>0&&<a href="#gallery">갤러리</a>}<a href="#consult">상담</a></div></div>
    <div className="section-container">
      <Link href="/products" className="back-link"><ArrowLeft size={15}/> 컬렉션으로 돌아가기</Link>
      <div className="detail-hero">
        <div className="detail-image"><Image src={p.image} alt={p.name} fill priority sizes="(max-width: 800px) 90vw, 50vw"/></div>
        <div className="detail-copy">
          <span className="eyebrow">{p.brand} / {p.category}</span>
          <h1>{p.name}</h1>
          {detail?.tagline&&<p className="detail-tagline">{detail.tagline}</p>}
          <p>{p.description}</p>
          <div className="detail-badges">
            {p.usage&&<span><Check size={12}/>{p.usage}</span>}
            {p.size&&<span><Check size={12}/>{p.size}</span>}
            {p.power&&<span><Check size={12}/>{p.power}</span>}
            {p.water&&<span><Check size={12}/>{p.water}</span>}
          </div>
          <span className="price-label">{p.priceMode==='가격 표시'&&p.price!==null?`₩ ${p.price.toLocaleString()}`:p.priceMode}</span>
          <div className="detail-actions">
            <Link className="button dark" href={`/consulting?product=${p.id}`}>제품 상담하기 <ArrowUpRight size={17}/></Link>
            <DetailCompareButton product={p} products={cms.products}/>
            <Link className="text-link" href={`/contact?product=${p.id}`}>문의하기 <ArrowUpRight size={17}/></Link>
          </div>
          <small>표시된 정보는 등록된 제품 정보 기준이며, 실제 사양·공급 가능 여부는 상담 시 확인합니다.</small>
        </div>
      </div>

      <section className="detail-overview" id="overview">
        <div><span className="eyebrow">OVERVIEW</span><h2>{taglineTitle}</h2></div>
        <div><p>{p.description}</p><div className="overview-meta"><span>{p.environment}</span><span>{p.usage}</span><span>{p.category}</span></div></div>
      </section>

      <section className="detail-highlights" id="features">
        <div className="section-heading"><div><span className="eyebrow">HIGHLIGHTS</span><h2>제품 하이라이트</h2></div><div><p>제품의 핵심 구조와 사용성을 한눈에 확인하세요.</p></div></div>
        <div className="highlight-grid">
          {highlights.map((highlight,index)=><article className="highlight-card" key={`${highlight.title}-${index}`}>
            <div className="highlight-image">{highlight.image?<Image src={highlight.image} alt={highlight.title} fill sizes="(max-width: 800px) 90vw, 30vw"/>:<span>0{index+1}</span>}</div>
            <div className="highlight-copy"><span>0{index+1}</span><h3>{highlight.title}</h3>{highlight.body&&<p>{highlight.body}</p>}</div>
          </article>)}
        </div>
      </section>

      {stories.length>0&&<section className="detail-stories">
        {stories.map((story,index)=><div className={`detail-story ${story.layout||(index%2?'image-left':'image-right')}`} key={`${story.title}-${index}`}>
          {story.image&&<div className="detail-story-image"><Image src={story.image} alt={story.title} fill sizes="(max-width: 800px) 90vw, 50vw"/></div>}
          <div className="detail-story-copy"><span className="eyebrow">{story.eyebrow||'DETAIL'}</span><h2>{story.title}</h2>{story.body&&<p>{story.body}</p>}</div>
        </div>)}
      </section>}

      <section className="detail-spec-sheet" id="specs">
        <div className="section-heading"><div><span className="eyebrow">SPECIFICATIONS</span><h2>제품 사양</h2></div><div><p>제조사 공개 자료 기준이며, 공급 모델과 옵션에 따라 달라질 수 있습니다.</p></div></div>
        {p.specSheet?.length?<div className="spec-table-wrap"><table className="spec-table"><tbody>{p.specSheet.map(row=><tr key={row.label}><th scope="row">{row.label}</th><td>{row.value}</td></tr>)}</tbody></table></div>:<div className="spec-table-wrap"><table className="spec-table"><tbody>{specs.map(([key,value])=><tr key={key}><th scope="row">{key}</th><td>{value}</td></tr>)}</tbody></table></div>}
        {p.specs&&<p className="spec-extra">{p.specs}</p>}
      </section>

      {options.length>0&&<section className="detail-options" id="options">
        <div className="section-heading"><div><span className="eyebrow">OPTIONS</span><h2>선택 모듈·액세서리</h2></div><div><p>설치 환경과 운영 방식에 맞춰 추가 구성을 선택할 수 있습니다.</p></div></div>
        <div className="option-grid">{options.map(option=><article className="option-card" key={option.name}>{option.image&&<div className="option-image"><Image src={option.image} alt={option.name} fill sizes="(max-width: 800px) 90vw, 30vw"/></div>}<div><h3>{option.name}</h3>{option.description&&<p>{option.description}</p>}</div></article>)}</div>
      </section>}

      {p.gallery.length>0&&<section className="detail-gallery-section" id="gallery">
        <div className="section-heading"><div><span className="eyebrow">GALLERY</span><h2>제품 갤러리</h2></div><div><p>{p.name}의 디테일과 설치 이미지를 확인하세요.</p></div></div>
        <div className="detail-gallery">{p.gallery.map((url,index)=><div key={url}><Image src={url} alt={`${p.name} 상세 ${index+1}`} fill sizes="50vw"/></div>)}</div>
      </section>}

      <section className="detail-cta" id="consult">
        <div><span className="eyebrow">CONSULTING</span><h2>이 머신이 공간에 맞는지<br/>함께 확인하세요.</h2><p>사용량, 설치 환경, 급수 방식, 예산까지 상담으로 정리해 드립니다.</p></div>
        <Link className="button light" href={`/consulting?product=${p.id}`}>제품 상담하기 <ArrowUpRight size={18}/></Link>
      </section>

      <div className="related"><span className="eyebrow">CONTINUE EXPLORING</span><h2>함께 살펴볼 머신</h2><ProductCards cms={{...cms,products:cms.products.filter(q=>q.id!==p.id)}} limit={3}/></div>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
  </div>;
}
