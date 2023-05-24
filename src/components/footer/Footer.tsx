import './footer.css';

import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram-icon.svg';
import whatsapp from '../../assets/whatsapp-icon.svg';

export const Footer = () => {
	return (
		<section className='Footer'>
			<div className='footer__content grid'>
				<div className='footer__socialMedia flex-center'>
					<hr className='hr' />
					<div className='social_media-box'>
						<img src={facebook} alt='' className='social-icon' />
						<img src={instagram} alt='' className='social-icon' />
						<img src={whatsapp} alt='' className='social-icon' />
					</div>
					<hr className='hr' />
				</div>
				<div className='footer__name flex-center'>
					<h3>EcoClothes</h3>
					<p>Copyright &copy; 2023</p>
				</div>
				<div className='footer__gratitude'>
					<p>
						Hecho con el <i className='bx bxs-heart'></i> en:
					</p>
					<p>Html, Css, React y Javascript</p>
				</div>
			</div>
		</section>
	);
};
