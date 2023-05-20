import { ChangeEvent, useEffect, useState } from 'react';
import { Footer, NavBar } from '../../../components';
import { useForm, useProductsStore } from '../../../hooks';

const productFormField = {
	name: '',
	price: '',
	type: '',
	discount: '',
	description: '',
};

type ProductFormField = {
	name: string;
	price: string;
	type: string;
	discount: string;
	description: string;
};

type ProductFormValidations = {
	[K in keyof ProductFormField]: [Validator, string];
};

type Validator = (value: string) => boolean;

const productFormValidations: ProductFormValidations = {
	name: [value => value.trim() !== '', 'El nombre es obligatorio'],
	price: [value => value.trim() !== '', 'El precio es obligatorio'],
	type: [value => value.trim() !== '', 'El tipo es obligatorio'],
	discount: [
		value => /^\d+(\.\d+)?$/.test(value),
		'El descuento debe ser un número válido',
	],
	description: [value => value.trim() !== '', 'La descripción es obligatoria'],
};

import './createProduct.css';
import Swal from 'sweetalert2';
import { ImageSection } from './components/ImageSection';

export const CreateNewProduct = () => {
	const {
		name,
		price,
		type,
		discount,
		description,
		onInputChange,
		onResetForm,
		isFormValid,
		onSelectChange,
		onTextAreaChange,
	} = useForm(productFormField, productFormValidations);

	const [images, setImages] = useState<File[]>([]);

	const { createProduct } = useProductsStore();

	const createProductSubmit = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault();
		console.log(isFormValid);
		if (isFormValid && images.length > 1) {
			createProduct({ name, price, type, discount, description, images });
			Swal.fire('Producto creado');
		} else {
			Swal.fire('Error');
		}
		setImages([]);
		onResetForm();
	};

	return (
		<>
			<div className='app'>
				<NavBar type='header' />
				<main>
					<section className='section' id='createProduct'>
						<h2 className='section__title'>Crear producto</h2>
						<span className='section__subtitle'>Ingrese los datos</span>
						<div className='createProduct_container container grid'>
							<div className='product__information'>
								<form className='form grid' onSubmit={createProductSubmit}>
									<div className='group-input'>
										<input
											type='text'
											placeholder='Nombre'
											className='inputEntry'
											name='name'
											value={name}
											autoComplete='off'
											onChange={onInputChange}
										/>
									</div>
									<div className='group-input'>
										<input
											type='number'
											placeholder='Precio'
											min='1'
											className='inputEntry'
											autoComplete='off'
											name='price'
											value={price}
											onChange={onInputChange}
										/>
									</div>
									<div className='group-input'>
										<select name='type' id='' onChange={onSelectChange}>
											<option value='#'>Seleccionar</option>
											<option value='superior'>Superior</option>
											<option value='inferior'>Inferior</option>
										</select>
									</div>
									<div className='group-input'>
										<input
											type='number'
											placeholder='Descuento'
											min='0'
											max='100'
											className='inputEntry'
											autoComplete='off'
											name='discount'
											value={discount}
											onChange={onInputChange}
										/>
									</div>
									<div className='group-input'>
										<textarea
											cols={20}
											rows={5}
											className='textAreaEntry'
											placeholder='Ingrese la descripción'
											name='description'
											value={description}
											onChange={onTextAreaChange}
										/>
									</div>
									<input
										className='submit-button'
										type='submit'
										value='Crear'
									/>
								</form>
							</div>
							<div className='product__images'>
								<ImageSection images={images} setImages={setImages} />
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};
