import { useState } from 'react';
import SimulatorForm from '@/components/SimulatorForm';
import PortfolioSummary from '@/components/PortfolioSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
}

const Simulator = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(10000); // Starting with $10,000

  const [holdings, setHoldings] = useState<Holding[]>([]);

  // Mock stock data - in a real app, this would come from an API
  const stocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.1 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -0.8 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 1.5 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88, change: -1.2 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: 3.7 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 5.2 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 502.20, change: -2.3 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.03, change: 1.8 }
  ];

  const handleTrade = (action: 'buy' | 'sell', symbol: string, quantity: number, price: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    if (action === 'buy') {
      const totalCost = price * quantity;
      if (totalCost > balance) {
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough balance for this trade.",
          variant: "destructive",
        });
        return;
      }

      setBalance(prev => prev - totalCost);

      setHoldings(prev => {
        const existingHolding = prev.find(h => h.symbol === symbol);
        if (existingHolding) {
          const newQuantity = existingHolding.quantity + quantity;
          const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + (price * quantity)) / newQuantity;
          const newTotalValue = stock.price * newQuantity;
          const newPnL = newTotalValue - (newAvgPrice * newQuantity);
          const newPnLPercent = ((stock.price - newAvgPrice) / newAvgPrice) * 100;

          return prev.map(h => 
            h.symbol === symbol 
              ? {
                  ...h,
                  quantity: newQuantity,
                  avgPrice: newAvgPrice,
                  currentPrice: stock.price,
                  totalValue: newTotalValue,
                  pnl: newPnL,
                  pnlPercent: newPnLPercent
                }
              : h
          );
        } else {
          return [...prev, {
            symbol,
            name: stock.name,
            quantity,
            avgPrice: price,
            currentPrice: stock.price,
            totalValue: stock.price * quantity,
            pnl: (stock.price - price) * quantity,
            pnlPercent: ((stock.price - price) / price) * 100
          }];
        }
      });
    } else {
      // Sell logic
      const holding = holdings.find(h => h.symbol === symbol);
      if (!holding || holding.quantity < quantity) {
        toast({
          title: "Insufficient Shares",
          description: "You don't have enough shares to sell.",
          variant: "destructive",
        });
        return;
      }

      const totalValue = price * quantity;
      setBalance(prev => prev + totalValue);

      setHoldings(prev => {
        return prev.map(h => {
          if (h.symbol === symbol) {
            const newQuantity = h.quantity - quantity;
            if (newQuantity === 0) {
              return null; // Will be filtered out
            }
            const newTotalValue = stock.price * newQuantity;
            const newPnL = newTotalValue - (h.avgPrice * newQuantity);
            const newPnLPercent = ((stock.price - h.avgPrice) / h.avgPrice) * 100;

            return {
              ...h,
              quantity: newQuantity,
              currentPrice: stock.price,
              totalValue: newTotalValue,
              pnl: newPnL,
              pnlPercent: newPnLPercent
            };
          }
          return h;
        }).filter(Boolean) as Holding[];
      });
    }
  };

  const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalPnL = holdings.reduce((sum, holding) => sum + holding.pnl, 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Simulator</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Practice trading with virtual money in a realistic market environment.
          </p>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Paper Trading Mode
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-sm px-4 py-2 ${totalPnL >= 0 ? 'text-success border-success' : 'text-destructive border-destructive'}`}
            >
              {totalPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-2" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-2" />
              )}
              Portfolio P&L: {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Form */}
          <div className="lg:col-span-1">
            <SimulatorForm 
              stocks={stocks}
              balance={balance}
              onTrade={handleTrade}
            />

            {/* Market Watch */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Market Watch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stocks.slice(0, 5).map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div>
                        <div className="font-semibold text-foreground">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {stock.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          ${stock.price.toFixed(2)}
                        </div>
                        <div className={`text-xs ${
                          stock.change >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Summary */}
          <div className="lg:col-span-2">
            <PortfolioSummary
              balance={balance}
              totalValue={totalValue}
              totalPnL={totalPnL}
              holdings={holdings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;