import { useAuthStore, useProductsStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { calculateDiscount } from '../../helpers/getDiscount';
import Swal from 'sweetalert2';

export const Product = ({
	_id = '',
	name,
	price,
	images,
	discount,
}: ProductInterface): JSX.Element => {
	const { updateCart } = useProductsStore();
	const { status } = useAuthStore();
	const navigate = useNavigate();

	const seeProduct = () => {
		navigate(`/ecommerce/product/${_id}`);
	};

	const sendProduct = () => {
		updateCart({ _id });
		Swal.fire('Buen trabajo', 'Producto agregado correctamente!', 'success');
	};

	return (
		<div className='product__box'>
			<div className='product__box-discount flex-center'>{`${discount}%`}</div>
			<div className='product__box-background flex-center'>
				<img
					src={`data:image/png;base64,${images[0]}`}
					alt='Image Product'
					className='product__box-image'
				/>
			</div>
			<div className='product__box-information'>
				<div className='product__information'>
					<p className='product__information-name'>{name}</p>
					<div className='prices'>
						<p className='product__information-price'>
							{`$ ${calculateDiscount(price, discount)}`}
						</p>
					</div>
				</div>
				<div className='flex-center'>
					<div
						className='product__button-cart flex-center'
						onClick={() => seeProduct()}
					>
						<i className='bx bx-fullscreen'></i>
					</div>
					{status === 'authenticated' ? (
						<div
							className='product__button-cart flex-center'
							onClick={() => sendProduct()}
						>
							<i className='bx bx-cart-add'></i>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};
