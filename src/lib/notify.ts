import type {Inquiry} from './schema';

type InquiryNotice=Pick<Inquiry,'name'|'phone'|'email'|'kind'|'product_id'|'region'|'budget'|'method'|'available_time'|'message'|'created_at'>;

export const telegramConfigured=()=>!!(process.env.TELEGRAM_BOT_TOKEN&&process.env.TELEGRAM_CHAT_ID);

export function formatInquiryMessage(entry:InquiryNotice){
  const site=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
  const lines=[
    '🔔 새 상담 신청이 접수되었습니다.',
    '',
    `이름: ${entry.name}`,
    `연락처: ${entry.phone}`,
    ...(entry.email?[`이메일: ${entry.email}`]:[]),
    `구분: ${entry.kind==='consulting'?'상담 신청':'일반 문의'}`,
    ...(entry.product_id?[`제품 ID: ${entry.product_id}`]:[]),
    ...(entry.region?[`지역: ${entry.region}`]:[]),
    ...(entry.budget?[`예산: ${entry.budget}`]:[]),
    ...(entry.method?[`상담 방식: ${entry.method}`]:[]),
    ...(entry.available_time?[`가능 시간: ${entry.available_time}`]:[]),
    '',
    `문의 내용: ${entry.message.slice(0,800)}`,
    '',
    `접수 시각: ${new Date(entry.created_at).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}`,
    ...(site?[`관리자 페이지: ${site}/admin/inquiries`]:[])
  ];
  return lines.join('\n');
}

export async function notifyNewInquiry(entry:InquiryNotice){
  const token=process.env.TELEGRAM_BOT_TOKEN;
  const chatId=process.env.TELEGRAM_CHAT_ID;
  if(!token||!chatId)return {sent:false,reason:'not-configured'} as const;
  try{
    const response=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:chatId,text:formatInquiryMessage(entry),disable_web_page_preview:true}),
      signal:AbortSignal.timeout(4000),
      cache:'no-store'
    });
    if(!response.ok){
      console.error('Telegram notification failed',response.status);
      return {sent:false,reason:`http-${response.status}`} as const;
    }
    return {sent:true} as const;
  }catch(error){
    console.error('Telegram notification error',error instanceof Error?error.message:'unknown');
    return {sent:false,reason:'network'} as const;
  }
}
