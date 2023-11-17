import { createReducer, on } from '@ngrx/store';
import { add, clear, remove, update, updateAllState } from '../action/product.action';
import { AppState } from '../product.state';

export const initialState: AppState = {
    products: [
        { id: 1, name: 'Product 1', description: 'This is product 1', price: 100 },
        { id: 2, name: 'Product 2', description: 'This is product 2', price: 200 },
        { id: 3, name: 'Product 3', description: 'This is product 3', price: 300 },
    ],
};

export const productReducer = createReducer(
    initialState,
    on(add, (state, { product }) => (
        {
            ...state,
            products: [...state.products, product]
        }
    )
    ),
    on(update, (state, { product }) => {
        return {
            ...state,
            products: state.products.map(item => item.id === product.id ? product : item)
        }
    }),
    on(remove, (state, { product }) => ({
        ...state,
        products: state.products.filter((p) => product.id != p.id)
    })),
    on(updateAllState, (state, { products }) => (
        {
            ...state,
            products
        }
    )
    ),
    on(clear, state => initialState)
);