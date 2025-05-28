'use client';
import { useQuiz } from '@/context/QuizContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTimer } from '@/context/TimerContext';
import {Button} from "@/components/ui/button";

export default function ResultPage() {
    const { questions, userAnswers } = useQuiz();
    const { seconds, stopTimer } = useTimer();
    const [correctCount, setCorrectCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!questions || questions.length === 0) {
            router.push('/');
            return;
        }

        let correct = 0;

        for (let i = 0; i < userAnswers.length; i++) {
            const userAnswer = userAnswers[i];
            const correctAnswer = questions[i]?.correct_answer;

            if (userAnswer === correctAnswer) {
                correct++;
            }
        }

        stopTimer();
        setCorrectCount(correct);
    }, [questions, userAnswers, router, stopTimer]);


    const message =
        correctCount >= 5
            ? '🎉 Chúc mừng! Bạn làm rất tốt!'
            : '😢 Rất tiếc! Hãy luyện tập thêm nhé!';

    return (
        <div className="p-8 max-w-xl mx-auto text-center space-y-4 bg-white rounded shadow-md">
            <h1 className="text-3xl font-bold">Kết quả</h1>
            <p>Bạn trả lời đúng {correctCount}/{questions.length} câu.</p>
            <p>Thời gian hoàn thành: {seconds} giây</p>
            <h2 className="text-xl font-semibold text-green-600">{message}</h2>
            <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push('/')} className='cursor-pointer'>Restart</Button>
                <Button onClick={() => router.push('/quiz/scoreboard')} className='cursor-pointer'>Score Board</Button>
            </div>

        </div>
    );
}
