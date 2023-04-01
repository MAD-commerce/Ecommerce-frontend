import { NavBar } from '../../components/NavBar';
import { useForm } from '../../hooks';
import logo from '../../assets/logo-png.png';

import './auth.css';
import { useAuthStore } from '../../hooks/useAuthStore';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

export const LoginPage = (): JSX.Element => {
	const { startLogin } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);

	const loginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	return (
		<>
			<div className='loginPage'>
				<header className='header-auth'>
					<NavBar />

					<div className='header__wave'>
						<div className='header__wave-box'>
							<svg
								id='svg'
								viewBox='0 0 1200 430'
								preserveAspectRatio='none'
								xmlns='http://www.w3.org/2000/svg'
								className='transition duration-200 ease-in-out delay-150 wave-container'
							>
								<path
									d='M0,0L16,65.3C32,131,64,261,96,294C128,327,160,261,192,236.8C224,212,256,229,288,261.3C320,294,352,343,384,334.8C416,327,448,261,480,236.8C512,212,544,229,576,269.5C608,310,640,376,672,400.2C704,425,736,408,768,383.8C800,359,832,327,864,302.2C896,278,928,261,960,285.8C992,310,1024,376,1056,359.3C1088,343,1120,245,1152,187.8C1184,131,1216,114,1248,98C1280,82,1312,65,1344,49C1376,33,1408,16,1440,73.5C1472,131,1504,261,1536,277.7C1568,294,1600,196,1632,171.5C1664,147,1696,196,1728,196C1760,196,1792,147,1824,138.8C1856,131,1888,163,1920,171.5C1952,180,1984,163,2016,204.2C2048,245,2080,343,2112,318.5C2144,294,2176,147,2208,81.7C2240,16,2272,33,2288,40.8L2304,49L2304,490L2288,490C2272,490,2240,490,2208,490C2176,490,2144,490,2112,490C2080,490,2048,490,2016,490C1984,490,1952,490,1920,490C1888,490,1856,490,1824,490C1792,490,1760,490,1728,490C1696,490,1664,490,1632,490C1600,490,1568,490,1536,490C1504,490,1472,490,1440,490C1408,490,1376,490,1344,490C1312,490,1280,490,1248,490C1216,490,1184,490,1152,490C1120,490,1088,490,1056,490C1024,490,992,490,960,490C928,490,896,490,864,490C832,490,800,490,768,490C736,490,704,490,672,490C640,490,608,490,576,490C544,490,512,490,480,490C448,490,416,490,384,490C352,490,320,490,288,490C256,490,224,490,192,490C160,490,128,490,96,490C64,490,32,490,16,490L0,490Z'
									stroke='none'
									strokeWidth='0'
									fill='black'
									className='transition-all duration-300 ease-in-out delay-150 wave-img'
								></path>
							</svg>
						</div>
					</div>
				</header>

				<main className='main'>
					<div className='page grid'>
						<div className='auth__box grid'>
							<img className='auth__logo' src={logo} alt='logo' />
							<h1>Iniciar sesión</h1>
							<form className='form grid' onSubmit={loginSubmit}>
								<div className='group-input'>
									<i className='bx bxs-user-circle input-icon'></i>
									<input
										type='email'
										placeholder='Email'
										className='input'
										name='loginEmail'
										value={loginEmail}
										onChange={onLoginInputChange}
									/>
								</div>
								<div>
									<div className='group-input'>
										<i className='bx bxs-lock-alt input-icon'></i>
										<input
											type='password'
											placeholder='Contraseña'
											className='input'
											name='loginPassword'
											value={loginPassword}
											onChange={onLoginInputChange}
										/>
									</div>
									<a className='recovery__text' href='#'>
										Recuperar contraseña
									</a>
								</div>
								<input
									className='submit-button'
									type='submit'
									value='Ingrese'
								/>
							</form>
							<div className='links'>
								<a className='' href=''>
									Iniciar con Google
								</a>
								<a className='' href='/auth/register'>
									Crear cuenta
								</a>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
