import { Footer, Loading, NavBar } from '../../../components';

import { useProductsStore } from '../../../hooks';
import { useEffect } from 'react';

import './cart.css';
import Swal from 'sweetalert2';

const ProductItem = ({
	_id = '',
	images,
	name,
	price,
	discount,
}: ProductInterface): JSX.Element => {
	const { deleteProductCardById } = useProductsStore();

	const calculateDiscount = (price = '', discount = ''): string => {
		if (price && discount === '') return 'error';

		return (
			parseInt(price) -
			parseInt(price) * (parseInt(discount) / 100)
		).toFixed(2);
	};

	const deleteProduct = () => {
		deleteProductCardById({ productId: _id });
		Swal.fire('', 'Producto eliminado correctamente!', 'success');
	};

	return (
		<>
			<div className='cart__product-container grid'>
				<div className='product__cart-information'>
					<div className='product-cart-image flex-center'>
						<img src={`data:image/png;base64,${images[0]}`} alt='' />
					</div>
					<div className='cart-information'>
						<h3>{name}</h3>
						<p className='information-available'>Disponible</p>
						{/* TODO: Agregar a las peticion de ingresar producto la talla y el color */}
						<p>Talla: M</p>
						<p>Color: ????</p>
						<button className='submit-button' onClick={() => deleteProduct()}>
							Eliminar
						</button>
					</div>
				</div>
				<div className='product__cart-prices'>
					<p className='product-price'>{`${calculateDiscount(
						price,
						discount
					)}`}</p>
					<p className='product-priceBefore'>{`$ ${price}`}</p>
					<p className='product-discount'>{`${discount}%`}</p>
				</div>
			</div>
			<hr />
		</>
	);
};

export const CartPage = () => {
	const { products = [], status, cart = [], getCartById } = useProductsStore();

	useEffect(() => {
		getCartById();
	}, []);

	const filtrarProductos = () => {
		if (Array.isArray(cart)) {
			const idsEnAmbasListas = products.filter((product: ProductInterface) =>
				cart.some((objeto: Cart) => objeto._id === product._id)
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
