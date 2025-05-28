'use client';
import {useQuiz} from '@/context/QuizContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {CheckCircle2, XCircle} from "lucide-react";
import {useTimer} from '@/context/TimerContext';

export default function ScoreboardPage() {
    const {questions, userAnswers} = useQuiz();
    const {stopTimer} = useTimer();
    const router = useRouter();

    useEffect(() => {
        if (!questions || questions.length === 0) {
            router.push('/');
            return;
        }
        // Ensure timer is stopped when viewing scoreboard
        stopTimer();
    }, [questions, router, stopTimer]);

    return (
        <div className="min-h-screen bg-gray-50 rounded-2xl">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Score Board</h1>

                <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers[index];
                        const isCorrect = userAnswer === question.correct_answer;

                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1}}
                                className={`bg-white rounded-lg shadow-md p-6 ${
                                    isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                                }`}
                            >
                                <div className="flex items-start gap-2 mb-6">
                                    <span className="text-lg font-semibold">Q{index + 1}:</span>
                                    <p className="text-lg">{question.question}</p>
                                </div>

                                <RadioGroup
                                    defaultValue={userAnswer}
                                    className="space-y-3 ml-6"
                                >
                                    {question.options.map((option, optionIndex) => {
                                        const isUserAnswer = option === userAnswer;
                                        const isCorrectAnswer = option === question.correct_answer;

                                        return (
                                            <div
                                                key={optionIndex}
                                                className={`flex items-center space-x-2 p-3 rounded-md ${
                                                    isCorrectAnswer
                                                        ? 'bg-green-50 border border-green-200'
                                                        : isUserAnswer && !isCorrect
                                                            ? 'bg-red-50 border border-red-200'
                                                            : 'bg-gray-50 border border-gray-200'
                                                }`}
                                            >
                                                <RadioGroupItem
                                                    value={option}
                                                    id={`q${index}-option${optionIndex}`}
                                                    disabled
                                                    className={`
                                                        ${isCorrectAnswer ? 'text-green-600' : ''}
                                                        ${isUserAnswer && !isCorrect ? 'text-red-600' : ''}
                                                    `}
                                                />
                                                <Label
                                                    htmlFor={`q${index}-option${optionIndex}`}
                                                    className="flex-1 cursor-default"
                                                >
                                                    {option}
                                                </Label>
                                                {isCorrectAnswer && (
                                                    <CheckCircle2 className="h-5 w-5 text-green-600"/>
                                                )}
                                                {isUserAnswer && !isCorrect && (
                                                    <XCircle className="h-5 w-5 text-red-600"/>
                                                )}
                                            </div>
                                        );
                                    })}
                                </RadioGroup>

                                {!isCorrect && (
                                    <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                                        <p>Your answer: <span className="text-red-600">{userAnswer}</span></p>
                                        <span>•</span>
                                        <p>Correct answer: <span
                                            className="text-green-600">{question.correct_answer}</span></p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <Button
                        onClick={() => router.push('/')}
                        className="cursor-pointer text-white px-6 py-2 rounded-md"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}