import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';

import {
	onChecking,
	onLogin,
	onLogout,
	clearErrorMessage,
} from '../store/auth/authSlice';

import ecommerceApi from '../api/ecommerceApi';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector(
		(state: { auth: AuthState }) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const startLogin = async ({ email, password }: entryPeticion) => {
		dispatch(onChecking());

		try {
			const { data }: loginPeticion = await ecommerceApi.post('/auth/login', {
				email,
				password,
			});

			localStorage.setItem('token', data.token);

			const { uid, name } = data;

			dispatch(onLogin({ uid, email, name }));
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startLoginGoogle = async (response: any) => {
		dispatch(onChecking());

		var userObject: { email: string; name: string } = jwt_decode(
			response.credential
		);

		const { email, name } = userObject;

		try {
			const headers = {
				xtoken: response.credential,
			};

			const { data }: loginPeticionRenewJwtGoogle = await ecommerceApi.get(
				'/auth/renewJwtGoogle',
				{ headers }
			);

			navigate('/ecommerce', {
				replace: true,
			});

			localStorage.setItem('token', data.renewToken);

			dispatch(onLogin({ email, name }));
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	// Todo: Realizar
	const startRegister = async ({
		name,
		email,
		password,
	}: entryPeticionRegister) => {
		dispatch(onChecking());

		try {
			console.log(name, email, password);
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg || '---'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');

		if (!token) return dispatch(onLogout(''));

		try {
			const headers = {
				xtoken: localStorage.getItem('token'),
			};

			const { data } = await ecommerceApi.get('auth/renewJwt', { headers });
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-plate', `${new Date().getTime()}`);
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout(''));
		}
	};

	// Todo: Realizar
	const startLogout = async () => {
		try {
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
		startLoginGoogle,
	};
};
