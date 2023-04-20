import bape from '../../../assets/Bape x Pubg.png';

interface Product {
	name: string;
	price: string;
	priceBefore: string;
	img: any;
}

const Product = ({ name, price, priceBefore, img }: Product): JSX.Element => {
	return (
		<div className='product__box'>
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

export const Categories = (): JSX.Element => {
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
						<Product
							name='Bape x Pubg'
							price='$50'
							priceBefore='$500'
							img={bape}
						/>
						<Product
							name='Bape x Pubg'
							price='$50'
							priceBefore='$500'
							img={bape}
						/>
						<Product
							name='Bape x Pubg'
							price='$50'
							priceBefore='$500'
							img={bape}
						/>
						<Product
							name='Bape x Pubg'
							price='$50'
							priceBefore='$500'
							img={bape}
						/>
						<Product
							name='Bape x Pubg'
							price='$50'
							priceBefore='$500'
							img={bape}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
