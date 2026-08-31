'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { calculateMonthlyMortgage, formatCurrency } from '@/lib/utils';
import { Calculator } from 'lucide-react';

export interface MortgageCalculatorProps {
  initialPrice: number;
  title?: string;
  badge?: string;
  defaultInterestRate?: number;
  defaultDownPaymentPercent?: number;
  terms?: number[];
  disclaimer?: string;
}

export function MortgageCalculator({
  initialPrice,
  title = 'Private Wealth Mortgage Estimator',
  badge = 'Financial Modeling',
  defaultInterestRate = 6.25,
  defaultDownPaymentPercent = 20,
  terms = [15, 30],
  disclaimer = '*Estimates provided for informational illustrative modeling. Subject to lender qualification and tax advisory review.',
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(defaultDownPaymentPercent);
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [loanTermYears, setLoanTermYears] = useState(terms[terms.length - 1] || 30);

  const result = calculateMonthlyMortgage(
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears
  );

  return (
    <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#5c3822]" />
          <h3 className="font-display font-medium text-xl text-[#1F1B16]">
            {title}
          </h3>
        </div>
        <Badge variant="stone" size="sm">{badge}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Home Price Input */}
          <div>
            <div className="flex justify-between text-xs font-mono text-[#7e7365] uppercase tracking-wider mb-1.5">
              <span>Acquisition Value</span>
              <span className="font-bold text-[#1F1B16]">{formatCurrency(homePrice)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={Math.max(350000000, initialPrice * 2)}
              step={250000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-[#5c3822] cursor-pointer"
            />
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-[#7e7365] uppercase tracking-wider mb-1.5">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="font-bold text-[#1F1B16]">{formatCurrency(result.downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#5c3822] cursor-pointer"
            />
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-[#7e7365] uppercase tracking-wider mb-1.5">
              <span>Interest Rate</span>
              <span className="font-bold text-[#1F1B16]">{interestRate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={3.5}
              max={22.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#5c3822] cursor-pointer"
            />
          </div>

          {/* Loan Term Selection */}
          <div>
            <span className="block text-xs font-mono text-[#7e7365] uppercase tracking-wider mb-2">
              Amortization Term
            </span>
            <div className="flex flex-wrap gap-3">
              {terms.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    loanTermYears === term
                      ? 'bg-[#5c3822] text-[#F8F4ED] shadow-inset-highlight font-bold'
                      : 'bg-[#f5efe6] text-[#1F1B16] border border-[#d8cebe] hover:bg-white'
                  }`}
                >
                  {term} Years Fixed
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-5 bg-[#f5efe6] border border-[#d8cebe] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-mono text-[#7e7365] uppercase tracking-widest block">
              Estimated Monthly Outlay
            </span>
            <div className="text-3xl font-display font-medium text-[#1F1B16] mt-1 tracking-tight">
              {formatCurrency(result.totalMonthly)}
              <span className="text-xs font-mono text-[#7e7365] font-normal ml-1">/ mo</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-[#d8cebe]/60 text-xs">
            <div className="flex justify-between text-[#7e7365]">
              <span>Principal & Interest</span>
              <span className="font-mono font-medium text-[#1F1B16]">{formatCurrency(result.principalAndInterest)}</span>
            </div>
            <div className="flex justify-between text-[#7e7365]">
              <span>Est. Property Tax</span>
              <span className="font-mono font-medium text-[#1F1B16]">{formatCurrency(result.propertyTax)}</span>
            </div>
            <div className="flex justify-between text-[#7e7365]">
              <span>Homeowners Insurance</span>
              <span className="font-mono font-medium text-[#1F1B16]">{formatCurrency(result.homeInsurance)}</span>
            </div>
            <div className="flex justify-between text-[#7e7365] pt-2 border-t border-[#d8cebe]/40 font-semibold">
              <span>Total Financed Amount</span>
              <span className="font-mono text-[#1F1B16]">{formatCurrency(result.loanAmount)}</span>
            </div>
          </div>

          <p className="text-[10px] text-[#7e7365] leading-tight">
            {disclaimer}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
