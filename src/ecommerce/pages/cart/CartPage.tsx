import { Footer, Loading, NavBar } from '../../../components';

import { useProductsStore } from '../../../hooks';
import { ProductItem } from './ProductItem';
import { useEffect, useState } from 'react';

import './cart.css';

export const CartPage = () => {
	const { products = [], status, cart = [], getCartById } = useProductsStore();
	const [sumatory, setSumatory] = useState(0)

	useEffect(() => {
		getCartById();
	}, []);

	useEffect(() => {
		calculateSumatory();
	}, [cart]);

	const filtrarProductos = () => {
		if (Array.isArray(cart)) {
			const idsEnAmbasListas = products.filter((product: ProductInterface) =>
				cart.some((cart: Cart) => cart._id === product._id)
			);

			return idsEnAmbasListas;
		}

		return [];
	};

	const calculateSumatory = (): void => {
		let sum = 0;
		JSON.parse(JSON.stringify(filtrarProductos())).map((product: ProductInterface) => {
			sum += parseInt(calculateDiscount(product.price, product.discount));
		});
		setSumatory(sum);
	}

	const calculateDiscount = (price = '', discount = ''): string => {
		if (price && discount === '') return 'error';

		return (
			parseInt(price) -
			parseInt(price) * (parseInt(discount) / 100)
		).toFixed(2);
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

							<div className='cart__total'>
								<div className='cart__total-container'>
									<span className='total'>{`El total de su compra es: ${sumatory} `}</span>
								</div>
							</div>

							<button className='submit-button'>Comprar</button>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
