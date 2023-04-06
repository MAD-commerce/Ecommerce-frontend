// UseAuthStore
interface AuthState {
	status: string;
	user: {} | null;
	errorMessage: string | null;
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
