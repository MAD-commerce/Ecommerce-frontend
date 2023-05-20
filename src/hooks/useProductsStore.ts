import ecommerceApi from '../api/ecommerceApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';

import {
	onChecking,
	clearErrorMessage,
	onGetAllProducts,
	onGetProductById,
	onGetCart,
} from '../store/Products/productsSlice';
import { createFormData } from '../helpers/createFormData';

export const useProductsStore = () => {
	const { status, products, cart, lastProduct, errorMessage } = useSelector(
		(state: { products: ProductState }) => state.products
	);

	const dispatch = useDispatch();

	const createProduct = async ({ ...product }: ProductInterface) => {
		const formData = createFormData(product);

		try {
			await ecommerceApi.post('products/new', formData);
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const getAllProducts = async () => {
		dispatch(onChecking());
		try {
			const { data } = await ecommerceApi.get('products/allProducts');

			dispatch(onGetAllProducts(data.allProducts));
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const getProductById = async ({
		productId,
	}: {
		productId: string | undefined;
	}) => {
		dispatch(onChecking());
		try {
			const headers = {
				productId: productId,
			};

			const { data } = await ecommerceApi.get(`products/productById`, {
				headers,
			});

			dispatch(onGetProductById(data.product));
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const updateCart = async ({ _id }: { _id: string | undefined }) => {
		dispatch(onChecking());
		try {
			const { data } = await ecommerceApi.post('products/updateCart', {
				product: {
					_id,
				},
			});

			dispatch(onGetCart(data.cart));
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const getCartById = async () => {
		dispatch(onChecking());
		try {
			const { data } = await ecommerceApi.get('products/getCartById');

			dispatch(onGetCart(data.cart));
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const deleteProductCardById = async ({
		productId,
	}: {
		productId: string;
	}) => {
		dispatch(onChecking());
		let nuevoArray: ProductInterface[];

		try {
			await ecommerceApi.post(`products/deleteProductCart`, {
				_id: productId,
			});

			nuevoArray = cart.filter(
				(product: ProductInterface) => product._id !== productId
			);

			dispatch(onGetCart(nuevoArray));
		} catch (error) {}
	};

	return {
		// Propiedades
		status,
		cart,
		lastProduct,
		products,
		errorMessage,

		// metodos
		createProduct,
		getAllProducts,
		getProductById,
		getCartById,
		updateCart,
		deleteProductCardById,
	};
};
