import { useEffect, useMemo, useState } from 'react';

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
