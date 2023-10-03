import axios, { AxiosHeaders } from 'axios';
import { getEnvVariables } from '../helpers/getEnv';

const { VITE_API_URL } = getEnvVariables();

// *Equivale al patron de diseño singlenton

const ecommerceApi = axios.create({
	baseURL: VITE_API_URL,
	// headers: {
	// 	xtoken: localStorage.getItem('token'),
	// },
});

export function updateAuthToken(token: string) {
	ecommerceApi.defaults.headers.common['xtoken'] = token;
}

// ecommerceApi.interceptors.request.use(config => {
// 	config.headers = {
// 		...config.headers,
// 		'x-token': localStorage.getItem('token'),
// 	};

// 	return config;
// });

export default ecommerceApi;
