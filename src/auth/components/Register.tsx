import { useForm } from '../../hooks';
import logo from '../../assets/logo-png.png';

import '../pages/auth.css';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import GoogleLogin from 'react-google-login';

const loginFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
};
export const Register = ({
	selectPage,
}: {
	selectPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const {
		registerName,
		registerEmail,
		registerPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);

	const { clientID, cookies, onSuccess, onFailture } = useGoogleLogin();

	const loginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		// startLogin({ email: loginEmail, password: loginPassword });
	};

	return (
		<>
			<main className='main'>
				<div className='page grid'>
					<div className='auth__box grid'>
						<img className='auth__logo' src={logo} alt='logo' />
						<h1>Registrese</h1>
						<form className='form grid' onSubmit={loginSubmit}>
							<div className='group-input'>
								<i className='bx bxs-user input-icon'></i>
								<input
									type='text'
									placeholder='Name'
									className='input'
									name='registerName'
									value={registerName}
									onChange={onLoginInputChange}
								/>
							</div>
							<div className='group-input'>
								<i className='bx bxs-user-circle input-icon'></i>
								<input
									type='email'
									placeholder='Email'
									className='input'
									name='registerEmail'
									value={registerEmail}
									onChange={onLoginInputChange}
								/>
							</div>
							<div className='group-input'>
								<i className='bx bxs-lock-alt input-icon'></i>
								<input
									type='password'
									placeholder='Contraseña'
									className='input'
									name='registerPassword'
									value={registerPassword}
									onChange={onLoginInputChange}
								/>
							</div>
							<input
								className='submit-button'
								type='submit'
								value='Registrese'
							/>
						</form>
						<div className='links'>
							<GoogleLogin
								render={renderProps => (
									<a
										className='button__google'
										onClick={renderProps.onClick}
										// disabled={renderProps.disabled}
									>
										Iniciar con Google
									</a>
								)}
								clientId={clientID}
								onSuccess={onSuccess}
								onFailure={onFailture}
								cookiePolicy={cookies}
							>
								<span>Registrarse con Google</span>
							</GoogleLogin>
							<a className='button' onClick={() => selectPage('Login')}>
								Iniciar sesión
							</a>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
