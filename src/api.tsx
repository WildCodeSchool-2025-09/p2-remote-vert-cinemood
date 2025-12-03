const apiUrl = "https://api.themoviedb.org/3/";
const accessToken =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDBlNThkMGE5MTZlN2RjODYyNGMwN2M3Zjg1MTQ3MSIsIm5iZiI6MTc2MjE2NTI4MC42OTcsInN1YiI6IjY5MDg4MjIwMTYyODg1YjQxYmRkODczZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UwcwODoXxLIwygVTUmmBRyhlmJQ-WYQoWDYwlUC2ank";
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
};

async function getMoviesByPage(page) {
	const url = `${apiUrl}discover/movie?&include_adult=false&include_video=false&language=fr-FR&vote_average.gte=5&primary_release_date.gte=1960-01-01&vote_count.gte=100&page=${page}`;
	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("rror fetching movies:", err);
		return [];
	}
}

const nbMovie = 1000;
const totalPages = Math.ceil(nbMovie / 20);
const colectMovies = [];

for (let page = 1; totalPages >= page; page++) {
	const movie = await getMoviesByPage(page);
	colectMovies.push(...movie);
}

const moviesWithoutDuplicats = [...colectMovies.slice(0, nbMovie)];

export const getAllMovies = moviesWithoutDuplicats.filter(
	(movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
);

export async function getGenresMovies() {
	const urlGenre = "https://api.themoviedb.org/3/genre/movie/list";
	try {
		const res = await fetch(urlGenre, options);
		const data = await res.json();
		return data || [];
	} catch (err) {
		console.error("Data is not found:", err);
	}
}

export async function getPopularMovies() {
	const url = `${apiUrl}/movie/popular?language=fr-FR&page=1`;

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("Data is not found:", err);
	}
}

export async function getTopRatedMovies() {
	const url = `${apiUrl}movie/top_rated?language=fr-FR&page=1`;

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("Error fetching movies by genre:", err);
		return [];
	}
}

export async function getNowPlayingMovies() {
	const url = `${apiUrl}/movie/now_playing?language=fr-FR&page=1`;

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("Error fetching movies by genre:", err);
		return [];
	}
}

export async function getUpcomingMovies() {
	const url = `${apiUrl}/movie/upcoming?language=fr-FR&page=2`;

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("Error fetching movies by genre:", err);
		return [];
	}
}
