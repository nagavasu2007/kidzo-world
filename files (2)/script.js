/* =============================================
   kidzo world — script.js  v2
   ============================================= */

/* ===================== STATE ===================== */
let currentUser = null;
let isGuest = false;
let currentSection = '';
let currentItem = null;
let currentQuiz = [];
let currentQuizIndex = 0;
let currentQuizScore = 0;
let currentGame = '';
let currentLevel = 'easy';
const guestAllowedIndex = 0;

/* ===================== QUOTES ===================== */
const quotes = [
  '"Learning is a treasure that follows its owner everywhere." 🌟',
  '"Every day is a chance to learn something wonderful!" 🚀',
  '"The more that you read, the more things you will know." 📚',
  '"Imagination is more important than knowledge." ✨',
  '"You are never too small to make a difference!" 🌈',
];

/* =============================================
   DATA SECTION
   =============================================
   HOW TO ADD IMAGES: In each item add  image: 'YOUR_PATH_OR_URL'
   HOW TO ADD VIDEOS: In rhymesData/tablesData add  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
   HOW TO ADD PDFs:  In booksData add  pdfUrl: 'path/to/file.pdf'
   HOW TO ADD BACKGROUNDS: Open index.html and uncomment the style="" line on each section div
   ============================================= */

/* ===================== ANIMALS DATA ===================== */
const animalsData = [
  {
    id:'lion',name:'Lion',emoji:'🦁',
    // image: 'images/lion.jpg',
    story:'The lion is often called the "King of the Jungle." Lions are large, powerful cats that live in groups called prides. They are known for their magnificent manes and loud roars that can be heard from 8 km away! Lions hunt together, which makes them very effective predators. Baby lions are called cubs and are adorable!',
    facts:['Lives in Africa & India','Roar heard 8 km away','Sleeps 20 hrs/day','Group called a Pride','Speed: 80 km/h'],
    quiz:[
      {q:'What is a group of lions called?',opts:['Herd','Pride','Pack','Flock'],ans:1,diff:'easy'},
      {q:'What is a baby lion called?',opts:['Kitten','Pup','Cub','Foal'],ans:2,diff:'easy'},
      {q:"How far can a lion's roar be heard?",opts:['2 km','5 km','8 km','12 km'],ans:2,diff:'easy'},
      {q:'How many hours does a lion sleep per day?',opts:['8 hours','12 hours','16 hours','20 hours'],ans:3,diff:'medium'},
      {q:'What is the top speed of a lion?',opts:['40 km/h','60 km/h','80 km/h','100 km/h'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'elephant',name:'Elephant',emoji:'🐘',
    // image: 'images/elephant.jpg',
    story:"Elephants are the largest land animals on Earth! They have incredible memories and are known for their intelligence and emotional sensitivity. Elephants use their long trunks to breathe, smell, drink water, and even hug their friends! They live in close family groups led by the oldest female called the matriarch.",
    facts:['Largest land animal','Trunk has 40,000 muscles','Memory lasts decades','Family led by Matriarch','Lifespan: 60-70 years'],
    quiz:[
      {q:'What is the female leader of an elephant herd called?',opts:['Queen','Empress','Matriarch','Duchess'],ans:2,diff:'easy'},
      {q:"How many muscles are in an elephant's trunk?",opts:['10,000','20,000','30,000','40,000'],ans:3,diff:'easy'},
      {q:'What is the average lifespan of an elephant?',opts:['20-30 years','40-50 years','60-70 years','80-90 years'],ans:2,diff:'easy'},
      {q:'Elephants are the largest _____ on Earth.',opts:['Animals','Mammals','Land animals','Herbivores'],ans:2,diff:'medium'},
      {q:'An elephant drinks how many litres of water per day?',opts:['50 L','100 L','150 L','200 L'],ans:3,diff:'hard'},
    ]
  },
  {
    id:'dolphin',name:'Dolphin',emoji:'🐬',
    // image: 'images/dolphin.jpg',
    story:'Dolphins are highly intelligent marine mammals known for their playful behaviour and communication skills. They live in groups called pods and communicate using clicks and whistles. Dolphins are famous for helping humans in the ocean and are one of the smartest animals on the planet!',
    facts:['Lives in pods','Communicates with clicks','Can jump 6m high','Brain similar to humans','Lifespan: 40-60 years'],
    quiz:[
      {q:'What is a group of dolphins called?',opts:['School','Pod','Fleet','Gang'],ans:1,diff:'easy'},
      {q:'Dolphins communicate using:',opts:['Barks','Clicks and whistles','Roars','Singing'],ans:1,diff:'easy'},
      {q:'Dolphins are which type of animal?',opts:['Fish','Reptile','Marine mammal','Amphibian'],ans:2,diff:'easy'},
      {q:'How high can a dolphin jump?',opts:['2m','4m','6m','8m'],ans:2,diff:'medium'},
      {q:'What is the average lifespan of a dolphin?',opts:['10-20 years','20-30 years','40-60 years','80-100 years'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'tiger',name:'Tiger',emoji:'🐯',
    // image: 'images/tiger.jpg',
    story:'Tigers are the largest wild cats in the world and are known for their beautiful orange and black striped coats. Every tiger has a unique pattern of stripes, just like human fingerprints! Tigers are excellent swimmers and love water unlike most cats. They are solitary and nocturnal hunters.',
    facts:['Largest wild cat','Each stripe is unique','Excellent swimmers','Solitary animals','Speed: 65 km/h'],
    quiz:[
      {q:'Are tigers good swimmers?',opts:['No, they hate water','Yes, they love water','Only in rain','Only as cubs'],ans:1,diff:'easy'},
      {q:'What makes each tiger unique?',opts:['Eye colour','Stripe pattern','Tail length','Ear shape'],ans:1,diff:'easy'},
      {q:'Tigers are which type of hunter?',opts:['Daytime','Nocturnal','Underwater','Group'],ans:1,diff:'easy'},
      {q:'What is the top speed of a tiger?',opts:['45 km/h','55 km/h','65 km/h','75 km/h'],ans:2,diff:'medium'},
      {q:'Tigers are classified as:',opts:['Endangered','Extinct','Least concern','Vulnerable'],ans:0,diff:'hard'},
    ]
  },
  {
    id:'penguin',name:'Penguin',emoji:'🐧',
    // image: 'images/penguin.jpg',
    story:'Penguins are adorable flightless birds that live in the Southern Hemisphere, mostly in Antarctica. They are incredible swimmers and use their flippers to glide through water at high speed. Penguins are very social and live in large colonies. Male penguins keep eggs warm by holding them on their feet!',
    facts:['Flightless bird','Expert swimmers','Lives in colonies','Males incubate eggs','Can swim 36 km/h'],
    quiz:[
      {q:'Can penguins fly?',opts:['Yes, high flyers','No, they are flightless','Only young ones','Only in summer'],ans:1,diff:'easy'},
      {q:'Where do most penguins live?',opts:['Arctic','Antarctica','Sahara Desert','Amazon'],ans:1,diff:'easy'},
      {q:'Who incubates penguin eggs?',opts:['Female','Male','Both equally','Nest alone'],ans:1,diff:'easy'},
      {q:'A group of penguins on land is called:',opts:['Colony','Pride','Pod','Flock'],ans:0,diff:'medium'},
      {q:'How fast can a penguin swim?',opts:['12 km/h','24 km/h','36 km/h','48 km/h'],ans:2,diff:'hard'},
    ]
  }
];

/* ===================== BIRDS DATA ===================== */
const birdsData = [
  {
    id:'parrot',name:'Parrot',emoji:'🦜',
    // image: 'images/parrot.jpg',
    story:'Parrots are colorful, intelligent birds known for their ability to mimic human speech! They have curved beaks and strong, grasping feet. Parrots live in tropical and subtropical regions. They are very social birds and live in flocks. Some parrots can learn hundreds of words and phrases!',
    facts:['Can mimic speech','500+ species exist','Strong curved beak','Very social birds','Lifespan: up to 80 years'],
    quiz:[
      {q:'What can parrots do that most birds cannot?',opts:['Swim','Mimic human speech','Run fast','Dig holes'],ans:1,diff:'easy'},
      {q:'Parrots have what type of beak?',opts:['Flat','Straight','Curved','Pointed'],ans:2,diff:'easy'},
      {q:'A group of parrots is called a:',opts:['Flock','Colony','Pack','Band'],ans:0,diff:'easy'},
      {q:'How many species of parrots are there?',opts:['100+','300+','500+','700+'],ans:2,diff:'medium'},
      {q:'What is the maximum lifespan of some parrots?',opts:['20 years','40 years','60 years','80 years'],ans:3,diff:'hard'},
    ]
  },
  {
    id:'eagle',name:'Eagle',emoji:'🦅',
    // image: 'images/eagle.jpg',
    story:"Eagles are majestic birds of prey known for their powerful talons, sharp eyesight, and incredible speed. An eagle's eyesight is up to 8 times stronger than a human's! They soar high in the sky using warm air currents called thermals. Eagles build massive nests called eyries on cliffs or tall trees.",
    facts:['Vision 8x stronger than humans','Nest called Eyrie','Speed: 320 km/h (dive)','National symbol of many countries','Wingspan: 1.8–2.5m'],
    quiz:[
      {q:"What is an eagle's nest called?",opts:['Den','Burrow','Eyrie','Lodge'],ans:2,diff:'easy'},
      {q:'Eagles hunt using their powerful:',opts:['Wings','Beak','Talons','Eyes only'],ans:2,diff:'easy'},
      {q:'Eagle vision is how many times stronger than humans?',opts:['2x','4x','6x','8x'],ans:3,diff:'easy'},
      {q:'Warm air currents used by eagles are called:',opts:['Gusts','Thermals','Cyclones','Vortex'],ans:1,diff:'medium'},
      {q:'The diving speed of an eagle can reach:',opts:['100 km/h','200 km/h','320 km/h','450 km/h'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'flamingo',name:'Flamingo',emoji:'🦩',
    // image: 'images/flamingo.jpg',
    story:'Flamingos are beautiful pink birds known for standing on one leg and their long curved necks. Their pink colour comes from the pigments in the shrimp and algae they eat! Baby flamingos are born white and turn pink over time. They live in large flocks near shallow lakes and lagoons.',
    facts:['Pink from diet','Born white','Stand on one leg','Live near lakes','Flock = flamboyance'],
    quiz:[
      {q:'What gives flamingos their pink colour?',opts:['Birth colour','Sunlight','Diet of shrimp & algae','Gene mutation'],ans:2,diff:'easy'},
      {q:'What colour are baby flamingos?',opts:['Pink','White','Grey','Yellow'],ans:1,diff:'easy'},
      {q:'A group of flamingos is called a:',opts:['Flock','Flamboyance','Colony','Pride'],ans:1,diff:'easy'},
      {q:'Flamingos typically live near:',opts:['Oceans','Deserts','Forests','Shallow lakes'],ans:3,diff:'medium'},
      {q:'Flamingos stand on one leg primarily to:',opts:['Dance','Conserve body heat','See better','Sleep standing'],ans:1,diff:'hard'},
    ]
  },
  {
    id:'owl',name:'Owl',emoji:'🦉',
    // image: 'images/owl.jpg',
    story:'Owls are fascinating nocturnal birds known for their wisdom in many cultures. They have special feathers that allow them to fly almost silently! Owls can rotate their heads up to 270 degrees. Their eyes are fixed in their sockets, which is why they turn their whole head to look around.',
    facts:['Nocturnal hunters','Head rotates 270°','Silent flight feathers','Eyes fixed in sockets','200+ species worldwide'],
    quiz:[
      {q:'Owls are most active during:',opts:['Morning','Afternoon','Night','Dusk only'],ans:2,diff:'easy'},
      {q:'How far can an owl rotate its head?',opts:['90°','180°','270°','360°'],ans:2,diff:'easy'},
      {q:'What makes owl flight special?',opts:['Very fast','Silent feathers','Long glides','Backward flight'],ans:1,diff:'easy'},
      {q:'Why do owls turn their whole head?',opts:['To show off','Ears are big','Eyes are fixed','Neck is short'],ans:2,diff:'medium'},
      {q:'How many owl species exist worldwide?',opts:['50+','100+','200+','500+'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'peacock',name:'Peacock',emoji:'🦚',
    // image: 'images/peacock.jpg',
    story:'The peacock is one of the most beautiful birds on Earth! The male peacock has a magnificent tail called a "train" with beautiful eye-like feathers. They display this fan during mating season to attract females (peahens). Peacocks are the national bird of India. They can fly despite their heavy tail.',
    facts:['National bird of India','Tail called "train"','Female = peahen','Can run 16 km/h','Loud distinctive call'],
    quiz:[
      {q:'The peacock is the national bird of:',opts:['Pakistan','India','Sri Lanka','Nepal'],ans:1,diff:'easy'},
      {q:"The peacock's tail feathers are called:",opts:['Plumage','Train','Fan','Crest'],ans:1,diff:'easy'},
      {q:'A female peacock is called:',opts:['Peahen','Peachick','Peacockette','Peavis'],ans:0,diff:'easy'},
      {q:'Why does a peacock spread its tail?',opts:['To cool down','To attract females','To scare predators','To show size'],ans:1,diff:'medium'},
      {q:'How fast can a peacock run?',opts:['8 km/h','12 km/h','16 km/h','24 km/h'],ans:2,diff:'hard'},
    ]
  }
];

/* ===================== FRUITS DATA ===================== */
const fruitsData = [
  {
    id:'mango',name:'Mango',emoji:'🥭',
    // image: 'images/mango.jpg',
    story:'The mango is called the "King of Fruits"! It is a tropical fruit loved for its sweet, juicy taste. Mangoes come in many varieties and are rich in vitamins A and C. They are the national fruit of India, Pakistan, and the Philippines. Mango trees can live for over 100 years!',
    facts:['King of Fruits','National fruit of India','Rich in Vitamins A & C','Over 500 varieties','Trees live 100+ years'],
    quiz:[
      {q:'Mango is called the "King of" what?',opts:['Vegetables','Fruits','Trees','Juices'],ans:1,diff:'easy'},
      {q:'Mango is the national fruit of which country?',opts:['China','USA','India','Brazil'],ans:2,diff:'easy'},
      {q:'Mangoes are rich in which vitamins?',opts:['B & D','A & C','E & K','C & D'],ans:1,diff:'easy'},
      {q:'How many mango varieties exist?',opts:['50+','200+','500+','1000+'],ans:2,diff:'medium'},
      {q:'Mango trees can live for how many years?',opts:['20 years','50 years','100+ years','200+ years'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'banana',name:'Banana',emoji:'🍌',
    // image: 'images/banana.jpg',
    story:'Bananas are one of the most popular fruits in the world! They grow in tropical regions and are packed with energy. Bananas are technically berries from a botanical standpoint! They are rich in potassium which is great for heart health. Banana plants are not trees — they are actually giant herbs!',
    facts:['Technically a berry','Banana plant = giant herb','Rich in Potassium','Energy booster','Grows in clusters called hands'],
    quiz:[
      {q:'A banana is botanically classified as a:',opts:['Berry','Drupe','Nut','Vegetable'],ans:0,diff:'easy'},
      {q:'What mineral is banana rich in?',opts:['Calcium','Iron','Potassium','Zinc'],ans:2,diff:'easy'},
      {q:'A banana plant is technically a:',opts:['Tree','Shrub','Giant herb','Vine'],ans:2,diff:'easy'},
      {q:'A cluster of bananas is called a:',opts:['Bunch','Hand','Row','Pack'],ans:1,diff:'medium'},
      {q:'Bananas are originally native to:',opts:['Africa','South America','Southeast Asia','India'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'strawberry',name:'Strawberry',emoji:'🍓',
    // image: 'images/strawberry.jpg',
    story:'Strawberries are sweet red fruits that are actually not true berries! They are the only fruit with seeds on the outside. Each strawberry has about 200 seeds on its surface. Strawberries are packed with vitamin C and antioxidants. They are the most popular berry fruit in the world!',
    facts:['Seeds on the outside','~200 seeds per berry','Rich in Vitamin C','Not a true berry','Symbol of summer'],
    quiz:[
      {q:'Where are strawberry seeds located?',opts:['Inside','On the outside','In the stem','None at all'],ans:1,diff:'easy'},
      {q:'Approximately how many seeds on a strawberry?',opts:['50','100','200','500'],ans:2,diff:'easy'},
      {q:'Strawberries are rich in which vitamin?',opts:['A','B','C','D'],ans:2,diff:'easy'},
      {q:'Botanically a strawberry is NOT classified as:',opts:['A fruit','A berry','Edible','Healthy'],ans:1,diff:'medium'},
      {q:'Strawberries belong to which plant family?',opts:['Citrus','Rosaceae','Legume','Solanaceae'],ans:1,diff:'hard'},
    ]
  },
  {
    id:'apple',name:'Apple',emoji:'🍎',
    // image: 'images/apple.jpg',
    story:'An apple a day keeps the doctor away! Apples are one of the most widely grown fruits in the world with over 7,500 varieties. Apple trees can live for 100+ years. Apples float on water because they are 25% air! They are rich in fiber and antioxidants and are great for heart and gut health.',
    facts:['7500+ varieties','Apples float in water','25% air content','Trees live 100+ years','Rich in fiber'],
    quiz:[
      {q:'Why do apples float on water?',opts:['They are hollow','They are 25% air','They are light','They repel water'],ans:1,diff:'easy'},
      {q:'How many varieties of apples exist?',opts:['500+','2000+','5000+','7500+'],ans:3,diff:'easy'},
      {q:'Apples are rich in:',opts:['Protein','Fiber','Fat','Starch'],ans:1,diff:'easy'},
      {q:'Apple trees can live for:',opts:['10 years','30 years','100+ years','500+ years'],ans:2,diff:'medium'},
      {q:'The science of apple growing is called:',opts:['Botany','Pomology','Horticulture','Agronomy'],ans:1,diff:'hard'},
    ]
  },
  {
    id:'watermelon',name:'Watermelon',emoji:'🍉',
    // image: 'images/watermelon.jpg',
    story:'Watermelon is the perfect summer treat! It is 92% water which is how it got its name. Watermelons are technically both a fruit and a vegetable! Every part of a watermelon is edible, including the green rind. They are rich in lycopene which gives them their red colour.',
    facts:['92% water','Fruit AND vegetable','Rind is edible','Rich in lycopene','Over 1200 varieties'],
    quiz:[
      {q:'What percentage of a watermelon is water?',opts:['70%','80%','92%','99%'],ans:2,diff:'easy'},
      {q:'The red colour in watermelon comes from:',opts:['Iron','Lycopene','Vitamin C','Potassium'],ans:1,diff:'easy'},
      {q:'Which part of watermelon is edible?',opts:['Only flesh','Flesh and seeds','Flesh, seeds and rind','Flesh only'],ans:2,diff:'easy'},
      {q:'Watermelon is classified as:',opts:['Only a fruit','Only a vegetable','Both fruit and vegetable','A berry'],ans:2,diff:'medium'},
      {q:'How many varieties of watermelon exist?',opts:['100','500','800','1200+'],ans:3,diff:'hard'},
    ]
  }
];

/* ===================== VEGETABLES DATA ===================== */
const vegetablesData = [
  {
    id:'carrot',name:'Carrot',emoji:'🥕',
    // image: 'images/carrot.jpg',
    story:'Carrots are crunchy, delicious root vegetables that are amazing for your eyes! They are rich in beta-carotene which the body converts to Vitamin A. Originally carrots were purple, not orange! The orange variety was developed in the Netherlands in the 17th century.',
    facts:['Root vegetable','Originally purple','Rich in beta-carotene','Good for eyesight','Grows underground'],
    quiz:[
      {q:'What is the original colour of carrots?',opts:['Orange','Yellow','Purple','White'],ans:2,diff:'easy'},
      {q:'Carrots are rich in:',opts:['Vitamin D','Beta-carotene','Iron','Calcium'],ans:1,diff:'easy'},
      {q:'Carrots are what type of vegetable?',opts:['Leafy','Fruit vegetable','Root','Flower'],ans:2,diff:'easy'},
      {q:'Orange carrots were developed in which country?',opts:['France','England','Netherlands','Germany'],ans:2,diff:'medium'},
      {q:'What does beta-carotene convert to in the body?',opts:['Vitamin B','Vitamin C','Vitamin A','Vitamin K'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'broccoli',name:'Broccoli',emoji:'🥦',
    // image: 'images/broccoli.jpg',
    story:'Broccoli is a superfood vegetable that looks like a tiny tree! It is packed with Vitamin C, Vitamin K, and fiber. Broccoli is related to cauliflower, cabbage, and kale. The word "broccoli" comes from Italian meaning "the flowering crest of a cabbage." Eating broccoli helps build strong bones!',
    facts:['Superfood vegetable','Rich in Vitamin C & K','Related to cauliflower','Helps build strong bones','Flowering vegetable'],
    quiz:[
      {q:'Broccoli is related to which vegetable?',opts:['Potato','Cauliflower','Tomato','Onion'],ans:1,diff:'easy'},
      {q:'Broccoli is rich in:',opts:['Vitamin A & D','Vitamin C & K','Vitamin B & E','Iron & Calcium'],ans:1,diff:'easy'},
      {q:'The word "broccoli" comes from which language?',opts:['Spanish','French','Italian','Greek'],ans:2,diff:'easy'},
      {q:'Broccoli helps build strong:',opts:['Muscles','Teeth','Bones','Skin'],ans:2,diff:'medium'},
      {q:'Broccoli belongs to which plant family?',opts:['Solanaceae','Brassicaceae','Leguminosae','Rosaceae'],ans:1,diff:'hard'},
    ]
  },
  {
    id:'tomato',name:'Tomato',emoji:'🍅',
    // image: 'images/tomato.jpg',
    story:'Did you know that tomatoes are technically fruits, not vegetables? They grow from the flower of the plant and contain seeds. Tomatoes originated in South America. They are rich in lycopene and Vitamin C. There are thousands of tomato varieties from tiny cherry tomatoes to large beefsteak tomatoes!',
    facts:['Technically a fruit','Originated in South America','Rich in lycopene','10,000+ varieties','Used worldwide'],
    quiz:[
      {q:'Is a tomato a fruit or vegetable?',opts:['Vegetable','Fruit','Both','Neither'],ans:1,diff:'easy'},
      {q:'Tomatoes originated in:',opts:['Europe','Asia','South America','Africa'],ans:2,diff:'easy'},
      {q:'Tomatoes are rich in:',opts:['Iron','Lycopene','Potassium','Fiber'],ans:1,diff:'easy'},
      {q:'How many tomato varieties are there?',opts:['1,000+','5,000+','10,000+','50,000+'],ans:2,diff:'medium'},
      {q:"The world's largest tomato producing country is:",opts:['USA','India','Italy','China'],ans:3,diff:'hard'},
    ]
  },
  {
    id:'spinach',name:'Spinach',emoji:'🥬',
    // image: 'images/spinach.jpg',
    story:'Spinach is one of the healthiest leafy green vegetables! It is packed with iron, which helps carry oxygen in the blood. Popeye the cartoon sailor became famous for eating spinach to gain strength! Spinach is native to ancient Persia (modern-day Iran). It is rich in vitamins A, C, and K.',
    facts:['Rich in iron','Leafy green vegetable','Native to Persia','Rich in Vitamins A, C, K',"Popeye's favourite!"],
    quiz:[
      {q:'Which famous cartoon character loves spinach?',opts:['Tom','Popeye','Jerry','Donald Duck'],ans:1,diff:'easy'},
      {q:'Spinach is rich in which mineral?',opts:['Calcium','Zinc','Iron','Magnesium'],ans:2,diff:'easy'},
      {q:'Spinach is native to:',opts:['Egypt','India','China','Persia (Iran)'],ans:3,diff:'easy'},
      {q:'Iron in spinach helps carry _____ in the blood.',opts:['Nutrients','Oxygen','Water','Sugar'],ans:1,diff:'medium'},
      {q:'Spinach is classified as which type of vegetable?',opts:['Root','Bulb','Leafy green','Stem'],ans:2,diff:'hard'},
    ]
  },
  {
    id:'potato',name:'Potato',emoji:'🥔',
    // image: 'images/potato.jpg',
    story:'Potatoes are one of the most important and versatile food crops in the world! They originated in the Andes mountains of South America. Potatoes are rich in Vitamin C, potassium, and fiber. They come in thousands of varieties in many colors and sizes. Potatoes were the first food to be grown in space!',
    facts:['Originated in Andes','4,000+ varieties','First food in space','Rich in Vitamin C & K','Underground stem (tuber)'],
    quiz:[
      {q:'Potatoes originated in:',opts:['Europe','Asia','Andes, South America','North America'],ans:2,diff:'easy'},
      {q:'Potatoes are what type of plant part?',opts:['Root','Fruit','Leaf','Tuber (stem)'],ans:3,diff:'easy'},
      {q:'Potatoes were the first food grown in:',opts:['Ocean','Space','Desert','Underground lab'],ans:1,diff:'easy'},
      {q:'How many potato varieties exist?',opts:['500+','1000+','4000+','10000+'],ans:2,diff:'medium'},
      {q:'Potatoes are rich in which mineral?',opts:['Iron','Calcium','Potassium','Zinc'],ans:2,diff:'hard'},
    ]
  }
];

/* ===================== RHYMES DATA ===================== */
const rhymesData = [
  {
    id:'baa',name:'Baa Baa Black Sheep',emoji:'🐑',
    videoUrl:'', // ADD: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
    text:`Baa baa black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full!\n\nOne for my master,\nOne for my dame,\nAnd one for the little boy\nWho lives down the lane.`
  },
  {
    id:'twinkle',name:'Twinkle Twinkle Little Star',emoji:'⭐',
    videoUrl:'', // ADD: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
    text:`Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\n\nWhen the blazing sun is gone,\nWhen he nothing shines upon,\nThen you show your little light,\nTwinkle, twinkle, all the night.`
  },
  {
    id:'humpty',name:'Humpty Dumpty',emoji:'🥚',
    videoUrl:'',
    text:`Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men\nCouldn't put Humpty together again.`
  },
  {
    id:'johny',name:'Johny Johny Yes Papa',emoji:'👶',
    videoUrl:'',
    text:`Johny Johny, Yes Papa?\nEating sugar? No, Papa!\nTelling lies? No, Papa!\nOpen your mouth! Ha ha ha!\n\nJohny Johny, Yes Papa?\nEating candy? No, Papa!\nAre you sleepy? No, Papa!\nOpen your mouth! Ha ha ha!`
  },
  {
    id:'jackjill',name:'Jack and Jill',emoji:'⛰️',
    videoUrl:'',
    text:`Jack and Jill went up the hill\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.\n\nUp Jack got and home did trot,\nAs fast as he could caper.`
  }
];

/* ===================== TABLES DATA ===================== */
const tablesData = Array.from({length:10},(_,i)=>({
  id:`table${i+1}`,name:`${i+1} Times Table`,num:i+1,
  emoji:['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][i],
  videoUrl:'', // ADD: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
  text:Array.from({length:10},(_,j)=>`${i+1}  ×  ${j+1}  =  ${(i+1)*(j+1)}`).join('\n')
}));

/* ===================== GAMES DATA ===================== */
const gamesData = [
  {id:'snake',  name:'Snake Game',    emoji:'🐍',desc:'Classic snake action!'},
  {id:'rocket', name:'Space Rocket',  emoji:'🚀',desc:'Blast through space!'},
  {id:'flip',   name:'Flip the Card', emoji:'🃏',desc:'Match the pairs!'},
  {id:'ludo',   name:'Ludo',          emoji:'🎲',desc:'Roll and race!'},
  {id:'tictactoe',name:'Tic Tac Toe', emoji:'❌',desc:'Beat the computer!'},
];

/* ===================== BOOKS DATA ===================== */
const booksData = [
  {id:'book1',title:'The Magic Forest',emoji:'🌲',desc:'An adventure story',
    pdfUrl:''}, // ADD: 'books/magic_forest.pdf' or full URL
  {id:'book2',title:'Space Explorer',emoji:'🚀',desc:'Journey to the stars',
    pdfUrl:''},
  {id:'book3',title:'Ocean Friends',emoji:'🌊',desc:'Deep sea creatures',
    pdfUrl:''},
  {id:'book4',title:'My ABC Book',emoji:'🔤',desc:'Learn the alphabet',
    pdfUrl:''},
  {id:'book5',title:'Jungle Tales',emoji:'🦁',desc:'Wild animal stories',
    pdfUrl:''},
];

/* ===================== SECTION MAP ===================== */
const sectionDataMap={
  animals:{data:animalsData,title:'🦁 Animals'},
  birds:  {data:birdsData,  title:'🦜 Birds'},
  fruits: {data:fruitsData, title:'🍎 Fruits'},
  vegetables:{data:vegetablesData,title:'🥕 Vegetables'}
};

/* ===================== PROGRESS TRACKING ===================== */
function getVisited(key){ return JSON.parse(localStorage.getItem('kw_visited_'+key)||'[]'); }
function markVisited(key,id){
  const v=getVisited(key);
  if(!v.includes(id)){v.push(id);localStorage.setItem('kw_visited_'+key,JSON.stringify(v));}
}
function getProgress(key,total){
  const v=getVisited(key);
  return{count:v.length,total,pct:total?Math.round(v.length/total*100):0};
}

function updateAllProgress(){
  const sections=[
    {key:'animals',total:5},{key:'birds',total:5},{key:'fruits',total:5},
    {key:'vegetables',total:5},{key:'rhymes',total:5},{key:'tables',total:10},
    {key:'gamezone',total:5},{key:'readzone',total:5}
  ];
  let totalPct=0;
  sections.forEach(s=>{
    const p=getProgress(s.key,s.total);
    totalPct+=p.pct;
    const fill=document.getElementById('prog-'+s.key);
    if(fill)fill.style.width=p.pct+'%';
  });
  const overall=Math.round(totalPct/sections.length);
  const opFill=document.getElementById('opFill');
  const opPct=document.getElementById('opPct');
  if(opFill)opFill.style.width=overall+'%';
  if(opPct)opPct.textContent=overall+'%';
}

function updateSectionProgress(key,total){
  const p=getProgress(key,total);
  const fill=document.getElementById('secProgFill');
  const pct=document.getElementById('secProgPct');
  if(fill)fill.style.width=p.pct+'%';
  if(pct)pct.textContent=p.pct+'%';
}

/* ===================== AUTH ===================== */
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
  document.querySelector(`.tab-btn:${tab==='signin'?'first-child':'last-child'}`).classList.add('active');
  document.getElementById(tab==='signin'?'signinForm':'signupForm').classList.add('active');
}
function getUsers(){return JSON.parse(localStorage.getItem('kw_users')||'{}')}
function saveUsers(u){localStorage.setItem('kw_users',JSON.stringify(u))}

function handleSignUp(){
  const u=document.getElementById('signupUsername').value.trim();
  const p=document.getElementById('signupPassword').value;
  const e=document.getElementById('signupError');
  if(!u){e.textContent='Please enter a username!';return}
  if(!p){e.textContent='Please enter a password!';return}
  const users=getUsers();
  if(users[u]){e.textContent='Username already exists!';return}
  users[u]={password:p,joined:Date.now()};saveUsers(users);
  currentUser=u;isGuest=false;e.textContent='';showWelcome();
}
function handleSignIn(){
  const u=document.getElementById('signinUsername').value.trim();
  const p=document.getElementById('signinPassword').value;
  const e=document.getElementById('signinError');
  const users=getUsers();
  if(!users[u]){e.textContent='Username not found!';return}
  if(users[u].password!==p){e.textContent='Wrong password!';return}
  currentUser=u;isGuest=false;e.textContent='';showWelcome();
}
function enterGuestMode(){currentUser=null;isGuest=true;showWelcome();}
function logout(){
  currentUser=null;isGuest=false;
  stopSnake();stopRocket();stopTTTComputer();
  showScreen('authScreen');showToast('See you soon! 👋');
}
function switchToAuth(tab){showScreen('authScreen');switchTab(tab);}

/* ===================== NAVIGATION ===================== */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function goBack(to){
  if(to==='welcome'){showWelcome();return}
  showScreen(to);
}
function showWelcome(){
  showScreen('welcomeScreen');
  document.getElementById('welcomeUser').textContent=isGuest?'👋 Hello, Guest!':`👋 Hello, ${currentUser}!`;
  document.getElementById('welcomeQuote').textContent=quotes[Math.floor(Math.random()*quotes.length)];
  setTimeout(updateAllProgress,100);
}

/* ===================== SECTION OPENERS ===================== */
function openSection(section){
  currentSection=section;
  stopSnake();stopRocket();stopTTTComputer();
  if(section==='rhymes'){renderRhymes();showScreen('rhymesSection');}
  else if(section==='tables'){renderTables();showScreen('tablesSection');}
  else if(section==='gamezone'){renderGames();showScreen('gamezoneSection');}
  else if(section==='readzone'){renderBooks();showScreen('readzoneSection');}
  else if(sectionDataMap[section]){renderLearnSection(section);showScreen('learnSection');}
}

/* ---- LEARN SECTION ---- */
function renderLearnSection(section){
  const{data,title}=sectionDataMap[section];
  document.getElementById('learnSectionTitle').textContent=title;
  const visited=getVisited(section);
  const grid=document.getElementById('itemsGrid');
  grid.innerHTML='';
  data.forEach((item,i)=>{
    const locked=isGuest&&i!==guestAllowedIndex;
    const vis=visited.includes(item.id);
    const card=document.createElement('div');
    card.className='item-card'+(locked?' locked':'')+(vis?' visited':'');
    card.innerHTML=`<div class="item-emoji">${item.emoji}</div><h4>${item.name}</h4>`;
    card.style.animationDelay=`${i*0.07}s`;
    card.onclick=()=>{if(locked){showGuestModal();return;}openItem(section,item);};
    grid.appendChild(card);
  });
  updateSectionProgress(section,data.length);
}

function openItem(section,item){
  currentItem={section,item};
  markVisited(section,item.id);
  updateAllProgress();
  document.getElementById('detailTitle').textContent=sectionDataMap[section].title;
  document.getElementById('detailName').textContent=item.name;
  document.getElementById('detailStory').textContent=item.story;
  const imgEl=document.getElementById('detailImage');
  if(item.image){imgEl.style.backgroundImage=`url('${item.image}')`;imgEl.textContent='';}
  else{imgEl.style.backgroundImage='';imgEl.textContent=item.emoji;}
  document.getElementById('detailFacts').innerHTML=item.facts.map(f=>`<span class="fact-badge">${f}</span>`).join('');
  document.getElementById('detailBackBtn').onclick=()=>showScreen('learnSection');
  showScreen('itemDetail');
}

/* ---- QUIZ ---- */
function startQuiz(){
  if(!currentItem)return;
  currentQuiz=currentItem.item.quiz;
  currentQuizIndex=0;currentQuizScore=0;
  renderQuizSteps();showQuizQuestion();showScreen('quizScreen');
}
function renderQuizSteps(){
  const stepsEl=document.getElementById('quizSteps');
  stepsEl.innerHTML='';
  currentQuiz.forEach((_,i)=>{
    const s=document.createElement('div');
    s.className='qstep'+(i===currentQuizIndex?' current':'');
    s.id=`qstep${i}`;stepsEl.appendChild(s);
  });
}
function updateQuizSteps(correct){
  for(let i=0;i<currentQuiz.length;i++){
    const el=document.getElementById(`qstep${i}`);
    if(!el)continue;
    if(i<currentQuizIndex)el.className='qstep done';
    else if(i===currentQuizIndex)el.className='qstep current';
    else el.className='qstep';
  }
}
function showQuizQuestion(){
  const q=currentQuiz[currentQuizIndex];
  document.getElementById('questionNum').textContent=`Q ${currentQuizIndex+1}/${currentQuiz.length}`;
  const db=document.getElementById('questionDiff');
  db.textContent=q.diff.charAt(0).toUpperCase()+q.diff.slice(1);
  db.className='diff-badge diff-'+q.diff;
  document.getElementById('quizScore').textContent=currentQuizScore;
  document.getElementById('quizQuestion').textContent=q.q;
  const optsEl=document.getElementById('quizOptions');
  optsEl.innerHTML='';
  q.opts.forEach((opt,i)=>{
    const btn=document.createElement('button');
    btn.className='quiz-option';
    btn.textContent=`${'ABCD'[i]}. ${opt}`;
    btn.onclick=()=>answerQuiz(i,q.ans,btn);
    optsEl.appendChild(btn);
  });
  document.getElementById('quizFeedback').className='quiz-feedback hidden';
  document.getElementById('nextBtn').classList.add('hidden');
  updateQuizSteps();
}
function answerQuiz(selected,correct,btn){
  document.querySelectorAll('.quiz-option').forEach(b=>b.disabled=true);
  const fb=document.getElementById('quizFeedback');
  const step=document.getElementById(`qstep${currentQuizIndex}`);
  if(selected===correct){
    btn.classList.add('correct');
    fb.textContent='✅ Correct! Well done!';fb.className='quiz-feedback correct-fb';
    currentQuizScore++;document.getElementById('quizScore').textContent=currentQuizScore;
    if(step)step.className='qstep done';
  }else{
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-option')[correct].classList.add('correct');
    fb.textContent=`❌ The correct answer was: ${currentQuiz[currentQuizIndex].opts[correct]}`;
    fb.className='quiz-feedback wrong-fb';
    if(step)step.className='qstep wrong';
  }
  document.getElementById('nextBtn').classList.remove('hidden');
}
function nextQuestion(){
  currentQuizIndex++;
  if(currentQuizIndex>=currentQuiz.length)showQuizResult();
  else showQuizQuestion();
}
function showQuizResult(){
  const score=currentQuizScore,total=currentQuiz.length;
  document.getElementById('resultScore').textContent=`${score}/${total}`;
  let emoji,title,msg;
  if(score===total){emoji='🏆';title='Perfect Score!';msg='You are a superstar! Amazing!';}
  else if(score>=total-1){emoji='🎉';title='Great Job!';msg='You did really well!';}
  else if(score>=Math.floor(total/2)){emoji='😊';title='Good Try!';msg='Keep learning and try again!';}
  else{emoji='💪';title='Keep Going!';msg='Read the story again and try!';}
  document.getElementById('resultEmoji').textContent=emoji;
  document.getElementById('resultTitle').textContent=title;
  document.getElementById('resultMsg').textContent=msg;
  showScreen('quizResult');
}
function retryQuiz(){
  currentQuizIndex=0;currentQuizScore=0;
  renderQuizSteps();showQuizQuestion();showScreen('quizScreen');
}

/* ---- RHYMES ---- */
function renderRhymes(){
  const list=document.getElementById('rhymesList');
  list.innerHTML='';
  const visited=getVisited('rhymes');
  rhymesData.forEach((r,i)=>{
    const locked=isGuest&&i!==guestAllowedIndex;
    const vis=visited.includes(r.id);
    const el=document.createElement('div');
    el.className='rhyme-item'+(locked?' locked':'')+(vis?' visited':'');
    el.innerHTML=`<div class="rhyme-item-icon">${r.emoji}</div>
      <div class="rhyme-item-info"><h4>${r.name}</h4>
      <p>${locked?'🔒 Sign up to unlock':vis?'✅ Viewed':'Tap to read & watch'}</p></div>`;
    el.onclick=()=>{if(locked){showGuestModal();return;}openRhyme(r);};
    list.appendChild(el);
  });
  const p=getProgress('rhymes',rhymesData.length);
  const fill=document.getElementById('rhymesProgFill');
  const pct=document.getElementById('rhymesProgPct');
  if(fill)fill.style.width=p.pct+'%';if(pct)pct.textContent=p.pct+'%';
}
function openRhyme(r){
  markVisited('rhymes',r.id);updateAllProgress();
  document.getElementById('rhymeDetailTitle').textContent=r.name;
  document.getElementById('rhymeDetailName').textContent=r.name;
  document.getElementById('rhymeDetailText').textContent=r.text;
  const vc=document.getElementById('rhymeVideoContainer');
  if(r.videoUrl)vc.innerHTML=`<iframe src="${r.videoUrl}" allowfullscreen></iframe>`;
  else vc.innerHTML=`<div style="color:rgba(255,255,255,0.4);text-align:center;padding:30px;width:100%">🎬 Add video URL in<br><code style="color:var(--secondary)">rhymesData[].videoUrl</code></div>`;
  showScreen('rhymeDetail');
}

/* ---- TABLES ---- */
function renderTables(){
  const list=document.getElementById('tablesList');
  list.innerHTML='';
  const visited=getVisited('tables');
  tablesData.forEach((t,i)=>{
    const locked=isGuest&&i!==guestAllowedIndex;
    const vis=visited.includes(t.id);
    const el=document.createElement('div');
    el.className='table-item'+(locked?' locked':'')+(vis?' visited':'');
    el.innerHTML=`${t.emoji}<br><small style="font-size:0.7rem;color:rgba(255,255,255,0.55)">${locked?'🔒':vis?'✅':'Tap'}</small>`;
    el.onclick=()=>{if(locked){showGuestModal();return;}openTable(t);};
    list.appendChild(el);
  });
  const p=getProgress('tables',tablesData.length);
  const fill=document.getElementById('tablesProgFill');
  const pct=document.getElementById('tablesProgPct');
  if(fill)fill.style.width=p.pct+'%';if(pct)pct.textContent=p.pct+'%';
}
function openTable(t){
  markVisited('tables',t.id);updateAllProgress();
  document.getElementById('tableDetailTitle').textContent=t.name;
  document.getElementById('tableDetailName').textContent=t.name;
  document.getElementById('tableDetailText').textContent=t.text;
  const vc=document.getElementById('tableVideoContainer');
  if(t.videoUrl)vc.innerHTML=`<iframe src="${t.videoUrl}" allowfullscreen></iframe>`;
  else vc.innerHTML=`<div style="color:rgba(255,255,255,0.4);text-align:center;padding:30px;width:100%">🎬 Add video URL in<br><code style="color:var(--secondary)">tablesData[].videoUrl</code></div>`;
  showScreen('tableDetail');
}

/* ---- GAMES ---- */
function renderGames(){
  const grid=document.getElementById('gamesGrid');
  grid.innerHTML='';
  const visited=getVisited('gamezone');
  gamesData.forEach((g,i)=>{
    const locked=isGuest&&i!==guestAllowedIndex;
    const vis=visited.includes(g.id);
    const card=document.createElement('div');
    card.className='game-card'+(locked?' locked':'');
    card.innerHTML=`<div class="game-card-icon">${g.emoji}</div><h4>${g.name}</h4>
      <p>${locked?'🔒 Sign up to unlock':vis?`✅ ${g.desc}`:g.desc}</p>`;
    card.onclick=()=>{if(locked){showGuestModal();return;}openGameLevels(g);};
    grid.appendChild(card);
  });
  const p=getProgress('gamezone',gamesData.length);
  const fill=document.getElementById('gamesProgFill');
  const pct=document.getElementById('gamesProgPct');
  if(fill)fill.style.width=p.pct+'%';if(pct)pct.textContent=p.pct+'%';
}
function openGameLevels(g){
  currentGame=g.id;
  document.getElementById('gameLevelTitle').textContent=`${g.emoji} ${g.name}`;
  ['easy','medium','hard'].forEach(lvl=>{
    const key=`kw_hs_${g.id}_${lvl}`;
    document.getElementById(`hs${lvl.charAt(0).toUpperCase()+lvl.slice(1)}`).textContent=localStorage.getItem(key)||0;
  });
  showScreen('gameLevelSelect');
}
function startGame(level){
  currentLevel=level;
  markVisited('gamezone',currentGame);updateAllProgress();
  if     (currentGame==='snake')    {showScreen('snakeGame');startSnakeGame();}
  else if(currentGame==='rocket')   {showScreen('rocketGame');startRocketGame();}
  else if(currentGame==='flip')     {showScreen('flipGame');startFlipGame();}
  else if(currentGame==='ludo')     {showScreen('ludoGame');startLudo();}
  else if(currentGame==='tictactoe'){showScreen('tictactoeGame');startTTT();}
}
function exitGame(){
  stopSnake();stopRocket();stopTTTComputer();
  showScreen('gameLevelSelect');
}
function saveHighScore(game,level,score){
  const key=`kw_hs_${game}_${level}`;
  const prev=parseInt(localStorage.getItem(key)||'0');
  if(score>prev){localStorage.setItem(key,score);showToast(`🏆 New High Score: ${score}!`);}
}

/* =====================================================
   SNAKE GAME — Smooth 60fps with requestAnimationFrame
   ===================================================== */
let snakeRAF=null,snakeLastTime=0;
const SGRID=24;
let snake=[],food={},snakeCurDir='right',snakePendingDir='right',snakeRunning=false,snakeScoreVal=0;
let snakeParticles=[];

function startSnakeGame(){
  stopSnake();
  const speedMs={easy:160,medium:100,hard:60}[currentLevel];
  snake=[{x:5,y:5},{x:4,y:5},{x:3,y:5}];
  snakeCurDir=snakePendingDir='right';
  snakeRunning=true;snakeScoreVal=0;snakeParticles=[];
  document.getElementById('snakeScore').textContent=0;
  document.getElementById('snakeHigh').textContent=localStorage.getItem(`kw_hs_snake_${currentLevel}`)||0;
  placeSnakeFood();
  let elapsed=0,lastStep=0;
  const canvas=document.getElementById('snakeCanvas');
  function loop(ts){
    if(!snakeRunning)return;
    const dt=ts-snakeLastTime;snakeLastTime=ts;
    elapsed+=dt;
    snakeParticles=snakeParticles.filter(p=>p.life>0);
    snakeParticles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=2;p.vy+=0.1;});
    if(elapsed-lastStep>=speedMs){lastStep=elapsed;snakeStep(canvas);}
    else drawSnakeOnly(canvas);
    snakeRAF=requestAnimationFrame(loop);
  }
  snakeLastTime=performance.now();
  snakeRAF=requestAnimationFrame(loop);
  document.onkeydown=e=>{
    const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};
    if(m[e.key]){e.preventDefault();trySnakeDir(m[e.key]);}
  };
}
function stopSnake(){if(snakeRAF){cancelAnimationFrame(snakeRAF);snakeRAF=null;}snakeRunning=false;document.onkeydown=null;}
function trySnakeDir(d){
  const opp={up:'down',down:'up',left:'right',right:'left'};
  if(d!==opp[snakeCurDir])snakePendingDir=d;
}
function snakeDir(d){trySnakeDir(d);}
function placeSnakeFood(){
  const canvas=document.getElementById('snakeCanvas');
  const cols=Math.floor(canvas.width/SGRID),rows=Math.floor(canvas.height/SGRID);
  let pos;
  do{pos={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};}
  while(snake.some(s=>s.x===pos.x&&s.y===pos.y));
  food=pos;
}
function snakeStep(canvas){
  snakeCurDir=snakePendingDir;
  const cols=Math.floor(canvas.width/SGRID),rows=Math.floor(canvas.height/SGRID);
  const head={...snake[0]};
  if(snakeCurDir==='up')head.y--;if(snakeCurDir==='down')head.y++;
  if(snakeCurDir==='left')head.x--;if(snakeCurDir==='right')head.x++;
  if(head.x<0||head.x>=cols||head.y<0||head.y>=rows){snakeGameOver(canvas);return;}
  if(snake.some(s=>s.x===head.x&&s.y===head.y)){snakeGameOver(canvas);return;}
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){
    snakeScoreVal+=10;
    document.getElementById('snakeScore').textContent=snakeScoreVal;
    for(let i=0;i<12;i++)snakeParticles.push({
      x:food.x*SGRID+SGRID/2,y:food.y*SGRID+SGRID/2,
      vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*4,
      life:60,color:`hsl(${Math.random()*60+20},100%,60%)`
    });
    placeSnakeFood();
  }else snake.pop();
  drawSnakeOnly(canvas);
}
function drawSnakeOnly(canvas){
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  // Background grid
  ctx.fillStyle='#0a140a';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(0,255,0,0.04)';
  for(let x=0;x<W;x+=SGRID){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=SGRID){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // Food — glowing apple
  ctx.save();
  ctx.shadowColor='#ff6b35';ctx.shadowBlur=16;
  ctx.fillStyle='#ff4422';
  const fx=food.x*SGRID,fy=food.y*SGRID;
  ctx.beginPath();ctx.arc(fx+SGRID/2,fy+SGRID/2,SGRID/2-2,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#ff8855';
  ctx.beginPath();ctx.arc(fx+SGRID/2-3,fy+SGRID/2-3,3,0,Math.PI*2);ctx.fill();
  ctx.restore();
  // Particles
  snakeParticles.forEach(p=>{
    ctx.save();ctx.globalAlpha=p.life/60;ctx.fillStyle=p.color;
    ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();ctx.restore();
  });
  // Snake
  snake.forEach((s,i)=>{
    const x=s.x*SGRID+1,y=s.y*SGRID+1,sz=SGRID-2;
    ctx.save();
    if(i===0){
      ctx.shadowColor='#06d6a0';ctx.shadowBlur=12;
      ctx.fillStyle='#06d6a0';
    }else{
      const ratio=i/snake.length;
      ctx.fillStyle=`hsl(${160-ratio*40},80%,${50-ratio*15}%)`;
    }
    ctx.beginPath();
    ctx.roundRect?ctx.roundRect(x,y,sz,sz,5):ctx.rect(x,y,sz,sz);
    ctx.fill();
    if(i===0){// Eyes
      ctx.shadowBlur=0;ctx.fillStyle='#000';
      ctx.beginPath();ctx.arc(x+sz*0.3,y+sz*0.3,2.5,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x+sz*0.7,y+sz*0.3,2.5,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  });
}
function snakeGameOver(canvas){
  stopSnake();saveHighScore('snake',currentLevel,snakeScoreVal);
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='rgba(0,0,0,0.72)';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.save();ctx.textAlign='center';
  ctx.font=`bold 36px 'Baloo 2', cursive`;ctx.fillStyle='#ffd166';
  ctx.fillText('Game Over!',canvas.width/2,canvas.height/2-30);
  ctx.font=`22px 'Nunito', sans-serif`;ctx.fillStyle='#fff';
  ctx.fillText(`Score: ${snakeScoreVal}`,canvas.width/2,canvas.height/2+10);
  ctx.fillStyle='rgba(255,255,255,0.55)';ctx.font=`16px 'Nunito', sans-serif`;
  ctx.fillText('Press ▶ START to play again',canvas.width/2,canvas.height/2+46);
  ctx.restore();
  document.getElementById('snakeHigh').textContent=localStorage.getItem(`kw_hs_snake_${currentLevel}`)||0;
}

/* =====================================================
   ROCKET GAME — Smooth 60fps, lives, power-ups
   ===================================================== */
let rocketRAF=null,rocketRunning=false,rocketScoreVal=0,rocketLives=3;
let rocketX=300,rocketVX=0;
let bullets=[],asteroids=[],stars=[],explosions=[];
let rocketCanvas2=null,rocketCtx2=null;
let asteroidSpawnInterval=null;
const rocketKeys={left:false,right:false};

function startRocketGame(){
  stopRocket();
  rocketCanvas2=document.getElementById('rocketCanvas');
  rocketCtx2=rocketCanvas2.getContext('2d');
  rocketX=rocketCanvas2.width/2;rocketVX=0;
  bullets=[];asteroids=[];explosions=[];rocketScoreVal=0;rocketLives=3;rocketRunning=true;
  document.getElementById('rocketScore').textContent=0;
  document.getElementById('rocketLives').textContent='❤️❤️❤️';
  // Init stars
  stars=Array.from({length:80},()=>({
    x:Math.random()*rocketCanvas2.width,
    y:Math.random()*rocketCanvas2.height,
    spd:0.3+Math.random()*1.2,size:Math.random()*2+0.5
  }));
  const spawnMs={easy:1400,medium:900,hard:500}[currentLevel];
  asteroidSpawnInterval=setInterval(()=>{if(rocketRunning)spawnAsteroid();},spawnMs);
  rocketCanvas2.onclick=()=>fireBullet();
  document.onkeydown=e=>{
    if(e.code==='Space'){e.preventDefault();fireBullet();}
    if(e.key==='ArrowLeft')rocketKeys.left=true;
    if(e.key==='ArrowRight')rocketKeys.right=true;
  };
  document.onkeyup=e=>{
    if(e.key==='ArrowLeft')rocketKeys.left=false;
    if(e.key==='ArrowRight')rocketKeys.right=false;
  };
  rocketRAF=requestAnimationFrame(rocketLoop);
}
function stopRocket(){
  if(rocketRAF){cancelAnimationFrame(rocketRAF);rocketRAF=null;}
  clearInterval(asteroidSpawnInterval);
  rocketRunning=false;document.onkeydown=null;document.onkeyup=null;
  if(rocketCanvas2)rocketCanvas2.onclick=null;
}
function rocketMoveLeft(){rocketKeys.left=true;setTimeout(()=>rocketKeys.left=false,80);}
function rocketMoveRight(){rocketKeys.right=true;setTimeout(()=>rocketKeys.right=false,80);}
function fireBullet(){
  if(!rocketRunning||!rocketCanvas2)return;
  bullets.push({x:rocketX,y:rocketCanvas2.height-70,trail:[]});
}
function spawnAsteroid(){
  if(!rocketCanvas2)return;
  asteroids.push({
    x:30+Math.random()*(rocketCanvas2.width-60),y:-30,
    r:18+Math.random()*18,
    vx:(Math.random()-0.5)*1.5,
    rot:0,rotSpd:(Math.random()-0.5)*0.08,
    craters:Array.from({length:3},()=>({dx:(Math.random()-0.5)*0.6,dy:(Math.random()-0.5)*0.6,r:0.15+Math.random()*0.2}))
  });
}
function rocketLoop(){
  if(!rocketRunning){return;}
  const c=rocketCanvas2,ctx=rocketCtx2,W=c.width,H=c.height;
  // BG
  ctx.fillStyle='#00001a';ctx.fillRect(0,0,W,H);
  // Stars
  stars.forEach(s=>{
    s.y+=s.spd;if(s.y>H)s.y=0;
    ctx.fillStyle=`rgba(255,255,255,${0.3+s.size*0.2})`;
    ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fill();
  });
  // Move rocket
  if(rocketKeys.left){rocketVX-=1.5;}
  if(rocketKeys.right){rocketVX+=1.5;}
  rocketVX*=0.88;
  rocketX=Math.max(24,Math.min(W-24,rocketX+rocketVX));
  // Bullets
  bullets.forEach(b=>{b.trail.push({x:b.x,y:b.y});if(b.trail.length>10)b.trail.shift();b.y-=12;});
  bullets=bullets.filter(b=>b.y>-20);
  bullets.forEach(b=>{
    b.trail.forEach((t,i)=>{
      ctx.save();ctx.globalAlpha=i/b.trail.length*0.5;
      ctx.fillStyle='#ffaa00';ctx.beginPath();ctx.arc(t.x,t.y,3,0,Math.PI*2);ctx.fill();ctx.restore();
    });
    ctx.save();ctx.shadowColor='#ffd166';ctx.shadowBlur=14;
    ctx.fillStyle='#ffee44';ctx.fillRect(b.x-3,b.y,6,18);ctx.restore();
  });
  // Asteroids
  const aspd={easy:1.4,medium:2.2,hard:3.5}[currentLevel];
  asteroids.forEach(a=>{a.y+=aspd+Math.abs(a.vx)*0.3;a.x+=a.vx;a.rot+=a.rotSpd;});
  asteroids=asteroids.filter(a=>a.y<H+50);
  asteroids.forEach(a=>{
    ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.rot);
    ctx.fillStyle='#6a6a7a';ctx.beginPath();ctx.arc(0,0,a.r,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#4a4a5a';
    a.craters.forEach(cr=>{ctx.beginPath();ctx.arc(cr.dx*a.r,cr.dy*a.r,cr.r*a.r,0,Math.PI*2);ctx.fill();});
    ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(0,0,a.r,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  });
  // Explosions
  explosions.forEach(ex=>{
    ex.particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.life-=3;p.vy+=0.08;
      ctx.save();ctx.globalAlpha=p.life/100;ctx.fillStyle=p.color;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore();
    });
  });
  explosions=explosions.filter(ex=>ex.particles.some(p=>p.life>0));
  // Draw Rocket
  const ry=H-55;
  ctx.save();
  ctx.shadowColor='#06d6a0';ctx.shadowBlur=18;
  // Body
  ctx.fillStyle='#e0e8ff';ctx.beginPath();
  ctx.moveTo(rocketX,ry-30);ctx.lineTo(rocketX-18,ry+20);ctx.lineTo(rocketX+18,ry+20);ctx.closePath();ctx.fill();
  // Cockpit
  ctx.fillStyle='#66aaff';ctx.beginPath();ctx.arc(rocketX,ry-10,9,0,Math.PI*2);ctx.fill();
  // Fins
  ctx.fillStyle='#ff6b35';
  ctx.beginPath();ctx.moveTo(rocketX-18,ry+20);ctx.lineTo(rocketX-28,ry+34);ctx.lineTo(rocketX-10,ry+20);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(rocketX+18,ry+20);ctx.lineTo(rocketX+28,ry+34);ctx.lineTo(rocketX+10,ry+20);ctx.closePath();ctx.fill();
  // Flame
  const flameH=20+Math.random()*14;
  const grad=ctx.createLinearGradient(rocketX,ry+20,rocketX,ry+20+flameH);
  grad.addColorStop(0,'#fff');grad.addColorStop(0.3,'#ffd166');grad.addColorStop(0.7,'#ff6b35');grad.addColorStop(1,'transparent');
  ctx.fillStyle=grad;ctx.beginPath();
  ctx.moveTo(rocketX-8,ry+20);ctx.lineTo(rocketX,ry+20+flameH);ctx.lineTo(rocketX+8,ry+20);ctx.closePath();ctx.fill();
  ctx.restore();
  // COLLISIONS: bullet vs asteroid
  for(let bi=bullets.length-1;bi>=0;bi--){
    for(let ai=asteroids.length-1;ai>=0;ai--){
      if(Math.hypot(bullets[bi].x-asteroids[ai].x,bullets[bi].y-asteroids[ai].y)<asteroids[ai].r+5){
        createExplosion(asteroids[ai].x,asteroids[ai].y,asteroids[ai].r);
        bullets.splice(bi,1);asteroids.splice(ai,1);
        rocketScoreVal+=10;document.getElementById('rocketScore').textContent=rocketScoreVal;
        showToast('💥 +10!');break;
      }
    }
  }
  // COLLISION: asteroid vs rocket
  const hitRadius=22;
  for(let ai=asteroids.length-1;ai>=0;ai--){
    if(Math.hypot(rocketX-asteroids[ai].x,(H-40)-asteroids[ai].y)<asteroids[ai].r+hitRadius){
      createExplosion(asteroids[ai].x,asteroids[ai].y,asteroids[ai].r);
      asteroids.splice(ai,1);rocketLives--;
      const livesEl=['❤️❤️❤️','❤️❤️🖤','❤️🖤🖤','🖤🖤🖤'][3-rocketLives]||'🖤🖤🖤';
      document.getElementById('rocketLives').textContent=livesEl;
      if(rocketLives<=0){rocketGameOver(ctx,W,H);return;}
    }
  }
  rocketRAF=requestAnimationFrame(rocketLoop);
}
function createExplosion(x,y,r){
  explosions.push({particles:Array.from({length:20},()=>({
    x,y,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6,
    life:80+Math.random()*40,r:2+Math.random()*4,
    color:`hsl(${Math.random()*50+10},100%,${50+Math.random()*30}%)`
  }))});
}
function rocketGameOver(ctx,W,H){
  stopRocket();saveHighScore('rocket',currentLevel,rocketScoreVal);
  ctx.fillStyle='rgba(0,0,0,0.75)';ctx.fillRect(0,0,W,H);
  ctx.save();ctx.textAlign='center';
  ctx.font=`bold 38px 'Baloo 2',cursive`;ctx.fillStyle='#ffd166';ctx.fillText('Game Over!',W/2,H/2-30);
  ctx.font=`22px 'Nunito',sans-serif`;ctx.fillStyle='#fff';ctx.fillText(`Score: ${rocketScoreVal}`,W/2,H/2+10);
  ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font=`16px 'Nunito',sans-serif`;
  ctx.fillText('Press ▶ Start / Restart',W/2,H/2+46);ctx.restore();
}

/* =====================================================
   FLIP CARD GAME
   ===================================================== */
const flipEmojiPool=['🦁','🐘','🦜','🐬','🌟','🍎','🚀','🎵','🐯','🦩','🥕','🎲'];
let flipFlipped=[],flipMatched=0,flipMoveCount=0,flipLocked=false,flipTotal=0;

function startFlipGame(){
  const board=document.getElementById('flipBoard');
  const counts={easy:8,medium:12,hard:16}[currentLevel];
  flipTotal=counts/2;
  const emojis=flipEmojiPool.slice(0,counts/2);
  let deck=[...emojis,...emojis].sort(()=>Math.random()-0.5);
  flipMatched=0;flipMoveCount=0;flipFlipped=[];flipLocked=false;
  document.getElementById('flipMoves').textContent=0;
  const bestKey=`kw_hs_flip_${currentLevel}`;
  document.getElementById('flipBest').textContent=localStorage.getItem(bestKey)||'—';
  const cols=Math.ceil(Math.sqrt(counts));
  board.style.gridTemplateColumns=`repeat(${cols},1fr)`;
  board.innerHTML='';
  deck.forEach((emoji,i)=>{
    const wrap=document.createElement('div');
    wrap.className='flip-card-wrap';
    wrap.dataset.emoji=emoji;
    wrap.innerHTML=`<div class="flip-card-inner">
      <div class="flip-card-front">❓</div>
      <div class="flip-card-back">${emoji}</div></div>`;
    wrap.onclick=()=>flipCard(wrap);
    board.appendChild(wrap);
  });
  updateFlipProgress();
}
function updateFlipProgress(){
  const pct=flipTotal?Math.round(flipMatched/flipTotal*100):0;
  const fill=document.getElementById('flipProgFill');
  const pctEl=document.getElementById('flipProgPct');
  if(fill)fill.style.width=pct+'%';if(pctEl)pctEl.textContent=pct+'%';
}
function flipCard(card){
  if(flipLocked||card.classList.contains('flipped')||card.classList.contains('matched'))return;
  card.classList.add('flipped');flipFlipped.push(card);
  if(flipFlipped.length===2){
    flipLocked=true;flipMoveCount++;
    document.getElementById('flipMoves').textContent=flipMoveCount;
    if(flipFlipped[0].dataset.emoji===flipFlipped[1].dataset.emoji){
      flipFlipped.forEach(c=>{c.classList.add('matched');});
      flipFlipped=[];flipLocked=false;flipMatched++;
      updateFlipProgress();
      if(flipMatched===flipTotal){
        showToast(`🎉 All matched in ${flipMoveCount} moves!`);
        const bestKey=`kw_hs_flip_${currentLevel}`;
        const prev=parseInt(localStorage.getItem(bestKey)||'9999');
        if(flipMoveCount<prev)localStorage.setItem(bestKey,flipMoveCount);
        document.getElementById('flipBest').textContent=localStorage.getItem(bestKey);
      }
    }else{
      setTimeout(()=>{flipFlipped.forEach(c=>c.classList.remove('flipped'));flipFlipped=[];flipLocked=false;},900);
    }
  }
}

/* =====================================================
   LUDO GAME
   ===================================================== */
let ludoPositions=[],ludoTurn=0;
const ludoColors=['🔴','🔵','🟢','🟡'];
const ludoNames=['Red','Blue','Green','Yellow'];
const LUDO_TOTAL=42;

function startLudo(){
  const counts={easy:2,medium:3,hard:4}[currentLevel]||2;
  ludoPositions=new Array(counts).fill(0);ludoTurn=0;
  renderLudoBoard();updateLudoPlayers();
  document.getElementById('ludoStatus').textContent=`${ludoColors[0]} ${ludoNames[0]}'s turn`;
  document.getElementById('ludoDiceResult').textContent='🎲';
}
function rollLudo(){
  const dice=Math.floor(Math.random()*6)+1;
  document.getElementById('ludoDiceResult').textContent=['⚀','⚁','⚂','⚃','⚄','⚅'][dice-1];
  ludoPositions[ludoTurn]=Math.min(ludoPositions[ludoTurn]+dice,LUDO_TOTAL);
  renderLudoBoard();updateLudoPlayers();
  if(ludoPositions[ludoTurn]>=LUDO_TOTAL){
    showToast(`🎉 ${ludoColors[ludoTurn]} ${ludoNames[ludoTurn]} Wins!`);
    saveHighScore('ludo',currentLevel,LUDO_TOTAL);
    startLudo();return;
  }
  ludoTurn=(ludoTurn+1)%ludoPositions.length;
  document.getElementById('ludoStatus').textContent=`${ludoColors[ludoTurn]} ${ludoNames[ludoTurn]}'s turn`;
}
function renderLudoBoard(){
  const board=document.getElementById('ludoBoard');board.innerHTML='';
  for(let i=0;i<LUDO_TOTAL;i++){
    const cell=document.createElement('div');cell.className='ludo-cell';
    if(i+1===LUDO_TOTAL)cell.classList.add('finish');
    const here=[];
    ludoPositions.forEach((pos,pi)=>{if(pos===i+1)here.push(ludoColors[pi]);});
    if(here.length){cell.textContent=here.join('');cell.classList.add('has-piece');}
    else cell.textContent=i+1;
    board.appendChild(cell);
  }
}
function updateLudoPlayers(){
  const el=document.getElementById('ludoPlayers');if(!el)return;
  el.innerHTML='<div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-bottom:8px;text-align:center">Player Positions</div>'+
    ludoPositions.map((pos,i)=>`<div class="ludo-player-row${i===ludoTurn?' active-player':''}">${ludoColors[i]} ${ludoNames[i]}: Step ${pos}/${LUDO_TOTAL}</div>`).join('');
}

/* =====================================================
   TIC TAC TOE — With AI opponent (minimax)
   ===================================================== */
let tttBoard2=[],tttRunning=false,tttScoreX=0,tttScoreO=0,tttDraws=0;
let tttThinkTimeout=null;
function stopTTTComputer(){clearTimeout(tttThinkTimeout);}

function startTTT(){
  clearTimeout(tttThinkTimeout);
  tttBoard2=Array(9).fill('');tttRunning=true;
  document.getElementById('tttStatus').textContent='Your turn! You are ❌';
  renderTTT(false);
}
function renderTTT(won,winLine){
  const board=document.getElementById('tttBoard');board.innerHTML='';
  tttBoard2.forEach((val,i)=>{
    const cell=document.createElement('div');
    cell.className='ttt-cell'+(val?' taken':'');
    if(val==='X')cell.classList.add('x-cell');
    if(val==='O')cell.classList.add('o-cell');
    if(winLine&&winLine.includes(i))cell.classList.add('win-cell');
    cell.textContent=val;
    cell.onclick=()=>{if(!tttRunning||tttBoard2[i]||val)return;playerMoveX(i);};
    board.appendChild(cell);
  });
}
function playerMoveX(i){
  if(!tttRunning||tttBoard2[i])return;
  tttBoard2[i]='X';
  const res=checkTTT(tttBoard2);
  if(res){handleTTTEnd(res);return;}
  if(tttBoard2.every(c=>c)){handleTTTEnd({winner:'draw'});return;}
  document.getElementById('tttStatus').textContent='🤔 Computer thinking...';
  renderTTT(false);
  tttThinkTimeout=setTimeout(()=>{computerMoveO();},500);
}
function computerMoveO(){
  const best=minimax(tttBoard2,'O');
  tttBoard2[best.idx]='O';
  renderTTT(false);
  const res=checkTTT(tttBoard2);
  if(res){handleTTTEnd(res);return;}
  if(tttBoard2.every(c=>c)){handleTTTEnd({winner:'draw'});return;}
  document.getElementById('tttStatus').textContent='Your turn! You are ❌';
}
function handleTTTEnd(res){
  tttRunning=false;
  if(res.winner==='X'){tttScoreX++;document.getElementById('tttStatus').textContent='🎉 You Win! ❌';showToast('🎉 You WIN!');}
  else if(res.winner==='O'){tttScoreO++;document.getElementById('tttStatus').textContent='😅 Computer Wins! ⭕';}
  else{tttDraws++;document.getElementById('tttStatus').textContent="🤝 It's a Draw!";}
  document.getElementById('tttScoreX').textContent=tttScoreX;
  document.getElementById('tttScoreO').textContent=tttScoreO;
  document.getElementById('tttDraw').textContent=tttDraws;
  renderTTT(true,res.line);
  saveHighScore('tictactoe',currentLevel,tttScoreX);
}
const WIN_LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checkTTT(board){
  for(const line of WIN_LINES){
    const[a,b,c]=line;
    if(board[a]&&board[a]===board[b]&&board[a]===board[c])return{winner:board[a],line};
  }return null;
}
function minimax(board,player,depth=0){
  const res=checkTTT(board);
  if(res){return res.winner==='O'?{score:10-depth}:{score:depth-10};}
  if(board.every(c=>c))return{score:0};
  const moves=[];
  board.forEach((_,i)=>{
    if(!board[i]){
      board[i]=player;
      const score=minimax(board,player==='O'?'X':'O',depth+1).score;
      board[i]='';moves.push({idx:i,score});
    }
  });
  return player==='O'?moves.reduce((b,m)=>m.score>b.score?m:b):moves.reduce((b,m)=>m.score<b.score?m:b);
}

/* ===================== READ ZONE ===================== */
function renderBooks(){
  const grid=document.getElementById('booksGrid');grid.innerHTML='';
  const visited=getVisited('readzone');
  booksData.forEach((b,i)=>{
    const locked=isGuest&&i!==guestAllowedIndex;
    const vis=visited.includes(b.id);
    const card=document.createElement('div');
    card.className='book-card'+(locked?' locked':'')+(vis?' visited':'');
    card.innerHTML=`<div class="book-card-icon">${b.emoji}</div><h4>${b.title}</h4><p>${locked?'🔒 Sign up to unlock':b.desc}</p>`;
    card.onclick=()=>{if(locked){showGuestModal();return;}openBook(b);};
    grid.appendChild(card);
  });
  const p=getProgress('readzone',booksData.length);
  const fill=document.getElementById('booksProgFill');
  const pct=document.getElementById('booksProgPct');
  if(fill)fill.style.width=p.pct+'%';if(pct)pct.textContent=p.pct+'%';
}
function openBook(b){
  markVisited('readzone',b.id);updateAllProgress();
  document.getElementById('bookReaderTitle').textContent=`📖 ${b.title}`;
  const iframe=document.getElementById('bookIframe');
  if(b.pdfUrl)iframe.src=b.pdfUrl;
  else iframe.srcdoc=`<html><body style="background:#1a1a4e;color:#fff;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;">
    <div><div style="font-size:4rem">📄</div>
    <h2 style="color:#ffd166;margin:16px 0">${b.title}</h2>
    <p style="color:rgba(255,255,255,0.6)">Add the PDF URL in <code>booksData[].pdfUrl</code> in script.js</p>
    </div></body></html>`;
  showScreen('bookReader');
}

/* ===================== GUEST MODAL ===================== */
function showGuestModal(){document.getElementById('guestModal').classList.remove('hidden');}
function closeModal(){document.getElementById('guestModal').classList.add('hidden');}

/* ===================== TOAST ===================== */
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.remove('hidden');t.classList.add('show');
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.classList.add('hidden'),400);},2500);
}

/* ===================== INIT ===================== */
showScreen('authScreen');
