# 운영 배포 순서

이 문서는 빈 Supabase 프로젝트와 Node.js 서버를 지원하는 호스팅에 처음 연결할 때의 순서다. 이 저장소에는 실제 프로젝트 키, 사용자 계정, 호스팅 연결 정보가 포함되지 않는다.

## 1. Supabase 초기화

1. SQL Editor에서 `supabase/migrations/001_initial.sql` 전체를 **한 번만** 실행한다. 이 스크립트는 새 빈 프로젝트용이고 하나의 transaction으로 실행된다. 같은 이름의 테이블 또는 정책이 있으면 실행하지 말고 현재 구조를 먼저 확인한다.
2. Authentication에서 운영 관리자 사용자를 만든다.
3. SQL Editor에서 해당 사용자의 UUID로 관리자 권한을 부여한다.

```sql
insert into public.profiles (id, display_name, is_admin)
values ('AUTH_USER_UUID', '관리자 이름', true)
on conflict (id) do update
set display_name = excluded.display_name, is_admin = true;
```

4. `media` bucket이 생성되었는지 확인한다. 공개 읽기만 허용하며 업로드·수정·삭제는 관리자 계정에서만 가능해야 한다.

## 2. 호스팅 환경 변수

Production과 Preview 환경에 다음 값을 설정한다. `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용이며 `NEXT_PUBLIC_` 접두사를 붙이면 안 된다.

```text
NEXT_PUBLIC_SITE_URL=https://actual-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
LOCAL_SANDBOX=false
```

배포 전에 다음을 실행한다. 값은 출력하지 않고 존재 여부와 URL 형식만 검사한다.

```powershell
npm run predeploy:check
npm run typecheck
npm run build
```

Netlify는 Next.js 13.5 이상 App Router와 SSR을 지원한다. 이 프로젝트는 `netlify.toml`에서 `@netlify/plugin-nextjs`를 명시해 SSR·Route Handler adapter가 빌드 로그에 생성되도록 한다. Dashboard의 Build command는 `npm run build`, Publish directory는 `.next`와 같아야 한다. SSR에서 쓰는 환경 변수는 `netlify.toml`이 아니라 Netlify UI 또는 CLI에 등록한다.

이 앱은 CMS 최신 데이터를 요청마다 읽도록 공개 레이아웃과 관리자 경로를 `force-dynamic`으로 설정했다. 따라서 실제 환경 변수를 넣지 않은 빌드를 운영으로 승격하면 안 된다.

## 3. CMS 초기화와 점검

1. 실제 도메인에서 `/admin/login`으로 관리자 로그인한다.
2. `/admin/settings`에서 **설정 저장**을 한 번 실행해 CMS 문서를 만든다.
3. `/admin/pages`에서 HOME, PRODUCTS, ABOUT, CONTACT를 각각 확인하고 **게시**한다. 각 페이지는 초안·공개본·버전 이력이 하나의 DB transaction으로 처리되지만, 네 페이지 초기화 자체는 이 순서로 진행한다.
4. 승인된 비운영 테스트 데이터로 공개 페이지, 관리자 로그인/RLS, 문의 저장, Storage 업로드와 사용 중 미디어 삭제 차단을 확인한다.

운영 도메인에서 검사할 항목은 다음과 같다: 익명 `/api/admin` 요청은 401, 일반 Auth 사용자는 관리자 화면과 Storage 쓰기가 거부, 공개 제품과 공개 페이지는 표시, 문의는 서버 API를 통해서만 저장, service-role 키는 브라우저 응답과 저장소에 노출되지 않음.
