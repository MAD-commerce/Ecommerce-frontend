import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export const useGoogleLogin = () => {
	const { startLogin } = useAuthStore();

	const clientID =
		'650875211792-ul73nog7sgkup12s4f82io9vddvco3jt.apps.googleusercontent.com';

	const cookies = (document.cookie =
		'single_host_origin; SameSite=Lax; Secure');

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID,
			});
		};

		gapi.load('client:auth2', start);
	}, []);

	const onSuccess = (response: any) => {
		console.log(response);
		loginWithGoogle(response.profileObj);
	};
	const onFailture = () => {
		console.log('Algo salio mal');
		// onResetForm;
	};

	const loginWithGoogle = ({
		email,
		googleId,
	}: {
		email: string;
		googleId: string;
	}) => {
		startLogin({ email, password: googleId });
	};

	return {
		clientID,
		cookies,

		onSuccess,
		onFailture,
		loginWithGoogle,
	};
};
