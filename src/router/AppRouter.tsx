import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../ecommerce/pages/homePage/HomePage';
import { useAuthStore } from '../hooks/useAuthStore';
import { Auth } from '../auth/pages/Auth';
import { Loading } from '../components/loading/Loading';
import { ProductPage } from '../ecommerce/pages/productPage/ProductPage';

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
						<Route
							path='/ecommerce/product/:productId'
							element={<ProductPage />}
						/>
					</>
				) : (
					<>
						{localStorage.getItem('token') ? (
							<Route path='/ecommerce/homePage' element={<HomePage />} />
						) : (
							<Route path='/auth' element={<Auth />} />
						)}
						<Route path='/ecommerce/homePage' element={<HomePage />} />
						<Route
							path='/ecommerce/product/:productId'
							element={<ProductPage />}
						/>
						<Route path='/*' element={<Navigate to='/ecommerce/homePage' />} />
					</>
				)}
			</Routes>
		</>
	);
};
