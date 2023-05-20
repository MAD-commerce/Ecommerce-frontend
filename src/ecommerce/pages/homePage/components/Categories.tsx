import { useState } from 'react';
import { Product } from '../../../components/Product';

export const Categories = ({ products }: { products: any }): JSX.Element => {
	const [filter, setFilter] = useState('all');
	const [counter, setCounter] = useState(8);

	const filtrarProductos = () => {
		return filter === 'all'
			? products
			: products.filter((product: ProductInterface) => product.type === filter);
	};

	const generateProducts = () => {
		let cont = 0;

		return JSON.parse(JSON.stringify(filtrarProductos())).map(
			(product: ProductInterface) => {
				if (cont < counter) {
					return (
						<Product
							key={`${(cont += 1)}`}
							_id={product._id}
							name={product.name}
							price={product.price}
							images={product.images}
							type={product.type}
							discount={product.discount}
						/>
					);
				} else {
					if (cont === counter) {
						return (
							<button
								onClick={() => setCounter(counter + counter)}
								className='submit-button flex-cente'
								key={`${(cont += 1)}`}
							>
								Cargar todos
							</button>
						);
					}
				}
			}
		);
	};

	return (
		<>
			<section className='section' id='categories'>
				<h2 className='section__title'>Categorías</h2>
				<span className='section__subtitle'>Productos filtrados</span>
				<div className='categories_container container grid'>
					<div className='categories__buttons'>
						<button className='submit-button' onClick={() => setFilter('all')}>
							Todos
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
					<div className='products__container grid'>{generateProducts()}</div>
				</div>
			</section>
		</>
	);
};
