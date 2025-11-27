import { type ReactNode, createContext, useContext, useState } from "react";

type LaunchState = {
	launch: boolean;
	setLaunch: React.Dispatch<React.SetStateAction<boolean>>;
};

const LaunchContext = createContext<LaunchState>({
	launch: false,
	setLaunch: () => {},
});

export default function LaunchProvider({ children }: { children: ReactNode }) {
	const [launch, setLaunch] = useState<boolean>(false);

	return (
		<LaunchContext.Provider value={{ launch, setLaunch }}>
			{children}
		</LaunchContext.Provider>
	);
}

export function useLaunch() {
	const context = useContext(LaunchContext);

	return context;
}
