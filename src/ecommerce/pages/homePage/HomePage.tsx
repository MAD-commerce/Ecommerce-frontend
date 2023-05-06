import { NavBar, Footer, Loading } from '../../../components';

import { useProductsStore } from '../../../hooks';
import { Home, Categories } from './components';

import { useEffect } from 'react';

export const HomePage = () => {
	const { getAllProducts, products, status } = useProductsStore();

	useEffect(() => {
		getAllProducts();
	}, []);

	// TODO: Verificar esto si es mejor con estatus o con undefined
	if (products.length === undefined) {
		return <Loading />;
	}

	return (
		<>
			<div className='App'>
				<NavBar type='header' />
				<main className='main'>
					<Home />
					{/* <Popular /> */}

					<Categories products={products} />
				</main>
			</div>
			<Footer />
		</>
	);
};
