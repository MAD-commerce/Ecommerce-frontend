import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../ecommerce/pages/HomePage';
import { useAuthStore } from '../hooks/useAuthStore';
import { Auth } from '../auth/pages/Auth';
import { Loading } from '../components/Loading';

export const AppRouter = (): JSX.Element => {
	const { status, checkAuthToken } = useAuthStore();

	// todo: verificar el token
	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === 'checking') {
		return <Loading />;
	}

	return (
		// todo: Hacer que cuando esta autenticado no pueda volver al login
		// todo: si se devuelve no se pierda el store del usuario
		<>
			<Routes>
				{status === 'authenticated' ? (
					<>
						<Route path='/*' element={<HomePage />} />
					</>
				) : (
					<>
						{localStorage.getItem('token') ? (
							<Route path='/ecommerce/homePage' element={<HomePage />} />
						) : (
							<Route path='/auth' element={<Auth />} />
						)}
						<Route path='/*' element={<Navigate to='/ecommerce/homePage' />} />
					</>
				)}
			</Routes>
		</>
	);
};
