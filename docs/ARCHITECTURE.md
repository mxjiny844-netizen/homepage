# 구현 설계 (2026-10-04)

초기 저장소는 README 하나만 있는 초기 상태(f94b94a)이다. 기존 설명은 README의 이력에 보존하고 신규 프로젝트를 추가한다. 브랜드는 임시 독립 브랜드 **FORME COFFEE**이며 공급처 공식 사이트 또는 공인 딜러 관계를 주장하지 않는다. 제품의 확인되지 않은 모델·스펙·가격은 입력하지 않는다.

## 구조와 데이터

Next.js 16 App Router / React 19 / TypeScript / Tailwind 4 / Motion. 공개 페이지는 서버에서 게시 데이터만 읽는다. JSON 기반 안전한 블록 렌더러를 편집기와 공개 페이지가 공유한다. desktop/tablet/mobile 속성은 같은 CSS 변수와 container query로 적용한다. 임의 HTML·JavaScript·CSS 코드 입력은 허용하지 않는다.

Supabase: profiles(관리자 자격), cms_state(상품/브랜드/카테고리/설정/메뉴/SEO/미디어/3D 전시 문서), pages(초안/게시본), section_versions(게시 이력), inquiries, consultation_logs, orders. 소규모 운영의 문서형 CMS는 단일 상태 레코드를 잠금과 revision으로 갱신하고, 개인 정보와 편집 버전은 별도 테이블로 분리한다. 상품 이미지·네비게이션·SEO는 문서 내부의 typed collection이다. 향후 CSV 어댑터/공급처 어댑터는 분리 가능하다.

## 인증과 권한

운영은 Supabase Auth 쿠키 및 서버 getUser() 확인 후 profiles.is_admin 검증. 회원이 자기 관리자 자격을 수정할 수 없다. RLS는 공개 CMS 읽기와 관리자 쓰기를 분리한다. 초안·고객·주문·버전은 관리자만 조회한다. 고객 입력은 서버 검증, honeypot, 속도 제한 후 저장한다. 관리자 변이는 Origin 검사와 세션 확인 후 수행한다. service-role key는 서버에서만 사용한다. 공개 문의 직접 DB insert는 금지한다.

Supabase 미연결이면 관리 로그인 및 문의 저장이 비활성이다. 명시적인 LOCAL_SANDBOX=true와 긴 LOCAL_ADMIN_PASSWORD가 있고 NODE_ENV가 production이 아닌 경우에만 localhost 서버의 샌드박스를 허용한다. 로그인 후 HMAC 서명한 HttpOnly 쿠키가 필요하다. 로컬 JSON은 서버 전용 .local-data에 atomic write, 직렬 갱신. 실제 서버/DB 연결을 흉내내지 않고 관리 화면에 모드를 표시한다.

## 게시 안전성

초안 저장과 게시를 분리한다. 게시 함수는 page row lock → expected revision 확인 → 버전 insert → published 교체를 하나의 DB transaction으로 수행한다. 로컬도 동일한 revision 계약과 원자 파일 교체를 사용한다. 버전 복원은 초안만 바꾼다. 상품/설정 CMS는 별도 저장 시 즉시 반영됨을 화면에서 명시한다.

## 미디어와 성능

제공된 사진만 복사·WebP 변환하며 원본 보존. 업로드는 관리자만, 10MB 제한, 실제 magic-byte/decoder 검사, SVG는 script/외부 참조/HTML 등을 거부 후 rasterize. Sharp로 WebP 최대 1600px. 사용 중 미디어 삭제 거부. Supabase 공개 media bucket은 읽기만 공개, 쓰기는 관리자. Next/Image와 lazy loading, 3D CSS transform + requestAnimationFrame, reduced-motion/탭 비활성 멈춤. GPU 60fps는 목표이며 실기기 측정은 별도다.

## 단계

1. 구조·Schema·실행 설정
2. 공개 브랜드/제품/상담 페이지와 3D 원통 전시
3. 인증·문의·상품·주문·미디어 CMS
4. 비주얼 편집·반응형 속성·게시/버전
5. 설정·메뉴·SEO·정책 템플릿
6. build/lint/typecheck/권한·CRUD·게시 테스트, 브라우저 QA, README

외부 Supabase 연결은 운영자가 기존 프로젝트 자격 정보를 나중에 입력한다. 비용 서비스 생성, 실데이터 적재, 공급처 자동 발주, 결제 및 실제 배포는 이번 구현 범위에서 실행하지 않는다.
