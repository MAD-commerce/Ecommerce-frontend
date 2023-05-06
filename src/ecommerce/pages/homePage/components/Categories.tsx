import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProductsStore } from '../../../../hooks';
import Swal from 'sweetalert2';

const Product = ({
	_id = '',
	name,
	price,
	images,
}: ProductInterface): JSX.Element => {
	const { updateCart } = useProductsStore();
	const navigate = useNavigate();

	const seeProduct = () => {
		navigate(`/ecommerce/product/${_id}`);
	};

	const sendProduct = () => {
		updateCart({ _id });
		Swal.fire('Buen trabajo', 'Producto agregado correctamente!', 'success');
	};

	// var base64Icon = `data:image/png;base64,${image}`;

	return (
		<div className='product__box'>
			<div className='product__box-background flex-center'>
				<img
					src={`data:image/png;base64,${images[0]}`}
					alt='Bape'
					className='product__box-image'
				/>
			</div>
			<div className='product__box-information'>
				<div className='product__information'>
					<p className='product__information-name'>{name}</p>
					<div className='prices'>
						<p className='product__information-price'>{price}</p>
					</div>
				</div>
				<div className='flex-center'>
					<div
						className='product__button-cart flex-center'
						onClick={() => seeProduct()}
					>
						<i className='bx bx-fullscreen'></i>
					</div>
					<div
						className='product__button-cart flex-center'
						onClick={() => sendProduct()}
					>
						<i className='bx bx-cart-add'></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Categories = ({ products }: { products: any }): JSX.Element => {
	const [filter, setFilter] = useState('all');

	const filtrarProductos = () => {
		return filter === 'all'
			? products
			: products.filter((product: ProductInterface) => product.type === filter);
	};

	return (
		<>
			<section className='section' id='categories'>
				<div className='categories_container container grid'>
					<div className='categories__buttons'>
						<button className='submit-button' onClick={() => setFilter('all')}>
							All
						</button>
						<button
							className='submit-button'
							onClick={() => setFilter('superior')}
						>
							Superior
						</button>
						<button
							className='submit-button'
							onClick={() => setFilter('inferior')}
						>
							Inferior
						</button>
					</div>
					<div className='products__container grid'>
						{JSON.parse(JSON.stringify(filtrarProductos())).map(
							(product: ProductInterface) => (
								<Product
									key={product._id}
									_id={product._id}
									name={product.name}
									price={product.price}
									images={product.images}
									type={product.type}
								/>
							)
						)}
					</div>
				</div>
			</section>
		</>
	);
};
