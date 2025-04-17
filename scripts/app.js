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


  

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {
    const characters = [
        { name: "Baby Daisy", image: "assets/images/baby daisy.png", class: "Power", avg: 0.452, gp: 12, rbi: 5 },
        { name: "Baby DK", image: "assets/images/baby dk.png", class: "Speed", avg: 0.467, gp: 20, rbi: 18 },
        { name: "Baby Luigi", image: "assets/images/baby luigi.png", class: "Speed", avg: 0.333, gp: 10, rbi: 1 },
        { name: "Baby Mario", image: "assets/images/baby mario.png", class: "Speed", avg: 0.200, gp: 4, rbi: 1 },
        { name: "Baby Peach", image: "assets/images/baby peach.png", class: "Balanced", avg: 0.295, gp: 18, rbi: 3 },
        { name: "Birdo", image: "assets/images/birdo.png", class: "Power", avg: 0.541, gp: 20, rbi: 25 },
        { name: "Blooper", image: "assets/images/blooper.png", class: "Balanced", avg: 0.431, gp: 18, rbi: 5 },
        { name: "Boo", image: "assets/images/boo.png", class: "Speed", avg: 0.619, gp: 19, rbi: 6 },
        { name: "Boomerang Bro", image: "assets/images/boomerang bro.png", class: "Power", avg: 0.528, gp: 20, rbi: 27 },
        { name: "Bowser", image: "assets/images/bowser.png", class: "Power", avg: 0.568, gp: 20, rbi: 47 },
        { name: "Bowser Jr", image: "assets/images/bowser jr.png", class: "Technique", avg: 0.465, gp: 20, rbi: 14 },
        { name: "Daisy", image: "assets/images/daisy.png", class: "Power", avg: 0.478, gp: 18, rbi: 15 },
        { name: "Dark Bones", image: "assets/images/dark bones.png", class: "Balanced", avg: 0.658, gp: 20, rbi: 14 },
        { name: "Diddy Kong", image: "assets/images/diddy kong.png", class: "Technique", avg: 0.500, gp: 20, rbi: 12 },
        { name: "Dixie Kong", image: "assets/images/dixie kong.png", class: "Balanced", avg: 0.583, gp: 10, rbi: 5 },
        { name: "Donkey Kong", image: "assets/images/donkey kong.png", class: "Power", avg: 0.667, gp: 20, rbi: 54 },
        { name: "Dry Bones", image: "assets/images/dry bones.png", class: "Balanced", avg: 0.625, gp: 20, rbi: 16 },
        { name: "Blue Dry Bones", image: "assets/images/blue dry bones.png", class: "Balanced", avg: 0.587, gp: 20, rbi: 9 },
        { name: "Green Dry Bones", image: "assets/images/green dry bones.png", class: "Balanced", avg: 0.549, gp: 20, rbi: 17 },
        { name: "Fire Bro", image: "assets/images/fire bro.png", class: "Power", avg: 0.577, gp: 20, rbi: 44 },
        { name: "Funky Kong", image: "assets/images/funky kong.png", class: "Power", avg: 0.473, gp: 20, rbi: 23 },
        { name: "Goomba", image: "assets/images/goomba.png", class: "Speed", avg: 0.0, gp: 0, rbi: 0 },
        { name: "Hammer Bro", image: "assets/images/hammer bro.png", class: "Power", avg: 0.529, gp: 20, rbi: 34 },
        { name: "King Boo", image: "assets/images/king boo.png", class: "Power", avg: 0.507, gp: 20, rbi: 37 },
        { name: "King K Rool", image: "assets/images/king k rool.png", class: "Power", avg: 0.573, gp: 20, rbi: 44 },
        { name: "Red Koopa Paratroopa", image: "assets/images/red koopa paratroopa.png", class: "Balanced", avg: 0.394, gp: 10, rbi: 0 },
        { name: "Koopa Paratroopa", image: "assets/images/koopa paratroopa.png", class: "Balanced", avg: 0.270, gp: 10, rbi: 1 },
        { name: "Koopa Troopa", image: "assets/images/koopa troopa.png", class: "Speed", avg: 0.367, gp: 15, rbi: 3 },
        { name: "Red Koopa Troopa", image: "assets/images/red koopa troopa.png", class: "Speed", avg: 0.368, gp: 6, rbi: 4 },
        { name: "Kritter", image: "assets/images/kritter.png", class: "Power", avg: 0.578, gp: 20, rbi: 31 },
        { name: "Blue Kritter", image: "assets/images/blue kritter.png", class: "Power", avg: 0.444, gp: 20, rbi: 15 },
        { name: "Brown Kritter", image: "assets/images/brown kritter.png", class: "Power", avg: 0.479, gp: 20, rbi: 29 },
        { name: "Red Kritter", image: "assets/images/red kritter.png", class: "Power", avg: 0.453, gp: 20, rbi: 22 },
        { name: "Luigi", image: "assets/images/luigi.png", class: "Speed", avg: 0.493, gp: 20, rbi: 5 },
        { name: "Magikoopa", image: "assets/images/magikoopa.png", class: "Balanced", avg: 0.500, gp: 20, rbi: 9 },
        { name: "Green Magikoopa", image: "assets/images/green magikoopa.png", class: "Balanced", avg: 0.554, gp: 20, rbi: 8 },
        { name: "Red Magikoopa", image: "assets/images/red magikoopa.png", class: "Balanced", avg: 0.439, gp: 19, rbi: 1 },
        { name: "Yellow Magikoopa", image: "assets/images/yellow magikoopa.png", class: "Balanced", avg: 0.512, gp: 12, rbi: 5 },
        { name: "Mario", image: "assets/images/mario.png", class: "Balanced", avg: 0.583, gp: 20, rbi: 11 },
        { name: "Monty Mole", image: "assets/images/monty mole.png", class: "Speed", avg: 0.0, gp: 0, rbi: 0 },
        { name: "Blue Noki", image: "assets/images/noki.png", class: "Balanced", avg: 0.0, gp: 0, rbi: 0 },
        { name: "Green Noki", image: "assets/images/green noki.png", class: "Balanced", avg: 0.174, gp: 6, rbi: 1 },
        { name: "Red Noki", image: "assets/images/red noki.png", class: "Balanced", avg: 0.400, gp: 10, rbi: 2 },
        { name: "Paragoomba", image: "assets/images/paragoomba.png", class: "Balanced", avg: 0.413, gp: 13, rbi: 3 },
        { name: "Peach", image: "assets/images/peach.png", class: "Balanced", avg: 0.343, gp: 20, rbi: 6 },
        { name: "Petey Piranha", image: "assets/images/petey piranha.png", class: "Power", avg: 0.429, gp: 20, rbi: 29 },
        { name: "Pianta", image: "assets/images/pianta.png", class: "Speed", avg: 0.620, gp: 20, rbi: 12 },
        { name: "Red Pianta", image: "assets/images/red pianta.png", class: "Speed", avg: 0.602, gp: 20, rbi: 11 },
        { name: "Yellow Pianta", image: "assets/images/yellow pianta.png", class: "Speed", avg: 0.557, gp: 20, rbi: 17 },
        { name: "Shy Guy", image: "assets/images/shy guy.png", class: "Technique", avg: 0.389, gp: 14, rbi: 5 },
        { name: "Black Shy Guy", image: "assets/images/black shy guy.png", class: "Technique", avg: 0.367, gp: 18, rbi: 5 },
        { name: "Blue Shy Guy", image: "assets/images/blue shy guy.png", class: "Technique", avg: 0.167, gp: 4, rbi: 0 },
        { name: "Green Shy Guy", image: "assets/images/green shy guy.png", class: "Technique", avg: 0.310, gp: 18, rbi: 3 },
        { name: "Yellow Shy Guy", image: "assets/images/yellow shy guy.png", class: "Technique", avg: 0.238, gp: 6, rbi: 2 },
        { name: "Tiny Kong", image: "assets/images/tiny kong.png", class: "Balanced", avg: 0.475, gp: 20, rbi: 6 },
        { name: "Toad", image: "assets/images/toad.png", class: "Speed", avg: 0.721, gp: 12, rbi: 2 },
        { name: "Blue Toad", image: "assets/images/blue toad.png", class: "Speed", avg: 0.612, gp: 14, rbi: 8 },
        { name: "Green Toad", image: "assets/images/green toad.png", class: "Speed", avg: 0.671, gp: 20, rbi: 22 },
        { name: "Purple Toad", image: "assets/images/purple toad.png", class: "Speed", avg: 0.833, gp: 2, rbi: 1 },
        { name: "Yellow Toad", image: "assets/images/yellow toad.png", class: "Speed", avg: 0.583, gp: 18, rbi: 16 },
        { name: "Toadette", image: "assets/images/toadette.png", class: "Balanced", avg: 0.323, gp: 18, rbi: 7 },
        { name: "Toadsworth", image: "assets/images/toadsworth.png", class: "Balanced", avg: 0.217, gp: 13, rbi: 4 },
        { name: "Waluigi", image: "assets/images/waluigi.png", class: "Technique", avg: 0.549, gp: 20, rbi: 9 },
        { name: "Wario", image: "assets/images/wario.png", class: "Technique", avg: 0.638, gp: 20, rbi: 21 },
        { name: "Wiggler", image: "assets/images/wiggler.png", class: "Speed", avg: 0.720, gp: 20, rbi: 13 },
        { name: "Yoshi", image: "assets/images/yoshi.png", class: "Speed", avg: 0.350, gp: 20, rbi: 11 },
        { name: "Blue Yoshi", image: "assets/images/blue yoshi.png", class: "Speed", avg: 0.333, gp: 1, rbi: 0 },
        { name: "Light Blue Yoshi", image: "assets/images/light blue yoshi.png", class: "Speed", avg: 0.0, gp: 0, rbi: 0 },
        { name: "Pink Yoshi", image: "assets/images/pink yoshi.png", class: "Speed", avg: 0.585, gp: 12, rbi: 3 },
        { name: "Red Yoshi", image: "assets/images/red yoshi.png", class: "Speed", avg: 0.378, gp: 13, rbi: 5 },
        { name: "Yellow Yoshi", image: "assets/images/yellow yoshi.png", class: "Speed", avg: 0.0, gp: 0, rbi: 0 },
        { name: "Black Widow", image: "assets/images/black widow.png", class: "Balanced", avg: 0.467, gp: 9, rbi: 7 },
        { name: "Borat", image: "assets/images/borat.jpg", class: "Balanced", avg: 0.443, gp: 20, rbi: 11 },
        { name: "Captain Jack", image: "assets/images/capt.jack.jpg", class: "Balanced", avg: 0.407, gp: 8, rbi: 3 },
        { name: "Chicken", image: "assets/images/chicken.jpg", class: "Balanced", avg: 0.411, gp: 16, rbi: 5 },
        { name: "Dwayne Wade", image: "assets/images/dwyanewade.jpg", class: "Balanced", avg: 0.425, gp: 20, rbi: 13 },
        { name: "Ice Cube", image: "assets/images/ice cube.jpg", class: "Balanced", avg: 0.367, gp: 8, rbi: 5 },
        { name: "Mr. Incredible", image: "assets/images/incredible.jpg", class: "Balanced", avg: 0.355, gp: 20, rbi: 6 },
        { name: "John", image: "assets/images/john.jpg", class: "Balanced", avg: 0.391, gp: 7, rbi: 0 },
        { name: "Kevin G", image: "assets/images/KevinG.png", class: "Balanced", avg: 0.0, gp: 1, rbi: 0 },
        { name: "Lara Croft", image: "assets/images/Lara Croft.png", class: "Balanced", avg: 0.281, gp: 10, rbi: 2 },
        { name: "Lilo", image: "assets/images/Lilo.png", class: "Balanced", avg: 0.441, gp: 10, rbi: 5 },
        { name: "MJ HeeHee", image: "assets/images/MJ heehee.jpg", class: "Balanced", avg: 0.415, gp: 17, rbi: 6 },
        { name: "Matt", image: "assets/images/matt.jpg", class: "Balanced", avg: 0.517, gp: 8, rbi: 3 },
        { name: "Mikasa", image: "assets/images/mikasa.png", class: "Balanced", avg: 0.410, gp: 10, rbi: 5 },
        { name: "Minion", image: "assets/images/minion.jpg", class: "Balanced", avg: 0.406, gp: 18, rbi: 8 },
        { name: "Miss Hot", image: "assets/images/misshot.jpg", class: "Balanced", avg: 0.522, gp: 20, rbi: 17 },
        { name: "SemenLad", image: "assets/images/semenlad.jpg", class: "Balanced", avg: 0.360, gp: 13, rbi: 4 },
        { name: "Snape", image: "assets/images/snape.jpg", class: "Balanced", avg: 0.312, gp: 13, rbi: 3 },
        { name: "Trinity", image: "assets/images/trinity.png", class: "Balanced", avg: 0.424, gp: 10, rbi: 10 },
        { name: "Unc", image: "assets/images/unc.jpg", class: "Balanced", avg: 0.541, gp: 20, rbi: 19 },
        { name: "Lil Wayne", image: "assets/images/lilwayne.jpg", class: "Balanced", avg: 0.513, gp: 10, rbi: 8 }
      ];
      

  function renderCharacters(data) {
    characterGrid.innerHTML = '';
    data.forEach(char => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.setAttribute('data-class', char.class);
      card.setAttribute('data-avg', char.avg);
      card.setAttribute('data-games', char.gp);
      card.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <h3>${char.name}</h3>
        <p>Class: ${char.class}</p>
        <p>Games Played: ${char.gp}</p>
        <p>AVG: ${char.avg.toFixed(3)}</p>
        <p>RBI: ${char.rbi}</p>
      `;

      const captains = [
        "Mario", "Luigi", "Peach", "Daisy", "Donkey Kong", "Bowser",
        "Bowser Jr", "Wario", "Waluigi", "Diddy Kong", "Yoshi", "Birdo"
      ];
      
      if (captains.includes(char.name)) {
        card.classList.add('captain-card');
      }
      characterGrid.appendChild(card);
    });
  }

  function applyFilters() {
    const classVal = document.getElementById('classFilter').value;
    const avgVal = parseFloat(document.getElementById('avgFilter').value);
    const avgOp = document.getElementById('avgOperator').value;
    const gamesVal = parseInt(document.getElementById('gamesFilter').value);
    const gamesOp = document.getElementById('gamesOperator').value;
  
    document.querySelectorAll('.character-card').forEach(card => {
      const cardClass = card.dataset.class;
      const cardAvg = parseFloat(card.dataset.avg);
      const cardGames = parseInt(card.dataset.games);
  
      let show = true;
  
      if (classVal && cardClass !== classVal) show = false;
      if (!isNaN(avgVal)) {
        if (avgOp === '>' && cardAvg <= avgVal) show = false;
        if (avgOp === '<' && cardAvg >= avgVal) show = false;
      }
      if (!isNaN(gamesVal)) {
        if (gamesOp === '>' && cardGames <= gamesVal) show = false;
        if (gamesOp === '<' && cardGames >= gamesVal) show = false;
      }
  
      card.style.display = show ? 'block' : 'none';
    });
  }
  

  document.getElementById('classFilter').addEventListener('change', applyFilters);
  document.getElementById('avgFilter').addEventListener('input', applyFilters);
  document.getElementById('avgOperator').addEventListener('change', applyFilters);
  document.getElementById('gamesFilter').addEventListener('input', applyFilters);
  document.getElementById('gamesOperator').addEventListener('change', applyFilters);


  renderCharacters(characters);
}

  
  
