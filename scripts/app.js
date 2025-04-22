//UPDATE STANDINGS ONLY HERE< THEN COMMIT AND PUSH TO AUTO DEPLOY

window.season3Standings = [
  { team: "HarryKirch", wins: 0, losses: 0, diff: 0 },
  { team: "BenR", wins: 0, losses: 0, diff: 0 },
  { team: "Carby", wins: 0, losses: 0, diff: 0 },
  { team: "Julian", wins: 0, losses: 0, diff: 0 },
  { team: "Tom", wins: 0, losses: 0, diff: 0 },
  { team: "Kircher", wins: 0, losses: 0, diff: 0 },
  { team: "Jmo", wins: 0, losses: 0, diff: 0 },
  { team: "BenT", wins: 0, losses: 0, diff: 0 }
];

//ADD MATCHES HERE
//images: 

async function loadMatchesFromAPI() {
  const loadingDiv = document.getElementById('loading-matches');
  const matchList = document.getElementById('matchList');

  if (loadingDiv) loadingDiv.style.display = 'block';
  if (matchList) matchList.innerHTML = ''; // clear out cards while loading

  const res = await fetch("https://script.google.com/macros/s/AKfycbybAu3zUjcSV9_KU2_jxkoKS316lBA4S8dK2pZftbwxstWyHVk8VuGlwZaxQaH_g2FL/exec?t=" + Date.now());
  const data = await res.json();
  window.matches = data;

  if (loadingDiv) loadingDiv.style.display = 'none';
}





const captains = [ "Mario", "Luigi", "Peach", "Daisy", "Donkey Kong", "Bowser", "Bowser Jr", "Wario", "Waluigi", "Diddy Kong", "Yoshi", "Birdo" ];
window.captains = captains;

const miiMeta = {
    "Black Widow": { gender: "F", color: "black" },
    "Borat": { gender: "M", color: "yellow" },
    "Captain Jack": { gender: "M", color: "white" },
    "Chicken": { gender: "F", color: "red" },
    "Dwayne Wade": { gender: "M", color: "pink" },
    "Ice Cube": { gender: "M", color: "brown" },
    "Mr. Incredible": { gender: "M", color: "red" },
    "John": { gender: "M", color: "lightgreen" },
    "Kevin G": { gender: "M", color: "orange" },
    "Lara Croft": { gender: "F", color: "green" },
    "Lilo": { gender: "F", color: "blue" },
    "MJ HeeHee": { gender: "M", color: "lightblue" },
    "Matt": { gender: "M", color: "orange" },
    "Mikasa": { gender: "F", color: "yellow" },
    "Minion": { gender: "M", color: "blue" },
    "Miss Hot": { gender: "F", color: "pink" },
    "SemenLad": { gender: "M", color: "white" },
    "Snape": { gender: "M", color: "black" },
    "Trinity": { gender: "F", color: "purple" },
    "Unc": { gender: "M", color: "green" },
    "Lil Wayne": { gender: "M", color: "brown" },
    "Kim Jong Un": { gender: "M", color: "black" },
    "Frozone": { gender: "M", color: "lightblue" },
    "The Penguin": { gender: "M", color: "purple" },
    "Handsome Squidward": { gender: "F", color: "orange" },
    "Harry Potter": { gender: "F", color: "lightgreen" },
    "Rizzler": { gender: "F", color: "blue" },
    "Tsitsipas": { gender: "F", color: "lightblue" },
    "Dora": { gender: "F", color: "purple" },
    "KSI": { gender: "F", color: "brown" },
    "Big AJ": { gender: "F", color: "white" },
    "Carby": { gender: "M", color: "red" },
    "Lebron James": { gender: "F", color: "yellow" },
    "Lizzy": { gender: "F", color: "lightgreen" },
    "Saddam Hussein": { gender: "F", color: "green" },
    "Livvy Dunne": { gender: "F", color: "pink" }
  };

window.miiMeta = miiMeta;

  

// Sample MVP Data
const mvps = [
    {
        name: "King K Rool",
        team: "BenT & Luigi's Long Schlongs",
        mvps: 6,
        image: "assets/images/krool.png",
        stats: "BA: .584 | HR: 20 | RBI: 45"
    },
    {
        name: "Donkey Kong",
        team: "DK's Swamp Monkeys & Diddy's Blue Ball Boys",
        mvps: 5,
        image: "assets/images/dk.png",
        stats: "BA: .678 | HR: 18 | RBI: 54"
    },
    {
        name: "Bowser",
        team: "UNC & BenT",
        mvps: 5,
        image: "assets/images/bowser1.png",
        stats: "BA: .580 | HR: 23 | RBI: 47"
    },
    {
        name: "Red Kritter",
        team: "Bowser Jr. OnlyShells & Caillou's House",
        mvps: 5,
        image: "assets/images/rkrit.png",
        stats: "BA: .455 | HR: 10 | RBI: 22"
    },
    {
        name: "Brown Kritter",
        team: "DK's Swamp Monekys & Caillou's House & BenT",
        mvps: 5,
        image: "assets/images/bkrit.png",
        stats: "BA: .491 | HR: 11 | RBI: 29"
    },
    {
        name: "Hammer Bro",
        team: "Tom-Splosion & Petey's Thirst Trap & Julian",
        mvps: 4,
        image: "assets/images/hbro.png",
        stats: "BA: .5145 | HR: 18 | RBI: 34"
    },
    {
        name: "Unc",
        team: "UNC & Luigi's Long Schlongs",
        mvps: 4,
        image: "assets/images/unc.png",
        stats: "BA: .557 | HR: 3 | RBI: 19"
    },
    {
        name: "Fire Bro",
        team: "Bowser Jr. OnlyShells & Caillou's House & BenT",
        mvps: 3,
        image: "assets/images/fbro.png",
        stats: "BA: .571 | HR: 22 | RBI: 44"
    },
    {
        name: "Boomerang Bro",
        team: "Bowser Jr. OnlyShells & Sucked and Severed",
        mvps: 3,
        image: "assets/images/bbro.png",
        stats: "BA: .533 | HR: 10 | RBI: 27"
    },
    {
        name: "Dry Bones",
        team: "UNC & Luigi's Long Schlongs",
        mvps: 3,
        image: "assets/images/dry.png",
        stats: "BA: .637 | HR: 5 | RBI: 16"
    }
];



// Duplicate for seamless scrolling
// Replace the current carousel creation code with this:
// Replace the current carousel code with this:

const track = document.querySelector('.carousel-track');

if (track) {
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    mvps.forEach((mvp) => {
      const slide = document.createElement('div');
      slide.className = 'mvp-card';
      slide.innerHTML = `
        <img src="${mvp.image}" alt="${mvp.name}" loading="lazy">
        <div class="mvp-info">
          <h3>${mvp.name}</h3>
          <p>${mvp.team}</p>
          <p>${mvp.stats}</p>
          <p class="mvp-count">${mvp.mvps} MVP Awards</p>
        </div>
      `;
      track.appendChild(slide);
    });
  } else {
    const carouselData = [...mvps, ...mvps];
    carouselData.forEach((mvp) => {
      const slide = document.createElement('div');
      slide.className = 'mvp-card';
      slide.innerHTML = `
        <img src="${mvp.image}" alt="${mvp.name}">
        <div class="mvp-info">
          <h3>${mvp.name}</h3>
          <p>${mvp.team}</p>
          <p>${mvp.stats}</p>
          <p class="mvp-count">${mvp.mvps} MVP Awards</p>
        </div>
      `;
      track.appendChild(slide);
    });
  }
}



// Sample Standings Data
const standings = {
    "Season1": [
        { team: "DK's Swamp Monkeys", wins: 7, losses: 3, diff: 29 },
        { team: "Ben T", wins: 7, losses: 3, diff: 23 },
        { team: "UNC", wins: 6, losses: 4, diff: 8 },
        { team: "Wario is a Pedophile", wins: 5, losses: 5, diff: 3 },
        { team: "Birdo Backshots", wins: 5, losses: 5, diff: -13 },
        { team: "SemenLad Cum-Splosion", wins: 4, losses: 6, diff: -13 },
        { team: "BowserJr. OnlyShells Account", wins: 4, losses: 6, diff: -14 },
        { team: "Petey's Thirst Trap", wins: 2, losses: 8, diff: -23 }
    ],
    "Season2": [
        { team: "BenT", wins: 7, losses: 3, diff: 32 },
        { team: "Sucked & Severed", wins: 7, losses: 3, diff: 27 },
        { team: "Diddy's Blue Ball Boys", wins: 5, losses: 5, diff: 6 },
        { team: "Caillou's House", wins: 5, losses: 5, diff: -1 },
        { team: "Luigi's Long Schlongs", wins: 5, losses: 5, diff: -3 },
        { team: "Baby Daisy Bent Over", wins: 4, losses: 6, diff: -12 },
        { team: "Mario PocketPussy", wins: 4, losses: 6, diff: -14 },
        { team: "Mii's and Nightmares", wins: 3, losses: 7, diff: -35 }
    ]
};


// Sample Playoff Data
const playoffs = {
    "Season1": {
        rounds: [
            {
                name: "Round 1",
                matches: [
                    { team1: "UNC", score1: 2, team2: "SemenLad Cum-Splosion", score2: 1 },
                    { team1: "Wario is a Pedophile", score1: 1, team2: "Birdo Backshots", score2: 2 }
                ]
            },
            {
                name: "Semifinals",
                matches: [
                    { team1: "DK's Swamp Monkeys", score1: 2, team2: "Birdo Backshots", score2: 0 },
                    { team1: "Ben T", score1: 1, team2: "UNC", score2: 2 }
                ]
            },
            {
                name: "Finals",
                matches: [
                    { team1: "DK's Swamp Monkeys", score1: 3, team2: "UNC", score2: 2 }
                ]
            }
        ]
    },
    "Season2": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "Diddy's Blue Ball Boys", score1: 2, team2: "Baby Daisy Bent Over", score2: 1 },
                { team1: "Caillou's House", score1: 2, team2: "Luigi's Long Schlongs", score2: 0 }
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "BenT", score1: 2, team2: "Caillou's House", score2: 0 },
                { team1: "Sucked & Severed", score1: 2, team2: "Diddy's Blue Ball Boys", score2: 1 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "BenT", score1: 3, team2: "Sucked & Severed", score2: 0 }
            ]
        }
    ]
    }
};


// Season Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');

        const season = tab.dataset.season;
        document.querySelector('.season-content.active').classList.remove('active');
        document.getElementById(season).classList.add('active');

        updateStandings(season);
        updatePlayoffs(season);
    });
});

function updateStandings(season) {
    const tbody = document.querySelector(`#${season} .standings-table tbody`);
    tbody.innerHTML = '';

    // Sort standings by win percentage (optional but smart)
    const seasonData = [...standings[season]].sort((a, b) => {
        const pctA = a.wins / (a.wins + a.losses);
        const pctB = b.wins / (b.wins + b.losses);
        return pctB - pctA;
    });

    seasonData.forEach((team, index) => {
        const row = document.createElement('tr');

        // 🏆 Assign glow tier classes
        if (index < 2) {
            row.classList.add('gold-glow');
        } else if (index < 6) {
            row.classList.add('green-glow');
        } else {
            row.classList.add('red-glow');
        }

        row.innerHTML = `
            <td>${team.team}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${(team.wins / (team.wins + team.losses)).toFixed(3)}</td>
            <td>${team.diff}</td>
        `;
        tbody.appendChild(row);
    });
}


function updatePlayoffs(season) {
    const bracket = document.querySelector(`#${season} .bracket`);
    bracket.innerHTML = '';

    const roundNames = ["R1-Left", "Semis-Left", "Final", "Semis-Right", "R1-Right"];

    // Split matches manually into layout
    const customLayout = {
        "R1-Left": playoffs[season].rounds[0]?.matches.slice(0, 1),
        "Semis-Left": playoffs[season].rounds[1]?.matches.slice(1), // UNC vs Ben T
        "Final": playoffs[season].rounds[2]?.matches,
        "Semis-Right": playoffs[season].rounds[1]?.matches.slice(0, 1), // Swamp Monkeys vs Birdo
        "R1-Right": playoffs[season].rounds[0]?.matches.slice(1)
    };

    const roundClass = {
        "R1-Left": 'round left',
        "Semis-Left": 'round semis-left',
        "Final": 'round center',
        "Semis-Right": 'round semis-right',
        "R1-Right": 'round right'
    };
    
    roundNames.forEach((key) => {
        const roundEl = document.createElement('div');
    
        // ✅ Properly assign class here
        roundEl.className = roundClass[key];
    
        const roundTitle = document.createElement('h4');
        roundTitle.textContent = key.replace(/-/g, ' ');
        roundEl.appendChild(roundTitle);
    
        const matches = customLayout[key] || [];
        matches.forEach(match => {
            const matchEl = document.createElement('div');
            matchEl.className = 'match';
            matchEl.innerHTML = `
                <div class="team" data-full="${match.team1}">${match.team1} <span class="score">${match.score1}</span></div>
                <div class="team" data-full="${match.team2}">${match.team2} <span class="score">${match.score2}</span></div>
            `;
            roundEl.appendChild(matchEl);
        });
    
        bracket.appendChild(roundEl);
    });
    
}


// Initialize default season
if (document.querySelector('.standings-table')) {
    updateStandings('Season1');
    updateStandings('Season2');

    // ✅ Set default visible tab and season
    document.querySelector('.tab[data-season="Season1"]').classList.add("active");
    document.getElementById("Season1").classList.add("active");
    updatePlayoffs("Season1");

    document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".season-content").forEach(c => c.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(this.dataset.season).classList.add("active");

            // 👇 Add playoff rendering on tab click
            updatePlayoffs(this.dataset.season);
        });
    });
}

  

// Scroll to carousel
const scrollDownBtn = document.querySelector('.scroll-down');

if (scrollDownBtn) {
  scrollDownBtn.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}


const characters = [
  { name: "Baby Daisy", image: "assets/images/baby daisy.png", class: "Power", avg: 0.452, gp: 12, hr: 0 },
  { name: "Baby DK", image: "assets/images/baby dk.png", class: "Speed", avg: 0.467, gp: 20, hr: 3 },
  { name: "Baby Luigi", image: "assets/images/baby luigi.png", class: "Speed", avg: 0.333, gp: 10, hr: 0 },
  { name: "Baby Mario", image: "assets/images/baby mario.png", class: "Speed", avg: 0.200, gp: 4, hr: 0 },
  { name: "Baby Peach", image: "assets/images/baby peach.png", class: "Balanced", avg: 0.295, gp: 18, hr: 0 },
  { name: "Birdo", image: "assets/images/birdo.png", class: "Power", avg: 0.541, gp: 20, hr: 4 },
  { name: "Blooper", image: "assets/images/blooper.png", class: "Balanced", avg: 0.431, gp: 18, hr: 0 },
  { name: "Boo", image: "assets/images/boo.png", class: "Speed", avg: 0.619, gp: 19, hr: 0 },
  { name: "Boomerang Bro", image: "assets/images/boomerang bro.png", class: "Power", avg: 0.528, gp: 20, hr: 10 },
  { name: "Bowser", image: "assets/images/bowser.png", class: "Power", avg: 0.568, gp: 20, hr: 23 },
  { name: "Bowser Jr", image: "assets/images/bowser jr.png", class: "Technique", avg: 0.465, gp: 20, hr: 3 },
  { name: "Daisy", image: "assets/images/daisy.png", class: "Power", avg: 0.478, gp: 18, hr: 2 },
  { name: "Dark Bones", image: "assets/images/dark bones.png", class: "Balanced", avg: 0.658, gp: 20, hr: 7 },
  { name: "Diddy Kong", image: "assets/images/diddy kong.png", class: "Technique", avg: 0.500, gp: 20, hr: 1 },
  { name: "Dixie Kong", image: "assets/images/dixie kong.png", class: "Balanced", avg: 0.583, gp: 10, hr: 1 },
  { name: "Donkey Kong", image: "assets/images/donkey kong.png", class: "Power", avg: 0.667, gp: 20, hr: 18 },
  { name: "Dry Bones", image: "assets/images/dry bones.png", class: "Balanced", avg: 0.625, gp: 20, hr: 5 },
  { name: "Blue Dry Bones", image: "assets/images/blue dry bones.png", class: "Balanced", avg: 0.587, gp: 20, hr: 4 },
  { name: "Green Dry Bones", image: "assets/images/green dry bones.png", class: "Balanced", avg: 0.549, gp: 20, hr: 6 },
  { name: "Fire Bro", image: "assets/images/fire bro.png", class: "Power", avg: 0.577, gp: 20, hr: 22 },
  { name: "Funky Kong", image: "assets/images/funky kong.png", class: "Power", avg: 0.473, gp: 20, hr: 12 },
  { name: "Goomba", image: "assets/images/goomba.png", class: "Speed", avg: 0.0, gp: 0, hr: 0 },
  { name: "Hammer Bro", image: "assets/images/hammer bro.png", class: "Power", avg: 0.529, gp: 20, hr: 18 },
  { name: "King Boo", image: "assets/images/king boo.png", class: "Power", avg: 0.507, gp: 20, hr: 14 },
  { name: "King K Rool", image: "assets/images/king k rool.png", class: "Power", avg: 0.573, gp: 20, hr: 20 },
  { name: "Red Koopa Paratroopa", image: "assets/images/red koopa paratroopa.png", class: "Balanced", avg: 0.394, gp: 10, hr: 0 },
  { name: "Koopa Paratroopa", image: "assets/images/koopa paratroopa.png", class: "Balanced", avg: 0.270, gp: 10, hr: 1 },
  { name: "Koopa Troopa", image: "assets/images/koopa troopa.png", class: "Speed", avg: 0.367, gp: 15, hr: 0 },
  { name: "Red Koopa Troopa", image: "assets/images/red koopa troopa.png", class: "Speed", avg: 0.368, gp: 6, hr: 1 },
  { name: "Kritter", image: "assets/images/kritter.png", class: "Power", avg: 0.578, gp: 20, hr: 13 },
  { name: "Blue Kritter", image: "assets/images/blue kritter.png", class: "Power", avg: 0.444, gp: 20, hr: 5 },
  { name: "Brown Kritter", image: "assets/images/brown kritter.png", class: "Power", avg: 0.479, gp: 20, hr: 11 },
  { name: "Red Kritter", image: "assets/images/red kritter.png", class: "Power", avg: 0.453, gp: 20, hr: 10 },
  { name: "Luigi", image: "assets/images/luigi.png", class: "Speed", avg: 0.493, gp: 20, hr: 0 },
  { name: "Magikoopa", image: "assets/images/magikoopa.png", class: "Balanced", avg: 0.500, gp: 20, hr: 1 },
  { name: "Green Magikoopa", image: "assets/images/green magikoopa.png", class: "Balanced", avg: 0.554, gp: 20, hr: 2 },
  { name: "Red Magikoopa", image: "assets/images/red magikoopa.png", class: "Balanced", avg: 0.439, gp: 19, hr: 1 },
  { name: "Yellow Magikoopa", image: "assets/images/yellow magikoopa.png", class: "Balanced", avg: 0.512, gp: 12, hr: 1 },
  { name: "Mario", image: "assets/images/mario.png", class: "Balanced", avg: 0.583, gp: 20, hr: 3 },
  { name: "Monty Mole", image: "assets/images/monty mole.png", class: "Speed", avg: 0.0, gp: 0, hr: 0 },
  { name: "Blue Noki", image: "assets/images/noki.png", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Green Noki", image: "assets/images/green noki.png", class: "Balanced", avg: 0.174, gp: 6, hr: 0 },
  { name: "Red Noki", image: "assets/images/red noki.png", class: "Balanced", avg: 0.400, gp: 10, hr: 0 },
  { name: "Paragoomba", image: "assets/images/paragoomba.png", class: "Balanced", avg: 0.413, gp: 13, hr: 0 },
  { name: "Peach", image: "assets/images/peach.png", class: "Balanced", avg: 0.343, gp: 20, hr: 0 },
  { name: "Petey Piranha", image: "assets/images/petey piranha.png", class: "Power", avg: 0.429, gp: 20, hr: 14 },
  { name: "Pianta", image: "assets/images/pianta.png", class: "Speed", avg: 0.620, gp: 20, hr: 2 },
  { name: "Red Pianta", image: "assets/images/red pianta.png", class: "Speed", avg: 0.602, gp: 20, hr: 1 },
  { name: "Yellow Pianta", image: "assets/images/yellow pianta.png", class: "Speed", avg: 0.557, gp: 20, hr: 1 },
  { name: "Shy Guy", image: "assets/images/shy guy.png", class: "Technique", avg: 0.389, gp: 14, hr: 0 },
  { name: "Black Shy Guy", image: "assets/images/black shy guy.png", class: "Technique", avg: 0.367, gp: 18, hr: 0 },
  { name: "Blue Shy Guy", image: "assets/images/blue shy guy.png", class: "Technique", avg: 0.167, gp: 4, hr: 0 },
  { name: "Green Shy Guy", image: "assets/images/green shy guy.png", class: "Technique", avg: 0.310, gp: 18, hr: 0 },
  { name: "Yellow Shy Guy", image: "assets/images/yellow shy guy.png", class: "Technique", avg: 0.238, gp: 6, hr: 0 },
  { name: "Tiny Kong", image: "assets/images/tiny kong.png", class: "Balanced", avg: 0.475, gp: 20, hr: 1 },
  { name: "Toad", image: "assets/images/toad.png", class: "Speed", avg: 0.721, gp: 12, hr: 2 },
  { name: "Blue Toad", image: "assets/images/blue toad.png", class: "Speed", avg: 0.612, gp: 14, hr: 1 },
  { name: "Green Toad", image: "assets/images/green toad.png", class: "Speed", avg: 0.671, gp: 20, hr: 2 },
  { name: "Purple Toad", image: "assets/images/purple toad.png", class: "Speed", avg: 0.833, gp: 2, hr: 0 },
  { name: "Yellow Toad", image: "assets/images/yellow toad.png", class: "Speed", avg: 0.583, gp: 18, hr: 2 },
  { name: "Toadette", image: "assets/images/toadette.png", class: "Balanced", avg: 0.323, gp: 18, hr: 0 },
  { name: "Toadsworth", image: "assets/images/toadsworth.png", class: "Balanced", avg: 0.217, gp: 13, hr: 0 },
  { name: "Waluigi", image: "assets/images/waluigi.png", class: "Technique", avg: 0.549, gp: 20, hr: 0 },
  { name: "Wario", image: "assets/images/wario.png", class: "Technique", avg: 0.638, gp: 20, hr: 4 },
  { name: "Wiggler", image: "assets/images/wiggler.png", class: "Speed", avg: 0.720, gp: 20, hr: 1 },
  { name: "Yoshi", image: "assets/images/yoshi.png", class: "Speed", avg: 0.350, gp: 20, hr: 2 },
  { name: "Blue Yoshi", image: "assets/images/blue yoshi.png", class: "Speed", avg: 0.333, gp: 1, hr: 0 },
  { name: "Light Blue Yoshi", image: "assets/images/light blue yoshi.png", class: "Speed", avg: 0.0, gp: 0, hr: 0 },
  { name: "Pink Yoshi", image: "assets/images/pink yoshi.png", class: "Speed", avg: 0.585, gp: 12, hr: 0 },
  { name: "Red Yoshi", image: "assets/images/red yoshi.png", class: "Speed", avg: 0.378, gp: 13, hr: 1 },
  { name: "Yellow Yoshi", image: "assets/images/yellow yoshi.png", class: "Speed", avg: 0.0, gp: 0, hr: 0 },
  { name: "Black Widow", image: "assets/images/black widow.png", class: "Balanced", avg: 0.467, gp: 9, hr: 2 },
  { name: "Borat", image: "assets/images/borat.jpg", class: "Balanced", avg: 0.443, gp: 20, hr: 0 },
  { name: "Captain Jack", image: "assets/images/capt.jack.jpg", class: "Balanced", avg: 0.407, gp: 8, hr: 1 },
  { name: "Chicken", image: "assets/images/chicken.jpg", class: "Balanced", avg: 0.411, gp: 16, hr: 0 },
  { name: "Dwayne Wade", image: "assets/images/dwyanewade.jpg", class: "Balanced", avg: 0.425, gp: 20, hr: 1 },
  { name: "Ice Cube", image: "assets/images/ice cube.jpg", class: "Balanced", avg: 0.367, gp: 8, hr: 0 },
  { name: "Mr. Incredible", image: "assets/images/incredible.jpg", class: "Balanced", avg: 0.355, gp: 20, hr: 0 },
  { name: "John", image: "assets/images/john.png", class: "Balanced", avg: 0.391, gp: 7, hr: 0 },
  { name: "Kevin G", image: "assets/images/KevinG.jpg", class: "Balanced", avg: 0.0, gp: 1, hr: 0 },
  { name: "Lara Croft", image: "assets/images/Lara Croft.png", class: "Balanced", avg: 0.281, gp: 10, hr: 0 },
  { name: "Lilo", image: "assets/images/Lilo.png", class: "Balanced", avg: 0.441, gp: 10, hr: 1 },
  { name: "MJ HeeHee", image: "assets/images/MJ heehee.jpg", class: "Balanced", avg: 0.415, gp: 17, hr: 1 },
  { name: "Matt", image: "assets/images/matt.jpg", class: "Balanced", avg: 0.517, gp: 8, hr: 0 },
  { name: "Mikasa", image: "assets/images/mikasa.png", class: "Balanced", avg: 0.410, gp: 10, hr: 0 },
  { name: "Minion", image: "assets/images/minion.jpg", class: "Balanced", avg: 0.406, gp: 18, hr: 0 },
  { name: "Miss Hot", image: "assets/images/misshot.jpg", class: "Balanced", avg: 0.522, gp: 20, hr: 2 },
  { name: "SemenLad", image: "assets/images/semen.jpg", class: "Balanced", avg: 0.360, gp: 13, hr: 0 },
  { name: "Snape", image: "assets/images/snape.jpg", class: "Balanced", avg: 0.312, gp: 13, hr: 0 },
  { name: "Trinity", image: "assets/images/trinity.png", class: "Balanced", avg: 0.424, gp: 10, hr: 1 },
  { name: "Unc", image: "assets/images/uncle.png", class: "Balanced", avg: 0.541, gp: 20, hr: 3 },
  { name: "Lil Wayne", image: "assets/images/lilwayne.jpg", class: "Balanced", avg: 0.513, gp: 10, hr: 0 },
  { name: "Kim Jong Un", image: "assets/images/kimjongun.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Frozone", image: "assets/images/frozone.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "The Penguin", image: "assets/images/penguin.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Handsome Squidward", image: "assets/images/squidd.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Harry Potter", image: "assets/images/harryp.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Rizzler", image: "assets/images/rizz.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Tsitsipas", image: "assets/images/tsi.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Dora", image: "assets/images/dora.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "KSI", image: "assets/images/ksi.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Big AJ", image: "assets/images/aj.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Carby", image: "assets/images/mpc.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Lebron James", image: "assets/images/lbj.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Lizzy", image: "assets/images/lizzy.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Saddam Hussein", image: "assets/images/sadd.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
  { name: "Livvy Dunne", image: "assets/images/liv.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0 },
];

window.characters = characters;

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {
    


      const pitchingStats = {
        "Baby Daisy": { ip: 2, era: 0.0, baa: 0.143 },
        "Baby Luigi": { ip: 1, era: 0.0, baa: 0.4 },
        "Baby Peach": { ip: 9, era: 13.0, baa: 0.591 },
        "Birdo": { ip: 49, era: 2.76, baa: 0.384 },
        "Black Shy Guy": { ip: 1, era: 0.0, baa: 0.6 },
        "Black Widow": { ip: 2, era: 9.0, baa: 0.6 },
        "Blooper": { ip: 3, era: 18.0, baa: 0.6 },
        "Blue Dry Bones": { ip: 8, era: 10.12, baa: 0.635 },
        "Blue Kritter": { ip: 1, era: 9.0, baa: 0.712 },
        "Blue Toad": { ip: 2, era: 4.5, baa: 0.667 },
        "Boo": { ip: 63, era: 6.14, baa: 0.506 },
        "Boomerang Bro": { ip: 2, era: 4.5, baa: 0.583 },
        "Bowser": { ip: 54, era: 4.83, baa: 0.466 },
        "Bowser Jr": { ip: 43, era: 8.58, baa: 0.508 },
        "Chicken": { ip: 2, era: 9.0, baa: 0.462 },
        "Daisy": { ip: 61, era: 6.49, baa: 0.464 },
        "Dark Bones": { ip: 1, era: 0.0, baa: 0.0 },
        "Diddy Kong": { ip: 47, era: 7.47, baa: 0.5 },
        "Dixie Kong": { ip: 3, era: 0.0, baa: 0.286 },
        "Donkey Kong": { ip: 64, era: 7.17, baa: 0.496 },
        "Dry Bones": { ip: 2, era: 4.5, baa: 0.545 },
        "Dwayne Wade": { ip: 8, era: 0.0, baa: 0.357 },
        "Fire Bro": { ip: 1, era: 27.0, baa: 0.652 },
        "Funky Kong": { ip: 4, era: 4.5, baa: 0.57 },
        "Green Magikoopa": { ip: 9, era: 15.0, baa: 0.452 },
        "Green Noki": { ip: 0, era: 0, baa: 0.5 },
        "Green Toad": { ip: 0, era: 0, baa: 0.75 },
        "Hammer Bro": { ip: 2, era: 18.0, baa: 0.639 },
        "King Boo": { ip: 18, era: 7.0, baa: 0.564 },
        "King K Rool": { ip: 5, era: 9.0, baa: 0.439 },
        "Koopa Paratroopa": { ip: 1, era: 0.0, baa: 0.5 },
        "Koopa Troopa": { ip: 1, era: 18.0, baa: 0.667 },
        "Kritter": { ip: 1, era: 9.0, baa: 0.5 },
        "Luigi": { ip: 89, era: 6.47, baa: 0.481 },
        "Magikoopa": { ip: 14, era: 12.86, baa: 0.488 },
        "Mario": { ip: 85, era: 5.93, baa: 0.451 },
        "Mikasa": { ip: 1, era: 18.0, baa: 0.727 },
        "Minion": { ip: 10, era: 11.7, baa: 0.528 },
        "Miss Hot": { ip: 1, era: 0.0, baa: 0.0 },
        "Mr. Incredible": { ip: 1, era: 9.0, baa: 0.6 },
        "Para KoopaTroopa": { ip: 2, era: 0.0, baa: 0.333 },
        "Paragoomba": { ip: 27, era: 6.0, baa: 0.511 },
        "Peach": { ip: 72, era: 5.63, baa: 0.483 },
        "Petey Piranha": { ip: 0, era: 0, baa: 0.667 },
        "Red Kritter": { ip: 5, era: 12.6, baa: 0.504 },
        "Red Magikoopa": { ip: 36, era: 8.0, baa: 0.534 },
        "Red Pianta": { ip: 1, era: 0.0, baa: 0.4 },
        "Toad": { ip: 4, era: 9.0, baa: 0.47 },
        "Toadsworth": { ip: 16, era: 11.81, baa: 0.548 },
        "Trinity": { ip: 38, era: 2.61, baa: 0.419 },
        "Unc": { ip: 2, era: 4.5, baa: 0.545 },
        "Waluigi": { ip: 35, era: 5.4, baa: 0.454 },
        "Wario": { ip: 34, era: 7.68, baa: 0.511 },
        "Wiggler": { ip: 3, era: 3.0, baa: 0.312 },
        "Yellow Magikoopa": { ip: 32, era: 7.59, baa: 0.399 },
        "Yellow Pianta": { ip: 7, era: 9.0, baa: 0.53 },
        "Yellow Toad": { ip: 2, era: 13.5, baa: 0.625 },
        "Yoshi": { ip: 48, era: 6.94, baa: 0.456 }
      };
      

  function renderCharacters(data, usePitching = false) {
    characterGrid.innerHTML = '';
    data.forEach(char => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.setAttribute('data-class', char.class);
      card.setAttribute('data-avg', char.avg);
      card.setAttribute('data-games', char.hr);
      card.setAttribute('data-gp', char.gp);
  
      const miiInfo = miiMeta[char.name];
      const genderBadge = miiInfo
        ? `<div class="mii-badge" style="background-color:${miiInfo.color};">${miiInfo.gender}</div>`
        : '';
  
      let statSection = '';
      if (usePitching) {
        if (pitchingStats[char.name]) {
          const p = pitchingStats[char.name];
          statSection = `
            <p>IP: ${p.ip}</p>
            <p>ERA: ${p.era.toFixed(2)}</p>
            <p>BAA: ${p.baa.toFixed(3)}</p>
          `;
          card.dataset.ip = p.ip;
          card.dataset.era = p.era;
          card.dataset.baa = p.baa;
        } else {
          statSection = `<p class="never-pitched">Never Pitched</p>`;
          card.dataset.ip = 0;
          card.dataset.era = 0;
          card.dataset.baa = 1;
        }
      } else {
        statSection = (char.gp === 0 && char.hr === 0 && char.avg === 0)
          ? `<p class="never-played">Never Played</p>`
          : `
            <p>Games Played: ${char.gp}</p>
            <p>AVG: ${char.avg.toFixed(3)}</p>
            <p>HR: ${char.hr}</p>
          `;
      }
  
      card.innerHTML = `
        ${genderBadge}
        <img src="${char.image}" alt="${char.name}">
        <h3>${char.name}</h3>
        <p>Class: ${char.class}</p>
        ${statSection}
      `;
  
      

      if (captains.includes(char.name)) {
        card.classList.add('captain-card');
      }
  
      characterGrid.appendChild(card);
    });
  }
      
  

  function applyFilters() {
    const classVal = document.getElementById('classFilter').value;
    const cards = document.querySelectorAll('.character-card');
  
    cards.forEach(card => {
      const cardClass = card.dataset.class;
      let show = true;
  
      if (classVal && cardClass !== classVal) show = false;
  
      if (showingPitching) {
        const ip = parseFloat(card.dataset.ip);
        const er = parseFloat(card.dataset.era);
        const baa = parseFloat(card.dataset.baa);
  
        const ipVal = parseFloat(document.getElementById('ipFilter').value);
        const ipOp = document.getElementById('ipOperator').value;
        if (!isNaN(ipVal)) {
          if (ipOp === '>' && ip <= ipVal) show = false;
          if (ipOp === '<' && ip >= ipVal) show = false;
        }
  
        const erVal = parseFloat(document.getElementById('erFilter').value);
        const erOp = document.getElementById('erOperator').value;
        if (!isNaN(erVal)) {
          if (erOp === '>' && er <= erVal) show = false;
          if (erOp === '<' && er >= erVal) show = false;
        }
  
        const baaVal = parseFloat(document.getElementById('baaFilter').value);
        const baaOp = document.getElementById('baaOperator').value;
        if (!isNaN(baaVal)) {
          if (baaOp === '>' && baa <= baaVal) show = false;
          if (baaOp === '<' && baa >= baaVal) show = false;
        }
  
      } else {
        const avgVal = parseFloat(document.getElementById('avgFilter').value);
        const avgOp = document.getElementById('avgOperator').value;
        const gamesVal = parseInt(document.getElementById('gamesFilter').value);
        const gamesOp = document.getElementById('gamesOperator').value;
        const gpVal = parseInt(document.getElementById('gamesPlayedFilter').value);
        const gpOp = document.getElementById('gamesPlayedOperator').value;
  
        const cardAvg = parseFloat(card.dataset.avg);
        const cardGames = parseInt(card.dataset.games);
        const cardGP = parseInt(card.dataset.gp);
  
        if (!isNaN(avgVal)) {
          if (avgOp === '>' && cardAvg <= avgVal) show = false;
          if (avgOp === '<' && cardAvg >= avgVal) show = false;
        }
        if (!isNaN(gamesVal)) {
          if (gamesOp === '>' && cardGames <= gamesVal) show = false;
          if (gamesOp === '<' && cardGames >= gamesVal) show = false;
        }
        if (!isNaN(gpVal)) {
          if (gpOp === '>' && cardGP <= gpVal) show = false;
          if (gpOp === '<' && cardGP >= gpVal) show = false;
        }
      }
  
      card.style.display = show ? 'block' : 'none';
    });
  }
  

  function sortCharacters() {
    const sortBy = document.getElementById('sortOption').value;
    const container = document.getElementById('characterGrid'); // ✅ FIXED
  
    // Convert NodeList to array and sort
    const cards = Array.from(container.querySelectorAll('.character-card')).filter(c => c.style.display !== 'none');
  
    cards.sort((a, b) => {
      const aVal = parseFloat(a.dataset[sortBy]);
      const bVal = parseFloat(b.dataset[sortBy]);
      return bVal - aVal; // Descending order
    });
  
    // Re-append in sorted order
    cards.forEach(card => container.appendChild(card));
  }
  
  

  function resetFilters() {
    document.getElementById('classFilter').value = '';
    document.getElementById('avgFilter').value = '';
    document.getElementById('avgOperator').value = '>';
    document.getElementById('gamesFilter').value = '';
    document.getElementById('gamesOperator').value = '>';
    document.getElementById('gamesPlayedFilter').value = '';
    document.getElementById('gamesPlayedOperator').value = '>';
    document.getElementById('sortOption').value = ''; // 💥 Reset the sort dropdown
  
    document.querySelectorAll('.character-card').forEach(card => {
      card.style.display = 'block';
    });
  
    renderCharacters(characters, showingPitching);


  }
  
  
  

  document.getElementById('classFilter').addEventListener('change', applyFilters);
  document.getElementById('avgFilter').addEventListener('input', applyFilters);
  document.getElementById('avgOperator').addEventListener('change', applyFilters);
  document.getElementById('gamesFilter').addEventListener('input', applyFilters);
  document.getElementById('gamesOperator').addEventListener('change', applyFilters);
  document.getElementById('gamesPlayedFilter').addEventListener('input', applyFilters);
  document.getElementById('gamesPlayedOperator').addEventListener('change', applyFilters);
  document.getElementById('sortOption').addEventListener('change', () => {
    sortCharacters();
  });
  

  let showingPitching = false;

  renderCharacters(characters);

  

  document.getElementById('toggleStatsBtn').addEventListener('click', () => {
    showingPitching = !showingPitching;
  
    renderCharacters(characters, showingPitching);
    resetFilters();
  
    document.getElementById('toggleStatsBtn').textContent =
      showingPitching ? 'Switch to Batting Stats' : 'Switch to Pitching Stats';
  
    const sortSelect = document.getElementById('sortOption');
    sortSelect.innerHTML = showingPitching
      ? `
        <option value="">-- Select --</option>
        <option value="ip">Innings Pitched</option>
        <option value="era">Earned Run Average</option>
        <option value="baa">BAA</option>
      `
      : `
        <option value="">-- Select --</option>
        <option value="games">Home Runs</option>
        <option value="gp">Games Played</option>
        <option value="avg">Batting Average</option>
      `;
  
    // ✅ Toggle filter visibility
    document.getElementById('battingFilters').style.display = showingPitching ? 'none' : 'block';
    document.getElementById('pitchingFilters').style.display = showingPitching ? 'block' : 'none';
  });

    // Pitching filter events
  ['ipFilter', 'erFilter', 'baaFilter'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', applyFilters);
  });

  ['ipOperator', 'erOperator', 'baaOperator'].forEach(id => {
    const select = document.getElementById(id);
    if (select) select.addEventListener('change', applyFilters);
  });

  


}

  
  
