'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { fetchQuestion } from '@/util/fetchQuestion';
import { useQuiz } from '@/context/QuizContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Home() {
    const [difficulty, setDifficulty] = useState("random");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { setQuestions } = useQuiz();

    const handleStart = async () => {
        setLoading(true);
        try {
            const data = await fetchQuestion(difficulty);
            setQuestions(data); // Lưu câu hỏi vào context
            router.push('/quiz/0'); // Chuyển đến trang quiz đầu tiên
        } catch (error) {
            alert('Lỗi khi tải câu hỏi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="text-center mt-10 items-center">
            <h1 className="text-2xl mb-4">Chào mừng đến với Quiz!</h1>
            <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>
            <button
                onClick={handleStart}
                className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
                disabled={loading}
            >
                {loading ? 'Đang tải...' : 'Bắt đầu'}
            </button>
        </main>
    );
}
