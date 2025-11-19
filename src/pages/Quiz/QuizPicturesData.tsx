const quizPicturesData = [
	{
		id: "img01",
		genres: [16, 35, 10751, 10402, 10749],
		description: "Fleurs jaunes",
	},
	{
		id: "img02",
		genres: [35, 18, 10402, 10749],
		description: "Couple se tenant la main",
	},
	{
		id: "img03",
		genres: [80, 27, 9648, 878, 53],
		description: "Visage mystérieux caché dans l'ombre",
	},
	{
		id: "img04",
		genres: [12, 10751, 14, 36, 9648],
		description: "Bibliothèque avec entrée cachée",
	},
	{
		id: "img05",
		genres: [80, 878, 53],
		description: "Tas de fils métalliques",
	},
	{
		id: "img06",
		genres: [16, 14, 36, 10749],
		description: "Structure en pierre dans une forêt ensoleillée",
	},
	{
		id: "img07",
		genres: [12, 80],
		description: "Compteur de vitesse",
	},
	{
		id: "img08",
		genres: [18, 36, 27, 9648],
		description: "Bougie allumée et vieux livre près d'une fenêtre pluvieuse",
	},
	{
		id: "img09",
		genres: [12, 16, 10751, 14],
		description: "Plongeur à côté d'un corail coloré",
	},
	{
		id: "img10",
		genres: [12, 16, 35],
		description: "Un homme sautant avec enthousiasme d'une falaise",
	},
	{
		id: "img11",
		genres: [35, 10751, 14, 10402, 10749],
		description: "Cupcake au chocolat de luxe",
	},
	{ id: "img12", genres: [80, 9648, 878], description: "Chambre forte" },
	{
		id: "img13",
		genres: [80, 27, 9648, 53, 10752],
		description: "Silhouette d'un homme avec de la fumée rouge",
	},
	{
		id: "img14",
		genres: [16, 18, 10751, 10749],
		description: "Deux cygnes se regardant dans un lac bleu",
	},
	{
		id: "img15",
		genres: [12, 14, 36, 27, 9648, 53, 10752],
		description: "Château dans le brouillard",
	},
	{
		id: "img16",
		genres: [16, 35, 10751, 37],
		description: "Chien noir et blanc dans de hautes herbes sèches",
	},
	{
		id: "img17",
		genres: [12, 878, 10752],
		description: "Avions de chasse",
	},
	{
		id: "img18",
		genres: [80, 18, 36, 9648, 53],
		description:
			"Couple se tenant la main de manière réconfortante à travers une table",
	},
	{
		id: "img19",
		genres: [18, 36, 27, 9648, 53],
		description: "Statue d'ange dans un cimetière",
	},
	{
		id: "img20",
		genres: [16, 35, 10751, 14, 10749],
		description: "Petit bonhomme de neige mignon",
	},
	{
		id: "img21",
		genres: [16, 35, 10751],
		description: "Chien avec lunettes de soleil",
	},
	{
		id: "img22",
		genres: [16, 35, 10751, 10402],
		description: "Chien souriant avec un chapeau d'anniversaire rose",
	},
	{
		id: "img23",
		genres: [35, 18, 10402, 10749],
		description: "Trinquer avec des boissons alcoolisées",
	},
	{
		id: "img24",
		genres: [27, 53, 10752],
		description: "Bâtiment en ruine",
	},
	{
		id: "img25",
		genres: [80, 18, 878],
		description: "Station de métro à l'intérieur",
	},
	{
		id: "img26",
		genres: [16, 14, 878],
		description: "Fleurs violettes futuristes",
	},
	{
		id: "img27",
		genres: [12, 14, 878],
		description:
			"Aéroport de Singapour avec une grande cascade et un tramway-train",
	},
	{
		id: "img28",
		genres: [80, 18, 27, 9648, 53],
		description: "Peluche abandonnée sur le bord de la route",
	},
	{
		id: "img29",
		genres: [18, 36, 10752, 37],
		description: "Mains tenant un chapelet",
	},
	{
		id: "img30",
		genres: [18, 9648, 10749, 53],
		description: "Couple âgé regardant la mer par temps pluvieux",
	},
	{
		id: "img31",
		genres: [12, 14, 878],
		description: "Silhouette sur fond de galaxie colorée",
	},
	{
		id: "img32",
		genres: [27, 53, 37],
		description: "Araignée effrayante sur une toile",
	},
	{
		id: "img33",
		genres: [80, 18],
		description: "Une personne comptant de l'argent",
	},
	{
		id: "img34",
		genres: [16, 10751, 14],
		description: "Dragon chinois coloré",
	},
	{
		id: "img35",
		genres: [10752, 37],
		description: "Deux grands oiseaux qui se battent",
	},
	{
		id: "img36",
		genres: [16, 35, 10402, 10749],
		description: "Bulles colorées",
	},
	{
		id: "img37",
		genres: [80, 27, 53, 10752],
		description: "Bâtiment abandonné aux fenêtres brisées",
	},
	{ id: "img38", genres: [12, 35, 80], description: "Table de casino" },
	{
		id: "img39",
		genres: [9648, 878],
		description:
			"Formes abstraites lumineuses et géométriques dans un bleu profond",
	},
	{
		id: "img40",
		genres: [18, 36, 37],
		description: "Articles de boutique vintage",
	},
	{
		id: "img41",
		genres: [12, 10751, 14],
		description: "Squelette de dinosaure dans un musée",
	},
	{
		id: "img42",
		genres: [18, 36, 10752],
		description: "Cathédrale avec un grand vitrail",
	},
	{
		id: "img43",
		genres: [80, 36, 37],
		description: "Verser le whisky dans les verres",
	},
	{
		id: "img44",
		genres: [27, 53, 10752, 37],
		description:
			"Couteau de chasse coincé dans une souche d'arbre dans la forêt",
	},
	{
		id: "img45",
		genres: [14, 27, 37],
		description: "Gros plan sur un carrousel de cirque rouge et doré",
	},
	{
		id: "img46",
		genres: [27, 10752],
		description: "Feu de camp",
	},
	{
		id: "img47",
		genres: [12, 9648, 37],
		description: "Puma dans la forêt",
	},
	{
		id: "img48",
		genres: [12, 36, 9648, 10752],
		description:
			"Grand navire se renversant dans les vagues agitées de l'océan",
	},
	{
		id: "img49",
		genres: [12, 16, 18],
		description: "Petit bateau usagé échoué sur une île",
	},
	{
		id: "img50",
		genres: [80, 36, 27, 9648, 53, 37],
		description: "Feuilles jaune pâle sur la route",
	},
	{
		id: "img51",
		genres: [35, 10751, 36, 10402, 10749],
		description: "Pont illuminé et raffiné à Paris au crépuscule",
	},
	{
		id: "img52",
		genres: [16, 35, 10751, 14, 10402, 10749],
		description: "Oursons gommeux colorés",
	},
	{
		id: "img53",
		genres: [12, 35, 10402],
		description: "Homme faisant du surf",
	},
	{
		id: "img54",
		genres: [16, 14, 878],
		description: "Poulpe rouge et bleu néon",
	},
	{
		id: "img55",
		genres: [80, 36, 27, 9648, 53, 10752, 37],
		description: "Bougies blanches allumées et fondantes",
	},
	{
		id: "img56",
		genres: [14, 27, 37],
		description: "Bouteilles vintage avec bouchons en liège",
	},
	{
		id: "img57",
		genres: [12, 14, 27, 9648],
		description: "Cartes de tarot",
	},
	{
		id: "img58",
		genres: [12, 18, 36, 37],
		description: "Valises vintage",
	},
	{
		id: "img59",
		genres: [27, 878, 10752],
		description: "Un soldat portant un masque à gaz vintage",
	},
	{
		id: "img60",
		genres: [18, 36, 10752],
		description: "Cimetière militaire avec une grande croix blanche",
	},
	{
		id: "img61",
		genres: [35, 10402, 10749],
		description: "Radio vintage",
	},
	{
		id: "img62",
		genres: [35, 10402, 878],
		description: "Équipement DJ dans un club avec éclairage bleu et fumée",
	},
	{
		id: "img63",
		genres: [18, 10402, 10752],
		description: "Orgue dans une cathédrale",
	},
	{
		id: "img64",
		genres: [35, 10402, 10749],
		description: "Des gens dansant dans la rue",
	},
	{
		id: "img65",
		genres: [80, 27, 9648, 878, 53],
		description: "Instruments chirurgicaux",
	},
	{
		id: "img66",
		genres: [18, 27, 53],
		description: "Radiographie d'une fracture de la clavicule",
	},
	{
		id: "img67",
		genres: [16, 10751, 37],
		description: "Petites citrouilles orange",
	},
	{
		id: "img68",
		genres: [80, 878],
		description: "Matrice de code vert sur fond noir",
	},
	{
		id: "img69",
		genres: [10751, 10749, 37],
		description: "Deux personnes à cheval dans une forêt ensoleillée",
	},
	{
		id: "img70",
		genres: [36, 27, 10752, 37],
		description: "Crâne de bison sur une clôture métallique",
	},
	{
		id: "img71",
		genres: [12, 80, 878],
		description: "Ruelle dans une grande ville asiatique",
	},
	{
		id: "img72",
		genres: [18, 10402, 10749, 37],
		description: "Jouer du violon",
	},
	{
		id: "img73",
		genres: [80, 27, 9648, 878],
		description:
			"Homme encapuchonné portant un masque cyberpunk bleu fluo devant un mur de graffitis",
	},
	{
		id: "img74",
		genres: [36, 53, 37],
		description: "Cabane en bois dans une forêt enneigée",
	},
	{
		id: "img75",
		genres: [35, 10402, 10749],
		description: "Couchée de soleil rose",
	},
	{
		id: "img76",
		genres: [16, 10751, 14],
		description: "Papillons orange en liberté dans une pièce",
	},
	{
		id: "img77",
		genres: [16, 14, 10749, 878],
		description: "Trois papillons blancs sur des fleurs bleues",
	},
	{
		id: "img78",
		genres: [10751, 14, 36, 10749],
		description: "Plusieurs couronnes ornées de nombreux joyaux colorés",
	},
	{
		id: "img79",
		genres: [12, 16, 10751],
		description: "Enfant faisant du vélo dans des fontaines",
	},
	{
		id: "img80",
		genres: [12, 36, 10752],
		description: "Hélice d'un ancien avion de guerre",
	},
];

export default quizPicturesData;
