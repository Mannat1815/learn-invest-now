import { useState } from 'react';
import LessonCard from '@/components/LessonCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, TrendingUp, DollarSign, PieChart, Shield, Brain, Target } from 'lucide-react';

const Lessons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const lessons = [
    {
      id: 1,
      title: "Introduction to Investing",
      description: "Learn the fundamental concepts of investing, risk vs return, and different asset classes.",
      duration: "15 min",
      difficulty: 'Beginner' as const,
      progress: 100,
      language: "English",
      completed: true,
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Understanding Stocks",
      description: "Dive deep into stock markets, how they work, and what drives stock prices.",
      duration: "20 min",
      difficulty: 'Beginner' as const,
      progress: 75,
      language: "English",
      completed: false,
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Bonds and Fixed Income",
      description: "Explore bonds, treasury securities, and how fixed income investments work.",
      duration: "18 min",
      difficulty: 'Intermediate' as const,
      progress: 0,
      language: "English",
      completed: false,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Portfolio Diversification",
      description: "Learn how to build a balanced portfolio and manage investment risk effectively.",
      duration: "25 min",
      difficulty: 'Intermediate' as const,
      progress: 40,
      language: "English",
      completed: false,
      icon: <PieChart className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Risk Management",
      description: "Master the art of managing investment risk and protecting your capital.",
      duration: "22 min",
      difficulty: 'Advanced' as const,
      progress: 0,
      language: "English",
      completed: false,
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Technical Analysis Basics",
      description: "Introduction to chart patterns, indicators, and technical analysis tools.",
      duration: "30 min",
      difficulty: 'Advanced' as const,
      progress: 0,
      language: "English",
      completed: false,
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Setting Investment Goals",
      description: "Learn how to set realistic investment goals and create a plan to achieve them.",
      duration: "12 min",
      difficulty: 'Beginner' as const,
      progress: 60,
      language: "English",
      completed: false,
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Market Psychology",
      description: "Understand market emotions, behavioral biases, and how they affect investment decisions.",
      duration: "28 min",
      difficulty: 'Intermediate' as const,
      progress: 0,
      language: "English",
      completed: false,
      icon: <Brain className="w-6 h-6" />
    }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'All' || lesson.difficulty === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const getProgressStats = () => {
    const completed = lessons.filter(l => l.completed).length;
    const inProgress = lessons.filter(l => l.progress > 0 && !l.completed).length;
    const notStarted = lessons.filter(l => l.progress === 0).length;
    
    return { completed, inProgress, notStarted, total: lessons.length };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Lessons</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master investing through our comprehensive curriculum designed for all skill levels.
          </p>

          {/* Progress Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-success">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-warning">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-muted-foreground">{stats.notStarted}</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option}
                  variant={filterLevel === option ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterLevel(option as any)}
                  className="whitespace-nowrap"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              duration={lesson.duration}
              difficulty={lesson.difficulty}
              progress={lesson.progress}
              language={lesson.language}
              completed={lesson.completed}
              icon={lesson.icon}
            />
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No lessons found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;