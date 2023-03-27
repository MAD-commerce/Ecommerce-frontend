import { useEffect, useMemo, useState } from 'react';

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

export const useForm = (
	initialForm: FormState = {},
	formValidations: FormValidation = {}
): FormHook => {
	const [formState, setFormState] = useState<FormState>(initialForm);
	const [formValidation, setFormValidation] = useState<ValidationResult>({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) return false;
		}

		return true;
	}, [formValidation]);

	const onInputChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = (): void => {
		setFormState(initialForm);
	};

	const createValidators = (): void => {
		const formCheckedValues: ValidationResult = {};

		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMessage] = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = Boolean(fn(formState[formField]))
				? null
				: errorMessage;
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};
