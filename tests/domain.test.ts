import assert from 'node:assert/strict';
import test from 'node:test';
import {convertOrder,publishPage} from '../src/lib/domain';
import {mediaUsage} from '../src/lib/media';
import {initialData} from '../src/lib/seed';
import {inquirySchema,safeLink} from '../src/lib/schema';

test('페이지 초안·게시·버전·revision 계약',()=>{const state=initialData();const page=structuredClone(state.pages.about.draft);page.title='초안 제목';assert.equal(publishPage(state,'about',page,0,false),1);assert.equal(state.pages.about.draft.title,'초안 제목');assert.notEqual(state.pages.about.published.title,'초안 제목');assert.throws(()=>publishPage(state,'about',page,0,false),/다른 변경/);assert.equal(publishPage(state,'about',page,1,true),2);assert.equal(state.pages.about.published.title,'초안 제목');assert.equal(state.versions.length,1);});

test('문의 주문 전환은 같은 문의에 대해 멱등이다',()=>{const state=initialData();state.inquiries.push({id:'00000000-0000-4000-8000-000000000001',name:'검증 고객',phone:'010-1234-5678',email:'',kind:'inquiry',customer_type:'',product_id:'',region:'',budget:'',method:'',available_time:'',message:'테스트 문의 내용입니다.',consent_at:new Date().toISOString(),status:'신규',memo:'',created_at:new Date().toISOString()});const first=convertOrder(state,state.inquiries[0].id);const second=convertOrder(state,state.inquiries[0].id);assert.equal(first.id,second.id);assert.equal(state.orders.length,1);assert.equal(state.inquiries[0].status,'주문 진행');});

test('미디어 사용 위치는 초안·게시본·이력까지 보존 검사한다',()=>{const state=initialData();const url='/uploads/used.webp';state.pages.about.draft.sections[0].image=url;state.pages.about.published.sections[0].backgroundImage=url;state.versions.push({id:'v',page_slug:'about',document:structuredClone(state.pages.about.published),label:'검증',created_at:new Date().toISOString()});const usage=mediaUsage(state,url);assert.ok(usage.some(v=>v.includes('초안')));assert.ok(usage.some(v=>v.includes('게시본')));assert.ok(usage.some(v=>v.includes('게시 이력')));});

test('링크와 문의 동의는 서버 스키마에서 제한한다',()=>{assert.equal(safeLink.safeParse('javascript:alert(1)').success,false);assert.equal(safeLink.safeParse('/products?category=test').success,true);const valid={name:'홍길동',phone:'010-1234-5678',email:'',kind:'inquiry',customer_type:'',product_id:'',region:'',budget:'',method:'',available_time:'',message:'다섯 글자 이상의 문의입니다.',consent:true,website:''};assert.equal(inquirySchema.safeParse(valid).success,true);assert.equal(inquirySchema.safeParse({...valid,consent:false}).success,false);});
