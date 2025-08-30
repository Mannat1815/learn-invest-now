import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

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

interface PortfolioSummaryProps {
  balance: number;
  totalValue: number;
  totalPnL: number;
  holdings: Holding[];
}

const PortfolioSummary = ({ balance, totalValue, totalPnL, holdings }: PortfolioSummaryProps) => {
  const totalPortfolioValue = balance + totalValue;
  const overallPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available to trade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Market value of stocks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalPnL >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
            <p className={`text-xs ${
              overallPnLPercent >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {overallPnLPercent >= 0 ? '+' : ''}{overallPnLPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Current Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {holdings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No holdings yet. Start trading to build your portfolio!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {holdings.map((holding) => (
                <div
                  key={holding.symbol}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{holding.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{holding.name}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {holding.quantity} shares
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Avg: ${holding.avgPrice.toFixed(2)}</div>
                        <div className="text-foreground">Now: ${holding.currentPrice.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          ${holding.totalValue.toFixed(2)}
                        </div>
                        <div className={`text-sm font-medium ${
                          holding.pnl >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toFixed(2)} 
                          ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;