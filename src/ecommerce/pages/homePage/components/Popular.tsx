import img1 from '../../../../assets/images/image 1 home.png';
import img2 from '../../../../assets/images/image 2 home.png';
import img3 from '../../../../assets/images/image 3 home.png';

export const Popular = () => {
	return (
		<section className='section' id='Images'>
			<h2 className='section__title'>Categorías</h2>
			<span className='section__subtitle'>Productos filtrados</span>
			<div className='image_container container'>
				<img src={img2} alt='img1' className='image__side' />
				<img src={img1} alt='img1' className='image__center' />
				<img src={img3} alt='img1' className='image__side' />
			</div>
		</section>
	);
};
