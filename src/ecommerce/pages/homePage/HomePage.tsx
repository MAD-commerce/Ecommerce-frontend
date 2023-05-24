import { useNavigate } from 'react-router-dom';
import { NavBar, Footer, Loading } from '../../../components';

import { useAuthStore, useProductsStore } from '../../../hooks';
import { Home, Categories, Images, Description } from './components';

import { useEffect } from 'react';

export const HomePage = () => {
	const { getAllProducts, products, status } = useProductsStore();
	const { user } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		getAllProducts();
	}, []);

	if (products.length === undefined) {
		return <Loading />;
	}

	return (
		<>
			<div className='App'>
				<NavBar type='header' />
				<main className='main'>
					<Home />
					<Images />
					<Description />

					<Categories products={products} />

					{user!.role === 'admin' ? (
						<div
							className='addProduct'
							onClick={() => navigate('/ecommerce/createProduct')}
						>
							<i className='bx bxs-pencil addProduct__icon'></i>
						</div>
					) : (
						<></>
					)}
				</main>
			</div>
			<Footer />
		</>
	);
};
