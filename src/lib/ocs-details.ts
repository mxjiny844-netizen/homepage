import type {Product} from './schema';

type ProductDetail=NonNullable<Product['detail']>;

export const ocsDetails:Record<string,ProductDetail>={
  'jetinno-jl31a':{
    tagline:'Fresh Milk, Every Cup · 듀얼 보일러·듀얼 펌프',
    highlights:[
      {title:'듀얼 보일러·듀얼 펌프',body:'커피와 우유를 동시에 준비해 대기 시간을 줄입니다.',image:'/machines/jetinno-jl31a-feature-1.webp'},
      {title:'S14/S20 추출기',body:'프리인퓨전과 중력 방식으로 안정적인 에스프레소를 추출합니다.',image:'/machines/jetinno-jl31a-feature-2.webp'},
      {title:'자동 생우유 거품',body:'카푸치노·라떼 등 다양한 우유 음료를 제공합니다.',image:'/machines/jetinno-jl31a-feature-3.webp'}
    ]
  },
  'jetinno-jl31b':{
    tagline:'10.1-inch Touch · 생우유 전자동',
    highlights:[
      {title:'10.1인치 터치스크린',body:'안드로이드 기반의 직관적인 메뉴를 제공합니다.',image:'/machines/jetinno-jl31b-feature-1.webp'},
      {title:'듀얼 보일러·듀얼 펌프',body:'커피와 우유를 동시에 준비해 운영 효율을 높입니다.',image:'/machines/jetinno-jl31b-feature-2.webp'},
      {title:'자동 세척·유지관리',body:'자동 헹굼과 세척 옵션으로 관리가 간편합니다.',image:'/machines/jetinno-jl31b-feature-3.webp'}
    ]
  },
  'jetinno-jl29b':{
    tagline:'The Office Essential · 커피 중심의 전자동',
    highlights:[
      {title:'64mm 특수강 플랫버',body:'9단계 분쇄 조절로 균일한 분쇄를 유지합니다.',image:'/machines/jetinno-jl29b-feature-1.webp'},
      {title:'S14/S20 추출기',body:'프리인퓨전과 중력 방식으로 안정적인 추출을 제공합니다.',image:'/machines/jetinno-jl29b-feature-2.webp'},
      {title:'전면 분리형 브루어',body:'기계 앞에서 추출기를 분리해 간편하게 세척할 수 있습니다.',image:'/machines/jetinno-jl29b-front.webp'}
    ]
  },
  'jetinno-jl30':{
    tagline:'Fresh Milk for Small Spaces · 14g/20g 브루어',
    highlights:[
      {title:'분리형 브루어',body:'전면에서 추출기를 분리해 간편하게 세척합니다.',image:'/machines/jetinno-jl30-feature-1.webp'},
      {title:'고품질 생우유 거품',body:'듀얼 보일러로 부드러운 우유 거품을 만듭니다.',image:'/machines/jetinno-jl30-feature-2.webp'},
      {title:'14g/20g 브루어 선택',body:'커피량에 맞춰 추출기를 선택할 수 있습니다.',image:'/machines/jetinno-jl30-feature-3.webp'}
    ]
  },
  'jetinno-jl15':{
    tagline:'Compact Fresh Milk · 작은 공간의 선택',
    highlights:[
      {title:'컴팩트한 본체',body:'작은 설치 공간에서도 다양한 음료를 제공합니다.',image:'/machines/jetinno-jl15-feature-1.webp'},
      {title:'고품질 생우유 거품',body:'전용 우유 거품 시스템으로 부드러운 밀크폼을 만듭니다.',image:'/machines/jetinno-jl15-feature-2.webp'},
      {title:'전문 그라인더',body:'특수강 플랫버로 균일한 분쇄를 유지합니다.',image:'/machines/jetinno-jl15-feature-3.webp'}
    ]
  }
};
