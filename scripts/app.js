//UPDATE STANDINGS ONLY HERE< THEN COMMIT AND PUSH TO AUTO DEPLOY
let currentSortKey = null;
let currentSortDirection = 'desc';

const ALL_TIME_STATS_API = "https://script.google.com/macros/s/AKfycbw7FuRb4HUku3yAFZa67zUsMw9uOu_XJXW8Eo9xbTZsTiHSBGx7uUozM4mrx89sO6ra/exec";

async function loadAllTimeCharacterStats() {
  try {
    const res = await fetch(`${ALL_TIME_STATS_API}?mode=allTimeStats&t=${Date.now()}`);
    const data = await res.json();

    window.characters = data.characters || [];
    window.pitchingStats = data.pitchingStats || {};

    console.log("✅ Loaded all-time character stats:", window.characters.length);
  } catch (err) {
    console.error("❌ Failed to load all-time character stats:", err);
    window.characters = [];
    window.pitchingStats = {};
  }
}

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
    "Borat": { gender: "M", color: "yellow" },
    "Dwayne Wade": { gender: "M", color: "green" },
    "Lara Croft": { gender: "F", color: "pink" },
    "MJ HeeHee": { gender: "F", color: "red" },
    "Matt": { gender: "M", color: "purple" },
    "Miss Hot": { gender: "F", color: "green" },
    "Unc": { gender: "M", color: "red" },
    "Rizzler": { gender: "F", color: "blue" },
    "Carby": { gender: "M", color: "yellow" },
    "Lebron James": { gender: "M", color: "brown" },
    "Livvy Dunne": { gender: "F", color: "yellow" },
    "KevinG": { gender: "M", color: "white" },
    "Winnie The Pooh": { gender: "M", color: "lightgreen" },
    "Tung Tung Tung Sahur": { gender: "M", color: "blue" },
    "Pops": { gender: "M", color: "black" },
    "Ghandi": { gender: "M", color: "orange" },
    "Diminutive": { gender: "M", color: "pink" },
    "Charlie Kirk": { gender: "M", color: "lightblue"},
    "Badlands": { gender: "F", color: "brown"}
  };

window.miiMeta = miiMeta;

  

// Sample MVP Data
const mvps = [
  {
        name: "Bowser",
        team: "Julian (x2), BenT, HarryKirch",
        mvps: 17,
        image: "assets/images/bowser1.png",
        stats: "+7 Playoff MVPs"
    },
        {
        name: "Brown Kritter",
        team: "BenR (x2), BenT, Kircher",
        mvps: 12,
        image: "assets/images/bkrit.png",
        stats: "+2 Playoff MVPs"
    },
       {
      name: "Petey Piranha",
      team: "Jmo, HarryKirch, Carby, Tom",
      mvps: 12,
      image: "assets/images/petey.png",
      stats: "+4 Playoff MVPs"
    },
    {
        name: "Fire Bro",
        team: "Kircher (x2), Jmo, Carby",
        mvps: 11,
        image: "assets/images/fbro.png",
        stats: "+2 Playoff MVPs"
    },
   
    {
        name: "King K Rool",
        team: "BenT (x2), BenR (x2)",
        mvps: 11,
        image: "assets/images/krool.png",
        stats: "+2 Playoff MVPs"
    },
  
 
   {
      name: "Donkey Kong",
      team: "BenR, Tom, Carby, Kircher",
      mvps: 9,
      image: "assets/images/dk.png",
      stats: "+5 Playoff MVPs"
    },
    {
        name: "Hammer Bro",
        team: "Tom, Jmo, Julian, BenT",
        mvps: 8,
        image: "assets/images/hbro.png",
        stats: "+2 Playoff MVPs"
    },

    {
        name: "Red Kritter",
        team: "Kircher (x3), Tom",
        mvps: 8,
        image: "assets/images/rkrit.png",
        stats: "+2 Playoff MVPs"
    },
    
     {
      name: "Boomerang Bro",
      team: "Kircher, Jmo (x2), Julian",
      mvps: 6,
      image: "assets/images/bbro.png",
      stats: "+1 Playoff MVPs"
    },
    {
    name: "Birdo",
    team: "HarryKirch (x2), Jmo, Tom",
    mvps: 6,
    image: "assets/images/birdonk.png",
    stats: "+2 Playoff MVPs"
  },
    {
      name: "Dry Bones",
      team: "Julian, BenR, HarryKirch, Kircher",
      mvps: 5,
      image: "assets/images/dry.png",
      stats: "+1 Playoff MVPs"
  },
  
    
   
    {
        name: "Unc",
        team: "Julian (x3), BenR",
        mvps: 5,
        image: "assets/images/unc.png",
        stats: "+1 Playoff MVPs"
    },
    {
      name: "Wiggler",
      team: "BenT, HarryKirch, Kircher, Carby",
      mvps: 5,
      image: "assets/images/wiggy.png",
      stats: "+1 Playoff MVPs"
    },
    
    {
      name: "Kritter",
      team: "BenT, BenR (x3)",
      mvps: 5,
      image: "assets/images/krit.png",
      stats: ""
    },
    
    {
      name: "Toad",
      team: "HarryKirch, Kircher, Jmo, Carby",
      mvps: 5,
      image: "assets/images/td1.png",
      stats: ""
    },
    /*
    {
      name: "Pianta",
      team: "Carby, Jmo, BenT, HarryKirch",
      mvps: 4,
      image: "assets/images/bbb.png",
      stats: ""
    },
    {
      name: "Red Pianta",
      team: "Tom, Kircher, Jmo, HarryKirch",
      mvps: 3,
      image: "assets/images/red_pianta.png",
      stats: ""
    },
    {
      name: "King Boo",
      team: "Carby (x2), Tom, BenT",
      mvps: 3,
      image: "assets/images/king.png",
      stats: ""
    },
    {
      name: "Wario",
      team: "Carby, Jmo, Kircher (x2)",
      mvps: 3,
      image: "assets/images/wario_1.png",
      stats: ""
    },
    {
      name: "Blue Toad",
      team: "Jmo (x4)",
      mvps: 3,
      image: "assets/images/bluett.png",
      stats: ""
    },
    
    {
      name: "Yellow Pianta",
      team: "BenT, HarryKirch (x2), Carby",
      mvps: 3,
      image: "assets/images/bby.png",
      stats: ""
    },
    */
    
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
    ],
    "Season4": [
        { team: "(Carby) Bowser Jr. Had a Wet Dream", wins: 7, losses: 3, diff: 24 },
        { team: "(Jmo) Toadette's Hot Girl Summer", wins: 7, losses: 3, diff: 17 },
        { team: "(Julian) Dad's Brother", wins: 7, losses: 3, diff: 14 },
        { team: "(HarryKirch) Birdo Backshots V2", wins: 5, losses: 5, diff: 11 },
        { team: "(Tom) Petey's Piss Pioneers", wins: 5, losses: 5, diff: 3 },
        { team: "(BenT) BenT", wins: 5, losses: 5, diff: -4 },
        { team: "(BenR) LeBron's I Promise School", wins: 4, losses: 6, diff: -14 },
        { team: "(Kircher) Kronos Unveiled", wins: 0, losses: 10, diff: -51 }
    ],
    "Season5": [
        { team: "(Carby) Bone Bros", wins: 9, losses: 1, diff: 45 },
        { team: "(Kircher) Special K", wins: 8, losses: 2, diff: 25 },
        { team: "(Jmo) The Squid", wins: 5, losses: 5, diff: 4 },
        { team: "(Julian) Mii Horny", wins: 4, losses: 6, diff: 2 },
        { team: "(BenR) Funky LeGooners", wins: 4, losses: 6, diff: -5 },
        { team: "(HarryKirch) Big League Chew: Daisy Flavor", wins: 4, losses: 6, diff: -21 },
        { team: "(Tom) Tom", wins: 3, losses: 7, diff: -19 },
        { team: "(BenT) Is It Pink?", wins: 3, losses: 7, diff: -31 }
    ],
    "Season6": [
        { team: "Tom", wins: 7, losses: 3, diff: 26 },
        { team: "Julian", wins: 7, losses: 3, diff: 23 },
        { team: "Kircher", wins: 7, losses: 3, diff: 11 },
        { team: "Jmo", wins: 7, losses: 3, diff: 10 },
        { team: "Carby", wins: 6, losses: 4, diff: 18 },
        { team: "HarryKirch", wins: 4, losses: 6, diff: -11 },
        { team: "BenT", wins: 2, losses: 8, diff: -50 },
        { team: "BenR", wins: 1, losses: 9, diff: -27 }
    ],
    "Season7": [
        { team: "(BenT) Toad's lil Wiggler", wins: 7, losses: 3, diff: 52 },
        { team: "(Tom) Son's of Kirk", wins: 7, losses: 3, diff: 26 },
        { team: "(Jmo) The Boneyard", wins: 7, losses: 3, diff: 23 },
        { team: "(Kircher) Toadsworth's Disciples", wins: 6, losses: 4, diff: 42 },
        { team: "(HarryKirch) Sluggers Segregation ", wins: 5, losses: 5, diff: -34 },
        { team: "(Julian) The Golden Horde", wins: 4, losses: 6, diff: -15 },
        { team: "(Carby) KevinG's Diaper Delinquents", wins: 2, losses: 8, diff: -18 },
        { team: "(BenR) Mario & Yoshi Sweatshop", wins: 2, losses: 8, diff: -76 }
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
  },

  "Season4": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "(HarryKirch) Birdo Backshots V2", score1: 2, team2: "(Tom) Petey's Piss Pioneers", score2: 1 },
                { team1: "(Julain) Dad's Brother", score1: 2, team2: "(BenT) BenT", score2: 0 }
                
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "(Jmo) Toadette's Hot Girl Summer", score1: 1, team2: "(Julian) Dad's Brother", score2: 2 },
                { team1: "(Carby) Bowser Jr. Had a Wet Dream", score1: 1, team2: "(HarryKirch) Birdo Backshots V2", score2: 2 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "(Julian) Dad's Brother", score1: 1, team2: "(HarryKirch) Birdo Backshots V2", score2: 3}
            ]
        }
    ]
  },
  "Season5": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "(HarryKirch) Big League Chew", score1: 2, team2: "(Kircher) Special K", score2: 1 },
                { team1: "(Julain) Mii Horny", score1: 2, team2: "(BenR) Funky LeGooners", score2: 0 }
                
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "(Jmo) The Squid", score1: 2, team2: "(Julian) Mii Horny", score2: 1 },
                { team1: "(Carby) Bone Bros", score1: 2, team2: "(HarryKirch) Big League Chew", score2: 0 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "(Carby) Bone Bros", score1: 3, team2: "(Jmo) The Squid", score2: 2}
            ]
        }
    ]
  },
  "Season6": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "HarryKirch", score1: 2, team2: "Kircher", score2: 1 },
                { team1: "Carby", score1: 1, team2: "Jmo", score2: 2 }
                
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "Jmo", score1: 1, team2: "Julian", score2: 2 },
                { team1: "Tom", score1: 2, team2: "HarryKirch", score2: 0 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "Tom", score1: 3, team2: "Julian", score2: 1}
            ]
        }
    ]
  },
  "Season7": {
    rounds: [
        {
            name: "Round 1",
            matches: [
                { team1: "(Jmo) The Boneyard", score1: 2, team2: "(Julian) The Golden Horde", score2: 0 },
                { team1: "(Kircher) Toadsworths Disciples", score1: 2, team2: "(HarryKirch) Slugers Segregation", score2: 1 }
                
            ]
        },
        {
            name: "Semifinals",
            matches: [
                { team1: "(Kircher) Toadsworths Disciples", score1: 2, team2: "(BenT) Toads lil Wiggler", score2: 0 },
                { team1: "(Tom) The Sons of Kirk", score1: 2, team2: "(Jmo) The Boneyard", score2: 0 },
            ]
        },
        {
            name: "Finals",
            matches: [
                { team1: "(Kircher) Toadsworths Disciples", score1: 3, team2: "(Tom) The Sons of Kirk", score2: 2}
            ]
        }
    ]
  }
};


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
    Object.keys(standings).forEach(season => {
      updateStandings(season);
    });

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
            updateStandings(this.dataset.season);
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
  "King K Rool": 14,
  "Red Kritter": 10,
  "Donkey Kong": 15,
  "Brown Kritter": 14,
  "Bowser": 26,
  "Unc": 10,
  "Hammer Bro": 11,
  "Fire Bro": 19,
  "Dry Bones": 6,
  "Birdo": 9,
  "Boomerang Bro": 7,
  "Kritter": 11,
  "Funky Kong": 9,
  "Bowser Jr": 2,
  "Daisy": 2,
  "Lil Wayne": 2,
  "Red Pianta": 10,
  "King Boo": 5,
  "Green Toad": 3,
  "Mario": 3,
  "Wario": 3,
  "Blue Toad": 4,
  "Wiggler": 7,
  "Toad": 8,
  "John 2.0": 1,
  "Boo": 2,
  "Borat": 2,
  "Baby Daisy": 1,
  "Dixie Kong": 1,
  "Black Widow": 1,
  "Miss Hot": 4,
  "Blue Dry Bones": 2,
  "Dark Bones": 1,
  "Green Magikoopa": 2,
  "Blue Kritter": 5,
  "Petey Piranha": 22,
  "Trinity": 1,
  "Yellow Pianta": 10,
  "MJ HeeHee": 1,
  "Magikoopa": 1,
  "Green Dry Bones": 1,
  "Red Magikoopa": 2,
  "Saddam Hussein": 2,
  "Pianta": 7,
  "Yellow Shy Guy": 2,
  "Toadette": 3,
  "Red Yoshi": 2,
  "Yellow Toad": 3,
  "Winnie The Pooh": 1,
  "Red Magikoopa": 1,
  "Lebron James": 2,
  "Mrs.Claus": 1,
  "Green Shy Guy": 3,
  "Diminutive": 2,
  "Tiny Kong": 1,
  "Doc Brown": 1,
  "Blue Yoshi": 1,
  "Yellow Magikoopa": 2,
  "Minion": 1,
  "Pink Yoshi": 1,
  "John K": 1,
  "Chicken": 1,
  "Tung Tung Tung Sahur": 1,
  "Blooper": 2,
  "Yellow Toad": 2,
  "Mr. Incredible": 1,
  "Noki": 1,
  "Dwayne Wade": 1,
  "Tobey Maguire": 1,
  "Genghis Khan": 1,
  "Frozone": 1,
  "Peach": 1,
};

const playoffMvpCounts = {
  "Bowser": 14,
  "Donkey Kong": 9,
  "Petey Piranha": 9,
  "Brown Kritter": 2,
  "Red Kritter": 2,
  "Green Dry Bones": 2,
  "Blue Dry Bones": 3,
  "Fire Bro": 6,
  "King K Rool": 2,
  "Birdo": 3,
  "Toadette": 1,
  "Pianta": 7,
  "Funky Kong": 1,
  "Unc": 7,
  "MJ HeeHee": 1,
  "Wiggler": 2,
  "Boomerang Bro": 4,
  "Yellow Toad": 1,
  "Mrs.Claus": 1,
  "Hammer Bro": 2,
  "Yellow Pianta": 2,
  "Mario": 1,
  "Dry Bones": 1,
  "Winnie The Pooh": 1,
  "Red Pianta": 3,
  "Dixie Kong": 1,
  "Blue Kritter": 3,
  "Dwayne Wade": 2,
  "Baby Luigi": 1,
  "Doc Brown": 1,
  "Wario": 1,
  "John K": 1,
  "Tung Tung Tung Sahur": 3,
  "Kritter": 1,
  "Frozone": 1,
};

window.mvpS3Counts = {
  "Brido": 1,
  "Fire Bro": 3,
  "Green Magikoopa": 1,
  "Kritter": 1,
  "King K Rool": 1,
  "Boomerang Bro": 1,
  "Donkey Kong": 2,
  "Red Pianta": 2,
  "Unc": 2,
  "Peach": 1,
  "Blue Kritter": 1,
  "Brown Kritter": 1,
  "Green Shy Guy": 1,
  "Pianta": 1,
  "Red Yoshi": 1,
  "Yellow Toad": 1,
  "Yellow Pianta": 1,
  "Petey Piranha": 2,
  "Funky Kong": 2,
  "Lebron James": 1


};

const championCounts = {
  "Baby DK": 2,
  "Brown Kritter": 1,
  "Diddy Kong": 2,
  "Dixie Kong": 2,
  "Donkey Kong": 2,
  "Funky Kong": 4,
  "Ice Cube": 1,
  "Lil Wayne": 1,
  "Tiny Kong": 2,
  "Dark Bones": 2,
  "Bowser": 2,
  "Fire Bro": 3,
  "Yellow Toad": 1,
  "Borat": 1,
  "Mrs.Claus": 1,
  "Yellow Shy Guy": 1, 
  "Paragoomba": 1,
  "Yoshi": 2,
  "Petey Piranha": 1,
  "Yellow Pianta": 1,
  "Tsitsipas": 1,
  "Frozone": 2,
  "Purple Toad": 1,
  "Pianta": 1,
  "Shy Guy": 1,
  "Birdo": 1,
  "Dwayne Wade": 1,
  "Red Pianta": 2,
  "Winnie The Pooh": 1,
  "Wario": 1,
  "Boomerang Bro": 1,
  "Yellow Magikoopa": 1,
  "Carby": 1,
  "Doc Brown": 1,
  "Rizzler": 1,
  "Dry Bones": 1,
  "Luigi": 1,
  "Daisy": 1,
  "Tung Tung Tung Sahur": 1,
  "Saka": 1,
  "Red Magikoopa": 1,
  "Red Yoshi": 1,
  "Blue Dry Bones": 1,
  "Blue Kritter": 1,
  "Blue Yoshi": 1,
  "Toadsworth": 1,
  "Blue Shy Guy": 1,
  "Noki": 1,
  "Mr. Incredible": 1,
  "Syndrome": 1,

};

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {

  document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

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
      card.setAttribute('data-champs', championCounts[char.name] || 0);
      card.dataset.name = char.name;
      


  
      const miiInfo = miiMeta[char.name];
      const genderBadge = miiMeta.hasOwnProperty(char.name)
        ? `<div class="mii-badge" style="background-color:white; color:black;">Mii</div>`
        : '';



      const mvpCount = mvpCounts[char.name];
      const mvpBadge = (window.displayMode === "miis")
        ? ''  // ❌ No MVP badge for Miis
        : (mvpCount ? `<div class="mvp-badge">${mvpCount}⭐</div>` : '');

      const champCount = championCounts[char.name];
      const championBadge = (window.displayMode === "miis")
        ? ''  // ❌ No champion badge for Miis
        : (champCount ? `<div class="champion-badge">${champCount}👑</div>` : '');


        
  
      let statSection = '';
      if (window.displayMode === "miis") {
        statSection = ''; // 🔇 No stats on Miis page
      } else if (usePitching) {
        if (window.pitchingStats[char.name]) {
          const p = window.pitchingStats[char.name];
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
        ${championBadge}
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
        const so = parseInt(window.pitchingStats[card.dataset.name]?.so ?? 0);

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
      } 
      else if (sortBy === 'champs') {
      aVal = championCounts[a.dataset.name] || 0;
      bVal = championCounts[b.dataset.name] || 0;
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
    renderCharacters(window.characters, showingPitching);
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

  showLoader?.("🧢 Loading Characters...");

  loadAllTimeCharacterStats()
    .then(() => {
      renderCharacters(window.characters, showingPitching);
    })
    .finally(() => {
      hideLoader?.();
    });

  

  document.getElementById('toggleStatsBtn').addEventListener('click', () => {
    showingPitching = !showingPitching;
  
    renderCharacters(window.characters, showingPitching);
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
        <option value="champs">Championships</option>
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
  
  const teamRosters = window.teamRosters;

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




  
  
