import * as readline from 'readline';

const conversionRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.82,
  GBP: 0.73,
  JPY: 109.45,
  AUD: 1.29,
  CAD: 1.26,
};

function convertCurrency(amount: number, from: string, to: string): number {
  if (!(from in conversionRates) || !(to in conversionRates)) {
    throw new Error("Invalid currency code");
  }
  const amountInUSD = amount / conversionRates[from];
  return amountInUSD * conversionRates[to];
}

function runCurrencyConverter(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Supported currencies: USD, EUR, GBP, JPY, AUD, CAD");
  rl.question("Enter the currency you have (e.g., USD, EUR, GBP):", (fromCurrency: string) => {
    if (!fromCurrency || !(fromCurrency.toUpperCase() in conversionRates)) {
      console.error("Invalid currency code");
      rl.close();
      return;
    }
  
    rl.question("Enter the amount of money:", (amountInput: string) => {
      if (!amountInput) {
        console.error("No amount entered");
        rl.close();
        return;
      }
      const amount: number = parseFloat(amountInput);
      if (isNaN(amount)) {
        console.error("Invalid amount");
        rl.close();
        return;
      }

      console.log("Supported currencies to convert to: USD, EUR, GBP, JPY, AUD, CAD");
      rl.question("Enter the currency you want to convert to (e.g., USD, EUR, GBP):", (toCurrency: string) => {
        if (!toCurrency || !(toCurrency.toUpperCase() in conversionRates)) {
          console.error("Invalid currency code");
          rl.close();
          return;
        }

        try {
          const convertedAmount: number = convertCurrency(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase());
          console.log(`${amount} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(2)} ${toCurrency}`);
        } catch (error) {
          console.error((error as Error).message);
        } finally {
          rl.close();
        }
      });
    });
  });
}

runCurrencyConverter();
