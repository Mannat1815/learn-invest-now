import { useState, useEffect } from 'react';
import SimulatorForm from '@/components/SimulatorForm';
import PortfolioSummary from '@/components/PortfolioSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

// UPDATED: Add the new P&L fields from the backend
interface PortfolioData {
  cash_balance: number;
  stocks: {
    ticker: string;
    quantity: number;
    current_price: number;
    market_value: number;
    avg_price: number;
    pnl: number;
    pnl_percent: number;
  }[];
  total_portfolio_value: number;
  total_stocks_value: number;
  total_portfolio_pnl: number;
}

const availableStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.1 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -0.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 1.5 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88, change: -1.2 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: 3.7 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 5.2 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 502.20, change: -2.3 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.03, change: 1.8 }
];

const Simulator = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/portfolio/1');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPortfolio(data);
      console.log("Successfully fetched portfolio:", data);
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleTradeSuccess = () => {
    fetchPortfolio();
  };

  if (!portfolio) {
    return <div className="text-center p-10">Loading your portfolio...</div>;
  }
  
  // REMOVED: const totalPnL = 0; - We will use the live data instead.

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SimulatorForm 
              stocks={availableStocks}
              balance={portfolio.cash_balance}
              onTrade={handleTradeSuccess}
            />
          </div>

          <div className="lg:col-span-2">
            {/* UPDATED: Pass the real P&L data to the component */}
            <PortfolioSummary
              balance={portfolio.cash_balance}
              totalValue={portfolio.total_portfolio_value}
              totalPnL={portfolio.total_portfolio_pnl}
              holdings={portfolio.stocks.map(stock => ({
                symbol: stock.ticker,
                name: stock.ticker,
                quantity: stock.quantity,
                currentPrice: stock.current_price,
                totalValue: stock.market_value,
                avgPrice: stock.avg_price,
                pnl: stock.pnl,
                pnlPercent: stock.pnl_percent,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
