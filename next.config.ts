import type {NextConfig} from 'next';
const config:NextConfig={devIndicators:false,images:{formats:['image/avif','image/webp'],remotePatterns:process.env.NEXT_PUBLIC_SUPABASE_URL?[{protocol:'https',hostname:new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,pathname:'/storage/v1/object/public/media/**'}]:[]},async headers(){return [{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'SAMEORIGIN'},{key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'}]}]}};
export default config;

