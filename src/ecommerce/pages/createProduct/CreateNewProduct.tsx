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

const ImageSection = ({
	images,
	setImages,
}: {
	images: File[];
	setImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		if (fileList && fileList.length > 0) {
			const newImages = Array.from(fileList);
			if (images.length < 3) {
				setImages(prevImages => [...prevImages, ...newImages]);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Por favor no agregue más imágenes!',
				});
			}
		}
	};

	const handleRemoveImage = (index: number) => {
		setImages(prevImages => {
			const updatedImages = [...prevImages];
			updatedImages.splice(index, 1);
			return updatedImages;
		});
	};

	useEffect(() => {
		// console.log('Nueva imagen');
	}, [images]);

	return (
		<div>
			<input type='file' multiple onChange={handleImageUpload} />

			<div className='image-container'>
				{images.length > 0 && (
					<div className='large-image flex-center'>
						<img src={URL.createObjectURL(images[0])} alt='Large' />
						<button
							onClick={() => handleRemoveImage(0)}
							className='remove-button'
						>
							x
						</button>
					</div>
				)}

				<div className='small__images-box'>
					{images.slice(1, 3).map((image, index) => (
						<div key={index} className='small-image'>
							<img
								src={URL.createObjectURL(image)}
								alt={`Small ${index + 1}`}
							/>
							<button
								onClick={() => handleRemoveImage(index + 1)}
								className='remove-button'
							>
								x
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

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
