export interface Movie {
	id: number;
	poster_path: string;
	title: string;
}

export interface MovieData {
	id: number;
	title: string;
	release_date: string;
	vote_average: number;
	runtime: number;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	production_countries: { name: string }[];
	production_companies: { name: string }[];
}
