export const calculateDiscount = (price = '', discount = ''): string => {
	if (price && discount === '') return 'error';

	return (
		parseInt(price) -
		parseInt(price) * (parseInt(discount) / 100)
	).toFixed(2);
};
