"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const conversionRates = {
    USD: 1,
    EUR: 0.82,
    GBP: 0.73,
    JPY: 109.45,
    AUD: 1.29,
    CAD: 1.26,
};
function convertCurrency(amount, from, to) {
    if (!(from in conversionRates) || !(to in conversionRates)) {
        throw new Error("Invalid currency code");
    }
    const amountInUSD = amount / conversionRates[from];
    return amountInUSD * conversionRates[to];
}
function runCurrencyConverter() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Supported currencies: USD, EUR, GBP, JPY, AUD, CAD");
    rl.question("Enter the currency you have (e.g., USD, EUR, GBP):", (fromCurrency) => {
        if (!fromCurrency || !(fromCurrency.toUpperCase() in conversionRates)) {
            console.error("Invalid currency code");
            rl.close();
            return;
        }
        rl.question("Enter the amount of money:", (amountInput) => {
            if (!amountInput) {
                console.error("No amount entered");
                rl.close();
                return;
            }
            const amount = parseFloat(amountInput);
            if (isNaN(amount)) {
                console.error("Invalid amount");
                rl.close();
                return;
            }
            console.log("Supported currencies to convert to: USD, EUR, GBP, JPY, AUD, CAD");
            rl.question("Enter the currency you want to convert to (e.g., USD, EUR, GBP):", (toCurrency) => {
                if (!toCurrency || !(toCurrency.toUpperCase() in conversionRates)) {
                    console.error("Invalid currency code");
                    rl.close();
                    return;
                }
                try {
                    const convertedAmount = convertCurrency(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase());
                    console.log(`${amount} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(2)} ${toCurrency}`);
                }
                catch (error) {
                    console.error(error.message);
                }
                finally {
                    rl.close();
                }
            });
        });
    });
}
runCurrencyConverter();
