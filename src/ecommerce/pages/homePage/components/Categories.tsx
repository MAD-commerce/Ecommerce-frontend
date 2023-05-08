import { useState } from 'react';
import { Product } from '../../../components/Product';

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
				<h2 className='section__title'>Categorías</h2>
				<span className='section__subtitle'>Productos filtrados</span>
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
