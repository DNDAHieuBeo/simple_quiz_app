import axios from 'axios';
import he from 'he';
export async function fetchQuestion(difficulty: string, type: string) {
    try {
        let url = `https://opentdb.com/api.php?amount=10`;
        if (difficulty !== "random") {
            url += `&difficulty=${difficulty}`;
        }
        if (type !== "random") {
            url += `&type=${type}`;
        }

        const response = await axios.get<{ results: RawQuestion[] }>(url);
        const data = response.data.results.map((q) => {
            const options = [...q.incorrect_answers, q.correct_answer];
            return {
                question: he.decode(q.question),
                correct_answer: he.decode(q.correct_answer),
                options: options.map((o: string) => he.decode(o)).sort(() => Math.random() - 0.5),
            };
        });

        return data;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
        throw new Error("Failed to fetch questions");
    }
}
