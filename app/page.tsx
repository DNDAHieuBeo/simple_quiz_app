'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { fetchQuestion } from '@/util/fetchQuestion';
import { useQuiz } from '@/context/QuizContext';
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function Home() {
    const [difficulty, setDifficulty] = useState("random");
    const [type, setType] = useState("random");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { setQuestions } = useQuiz();

    const handleStart = async () => {
        setLoading(true);
        try {
            const data = await fetchQuestion(difficulty,type);
            setQuestions(data);
            router.push('/quiz/0');
        } catch (error) {
            console.error('Error fetching questions:', error);
            alert('Failed to load quiz questions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:px-16 mx-auto overflow-hidden h-screen bg-white">
            {/* Left Side Image */}
            <div>
                <motion.div
                    initial={{ rotateY: 90, opacity: 0, transformOrigin: "left" }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                >
                    <Image
                        src="/landing.jpg"
                        width={700}
                        height={700}
                        alt="quiz illustration"
                        className="mx-auto"
                        priority
                    />
                </motion.div>
            </div>

            {/* Right Side Content */}
            <div>
                <motion.div
                    className="bg-purple-50 shadow-xl rounded-2xl p-8 flex flex-col md:gap-6"
                    initial={{ rotateY: 90, opacity: 0, transformOrigin: "right" }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                >
                    <h1 className="text-3xl font-bold mb-2">🧠 Welcome to the Ultimate Quiz!</h1>
                    <p className="text-gray-600 mb-4">
                        Challenge your brain with a variety of fun and tricky questions. Choose your preferred difficulty and get started now!
                    </p>

                    <div className="mb-4">
                        <label htmlFor="difficulty" className="block mb-1 font-medium">Select Difficulty</label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Choose difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="random">🎲 Random</SelectItem>
                                <SelectItem value="easy">🟢 Easy</SelectItem>
                                <SelectItem value="medium">🟡 Medium</SelectItem>
                                <SelectItem value="hard">🔴 Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block mb-1 font-medium">Select Type</label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Choose type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="random">🎲 Random</SelectItem>
                                <SelectItem value="multiple">🟢 Multiple choice</SelectItem>
                                <SelectItem value="boolean">🟡 True or false</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <button
                        onClick={handleStart}
                        className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-6 py-2 rounded-md mt-2 cursor-pointer flex justify-center items-center min-w-[120px] h-[44px] text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin" />
                        ) : 'Start Quiz'}
                    </button>

                    <p className="text-sm text-gray-500 mt-4 text-center">🎉 Join 1,200+ users who have already tested their knowledge!</p>
                </motion.div>
            </div>
        </section>
    );
}
