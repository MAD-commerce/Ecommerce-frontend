import ecommerceApi from '../api/ecommerceApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';

import {
	onChecking,
	clearErrorMessage,
	onGetAllProducts,
	onGetProductById,
} from '../store/Products/productsSlice';

export const useProductsStore = () => {
	const { status, products, lastProduct, errorMessage } = useSelector(
		(state: { products: ProductState }) => state.products
	);

	const dispatch = useDispatch();

	// Todo: Realizar
	const CreateProduct = async () => {
		try {
			const { ...coso } = await ecommerceApi.post('products/new', {});

			// dispatch();
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
				// xtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDE4ZDMxOTRlZDA0MDllYjJiNWJkZWUiLCJuYW1lIjoiSm9hbiIsImlhdCI6MTY4MjIxNDEwMSwiZXhwIjoxNjgyMjIxMzAxfQ.d_HHsFN0W4-y9p9V8uTSNx6L1H0BVx3jPxtUpbspJvs',
				productId: productId,
			};

			const { data } = await ecommerceApi.get(`products/productById`, {
				headers,
			});

			const { _id, name, price, description }: ProductInterface = data.product;

			dispatch(onGetProductById({ _id, name, price, description }));
		} catch (error) {
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	return {
		// Propiedades
		status,
		lastProduct,
		products,
		errorMessage,

		// metodos
		CreateProduct,
		getAllProducts,
		getProductById,
	};
};
