'use client';
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
    const { questions } = useQuiz();
    const router = useRouter();

    const total = questions.length;
    const correct = 0; // Nếu bạn muốn tính đúng/sai thì cần lưu kết quả mỗi câu nữa

    return (
        <main className="text-center mt-10">
            <h1 className="text-2xl mb-4">Kết quả</h1>
            <p>Bạn đã hoàn thành {total} câu hỏi</p>
            <p>Số câu đúng: {correct}</p>
            <button
                onClick={() => router.push('/')}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
                Chơi lại
            </button>
        </main>
    );
}
