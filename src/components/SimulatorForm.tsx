import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface SimulatorFormProps {
  stocks: Stock[];
  balance: number;
  onTrade: (action: 'buy' | 'sell', symbol: string, quantity: number, price: number) => void;
}

const SimulatorForm = ({ stocks, balance, onTrade }: SimulatorFormProps) => {
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const { toast } = useToast();

  const currentStock = stocks.find(stock => stock.symbol === selectedStock);
  const totalCost = currentStock ? currentStock.price * parseInt(quantity || '0') : 0;
  const canAfford = totalCost <= balance;

  const handleTrade = () => {
    if (!selectedStock || !quantity || !currentStock) {
      toast({
        title: "Invalid Trade",
        description: "Please select a stock and enter quantity.",
        variant: "destructive",
      });
      return;
    }

    const qty = parseInt(quantity);
    if (qty <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Quantity must be greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (action === 'buy' && !canAfford) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this trade.",
        variant: "destructive",
      });
      return;
    }

    onTrade(action, selectedStock, qty, currentStock.price);
    
    toast({
      title: "Trade Executed",
      description: `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${qty} shares of ${selectedStock}.`,
    });

    setQuantity('');
    setSelectedStock('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Trade Stocks
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select value={action} onValueChange={(value: 'buy' | 'sell') => setAction(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Buy
                  </div>
                </SelectItem>
                <SelectItem value="sell">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    Sell
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stock" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{stock.symbol}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <span>${stock.price.toFixed(2)}</span>
                        <span className={`text-xs ${
                          stock.change >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter number of shares"
            min="1"
          />
        </div>

        {currentStock && quantity && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Stock Price:</span>
              <span className="font-medium">${currentStock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span className="font-medium">{quantity} shares</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total {action === 'buy' ? 'Cost' : 'Value'}:</span>
              <span className="text-primary">${totalCost.toFixed(2)}</span>
            </div>
            {action === 'buy' && (
              <div className="flex justify-between text-sm">
                <span>Available Balance:</span>
                <span className={canAfford ? 'text-success' : 'text-destructive'}>
                  ${balance.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={handleTrade} 
          disabled={!selectedStock || !quantity || (action === 'buy' && !canAfford)}
          className="w-full btn-hero"
        >
          Execute {action === 'buy' ? 'Buy' : 'Sell'} Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimulatorForm;