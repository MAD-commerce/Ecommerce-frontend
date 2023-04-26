import { useNavigate } from 'react-router-dom';
import bape from '../../../../assets/Bape x Pubg.png';

const Product = ({
	_id,
	name,
	price,
	priceBefore,
	img,
}: ProductInterface): JSX.Element => {
	const navigate = useNavigate();

	const enviar = () => {
		navigate(`/ecommerce/product/${_id}`);
	};

	return (
		<div className='product__box' onClick={() => enviar()}>
			<div className='product__box-background flex-center'>
				<img src={img} alt='Bape' />
			</div>
			<div className='product__box-information'>
				<div className='product__information'>
					<p className='product__information-name'>{name}</p>
					<div className='prices'>
						<p className='product__information-price'>{price}</p>
						<p className='product__information-priceBefore'>{priceBefore}</p>
					</div>
				</div>
				<div className='product__button-cart flex-center' onClick={() => {}}>
					<i className='bx bx-cart-add'></i>
				</div>
			</div>
		</div>
	);
};

export const Categories = ({ products }: { products: any }): JSX.Element => {
	return (
		<>
			<section className='section' id='categories'>
				<div className='categories_container container grid'>
					<div className='categories__buttons'>
						<button className='submit-button'>Hola</button>
						<button className='submit-button'>Hola</button>
						<button className='submit-button'>Hola</button>
						<button className='submit-button'>Hola</button>
					</div>
					<div className='products__container grid'>
						{JSON.parse(JSON.stringify(products)).map(
							(product: ProductInterface) => (
								<Product
									key={product._id}
									_id={product._id}
									name={product.name}
									price={product.price}
									priceBefore={product.priceBefore}
									img={bape}
								/>
							)
						)}
					</div>
				</div>
			</section>
		</>
	);
};
