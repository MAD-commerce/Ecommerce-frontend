import './footer.css';

export const Footer = () => {
	return (
		<section className='Footer'>
			<div className='footer__wave'>
				<svg
					id='svg'
					viewBox='0 0 1440 390'
					xmlns='http://www.w3.org/2000/svg'
					className='transition duration-300 ease-in-out delay-150'
				>
					<path
						d='M 0,400 C 0,400 0,200 0,200 C 115.0717703349282,188.555023923445 230.1435406698564,177.11004784688996 323,195 C 415.8564593301436,212.88995215311004 486.4976076555025,260.1148325358851 586,252 C 685.5023923444975,243.8851674641149 813.866028708134,180.43062200956942 897,169 C 980.133971291866,157.56937799043058 1018.0382775119617,198.16267942583733 1101,212 C 1183.9617224880383,225.83732057416267 1311.9808612440193,212.91866028708134 1440,200 C 1440,200 1440,400 1440,400 Z'
						stroke='none'
						strokeWidth='0'
						fill='var(--body-color)'
						className='transition-all duration-300 ease-in-out delay-150 wave'
						transform='rotate(-180 720 200)'
					></path>
				</svg>
			</div>
			<div className='footer__content grid'>
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
