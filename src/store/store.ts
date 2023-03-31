import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './auth/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSliceReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
