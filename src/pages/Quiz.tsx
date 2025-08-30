import { useState } from 'react';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, RotateCcw, Award, TrendingUp } from 'lucide-react';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the primary benefit of diversifying your investment portfolio?",
      options: [
        { id: 'a', text: 'Guaranteed higher returns', correct: false },
        { id: 'b', text: 'Reduced overall risk', correct: true },
        { id: 'c', text: 'Lower investment fees', correct: false },
        { id: 'd', text: 'Faster investment growth', correct: false }
      ],
      explanation: "Diversification helps reduce overall portfolio risk by spreading investments across different asset classes, sectors, and geographical regions. While it doesn't guarantee higher returns, it helps protect against significant losses."
    },
    {
      id: 2,
      question: "What does P/E ratio stand for in stock analysis?",
      options: [
        { id: 'a', text: 'Profit/Equity ratio', correct: false },
        { id: 'b', text: 'Price/Earnings ratio', correct: true },
        { id: 'c', text: 'Performance/Efficiency ratio', correct: false },
        { id: 'd', text: 'Portfolio/Exchange ratio', correct: false }
      ],
      explanation: "P/E ratio stands for Price-to-Earnings ratio. It's calculated by dividing the current stock price by the earnings per share (EPS) and helps investors evaluate if a stock is overvalued or undervalued."
    },
    {
      id: 3,
      question: "Which investment typically offers the highest potential returns over the long term?",
      options: [
        { id: 'a', text: 'Savings accounts', correct: false },
        { id: 'b', text: 'Government bonds', correct: false },
        { id: 'c', text: 'Stocks (equities)', correct: true },
        { id: 'd', text: 'Certificates of deposit', correct: false }
      ],
      explanation: "Historically, stocks have provided the highest long-term returns among traditional asset classes, though they also come with higher volatility and risk compared to bonds and cash equivalents."
    },
    {
      id: 4,
      question: "What is dollar-cost averaging?",
      options: [
        { id: 'a', text: 'Buying stocks only when prices are low', correct: false },
        { id: 'b', text: 'Investing a fixed amount regularly regardless of market conditions', correct: true },
        { id: 'c', text: 'Converting all investments to US dollars', correct: false },
        { id: 'd', text: 'Calculating the average cost of your portfolio', correct: false }
      ],
      explanation: "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions. This helps reduce the impact of market volatility over time."
    },
    {
      id: 5,
      question: "What is compound interest?",
      options: [
        { id: 'a', text: 'Interest paid twice per year', correct: false },
        { id: 'b', text: 'Interest calculated on complex formulas', correct: false },
        { id: 'c', text: 'Interest earned on both principal and previously earned interest', correct: true },
        { id: 'd', text: 'Interest that compounds monthly', correct: false }
      ],
      explanation: "Compound interest is the interest earned on both the original principal amount and the accumulated interest from previous periods. It's often called 'interest on interest' and is a powerful force in long-term investing."
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    
    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent work! You have a strong understanding of investment fundamentals.';
    if (percentage >= 60) return 'Good job! Consider reviewing the areas you missed.';
    return 'Keep studying! Review the lesson materials and try again.';
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor()}`}>
                    {score}/{questions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor()}`}>
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {questions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg">
                <p className={`text-lg font-medium ${getScoreColor()}`}>
                  {getScoreMessage()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} className="btn-hero">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Knowledge Quiz</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Test your understanding of investment fundamentals
          </p>
          
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 progress-animate" />
          </div>
        </div>

        {/* Score Display */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Current Score</span>
              </div>
              <div className="text-lg font-bold text-primary">
                {score}/{currentQuestionIndex} correct
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <QuizCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          explanation={currentQuestion.explanation}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;