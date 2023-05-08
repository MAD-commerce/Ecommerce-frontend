import img1 from '../../../../assets/images/image 1 home.png';
import img2 from '../../../../assets/images/image 2 home.png';
import img3 from '../../../../assets/images/image 3 home.png';

export const Images = () => {
	return (
		<>
			<section className='section' id='Images'>
				<div className='image_container container'>
					<img src={img2} alt='img1' className='image__side' />
					<img src={img1} alt='img1' className='image__center' />
					<img src={img3} alt='img1' className='image__side' />
				</div>
			</section>
		</>
	);
};
