import type {Product} from './schema';
export const MAX_COMPARE_PRODUCTS=3;
export function parseCompareIds(value:string|undefined,products:Product[]){const allowed=new Set(products.map(p=>p.id));return value?[...new Set(value.split(',').filter(id=>allowed.has(id)))].slice(0,MAX_COMPARE_PRODUCTS):[];}
export function compareHref(ids:string[],path='/compare'){return ids.length?`${path}?ids=${encodeURIComponent(ids.join(','))}`:path;}
