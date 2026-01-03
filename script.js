/* =======================
   GAME DATA
======================= */
const CATEGORIES = {
    Food: ["Pizza", "Burger", "Sushi", "Pasta", "Steak", "Salad", "Ramen", "Ice Cream", "Taco", "Sandwich", "Fried Chicken", "Dumpling", "Hotdog", "Curry", "Donut"],
    Places: ["Beach", "Airport", "Mall", "School", "Hospital", "Park", "Hotel", "Cinema", "Restaurant", "Library", "Museum", "Cafe", "Gym", "Office", "Station"],
    Animals: ["Dog", "Cat", "Horse", "Cow", "Lion", "Tiger", "Elephant", "Monkey", "Bird", "Fish", "Snake", "Rabbit", "Bear", "Wolf", "Deer"],
    Movies: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Fantasy", "Thriller", "Mystery", "Adventure", "Animation", "Musical", "War", "Crime", "Western"],
    Jobs: ["Doctor", "Teacher", "Engineer", "Chef", "Pilot", "Farmer", "Nurse", "Driver", "Artist", "Actor", "Programmer", "Designer", "Electrician", "Mechanic", "Police"],
    Sports: ["Football", "Basketball", "Tennis", "Baseball", "Volleyball", "Cricket", "Rugby", "Boxing", "Swimming", "Cycling", "Running", "Badminton", "Golf", "Hockey", "Skating"],
    Objects: ["Phone", "Laptop", "Chair", "Table", "Bottle", "Bag", "Watch", "Shoes", "Headphones", "Camera", "Book", "Pen", "Wallet", "Keys", "Glasses"],
    Emotions: ["Happy", "Sad", "Angry", "Excited", "Nervous", "Scared", "Relaxed", "Proud", "Jealous", "Confident", "Lonely", "Hopeful", "Calm", "Tired", "Surprised"],
    Activities: ["Dancing", "Singing", "Cooking", "Reading", "Swimming", "Running", "Gaming", "Shopping", "Traveling", "Drawing", "Writing", "Cleaning", "Hiking", "Fishing", "Yoga"],
    Technology: ["AI", "Robotics", "VR", "AR", "Blockchain", "Internet", "Smartphone", "Computer", "Drone", "3D Printing", "Cloud", "Cybersecurity", "Software", "Hardware", "Automation"]
};

const PLAYER_COLORS = [
    "linear-gradient(135deg, #ff6b6b, #c44569)",
    "linear-gradient(135deg, #feca57, #ff9f43)",
    "linear-gradient(135deg, #1dd1a1, #10ac84)",
    "linear-gradient(135deg, #54a0ff, #2e86de)",
    "linear-gradient(135deg, #5f27cd, #341f97)",
    "linear-gradient(135deg, #00d2d3, #01a3a4)",
    "linear-gradient(135deg, #ff9ff3, #f368e0)",
    "linear-gradient(135deg, #48dbfb, #0abde3)"
];

/* =======================
   STATE
======================= */
let playerCount = 4;
let roles = [];
let currentPlayer = 0;

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
    const words = CATEGORIES[category];
    const sameWord = words[Math.floor(Math.random() * words.length)];
    let differentWord;
    do {
        differentWord = words[Math.floor(Math.random() * words.length)];
    } while (differentWord === sameWord);

    roles = Array(playerCount).fill(sameWord);
    roles[Math.floor(Math.random() * playerCount)] = differentWord;

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

dragLayer.addEventListener("touchstart", e => { startY = e.touches[0].clientY; });
dragLayer.addEventListener("touchmove", e => {
    const diff = e.touches[0].clientY - startY;
    if (diff < -window.innerHeight / 3) {
        dragLayer.style.transform = `translateY(${diff}px)`;
        wordText.textContent = roles[currentPlayer];
    }
});
dragLayer.addEventListener("touchend", () => {
    dragLayer.style.transform = "translateY(0)";
    wordText.textContent = "";
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
    applyPlayerColor(currentPlayer);
    document.getElementById("playerTitle").textContent = `Player ${currentPlayer+1}`;
};

/* =======================
   RANDOM STARTER
======================= */
function pickStarter() {
    const starter = Math.floor(Math.random() * playerCount) + 1;
    document.getElementById("starterName").textContent = `Player ${starter}`;
    show("screenStarter");
}