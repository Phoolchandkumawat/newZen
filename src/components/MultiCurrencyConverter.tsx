
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencyPair {
  id: string;
  currency: string;
  amount: number;
}

const MultiCurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [baseAmount, setBaseAmount] = useState("100");
  const [targetCurrencies, setTargetCurrencies] = useState<CurrencyPair[]>([
    { id: "1", currency: "EUR", amount: 0 },
    { id: "2", currency: "GBP", amount: 0 },
  ]);

  const currencies = [
    { code: "USD", name: "US Dollar", rate: 1 },
    { code: "EUR", name: "Euro", rate: 0.85 },
    { code: "GBP", name: "British Pound", rate: 0.73 },
    { code: "JPY", name: "Japanese Yen", rate: 110.0 },
    { code: "CAD", name: "Canadian Dollar", rate: 1.25 },
    { code: "AUD", name: "Australian Dollar", rate: 1.35 },
    { code: "CHF", name: "Swiss Franc", rate: 0.92 },
    { code: "CNY", name: "Chinese Yuan", rate: 6.45 },
    { code: "BTC", name: "Bitcoin", rate: 0.000023 },
    { code: "ETH", name: "Ethereum", rate: 0.00036 },
  ];

  const getExchangeRate = (from: string, to: string) => {
    const fromRate = currencies.find(c => c.code === from)?.rate || 1;
    const toRate = currencies.find(c => c.code === to)?.rate || 1;
    return toRate / fromRate;
  };

  const addCurrency = () => {
    const availableCurrencies = currencies.filter(
      c => c.code !== baseCurrency && !targetCurrencies.some(tc => tc.currency === c.code)
    );
    
    if (availableCurrencies.length > 0) {
      const newCurrency: CurrencyPair = {
        id: Date.now().toString(),
        currency: availableCurrencies[0].code,
        amount: 0,
      };
      setTargetCurrencies([...targetCurrencies, newCurrency]);
    }
  };

  const removeCurrency = (id: string) => {
    setTargetCurrencies(targetCurrencies.filter(tc => tc.id !== id));
  };

  const updateCurrency = (id: string, currency: string) => {
    setTargetCurrencies(targetCurrencies.map(tc =>
      tc.id === id ? { ...tc, currency } : tc
    ));
  };

  const convertedAmounts = targetCurrencies.map(tc => ({
    ...tc,
    amount: parseFloat(baseAmount || "0") * getExchangeRate(baseCurrency, tc.currency),
  }));

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Multi-Currency Converter</h3>
        <Button onClick={addCurrency} size="sm" variant="ghost">
          <Plus className="w-4 h-4 mr-1" />
          Add Currency
        </Button>
      </div>

      <div className="space-y-4">
        {/* Base Currency */}
        <div className="p-4 glass rounded-lg border-l-4 border-primary">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Base Currency</label>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
              <Input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>

        {/* Target Currencies */}
        <div className="space-y-3">
          {convertedAmounts.map((tc) => (
            <div key={tc.id} className="p-4 glass rounded-lg flex items-center justify-between">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <Select 
                  value={tc.currency} 
                  onValueChange={(value) => updateCurrency(tc.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies
                      .filter(c => c.code !== baseCurrency && !targetCurrencies.some(otc => otc.currency === c.code && otc.id !== tc.id))
                      .map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {tc.amount.toFixed(tc.currency === "BTC" || tc.currency === "ETH" ? 8 : 2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCurrency(tc.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {targetCurrencies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Add currencies to see conversions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiCurrencyConverter;
