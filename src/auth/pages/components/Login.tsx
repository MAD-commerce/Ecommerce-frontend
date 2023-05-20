import { useAuthStore, useForm } from '../../../hooks';
import { googleButton } from '.';

import logo from '../../../assets/logo.png';

import '../auth.css';

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
			<main className='main_auth'>
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
							</div>
							<input className='submit-button' type='submit' value='Ingrese' />
						</form>
						<div className='links'>
							<a className='' onClick={() => selectPage('Register')}>
								Registrese
							</a>
							{googleButton()}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
