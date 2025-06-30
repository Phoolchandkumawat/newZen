
import { useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CurrencyCalculatorProps {
  exchangeRate: number;
  fromCurrency: string;
  toCurrency: string;
}

const CurrencyCalculator = ({ exchangeRate, fromCurrency, toCurrency }: CurrencyCalculatorProps) => {
  const [amount, setAmount] = useState("1000");
  const [fee, setFee] = useState("2.5");
  const [tax, setTax] = useState("0");

  const calculateTotal = () => {
    const baseAmount = parseFloat(amount) || 0;
    const convertedAmount = baseAmount * exchangeRate;
    const feeAmount = (convertedAmount * parseFloat(fee)) / 100;
    const taxAmount = (convertedAmount * parseFloat(tax)) / 100;
    const total = convertedAmount + feeAmount + taxAmount;

    return {
      baseAmount,
      convertedAmount,
      feeAmount,
      taxAmount,
      total,
    };
  };

  const calculation = calculateTotal();

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Fee Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Amount ({fromCurrency})</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Fee (%)</label>
            <Input
              type="number"
              step="0.1"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="2.5"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Tax (%)</label>
            <Input
              type="number"
              step="0.1"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="glass rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Converted Amount:</span>
            <span>{calculation.convertedAmount.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fee ({fee}%):</span>
            <span>+{calculation.feeAmount.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax ({tax}%):</span>
            <span>+{calculation.taxAmount.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold text-primary">
              <span>Total:</span>
              <span>{calculation.total.toFixed(2)} {toCurrency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
