import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizButtonProps {
  option: string;
  onClick: () => void;
  disabled: boolean;
  isCorrect: boolean | null;
  isSelected: boolean;
}

const QuizButton = ({ option, onClick, disabled, isCorrect, isSelected }: QuizButtonProps) => {
  const getButtonClass = () => {
    if (!isSelected) return "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200";
    if (isCorrect) return "bg-success text-success-foreground font-semibold";
    return "bg-error text-error-foreground font-semibold";
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full min-h-[80px] p-4 text-left text-base leading-relaxed whitespace-normal break-words",
        getButtonClass()
      )}
    >
      {option}
    </Button>
  );
};

export default QuizButton;