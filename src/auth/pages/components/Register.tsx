import { useForm } from '../../../hooks';
import { googleButton } from './googleButton';

import logo from '../../../assets/logo.png';

import '../auth.css';

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

	const loginSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		// startLogin({ email: loginEmail, password: loginPassword });
	};

	return (
		<>
			<main className='main_auth'>
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
							<a className='button' onClick={() => selectPage('Login')}>
								Iniciar sesión
							</a>
							{googleButton()}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
