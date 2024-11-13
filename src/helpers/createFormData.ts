import { ProductInterface } from "./interfaces";

export const createFormData = ({ ...product }: ProductInterface): FormData => {
	const formData = new FormData();
	if (product.name !== undefined) {
		formData.append('name', product.name);
	}
	if (product.price !== undefined) {
		formData.append('price', product.price);
	}
	if (product.type !== undefined) {
		formData.append('type', product.type);
	}
	if (product.discount !== undefined && parseInt(product.discount) <= 100) {
		formData.append('discount', product.discount);
	}
	if (product.description !== undefined) {
		formData.append('description', product.description);
	}

	product.images.map((image: File) => {
		formData.append('images', image);
	});

	return formData;
};
