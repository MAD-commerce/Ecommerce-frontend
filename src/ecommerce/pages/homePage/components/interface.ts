interface ProductInterface {
	_id?: string;
	name?: string;
	price?: string;
	images?: any;
	discount?: string;
	description?: string;
	type: string;
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
