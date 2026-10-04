# FORME COFFEE 쇼룸

프리미엄 커피머신 상담형 쇼룸의 첫 번째 기반 프로젝트입니다. 공개 화면은 게시본만 보여 주며, 관리자는 `/admin`에서 제품, 문의, 주문·발주 기록, 3D 전시, 미디어, 메뉴, SEO와 사이트 정보를 관리합니다.

현재 저장소에는 실제 결제, 공급처 자동 발주, 실제 사업자 정보, 공식 판매점 관계 또는 실시간 Supabase 데이터가 포함되어 있지 않습니다. 초기 제품명과 운영 문구는 검증 전 예시이므로 운영 전에 실제 정보로 교체해야 합니다.

## 로컬 실행

Node.js 20 이상에서 실행합니다.

```powershell
npm install
npm run sandbox
```

`http://127.0.0.1:3000`을 열고 `/admin/login`에서 임의 이메일과 `.local-data/access.json`의 테스트 비밀번호로 로그인합니다. 이 파일과 로컬 문의·제품·페이지는 Git에 포함되지 않으며 실제 운영 데이터가 아닙니다.

일반 개발은 `npm run dev`, 배포 전 빌드는 `npm run build`, 검사는 `npm run lint`, `npm run typecheck`, `npm test`입니다. 샌드박스 HTTP 확인은 `node scripts/integration-test.mjs`를 사용합니다. 이 검사는 로컬에 `통합 검증 고객` 문의 한 건을 남기고 임시 비공개 제품과 ABOUT 초안을 원복합니다.

## 관리자 사용

`/admin/pages`에서 페이지와 섹션을 고르고 오른쪽 패널에서 문구, 버튼, 이미지, 배경, 여백, 열, PC·태블릿·모바일 속성을 편집합니다. 버튼 문구를 비우면 버튼이 제거됩니다. `초안 저장`은 공개 페이지를 바꾸지 않고, `미리보기`는 초안을 새 창에서 보이며, `게시`만 공개본을 변경합니다. 이력 복원은 초안에 적용되므로 다시 게시해야 합니다.

`/admin/products`에서 제품 공개/비공개와 추천 제품을 관리합니다. HOME 컬렉션은 공개된 추천 제품을 먼저 보여 주고 추천 제품이 없으면 공개 제품을 보여 줍니다. `/admin/media`는 JPG/PNG/WebP/SVG를 최대 1600px WebP로 최적화하며, 사용 중인 이미지는 삭제할 수 없습니다. `/admin/inquiries`에서 상태, 메모, 상담 기록과 주문 전환을 관리합니다. `/admin/orders`의 공급처 발주 메모는 외부로 전송되지 않는 내부 기록입니다.

## Supabase 연결

`.env.example`을 `.env.local`로 복사하고 기존 프로젝트 값으로 채웁니다. 비밀값은 Git에 올리지 않습니다.

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
LOCAL_SANDBOX=false
```

기존 프로젝트를 백업한 뒤 `supabase/migrations/001_initial.sql`을 SQL Editor에서 실행합니다. 이 migration은 데이터를 삭제하지 않지만 같은 이름의 기존 테이블이나 정책이 있으면 중단하고 구조를 확인합니다. `profiles.is_admin`은 기본적으로 false이고 앱에서 승격할 수 없습니다. 프로젝트 소유자가 Auth 사용자의 UUID를 확인한 뒤에만 SQL Editor에서 권한을 지정합니다.

```sql
insert into public.profiles (id, display_name, is_admin)
values ('AUTH_USER_UUID', '관리자 이름', true)
on conflict (id) do update set display_name = excluded.display_name, is_admin = true;
```

연결 후에는 승인된 비운영 데이터로 Auth, RLS, Storage와 문의 저장을 별도 검증합니다.

## Vercel 배포

이 프로젝트는 Google Sites가 아닌 Next.js 앱입니다. GitHub 저장소를 Vercel에 Import하고 환경 변수를 Preview/Production에 입력합니다. build 명령은 `npm run build`, install 명령은 `npm install`입니다. 배포 뒤 공개 페이지, `/sitemap.xml`, 관리자 로그인, 문의 제출과 미디어 업로드를 실제 환경에서 다시 확인합니다.

이미지 원본은 수정하지 않고 프로젝트 WebP 복사본만 사용했습니다. 매핑은 `docs/image-sources.json`, 구조와 검증은 `docs/ARCHITECTURE.md`, `docs/VERIFICATION.md`에 있습니다.
