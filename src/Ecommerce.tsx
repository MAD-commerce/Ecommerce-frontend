import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const Ecommerce = (): JSX.Element => {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename='/'>
					{/* <HashRouter> */}
					<AppRouter />
					{/* </HashRouter> */}
				</BrowserRouter>
			</Provider>
		</>
	);
};
