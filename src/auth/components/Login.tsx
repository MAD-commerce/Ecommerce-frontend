import { useForm } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import logo from '../../assets/logo-png.png';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import GoogleLogin from 'react-google-login';

import '../pages/auth.css';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

export const Login = ({
	selectPage,
}: {
	selectPage: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
	const { startLogin } = useAuthStore();
	const { clientID, cookies, onSuccess, onFailture } = useGoogleLogin();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
		onResetForm,
	} = useForm(loginFormFields);

	const loginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	return (
		<>
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
							<input className='submit-button' type='submit' value='Ingrese' />
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
								<span>Iniciar con Google</span>
							</GoogleLogin>
							<a className='' onClick={() => selectPage('Register')}>
								Registrese
							</a>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
