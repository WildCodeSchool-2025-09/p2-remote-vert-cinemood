const apiUrl = "https://api.themoviedb.org/3/";
// const urlGenre = "https://api.themoviedb.org/3/genre/movie/list";
const accessToken =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDBlNThkMGE5MTZlN2RjODYyNGMwN2M3Zjg1MTQ3MSIsIm5iZiI6MTc2MjE2NTI4MC42OTcsInN1YiI6IjY5MDg4MjIwMTYyODg1YjQxYmRkODczZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UwcwODoXxLIwygVTUmmBRyhlmJQ-WYQoWDYwlUC2ank";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
};

export async function fetchMovies() {
	const url = `${apiUrl}discover/movie?&include_adult=false&include_video=false&language=fr-FR&vote_average.gte=5&primary_release_date.gte=1960-01-01&vote_count.gte=100&page=1`;
	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error("rror fetching movies:", err);
		return [];
	}
}

export async function movieGenres() {
	const urlGenre = "https://api.themoviedb.org/3/genre/movie/list";
	try {
		const res = await fetch(urlGenre, options);
		const data = await res.json();
		return data || [];
	} catch (err) {
		console.error("Data is not found:", err);
	}
}

export async function popular() {
	const url = "https://api.themoviedb.org/3/trending/movie/day";

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results.slice(0, 5) || [];
	} catch (err) {
		console.error("Data is not found:", err);
	}
}

export async function topRated() {
	const url = `${apiUrl}tv/top_rated?language=fr-FR&page=1`;

	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data.results?.slice(0, 5) || [];
	} catch (err) {
		console.error("Error fetching movies by genre:", err);
		return [];
	}
}
