import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	status: string;
	user: {};
	errorMessage: undefined;
}

const initialState: AuthState = {
	status: 'not-authenticated',
	user: {},
	errorMessage: undefined,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onChecking: state => {
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (state, { payload }) => {
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.user = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: state => {
			state.errorMessage = undefined;
		},
	},
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;

export const authSliceReducer = authSlice.reducer;

export { authSliceReducer as authReducer };
export type { AuthState as MyAuthState };
