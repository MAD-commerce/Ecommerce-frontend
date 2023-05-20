import { useProductsStore } from '../hooks';

export const getProductsByName = (name = '') => {
	const { products } = useProductsStore();

	if (name.length === 0) return [];

	return products.filter((product: ProductInterface) =>
		product.name!.toLocaleLowerCase().includes(name)
	);
};
