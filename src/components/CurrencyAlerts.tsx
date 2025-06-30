
import { useState } from "react";
import { Bell, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Alert {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  targetRate: number;
  condition: "above" | "below";
  isActive: boolean;
}

const CurrencyAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState({
    fromCurrency: "USD",
    toCurrency: "EUR",
    targetRate: "",
    condition: "above" as "above" | "below",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currencies = [
    "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "BTC", "ETH"
  ];

  const addAlert = () => {
    if (!newAlert.targetRate) return;

    const alert: Alert = {
      id: Date.now().toString(),
      fromCurrency: newAlert.fromCurrency,
      toCurrency: newAlert.toCurrency,
      targetRate: parseFloat(newAlert.targetRate),
      condition: newAlert.condition,
      isActive: true,
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      fromCurrency: "USD",
      toCurrency: "EUR",
      targetRate: "",
      condition: "above",
    });
    setIsDialogOpen(false);

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Rate Alerts</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="button-gradient">
              <Plus className="w-4 h-4 mr-1" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-border">
            <DialogHeader>
              <DialogTitle>Create Rate Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">From</label>
                  <Select value={newAlert.fromCurrency} onValueChange={(value) => 
                    setNewAlert({ ...newAlert, fromCurrency: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">To</label>
                  <Select value={newAlert.toCurrency} onValueChange={(value) => 
                    setNewAlert({ ...newAlert, toCurrency: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Condition</label>
                  <Select value={newAlert.condition} onValueChange={(value: "above" | "below") => 
                    setNewAlert({ ...newAlert, condition: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Target Rate</label>
                  <Input
                    type="number"
                    step="0.0001"
                    placeholder="0.0000"
                    value={newAlert.targetRate}
                    onChange={(e) => setNewAlert({ ...newAlert, targetRate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addAlert} className="w-full button-gradient">
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No alerts set. Create one to get notified when rates change.
          </p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${alert.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                <div>
                  <div className="font-medium">
                    {alert.fromCurrency}/{alert.toCurrency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Alert when {alert.condition} {alert.targetRate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleAlert(alert.id)}
                >
                  {alert.isActive ? "Pause" : "Resume"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAlert(alert.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrencyAlerts;
