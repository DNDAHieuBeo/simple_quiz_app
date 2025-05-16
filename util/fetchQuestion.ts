import axios from 'axios';
import config from "@/util/config";
import he from 'he';

export async function fetchQuestion(difficulty: string) {
    try {
        let url = `${config.env.quizApi}/api.php?amount=10`;
        if (difficulty !== "random") {
            url += `&difficulty=${difficulty}`;
        }

        const response = await axios.get(url);
        const data = response.data.results.map((q: any) => {
            const options = [...q.incorrect_answers, q.correct_answer];
            return {
                question: he.decode(q.question),
                correct_answer: he.decode(q.correct_answer),
                options: options.map((o: string) => he.decode(o)).sort(() => Math.random() - 0.5),
            };
        });
        return data;
    } catch (error) {
        throw new Error("Failed to fetch questions");
    }
}

