import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export const Ecommerce = (): JSX.Element => {
	return (
		<>
			<HashRouter>
				<AppRouter />
			</HashRouter>
		</>
	);
};
