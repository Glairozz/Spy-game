/* =======================
   GAME DATA
======================= */
const CATEGORIES = {
    Food: ["Pizza", "Burger", "Sushi", "Pasta", "Steak", "Salad", "Ramen", "Ice Cream", "Taco", "Sandwich", "Fried Chicken", "Dumpling", "Hotdog", "Curry", "Donut", "Pancakes", "Waffles", "Popcorn", "Chocolate", "Cheese", "Bacon", "Eggs", "Toast", "Soup", "Pasta", "Noodles", "Cake", "Cookies", "Pie", "Bread", "Rice", "Chips", "Pretzels", "Cereal", "Yogurt", "Fruit", "Vegetables"],
    Places: ["Beach", "Airport", "Mall", "School", "Hospital", "Park", "Hotel", "Cinema", "Restaurant", "Library", "Museum", "Cafe", "Gym", "Office", "Station", "Stadium", "Theater", "Church", "Temple", "Zoo", "Aquarium", "Amusement Park", "Forest", "Mountain", "Desert", "Island", "City", "Town", "Village", "Farm", "Factory", "Warehouse", "Bank", "Post Office", "Pharmacy", "Gas Station"],
    Animals: ["Dog", "Cat", "Horse", "Cow", "Lion", "Tiger", "Elephant", "Monkey", "Bird", "Fish", "Snake", "Rabbit", "Bear", "Wolf", "Deer", "Fox", "Eagle", "Owl", "Dolphin", "Whale", "Shark", "Penguin", "Koala", "Kangaroo", "Giraffe", "Zebra", "Crocodile", "Turtle", "Frog", "Butterfly", "Bee", "Ant", "Spider", "Scorpion", "Lizard", "Hamster"],
    Movies: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Fantasy", "Thriller", "Mystery", "Adventure", "Animation", "Musical", "War", "Crime", "Western", "Documentary", "Biography", "Family", "Historical", "Psychological", "Superhero", "Martial Arts", "Romantic Comedy", "Disaster", "Sports", "Political", "Legal", "Medical", "Police", "Spy", "Noir", "Silent", "Talkie", "Independent", "Foreign"],
    Jobs: ["Doctor", "Teacher", "Engineer", "Chef", "Pilot", "Farmer", "Nurse", "Driver", "Artist", "Actor", "Programmer", "Designer", "Electrician", "Mechanic", "Police", "Firefighter", "Scientist", "Architect", "Lawyer", "Journalist", "Photographer", "Musician", "Writer", "Accountant", "Manager", "Salesperson", "Receptionist", "Consultant", "Therapist", "Pharmacist", "Veterinarian", "Plumber", "Carpenter", "Barber", "Hairdresser", "Makeup Artist"],
    Sports: ["Football", "Basketball", "Tennis", "Baseball", "Volleyball", "Cricket", "Rugby", "Boxing", "Swimming", "Cycling", "Running", "Badminton", "Golf", "Hockey", "Skating", "Skiing", "Snowboarding", "Surfing", "Diving", "Gymnastics", "Wrestling", "Martial Arts", "Archery", "Fencing", "Rowing", "Sailing", "Climbing", "Bowling", "Billiards", "Darts", "Chess", "Checkers", "Table Tennis", "Squash", "Handball", "Lacrosse"],
    Objects: ["Phone", "Laptop", "Chair", "Table", "Bottle", "Bag", "Watch", "Shoes", "Headphones", "Camera", "Book", "Pen", "Wallet", "Keys", "Glasses", "Umbrella", "Backpack", "Pillow", "Blanket", "Mirror", "Clock", "Lamp", "Remote", "Keyboard", "Mouse", "Monitor", "Speaker", "Microphone", "Television", "Refrigerator", "Microwave", "Toaster", "Blender", "Vacuum", "Scissors", "Ruler", "Calculator"],
    Emotions: ["Happy", "Sad", "Angry", "Excited", "Nervous", "Scared", "Relaxed", "Proud", "Jealous", "Confident", "Lonely", "Hopeful", "Calm", "Tired", "Surprised", "Confused", "Frustrated", "Grateful", "Disappointed", "Embarrassed", "Guilty", "Ashamed", "Amused", "Bored", "Curious", "Envious", "Suspicious", "Worried", "Relieved", "Satisfied", "Content", "Ecstatic", "Miserable", "Anxious", "Peaceful", "Energetic"],
    Activities: ["Dancing", "Singing", "Cooking", "Reading", "Swimming", "Running", "Gaming", "Shopping", "Traveling", "Drawing", "Writing", "Cleaning", "Hiking", "Fishing", "Yoga", "Meditating", "Photography", "Gardening", "Knitting", "Painting", "Sculpting", "Acting", "Directing", "Producing", "Editing", "Researching", "Analyzing", "Calculating", "Measuring", "Building", "Constructing", "Designing", "Planning", "Organizing", "Decorating", "Celebrating"],
    Technology: ["AI", "Robotics", "VR", "AR", "Blockchain", "Internet", "Smartphone", "Computer", "Drone", "3D Printing", "Cloud", "Cybersecurity", "Software", "Hardware", "Automation", "Machine Learning", "Deep Learning", "Neural Networks", "IoT", "5G", "Quantum Computing", "Augmented Reality", "Virtual Reality", "Mixed Reality", "Big Data", "Analytics", "DevOps", "Agile", "Scrum", "Kanban", "Git", "GitHub", "Docker", "Kubernetes", "Microservices", "Serverless"],
    Nature: ["Tree", "Flower", "Grass", "River", "Mountain", "Ocean", "Lake", "Forest", "Desert", "Rain", "Snow", "Wind", "Sun", "Moon", "Stars", "Cloud", "Rainbow", "Lightning", "Thunder", "Fog", "Mist", "Hail", "Tornado", "Hurricane", "Earthquake", "Volcano", "Avalanche", "Flood", "Drought", "Erosion", "Sediment", "Mineral", "Rock", "Crystal", "Gemstone", "Fossil"],
    Colors: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Silver", "Gold", "Cyan", "Magenta", "Indigo", "Violet", "Turquoise", "Lime", "Navy", "Maroon", "Teal", "Olive", "Coral", "Beige", "Ivory", "Cream", "Charcoal", "Slate", "Copper", "Bronze", "Platinum", "Pearl", "Ruby", "Emerald"],
    Music: ["Rock", "Pop", "Jazz", "Classical", "Hip Hop", "Country", "Electronic", "Reggae", "Blues", "Metal", "Punk", "Folk", "R&B", "Soul", "Funk", "Disco", "Techno", "House", "Trance", "Dubstep", "Ambient", "Instrumental", "Vocal", "Acoustic", "Electric", "Synthesizer", "Guitar", "Piano", "Drums", "Bass", "Violin", "Flute", "Saxophone", "Trumpet", "Clarinet"],
    Vehicles: ["Car", "Bicycle", "Motorcycle", "Bus", "Train", "Airplane", "Helicopter", "Boat", "Ship", "Submarine", "Rocket", "Truck", "Van", "SUV", "Sedan", "Convertible", "Coupe", "Hatchback", "Limousine", "Taxi", "Ambulance", "Police Car", "Fire Truck", "Garbage Truck", "Scooter", "Skateboard", "Roller Skates", "Jet Ski", "Snowmobile", "ATV", "Golf Cart", "Forklift", "Crane", "Bulldozer", "Excavator", "Tractor"]
};

const PLAYER_COLORS = [
    "linear-gradient(135deg, #ff6b6b, #c44569)",
    "linear-gradient(135deg, #feca57, #ff9f43)",
    "linear-gradient(135deg, #1dd1a1, #10ac84)",
    "linear-gradient(135deg, #54a0ff, #2e86de)",
    "linear-gradient(135deg, #5f27cd, #341f97)",
    "linear-gradient(135deg, #00d2d3, #01a3a4)",
    "linear-gradient(135deg, #ff9ff3, #f368e0)",
    "linear-gradient(135deg, #48dbfb, #0abde3)",
    "linear-gradient(135deg, #ff6348, #c44569)",
    "linear-gradient(135deg, #ffa502, #ff6348)",
    "linear-gradient(135deg, #ff4757, #c44569)",
    "linear-gradient(135deg, #2ed573, #1e90ff)",
    "linear-gradient(135deg, #a55eea, #8854d0)",
    "linear-gradient(135deg, #20bf6b, #0fb9b1)"
];

/* =======================
   STATE
======================= */
let playerCount = 4;
let roles = [];
let currentPlayer = 0;
let scores = {};
let spyIndex = -1;

/* =======================
   NAVIGATION
======================= */
function show(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* =======================
   PLAYER COUNT SELECTION
======================= */
document.querySelectorAll("[data-count]").forEach(btn => {
    btn.onclick = () => {
        playerCount = +btn.dataset.count;
        loadCategories();
        show("screenCategory");
    }
});

/* =======================
   CATEGORY SCREEN
======================= */
function loadCategories() {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = "";
    
    Object.keys(CATEGORIES).forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => startGame(cat);
        grid.appendChild(btn);
    });
}

/* =======================
   START GAME
======================= */
function startGame(category) {
    if (!CATEGORIES[category]) return;
    
    const words = CATEGORIES[category];
    const sameWord = words[Math.floor(Math.random() * words.length)];
    let differentWord;
    do {
        differentWord = words[Math.floor(Math.random() * words.length)];
    } while (differentWord === sameWord);

    roles = Array(playerCount).fill(sameWord);
    spyIndex = Math.floor(Math.random() * playerCount);
    roles[spyIndex] = differentWord;

    for (let i = 1; i <= playerCount; i++) {
        if (!scores[`Player ${i}`]) {
            scores[`Player ${i}`] = 0;
        }
    }

    currentPlayer = 0;
    document.getElementById("playerTitle").textContent = `Player 1`;
    applyPlayerColor(currentPlayer);
    show("screenReveal");
}

/* =======================
   APPLY PLAYER COLOR
======================= */
function applyPlayerColor(index) {
    const screenReveal = document.getElementById("screenReveal");
    screenReveal.style.background = PLAYER_COLORS[index % PLAYER_COLORS.length];
}

/* =======================
   DRAG REVEAL
======================= */
const dragLayer = document.getElementById("dragLayer");
const wordText = document.getElementById("wordText");
let startY = 0;
let isRevealed = false;

dragLayer.addEventListener("touchstart", e => { 
    startY = e.touches[0].clientY; 
    wordText.textContent = roles[currentPlayer];
});

dragLayer.addEventListener("mousedown", e => { 
    startY = e.clientY;
    wordText.textContent = roles[currentPlayer];
});

dragLayer.addEventListener("touchmove", e => {
    const diff = e.touches[0].clientY - startY;
    const revealAmount = Math.min(Math.abs(diff) / 2, 100);
    if (diff < -30) {
        dragLayer.style.transform = `translateY(${diff}px)`;
        wordText.style.opacity = (revealAmount / 100).toString();
        isRevealed = true;
    }
});

dragLayer.addEventListener("mousemove", e => {
    if (e.buttons === 1) {
        const diff = e.clientY - startY;
        const revealAmount = Math.min(Math.abs(diff) / 2, 100);
        if (diff < -30) {
            dragLayer.style.transform = `translateY(${diff}px)`;
            wordText.style.opacity = (revealAmount / 100).toString();
            isRevealed = true;
        }
    }
});

dragLayer.addEventListener("touchend", () => {
    dragLayer.style.transform = "translateY(-100%)";
    wordText.style.opacity = "1";
    isRevealed = true;
});

dragLayer.addEventListener("mouseup", () => {
    dragLayer.style.transform = "translateY(-100%)";
    wordText.style.opacity = "1";
    isRevealed = true;
});

dragLayer.addEventListener("click", () => {
    if (!isRevealed) {
        wordText.textContent = roles[currentPlayer];
        dragLayer.style.transform = "translateY(-100%)";
        wordText.style.opacity = "1";
        isRevealed = true;
    } else {
        dragLayer.style.transform = "translateY(0)";
        wordText.style.opacity = "0";
        setTimeout(() => { wordText.textContent = ""; }, 300);
        isRevealed = false;
    }
});

/* =======================
   NEXT PLAYER
======================= */
document.getElementById("nextPlayerBtn").onclick = () => {
    currentPlayer++;
    
    if (currentPlayer >= playerCount) {
        pickStarter();
        return;
    }
    
    isRevealed = false;
    wordText.textContent = "";
    dragLayer.style.transform = "translateY(0)";
    wordText.style.opacity = "0";
    
    applyPlayerColor(currentPlayer);
    document.getElementById("playerTitle").textContent = `Player ${currentPlayer+1}`;
};

/* =======================
   SUMMARY SCREEN
======================= */
function showSummary() {
    const spyPlayerNumber = spyIndex + 1;
    const spyWord = roles[spyIndex];
    
    document.getElementById("spyPlayer").textContent = `Player ${spyPlayerNumber}`;
    document.getElementById("spyWord").textContent = spyWord;
    document.getElementById("finalTime").textContent = "0:00";
    document.getElementById("pointsEarned").textContent = "0";
    
    show("screenSummary");
}

document.getElementById("nextRoundBtn")?.addEventListener("click", () => {
    roles = [];
    currentPlayer = 0;
    spyIndex = -1;
    show("screenCategory");
});

document.getElementById("endGameBtn")?.addEventListener("click", endGame);

function endGame() {
    pickStarter();
}

/* =======================
   RANDOM STARTER
======================= */
function pickStarter() {
    const starter = Math.floor(Math.random() * playerCount) + 1;
    document.getElementById("starterName").textContent = `Player ${starter}`;
    show("screenStarter");
    
    document.getElementById("playAgainBtn").onclick = () => {
        playerCount = 4;
        roles = [];
        currentPlayer = 0;
        scores = {};
        spyIndex = -1;
        location.reload();
    };
}
