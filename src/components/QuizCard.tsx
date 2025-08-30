import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

const QuizCard = ({ question, options, explanation, onAnswer }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);

  const handleSubmit = () => {
    if (!selectedAnswer || submitted) return;

    const selected = options.find(option => option.id === selectedAnswer);
    const isCorrect = selected?.correct || false;

    setSubmitted(true);
    setFeedback({
      correct: isCorrect,
      explanation: explanation,
    });
    
    onAnswer(isCorrect);
  };

  const resetQuiz = () => {
    setSelectedAnswer('');
    setSubmitted(false);
    setFeedback(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Quiz Question
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium text-foreground">{question}</p>
        </div>

        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          disabled={submitted}
          className="space-y-3"
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label 
                htmlFor={option.id} 
                className={`flex-1 cursor-pointer p-3 rounded-lg border transition-colors ${
                  submitted 
                    ? option.correct 
                      ? 'bg-success/10 border-success text-success-foreground'
                      : selectedAnswer === option.id 
                        ? 'bg-destructive/10 border-destructive text-destructive-foreground'
                        : 'bg-muted/50'
                    : 'hover:bg-accent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  {submitted && (
                    <>
                      {option.correct && (
                        <CheckCircle className="w-5 h-5 text-success" />
                      )}
                      {!option.correct && selectedAnswer === option.id && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex gap-3">
          {!submitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
              className="flex-1 btn-hero"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={resetQuiz} 
              variant="outline" 
              className="flex-1"
            >
              Try Another Question
            </Button>
          )}
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg border ${
            feedback.correct 
              ? 'bg-success/10 border-success text-success-foreground' 
              : 'bg-destructive/10 border-destructive text-destructive-foreground'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {feedback.correct ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {feedback.correct ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm">{feedback.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;