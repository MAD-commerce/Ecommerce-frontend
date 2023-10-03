import { Footer, Loading, NavBar } from '../../../components';

import { useProductsStore } from '../../../hooks';
import { ProductItem } from './ProductItem';
import { useEffect } from 'react';

import './cart.css';

export const CartPage = () => {
	const { products = [], status, cart = [], getCartById } = useProductsStore();

	useEffect(() => {
		getCartById();
	}, []);

	const filtrarProductos = () => {
		if (Array.isArray(cart)) {
			const idsEnAmbasListas = products.filter((product: ProductInterface) =>
				cart.some((cart: Cart) => cart._id === product._id)
			);

			return idsEnAmbasListas;
		}

		return [];
	};

	if (status === 'not-ready') {
		return <Loading />;
	}

	return (
		<>
			<div className='app'>
				<NavBar type='header' />

				<main className='cart__body'>
					<section className='section' id='cart'>
						<div className='cart_container container grid'>
							<h1 className='cart__title'>Carrito de compras</h1>
							<hr />
							{filtrarProductos().length === 0 ? (
								<div className='menssage__empty flex-center'>
									<h1>Carrito vacío!</h1>
								</div>
							) : (
								JSON.parse(JSON.stringify(filtrarProductos())).map(
									(product: ProductInterface) => (
										<ProductItem
											key={product._id}
											_id={product._id}
											name={product.name}
											price={product.price}
											discount={product.discount}
											images={product.images}
											type={product.type}
										/>
									)
								)
							)}

							<button className='submit-button'>Comprar</button>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
