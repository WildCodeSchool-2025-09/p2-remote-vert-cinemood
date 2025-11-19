import { type ReactNode, createContext, useContext, useState } from "react";

type QuizState = {
	quizAnswers: string[];
	setQuizAnswers: React.Dispatch<React.SetStateAction<string[]>>;
};

const QuizContext = createContext<QuizState>({
	quizAnswers: [],
	setQuizAnswers: () => {},
});

export default function QuizProvider({ children }: { children: ReactNode }) {
	const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

	return (
		<QuizContext.Provider value={{ quizAnswers, setQuizAnswers }}>
			{children}
		</QuizContext.Provider>
	);
}

export function useQuiz() {
	const context = useContext(QuizContext);

	return context;
}
