import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product";

export const add = createAction('[Product] Add', props<{ product: Product }>());
export const update = createAction('[Product] Update', props<{ product: Product }>());
export const remove = createAction('[Product] Remove', props<{ product: Product }>());
export const updateAllState = createAction('[Product] Update all state of  products',
    props<{ products: Product[] }>());
export const clear = createAction('[Product] Clear');
