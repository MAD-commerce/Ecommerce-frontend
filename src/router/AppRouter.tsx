import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { HomePage } from '../ecommerce/pages/HomePage';

export const AppRouter = (): JSX.Element => {
	const status: string = 'not-authenticated';

	return (
		<>
			<Routes>
				{status === 'authenticated' ? (
					<>
						<Route path='' />
					</>
				) : (
					<>
						<Route path='/auth/login' element={<LoginPage />} />
						<Route path='/auth/register' element={<RegisterPage />} />
						<Route path='/ecommerce/homePage' element={<HomePage />} />
						{/* todo: que navegue al homepage */}
						<Route path='/*' element={<Navigate to='/ecommerce/homePage' />} />
					</>
				)}
			</Routes>
		</>
	);
};
