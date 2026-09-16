import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (!amount || isNaN(amount)) return 'PKR 0';
  
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    const formattedCrore = crore % 1 === 0 ? crore.toString() : crore.toFixed(2).replace(/\.?0+$/, '');
    return `PKR ${formattedCrore} Crore`;
  }
  
  if (amount >= 100000) {
    const lakh = amount / 100000;
    const formattedLakh = lakh % 1 === 0 ? lakh.toString() : lakh.toFixed(2).replace(/\.?0+$/, '');
    return `PKR ${formattedLakh} Lakh`;
  }
  
  return `PKR ${new Intl.NumberFormat('en-PK').format(amount)}`;
}

export function formatNumber(num: number): string {
  if (!num || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-PK').format(num);
}

export function calculateMonthlyMortgage(
  homePrice: number,
  downPaymentPercent: number,
  interestRateAnnual: number,
  loanTermYears: number,
  propertyTaxAnnual: number = 0.005, // 0.5%
  homeInsuranceAnnual: number = 50000 // PKR 50,000 / year
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

/**
 * Strips formatting characters from Pakistani and international phone numbers
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '').replace(/^0/, '92');
}

/**
 * Builds a standardized, pre-filled WhatsApp click-to-chat URL
 */
export function createWhatsAppUrl(phone: string, text: string): string {
  const clean = cleanPhoneNumber(phone);
  return `https://wa.me/${clean}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Pakistani land and plot measurement conversions (Gaz / Sq Yards / Sq Ft / Marla)
 */
export function sqYardsToSqFt(sqYards: number): number {
  if (!sqYards || isNaN(sqYards)) return 0;
  return Math.round(sqYards * 9);
}

export function sqFtToSqYards(sqFt: number): number {
  if (!sqFt || isNaN(sqFt)) return 0;
  return Math.round((sqFt / 9) * 10) / 10;
}

export function formatAreaWithGaz(sqYards: number): string {
  if (!sqYards || isNaN(sqYards)) return '0 Sq. Yds';
  const sqFt = sqYardsToSqFt(sqYards);
  return `${formatNumber(sqYards)} Sq. Yds (${formatNumber(sqFt)} Sq. Ft)`;
}
