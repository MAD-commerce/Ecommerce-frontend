import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnv';

const { VITE_API_URL } = getEnvVariables();

// *Equivale al patron de diseño singlenton

const ecommerceApi = axios.create({
	baseURL: VITE_API_URL,
	headers: {
		xtoken: localStorage.getItem('token'),
	},
});

// ecommerceApi.interceptors.request.use(config => {
// 	config.headers = {
// 		...config.headers,
// 		'x-token': localStorage.getItem('token'),
// 	};

// 	return config;
// });

export default ecommerceApi;
