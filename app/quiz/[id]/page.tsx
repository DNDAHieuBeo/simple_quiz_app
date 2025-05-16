'use client';
import { useQuiz } from '@/context/QuizContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import QuestionCard from '@/components/QuestionCard';

export default function QuizPage() {
    const { id } = useParams();
    const questionIndex = parseInt(id as string, 10);
    const { questions } = useQuiz();
    const router = useRouter();
    const [selected, setSelected] = useState<string>("");
    // this useEffect will run when the questions is changed
    useEffect(() => {
        // when there no any questions or the questions array are empty, it will get back to the homepage
        if (!questions || questions.length === 0) {
            router.push('/');
        }

    }, [questions]);
    // when no any questions or no any questionIndex
    if (!questions || !questions[questionIndex]) return null;
    // take the current question which are displaying on screen
    const currentQuestion = questions[questionIndex];
    // button will check, if the questionIndex are smaller than the length of the question array, it will navigate to new questions
    const goNext = () => {
        if (questionIndex < questions.length - 1) {
            router.push(`/quiz/${questionIndex + 1}`);
        } else {
            alert("Bạn đã hoàn thành tất cả câu hỏi!");

        }
    };

    return (
        <div className="p-6 space-y-4">
            <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                questionIndex={questionIndex}
                selectedOption={selected}
                onSelect={setSelected}
            />
            <div className="text-center">
                <Button onClick={goNext} disabled={!selected} className="cursor-pointer">
                    Câu tiếp
                </Button>
            </div>
        </div>
    );
}
