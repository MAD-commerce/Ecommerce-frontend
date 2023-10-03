import { ChangeEvent } from 'react';
import Swal from 'sweetalert2';

export const ImageSection = ({
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
