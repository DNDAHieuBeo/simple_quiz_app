'use client';
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function QuestionCard({
                                         question,
                                         options,
                                         questionIndex,
                                         onSelect,
                                         selectedOption,
                                     }: QuestionCardProps) {
    const isAnswered = !!selectedOption;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto mt-8"
        >
            <div className="flex items-start gap-2 mb-6">
                <span className="text-lg font-semibold text-gray-800">Q{questionIndex + 1}:</span>
                <p className="text-lg text-gray-700">{question}</p>
            </div>

            <RadioGroup
                value={selectedOption}
                onValueChange={onSelect}
                className="space-y-3 ml-6"
            >
                {options.map((opt, idx) => {
                    const id = `q${questionIndex}-opt${idx}`;
                    const isSelected = selectedOption === opt;

                    return (
                        <div
                            key={idx}
                            className={`flex items-center space-x-2 p-3 rounded-md border transition-colors
                ${isSelected ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}
                ${isAnswered && !isSelected ? 'opacity-70' : ''}
              `}
                        >
                            <RadioGroupItem
                                value={opt}
                                id={id}
                                disabled={isAnswered}
                                className="cursor-pointer"
                            />
                            <Label htmlFor={id} className="flex-1 cursor-pointer text-gray-800">
                                {opt}
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </motion.div>
    );
}
