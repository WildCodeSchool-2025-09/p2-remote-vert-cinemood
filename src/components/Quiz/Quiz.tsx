import "./Quiz.css";

const quizPictures = [
	{
		id: "img01",
		genres: [16, 35, 10751, 10402, 10749],
	},
	{
		id: "img02",
		genres: [35, 18, 10402, 10749],
	},
	{
		id: "img03",
		genres: [80, 27, 9648, 878, 53],
	},
	{
		id: "img04",
		genres: [12, 10751, 14, 36, 9648],
	},
	{
		id: "img05",
		genres: [80, 878, 53],
	},
	{
		id: "img06",
		genres: [16, 14, 36, 10749],
	},
	{
		id: "img07",
		genres: [12, 80],
	},
	{
		id: "img08",
		genres: [18, 36, 27, 9648],
	},
	{
		id: "img09",
		genres: [12, 16, 10751, 14],
	},
	{
		id: "img10",
		genres: [12, 16, 35],
	},
	{
		id: "img11",
		genres: [35, 10751, 14, 10402, 10749],
	},
	{
		id: "img12",
		genres: [80, 9648, 878],
	},
	{
		id: "img13",
		genres: [80, 27, 9648, 53, 10752],
	},
	{
		id: "img14",
		genres: [16, 18, 10751, 10749],
	},
	{
		id: "img15",
		genres: [12, 14, 36, 27, 9648, 53, 10752],
	},
	{
		id: "img16",
		genres: [16, 35, 10751, 37],
	},
	{
		id: "img17",
		genres: [12, 878, 10752],
	},
	{
		id: "img18",
		genres: [80, 18, 36, 9648, 53],
	},
	{
		id: "img19",
		genres: [18, 36, 27, 9648, 53],
	},
	{
		id: "img20",
		genres: [16, 35, 10751, 14, 10749],
	},
	{
		id: "img21",
		genres: [16, 35, 10751],
	},
	{
		id: "img22",
		genres: [16, 35, 10751, 10402],
	},
	{
		id: "img23",
		genres: [35, 18, 10402, 10749],
	},
	{
		id: "img24",
		genres: [27, 53, 10752],
	},
	{
		id: "img25",
		genres: [80, 18, 878],
	},
	{
		id: "img26",
		genres: [16, 14, 878],
	},
	{
		id: "img27",
		genres: [12, 14, 878],
	},
	{
		id: "img28",
		genres: [80, 18, 27, 9648, 53],
	},
	{
		id: "img29",
		genres: [18, 36, 10752, 37],
	},
	{
		id: "img30",
		genres: [18, 9648, 10749, 53],
	},
	{
		id: "img31",
		genres: [12, 14, 878],
	},
	{
		id: "img32",
		genres: [27, 53, 37],
	},
	{
		id: "img33",
		genres: [80, 18],
	},
	{
		id: "img34",
		genres: [16, 10751, 14],
	},
	{
		id: "img35",
		genres: [10752, 37],
	},
	{
		id: "img36",
		genres: [16, 35, 10402, 10749],
	},
	{
		id: "img37",
		genres: [80, 27, 53, 10752],
	},
	{
		id: "img38",
		genres: [12, 35, 80],
	},
	{
		id: "img39",
		genres: [9648, 878],
	},
	{
		id: "img40",
		genres: [18, 36, 37],
	},
	{
		id: "img41",
		genres: [12, 10751, 14],
	},
	{
		id: "img42",
		genres: [18, 36, 10752],
	},
	{
		id: "img43",
		genres: [80, 36, 37],
	},
	{
		id: "img44",
		genres: [27, 53, 10752, 37],
	},
	{
		id: "img45",
		genres: [14, 27, 37],
	},
	{
		id: "img46",
		genres: [27, 10752],
	},
	{
		id: "img47",
		genres: [12, 9648, 37],
	},
	{
		id: "img48",

		genres: [12, 36, 9648, 10752],
	},
	{
		id: "img49",
		genres: [12, 16, 18],
	},
	{
		id: "img50",
		genres: [80, 36, 27, 9648, 53, 37],
	},
	{
		id: "img51",
		genres: [35, 10751, 36, 10402, 10749],
	},
	{
		id: "img52",
		genres: [16, 35, 10751, 14, 10402, 10749],
	},
	{
		id: "img53",
		genres: [12, 35, 10402],
	},
	{
		id: "img54",
		genres: [16, 14, 878],
	},
	{
		id: "img55",
		genres: [80, 36, 27, 9648, 53, 10752, 37],
	},
	{
		id: "img56",
		genres: [14, 27, 37],
	},
	{
		id: "img57",
		genres: [12, 14, 27, 9648],
	},
	{
		id: "img58",
		genres: [12, 18, 36, 37],
	},
	{
		id: "img59",
		genres: [27, 878, 10752],
	},
	{
		id: "img60",
		genres: [18, 36, 10752],
	},
	{
		id: "img61",
		genres: [35, 10402, 10749],
	},
	{
		id: "img62",
		genres: [35, 10402, 878],
	},
	{
		id: "img63",
		genres: [18, 10402, 10752],
	},
	{
		id: "img64",
		genres: [35, 10402, 10749],
	},
	{
		id: "img65",
		genres: [80, 27, 9648, 878, 53],
	},
	{
		id: "img66",
		genres: [18, 27, 53],
	},
	{
		id: "img67",
		genres: [16, 10751, 37],
	},
	{
		id: "img68",
		genres: [80, 878],
	},
	{
		id: "img69",
		genres: [10751, 10749, 37],
	},
	{
		id: "img70",
		genres: [36, 27, 10752, 37],
	},
	{
		id: "img71",
		genres: [12, 80, 878],
	},
	{
		id: "img72",
		genres: [18, 10402, 10749, 37],
	},
	{
		id: "img73",
		genres: [80, 27, 9648, 878],
	},
	{
		id: "img74",
		genres: [36, 53, 37],
	},
	{
		id: "img75",
		genres: [35, 10402, 10749],
	},
	{
		id: "img76",
		genres: [16, 10751, 14],
	},
	{
		id: "img77",
		genres: [16, 14, 10749, 878],
	},
	{
		id: "img78",
		genres: [10751, 14, 36, 10749],
	},
	{
		id: "img79",
		genres: [12, 16, 10751],
	},
	{
		id: "img80",
		genres: [12, 36, 10752],
	},
];


function Quizz () {
return (
	<>
		<div className="quiz-container">
			<h2 className="secondary-title">
				Laisse ton humeur <span className="body-text-blue">te guider</span>
				<br />
				vers le bon film
			</h2>
			<div className="questions">
				<button className="quiz-images">A</button>
				<button className="quiz-images">B</button>


			</div>
		</div>
	</>
);
}

export default Quizz;