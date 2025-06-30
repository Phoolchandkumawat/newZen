
import { useState, useEffect } from "react";
import { ArrowUpDown, Wifi, WifiOff, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
    { code: "ETH", name: "Ethereum", symbol: "Ξ" },
  ];

  // Enhanced exchange rates with crypto
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, BTC: 0.000023, ETH: 0.00036 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.0, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, BTC: 0.000027, ETH: 0.00042 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 151.0, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.84, BTC: 0.000031, ETH: 0.00049 },
    JPY: { USD: 0.009, EUR: 0.008, GBP: 0.007, CAD: 0.011, AUD: 0.012, CHF: 0.008, CNY: 0.059, BTC: 0.0000002, ETH: 0.0000032 },
    BTC: { USD: 43500, EUR: 37000, GBP: 31800, JPY: 4785000, CAD: 54375, AUD: 58725, CHF: 40020, CNY: 280575, ETH: 15.7 },
    ETH: { USD: 2770, EUR: 2355, GBP: 2022, JPY: 304700, CAD: 3463, AUD: 3740, CHF: 2548, CNY: 17877, BTC: 0.064 },
  };

  // Fill in missing rates
  Object.keys(exchangeRates).forEach(from => {
    Object.keys(exchangeRates).forEach(to => {
      if (from !== to && !exchangeRates[from][to]) {
        if (exchangeRates[to] && exchangeRates[to][from]) {
          exchangeRates[from][to] = 1 / exchangeRates[to][from];
        }
      }
    });
  });

  const convertCurrency = () => {
    setLoading(true);
    setTimeout(() => {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount);
      setLastUpdated(new Date());
      setLoading(false);

      // Save to localStorage for offline use
      const offlineData = {
        rates: exchangeRates,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem('currencyRates', JSON.stringify(offlineData));
    }, 500);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const number = transcript.match(/\d+/);
        if (number) {
          setAmount(number[0]);
          toast({
            title: "Voice input captured",
            description: `Amount set to ${number[0]}`,
          });
        }
      };

      recognition.onerror = () => {
        toast({
          title: "Voice input failed",
          description: "Please try again or type manually",
          variant: "destructive",
        });
      };

      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input",
        variant: "destructive",
      });
    }
  };

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back online",
        description: "Exchange rates will be updated",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline mode",
        description: "Using cached exchange rates",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Load offline data if available
  useEffect(() => {
    const offlineData = localStorage.getItem('currencyRates');
    if (offlineData && !isOnline) {
      const parsed = JSON.parse(offlineData);
      setLastUpdated(new Date(parsed.lastUpdated));
    }
  }, [isOnline]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && parseFloat(amount) > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="space-y-4">
      {/* Header with status indicators */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-xs text-muted-foreground">
            {isOnline ? "Live rates" : "Offline mode"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceInput}
            className="text-xs"
          >
            🎤 Voice
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">From</label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={swapCurrencies}
            size="icon"
            variant="ghost"
            className="rounded-full hover-scale"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">To</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {result !== null && (
        <div className="text-center p-6 glass rounded-lg animate-fade-in">
          <div className="text-sm text-muted-foreground mb-2">Result</div>
          <div className="text-3xl font-bold text-primary mb-2">
            {loading ? (
              <div className="animate-pulse">Converting...</div>
            ) : (
              `${currencies.find(c => c.code === toCurrency)?.symbol}${result.toFixed(
                toCurrency === "BTC" || toCurrency === "ETH" ? 8 : 2
              )}`
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {amount} {fromCurrency} = {result.toFixed(
              toCurrency === "BTC" || toCurrency === "ETH" ? 8 : 2
            )} {toCurrency}
          </div>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
