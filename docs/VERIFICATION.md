# 검증 기록

- `npm run lint`: ESLint 오류를 확인합니다.
- `npm run typecheck`: TypeScript 타입을 확인합니다.
- `npm test`: 초안·게시 분리, revision 충돌, 주문 멱등성, 미디어 참조, 링크·동의 스키마를 검사합니다.
- `node scripts/integration-test.mjs`: 실행 중인 로컬 샌드박스에서 로그인, 익명 차단, CMS 비공개 제품 생성·수정·원복, 초안 충돌, 문의 검증·저장을 검사합니다. `통합 검증 고객` 문의 한 건은 남습니다.
- `npm run build`: 프로덕션 빌드를 생성합니다.

Supabase Auth, RLS, Storage와 실제 배포 환경은 연결 정보와 운영 관리자 계정이 제공된 뒤 별도 검증해야 합니다. 로컬 샌드박스는 실제 고객 접수, 결제, 공급처 발주 또는 Supabase 권한을 대체하지 않습니다.
