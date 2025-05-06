import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Problem } from '@/data/dsaProblems';
import { Badge } from "@/components/ui/badge";

interface ProblemSelectorProps {
  onSelectProblem: (problemId: string) => void;
  currentProblemId?: string;
  problems: Problem[];
}

const ProblemSelector = ({ onSelectProblem, currentProblemId, problems }: ProblemSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectProblem = (problemId: string) => {
    onSelectProblem(problemId);
    setIsOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentProblem = problems.find(p => p.id === currentProblemId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {currentProblemId && currentProblem
            ? `Problem ${currentProblemId}: ${currentProblem.title}`
            : 'Select Problem'
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Problem</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-[60vh] overflow-auto py-2">
          {problems.map((problem) => (
            <button
              key={problem.id}
              className={`w-full text-left p-3 rounded-md flex justify-between items-center ${
                currentProblemId === problem.id 
                  ? 'bg-secondary' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectProblem(problem.id)}
            >
              <div>
                <div className="font-medium">{problem.title}</div>
                <div className="text-sm text-gray-500">Problem #{problem.id}</div>
              </div>
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemSelector;
