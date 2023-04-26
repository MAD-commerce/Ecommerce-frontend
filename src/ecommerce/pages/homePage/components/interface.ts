interface ProductInterface {
	_id?: string;
	name?: string;
	price?: string;
	img?: any;
	priceBefore?: string;
	discount?: string;
	description?: string;
	colors?: {};
	sizes?: {};
}

interface ProductList {
	status: string;
	products: ProductInterface[];
	errorMessage: string | null;
	CreateProduct: () => Promise<void>;
	getAllProducts: () => Promise<void>;
	getProductById: ({
		productId,
	}: {
		productId: string | undefined;
	}) => Promise<ProductInterface | null>;
}
