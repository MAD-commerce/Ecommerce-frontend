import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnv';

const { VITE_API_URL } = getEnvVariables();

const ecommerceApi = axios.create({
	baseURL: VITE_API_URL,
	headers: {
		'x-token': localStorage.getItem('token'),
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
