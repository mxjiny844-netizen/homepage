import {Header,Footer,FloatingCTA} from '@/components/shell';
import {getPublic} from '@/lib/server';
export const dynamic='force-dynamic';
export default async function PublicLayout({children}:{children:React.ReactNode}){const {cms}=await getPublic();return <><Header cms={cms}/><main id="main-content">{children}</main><Footer cms={cms}/><FloatingCTA cms={cms}/></>}
