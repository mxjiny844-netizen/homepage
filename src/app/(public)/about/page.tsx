import {getPublic} from '@/lib/server';
import {PageRenderer} from '@/components/blocks';
export async function generateMetadata(){const {pages}=await getPublic();return {title:pages.about.title,description:pages.about.description,alternates:{canonical:'/about'}};}
export default async function About(){const {cms,pages}=await getPublic();return <PageRenderer document={pages.about} cms={cms}/>}
