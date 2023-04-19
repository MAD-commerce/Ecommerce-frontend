import { useNavigate } from 'react-router-dom';
import './navbar.css';

export const NavBar = (): JSX.Element => {
	const navigate = useNavigate();

	return (
		<div className='header'>
			<div className='nav container'>
				<div className='nav__logo'>EcoClothes</div>
				<div className='nav__menu'>
					<ul className='nav__list'>
						<li className='nav__item'>
							<a
								onClick={() => navigate('/ecommerce/homePage')}
								className='nav__link'
							>
								Home
							</a>
						</li>
						<li className='nav__item'>
							<a onClick={() => navigate('/auth')} className='nav__link'>
								Login
							</a>
						</li>
					</ul>
				</div>
				<div className='search'>
					<ul className='nav__list'>
						<li className='nav__item'>
							<a href='' className='nav__link'>
								<i className='bx bxs-cart nav__icon'></i>
							</a>
						</li>
						<li className='nav__item'>
							<a href='' className='nav__link'>
								<i className='bx bxs-search nav__icon'></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
