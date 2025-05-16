

interface Question {
    question: string;
    correct_answer: string;
    options: string[];
}

interface QuestionCardProps {
    question: string;
    options: string[];
    questionIndex: number;
    onSelect?: (value: string) => void;
    selectedOption?: string;
}

interface QuizContextType {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}