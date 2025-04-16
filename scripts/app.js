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
        image: "assets/images/bowser.png",
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
const carouselData = [...mvps, ...mvps];

const track = document.querySelector('.carousel-track');

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
updateStandings('Season1');
updatePlayoffs('Season1');

// Scroll to carousel
document.querySelector('.scroll-down').addEventListener('click', () => {
    document.querySelector('.mvp-carousel').scrollIntoView({
        behavior: 'smooth'
    });
});
