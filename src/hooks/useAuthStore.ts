import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';

import {
	onChecking,
	onLogin,
	onLogout,
	clearErrorMessage,
} from '../store/auth/authSlice';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector(
		(state: { auth: AuthState }) => state.auth
	);
	const dispatch = useDispatch();

	const startLogin = async ({ email, password }: entryPeticion) => {
		dispatch(onChecking());

		try {
			// Todo: peticion
			dispatch(onLogin({ email, password }));
			console.log(email, password);
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({
		name,
		email,
		password,
	}: entryPeticionRegister) => {
		dispatch(onChecking());

		try {
			// Todo: peticion
			console.log(name, email, password);
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg || '---'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		try {
			// Todo: peticion
		} catch (error) {}
	};

	const startLogout = async () => {
		try {
			// Todo: peticion
		} catch (error) {}
	};

	return {
		// Propiedades
		status,
		user,
		errorMessage,

		// metodos
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
