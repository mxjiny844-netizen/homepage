import {getPublic} from '@/lib/server';
import {PageRenderer} from '@/components/blocks';
export default async function Home(){const {cms,pages}=await getPublic();return <><PageRenderer document={pages.home} cms={cms}/><div className="closing-line"><span>A GOOD MACHINE. A BETTER CUP.</span><span>FORME COFFEE — CONSIDERED CHOICES</span></div></>}
