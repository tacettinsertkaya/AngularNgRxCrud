import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from '../product.state';

// get the feature selector
export const selectAppState = createFeatureSelector<AppState>('products');

// get all products
export const selectProducts = createSelector(
    selectAppState,
    (state: AppState) => state.products
);

// get product by ID
export const selectProductById = createSelector(
    selectProducts,
    (products: Product[], props: { productId: number }) =>
        products.find(product => product.id === props.productId)
);