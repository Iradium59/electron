const amountInput = document.getElementById('amountInput');
const currencyInput = document.getElementById('currencyInput');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');

convertButton.addEventListener('click', () => {
	const amount = parseFloat(amountInput.value);
	const targetCurrency = currencyInput.value.toUpperCase();

	if (!isNaN(amount) && targetCurrency) {
		window.electronAPI.convertCurrency(amount, targetCurrency);
	}
});

window.electronAPI.on('conversionResult', (result) => {
	resultDiv.textContent = result;
});
