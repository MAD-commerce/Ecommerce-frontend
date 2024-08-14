import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';

import {
	onChecking,
	onLogin,
	onLogout,
	clearErrorMessage,
} from '../store/auth/authSlice';
import ecommerceApi, { updateAuthToken } from '../api/ecommerceApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

			updateAuthToken(data.token);

			dispatch(onLogin({ ...data }));
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startLoginGoogle = async (response: any) => {
		dispatch(onChecking());

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

			updateAuthToken(data.renewToken);

			dispatch(onLogin({ ...data }));
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
			const { data } = await ecommerceApi.post('auth/new', {
				name,
				email,
				password,
			});
			dispatch(onLogin({ ...data }));
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
			dispatch(onLogin({ name: data.name, uid: data.uid, role: data.role }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout(''));
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogout(''));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Su sección fue cerrada correctamente',
			showConfirmButton: false,
			timer: 1500,
		});
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
