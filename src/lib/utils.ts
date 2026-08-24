import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function calculateMonthlyMortgage(
  homePrice: number,
  downPaymentPercent: number,
  interestRateAnnual: number,
  loanTermYears: number,
  propertyTaxAnnual: number = 0.012, // 1.2%
  homeInsuranceAnnual: number = 2400
): {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  totalMonthly: number;
  loanAmount: number;
  downPaymentAmount: number;
} {
  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);
  
  const monthlyRate = interestRateAnnual / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let principalAndInterest = 0;
  if (monthlyRate > 0 && numberOfPayments > 0) {
    principalAndInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else if (numberOfPayments > 0) {
    principalAndInterest = loanAmount / numberOfPayments;
  }

  const propertyTax = (homePrice * propertyTaxAnnual) / 12;
  const homeInsurance = homeInsuranceAnnual / 12;
  const totalMonthly = principalAndInterest + propertyTax + homeInsurance;

  return {
    principalAndInterest: Math.round(principalAndInterest),
    propertyTax: Math.round(propertyTax),
    homeInsurance: Math.round(homeInsurance),
    totalMonthly: Math.round(totalMonthly),
    loanAmount: Math.round(loanAmount),
    downPaymentAmount: Math.round(downPaymentAmount),
  };
}
