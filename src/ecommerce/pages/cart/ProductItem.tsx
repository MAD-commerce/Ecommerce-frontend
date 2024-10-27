import Swal from 'sweetalert2';
import { useProductsStore } from '../../../hooks';

export const ProductItem = ({
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
						<p>Cantidad: ????</p>
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
