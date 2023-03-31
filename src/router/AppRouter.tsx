import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { HomePage } from '../ecommerce/pages/HomePage';
import { useAuthStore } from '../hooks/useAuthStore';

export const AppRouter = (): JSX.Element => {
	const { status, checkAuthToken } = useAuthStore();

	// todo: verificar el token
	// useEffect(() => {
	// 	checkAuthToken();
	// }, []);

	if (status === 'checking') {
		return <h1>carganding</h1>;
	}

	return (
		<>
			<Routes>
				{status === 'authenticated' ? (
					<>
						<Route path='' />
					</>
				) : (
					<>
						<Route path='/auth/login' element={<LoginPage />} />
						<Route path='/auth/register' element={<RegisterPage />} />
						<Route path='/ecommerce/homePage' element={<HomePage />} />
						{/* todo: que navegue al homepage */}
						<Route path='/*' element={<Navigate to='/ecommerce/homePage' />} />
					</>
				)}
			</Routes>
		</>
	);
};
