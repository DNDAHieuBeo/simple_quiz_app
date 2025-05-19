'use client';
import React, { ReactNode } from "react";
import { TimerProvider } from '@/context/TimerContext';
import QuizLayoutContent from '@/components/QuizLayoutContent';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <TimerProvider>
            <QuizLayoutContent>{children}</QuizLayoutContent>
        </TimerProvider>
    );
}
