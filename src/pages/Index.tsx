import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  PlayCircle,
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Lessons",
      description: "Learn investment fundamentals through engaging, bite-sized lessons designed for beginners."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Knowledge Testing",
      description: "Test your understanding with interactive quizzes and get instant feedback on your progress."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Risk-Free Simulator",
      description: "Practice trading with virtual money in a realistic market environment."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Learning",
      description: "Build confidence without financial risk using our comprehensive simulation platform."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Students Learning" },
    { value: "95%", label: "Success Rate" },
    { value: "50+", label: "Lessons Available" },
    { value: "24/7", label: "Learning Access" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0 bg-background/10" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white animate-fadeInUp">
                Learn, Practice & 
                <span className="text-yellow-300"> Invest Safely</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
                Master the fundamentals of investing through interactive lessons, 
                quizzes, and risk-free trading simulation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideInRight">
              <Link to="/lessons">
                <Button size="lg" className="btn-hero px-8 py-4 text-lg font-semibold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </Link>
              <Link to="/simulator">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Try Simulator
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose EduInvest?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines education with hands-on practice to give you the confidence 
              to invest wisely in real markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-lift border-border/50 hover:border-primary/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of learners who are building their financial future with confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lessons">
              <Button size="lg" className="btn-success px-8 py-4 text-lg font-semibold">
                <Award className="w-5 h-5 mr-2" />
                Start Your Education
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                <Users className="w-5 h-5 mr-2" />
                View Progress
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
