import type {Product} from './schema';
export const makeProduct=(id:string,name:string,brand:string,model:string,image:string,category:string,description:string,features:string[],overrides:Partial<Product>={}):Product=>({id,name,brand,model,image,gallery:[],video:'',category,description,features,specs:'JETINNO 공개 제품 자료를 한국어로 정리했습니다. 실제 공급 모델과 옵션은 상담 시 확인합니다.',size:'',weight:'',power:'',water:'',environment:'',usage:'확인 필요',price:null,priceMode:'상담 후 견적',featured:true,isNew:false,published:true,stock:'공급 여부 상담',seoTitle:'',seoDescription:'',...overrides});
export const specSheet=(rows:[string,string][])=>rows.map(([label,value])=>({label,value}));
export const matchesCategory=(product:Product,kind:string)=>!kind||product.category===kind||(product.tags??[]).includes(kind);
