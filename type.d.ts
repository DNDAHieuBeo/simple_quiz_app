

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
    userAnswers: string[];
    setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}
type TimerContextType = {
    seconds: number;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
};

type RawQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};
