import {getPublic} from '@/lib/server';
import {PageRenderer} from '@/components/blocks';
import {InquiryForm} from '@/components/inquiry-form';
export async function generateMetadata(){const {pages}=await getPublic();return {title:pages.contact.title,description:pages.contact.description,alternates:{canonical:'/contact'}};}
export default async function Contact({searchParams}:{searchParams:Promise<{product?:string}>}){const {cms,pages,mode}=await getPublic();const {product}=await searchParams;return <><PageRenderer document={pages.contact} cms={cms}/><div className="section-container"><InquiryForm products={cms.products} kind="inquiry" product={product} mode={mode}/></div></>}
