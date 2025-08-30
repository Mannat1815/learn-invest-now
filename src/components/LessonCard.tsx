import { BookOpen, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LessonCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  language: string;
  completed: boolean;
  icon: React.ReactNode;
}

const LessonCard = ({
  title,
  description,
  duration,
  difficulty,
  progress,
  language,
  completed,
  icon,
}: LessonCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group hover-lift cursor-pointer transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
      <div className="card-gradient">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-3">
              {icon}
            </div>
            {completed && (
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-success-foreground fill-current" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Badge variant="secondary" className="text-xs">
              {language}
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{progress}% Complete</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 progress-animate bg-muted" 
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default LessonCard;