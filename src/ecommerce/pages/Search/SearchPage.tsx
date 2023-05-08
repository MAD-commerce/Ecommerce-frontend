import { useLocation, useNavigate } from 'react-router-dom';
import './search.css';
import { useForm } from '../../../hooks';
import { getProductsByName } from '../../../helpers/getProductByName';
import queryString from 'query-string';
import { Footer, NavBar } from '../../../components';
import { Product } from '../../components/Product';

const searchField = {
	searchText: '',
};

export const SearchPage = () => {
	const navigate = useNavigate();

	// Para las localizaciones
	const { q = '' } = queryString.parse(location.search);

	const products = typeof q === 'string' ? getProductsByName(q) : [];

	// Para mostrar el error o la barra de busqueda
	const showSearch = q!.length === 0;
	const showError = q!.length > 0 && products.length === 0;

	const { searchText, onInputChange } = useForm(searchField);

	const onSearchSubmit = (event: any) => {
		event.preventDefault();
		// if ( searchText.trim().length <= 1 ) return;

		// En opera el query sale oculto
		navigate(`?q=${searchText}`);
	};

	return (
		<>
			<div className='app'>
				<NavBar type='header' />

				<main>
					<section className='section' id='search'>
						{/* <h2 className='section__title'>Buscar</h2>
						<span className='section__subtitle'>Buscar los</span> */}
						<div className='search_container container'>
							<form
								className='form__container'
								onSubmit={onSearchSubmit}
								aria-label='form'
							>
								<input
									type='text'
									placeholder='Buscar producto'
									className='search-form'
									name='searchText'
									autoComplete='off'
									value={searchText}
									onChange={onInputChange}
								/>

								<button className='submit-button'>Buscar</button>
							</form>
						</div>

						<div
							className='alert alert-primary'
							style={{ display: showSearch ? '' : 'none' }}
						>
							Buscar
						</div>

						<div
							aria-label='alert-danger'
							className='alert alert-danger'
							style={{ display: showError ? '' : 'none' }}
						>
							Producto no encontrado <b>{q}</b>
						</div>

						<div className='products__container container grid'>
							{products.map((product: ProductInterface) => (
								<Product
									key={product._id}
									_id={product._id}
									name={product.name}
									price={product.price}
									images={product.images}
									type={product.type}
								/>
							))}
						</div>
					</section>
				</main>
			</div>
		</>
	);
};
