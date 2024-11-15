import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../hooks';

export const NavBar = ({ type }: { type: string }): JSX.Element => {
	const navigate = useNavigate();
	const { status, startLogout } = useAuthStore();

	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setIsFixed(window.pageYOffset > navbarOriginalPosition);
		}
		const navbarOriginalPosition = document.getElementById('navbar')!.offsetTop;
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header id='navbar' className={`${type} ${isFixed ? 'navbar-fixed' : ''}`}>
			<nav className='nav container'>
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
						{status !== 'authenticated' ? (
							<li className='nav__item'>
								<a onClick={() => navigate('/auth')} className='nav__link'>
									Login
								</a>
							</li>
						) : (
							<>
								<li className='nav__item'>
									<a onClick={() => { navigate('/ecommerce/settings') }} className='nav__link'>
										Ajustes
									</a>
								</li>
								<li className='nav__item'>
									<a onClick={() => startLogout()} className='nav__link'>
										Logout
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
				<div className='search'>
					<ul className='nav__list'>
						<li className='nav__item'>
							<a
								onClick={() => navigate('/ecommerce/cart')}
								className='nav__link'
							>
								<i className='bx bxs-cart nav__icon'></i>
							</a>
						</li>
						<li className='nav__item'>
							<a
								onClick={() => navigate('/ecommerce/search')}
								className='nav__link'
							>
								<i className='bx bxs-search nav__icon'></i>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
