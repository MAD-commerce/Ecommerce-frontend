import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import useInterval from 'use-interval';

import '../auth.css';

declare global {
	interface Window {
		google: any;
	}
}

export const googleButton = (): JSX.Element => {
	const { startLoginGoogle } = useAuthStore();

	const [googleIsLoading, setgoogleIsLoading] = useState(true);

	const clientID =
		'650875211792-ul73nog7sgkup12s4f82io9vddvco3jt.apps.googleusercontent.com';

	useInterval(() => {
		if (window.google) {
			setgoogleIsLoading(false);
		}
	}, 10);

	useEffect(() => {
		if (googleIsLoading) {
			window.google.accounts.id.initialize({
				client_id: clientID,
				callback: onSuccess,
				onFailture,
			});

			window.google.accounts.id.renderButton(
				document.getElementById('sigInDiv'),
				{
					theme: 'outline',
					size: 'large',
				}
			);

			window.google.accounts.id.prompt();
		}
	}, []);

	const onSuccess = (response: any) => {
		startLoginGoogle(response);

		document.getElementById('sigInDiv');
	};

	const onFailture = () => {
		console.log('Algo salio mal');
		// onResetForm;
	};

	return (
		<div className='google__button' id='sigInDiv'>
			coso
		</div>
	);
};
