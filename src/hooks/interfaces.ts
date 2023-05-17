// UseAuthStore
interface AuthState {
	status: string;
	user: null | User;
	errorMessage: string | null;
}
interface User {
	name: string;
	uid: string;
	role: string;
}

interface entryPeticion {
	email: string;
	password: string;
}
interface entryPeticionGoogle {
	email: string;
	name: string;
}
interface entryPeticionRegister extends entryPeticion {
	name: string;
}
interface loginPeticion {
	data: {
		ok: boolean;
		name: string;
		token: string;
		uid: string;
	};
}
interface loginPeticionRenewJwtGoogle {
	data: {
		ok: boolean;
		name: string;
		uid: string;
		renewToken: string;
	};
}

// Use Product Store
interface ProductState {
	status: string;
	cart: [];
	lastProduct: ProductInterface | null;
	products: [];
	errorMessage: string | null;
}
interface ProductInterface {
	_id?: string;
	name?: string;
	price?: string;
	images?: any;
	discount?: string;
	description?: string;
	colors?: {};
	sizes?: {};
}

interface Cart {
	_id?: string;
	quantity?: string;
}

// UseForm

type FormValidation = Record<string, [Function, string]>;

type FormState = Record<string, any>;

type ValidationResult = Record<string, string | null>;

interface FormHook {
	[key: string]: any;
	formState: FormState;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onResetForm: () => void;
	isFormValid: boolean;
}
