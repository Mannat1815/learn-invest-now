import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface BadgeCardProps {
  title: string;
  description: string;
  type: 'achievement' | 'streak' | 'milestone' | 'special';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedDate?: string;
}

const BadgeCard = ({ 
  title, 
  description, 
  type, 
  earned, 
  progress = 0, 
  maxProgress = 100,
  earnedDate 
}: BadgeCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-6 h-6" />;
      case 'streak':
        return <Zap className="w-6 h-6" />;
      case 'milestone':
        return <Target className="w-6 h-6" />;
      case 'special':
        return <Star className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  const getTypeColor = () => {
    if (!earned) return 'text-muted-foreground';
    
    switch (type) {
      case 'achievement':
        return 'text-warning';
      case 'streak':
        return 'text-primary';
      case 'milestone':
        return 'text-success';
      case 'special':
        return 'text-secondary';
      default:
        return 'text-primary';
    }
  };

  const getTypeBackground = () => {
    if (!earned) return 'bg-muted/20';
    
    switch (type) {
      case 'achievement':
        return 'bg-warning/10 border-warning/20';
      case 'streak':
        return 'bg-primary/10 border-primary/20';
      case 'milestone':
        return 'bg-success/10 border-success/20';
      case 'special':
        return 'bg-secondary/10 border-secondary/20';
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };

  const progressPercent = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;

  return (
    <Card className={`group hover-lift transition-all duration-300 border ${
      earned ? getTypeBackground() : 'border-border/50 bg-muted/20'
    } ${earned ? 'shadow-md' : 'opacity-60'}`}>
      <CardContent className="p-6 text-center space-y-4">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
          earned ? getTypeBackground() : 'bg-muted'
        } ${earned ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
          <div className={getTypeColor()}>
            {getIcon()}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className={`font-semibold text-lg ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
            {title}
          </h3>
          <p className={`text-sm ${earned ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
            {description}
          </p>
        </div>

        {earned ? (
          <div className="space-y-2">
            <Badge variant="outline" className={`${getTypeColor()} border-current`}>
              Earned
            </Badge>
            {earnedDate && (
              <p className="text-xs text-muted-foreground">
                Earned on {earnedDate}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
              In Progress
            </Badge>
            {maxProgress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{progress}/{maxProgress}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeCard;