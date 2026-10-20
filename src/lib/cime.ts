import type {Product} from './schema';
import {makeProduct,specSheet} from './product';

const cimeProduct=(
  id:string,
  name:string,
  model:string,
  image:string,
  gallery:string[],
  description:string,
  features:string[],
  overrides:Partial<Product>={}
):Product=>makeProduct(id,name,'CIME',model,image,'반자동',description,features,{
  gallery,
  water:'수도 직결 / 설치 조건 상담',
  usage:'상담 시 확인',
  environment:'카페·레스토랑·베이커리',
  featured:false,
  stock:'공급 여부 상담',
  specs:'공개된 제품 자료의 사양을 기준으로 정리했습니다. 실제 공급 사양·색상·옵션은 상담 시 확인합니다.',
  ...overrides
});

export const cimeProducts:Product[]=[
  cimeProduct(
    'cime-new-signature',
    'CIME 뉴 시그니처',
    'NEW SIGNATURE (2 Group / 3 Group)',
    '/machines/cime-new-signature.webp',
    ['/machines/cime-new-signature-2.webp','/machines/cime-new-signature-3.webp'],
    '씨메 베스트셀러 05 시그니처의 새로운 디자인에 멀티보일러 시스템을 적용한 모델입니다. E61 인퓨전 챔버 그룹 헤드와 강화된 쿨터치 스팀 완드, 헤드별 1L 커피 보일러와 330W 고출력 모터 펌프로 안정적인 추출과 온도 유지를 구현합니다. 카페·레스토랑·프랜차이즈 등 다양한 공간에 어울리는 실용적인 디자인입니다.',
    ['헤드별 1L 멀티보일러 시스템','E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프','터치스크린 디스플레이와 한글 지원'],
    {
      size:'800 × 600 × 460mm (2 Group)',
      weight:'71kg (2 Group)',
      power:'4,700W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','NEW SIGNATURE'],
        ['버전','2 Group / 3 Group'],
        ['보일러','Steam 8.5L / Coffee 1L × 2 (2 Group) · Steam 11.5L / Coffee 1L × 3 (3 Group)'],
        ['크기','800 × 600 × 460mm (2 Group) · 1,010 × 600 × 460mm (3 Group)'],
        ['무게','71kg (2 Group) · 82kg (3 Group)'],
        ['전원','4,700W (2 Group) · 6,000W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['디스플레이','터치스크린, 한글 지원'],
        ['스팀','쿨터치 스팀 완드'],
        ['KC 인증','2GR HW07348-23027D · 3GR HW07348-24031A']
      ]),
      seoTitle:'CIME 뉴 시그니처 반자동 커피머신',
      seoDescription:'CIME 뉴 시그니처의 멀티보일러, E61 그룹 헤드와 2·3그룹 공개 사양을 확인하세요.'
    }
  ),
  cimeProduct(
    'cime-co-03-neo-1gr',
    'CIME CO-03 Neo 1GR',
    'CO-03 Neo 1GR',
    '/machines/cime-co-03-neo-1gr.webp',
    ['/machines/cime-co-03-neo-1gr-2.webp','/machines/cime-co-03-neo-1gr-3.webp'],
    'CO-03 네오의 1그룹 버전으로, 카페·베이커리 등 소규모 상업 공간에 맞춘 에스프레소 머신입니다. 5L 열교환식 보일러와 1,700W 저전력 설계로 전기 증설 부담을 줄였고, 스팀 레버와 쿨터치 스팀 노즐을 갖췄습니다.',
    ['소규모 매장·커피차·샵인샵에 적합한 1그룹','전기 증설이 필요 없는 1,700W 저전력','5L 열교환식 보일러와 프리인퓨전 ON/OFF','사이드 LED와 바리스타 라이트'],
    {
      size:'530 × 530 × 450mm',
      weight:'37kg',
      power:'1,700W / 220V',
      environment:'소규모 카페·베이커리·커피차',
      specSheet:specSheet([
        ['모델','CO-03 Neo'],
        ['버전','1 Group'],
        ['보일러','5L 열교환식'],
        ['크기','530 × 530 × 450mm'],
        ['무게','37kg'],
        ['전원','1,700W'],
        ['전원 공급','220V'],
        ['그룹 헤드','E61'],
        ['스팀','레버 스팀 / 쿨터치 스팀 노즐'],
        ['디스플레이','추출 상태 및 설정 표시'],
        ['KC 인증','HW07348-23029C']
      ]),
      seoTitle:'CIME CO-03 Neo 1GR 반자동 커피머신',
      seoDescription:'소규모 매장을 위한 CIME CO-03 Neo 1GR의 5L 보일러와 저전력 사양.'
    }
  ),
  cimeProduct(
    'cime-luna-sb-20-timer-1gr',
    'CIME LUNA SB-20 TIMER 1GR',
    'LUNA SB-20 TIMER 1GR',
    '/machines/cime-luna-sb-20-timer-1gr.webp',
    ['/machines/cime-luna-sb-20-timer-1gr-2.webp','/machines/cime-luna-sb-20-timer-1gr-3.webp'],
    '달의 아름다움과 기능성에서 영감을 받은 1그룹 에스프레소 머신입니다. 디지털 샷 타이머, 5L 열교환식 보일러, 1,800W 저전력 설계로 소규모 매장과 커피차에 적합합니다.',
    ['소규모 매장·커피차·샵인샵 추천','1,800W 저전력, 5L 열교환식 보일러','디스플레이가 적용된 디지털 샷 타이머','12mm 쿨터치 스팀 노즐'],
    {
      size:'400 × 560 × 450mm',
      weight:'29kg',
      power:'1,800W / 220V',
      environment:'소규모 카페·베이커리·커피차',
      specSheet:specSheet([
        ['모델','LUNA SB-20 TIMER'],
        ['버전','1 Group'],
        ['보일러','5L 열교환식'],
        ['크기','400 × 560 × 450mm'],
        ['무게','29kg'],
        ['전원','1,800W'],
        ['전원 공급','220V'],
        ['타이머','디지털 샷 타이머'],
        ['스팀','12mm 쿨터치 스팀 노즐'],
        ['수위 제어','전자식 자동 수위 조절'],
        ['KC 인증','HW07348-24032A']
      ]),
      seoTitle:'CIME LUNA SB-20 TIMER 1GR 반자동 커피머신',
      seoDescription:'CIME LUNA SB-20 TIMER 1GR의 디지털 샷 타이머와 컴팩트 사양.'
    }
  ),
  cimeProduct(
    'cime-luna-pro-sb-20-timer',
    'CIME LUNA PRO SB-20 TIMER',
    'LUNA PRO SB-20 TIMER',
    '/machines/cime-luna-pro-sb-20-timer.webp',
    ['/machines/cime-luna-pro-sb-20-timer-2.webp','/machines/cime-luna-pro-sb-20-timer-3.webp'],
    '한국 시장을 위한 스페셜 모델로, 올블랙·올화이트 무광 코팅과 레버형 스팀, 디지털 샷 타이머, AISI 316 스테인리스 쿨터치 스팀 완드를 갖췄습니다.',
    ['한국 시장 전용 스페셜 모델','올블랙·올화이트 무광 코팅','디지털 샷 타이머와 레버형 스팀','AISI 316 스테인리스 쿨터치 스팀 완드'],
    {
      size:'760 × 560 × 450mm',
      weight:'62kg',
      power:'3,000W / 220–380V',
      environment:'카페·베이커리·레스토랑',
      specSheet:specSheet([
        ['모델','LUNA PRO SB-20 TIMER'],
        ['버전','2 Group'],
        ['보일러','11.5L'],
        ['크기','760 × 560 × 450mm'],
        ['무게','62kg'],
        ['전원','3,000W'],
        ['전원 공급','220V / 380V'],
        ['색상','토탈블랙 / 토탈화이트'],
        ['스팀','레버형 스팀, AISI 316 쿨터치 스팀 완드'],
        ['디스플레이','디지털 샷 타이머'],
        ['KC 인증','HW07348-24033A']
      ]),
      seoTitle:'CIME LUNA PRO SB-20 TIMER 반자동 커피머신',
      seoDescription:'한국 시장 전용 CIME LUNA PRO SB-20 TIMER의 색상과 공개 사양.'
    }
  ),
  cimeProduct(
    'cime-22-retro',
    'CIME 22 레트로',
    '22 RETRO (2 Group / 3 Group)',
    '/machines/cime-22-retro.webp',
    ['/machines/cime-22-retro-2.webp','/machines/cime-22-retro-3.webp'],
    'E61 인퓨전 챔버 그룹 헤드와 레트로 디자인을 결합한 모델입니다. 후면 패널 커스터마이징이 가능하고, 쿨터치 스팀 완드와 330W 고출력 모터 펌프를 갖췄습니다.',
    ['E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프','12L·18L 열교환식 보일러','후면 패널 커스텀 디자인'],
    {
      size:'780 × 550 × 490mm (2 Group)',
      weight:'71kg (2 Group)',
      power:'3,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','22 RETRO'],
        ['버전','2 Group / 3 Group'],
        ['보일러','12L (2 Group) · 18L (3 Group)'],
        ['크기','780 × 550 × 490mm (2 Group) · 990 × 550 × 490mm (3 Group)'],
        ['무게','71kg (2 Group) · 83kg (3 Group)'],
        ['전원','3,000W (2 Group) · 5,000W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['스팀','쿨터치 스팀 완드'],
        ['색상','실버 (satin stainless steel)']
      ]),
      seoTitle:'CIME 22 레트로 반자동 커피머신',
      seoDescription:'CIME 22 레트로의 E61 그룹 헤드와 후면 커스텀 디자인 사양.'
    }
  ),
  cimeProduct(
    'cime-co-00-zero',
    'CIME CO-00 제로',
    'CO-00 ZERO',
    '/machines/cime-co-00-zero.webp',
    ['/machines/cime-co-00-zero-2.webp','/machines/cime-co-00-zero-3.webp'],
    '씨메의 엔트리 레벨 가성비 모델로, 03·05 시리즈와 동일한 보일러 구조와 내부 하드웨어를 사용해 추출 퍼포먼스를 유지합니다. 모던한 반달형 곡선 디자인이 특징입니다.',
    ['12L 열교환식 보일러','프리인퓨전 ON/OFF','추출 시간 타이머','바리스타 라이트와 오토클리닝'],
    {
      size:'750 × 540 × 450mm',
      weight:'55kg',
      power:'3,000W / 220–380V',
      environment:'카페·베이커리·소규모 매장',
      specSheet:specSheet([
        ['모델','CO-00 ZERO'],
        ['버전','2 Group'],
        ['보일러','12L 열교환식'],
        ['크기','750 × 540 × 450mm'],
        ['무게','55kg'],
        ['전원','3,000W'],
        ['전원 공급','220V / 380V'],
        ['프리인퓨전','ON/OFF 설정'],
        ['스팀','다이얼 스팀'],
        ['디스플레이','추출 시간 타이머'],
        ['특징','바리스타 라이트, 오토클리닝, 긴급 추출 버튼']
      ]),
      seoTitle:'CIME CO-00 제로 반자동 커피머신',
      seoDescription:'CIME CO-00 제로의 12L 보일러와 가성비 사양을 확인하세요.'
    }
  ),
  cimeProduct(
    'cime-co-03-neo',
    'CIME CO-03 네오',
    'CO-03 NEO',
    '/machines/cime-co-03-neo.webp',
    ['/machines/cime-co-03-neo-2.webp','/machines/cime-co-03-neo-3.webp'],
    '낮은 높이와 모던한 디자인의 2그룹 에스프레소 머신입니다. 12L 열교환식 보일러, 프리인퓨전, 사이드 LED, 바리스타 라이트, 3단계 드레인판 조절을 갖췄습니다.',
    ['12L 열교환식 보일러','프리인퓨전 ON/OFF와 추출량 설정','사이드 LED와 바리스타 라이트','3단계 드레인판 높이 조절'],
    {
      size:'720 × 530 × 460mm',
      weight:'55kg',
      power:'3,000W / 220–380V',
      environment:'카페·베이커리·레스토랑',
      specSheet:specSheet([
        ['모델','CO-03 NEO'],
        ['버전','2 Group'],
        ['보일러','12L 열교환식'],
        ['크기','720 × 530 × 460mm'],
        ['무게','55kg'],
        ['전원','3,000W'],
        ['전원 공급','220V / 380V'],
        ['프리인퓨전','ON/OFF 설정'],
        ['스팀','레버 스팀 / 쿨터치 스팀 노즐'],
        ['디스플레이','추출 상태 및 설정 표시'],
        ['KC 인증','HW07348-22023C']
      ]),
      seoTitle:'CIME CO-03 네오 반자동 커피머신',
      seoDescription:'CIME CO-03 네오의 12L 보일러와 2그룹 공개 사양.'
    }
  ),
  cimeProduct(
    'cime-co-05-signature-totalwhite',
    'CIME CO-05 시그니처 토탈화이트',
    'CO-05 Signature Total White',
    '/machines/cime-co-05-signature-totalwhite.webp',
    ['/machines/cime-co-05-signature-totalwhite-2.webp','/machines/cime-co-05-signature-totalwhite-3.webp'],
    'CO-05 시그니처의 커스텀 에디션으로, 화이트 컬러와 멀티보일러 시스템을 갖춘 모델입니다. E61 인퓨전 챔버 그룹 헤드와 쿨터치 스팀 완드, 헤드별 1L 커피 보일러로 안정적인 추출을 제공합니다.',
    ['화이트 커스텀 에디션','헤드별 1L 멀티보일러 시스템','E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프'],
    {
      size:'740 × 540 × 500mm (2 Group)',
      weight:'63kg (2 Group)',
      power:'5,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','CO-05 Signature Total White'],
        ['버전','2 Group / 3 Group'],
        ['보일러','Steam 8.5L / Coffee 1L × 2 (2 Group) · Steam 11L / Coffee 1L × 3 (3 Group)'],
        ['크기','740 × 540 × 500mm (2 Group) · 950 × 540 × 500mm (3 Group)'],
        ['무게','63kg (2 Group) · 80kg (3 Group)'],
        ['전원','5,000W (2 Group) · 6,600W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['스팀','쿨터치 스팀 완드'],
        ['색상','토탈화이트']
      ]),
      seoTitle:'CIME CO-05 시그니처 토탈화이트',
      seoDescription:'화이트 커스텀 에디션 CIME CO-05 시그니처의 멀티보일러 사양.'
    }
  ),
  cimeProduct(
    'cime-co-05-signature',
    'CIME CO-05 시그니처',
    'CO-05 Signature',
    '/machines/cime-co-05-signature.webp',
    ['/machines/cime-co-05-signature-2.webp','/machines/cime-co-05-signature-3.webp'],
    '이상적인 텍스처와 클린컵을 구현하는 CO-05 시그니처입니다. 멀티보일러 시스템, 헤드별 1L 커피 보일러, 330W 고출력 모터 펌프, E61 인퓨전 챔버 그룹 헤드를 갖췄습니다.',
    ['멀티보일러 시스템','헤드별 1L 커피 보일러','E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프'],
    {
      size:'740 × 540 × 500mm (2 Group)',
      weight:'63kg (2 Group)',
      power:'5,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','CO-05 Signature'],
        ['버전','2 Group / 3 Group'],
        ['보일러','Steam 8.5L / Coffee 1L × 2 (2 Group) · Steam 11L / Coffee 1L × 3 (3 Group)'],
        ['크기','740 × 540 × 500mm (2 Group) · 950 × 540 × 500mm (3 Group)'],
        ['무게','63kg (2 Group) · 80kg (3 Group)'],
        ['전원','5,000W (2 Group) · 6,600W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['스팀','쿨터치 스팀 완드'],
        ['색상','실버']
      ]),
      seoTitle:'CIME CO-05 시그니처 반자동 커피머신',
      seoDescription:'CIME CO-05 시그니처의 멀티보일러와 E61 그룹 헤드 사양.'
    }
  ),
  cimeProduct(
    'cime-co-05-signature-totalblack',
    'CIME CO-05 시그니처 토탈블랙',
    'CO-05 Signature Total Black',
    '/machines/cime-co-05-signature-totalblack.webp',
    ['/machines/cime-co-05-signature-totalblack-2.webp','/machines/cime-co-05-signature-totalblack-3.webp'],
    'CO-05 시그니처의 토탈블랙 커스텀 에디션입니다. E61 헤드와 쿨터치 스팀 완드, 멀티보일러 시스템, 헤드별 1L 커피 보일러를 갖춰 고급스러운 공간에 어울립니다.',
    ['토탈블랙 커스텀 에디션','헤드별 1L 멀티보일러 시스템','E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프'],
    {
      size:'740 × 540 × 500mm (2 Group)',
      weight:'63kg (2 Group)',
      power:'5,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','CO-05 Signature Total Black'],
        ['버전','2 Group / 3 Group'],
        ['보일러','Steam 8.5L / Coffee 1L × 2 (2 Group) · Steam 11L / Coffee 1L × 3 (3 Group)'],
        ['크기','740 × 540 × 500mm (2 Group) · 950 × 540 × 500mm (3 Group)'],
        ['무게','63kg (2 Group) · 80kg (3 Group)'],
        ['전원','5,000W (2 Group) · 6,600W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['스팀','쿨터치 스팀 완드'],
        ['색상','토탈블랙']
      ]),
      seoTitle:'CIME CO-05 시그니처 토탈블랙',
      seoDescription:'블랙 커스텀 에디션 CIME CO-05 시그니처의 공개 사양.'
    }
  ),
  cimeProduct(
    'cime-co-05-pid',
    'CIME CO-05 PID',
    'CO-05 PID (2 Group / 3 Group)',
    '/machines/cime-co-05-pid.webp',
    ['/machines/cime-co-05-pid-2.webp','/machines/cime-co-05-pid-3.webp'],
    'PID 온도 제어와 터치스크린 디스플레이를 갖춘 CO-05 업그레이드 모델입니다. 프리인퓨전 타임과 추출량을 설정할 수 있고, 12L·18L 보일러와 2·3그룹 버전을 선택할 수 있습니다.',
    ['안정적인 PID 온도 컨트롤','터치스크린 디스플레이','프리인퓨전 타임 설정','12L·18L 보일러, 2·3그룹 선택'],
    {
      size:'740 × 540 × 500mm (2 Group)',
      weight:'55kg (2 Group)',
      power:'3,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','CO-05 PID'],
        ['버전','2 Group / 3 Group'],
        ['보일러','12L (2 Group) · 18L (3 Group)'],
        ['크기','740 × 540 × 500mm (2 Group) · 950 × 540 × 500mm (3 Group)'],
        ['무게','55kg (2 Group) · 68kg (3 Group)'],
        ['전원','3,000W (2 Group) · 5,000W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['온도 제어','PID'],
        ['디스플레이','터치스크린'],
        ['색상','블랙·화이트·다크·퍼플·라이트 그레이 등 12가지'],
        ['KC 인증','2GR HW07348-24035A · 3GR HW07348-24034A']
      ]),
      seoTitle:'CIME CO-05 PID 반자동 커피머신',
      seoDescription:'CIME CO-05 PID의 PID 온도 제어와 2·3그룹 공개 사양.'
    }
  ),
  cimeProduct(
    'cime-co-05-signature-totalgold',
    'CIME CO-05 시그니처 토탈골드',
    'CO-05 Signature Total Gold',
    '/machines/cime-co-05-signature-totalgold.webp',
    ['/machines/cime-co-05-signature-totalgold-2.webp','/machines/cime-co-05-signature-totalgold-3.webp'],
    '24K 골드 컬러 특수 코팅을 적용한 CO-05 시그니처 커스텀 에디션입니다. E61 인퓨전 챔버 그룹 헤드, 쿨터치 스팀 완드, 멀티보일러 시스템을 갖춰 고급스러운 공간에 어울립니다.',
    ['24K 골드 컬러 특수 코팅','헤드별 1L 멀티보일러 시스템','E61 인퓨전 챔버 그룹 헤드','330W 고출력 모터 펌프'],
    {
      size:'740 × 540 × 500mm (2 Group)',
      weight:'63kg (2 Group)',
      power:'5,000W (2 Group) / 220–380V',
      environment:'카페·레스토랑·프랜차이즈',
      specSheet:specSheet([
        ['모델','CO-05 Signature Total Gold'],
        ['버전','2 Group / 3 Group'],
        ['보일러','Steam 8.5L / Coffee 1L × 2 (2 Group) · Steam 11L / Coffee 1L × 3 (3 Group)'],
        ['크기','740 × 540 × 500mm (2 Group) · 950 × 540 × 500mm (3 Group)'],
        ['무게','63kg (2 Group) · 80kg (3 Group)'],
        ['전원','5,000W (2 Group) · 6,600W (3 Group)'],
        ['전원 공급','220V / 380V'],
        ['그룹 헤드','E61 인퓨전 챔버'],
        ['펌프','330W 고출력 모터 펌프'],
        ['스팀','쿨터치 스팀 완드'],
        ['색상','토탈골드 (24K 특수 코팅)']
      ]),
      seoTitle:'CIME CO-05 시그니처 토탈골드',
      seoDescription:'24K 골드 커스텀 에디션 CIME CO-05 시그니처의 공개 사양.'
    }
  )
];
