//UPDATE STANDINGS ONLY HERE< THEN COMMIT AND PUSH TO AUTO DEPLOY
let currentSortKey = null;
let currentSortDirection = 'desc';


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

async function loadPlayerStats() {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyPd-rGO1-02viPV9WpRozOyz_QC96f8KrF_w49YJJnq6weJi3lVf33Ju7T6aeCCA5r/exec");
    const { batting, pitching } = await res.json();

    const statsMap = {};

    // Normalize batting stats
    batting.forEach(stat => {
      if (stat["First Name"]) {
        const key = stat["First Name"].trim().toLowerCase();
        statsMap[key] = {
          ...statsMap[key],
          GP: stat["Games Played"],
          AVG: stat["Batting Average"],
          HR: stat["Home Runs"]
        };
      }
    });

    // Normalize pitching stats
    pitching.forEach(stat => {
      if (stat["First Name"]) {
        const key = stat["First Name"].trim().toLowerCase();
        statsMap[key] = {
          ...statsMap[key],
          IP: stat["Innings Pitched"],
          ER: stat["Earned Run Average"],
          BAA: stat["Batting Average Against"]
        };
      }
    });

    console.log("✅ Loaded stat keys:", Object.keys(statsMap));
    window.playerStats = statsMap;

  } catch (err) {
    console.error("Failed to load player stats:", err);
  }
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

function calculateStandingsFromMatches(matches) {
  const standingsMap = {};

  matches.forEach(match => {
    if (!match.score || match.score === "0 - 0") return;

    const [homeScoreStr, awayScoreStr] = match.score.split('-').map(s => parseInt(s.trim()));
    if (isNaN(homeScoreStr) || isNaN(awayScoreStr)) return;

    const home = match.home;
    const away = match.away;

    const homeScore = homeScoreStr;
    const awayScore = awayScoreStr;

    if (!standingsMap[home]) {
      standingsMap[home] = { team: home, wins: 0, losses: 0, diff: 0, streak: [], homeWins: 0, awayWins: 0 };
    }
    if (!standingsMap[away]) {
      standingsMap[away] = { team: away, wins: 0, losses: 0, diff: 0, streak: [], homeWins: 0, awayWins: 0 };
    }

    // Determine winner and loser
    if (homeScore > awayScore) {
      standingsMap[home].wins += 1;
      standingsMap[home].homeWins += 1;
      standingsMap[away].losses += 1;

      standingsMap[home].streak.push("W");
      standingsMap[away].streak.push("L");
    } else if (awayScore > homeScore) {
      standingsMap[away].wins += 1;
      standingsMap[away].awayWins += 1;
      standingsMap[home].losses += 1;

      standingsMap[home].streak.push("L");
      standingsMap[away].streak.push("W");
    }

    standingsMap[home].diff += (homeScore - awayScore);
    standingsMap[away].diff += (awayScore - homeScore);
  });

  // Convert streaks into readable W3 / L2 style
  Object.values(standingsMap).forEach(team => {
    const streakArr = team.streak;
    if (streakArr.length === 0) {
      team.streakFormatted = '-';
    } else {
      let last = streakArr[streakArr.length - 1];
      let count = 1;
      for (let i = streakArr.length - 2; i >= 0; i--) {
        if (streakArr[i] === last) count++;
        else break;
      }
      team.streakFormatted = `${last}${count}`;
    }
  });

  return Object.values(standingsMap);
}



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
  { name: "Baby DK", image: "assets/images/baby dk.png", class: "Speed", avg: 0.481, gp: 21, hr: 3, pa: 81, hits: 39, slg: 0.676, obp: 0.494, doubles: 3, triples: 1 },
  { name: "Baby Daisy", image: "assets/images/baby daisy.png", class: "Power", avg: 0.435, gp: 13, hr: 0, pa: 46, hits: 20, slg: 0.521, obp: 0.427, doubles: 2, triples: 1 },
  { name: "Baby Luigi", image: "assets/images/baby luigi.png", class: "Speed", avg: 0.333, gp: 10, hr: 0, pa: 36, hits: 12, slg: 0.389, obp: 0.333, doubles: 0, triples: 1 },
  { name: "Baby Mario", image: "assets/images/baby mario.png", class: "Speed", avg: 0.2, gp: 4, hr: 0, pa: 15, hits: 3, slg: 0.2, obp: 0.2, doubles: 0, triples: 0 },
  { name: "Baby Peach", image: "assets/images/baby peach.png", class: "Balanced", avg: 0.295, gp: 18, hr: 0, pa: 61, hits: 18, slg: 0.328, obp: 0.295, doubles: 2, triples: 0 },
  { name: "Birdo", image: "assets/images/birdo.png", class: "Power", avg: 0.545, gp: 21, hr: 5, pa: 77, hits: 42, slg: 0.791, obp: 0.559, doubles: 3, triples: 0 },
  { name: "Black Shy Guy", image: "assets/images/black shy guy.png", class: "Technique", avg: 0.367, gp: 18, hr: 0, pa: 60, hits: 22, slg: 0.38, obp: 0.363, doubles: 1, triples: 0 },
  { name: "Black Widow", image: "assets/images/black widow.png", class: "Balanced", avg: 0.467, gp: 9, hr: 2, pa: 30, hits: 14, slg: 0.767, obp: 0.467, doubles: 3, triples: 0 },
  { name: "Blooper", image: "assets/images/blooper.png", class: "Balanced", avg: 0.431, gp: 18, hr: 0, pa: 58, hits: 25, slg: 0.553, obp: 0.439, doubles: 4, triples: 1 },
  { name: "Blue Dry Bones", image: "assets/images/blue dry bones.png", class: "Balanced", avg: 0.603, gp: 21, hr: 4, pa: 78, hits: 47, slg: 0.844, obp: 0.599, doubles: 5, triples: 0 },
  { name: "Blue Kritter", image: "assets/images/blue kritter.png", class: "Power", avg: 0.434, gp: 21, hr: 5, pa: 76, hits: 33, slg: 0.598, obp: 0.403, doubles: 1, triples: 0 },
  { name: "Blue Shy Guy", image: "assets/images/blue shy guy.png", class: "Technique", avg: 0.2, gp: 5, hr: 0, pa: 15, hits: 3, slg: 0.2, obp: 0.2, doubles: 0, triples: 0 },
  { name: "Blue Toad", image: "assets/images/blue toad.png", class: "Speed", avg: 0.585, gp: 15, hr: 1, pa: 53, hits: 31, slg: 0.755, obp: 0.585, doubles: 6, triples: 0 },
  { name: "Blue Yoshi", image: "assets/images/blue yoshi.png", class: "Speed", avg: 0.333, gp: 1, hr: 0, pa: 3, hits: 1, slg: 0.333, obp: 0.333, doubles: 0, triples: 0 },
  { name: "Boo", image: "assets/images/boo.png", class: "Speed", avg: 0.627, gp: 20, hr: 0, pa: 67, hits: 42, slg: 0.687, obp: 0.627, doubles: 4, triples: 0 },
  { name: "Boomerang Bro", image: "assets/images/boomerang bro.png", class: "Power", avg: 0.513, gp: 21, hr: 10, pa: 76, hits: 39, slg: 0.934, obp: 0.513, doubles: 2, triples: 0 },
  { name: "Borat", image: "assets/images/borat.jpg", class: "Balanced", avg: 0.446, gp: 21, hr: 0, pa: 83, hits: 37, slg: 0.494, obp: 0.446, doubles: 4, triples: 0 },
  { name: "Bowser Jr", image: "assets/images/bowser jr.png", class: "Technique", avg: 0.455, gp: 21, hr: 3, pa: 77, hits: 35, slg: 0.594, obp: 0.454, doubles: 1, triples: 0 },
  { name: "Bowser", image: "assets/images/bowser.png", class: "Power", avg: 0.541, gp: 21, hr: 23, pa: 85, hits: 46, slg: 1.409, obp: 0.541, doubles: 1, triples: 1 },
  { name: "Brown Kritter", image: "assets/images/brown kritter.png", class: "Power", avg: 0.461, gp: 21, hr: 11, pa: 76, hits: 35, slg: 0.972, obp: 0.474, doubles: 3, triples: 1 },
  { name: "Caillou", image: "assets/images/caillou.jpg", class: "Balanced", avg: 0.333, gp: 10, hr: 1, pa: 39, hits: 13, slg: 0.436, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Captain Jack Sparrow", image: "assets/images/capt.jack.jpg", class: "Balanced", avg: 0.407, gp: 8, hr: 1, pa: 27, hits: 11, slg: 0.538, obp: 0.407, doubles: 0, triples: 0 },
  { name: "Carby", image: "assets/images/mpc.jpg", class: "Balanced", avg: 0.333, gp: 1, hr: 0, pa: 3, hits: 1, slg: 0.333, obp: 0.333, doubles: 0, triples: 0 },
  { name: "Chicken", image: "assets/images/chicken.jpg", class: "Balanced", avg: 0.424, gp: 17, hr: 0, pa: 59, hits: 25, slg: 0.424, obp: 0.424, doubles: 0, triples: 0 },
  { name: "Chickenrice", image: "assets/images/chickenrice.jpg", class: "Balanced", avg: 0.308, gp: 4, hr: 0, pa: 13, hits: 4, slg: 0.385, obp: 0.308, doubles: 1, triples: 0 },
  { name: "Daisy", image: "assets/images/daisy.png", class: "Power", avg: 0.466, gp: 19, hr: 2, pa: 73, hits: 34, slg: 0.639, obp: 0.466, doubles: 6, triples: 0 },
  { name: "Dark Bones", image: "assets/images/dark bones.png", class: "Balanced", avg: 0.671, gp: 21, hr: 7, pa: 82, hits: 55, slg: 0.989, obp: 0.681, doubles: 5, triples: 0 },
  { name: "Diddy Kong", image: "assets/images/diddy kong.png", class: "Technique", avg: 0.506, gp: 21, hr: 1, pa: 83, hits: 42, slg: 0.62, obp: 0.506, doubles: 6, triples: 0 },
  { name: "Dixie Kong", image: "assets/images/dixie kong.png", class: "Balanced", avg: 0.583, gp: 10, hr: 1, pa: 36, hits: 21, slg: 0.722, obp: 0.583, doubles: 2, triples: 0 },
  { name: "Donkey Kong", image: "assets/images/donkey kong.png", class: "Power", avg: 0.642, gp: 21, hr: 18, pa: 81, hits: 52, slg: 1.345, obp: 0.642, doubles: 3, triples: 0 },
  { name: "Dry Bones", image: "assets/images/dry bones.png", class: "Balanced", avg: 0.613, gp: 21, hr: 5, pa: 75, hits: 46, slg: 0.906, obp: 0.614, doubles: 6, triples: 0 },
  { name: "Dwayne Wade", image: "assets/images/dwyanewade.jpg", class: "Balanced", avg: 0.438, gp: 21, hr: 1, pa: 64, hits: 28, slg: 0.484, obp: 0.437, doubles: 0, triples: 0 },
  { name: "Epiccooper", image: "assets/images/epiccooper.jpg", class: "Balanced", avg: 0.5, gp: 4, hr: 0, pa: 16, hits: 8, slg: 0.563, obp: 0.5, doubles: 1, triples: 0 },
  { name: "Fire Bro", image: "assets/images/fire bro.png", class: "Power", avg: 0.585, gp: 21, hr: 23, pa: 82, hits: 48, slg: 1.45, obp: 0.585, doubles: 3, triples: 0 },
  { name: "Frozone", image: "assets/images/frozone.jpg", class: "Balanced", avg: 0.0, gp: 1, hr: 0, pa: 4, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Funky Kong", image: "assets/images/funky kong.png", class: "Power", avg: 0.487, gp: 21, hr: 13, pa: 78, hits: 38, slg: 1.096, obp: 0.511, doubles: 0, triples: 2 },
  { name: "Gandalf", image: "assets/images/gandalf.jpg", class: "Balanced", avg: 0.324, gp: 10, hr: 1, pa: 34, hits: 11, slg: 0.412, obp: 0.324, doubles: 0, triples: 0 },
  { name: "Green Dry Bones", image: "assets/images/green dry bones.png", class: "Balanced", avg: 0.553, gp: 21, hr: 7, pa: 76, hits: 42, slg: 0.868, obp: 0.552, doubles: 1, triples: 1 },
  { name: "Green Magikoopa", image: "assets/images/green magikoopa.png", class: "Balanced", avg: 0.544, gp: 21, hr: 2, pa: 68, hits: 37, slg: 0.662, obp: 0.544, doubles: 2, triples: 0 },
  { name: "Green Noki", image: "assets/images/green noki.png", class: "Balanced", avg: 0.174, gp: 6, hr: 0, pa: 23, hits: 4, slg: 0.217, obp: 0.174, doubles: 1, triples: 0 },
  { name: "Green Shy Guy", image: "assets/images/green shy guy.png", class: "Technique", avg: 0.311, gp: 19, hr: 0, pa: 61, hits: 19, slg: 0.332, obp: 0.292, doubles: 1, triples: 1 },
  { name: "Green Toad", image: "assets/images/green toad.png", class: "Speed", avg: 0.676, gp: 21, hr: 2, pa: 74, hits: 50, slg: 0.931, obp: 0.685, doubles: 7, triples: 2 },
  { name: "Hammer Bro", image: "assets/images/hammer bro.png", class: "Power", avg: 0.514, gp: 21, hr: 18, pa: 74, hits: 38, slg: 1.223, obp: 0.493, doubles: 1, triples: 0 },
  { name: "Helly R", image: "assets/images/helly r.jpg", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.4, obp: 0.4, doubles: 0, triples: 0 },
  { name: "Ice Cube", image: "assets/images/ice cube.jpg", class: "Balanced", avg: 0.367, gp: 8, hr: 0, pa: 30, hits: 11, slg: 0.4, obp: 0.367, doubles: 1, triples: 0 },
  { name: "John 2.0", image: "assets/images/john 20.jpg", class: "Balanced", avg: 0.562, gp: 4, hr: 0, pa: 16, hits: 9, slg: 0.6, obp: 0.6, doubles: 0, triples: 0 },
  { name: "John K", image: "assets/images/john k.jpg", class: "Balanced", avg: 0.325, gp: 12, hr: 0, pa: 40, hits: 13, slg: 0.325, obp: 0.325, doubles: 0, triples: 0 },
  { name: "John", image: "assets/images/john.png", class: "Balanced", avg: 0.391, gp: 7, hr: 0, pa: 23, hits: 9, slg: 0.421, obp: 0.358, doubles: 1, triples: 0 },
  { name: "KevinG", image: "assets/images/keving.jpg", class: "Balanced", avg: 0.0, gp: 2, hr: 0, pa: 7, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "King Boo", image: "assets/images/king boo.png", class: "Power", avg: 0.5, gp: 21, hr: 14, pa: 76, hits: 38, slg: 1.095, obp: 0.479, doubles: 2, triples: 0 },
  { name: "King K Rool", image: "assets/images/king k rool.png", class: "Power", avg: 0.593, gp: 21, hr: 22, pa: 86, hits: 51, slg: 1.427, obp: 0.593, doubles: 3, triples: 0 },
  { name: "Koopa Paratroopa", image: "assets/images/koopa paratroopa.png", class: "Balanced", avg: 0.29, gp: 17, hr: 1, pa: 62, hits: 18, slg: 0.339, obp: 0.29, doubles: 0, triples: 0 },
  { name: "Koopa Troopa", image: "assets/images/koopa troopa.png", class: "Speed", avg: 0.4, gp: 15, hr: 0, pa: 50, hits: 20, slg: 0.467, obp: 0.407, doubles: 3, triples: 0 },
  { name: "Kritter", image: "assets/images/kritter.png", class: "Power", avg: 0.586, gp: 21, hr: 14, pa: 87, hits: 51, slg: 1.207, obp: 0.586, doubles: 10, triples: 1 },
  { name: "Lara Croft", image: "assets/images/lara croft.png", class: "Balanced", avg: 0.314, gp: 11, hr: 0, pa: 35, hits: 11, slg: 0.314, obp: 0.314, doubles: 0, triples: 0 },
  { name: "Lebron James", image: "assets/images/lbj.jpg", class: "Balanced", avg: 0.0, gp: 1, hr: 0, pa: 4, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Lil Wayne", image: "assets/images/lilwayne.jpg", class: "Balanced", avg: 0.513, gp: 10, hr: 0, pa: 39, hits: 20, slg: 0.615, obp: 0.513, doubles: 4, triples: 0 },
  { name: "Lilo", image: "assets/images/lilo.png", class: "Balanced", avg: 0.405, gp: 11, hr: 1, pa: 37, hits: 15, slg: 0.514, obp: 0.405, doubles: 1, triples: 0 },
  { name: "Livvy Dunne", image: "assets/images/liv.jpg", class: "Balanced", avg: 0.667, gp: 1, hr: 0, pa: 3, hits: 2, slg: 0.667, obp: 0.667, doubles: 0, triples: 0 },
  { name: "Lizzy", image: "assets/images/lizzy.jpg", class: "Balanced", avg: 0.667, gp: 1, hr: 0, pa: 3, hits: 2, slg: 0.667, obp: 0.667, doubles: 0, triples: 0 },
  { name: "Luigi", image: "assets/images/luigi.png", class: "Speed", avg: 0.506, gp: 21, hr: 0, pa: 77, hits: 39, slg: 0.546, obp: 0.507, doubles: 1, triples: 1 },
  { name: "MJ HeeHee", image: "assets/images/mj heehee.jpg", class: "Balanced", avg: 0.426, gp: 17, hr: 1, pa: 61, hits: 26, slg: 0.516, obp: 0.434, doubles: 2, triples: 0 },
  { name: "Magikoopa", image: "assets/images/magikoopa.png", class: "Balanced", avg: 0.493, gp: 21, hr: 1, pa: 71, hits: 35, slg: 0.563, obp: 0.493, doubles: 2, triples: 0 },
  { name: "Mario", image: "assets/images/mario.png", class: "Balanced", avg: 0.592, gp: 21, hr: 3, pa: 76, hits: 45, slg: 0.772, obp: 0.594, doubles: 2, triples: 1 },
  { name: "Matt", image: "assets/images/matt.jpg", class: "Balanced", avg: 0.517, gp: 8, hr: 0, pa: 29, hits: 15, slg: 0.517, obp: 0.517, doubles: 0, triples: 0 },
  { name: "Mikasa", image: "assets/images/mikasa.png", class: "Balanced", avg: 0.395, gp: 11, hr: 0, pa: 43, hits: 17, slg: 0.416, obp: 0.402, doubles: 1, triples: 0 },
  { name: "Minion", image: "assets/images/minion.jpg", class: "Balanced", avg: 0.412, gp: 19, hr: 0, pa: 68, hits: 28, slg: 0.427, obp: 0.412, doubles: 1, triples: 0 },
  { name: "Miss Casey", image: "assets/images/misscasey.jpg", class: "Balanced", avg: 0.235, gp: 10, hr: 0, pa: 34, hits: 8, slg: 0.294, obp: 0.235, doubles: 2, triples: 0 },
  { name: "Miss Hot", image: "assets/images/misshot.jpg", class: "Balanced", avg: 0.529, gp: 21, hr: 2, pa: 70, hits: 37, slg: 0.696, obp: 0.529, doubles: 5, triples: 0 },
  { name: "Monty Mole", image: "assets/images/monty mole.png", class: "Speed", avg: 0.667, gp: 1, hr: 0, pa: 3, hits: 2, slg: 0.667, obp: 0.667, doubles: 0, triples: 0 },
  { name: "Mr. Incredible", image: "assets/images/incredible.jpg", class: "Balanced", avg: 0.375, gp: 21, hr: 0, pa: 72, hits: 27, slg: 0.415, obp: 0.386, doubles: 2, triples: 0 },
  { name: "Mrs.Claus", image: "assets/images/mrsclaus.jpg", class: "Balanced", avg: 0.514, gp: 10, hr: 1, pa: 35, hits: 18, slg: 0.657, obp: 0.514, doubles: 2, triples: 0 },
  { name: "Paragoomba", image: "assets/images/paragoomba.png", class: "Balanced", avg: 0.413, gp: 13, hr: 0, pa: 46, hits: 19, slg: 0.435, obp: 0.413, doubles: 1, triples: 0 },
  { name: "Peach", image: "assets/images/peach.png", class: "Balanced", avg: 0.338, gp: 21, hr: 0, pa: 71, hits: 24, slg: 0.354, obp: 0.31, doubles: 3, triples: 0 },
  { name: "Petey Piranha", image: "assets/images/petey piranha.png", class: "Power", avg: 0.432, gp: 21, hr: 15, pa: 81, hits: 35, slg: 1.0, obp: 0.432, doubles: 1, triples: 0 },
  { name: "Pianta", image: "assets/images/pianta.png", class: "Speed", avg: 0.627, gp: 21, hr: 3, pa: 75, hits: 47, slg: 0.705, obp: 0.599, doubles: 0, triples: 0 },
  { name: "Pink Yoshi", image: "assets/images/pink yoshi.png", class: "Speed", avg: 0.585, gp: 12, hr: 0, pa: 41, hits: 24, slg: 0.699, obp: 0.659, doubles: 2, triples: 0 },
  { name: "Purple Toad", image: "assets/images/purple toad.png", class: "Speed", avg: 0.778, gp: 3, hr: 0, pa: 9, hits: 7, slg: 0.889, obp: 0.778, doubles: 0, triples: 0 },
  { name: "Queen Elizabeth", image: "assets/images/queen elizabeth.jpg", class: "Balanced", avg: 0.316, gp: 10, hr: 0, pa: 38, hits: 12, slg: 0.342, obp: 0.316, doubles: 1, triples: 0 },
  { name: "Red Koopa Paratroopa", image: "assets/images/red koopa paratroopa.png", class: "Balanced", avg: 0.394, gp: 10, hr: 0, pa: 33, hits: 13, slg: 0.424, obp: 0.394, doubles: 1, triples: 0 },
  { name: "Red Koopa Troopa", image: "assets/images/red koopa troopa.png", class: "Speed", avg: 0.318, gp: 7, hr: 1, pa: 22, hits: 7, slg: 0.454, obp: 0.318, doubles: 0, triples: 0 },
  { name: "Red Kritter", image: "assets/images/red kritter.png", class: "Power", avg: 0.443, gp: 21, hr: 6, pa: 79, hits: 35, slg: 0.738, obp: 0.441, doubles: 3, triples: 0 },
  { name: "Red Magikoopa", image: "assets/images/red magikoopa.png", class: "Balanced", avg: 0.435, gp: 20, hr: 0, pa: 69, hits: 30, slg: 0.457, obp: 0.441, doubles: 1, triples: 0 },
  { name: "Red Noki", image: "assets/images/red noki.png", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.45, obp: 0.4, doubles: 2, triples: 0 },
  { name: "Red Pianta", image: "assets/images/red pianta.png", class: "Speed", avg: 0.597, gp: 21, hr: 3, pa: 77, hits: 46, slg: 0.789, obp: 0.614, doubles: 4, triples: 0 },
  { name: "Red Yoshi", image: "assets/images/red yoshi.png", class: "Speed", avg: 0.375, gp: 14, hr: 1, pa: 48, hits: 18, slg: 0.438, obp: 0.375, doubles: 0, triples: 0 },
  { name: "Rizzler", image: "assets/images/rizz.jpg", class: "Balanced", avg: 0.75, gp: 1, hr: 0, pa: 4, hits: 3, slg: 0.75, obp: 0.75, doubles: 0, triples: 0 },
  { name: "Saddam Hussein", image: "assets/images/sadd.jpg", class: "Balanced", avg: 0.25, gp: 1, hr: 0, pa: 4, hits: 1, slg: 0.25, obp: 0.25, doubles: 0, triples: 0 },
  { name: "Semenlad", image: "assets/images/semen.jpg", class: "Balanced", avg: 0.346, gp: 13, hr: 0, pa: 52, hits: 18, slg: 0.357, obp: 0.35, doubles: 0, triples: 0 },
  { name: "Shy Guy", image: "assets/images/shy guy.png", class: "Technique", avg: 0.452, gp: 18, hr: 0, pa: 62, hits: 28, slg: 0.526, obp: 0.468, doubles: 4, triples: 0 },
  { name: "Snape", image: "assets/images/snape.jpg", class: "Balanced", avg: 0.312, gp: 13, hr: 0, pa: 48, hits: 15, slg: 0.309, obp: 0.309, doubles: 0, triples: 0 },
  { name: "Tiny Kong", image: "assets/images/tiny kong.png", class: "Balanced", avg: 0.47, gp: 21, hr: 1, pa: 83, hits: 39, slg: 0.554, obp: 0.47, doubles: 2, triples: 1 },
  { name: "Toad", image: "assets/images/toad.png", class: "Balanced", avg: 0.723, gp: 13, hr: 0, pa: 47, hits: 34, slg: 0.744, obp: 0.723, doubles: 1, triples: 0 },
  { name: "Toadette", image: "assets/images/toadette.png", class: "Balanced", avg: 0.338, gp: 19, hr: 0, pa: 65, hits: 22, slg: 0.4, obp: 0.338, doubles: 2, triples: 1 },
  { name: "Toadsworth", image: "assets/images/toadsworth.png", class: "Balanced", avg: 0.217, gp: 13, hr: 0, pa: 46, hits: 10, slg: 0.248, obp: 0.226, doubles: 1, triples: 0 },
  { name: "Trinity", image: "assets/images/trinity.png", class: "Balanced", avg: 0.405, gp: 11, hr: 1, pa: 37, hits: 15, slg: 0.513, obp: 0.405, doubles: 1, triples: 0 },
  { name: "Unc", image: "assets/images/uncle.png", class: "Balanced", avg: 0.545, gp: 21, hr: 3, pa: 77, hits: 42, slg: 0.693, obp: 0.56, doubles: 1, triples: 0 },
  { name: "Waluigi", image: "assets/images/waluigi.png", class: "Technique", avg: 0.547, gp: 21, hr: 0, pa: 75, hits: 41, slg: 0.647, obp: 0.553, doubles: 7, triples: 0 },
  { name: "Wario", image: "assets/images/wario.png", class: "Technique", avg: 0.631, gp: 21, hr: 4, pa: 84, hits: 53, slg: 0.929, obp: 0.684, doubles: 1, triples: 0 },
  { name: "Wiggler", image: "assets/images/wiggler.png", class: "Speed", avg: 0.721, gp: 21, hr: 1, pa: 86, hits: 62, slg: 0.87, obp: 0.721, doubles: 7, triples: 1 },
  { name: "Yellow Magikoopa", image: "assets/images/yellow magikoopa.png", class: "Balanced", avg: 0.512, gp: 12, hr: 1, pa: 43, hits: 22, slg: 0.628, obp: 0.512, doubles: 2, triples: 0 },
  { name: "Yellow Pianta", image: "assets/images/yellow pianta.png", class: "Speed", avg: 0.566, gp: 21, hr: 1, pa: 83, hits: 47, slg: 0.629, obp: 0.574, doubles: 1, triples: 0 },
  { name: "Yellow Shy Guy", image: "assets/images/yellow shy guy.png", class: "Technique", avg: 0.24, gp: 7, hr: 0, pa: 25, hits: 6, slg: 0.24, obp: 0.24, doubles: 0, triples: 0 },
  { name: "Yellow Toad", image: "assets/images/yellow toad.png", class: "Speed", avg: 0.592, gp: 19, hr: 2, pa: 76, hits: 45, slg: 0.724, obp: 0.592, doubles: 4, triples: 0 },
  { name: "Yellow Yoshi", image: "assets/images/yellow yoshi.png", class: "Speed", avg: 0.75, gp: 1, hr: 0, pa: 4, hits: 3, slg: 0.75, obp: 0.75, doubles: 0, triples: 0 },
  { name: "Yghur", image: "assets/images/yghur.jpg", class: "Balanced", avg: 0.381, gp: 6, hr: 1, pa: 21, hits: 8, slg: 0.571, obp: 0.381, doubles: 1, triples: 0 },
  { name: "Yoshi", image: "assets/images/yoshi.png", class: "Speed", avg: 0.349, gp: 21, hr: 2, pa: 83, hits: 29, slg: 0.453, obp: 0.355, doubles: 2, triples: 0 },
  { name: "Zorro", image: "assets/images/zorro.jpg", class: "Balanced", avg: 0.286, gp: 2, hr: 0, pa: 7, hits: 2, slg: 0.286, obp: 0.286, doubles: 0, triples: 0 },
];

window.characters = characters;

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {
    
  const pitchingStats = {
    "Baby Daisy": { ip: 2, era: 0.0, baa: 0.143, so: 0 },
    "Baby Luigi": { ip: 1, era: 0.0, baa: 0.4, so: 0 },
    "Baby Peach": { ip: 9, era: 13.79, baa: 0.605, so: 0 },
    "Birdo": { ip: 52, era: 3.15, baa: 0.412, so: 8 },
    "Black Shy Guy": { ip: 1, era: 0.0, baa: 0.6, so: 0 },
    "Black Widow": { ip: 2, era: 10.5, baa: 0.6, so: 0 },
    "Blooper": { ip: 3, era: 16.8, baa: 0.6, so: 0 },
    "Blue Dry Bones": { ip: 8, era: 10.14, baa: 0.576, so: 1 },
    "Blue Kritter": { ip: 1, era: 8.4, baa: 0.625, so: 0 },
    "Blue Toad": { ip: 2, era: 6.0, baa: 0.667, so: 0 },
    "Boo": { ip: 70, era: 5.78, baa: 0.499, so: 3 },
    "Boomerang Bro": { ip: 2, era: 3.0, baa: 0.583, so: 0 },
    "Bowser": { ip: 56, era: 5.31, baa: 0.47, so: 15 },
    "Bowser Jr": { ip: 43, era: 8.57, baa: 0.509, so: 3 },
    "Caillou": { ip: 2, era: 5.25, baa: 0.385, so: 0 },
    "Chicken": { ip: 2, era: 9.0, baa: 0.462, so: 0 },
    "Chickenrice": { ip: 1, era: 5.25, baa: 0.625, so: 0 },
    "Daisy": { ip: 63, era: 6.69, baa: 0.459, so: 0 },
    "Dark Bones": { ip: 2, era: 6.3, baa: 0.25, so: 0 },
    "Diddy Kong": { ip: 47, era: 7.35, baa: 0.501, so: 2 },
    "Dixie Kong": { ip: 3, era: 0.0, baa: 0.286, so: 1 },
    "Donkey Kong": { ip: 69, era: 6.97, baa: 0.489, so: 3 },
    "Dry Bones": { ip: 2, era: 6.0, baa: 0.545, so: 0 },
    "Dwayne Wade": { ip: 8, era: 0.0, baa: 0.357, so: 0 },
    "Fire Bro": { ip: 1, era: 26.25, baa: 0.636, so: 0 },
    "Funky Kong": { ip: 4, era: 4.5, baa: 0.474, so: 0 },
    "Gandalf": { ip: 2, era: 5.25, baa: 0.588, so: 0 },
    "Green Magikoopa": { ip: 10, era: 13.92, baa: 0.557, so: 0 },
    "Hammer Bro": { ip: 2, era: 17.5, baa: 0.639, so: 0 },
    "John K": { ip: 5, era: 9.8, baa: 0.542, so: 0 },
    "King Boo": { ip: 18, era: 7.15, baa: 0.537, so: 0 },
    "King K Rool": { ip: 5, era: 9.8, baa: 0.418, so: 0 },
    "Koopa Paratroopa": { ip: 1, era: 0.0, baa: 0.5, so: 1 },
    "Koopa Troopa": { ip: 1, era: 21.0, baa: 0.667, so: 0 },
    "Kritter": { ip: 1, era: 10.5, baa: 0.5, so: 0 },
    "Lebron James": { ip: 1, era: 8.4, baa: 0.286, so: 0 },
    "Luigi": { ip: 92, era: 6.24, baa: 0.47, so: 6 },
    "Magikoopa": { ip: 18, era: 10.5, baa: 0.51, so: 0 },
    "Mario": { ip: 86, era: 5.97, baa: 0.466, so: 5 },
    "Mikasa": { ip: 1, era: 21.0, baa: 0.727, so: 0 },
    "Minion": { ip: 10, era: 11.9, baa: 0.528, so: 1 },
    "Miss Casey": { ip: 5, era: 13.59, baa: 0.529, so: 0 },
    "Miss Hot": { ip: 1, era: 0.0, baa: 0.0, so: 0 },
    "Mr. Incredible": { ip: 6, era: 4.26, baa: 0.426, so: 0 },
    "Mrs.Claus": { ip: 4, era: 3.23, baa: 0.313, so: 0 },
    "Para KoopaTroopa": { ip: 2, era: 0.0, baa: 0.333, so: 0 },
    "Paragoomba": { ip: 27, era: 5.84, baa: 0.422, so: 0 },
    "Peach": { ip: 73, era: 6.03, baa: 0.446, so: 1 },
    "Red Kritter": { ip: 5, era: 11.55, baa: 0.585, so: 0 },
    "Red Magikoopa": { ip: 37, era: 7.82, baa: 0.494, so: 0 },
    "Red Pianta": { ip: 1, era: 0.0, baa: 0.4, so: 0 },
    "Tiny Kong": { ip: 3, era: 0.0, baa: 0.25, so: 0 },
    "Toad": { ip: 4, era: 8.75, baa: 0.372, so: 0 },
    "Toadsworth": { ip: 20, era: 10.7, baa: 0.538, so: 1 },
    "Trinity": { ip: 41, era: 2.86, baa: 0.431, so: 2 },
    "Unc": { ip: 5, era: 4.9, baa: 0.541, so: 0 },
    "Waluigi": { ip: 37, era: 5.25, baa: 0.444, so: 2 },
    "Wario": { ip: 36, era: 8.53, baa: 0.502, so: 1 },
    "Wiggler": { ip: 3, era: 1.75, baa: 0.333, so: 0 },
    "Yellow Magikoopa": { ip: 32, era: 7.58, baa: 0.416, so: 1 },
    "Yellow Pianta": { ip: 7, era: 9.0, baa: 0.551, so: 0 },
    "Yellow Toad": { ip: 2, era: 15.0, baa: 0.625, so: 0 },
    "Yoshi": { ip: 48, era: 6.8, baa: 0.472, so: 1 },
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
      card.setAttribute('data-pa', char.pa);
      card.setAttribute('data-slg', char.slg);
      card.setAttribute('data-obp', char.obp);
      card.setAttribute('data-doubles', char.doubles);
      card.setAttribute('data-triples', char.triples);
      card.setAttribute('data-hits', char.hits);
      card.dataset.name = char.name;
      


  
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
            <p>SO: ${p.so}</p>
          `;
          card.dataset.ip = p.ip;
          card.dataset.era = p.era;
          card.dataset.baa = p.baa;
          card.dataset.so = p.so;
        } else {
          statSection = `<p class="never-pitched">Never Pitched</p>`;
          card.dataset.ip = 0;
          card.dataset.era = 0;
          card.dataset.baa = 1;
          card.dataset.so = 0;
        }
      } else {
        statSection = (char.gp === 0 && char.hr === 0 && char.avg === 0)
          ? `<p class="never-played">Never Played</p>`
          : `
            <p>Games Played: ${char.gp}</p>
            <p>PA: ${char.pa}</p>
            <p>Hits: ${char.hits}</p>
            <p>AVG: ${char.avg.toFixed(3)}</p>
            <p>OBP: ${char.obp.toFixed(3)}</p>
            <p>SLG: ${char.slg.toFixed(3)}</p>
            <p>HR: ${char.hr}</p>
            <p>2B: ${char.doubles} | 3B: ${char.triples}</p>
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

        const soVal = parseInt(document.getElementById('soFilter').value);
        const soOp = document.getElementById('soOperator').value;
        const so = parseInt(pitchingStats[card.dataset.name]?.so ?? 0);

        if (!isNaN(soVal)) {
          if (soOp === '>' && so <= soVal) show = false;
          if (soOp === '<' && so >= soVal) show = false;
        }

  
      } else {
        const filters = [
          { key: 'avg', type: 'float' },
          { key: 'games', type: 'int' },
          { key: 'gp', type: 'int' },
          { key: 'pa', type: 'int' },
          { key: 'hits', type: 'int' },
          { key: 'obp', type: 'float' },
          { key: 'slg', type: 'float' },
          { key: 'doubles', type: 'int' },
          { key: 'triples', type: 'int' },
        ];
  
        for (const { key, type } of filters) {
          const inputVal = document.getElementById(`${key}Filter`);
          const opVal = document.getElementById(`${key}Operator`);
          if (!inputVal || !opVal) continue;
  
          const val = type === 'float' ? parseFloat(inputVal.value) : parseInt(inputVal.value);
          const op = opVal.value;
          const cardVal = type === 'float' ? parseFloat(card.dataset[key]) : parseInt(card.dataset[key]);
  
          if (!isNaN(val)) {
            if (op === '>' && cardVal <= val) show = false;
            if (op === '<' && cardVal >= val) show = false;
          }
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
  ["obp", "slg", "pa", "hits", "doubles", "triples"].forEach(stat => {
    document.getElementById(`${stat}Filter`).addEventListener('input', applyFilters);
    document.getElementById(`${stat}Operator`).addEventListener('change', applyFilters);
  });
  ['soFilter'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', applyFilters);
  });
  
  ['soOperator'].forEach(id => {
    const select = document.getElementById(id);
    if (select) select.addEventListener('change', applyFilters);
  });
  
  
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
        <option value="so">Strikeouts</option>
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

function renderSeason3Stats() {
  const grid = document.getElementById('season3StatsGrid');
  grid.innerHTML = '';
  
  const teamRosters = {
    "Car-bones White Van": ["Bowser", "Dark Bones", "Dry Bones", "Blue Dry Bones", "Chicken", "Red Koopa Troopa", "Koopa Troopa", "Red Magikoopa", "Carby", "Red Yoshi", "Baby Mario", "Red Koopa Paratroopa", "Ice Cube", "Blooper"],
    "Rizzler's Boom Squad": ["King K Rool", "Kritter", "Blue Kritter", "Luigi", "Rizzler", "Blue Shy Guy", "Minion", "Magikoopa", "Lilo", "Toadsworth", "Matt", "KSI", "Dixie Kong"],
    "Monkey Mashers": ["Donkey Kong", "Petey Piranha", "Funky Kong", "Wario", "Yoshi", "Diddy Kong", "Tiny Kong", "Tsitsipas", "Lizzy", "Yellow Magikoopa", "Frozone", "Harry Potter", "Dora"],
    "Unc's Breeding Program": ["Unc", "Saddam Hussein", "Lara Croft", "Green Shy Guy", "Green Toad", "Green Magikoopa", "Peach", "Koopa Paratroopa", "Monty Mole", "Kim Jong Un", "Black Widow", "Snape", "Green Noki"],
    "Kevin G's Escort Agency": ["Birdo", "King Boo", "Daisy", "Kevin G", "Shy Guy", "Baby Daisy", "Miss Hot", "Livvy Dunne", "Dwayne Wade", "Black Shy Guy", "Pink Yoshi", "Baby Luigi", "Goomba"],
    "Trinity Triple Threat": ["Wiggler", "Red Kritter", "Brown Kritter", "Waluigi", "Lebron James", "Borat", "Yellow Shy Guy", "Trinity", "Yellow Pianta", "The Penguin", "Lil Wayne", "SemenLad"],
    "Toadette's Hit List": ["Fire Bro", "Boomerang Bro", "Red Pianta", "Mario", "Toad", "Blue Toad", "Toadette", "Purple Toad", "Mr. Incredible", "Baby Peach", "Blue Yoshi", "Handsome Squidward", "Light Blue Yoshi"],
    BenT: ["Bowser Jr", "Hammer Bro", "Green Dry Bones", "Pianta", "Yellow Toad", "Boo", "Mikasa", "Baby DK", "Paragoomba", "Big AJ", "Yellow Yoshi", "Captain Jack", "MJ HeeHee"]
  };

  const allCharacters = window.characters.map(char => {
    let team = '';
    for (const [teamName, roster] of Object.entries(teamRosters)) {
      if (roster.includes(char.name)) {
        team = teamName;
        break;
      }
    }
    return { ...char, team };
  });

  const stats = window.playerStats || {};
  
  allCharacters.forEach(char => {
    const card = document.createElement('div');
    const isCaptain = captains.includes(char.name);
    card.className = 'character-card' + (isCaptain ? ' captain-card' : '');
    
    // Set all data attributes
    card.setAttribute('data-class', char.class || '');
    card.setAttribute('data-team', char.team || '');
    
    // Batting stats
    card.setAttribute('data-avg', stats[char.name.toLowerCase()]?.AVG || 0);
    card.setAttribute('data-hr', stats[char.name.toLowerCase()]?.HR || 0);
    card.setAttribute('data-gp', stats[char.name.toLowerCase()]?.GP || 0);
    
    // Pitching stats
    card.setAttribute('data-ip', stats[char.name.toLowerCase()]?.IP || 0);
    card.setAttribute('data-era', stats[char.name.toLowerCase()]?.ER || 0); // Note: Using ER for ERA
    card.setAttribute('data-baa', stats[char.name.toLowerCase()]?.BAA || 0);

    const miiInfo = window.miiMeta?.[char.name];
    const badge = miiInfo ? `<div class="mii-badge" style="background-color:${miiInfo.color};">${miiInfo.gender}</div>` : '';

    card.innerHTML = `
      ${badge}
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p>Class: ${char.class}</p>
      ${char.team ? `<p class="team-name">Team: ${char.team}</p>` : ''}
      ${stats[char.name.toLowerCase()] ? `
        <div class="char-stat">AVG: ${stats[char.name.toLowerCase()].AVG || '0'}</div>
        <div class="char-stat">HR: ${stats[char.name.toLowerCase()].HR || '0'}</div>
        <div class="char-stat">GP: ${stats[char.name.toLowerCase()].GP || '0'}</div>
        <div class="char-stat">IP: ${stats[char.name.toLowerCase()].IP || '0'}</div>
        <div class="char-stat">ERA: ${stats[char.name.toLowerCase()].ER || '0'}</div>
        <div class="char-stat">BAA: ${stats[char.name.toLowerCase()].BAA || '0'}</div>
      ` : `<div class="placeholder-stats">No Games Played</div>`}
    `;

    grid.appendChild(card);
  });

  setupSeason3Filters();
}

function setupSeason3Filters() {
  // Copy the filter functionality from characters page
  document.getElementById('classFilter').addEventListener('change', applySeason3Filters);
  document.getElementById('avgFilter').addEventListener('input', applySeason3Filters);
  document.getElementById('avgOperator').addEventListener('change', applySeason3Filters);
  document.getElementById('gamesFilter').addEventListener('input', applySeason3Filters);
  document.getElementById('gamesOperator').addEventListener('change', applySeason3Filters);
  document.getElementById('gamesPlayedFilter').addEventListener('input', applySeason3Filters);
  document.getElementById('gamesPlayedOperator').addEventListener('change', applySeason3Filters);
  document.getElementById('teamFilter').addEventListener('change', applySeason3Filters);
  document.getElementById('sortOption').addEventListener('change', sortSeason3Characters);

  // Toggle between batting/pitching stats
  let showingPitching = false;
  document.getElementById('toggleStatsBtn').addEventListener('click', () => {
    showingPitching = !showingPitching;
    document.getElementById('toggleStatsBtn').textContent =
      showingPitching ? 'Switch to Batting Stats' : 'Switch to Pitching Stats';
    document.getElementById('battingFilters').style.display = showingPitching ? 'none' : 'block';
    document.getElementById('pitchingFilters').style.display = showingPitching ? 'block' : 'none';
    
    // Update sort options
    const sortSelect = document.getElementById('sortOption');
    sortSelect.innerHTML = showingPitching
      ? `
        <option value="">-- Select --</option>
        <option value="ip">Innings Pitched</option>
        <option value="era">ERA</option>
        <option value="baa">BAA</option>
      `
      : `
        <option value="">-- Select --</option>
        <option value="avg">Batting Average</option>
        <option value="games">Home Runs</option>
        <option value="gp">Games Played</option>
      `;
    
    // Reset the sort selection
    sortSelect.value = '';
  });
}

function applySeason3Filters() {
  const classVal = document.getElementById('classFilter').value;
  const teamVal = document.getElementById('teamFilter').value;
  const showingPitching = document.getElementById('pitchingFilters').style.display === 'block';
  const cards = document.querySelectorAll('#season3StatsGrid .character-card');

  cards.forEach(card => {
    const cardClass = card.dataset.class;
    const cardTeam = card.dataset.team;
    let show = true;

    // Class filter
    if (classVal && cardClass !== classVal) show = false;

    // Team filter
    if (teamVal && cardTeam !== teamVal) show = false;

    if (showingPitching) {
      // Pitching stats filters
      const ip = parseFloat(card.dataset.ip || 0);
      const era = parseFloat(card.dataset.era || 0);
      const baa = parseFloat(card.dataset.baa || 0);

      const ipVal = parseFloat(document.getElementById('ipFilter').value);
      const ipOp = document.getElementById('ipOperator').value;
      if (!isNaN(ipVal)) {
        if (ipOp === '>' && ip <= ipVal) show = false;
        if (ipOp === '<' && ip >= ipVal) show = false;
      }

      const erVal = parseFloat(document.getElementById('erFilter').value);
      const erOp = document.getElementById('erOperator').value;
      if (!isNaN(erVal)) {
        if (erOp === '>' && era <= erVal) show = false;
        if (erOp === '<' && era >= erVal) show = false;
      }

      const baaVal = parseFloat(document.getElementById('baaFilter').value);
      const baaOp = document.getElementById('baaOperator').value;
      if (!isNaN(baaVal)) {
        if (baaOp === '>' && baa <= baaVal) show = false;
        if (baaOp === '<' && baa >= baaVal) show = false;
      }
    } else {
      // Batting stats filters
      const avgVal = parseFloat(document.getElementById('avgFilter').value);
      const avgOp = document.getElementById('avgOperator').value;
      const gamesVal = parseInt(document.getElementById('gamesFilter').value);
      const gamesOp = document.getElementById('gamesOperator').value;
      const gpVal = parseInt(document.getElementById('gamesPlayedFilter').value);
      const gpOp = document.getElementById('gamesPlayedOperator').value;

      const cardAvg = parseFloat(card.dataset.avg || 0);
      const cardHR = parseInt(card.dataset.hr || 0);
      const cardGP = parseInt(card.dataset.gp || 0);

      if (!isNaN(avgVal)) {
        if (avgOp === '>' && cardAvg <= avgVal) show = false;
        if (avgOp === '<' && cardAvg >= avgVal) show = false;
      }
      if (!isNaN(gamesVal)) {
        if (gamesOp === '>' && cardHR <= gamesVal) show = false;
        if (gamesOp === '<' && cardHR >= gamesVal) show = false;
      }
      if (!isNaN(gpVal)) {
        if (gpOp === '>' && cardGP <= gpVal) show = false;
        if (gpOp === '<' && cardGP >= gpVal) show = false;
      }
    }

    card.style.display = show ? 'block' : 'none';
  });
}

function sortSeason3Characters() {
  const sortBy = document.getElementById('sortOption').value;
  const container = document.getElementById('season3StatsGrid');
  const showingPitching = document.getElementById('pitchingFilters').style.display === 'block';

  if (!sortBy) return;

  const cards = Array.from(container.querySelectorAll('.character-card')).filter(c => 
    c.style.display !== 'none'
  );

  cards.sort((a, b) => {
    let aVal, bVal;

    if (showingPitching) {
      // Handle pitching stats sorting
      switch(sortBy) {
        case 'ip':
          aVal = parseFloat(a.dataset.ip || 0);
          bVal = parseFloat(b.dataset.ip || 0);
          break;
        case 'era':
          aVal = parseFloat(a.dataset.era || 0);
          bVal = parseFloat(b.dataset.era || 0);
          break;
        case 'baa':
          aVal = parseFloat(a.dataset.baa || 0);
          bVal = parseFloat(b.dataset.baa || 0);
          break;
      }
    } else {
      // Handle batting stats sorting
      switch(sortBy) {
        case 'avg':
          aVal = parseFloat(a.dataset.avg || 0);
          bVal = parseFloat(b.dataset.avg || 0);
          break;
        case 'games':
          aVal = parseInt(a.dataset.hr || 0);
          bVal = parseInt(b.dataset.hr || 0);
          break;
        case 'gp':
          aVal = parseInt(a.dataset.gp || 0);
          bVal = parseInt(b.dataset.gp || 0);
          break;
      }
    }

    // For ERA and BAA, lower is better so we reverse the sort
    if (showingPitching && (sortBy === 'era' || sortBy === 'baa')) {
      return aVal - bVal;
    }
    
    // Default descending sort for other stats
    return bVal - aVal;
  });

  // Re-append in sorted order
  cards.forEach(card => container.appendChild(card));
}

function resetSeason3Filters() {
  document.getElementById('classFilter').value = '';
  document.getElementById('avgFilter').value = '';
  document.getElementById('avgOperator').value = '>';
  document.getElementById('gamesFilter').value = '';
  document.getElementById('gamesOperator').value = '>';
  document.getElementById('gamesPlayedFilter').value = '';
  document.getElementById('gamesPlayedOperator').value = '>';
  document.getElementById('ipFilter').value = '';
  document.getElementById('ipOperator').value = '>';
  document.getElementById('erFilter').value = '';
  document.getElementById('erOperator').value = '>';
  document.getElementById('baaFilter').value = '';
  document.getElementById('baaOperator').value = '>';
  document.getElementById('teamFilter').value = '';
  document.getElementById('sortOption').value = '';
  
  document.querySelectorAll('#season3StatsGrid .character-card').forEach(card => {
    card.style.display = 'block';
  });
}




  
  
