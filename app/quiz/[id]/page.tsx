'use client';
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import QuestionCard from '@/components/QuestionCard';
import {motion} from "framer-motion";
import { useTimer } from '@/context/TimerContext';


export default function QuizPage() {

    const { id } = useParams();
    const questionIndex = parseInt(id as string, 10);
    const { questions, userAnswers, setUserAnswers } = useQuiz();
    const { stopTimer } = useTimer();
    const router = useRouter();

    const [selected, setSelected] = useState<string>("");
    const [feedback, setFeedback] = useState<React.ReactNode>(null);
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        if (questionIndex === 0 && startTime === null) {
            const now = Date.now();
            setStartTime(now);
            sessionStorage.setItem('startTime', now.toString());
        }
    }, [questionIndex, startTime]);


    useEffect(() => {
        // when there no any questions or the questions array is empty, it will get back to the homepage
        if (!questions || questions.length === 0) {
            router.push('/');
        }

    }, [questions]);


    // when no any questions or no any questionIndex
    if (!questions || !questions[questionIndex]) return null;
    // take the current question which are displaying on screen
    const currentQuestion = questions[questionIndex];
    // button will check, if the questionIndex are smaller than the length of the question array, it will navigate to new questions

    const handleSelect = (value: string) => {
        setSelected(value);

        const isCorrect = value === currentQuestion.correct_answer;

        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = value;
        setUserAnswers(newAnswers);

        setFeedback(
            isCorrect
                ? <p className="text-green-600 font-semibold">🎉 Correct!</p>
                : <p className="text-red-600 font-semibold">❌ Incorrect!</p>
        );

    };


    const goNext = () => {
        if (questionIndex < questions.length - 1) {
            router.push(`/quiz/${questionIndex + 1}`);
        } else {

            stopTimer(); // Stop the timer when quiz is finished
            router.push('/quiz/results');

        }
    };

    return (
        <motion.div
            className="p-6 space-y-4"
            initial={{rotateY: 90, opacity: 0}}
            animate={{rotateY: 0, opacity: 1}}
            exit={{rotateY: -90, opacity: 0}}
            transition={{duration: 2.5, ease: [0.22, 1, 0.36, 1]}}
        >
            <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                questionIndex={questionIndex}
                selectedOption={selected}
                onSelect={handleSelect}
            />
            {selected && (
                <div className="text-center text-lg font-medium text-blue-700 mt-2">
                    {feedback}
                </div>
            )}
            <div className="text-center">
                <Button onClick={goNext} disabled={!selected} className="cursor-pointer">
                    {questionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </motion.div>
    );
}
