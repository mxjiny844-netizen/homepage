import nextEnv from '@next/env';

const {loadEnvConfig}=nextEnv;

loadEnvConfig(process.cwd());

const required=['NEXT_PUBLIC_SITE_URL','NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','SUPABASE_SERVICE_ROLE_KEY'];
const missing=required.filter(name=>!process.env[name]?.trim());
const invalid=[];
for(const name of ['NEXT_PUBLIC_SITE_URL','NEXT_PUBLIC_SUPABASE_URL']){
  const value=process.env[name];
  try{if(value&&new URL(value).protocol!=='https:')invalid.push(name);}catch{invalid.push(name);}
}
if(process.env.LOCAL_SANDBOX==='true')invalid.push('LOCAL_SANDBOX must not be true');
if(missing.length||invalid.length){
  if(missing.length)console.error(`Missing production variables: ${missing.join(', ')}`);
  if(invalid.length)console.error(`Invalid production settings: ${invalid.join(', ')}`);
  process.exit(1);
}
console.log('Production environment check passed. Secret values were not printed.');
