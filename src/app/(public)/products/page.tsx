import {getPublic} from '@/lib/server';
import {PageRenderer} from '@/components/blocks';
import {Products} from '@/components/products';
export async function generateMetadata(){const {pages}=await getPublic();return {title:pages.products.title,description:pages.products.description,alternates:{canonical:'/products'}};}
export default async function ProductPage({searchParams}:{searchParams:Promise<{category?:string}>}){const {cms,pages}=await getPublic();const params=await searchParams;return <><PageRenderer document={pages.products} cms={cms}/><Products cms={cms} category={params.category}/></>}
