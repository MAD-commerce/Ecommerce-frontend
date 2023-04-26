import { NavBar, Footer, Loading } from '../../../components';

import { useProductsStore } from '../../../hooks';
import { Home, Categories } from './components';

import { useEffect } from 'react';

export const HomePage = () => {
	const { getAllProducts, products, status } = useProductsStore();

	useEffect(() => {
		// TODO: Aplicar un useMemo para los productos
		getAllProducts();
	}, []);

	if (status === 'not-ready') {
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
