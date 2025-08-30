import { useState } from 'react';
import BadgeCard from '@/components/BadgeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Calendar, 
  Award, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain,
  Zap,
  Trophy,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "January 2024",
    currentStreak: 7,
    longestStreak: 15,
    totalLessonsCompleted: 8,
    totalQuizzesCompleted: 12,
    averageQuizScore: 85,
    portfolioValue: 12450,
    portfolioPnL: 2450
  });

  const badges = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      type: 'achievement' as const,
      earned: true,
      earnedDate: "Jan 15, 2024"
    },
    {
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      type: 'achievement' as const,
      earned: true,
      earnedDate: "Jan 22, 2024"
    },
    {
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      type: 'streak' as const,
      earned: true,
      earnedDate: "Feb 1, 2024"
    },
    {
      title: "Portfolio Builder",
      description: "Create your first investment portfolio",
      type: 'milestone' as const,
      earned: true,
      earnedDate: "Feb 5, 2024"
    },
    {
      title: "Lesson Legend",
      description: "Complete 10 lessons",
      type: 'milestone' as const,
      earned: false,
      progress: 8,
      maxProgress: 10
    },
    {
      title: "Consistency King",
      description: "Maintain a 30-day learning streak",
      type: 'streak' as const,
      earned: false,
      progress: 7,
      maxProgress: 30
    },
    {
      title: "Quiz Champion",
      description: "Complete 25 quizzes",
      type: 'achievement' as const,
      earned: false,
      progress: 12,
      maxProgress: 25
    },
    {
      title: "Investment Pro",
      description: "Achieve 20% portfolio growth",
      type: 'special' as const,
      earned: false,
      progress: 24.5,
      maxProgress: 20
    }
  ];

  const recentActivity = [
    {
      type: 'lesson',
      title: 'Completed "Portfolio Diversification"',
      time: '2 hours ago',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      type: 'quiz',
      title: 'Scored 90% on Risk Management Quiz',
      time: '1 day ago',
      icon: <Brain className="w-4 h-4" />
    },
    {
      type: 'trade',
      title: 'Bought 10 shares of AAPL',
      time: '2 days ago',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      type: 'achievement',
      title: 'Earned "Week Warrior" badge',
      time: '3 days ago',
      icon: <Award className="w-4 h-4" />
    }
  ];

  const learningGoals = [
    {
      title: "Complete Beginner Track",
      progress: 80,
      target: "5 lessons remaining",
      deadline: "End of month"
    },
    {
      title: "Maintain Learning Streak",
      progress: 23,
      target: "7 days current",
      deadline: "Daily goal"
    },
    {
      title: "Achieve 90% Quiz Average",
      progress: 94,
      target: "85% current",
      deadline: "This quarter"
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-foreground mb-2">Progress Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Track your learning journey and investment growth
          </p>
        </div>

        {/* User Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{user.currentStreak} days</div>
              <p className="text-xs text-muted-foreground">Longest: {user.longestStreak} days</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{user.totalLessonsCompleted}</div>
              <p className="text-xs text-muted-foreground">Total lessons</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Average</CardTitle>
              <Brain className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{user.averageQuizScore}%</div>
              <p className="text-xs text-muted-foreground">{user.totalQuizzesCompleted} quizzes taken</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${user.portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-success">+${user.portfolioPnL.toLocaleString()} (+24.5%)</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Goals */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {learningGoals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.target}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {goal.deadline}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2 progress-animate" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Earned Badges */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  Earned Achievements ({earnedBadges.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <BadgeCard
                      key={index}
                      title={badge.title}
                      description={badge.description}
                      type={badge.type}
                      earned={badge.earned}
                      earnedDate={badge.earnedDate}
                    />
                  ))}
                </div>
              </div>

              {/* In Progress Badges */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  In Progress ({inProgressBadges.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inProgressBadges.map((badge, index) => (
                    <BadgeCard
                      key={index}
                      title={badge.title}
                      description={badge.description}
                      type={badge.type}
                      earned={badge.earned}
                      progress={badge.progress}
                      maxProgress={badge.maxProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;