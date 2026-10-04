# FORME COFFEE 쇼룸

독립 커피머신 판매·상담 채널의 Next.js 기반 첫 버전입니다. 에이덴 공식 홈페이지나 공식 판매점임을 주장하지 않습니다. 고객 흐름은 제품 확인 → 상담 → 추천·견적 → 주문 전환 → 운영자가 기록하는 공급처 발주입니다.

## 로컬 실행 (Windows)

Node.js **20.9 이상**을 설치한 뒤 PowerShell에서 실행합니다.

```powershell
cd "C:\Users\OmniBook\Desktop\코덱스 홈페이지\homepage"
npm install
npm run sandbox
```

`http://127.0.0.1:3000`을 열고 `/admin/login`으로 갑니다. 이메일에는 아무 테스트 값을 넣고, `.local-data/access.json`의 `password`를 입력합니다. 이 파일과 로컬 문의·제품·페이지는 Git에 포함되지 않는 테스트 데이터입니다.

일반 개발은 `npm run dev`, 빌드는 `npm run build`, 품질 검사는 `npm run lint`, `npm run typecheck`, `npm test`입니다. 실행 중인 샌드박스의 HTTP 흐름 검사는 `node scripts/integration-test.mjs`입니다. 이 검사는 `통합 검증 고객` 문의 한 건을 남기고 임시 비공개 제품과 ABOUT 초안을 원복합니다.

## 일상적인 관리자 사용 순서

1. `/admin/media`에서 사진을 업로드하고 이름을 확인합니다. JPG/PNG/WebP/SVG는 최대 1600px WebP로 최적화됩니다. 사용 중인 사진은 삭제할 수 없습니다.
2. `/admin/products`에서 제품을 추가한 뒤 미디어 라이브러리의 사진을 선택하고, 공개 여부·추천 여부·가격 표시 방식을 저장합니다. HOME은 공개된 추천 제품을 우선 표시하며 추천 제품이 없으면 공개 제품을 표시합니다.
3. `/admin/pages`에서 HOME, PRODUCTS, ABOUT, CONTACT의 섹션을 클릭해 문구·이미지·버튼·간격·PC/태블릿/모바일 스타일을 수정합니다. 버튼 문구를 비우면 해당 버튼이 사라집니다. `초안 저장`은 공개 화면을 바꾸지 않고, `미리보기`는 초안을 보여 주며, `게시`만 공개본을 바꿉니다. 이력 복원도 초안에 적용되므로 다시 게시해야 합니다.
4. `/admin/inquiries`에서 접수 내용을 열어 상태와 담당 메모를 저장하고 상담 기록을 시간순으로 추가합니다. 주문이 확정되면 `주문 전환`을 누릅니다.
5. `/admin/orders`에서 주문 단계와 공급처 발주·배송·설치 메모를 기록합니다. 이 메모와 상태 변경은 외부 공급처로 자동 전송되지 않습니다.

## Supabase 운영 연결

`.env.example`을 `.env.local`로 복사한 뒤 기존 Supabase 프로젝트 값을 넣습니다. `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용 비밀값이며 브라우저에 노출하거나 Git에 올리면 안 됩니다.

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
LOCAL_SANDBOX=false
```

다음은 신규 연결의 순서입니다.

1. 기존 Supabase 프로젝트를 백업하고 `supabase/migrations/001_initial.sql`을 SQL Editor에서 실행합니다. 같은 이름의 테이블·정책이 이미 있으면 중단하고 구조를 먼저 확인합니다.
2. Supabase Dashboard의 Authentication → Users에서 운영 관리자 사용자를 만듭니다.
3. 그 사용자의 UUID를 확인한 프로젝트 소유자만 SQL Editor에서 아래를 실행합니다. 앱 화면으로는 관리자 승격을 할 수 없습니다.

```sql
insert into public.profiles (id, display_name, is_admin)
values ('AUTH_USER_UUID', '관리자 이름', true)
on conflict (id) do update set display_name = excluded.display_name, is_admin = true;
```

4. 해당 계정으로 `/admin`에 로그인해 `/admin/settings`에서 **설정 저장**을 한 번 실행합니다. 이 단계가 초기 CMS 문서를 DB에 저장합니다.
5. `/admin/pages`에서 **HOME, PRODUCTS, ABOUT, CONTACT**를 각각 열어 현재 내용을 확인하고 **게시**합니다. 초기에는 코드의 seed CMS/페이지가 읽기 fallback으로 표시될 수 있으므로, 이 작업을 마쳐야 운영 DB의 공개 콘텐츠가 명시적으로 초기화됩니다.
6. 승인된 비운영 데이터로 Auth, RLS, Storage 업로드·삭제, 공개 문의 저장을 확인한 뒤 운영을 시작합니다.

## 배포

이 프로젝트는 Google Sites가 아닌 Next.js 앱입니다. GitHub 저장소를 Netlify에 Import하고 위 환경 변수를 Preview와 Production에 입력합니다. Netlify는 이 Next.js 16 SSR 앱을 자동 감지하므로 별도 `netlify.toml`이 필요하지 않습니다. install 명령은 `npm install`, build 명령은 `npm run build`입니다. 배포 전 환경 검사와 Supabase 초기화·CMS 게시 순서는 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)를 따릅니다. 배포 후 실제 HTTPS 도메인으로 `NEXT_PUBLIC_SITE_URL`을 바꾸고 공개 페이지, `/sitemap.xml`, 관리자 로그인, 문의, 미디어 업로드를 다시 확인합니다.

## 현재 범위와 제한

첫 번째 목표인 HOME, 3D Hero, 제품 목록·상세, 상담·문의 저장, 관리자 로그인, 제품·문의·사이트 설정·메인 편집·미디어 업로드·모바일 화면은 구현 및 로컬 검증했습니다. CSV/Excel 제품 일괄 가져오기는 아직 구현하지 않았습니다. JOURNAL은 고정 초기 안내 콘텐츠이며 별도 게시물 CMS가 아닙니다. 실제 결제, 공급처 API 발주, 실제 사업자·법률 문구 확정, 실제 Supabase 연결과 배포는 이번 검증 범위에 포함되지 않습니다.

초기 제품명·사양·가격·운영 문구는 검증 전 예시입니다. 사진 원본은 수정하지 않고 프로젝트 WebP 복사본만 사용했습니다. 매핑은 `docs/image-sources.json`, 설계와 실제 검증 기록은 `docs/ARCHITECTURE.md`, `docs/VERIFICATION.md`에서 확인할 수 있습니다.
