import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from '../product.state';

// Get complete state of the  products in application
export const selectAppState = createFeatureSelector<AppState>('products');

// get All  products
export const selectProducts = createSelector(
    selectAppState,
    (state: AppState) => state.products
);

// get One  product by ID
export const selectProductById = createSelector(
    selectProducts,
    (products: Product[], props: { productId: number }) =>
        products.find(product => product.id === props.productId)
);