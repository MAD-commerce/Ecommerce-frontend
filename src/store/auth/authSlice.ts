import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	status: string;
	user: {};
	errorMessage: undefined | string;
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
		onChecking: (state: AuthState) => {
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (
			state: AuthState,
			{ payload }: { payload: Record<string, unknown> }
		) => {
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state: AuthState, { payload }: { payload: string }) => {
			state.status = 'not-authenticated';
			state.user = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: (state: AuthState) => {
			state.errorMessage = undefined;
		},
	},
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;

export const authSliceReducer = authSlice.reducer;

export { authSliceReducer as authReducer };
export type { AuthState as MyAuthState };
