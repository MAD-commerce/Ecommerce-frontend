import { Loading, NavBar, Footer } from '../../../components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProductsStore } from '../../../hooks/useProductsStore';

import { calculateDiscount } from '../../../helpers/getDiscount';
import Swal from 'sweetalert2';
import './product.css';

const PresentationImage = ({ image }: { image: string }) => {
	return (
		<div className='product_presentation-box flex-center'>
			<img
				src={`data:image/png;base64,${image}`}
				alt=''
				className='presentation-img'
			/>
		</div>
	);
};

export const ProductPage = () => {
	const { getProductById, lastProduct, status, updateCart } =
		useProductsStore();
	const { productId } = useParams();
	const [loading, setLoading] = useState(true);
	let contador = 0;

	useEffect(() => {
		getProductById({
			productId,
		});
		window.scrollTo(0, 0);
		setLoading(false);
	}, []);

	if (loading || status == 'not-ready') {
		return <Loading />;
	}

	const sendProduct = () => {
		updateCart({ _id: productId });
		Swal.fire('Buen trabajo', 'Producto agregado correctamente!', 'success');
	};

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
									<div className='information__img-box flex-center'>
										<img
											src={`data:image/png;base64,${lastProduct?.images[0]}`}
											alt=''
											className='information__img'
										/>
									</div>
								</div>
								<div className='product_information-description'>
									<h1 className='product-name'>{lastProduct?.name}</h1>
									<hr />
									<div className='product-prices'>
										<p className='product-price'>{`$ ${calculateDiscount(
											lastProduct?.price,
											lastProduct?.discount
										)}`}</p>
										<p className='product-priceBefore'>{`$ ${lastProduct?.price}`}</p>
										<p className='product-discount'>{`${lastProduct?.discount}% Off`}</p>
									</div>
									<hr />
									<p>{lastProduct?.description}</p>
									<hr />
									{/* <p>Cantidad: </p> */}
									<p>Size: </p>
									<button
										className='submit-button'
										onClick={() => sendProduct()}
									>
										Agregar al carrito
									</button>
								</div>
							</div>

							<div className='product_presentation'>
								{lastProduct?.images.map((image: string) => (
									<PresentationImage image={image} key={contador++} />
								))}
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
