'use client';
import React from 'react';
import { useTimer } from '@/context/TimerContext';

export default function Timer() {
    const { seconds } = useTimer();

    return (
        <div className="absolute top-4 right-6 text-white font-semibold text-lg bg-black/50 px-4 py-2 rounded">
            ⏱️ {seconds} giây
        </div>
    );
}
