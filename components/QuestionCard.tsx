'use client';
import React from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";


export default function QuestionCard({
                                         question,
                                         options,
                                         questionIndex,
                                         onSelect,
                                         selectedOption,
                                     }: QuestionCardProps) {
    const isAnswered = !!selectedOption;
    return (
        <div className="p-6 rounded text-left max-w-xl mx-auto space-y-4">
            <p className="font-semibold text-lg">
                Question {questionIndex + 1}: {question}
            </p>
            <RadioGroup
                value={selectedOption}
                onValueChange={onSelect}
                className="space-y-2"
            >
                {options.map((opt, idx) => {
                    const id = `q${questionIndex}-opt${idx}`;
                    return (
                        <div className="flex items-center space-x-2" key={idx}>
                            <RadioGroupItem value={opt} id={id} disabled={isAnswered} className="cursor-pointer disabled:opacity-50"/>
                            <Label htmlFor={id}>{opt}</Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
}
