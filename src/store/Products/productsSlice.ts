import { createSlice } from '@reduxjs/toolkit';

interface ProductsState {
	status: string;
	lastProduct: ProductInterface;
	products: {};
	errorMessage: undefined | string;
}

const initialState: ProductsState = {
	status: 'not-ready',
	lastProduct: {},
	products: {},
	errorMessage: undefined,
};

export const ProductsSlice = createSlice({
	name: 'Products',
	initialState,
	reducers: {
		onChecking: state => {
			state.status = 'not-ready';
			state.errorMessage = undefined;
		},
		onCreateProduct: (
			state: ProductsState,
			{ payload }: { payload: Record<string, unknown> }
		) => {
			state.status = 'checking';
			state.products = payload;
			state.errorMessage = undefined;
		},
		onGetAllProducts: (
			state: ProductsState,
			{ payload }: { payload: Record<string, unknown> }
		) => {
			state.status = 'ready';
			state.products = payload;
			state.errorMessage = undefined;
		},
		onGetProductById: (
			state: ProductsState,
			{ payload }: { payload: Record<string, unknown> }
		) => {
			state.status = 'ready';
			state.lastProduct = payload;
			state.errorMessage = undefined;
		},
		clearErrorMessage: (state: ProductsState) => {
			state.errorMessage = undefined;
		},
	},
});

export const {
	onChecking,
	onCreateProduct,
	onGetAllProducts,
	onGetProductById,
	clearErrorMessage,
} = ProductsSlice.actions;

export const productSliceReducer = ProductsSlice.reducer;

export { productSliceReducer as productsReducer };
export type { ProductsState as MyProductsState };
