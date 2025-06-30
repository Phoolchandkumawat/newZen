
import { motion } from "framer-motion";
import { DollarSign, ArrowLeft, TrendingUp, Bell, Calculator as CalculatorIcon, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CurrencyConverter from "@/components/CurrencyConverter";
import CurrencyChart from "@/components/CurrencyChart";
import CurrencyAlerts from "@/components/CurrencyAlerts";
import CurrencyCalculator from "@/components/CurrencyCalculator";
import MultiCurrencyConverter from "@/components/MultiCurrencyConverter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Currency = () => {
  const [activeTab, setActiveTab] = useState("converter");

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 py-8"
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="glass">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Currency Exchange Suite</h1>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container px-4 pb-20"
      >
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 glass">
              <TabsTrigger value="converter" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Converter
              </TabsTrigger>
              <TabsTrigger value="multi" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Multi-Currency
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <CalculatorIcon className="w-4 h-4" />
                Calculator
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="converter" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="glass glass-hover rounded-xl p-8">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Currency Converter</h2>
                        <p className="text-muted-foreground">
                          Convert between 170+ currencies with real-time rates and offline support.
                        </p>
                      </div>
                      <CurrencyConverter />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="glass rounded-lg p-6 text-center">
                      <h3 className="font-semibold mb-2 text-primary">Real-time Rates</h3>
                      <p className="text-sm text-muted-foreground">
                        Access up-to-date exchange rates with offline fallback
                      </p>
                    </div>
                    <div className="glass rounded-lg p-6 text-center">
                      <h3 className="font-semibold mb-2 text-primary">Voice Input</h3>
                      <p className="text-sm text-muted-foreground">
                        Use voice commands to input amounts quickly
                      </p>
                    </div>
                    <div className="glass rounded-lg p-6 text-center">
                      <h3 className="font-semibold mb-2 text-primary">Crypto Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Convert between fiat and cryptocurrencies
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="multi">
                <MultiCurrencyConverter />
              </TabsContent>

              <TabsContent value="charts">
                <CurrencyChart fromCurrency="USD" toCurrency="EUR" />
              </TabsContent>

              <TabsContent value="alerts">
                <CurrencyAlerts />
              </TabsContent>

              <TabsContent value="calculator">
                <CurrencyCalculator 
                  exchangeRate={0.85} 
                  fromCurrency="USD" 
                  toCurrency="EUR" 
                />
              </TabsContent>
            </div>
          </Tabs>

          {/* Advanced Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="glass rounded-lg p-6 text-center hover-scale">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">170+ Currencies</h3>
              <p className="text-sm text-muted-foreground">
                Support for all major world currencies and cryptocurrencies
              </p>
            </div>

            <div className="glass rounded-lg p-6 text-center hover-scale">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Historical Data</h3>
              <p className="text-sm text-muted-foreground">
                View exchange rate trends over time with interactive charts
              </p>
            </div>

            <div className="glass rounded-lg p-6 text-center hover-scale">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Get notified when exchange rates reach your target levels
              </p>
            </div>

            <div className="glass rounded-lg p-6 text-center hover-scale">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalculatorIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fee Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate total costs including fees and taxes
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Currency;
