import React from 'react';
import ReactDOM from 'react-dom/client';
import { Ecommerce } from './Ecommerce';
import './ecommerce.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Ecommerce />
	</React.StrictMode>
);
