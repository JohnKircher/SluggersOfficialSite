//UPDATE STANDINGS ONLY HERE< THEN COMMIT AND PUSH TO AUTO DEPLOY
let currentSortKey = null;
let currentSortDirection = 'desc';



//ADD MATCHES HERE
//images: 



async function loadMatchesFromAPI() {
  const loadingDiv = document.getElementById('loading-matches');
  const matchList = document.getElementById('matchList');

  if (loadingDiv) loadingDiv.style.display = 'block';
  if (matchList) matchList.innerHTML = '';

  // ✅ Fetch match data from your Google Apps Script
  const res = await fetch("https://script.google.com/macros/s/AKfycbybAu3zUjcSV9_KU2_jxkoKS316lBA4S8dK2pZftbwxstWyHVk8VuGlwZaxQaH_g2FL/exec?t=" + Date.now());
  const matches = await res.json();

  // ✅ Step 1: Calculate standings from the current matches
  const standingsArray = calculateStandingsFromMatches(matches);
  const standingsMap = {};
  standingsArray.forEach(team => {
    standingsMap[team.team] = team;
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ✅ Step 2: Generate preview only for unplayed matches that have no preview
  for (const match of matches) {
    if (match.score === "0 - 0" && !match.preview && match.previewEligible?.toLowerCase() === "yes") {
      try {
        match.preview = await generatePreview(match, standingsMap);
        console.log(`🔮 Preview for ${match.home} vs ${match.away}:`, match.preview);

        // ✅ Save preview using GET to avoid CORS issues
        const updateUrl = new URL("https://script.google.com/macros/s/AKfycbybAu3zUjcSV9_KU2_jxkoKS316lBA4S8dK2pZftbwxstWyHVk8VuGlwZaxQaH_g2FL/exec");
        updateUrl.searchParams.set("mode", "updatePreview");
        updateUrl.searchParams.set("id", match.id);
        updateUrl.searchParams.set("preview", encodeURIComponent(match.preview));

        await fetch(updateUrl.toString());
        await sleep(1500); // delay to avoid rate limits
      } catch (err) {
        console.warn(`❌ Failed to generate preview for ${match.home} vs ${match.away}:`, err);
        match.preview = "Preview could not be generated at this time.";
      }
    }
  }

  window.matches = matches;
  renderMatches();

  if (loadingDiv) loadingDiv.style.display = 'none';
}


async function generatePreview(match, standingsMap) {
  const res = await fetch("/.netlify/functions/generatePreview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      home: match.home,
      away: match.away,
      score: match.score,
      date: match.date,
      day: match.day,
      stadiumImg: match.stadiumImg,
      homeStar: match.homeStar,
      awayStar: match.awayStar,
      homeStatAdjust: match.homeStatAdjust,
      awayStatAdjust: match.awayStatAdjust,
      "Home Lineup": match["Home Lineup"],
      "Away Lineup": match["Away Lineup"],
      standingsMap,
    })
  });

  const { preview } = await res.json();
  return preview || "Preview could not be generated.";
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
    "Borat": { gender: "M", color: "green" },
    "Captain Jack Sparrow": { gender: "M", color: "white" },
    "Chicken": { gender: "M", color: "purple" },
    "Dwayne Wade": { gender: "M", color: "pink" },
    "Ice Cube": { gender: "M", color: "brown" },
    "Mr. Incredible": { gender: "M", color: "red" },
    "John": { gender: "M", color: "lightgreen" },
    "KevinG": { gender: "M", color: "orange" },
    "Lara Croft": { gender: "F", color: "black" },
    "Lilo": { gender: "F", color: "green" },
    "MJ HeeHee": { gender: "M", color: "lightblue" },
    "Matt": { gender: "M", color: "orange" },
    "Mikasa": { gender: "F", color: "yellow" },
    "Minion": { gender: "M", color: "blue" },
    "Miss Hot": { gender: "F", color: "white" },
    "Semenlad": { gender: "F", color: "yellow" },
    "Snape": { gender: "M", color: "black" },
    "Trinity": { gender: "F", color: "purple" },
    "Unc": { gender: "M", color: "blue" },
    "Lil Wayne": { gender: "M", color: "brown" },
    "Kim Jong Un": { gender: "M", color: "blue" },
    "Frozone": { gender: "M", color: "white" },
    "The Penguin": { gender: "M", color: "purple" },
    "Handsome Squidward": { gender: "F", color: "orange" },
    "Harry Potter": { gender: "M", color: "lightgreen" },
    "Rizzler": { gender: "F", color: "brown" },
    "Tsitsipas": { gender: "F", color: "pink" },
    "Dora": { gender: "F", color: "purple" },
    "KSI": { gender: "F", color: "brown" },
    "Big AJ": { gender: "F", color: "purple" },
    "Carby": { gender: "F", color: "red" },
    "Lebron James": { gender: "M", color: "brown" },
    "Lizzy": { gender: "F", color: "lightgreen" },
    "Saddam Hussein": { gender: "F", color: "blue" },
    "Livvy Dunne": { gender: "F", color: "pink" },
    "Caillou": { gender: "M", color: "red" },
    "Epiccooper": { gender: "M", color: "purple" },
    "Gandalf": { gender: "M", color: "black" },
    "Helly R": { gender: "F", color: "blue" },
    "John 2.0": { gender: "M", color: "purple" },
    "John K": { gender: "M", color: "yellow" },
    "KevinG": { gender: "M", color: "red" },
    "Miss Casey": { gender: "F", color: "white" },
    "Mrs.Claus": { gender: "F", color: "green" },
    "Queen Elizabeth": { gender: "F", color: "green" },
    "Yghur": { gender: "F", color: "lightblue" },
    "Zorro": { gender: "M", color: "black" },
    "Chickenrice": { gender: "M", color: "blue" },
    "Winnie The Pooh": { gender: "F", color: "pink" },
    "Tobey Maguire": { gender: "F", color: "lightgreen" },
    "Gus Fring": { gender: "F", color: "brown" },
    "Tung Tung Tung Sahur": { gender: "F", color: "red" },
    "Taylor Swift": { gender: "M", color: "pink" },
    "Angelina Joeli": { gender: "M", color: "blue" },
    "Pops": { gender: "M", color: "brown" },
    "Ghandi": { gender: "F", color: "blue" },
    "Count Dooku": { gender: "M", color: "blue" },
    "MLK Jr": { gender: "M", color: "yellow" },
    "Syndrome": { gender: "M", color: "green" },
    "Beyonce": { gender: "F", color: "orange" },
    "Whoopie Goldberg": { gender: "M", color: "blue" },
    "Evie": { gender: "F", color: "yellow" },
    "Diminutive": { gender: "M", color: "red" }
  };

window.miiMeta = miiMeta;

  

// Sample MVP Data
const mvps = [
    {
        name: "King K Rool",
        team: "BenT & BenR (x2)",
        mvps: 9,
        image: "assets/images/krool.png",
        stats: "+2 Playoff MVPs"
    },
    {
        name: "Bowser",
        team: "Julian & BenT & HarryKirch",
        mvps: 8,
        image: "assets/images/bowser1.png",
        stats: "+6 Playoff MVPs"
    },
    {
      name: "Donkey Kong",
      team: "BenR, Tom, Carby",
      mvps: 7,
      image: "assets/images/dk.png",
      stats: "+5 Playoff MVPs"
    },
    {
        name: "Fire Bro",
        team: "Kircher (x2), Jmo",
        mvps: 7,
        image: "assets/images/fbro.png",
        stats: "+2 Playoff MVPs"
    },
    {
        name: "Hammer Bro",
        team: "Tom, Jmo, Julian, BenT",
        mvps: 7,
        image: "assets/images/hbro.png",
        stats: "+1 Playoff MVPs"
    },
    {
        name: "Red Kritter",
        team: "Kircher (x3)",
        mvps: 6,
        image: "assets/images/rkrit.png",
        stats: "+2 Playoff MVPs"
    },
    
    {
        name: "Brown Kritter",
        team: "BenR, BenT, Kircher",
        mvps: 6,
        image: "assets/images/bkrit.png",
        stats: "+2 Playoff MVPs"
    },
    {
      name: "Dry Bones",
      team: "Julian, BenR, HarryKirch",
      mvps: 5,
      image: "assets/images/dry.png",
      stats: "+1 Playoff MVPs"
  },
  {
    name: "Birdo",
    team: "HarryKirch, Jmo, Tom",
    mvps: 5,
    image: "assets/images/birdonk.png",
    stats: "+2 Playoff MVPs"
  },
    
    {
      name: "Boomerang Bro",
      team: "Kircher, Jmo (x2)",
      mvps: 5,
      image: "assets/images/bbro.png",
      stats: "+1 Playoff MVPs"
    },
    {
      name: "Petey Piranha",
      team: "Jmo, HarryKirch, Carby",
      mvps: 5,
      image: "assets/images/petey.png",
      stats: "+3 Playoff MVPs"
    },
    {
        name: "Unc",
        team: "Julian (x2), BenR",
        mvps: 4,
        image: "assets/images/unc.png",
        stats: "+1 Playoff MVPs"
    },
    
    {
      name: "Kritter",
      team: "BenT, BenR (x2)",
      mvps: 4,
      image: "assets/images/krit.png",
      stats: ""
    },
    {
      name: "Wiggler",
      team: "BenT, HarryKirch, Kircher",
      mvps: 4,
      image: "assets/images/wiggy.png",
      stats: "+1 Playoff MVPs"
    },
    {
      name: "Red Pianta",
      team: "Tom, Kircher, Jmo",
      mvps: 3,
      image: "assets/images/red_pianta.png",
      stats: ""
    },
    {
      name: "King Boo",
      team: "Carby (x2), Tom",
      mvps: 3,
      image: "assets/images/king.png",
      stats: ""
    },
    {
      name: "Wario",
      team: "Carby, Jmo, Kircher",
      mvps: 3,
      image: "assets/images/wario_1.png",
      stats: ""
    },
    {
      name: "Toad",
      team: "HarryKirch, Kircher, Jmo",
      mvps: 3,
      image: "assets/images/td1.png",
      stats: ""
    },
    
    
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
        { team: "(BenR) DK's Swamp Monkeys", wins: 7, losses: 3, diff: 29 },
        { team: "(BenT) BenT", wins: 7, losses: 3, diff: 23 },
        { team: "(Julian) UNC", wins: 6, losses: 4, diff: 8 },
        { team: "(Carby) Wario is a Pedo", wins: 5, losses: 5, diff: 3 },
        { team: "(HarryKirch) Birdo Backshots", wins: 5, losses: 5, diff: -13 },
        { team: "(Tom) Tom-Splosion", wins: 4, losses: 6, diff: -13 },
        { team: "(Kircher) BowserJr. OnlyShells Account", wins: 4, losses: 6, diff: -14 },
        { team: "(Jmo) Petey's Thirst Trap", wins: 2, losses: 8, diff: -23 }
    ],
    "Season2": [
        { team: "(BenT) BenT", wins: 7, losses: 3, diff: 32 },
        { team: "(Jmo) Sucked & Severed", wins: 7, losses: 3, diff: 27 },
        { team: "(Tom) Diddy's Blue Ball Boys", wins: 5, losses: 5, diff: 6 },
        { team: "(Kircher) Caillou's House", wins: 5, losses: 5, diff: -1 },
        { team: "(BenR) Luigi Long Schlongs", wins: 5, losses: 5, diff: -3 },
        { team: "(HarryKirch) Baby Daisy Bent Over", wins: 4, losses: 6, diff: -12 },
        { team: "(Julian) Mario Pocket P****", wins: 4, losses: 6, diff: -14 },
        { team: "(Carby) Mii's and Nightmares", wins: 3, losses: 7, diff: -35 }
    ],
    "Season3": [
        { team: "(Jmo) Toadette's Hit List", wins: 8, losses: 2, diff: 21 },
        { team: "(HarryKirch) Car-bone's White Van", wins: 7, losses: 3, diff: 24 },
        { team: "(Kircher) Trinity Triple Threat", wins: 6, losses: 4, diff: 6 },
        { team: "(BenR) Kritter Town USA", wins: 5, losses: 5, diff: -3 },
        { team: "(BenT) BenT", wins: 5, losses: 5, diff: -9 },
        { team: "(Carby) Mokney Mashers", wins: 4, losses: 6, diff: 0 },
        { team: "(Tom) KevinG's Escort Agency", wins: 4, losses: 6, diff: -19 },
        { team: "(Julian) Unc's Breeding Program", wins: 1, losses: 9, diff: -20 }
    ]
};


// Sample Playoff Data
const playoffs = {
    "Season1": {
        rounds: [
            {
                name: "Round 1",
                matches: [
                    { team1: "(Julian) UNC", score1: 2, team2: "(Tom) Tom-Splosion", score2: 1 },
                    { team1: "(Carby) Wario is a Pedo", score1: 1, team2: "(HarryKirch) Birdo Backshots", score2: 2 }
                ]
            },
            {
                name: "Semifinals",
                matches: [
                    { team1: "(BenR) DK's Swamp Monkeys", score1: 2, team2: "(HarryKirch) Birdo Backshots", score2: 0 },
                    { team1: "(BenT) Ben T", score1: 1, team2: "(Julian) UNC", score2: 2 }
                ]
            },
            {
                name: "Finals",
                matches: [
                    { team1: "(BenR) DK's Swamp Monkeys", score1: 3, team2: "(Julian) UNC", score2: 2 }
                ]
            }
        ]
    },
    "Season2": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "(Tom) Diddy's Blue Ball Boys", score1: 2, team2: "(HarryKirch) Baby Daisy Bent Over", score2: 1 },
                { team1: "(Kircher) Caillou's House", score1: 2, team2: "(BenR) Luigi Long Schlongs", score2: 0 }
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "(BenT) BenT", score1: 2, team2: "(Kircher) Caillou's House", score2: 0 },
                { team1: "(Jmo) Sucked & Severed", score1: 2, team2: "(Tom) Diddy's Blue Ball Boys", score2: 1 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "(BenT) BenT", score1: 3, team2: "(Jmo) Sucked & Severed", score2: 0 }
            ]
        }
    ]
  },
  "Season3": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "(BenR) Kritter Town USA", score1: 2, team2: "(BenT) BenT", score2: 1 },
                { team1: "(Kircher) Trinity Triple Threat", score1: 0, team2: "(Carby) Mokney Mashers", score2: 2 }
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "(Jmo) Toadette's Hit List", score1: 1, team2: "(Carby) Monkey Mashers", score2: 2 },
                { team1: "(HarryKirch) Car-bone's White Van", score1: 2, team2: "(BenR) Kritter Town USA  ", score2: 0 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "(Carby) Mokney Mashers", score1: 3, team2: "(HarryKirch) Car-bone's White Van", score2: 1}
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
    updateStandings('Season3');

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

const mvpCounts = {
  "King K Rool": 9,
  "Red Kritter": 6,
  "Donkey Kong": 7,
  "Brown Kritter": 6,
  "Bowser": 8,
  "Unc": 4,
  "Hammer Bro": 7,
  "Fire Bro": 7,
  "Dry Bones": 5,
  "Birdo": 5,
  "Boomerang Bro": 5,
  "Kritter": 4,
  "Funky Kong": 2,
  "Bowser Jr": 2,
  "Daisy": 2,
  "Lil Wayne": 2,
  "Red Pianta": 3,
  "King Boo": 3,
  "Green Toad": 2,
  "Mario": 2,
  "Wario": 3,
  "Blue Toad": 2,
  "Wiggler": 4,
  "Toad": 3,
  "John 2.0": 1,
  "Boo": 1,
  "Borat": 2,
  "Baby Daisy": 1,
  "Dixie Kong": 1,
  "Black Widow": 1,
  "Miss Hot": 2,
  "Blue Dry Bones": 1,
  "Dark Bones": 1,
  "Green Magikoopa": 1,
  "Blue Kritter": 2,
  "Petey Piranha": 5,
  "Trinity": 1,
  "Yellow Pianta": 1,
  "MJ HeeHee": 1,
  "Magikoopa": 1,
  "Green Dry Bones": 1,
  "Red Magikoopa": 1,
  "Saddam Hussein": 1,
  "Pianta": 2,
  "Yellow Shy Guy": 1,
  "Toadette": 1,
  "Red Yoshi": 1,
  "Yellow Toad": 2,
  "Winnie The Pooh": 1,
  "Red Magikoopa": 1
};

const playoffMvpCounts = {
  "Bowser": 6,
  "Donkey Kong": 5,
  "Petey Piranha": 3,
  "Brown Kritter": 2,
  "Red Kritter": 2,
  "Green Dry Bones": 2,
  "Blue Dry Bones": 2,
  "Fire Bro": 2,
  "King K Rool": 2,
  "Birdo": 2,
  "Toadette": 1,
  "Pianta": 1,
  "Funky Kong": 1,
  "Unc": 1,
  "MJ HeeHee": 1,
  "Wiggler": 1,
  "Boomerang Bro": 1,
  "Yellow Toad": 1,
  "Mrs.Claus": 1,
  "Hammer Bro": 1,
  "Yellow Pianta": 1,
  "Mario": 1,
  "Dry Bones": 1
};

window.mvpS3Counts = {
  "Fire Bro": 1,
  "Pianta": 1,
  "Yellow Toad": 1,
  "Boomerang Bro": 1,
  "Red Magikoopa": 1,
  "Wiggler": 1,
  "King K Rool": 1,
  "Winnie The Pooh": 1,
  "Petey Piranha": 1,
  "Bowser": 1,
  "Brown Kritter": 1,
  "Hammer Bro": 1
};

const characters = [
  { name: "Baby DK", image: "assets/images/baby dk.png", class: "Speed", avg: 0.522, gp: 34, hr: 5, pa: 136, hits: 71, slg: 0.688, obp: 0.529, doubles: 4, triples: 1 },
  { name: "Baby Daisy", image: "assets/images/baby daisy.png", class: "Power", avg: 0.418, gp: 26, hr: 2, pa: 91, hits: 38, slg: 0.56, obp: 0.413, doubles: 5, triples: 1 },
  { name: "Baby Luigi", image: "assets/images/baby luigi.png", class: "Speed", avg: 0.333, gp: 10, hr: 0, pa: 36, hits: 12, slg: 0.389, obp: 0.333, doubles: 0, triples: 1 },
  { name: "Baby Mario", image: "assets/images/baby mario.png", class: "Speed", avg: 0.2, gp: 4, hr: 0, pa: 15, hits: 3, slg: 0.2, obp: 0.2, doubles: 0, triples: 0 },
  { name: "Baby Peach", image: "assets/images/baby peach.png", class: "Balanced", avg: 0.295, gp: 18, hr: 0, pa: 61, hits: 18, slg: 0.328, obp: 0.295, doubles: 2, triples: 0 },
  { name: "Birdo", image: "assets/images/birdo.png", class: "Power", avg: 0.579, gp: 34, hr: 16, pa: 133, hits: 77, slg: 0.984, obp: 0.586, doubles: 5, triples: 0 },
  { name: "Black Shy Guy", image: "assets/images/black shy guy.png", class: "Technique", avg: 0.37, gp: 22, hr: 0, pa: 73, hits: 27, slg: 0.381, obp: 0.367, doubles: 1, triples: 0 },
  { name: "Black Widow", image: "assets/images/black widow.jpg", class: "Balanced", avg: 0.467, gp: 9, hr: 2, pa: 30, hits: 14, slg: 0.767, obp: 0.467, doubles: 3, triples: 0 },
  { name: "Blooper", image: "assets/images/blooper.png", class: "Balanced", avg: 0.514, gp: 22, hr: 0, pa: 74, hits: 38, slg: 0.623, obp: 0.52, doubles: 5, triples: 1 },
  { name: "Blue Dry Bones", image: "assets/images/blue dry bones.png", class: "Balanced", avg: 0.62, gp: 34, hr: 8, pa: 129, hits: 80, slg: 0.905, obp: 0.623, doubles: 7, triples: 1 },
  { name: "Blue Kritter", image: "assets/images/blue kritter.png", class: "Power", avg: 0.515, gp: 34, hr: 12, pa: 132, hits: 68, slg: 0.791, obp: 0.497, doubles: 4, triples: 0 },
  { name: "Blue Shy Guy", image: "assets/images/blue shy guy.png", class: "Technique", avg: 0.316, gp: 18, hr: 0, pa: 57, hits: 18, slg: 0.322, obp: 0.316, doubles: 0, triples: 0 },
  { name: "Blue Toad", image: "assets/images/blue toad.png", class: "Speed", avg: 0.585, gp: 28, hr: 3, pa: 106, hits: 62, slg: 0.727, obp: 0.585, doubles: 6, triples: 0 },
  { name: "Blue Yoshi", image: "assets/images/blue yoshi.png", class: "Speed", avg: 0.333, gp: 1, hr: 0, pa: 3, hits: 1, slg: 0.333, obp: 0.333, doubles: 0, triples: 0 },
  { name: "Boo", image: "assets/images/boo.png", class: "Speed", avg: 0.509, gp: 33, hr: 1, pa: 112, hits: 57, slg: 0.58, obp: 0.509, doubles: 5, triples: 0 },
  { name: "Boomerang Bro", image: "assets/images/boomerang bro.png", class: "Power", avg: 0.48, gp: 34, hr: 17, pa: 125, hits: 60, slg: 0.925, obp: 0.488, doubles: 2, triples: 1 },
  { name: "Borat", image: "assets/images/borat.jpg", class: "Balanced", avg: 0.381, gp: 34, hr: 0, pa: 139, hits: 53, slg: 0.419, obp: 0.381, doubles: 5, triples: 0 },
  { name: "Bowser Jr", image: "assets/images/bowser jr.png", class: "Technique", avg: 0.455, gp: 34, hr: 3, pa: 132, hits: 60, slg: 0.566, obp: 0.454, doubles: 5, triples: 0 },
  { name: "Bowser", image: "assets/images/bowser.png", class: "Power", avg: 0.562, gp: 34, hr: 34, pa: 144, hits: 81, slg: 1.394, obp: 0.563, doubles: 10, triples: 3 },
  { name: "Brown Kritter", image: "assets/images/brown kritter.png", class: "Power", avg: 0.456, gp: 34, hr: 18, pa: 125, hits: 57, slg: 0.977, obp: 0.464, doubles: 6, triples: 1 },
  { name: "Caillou", image: "assets/images/caillou.jpg", class: "Balanced", avg: 0.333, gp: 10, hr: 1, pa: 39, hits: 13, slg: 0.436, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Captain Jack Sparrow", image: "assets/images/captain jack sparrow.jpg", class: "Balanced", avg: 0.407, gp: 8, hr: 1, pa: 27, hits: 11, slg: 0.538, obp: 0.407, doubles: 0, triples: 0 },
  { name: "Carby", image: "assets/images/carby.jpg", class: "Balanced", avg: 0.5, gp: 14, hr: 2, pa: 56, hits: 28, slg: 0.607, obp: 0.5, doubles: 0, triples: 0 },
  { name: "Chicken", image: "assets/images/chicken.jpg", class: "Balanced", avg: 0.453, gp: 26, hr: 1, pa: 95, hits: 43, slg: 0.494, obp: 0.453, doubles: 1, triples: 0 },
  { name: "Chickenrice", image: "assets/images/chickenrice.jpg", class: "Balanced", avg: 0.308, gp: 4, hr: 0, pa: 13, hits: 4, slg: 0.385, obp: 0.308, doubles: 1, triples: 0 },
  { name: "Daisy", image: "assets/images/daisy.png", class: "Power", avg: 0.476, gp: 32, hr: 5, pa: 124, hits: 59, slg: 0.697, obp: 0.476, doubles: 9, triples: 1 },
  { name: "Dark Bones", image: "assets/images/dark bones.png", class: "Balanced", avg: 0.654, gp: 34, hr: 12, pa: 136, hits: 89, slg: 1.008, obp: 0.661, doubles: 12, triples: 0 },
  { name: "Diddy Kong", image: "assets/images/diddy kong.png", class: "Technique", avg: 0.481, gp: 34, hr: 1, pa: 133, hits: 64, slg: 0.56, obp: 0.481, doubles: 7, triples: 0 },
  { name: "Diminutive", image: "assets/images/diminutive.jpg", class: "Balanced", avg: 0.308, gp: 4, hr: 1, pa: 13, hits: 4, slg: 0.538, obp: 0.308, doubles: 0, triples: 0 },
  { name: "Dixie Kong", image: "assets/images/dixie kong.png", class: "Balanced", avg: 0.526, gp: 21, hr: 2, pa: 78, hits: 41, slg: 0.628, obp: 0.525, doubles: 2, triples: 0 },
  { name: "Donkey Kong", image: "assets/images/donkey kong.png", class: "Power", avg: 0.615, gp: 34, hr: 36, pa: 135, hits: 83, slg: 1.461, obp: 0.615, doubles: 5, triples: 0 },
  { name: "Dry Bones", image: "assets/images/dry bones.png", class: "Balanced", avg: 0.618, gp: 34, hr: 13, pa: 131, hits: 81, slg: 1.063, obp: 0.619, doubles: 11, triples: 3 },
  { name: "Dwayne Wade", image: "assets/images/dwayne wade.jpg", class: "Balanced", avg: 0.462, gp: 34, hr: 2, pa: 117, hits: 54, slg: 0.513, obp: 0.461, doubles: 0, triples: 0 },
  { name: "Epiccooper", image: "assets/images/epiccooper.jpg", class: "Balanced", avg: 0.5, gp: 4, hr: 0, pa: 16, hits: 8, slg: 0.563, obp: 0.5, doubles: 1, triples: 0 },
  { name: "Fire Bro", image: "assets/images/fire bro.png", class: "Power", avg: 0.558, gp: 34, hr: 34, pa: 138, hits: 77, slg: 1.334, obp: 0.558, doubles: 4, triples: 0 },
  { name: "Frozone", image: "assets/images/frozone.jpg", class: "Balanced", avg: 0.4, gp: 10, hr: 3, pa: 40, hits: 16, slg: 0.625, obp: 0.4, doubles: 0, triples: 0 },
  { name: "Funky Kong", image: "assets/images/funky kong.png", class: "Power", avg: 0.45, gp: 34, hr: 17, pa: 131, hits: 59, slg: 0.92, obp: 0.465, doubles: 2, triples: 2 },
  { name: "Gandalf", image: "assets/images/gandalf.jpg", class: "Balanced", avg: 0.324, gp: 10, hr: 1, pa: 34, hits: 11, slg: 0.412, obp: 0.324, doubles: 0, triples: 0 },
  { name: "Ghandi", image: "assets/images/ghandi.jpg", class: "Balanced", avg: 0.154, gp: 4, hr: 0, pa: 13, hits: 2, slg: 0.154, obp: 0.154, doubles: 0, triples: 0 },
  { name: "Green Dry Bones", image: "assets/images/green dry bones.png", class: "Balanced", avg: 0.544, gp: 34, hr: 13, pa: 136, hits: 74, slg: 0.86, obp: 0.544, doubles: 2, triples: 1 },
  { name: "Green Magikoopa", image: "assets/images/green magikoopa.png", class: "Balanced", avg: 0.5, gp: 34, hr: 2, pa: 120, hits: 60, slg: 0.583, obp: 0.5, doubles: 4, triples: 0 },
  { name: "Green Noki", image: "assets/images/green noki.png", class: "Balanced", avg: 0.174, gp: 6, hr: 0, pa: 23, hits: 4, slg: 0.217, obp: 0.174, doubles: 1, triples: 0 },
  { name: "Green Shy Guy", image: "assets/images/green shy guy.png", class: "Technique", avg: 0.384, gp: 32, hr: 2, pa: 112, hits: 43, slg: 0.475, obp: 0.373, doubles: 4, triples: 1 },
  { name: "Green Toad", image: "assets/images/green toad.png", class: "Speed", avg: 0.634, gp: 34, hr: 2, pa: 131, hits: 83, slg: 0.844, obp: 0.639, doubles: 11, triples: 4 },
  { name: "Hammer Bro", image: "assets/images/hammer bro.png", class: "Power", avg: 0.535, gp: 34, hr: 30, pa: 129, hits: 69, slg: 1.23, obp: 0.523, doubles: 1, triples: 0 },
  { name: "Helly R", image: "assets/images/helly r.jpg", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.4, obp: 0.4, doubles: 0, triples: 0 },
  { name: "Ice Cube", image: "assets/images/ice cube.jpg", class: "Balanced", avg: 0.367, gp: 8, hr: 0, pa: 30, hits: 11, slg: 0.4, obp: 0.367, doubles: 1, triples: 0 },
  { name: "John 2.0", image: "assets/images/john 2.0.jpg", class: "Balanced", avg: 0.562, gp: 4, hr: 0, pa: 16, hits: 9, slg: 0.6, obp: 0.6, doubles: 0, triples: 0 },
  { name: "John K", image: "assets/images/john k.jpg", class: "Balanced", avg: 0.325, gp: 12, hr: 0, pa: 40, hits: 13, slg: 0.325, obp: 0.325, doubles: 0, triples: 0 },
  { name: "John", image: "assets/images/john.jpg", class: "Balanced", avg: 0.391, gp: 7, hr: 0, pa: 23, hits: 9, slg: 0.421, obp: 0.358, doubles: 1, triples: 0 },
  { name: "KevinG", image: "assets/images/keving.jpg", class: "Balanced", avg: 0.322, gp: 15, hr: 3, pa: 59, hits: 19, slg: 0.501, obp: 0.322, doubles: 1, triples: 0 },
  { name: "Kim Jong Un", image: "assets/images/kim jong un.jpg", class: "Balanced", avg: 0.562, gp: 4, hr: 1, pa: 16, hits: 9, slg: 0.75, obp: 0.563, doubles: 0, triples: 0 },
  { name: "King Boo", image: "assets/images/king boo.png", class: "Power", avg: 0.557, gp: 34, hr: 25, pa: 131, hits: 73, slg: 1.155, obp: 0.545, doubles: 2, triples: 0 },
  { name: "King K Rool", image: "assets/images/king k rool.png", class: "Power", avg: 0.621, gp: 34, hr: 40, pa: 140, hits: 87, slg: 1.534, obp: 0.621, doubles: 5, triples: 0 },
  { name: "Koopa Paratroopa", image: "assets/images/koopa paratroopa.png", class: "Balanced", avg: 0.327, gp: 26, hr: 1, pa: 98, hits: 32, slg: 0.377, obp: 0.326, doubles: 2, triples: 0 },
  { name: "Koopa Troopa", image: "assets/images/koopa troopa.png", class: "Speed", avg: 0.4, gp: 15, hr: 0, pa: 50, hits: 20, slg: 0.467, obp: 0.407, doubles: 3, triples: 0 },
  { name: "Kritter", image: "assets/images/kritter.png", class: "Power", avg: 0.573, gp: 34, hr: 24, pa: 143, hits: 82, slg: 1.196, obp: 0.573, doubles: 13, triples: 2 },
  { name: "Lara Croft", image: "assets/images/lara croft.jpg", class: "Balanced", avg: 0.397, gp: 20, hr: 1, pa: 68, hits: 27, slg: 0.471, obp: 0.397, doubles: 2, triples: 0 },
  { name: "Lebron James", image: "assets/images/lebron james.jpg", class: "Balanced", avg: 0.304, gp: 14, hr: 2, pa: 56, hits: 17, slg: 0.454, obp: 0.308, doubles: 2, triples: 0 },
  { name: "Lil Wayne", image: "assets/images/lil wayne.jpg", class: "Balanced", avg: 0.513, gp: 10, hr: 0, pa: 39, hits: 20, slg: 0.615, obp: 0.513, doubles: 4, triples: 0 },
  { name: "Lilo", image: "assets/images/lilo.jpg", class: "Balanced", avg: 0.409, gp: 20, hr: 1, pa: 66, hits: 27, slg: 0.53, obp: 0.409, doubles: 3, triples: 1 },
  { name: "Livvy Dunne", image: "assets/images/livvy dunne.jpg", class: "Balanced", avg: 0.524, gp: 10, hr: 0, pa: 42, hits: 22, slg: 0.524, obp: 0.524, doubles: 0, triples: 0 },
  { name: "Lizzy", image: "assets/images/lizzy.jpg", class: "Balanced", avg: 0.667, gp: 1, hr: 0, pa: 3, hits: 2, slg: 0.667, obp: 0.667, doubles: 0, triples: 0 },
  { name: "Luigi", image: "assets/images/luigi.png", class: "Speed", avg: 0.488, gp: 34, hr: 1, pa: 129, hits: 63, slg: 0.543, obp: 0.489, doubles: 2, triples: 1 },
  { name: "MJ HeeHee", image: "assets/images/mj heehee.jpg", class: "Balanced", avg: 0.426, gp: 17, hr: 1, pa: 61, hits: 26, slg: 0.516, obp: 0.434, doubles: 2, triples: 0 },
  { name: "MLK Jr", image: "assets/images/mlk jr.jpg", class: "Balanced", avg: 0.412, gp: 4, hr: 0, pa: 17, hits: 7, slg: 0.471, obp: 0.412, doubles: 1, triples: 0 },
  { name: "Magikoopa", image: "assets/images/magikoopa.png", class: "Balanced", avg: 0.558, gp: 34, hr: 2, pa: 113, hits: 63, slg: 0.655, obp: 0.557, doubles: 3, triples: 1 },
  { name: "Mario", image: "assets/images/mario.png", class: "Balanced", avg: 0.536, gp: 34, hr: 3, pa: 125, hits: 67, slg: 0.646, obp: 0.537, doubles: 2, triples: 1 },
  { name: "Matt", image: "assets/images/matt.jpg", class: "Balanced", avg: 0.517, gp: 8, hr: 0, pa: 29, hits: 15, slg: 0.517, obp: 0.517, doubles: 0, triples: 0 },
  { name: "Mikasa", image: "assets/images/mikasa.jpg", class: "Balanced", avg: 0.346, gp: 20, hr: 1, pa: 78, hits: 27, slg: 0.422, obp: 0.35, doubles: 3, triples: 0 },
  { name: "Minion", image: "assets/images/minion.jpg", class: "Balanced", avg: 0.398, gp: 28, hr: 0, pa: 98, hits: 39, slg: 0.439, obp: 0.398, doubles: 2, triples: 1 },
  { name: "Miss Casey", image: "assets/images/miss casey.jpg", class: "Balanced", avg: 0.235, gp: 10, hr: 0, pa: 34, hits: 8, slg: 0.294, obp: 0.235, doubles: 2, triples: 0 },
  { name: "Miss Hot", image: "assets/images/miss hot.jpg", class: "Balanced", avg: 0.5, gp: 34, hr: 3, pa: 124, hits: 62, slg: 0.635, obp: 0.5, doubles: 7, triples: 0 },
  { name: "Monty Mole", image: "assets/images/monty mole.png", class: "Speed", avg: 0.371, gp: 10, hr: 1, pa: 35, hits: 13, slg: 0.457, obp: 0.371, doubles: 0, triples: 0 },
  { name: "Mr. Incredible", image: "assets/images/mr incredible.jpg", class: "Balanced", avg: 0.422, gp: 30, hr: 0, pa: 109, hits: 46, slg: 0.459, obp: 0.431, doubles: 3, triples: 0 },
  { name: "Mrs.Claus", image: "assets/images/mrs claus.jpg", class: "Balanced", avg: 0.444, gp: 14, hr: 2, pa: 54, hits: 24, slg: 0.593, obp: 0.444, doubles: 2, triples: 0 },
  { name: "Paragoomba", image: "assets/images/paragoomba.png", class: "Balanced", avg: 0.365, gp: 17, hr: 0, pa: 63, hits: 23, slg: 0.381, obp: 0.365, doubles: 1, triples: 0 },
  { name: "Peach", image: "assets/images/peach.png", class: "Balanced", avg: 0.374, gp: 34, hr: 0, pa: 131, hits: 49, slg: 0.413, obp: 0.359, doubles: 5, triples: 1 },
  { name: "Petey Piranha", image: "assets/images/petey piranha.png", class: "Power", avg: 0.55, gp: 34, hr: 36, pa: 131, hits: 72, slg: 1.389, obp: 0.55, doubles: 2, triples: 0 },
  { name: "Pianta", image: "assets/images/pianta.png", class: "Speed", avg: 0.617, gp: 34, hr: 14, pa: 128, hits: 79, slg: 0.929, obp: 0.601, doubles: 1, triples: 0 },
  { name: "Pink Yoshi", image: "assets/images/pink yoshi.png", class: "Speed", avg: 0.542, gp: 21, hr: 0, pa: 72, hits: 39, slg: 0.67, obp: 0.584, doubles: 6, triples: 0 },
  { name: "Pops", image: "assets/images/pops.jpg", class: "Balanced", avg: 0.556, gp: 4, hr: 1, pa: 18, hits: 10, slg: 0.765, obp: 0.588, doubles: 0, triples: 0 },
  { name: "Purple Toad", image: "assets/images/purple toad.png", class: "Speed", avg: 0.661, gp: 16, hr: 0, pa: 56, hits: 37, slg: 0.743, obp: 0.66, doubles: 4, triples: 0 },
  { name: "Queen Elizabeth", image: "assets/images/queen elizabeth.jpg", class: "Balanced", avg: 0.316, gp: 10, hr: 0, pa: 38, hits: 12, slg: 0.342, obp: 0.316, doubles: 1, triples: 0 },
  { name: "Red Koopa Paratroopa", image: "assets/images/red koopa paratroopa.jpg", class: "Balanced", avg: 0.394, gp: 10, hr: 0, pa: 33, hits: 13, slg: 0.424, obp: 0.394, doubles: 1, triples: 0 },
  { name: "Red Koopa Troopa", image: "assets/images/red koopa troopa.png", class: "Speed", avg: 0.377, gp: 16, hr: 1, pa: 61, hits: 23, slg: 0.475, obp: 0.377, doubles: 3, triples: 0 },
  { name: "Red Kritter", image: "assets/images/red kritter.png", class: "Power", avg: 0.462, gp: 34, hr: 11, pa: 132, hits: 61, slg: 0.775, obp: 0.461, doubles: 6, triples: 0 },
  { name: "Red Magikoopa", image: "assets/images/red magikoopa.png", class: "Balanced", avg: 0.463, gp: 33, hr: 1, pa: 121, hits: 56, slg: 0.539, obp: 0.47, doubles: 5, triples: 0 },
  { name: "Red Noki", image: "assets/images/red noki.png", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.45, obp: 0.4, doubles: 2, triples: 0 },
  { name: "Red Pianta", image: "assets/images/red pianta.png", class: "Speed", avg: 0.554, gp: 34, hr: 9, pa: 130, hits: 72, slg: 0.806, obp: 0.564, doubles: 4, triples: 0 },
  { name: "Red Yoshi", image: "assets/images/red yoshi.png", class: "Speed", avg: 0.371, gp: 27, hr: 2, pa: 97, hits: 36, slg: 0.45, obp: 0.376, doubles: 1, triples: 0 },
  { name: "Rizzler", image: "assets/images/rizzler.jpg", class: "Balanced", avg: 0.444, gp: 14, hr: 1, pa: 54, hits: 24, slg: 0.537, obp: 0.444, doubles: 2, triples: 0 },
  { name: "Saddam Hussein", image: "assets/images/saddam hussein.jpg", class: "Balanced", avg: 0.393, gp: 14, hr: 3, pa: 56, hits: 22, slg: 0.625, obp: 0.393, doubles: 2, triples: 1 },
  { name: "Semenlad", image: "assets/images/semenlad.jpg", class: "Balanced", avg: 0.346, gp: 13, hr: 0, pa: 52, hits: 18, slg: 0.357, obp: 0.35, doubles: 0, triples: 0 },
  { name: "Shy Guy", image: "assets/images/shy guy.png", class: "Technique", avg: 0.438, gp: 22, hr: 0, pa: 80, hits: 35, slg: 0.5, obp: 0.45, doubles: 4, triples: 0 },
  { name: "Snape", image: "assets/images/snape.jpg", class: "Balanced", avg: 0.312, gp: 13, hr: 0, pa: 48, hits: 15, slg: 0.309, obp: 0.309, doubles: 0, triples: 0 },
  { name: "Tiny Kong", image: "assets/images/tiny kong.png", class: "Balanced", avg: 0.452, gp: 34, hr: 1, pa: 135, hits: 61, slg: 0.511, obp: 0.452, doubles: 3, triples: 1 },
  { name: "Toad", image: "assets/images/toad.jpg", class: "Balanced", avg: 0.627, gp: 26, hr: 0, pa: 102, hits: 64, slg: 0.647, obp: 0.627, doubles: 2, triples: 0 },
  { name: "Toadette", image: "assets/images/toadette.png", class: "Balanced", avg: 0.464, gp: 32, hr: 1, pa: 110, hits: 51, slg: 0.535, obp: 0.47, doubles: 2, triples: 1 },
  { name: "Toadsworth", image: "assets/images/toadsworth.png", class: "Balanced", avg: 0.217, gp: 13, hr: 0, pa: 46, hits: 10, slg: 0.248, obp: 0.226, doubles: 1, triples: 0 },
  { name: "Trinity", image: "assets/images/trinity.jpg", class: "Balanced", avg: 0.408, gp: 20, hr: 1, pa: 71, hits: 29, slg: 0.493, obp: 0.408, doubles: 3, triples: 0 },
  { name: "Tsitsipas", image: "assets/images/tsitsipas.jpg", class: "Balanced", avg: 0.333, gp: 6, hr: 0, pa: 21, hits: 7, slg: 0.381, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Tung Tung Tung Sahur", image: "assets/images/tung tung tung sahur.jpg", class: "Balanced", avg: 0.615, gp: 4, hr: 0, pa: 13, hits: 8, slg: 0.692, obp: 0.615, doubles: 1, triples: 0 },
  { name: "Unc", image: "assets/images/unc.jpg", class: "Balanced", avg: 0.512, gp: 34, hr: 7, pa: 127, hits: 65, slg: 0.712, obp: 0.52, doubles: 3, triples: 0 },
  { name: "Waluigi", image: "assets/images/waluigi.png", class: "Technique", avg: 0.533, gp: 34, hr: 0, pa: 122, hits: 65, slg: 0.665, obp: 0.541, doubles: 15, triples: 0 },
  { name: "Wario", image: "assets/images/wario.png", class: "Technique", avg: 0.606, gp: 34, hr: 14, pa: 137, hits: 83, slg: 1.042, obp: 0.639, doubles: 5, triples: 0 },
  { name: "Wiggler", image: "assets/images/wiggler.png", class: "Speed", avg: 0.662, gp: 34, hr: 3, pa: 142, hits: 94, slg: 0.816, obp: 0.662, doubles: 10, triples: 1 },
  { name: "Winnie The Pooh", image: "assets/images/winnie the pooh.jpg", class: "Balanced", avg: 0.4, gp: 4, hr: 1, pa: 15, hits: 6, slg: 0.667, obp: 0.4, doubles: 1, triples: 0 },
  { name: "Yellow Magikoopa", image: "assets/images/yellow magikoopa.png", class: "Balanced", avg: 0.576, gp: 16, hr: 1, pa: 59, hits: 34, slg: 0.71, obp: 0.577, doubles: 2, triples: 1 },
  { name: "Yellow Pianta", image: "assets/images/yellow pianta.png", class: "Speed", avg: 0.578, gp: 34, hr: 4, pa: 135, hits: 78, slg: 0.698, obp: 0.582, doubles: 3, triples: 0 },
  { name: "Yellow Shy Guy", image: "assets/images/yellow shy guy.png", class: "Technique", avg: 0.405, gp: 20, hr: 1, pa: 74, hits: 30, slg: 0.482, obp: 0.406, doubles: 2, triples: 0 },
  { name: "Yellow Toad", image: "assets/images/yellow toad.png", class: "Speed", avg: 0.627, gp: 32, hr: 4, pa: 126, hits: 79, slg: 0.81, obp: 0.627, doubles: 7, triples: 1 },
  { name: "Yellow Yoshi", image: "assets/images/yellow yoshi.png", class: "Speed", avg: 0.378, gp: 10, hr: 0, pa: 37, hits: 14, slg: 0.432, obp: 0.378, doubles: 2, triples: 0 },
  { name: "Yghur", image: "assets/images/yghur.jpg", class: "Balanced", avg: 0.381, gp: 6, hr: 1, pa: 21, hits: 8, slg: 0.571, obp: 0.381, doubles: 1, triples: 0 },
  { name: "Yoshi", image: "assets/images/yoshi.png", class: "Speed", avg: 0.409, gp: 34, hr: 2, pa: 132, hits: 54, slg: 0.49, obp: 0.413, doubles: 4, triples: 0 },
  { name: "Zorro", image: "assets/images/zorro.jpg", class: "Balanced", avg: 0.286, gp: 2, hr: 0, pa: 7, hits: 2, slg: 0.286, obp: 0.286, doubles: 0, triples: 0 },
  { name: "KSI", image: "assets/images/ksi.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Harry Potter", image: "assets/images/Harry Potter.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Dora", image: "assets/images/Dora.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Goomba", image: "assets/images/goomba.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "The Penguin", image: "assets/images/The Penguin.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Handsome Squidward", image: "assets/images/Handsome Squidward.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Light Blue Yoshi", image: "assets/images/Light Blue Yoshi.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Big AJ", image: "assets/images/Big AJ.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Tobey Maguire", image: "assets/images/tobey.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Gus Fring", image: "assets/images/gus.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Taylor Swift", image: "assets/images/taylor.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Angelina Joeli", image: "assets/images/angelina.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Count Dooku", image: "assets/images/countdooku.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Syndrome", image: "assets/images/syndrome.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Beyonce", image: "assets/images/beyonce.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Whoopie Goldberg", image: "assets/images/whoopie.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Evie", image: "assets/images/evie.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Noki", image: "assets/images/Noki.PNG", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 }
];

window.characters = characters;

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {
    
  const pitchingStats = {
  "Baby Daisy": { ip: 2, era: 0.0, baa: 0.143, so: 0 },
  "Baby Luigi": { ip: 1, era: 0.0, baa: 0.4, so: 0 },
  "Baby Peach": { ip: 9, era: 13.79, baa: 0.605, so: 0 },
  "Birdo": { ip: 83, era: 6.24, baa: 0.448, so: 14 },
  "Black Shy Guy": { ip: 1, era: 0.0, baa: 0.6, so: 0 },
  "Black Widow": { ip: 2, era: 10.5, baa: 0.6, so: 0 },
  "Blooper": { ip: 3, era: 16.8, baa: 0.6, so: 0 },
  "Blue Dry Bones": { ip: 10, era: 10.51, baa: 0.561, so: 1 },
  "Blue Kritter": { ip: 7, era: 4.84, baa: 0.397, so: 0 },
  "Blue Shy Guy": { ip: 3, era: 23.33, baa: 0.682, so: 0 },
  "Blue Toad": { ip: 4, era: 5.62, baa: 0.433, so: 1 },
  "Boo": { ip: 103, era: 7.46, baa: 0.515, so: 4 },
  "Boomerang Bro": { ip: 2, era: 3.0, baa: 0.583, so: 0 },
  "Borat": { ip: 3, era: 16.8, baa: 0.63, so: 0 },
  "Bowser": { ip: 92, era: 5.96, baa: 0.464, so: 24 },
  "Bowser Jr": { ip: 63, era: 8.37, baa: 0.503, so: 4 },
  "Brown Kritter": { ip: 2, era: 12.0, baa: 0.455, so: 0 },
  "Caillou": { ip: 2, era: 5.25, baa: 0.385, so: 0 },
  "Carby": { ip: 16, era: 10.34, baa: 0.534, so: 0 },
  "Chicken": { ip: 2, era: 9.0, baa: 0.462, so: 0 },
  "Chickenrice": { ip: 1, era: 5.25, baa: 0.625, so: 0 },
  "Daisy": { ip: 97, era: 7.1, baa: 0.472, so: 1 },
  "Dark Bones": { ip: 37, era: 5.29, baa: 0.405, so: 0 },
  "Diddy Kong": { ip: 59, era: 7.8, baa: 0.497, so: 2 },
  "Dixie Kong": { ip: 3, era: 0.0, baa: 0.286, so: 1 },
  "Donkey Kong": { ip: 109, era: 8.12, baa: 0.503, so: 3 },
  "Dry Bones": { ip: 2, era: 6.0, baa: 0.545, so: 0 },
  "Dwayne Wade": { ip: 9, era: 1.75, baa: 0.395, so: 0 },
  "Fire Bro": { ip: 1, era: 26.25, baa: 0.636, so: 0 },
  "Funky Kong": { ip: 8, era: 5.25, baa: 0.41, so: 0 },
  "Gandalf": { ip: 2, era: 5.25, baa: 0.588, so: 0 },
  "Green Dry Bones": { ip: 5, era: 13.8, baa: 0.53, so: 0 },
  "Green Magikoopa": { ip: 16, era: 10.84, baa: 0.546, so: 0 },
  "Green Shy Guy": { ip: 2, era: 17.5, baa: 0.545, so: 1 },
  "Hammer Bro": { ip: 4, era: 16.62, baa: 0.635, so: 0 },
  "John K": { ip: 5, era: 9.8, baa: 0.542, so: 0 },
  "KevinG": { ip: 24, era: 6.42, baa: 0.386, so: 2 },
  "King Boo": { ip: 33, era: 9.58, baa: 0.548, so: 0 },
  "King K Rool": { ip: 12, era: 7.95, baa: 0.424, so: 0 },
  "Koopa Paratroopa": { ip: 3, era: 0.0, baa: 0.389, so: 1 },
  "Koopa Troopa": { ip: 1, era: 21.0, baa: 0.667, so: 0 },
  "Kritter": { ip: 7, era: 8.06, baa: 0.452, so: 1 },
  "Lebron James": { ip: 2, era: 6.0, baa: 0.222, so: 0 },
  "Lilo": { ip: 2, era: 3.5, baa: 0.429, so: 0 },
  "Luigi": { ip: 126, era: 6.29, baa: 0.46, so: 12 },
  "Magikoopa": { ip: 44, era: 9.4, baa: 0.53, so: 1 },
  "Mario": { ip: 108, era: 6.74, baa: 0.478, so: 7 },
  "Mikasa": { ip: 1, era: 21.0, baa: 0.727, so: 0 },
  "Minion": { ip: 11, era: 12.25, baa: 0.544, so: 1 },
  "Miss Casey": { ip: 5, era: 13.59, baa: 0.529, so: 0 },
  "Miss Hot": { ip: 2, era: 0.0, baa: 0.1, so: 0 },
  "Monty Mole": { ip: 35, era: 5.94, baa: 0.451, so: 0 },
  "Mr. Incredible": { ip: 54, era: 5.41, baa: 0.458, so: 1 },
  "Mrs.Claus": { ip: 5, era: 2.58, baa: 0.37, so: 0 },
  "Paragoomba": { ip: 41, era: 7.02, baa: 0.451, so: 0 },
  "Peach": { ip: 104, era: 7.19, baa: 0.476, so: 3 },
  "Pianta": { ip: 15, era: 7.35, baa: 0.504, so: 0 },
  "Pink Yoshi": { ip: 1, era: 21.0, baa: 0.778, so: 0 },
  "Red Kritter": { ip: 6, era: 9.62, baa: 0.543, so: 0 },
  "Red Magikoopa": { ip: 46, era: 7.97, baa: 0.496, so: 0 },
  "Red Pianta": { ip: 3, era: 14.0, baa: 0.595, so: 0 },
  "Red Yoshi": { ip: 1, era: 21.0, baa: 0.6, so: 0 },
  "Rizzler": { ip: 4, era: 8.08, baa: 0.579, so: 0 },
  "Saddam Hussein": { ip: 1, era: 26.25, baa: 0.75, so: 0 },
  "Tiny Kong": { ip: 7, era: 2.57, baa: 0.367, so: 0 },
  "Toad": { ip: 4, era: 8.75, baa: 0.372, so: 0 },
  "Toadette": { ip: 1, era: 0.0, baa: 0.429, so: 0 },
  "Toadsworth": { ip: 20, era: 10.7, baa: 0.538, so: 1 },
  "Trinity": { ip: 90, era: 4.99, baa: 0.462, so: 2 },
  "Tung Tung Tung Sahur": { ip: 1, era: 0.0, baa: 0.0, so: 0 },
  "Unc": { ip: 6, era: 5.25, baa: 0.568, so: 0 },
  "Waluigi": { ip: 47, era: 4.28, baa: 0.428, so: 2 },
  "Wario": { ip: 50, era: 9.96, baa: 0.523, so: 3 },
  "Wiggler": { ip: 3, era: 1.75, baa: 0.333, so: 0 },
  "Yellow Magikoopa": { ip: 32, era: 7.58, baa: 0.416, so: 1 },
  "Yellow Pianta": { ip: 7, era: 9.0, baa: 0.551, so: 0 },
  "Yellow Toad": { ip: 5, era: 7.15, baa: 0.464, so: 0 },
  "Yellow Yoshi": { ip: 4, era: 21.0, baa: 0.656, so: 0 },
  "Yoshi": { ip: 70, era: 6.99, baa: 0.478, so: 1 },
};
      

  function renderCharacters(data, usePitching = false) {
    characterGrid.innerHTML = '';
    data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    // Filter for Mii characters if we're in Miis mode
    if (window.displayMode === "miis") {
      data = data
        .filter(char => miiMeta.hasOwnProperty(char.name))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    data.forEach(char => {
      const card = document.createElement('div');
      card.className = 'character-card card-hover-pop';
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
      card.setAttribute('data-mvps', mvpCounts[char.name] || 0);
      card.dataset.name = char.name;
      


  
      const miiInfo = miiMeta[char.name];
      const genderBadge = miiMeta.hasOwnProperty(char.name)
        ? `<div class="mii-badge" style="background-color:white; color:black;">Mii</div>`
        : '';



      const mvpCount = mvpCounts[char.name];
      const mvpBadge = (window.displayMode === "miis")
        ? ''  // ❌ No MVP badge for Miis
        : (mvpCount ? `<div class="mvp-badge">${mvpCount}⭐</div>` : '');

        
  
      let statSection = '';
      if (window.displayMode === "miis") {
        statSection = ''; // 🔇 No stats on Miis page
      } else if (usePitching) {
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
        ${mvpBadge}
        ${(window.displayMode !== "miis" && playoffMvpCounts[char.name]) ? 
          `<div class="playoff-mvp-badge">${playoffMvpCounts[char.name]}💎</div>` : ''}
        <img src="${char.image}" alt="${char.name}">
        <h3>${char.name}</h3>
        ${window.displayMode !== "miis" ? `<p>Class: ${char.class}</p>` : ''}
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
    const container = document.getElementById('characterGrid');
    
    // Convert NodeList to array and sort
    const cards = Array.from(container.querySelectorAll('.character-card')).filter(c => c.style.display !== 'none');
  
    cards.sort((a, b) => {
      let aVal, bVal;

      // In the sortCharacters function, add this case to the sorting logic:
      if (sortBy === 'playoffmvps') {
        aVal = playoffMvpCounts[a.dataset.name] || 0;
        bVal = playoffMvpCounts[b.dataset.name] || 0;
      }
      else if (sortBy === 'mvps') {
        // For MVPs, we'll use the mvpCounts object directly
        aVal = mvpCounts[a.dataset.name] || 0;
        bVal = mvpCounts[b.dataset.name] || 0;
      } else {
        // Existing sorting logic for other stats
        aVal = parseFloat(a.dataset[sortBy]);
        bVal = parseFloat(b.dataset[sortBy]);
      }
      
      return bVal - aVal; // Descending order
    });
  
    // Re-append in sorted order
    cards.forEach(card => container.appendChild(card));
  }
  
  

  function resetFilters() {
    // Reset all select and input filters inside both filter divs
    ['battingFilters', 'pitchingFilters'].forEach(id => {
      const container = document.getElementById(id);
      if (!container) return;
      
      container.querySelectorAll('select').forEach(sel => sel.value = '>');
      container.querySelectorAll('input').forEach(input => input.value = '');
    });
  
    // Reset sort dropdown
    document.getElementById('sortOption').value = '';
  
    // Show all cards again
    document.querySelectorAll('.character-card').forEach(card => {
      card.style.display = 'block';
    });
  
    // Re-render with correct mode
    renderCharacters(characters, showingPitching);
  }
  
  
  
  

  document.getElementById('classFilter').addEventListener('change', applyFilters);
  document.getElementById('avgFilter').addEventListener('input', applyFilters);
  document.getElementById('avgOperator').addEventListener('change', applyFilters);
  document.getElementById('gamesFilter').addEventListener('input', applyFilters);
  document.getElementById('gamesOperator').addEventListener('change', applyFilters);
  document.getElementById('gpFilter').addEventListener('input', applyFilters);
  document.getElementById('gpOperator').addEventListener('change', applyFilters);
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
        <option value="avg">Batting Average</option>
        <option value="obp">On-Base %</option>
        <option value="slg">Slugging %</option>
        <option value="pa">Plate Appearances</option>
        <option value="hits">Hits</option>
        <option value="doubles">Doubles</option>
        <option value="triples">Triples</option>
        <option value="games">Home Runs</option>
        <option value="gp">Games Played</option>
        <option value="mvps">MVPs</option>
        <option value="playoffmvps">Playoff MVPs</option>
      `;
    
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
        "Dad's Brother": ["Bowser", "Boomerang Bro", "Blue Dry Bones", "Unc", "Blue Shy Guy", "Magikoopa", "Saddam Hussein", "Kim Jong Un", "Ghandi", "Lara Croft", "Gandalf", "Red Koopa Troopa", "Red Koopa Paratroopa"],
        "Kronos Unveiled": ["Donkey Kong", "Wario", "Dry Bones", "Black Shy Guy", "Boo", "Frozone", "Miss Hot", "Tiny Kong", "Yellow Shy Guy", "Monty Mole", "John K", "Evie", "Light Blue Yoshi"],
        Tom: ["Petey Piranha", "Dark Bones", "Mario", "Red Kritter", "Baby Daisy", "Diminutive", "Tung Tung Tung Sahur", "Carby", "Red Yoshi", "Tobey Maguire", "Harry Potter", "Tsitsipas"],
        BenT: ["King K Rool", "King Boo", "Blue Kritter", "Green Dry Bones", "Green Toad", "Mrs.Claus", "Green Shy Guy", "Peach", "Gus Fring", "Koopa Troopa", "Toadsworth", "Koopa Paratroopa", "Borat"],
        "Bowser Jr. Had a Wet Dream": ["Fire Bro", "Wiggler", "Yellow Pianta", "Toad", "Bowser Jr", "KevinG", "Yellow Magikoopa", "MLK Jr", "Blooper", "Semenlad", "Yellow Yoshi", "Goomba", "MJ HeeHee"],
        "Birdo Backshots V2": ["Birdo", "Funky Kong", "Red Pianta", "Pianta", "Purple Toad", "Shy Guy", "Dwayne Wade", "Winnie The Pooh", "Dixie Kong", "Chicken", "Big AJ", "Yghur", "Blue Yoshi"],
        "Toadette's Hot Girl Summer": ["Hammer Bro", "Blue Toad", "Luigi", "Daisy", "Yellow Toad", "Green Magikoopa", "Toadette", "Waluigi", "Syndrome", "Beyonce", "Pink Yoshi", "Lilo", "Taylor Swift", "Red Magikoopa"],
        "LeBron's I Promise School": ["Kritter", "Brown Kritter", "Baby DK", "Diddy Kong", "Pops", "Paragoomba", "Yoshi", "Baby Peach", "Rizzler", "Lebron James", "Baby Luigi", "Baby Mario", "Noki"]
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
    card.className = 'character-card card-hover-pop' + (isCaptain ? ' captain-card' : '');
    
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

    const mvpCount = mvpS3Counts[char.name];
    const mvpBadge = mvpCount
      ? `<div class="mvp-badge">${mvpCount}⭐</div>`
      : '';


    card.innerHTML = `
      ${badge}
      ${mvpBadge}
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
  document.getElementById('gpFilter').addEventListener('input', applySeason3Filters);
  document.getElementById('gpOperator').addEventListener('change', applySeason3Filters);
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
      const gpVal = parseInt(document.getElementById('gpFilter').value);
      const gpOp = document.getElementById('gpOperator').value;

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
  document.getElementById('gpFilter').value = '';
  document.getElementById('gpOperator').value = '>';
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




  
  
