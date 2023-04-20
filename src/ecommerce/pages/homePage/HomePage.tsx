import { NavBar } from '../../../components/NavBar';
import { Home } from '../../components/homePage/Home';
import { Popular } from '../../components/homePage/Popular';
import { Categories } from '../../components/homePage/Categories';

// import './homePage.css';

export const HomePage = () => {
	return (
		<>
			<div className='App'>
				<NavBar type='header' />
				<main className='main'>
					<Home />
					{/* <Popular /> */}
					<Categories />
				</main>
			</div>
		</>
	);
};
