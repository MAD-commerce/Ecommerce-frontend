import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../ecommerce/pages/homePage/HomePage';
import { useAuthStore } from '../hooks/useAuthStore';
import { Auth } from '../auth/pages/Auth';
import { Loading } from '../components/loading/Loading';
import { ProductPage } from '../ecommerce/pages/productPage/ProductPage';
import { CartPage } from '../ecommerce/pages/cart/CartPage';
import { useProductsStore } from '../hooks';
import { SearchPage } from '../ecommerce/pages/SearchPage/SearchPage';
import { CreateNewProduct } from '../ecommerce/pages/createProduct/CreateNewProduct';

export const AppRouter = (): JSX.Element => {
	const { status, checkAuthToken, user } = useAuthStore();
	const { status: statusProduct } = useProductsStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === 'checking') {
		return <Loading />;
	}

	return (
		<>
			<Routes>
				{status === 'authenticated' ? (
					<>
						<Route path='/*' element={<HomePage />} />
						<Route
							path='/ecommerce/product/:productId'
							element={<ProductPage />}
						/>
						<Route path='/ecommerce/search' element={<SearchPage />} />
						<Route path='/ecommerce/cart' element={<CartPage />} />

						{user?.role === 'admin' ? (
							<Route
								path='/ecommerce/createProduct'
								element={<CreateNewProduct />}
							/>
						) : (
							<Route
								path='/ecommerce/createProduct'
								element={<Navigate to='/ecommerce/homePage' />}
							/>
						)}
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

						{statusProduct === 'ready' ? (
							<>
								<Route path='/ecommerce/cart' element={<Auth />} />
							</>
						) : (
							<Route
								path='/*'
								element={<Navigate to='/ecommerce/homePage' />}
							/>
						)}
						<Route path='/ecommerce/search' element={<SearchPage />} />
						<Route path='/*' element={<Navigate to='/ecommerce/homePage' />} />
					</>
				)}
			</Routes>
		</>
	);
};
