'use client';
import React, { createContext, useContext, useState } from 'react';

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error('useQuiz must be used within a QuizProvider');
    return context;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);


    return (
        <QuizContext.Provider value={{ questions, setQuestions ,userAnswers ,setUserAnswers}}>
            {children}
        </QuizContext.Provider>
    );
};
