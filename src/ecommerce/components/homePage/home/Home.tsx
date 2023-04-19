import homeImg from '../../../../assets/home-img.png';

import './home.css';

export const Home = () => {
	return (
		<section className='section' id='home'>
			<div className='home_container container grid'>
				<div className='home_text'>
					<b>Tendencias de moda</b>
					<h1>EcoClothes</h1>
					<button className='submit-button'>Comprar</button>
				</div>
				<div className='home_image'>
					<img src={homeImg} alt='home image' />
				</div>
			</div>
		</section>
	);
};
