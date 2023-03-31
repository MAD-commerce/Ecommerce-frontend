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
interface entryPeticionRegister extends entryPeticion {
	name: string;
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
