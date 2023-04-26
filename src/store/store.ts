import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './auth/authSlice';
import { productSliceReducer } from './Products/productsSlice';

export const store = configureStore({
	reducer: {
		auth: authSliceReducer,
		products: productSliceReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
