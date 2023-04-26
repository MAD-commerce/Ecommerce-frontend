import { Loading, NavBar } from '../../../components';
import { Footer } from '../../../components/footer/Footer';
import bape from '../../../assets/Bape x Pubg2.png';
import bape2 from '../../../assets/Bape x Pubg.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductsStore } from '../../../hooks/useProductsStore';

import './product.css';

export const ProductPage = () => {
	const { getProductById, lastProduct, status } = useProductsStore();

	const { productId } = useParams();

	// Todo: *Arreglar esta peticion que se crea todo el rato
	useEffect(() => {
		getProductById({
			productId,
		});
		window.scrollTo(0, 0);
	}, []);

	if (status === 'not-ready') {
		return <Loading />;
	}

	return (
		<>
			<div className='app'>
				<NavBar type='header' />

				<main>
					<section className='section' id='product'>
						<div className='product_container container grid'>
							<div className='product_information grid'>
								<div className='product_information-img flex-center'>
									<svg
										viewBox='0 0 800 600'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='blob'
									>
										<path
											d='M628.305 579.836C586.432 618.139 505.47 628.656 444.76 641.818C384.049 654.98 320.321 682.51 264.043 658.808C207.765 635.106 131.917 554.175 107.092 499.606C82.267 445.037 83.6076 388.13 115.092 331.394C146.577 274.658 240.621 197.165 296 159.192C351.379 121.22 400.134 91.7291 447.369 103.558C494.604 115.386 537.971 178.757 579.41 230.164C620.848 281.571 687.851 353.721 696 412'
											fill='#BC96E6'
										/>
									</svg>
									<div className='information__img-box'>
										<img src={bape} alt='' className='information__img' />
									</div>
								</div>
								<div className='product_information-description'>
									<h1 className='product-name'>{lastProduct?.name}</h1>
									<hr />
									<div className='product-prices'>
										<p>${lastProduct?.price}</p>
										<p>$000</p>
										<p>00% Off</p>
									</div>
									<hr />
									<p>
										Consectetur culpa nulla incididunt nisi fugiat est amet
										pariatur non quis Lorem do. Cillum nostrud proident
										incididunt esse ut sunt quis pariatur fugiat consectetur
										deserunt commodo cupidatat. Ad reprehenderit sit quis nisi
										in dolore adipisicing do commodo irure minim labore.
									</p>
									<hr />
									<p>Color: </p>
									<p>Size: </p>
								</div>
							</div>

							<div className='product_presentation'>
								<div className='product_presentation-box flex-center'>
									<img src={bape2} alt='' className='presentation-img' />
								</div>
								<div className='product_presentation-box flex-center'>
									<img src={bape2} alt='' className='presentation-img' />
								</div>
								<div className='product_presentation-box flex-center'>
									<img src={bape2} alt='' className='presentation-img' />
								</div>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
