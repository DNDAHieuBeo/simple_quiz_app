'use client';
import React, { ReactNode, useEffect } from 'react';
import { useTimer } from '@/context/TimerContext';
import Timer from '@/components/Timer';
import { usePathname } from 'next/navigation';

export default function QuizLayoutContent({ children }: { children: ReactNode }) {
    const { startTimer, stopTimer } = useTimer();
    const pathname = usePathname();

    useEffect(() => {
        // Start timer only on quiz questions pages
        if (pathname.startsWith('/quiz/') && !pathname.includes('/results') && !pathname.includes('/scoreboard')) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [pathname, startTimer, stopTimer]);

    return (
        <main className="relative flex items-center justify-center h-screen w-screen bg-[url('/background.jpg')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-0" />
            <Timer />
            <section className="relative z-10 p-6 max-w-xl w-full backdrop-blur-lg rounded-2xl shadow-xl animate-fade-in bg-white ">
                {children}
            </section>
        </main>
    );
}
