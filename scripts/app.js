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
    "Borat": { gender: "M", color: "yellow" },
    "Captain Jack Sparrow": { gender: "M", color: "white" },
    "Chicken": { gender: "F", color: "blue" },
    "Dwayne Wade": { gender: "M", color: "yellow" },
    "Ice Cube": { gender: "M", color: "lightgreen" },
    "Mr. Incredible": { gender: "M", color: "blue" },
    "John": { gender: "M", color: "lightgreen" },
    "KevinG": { gender: "M", color: "orange" },
    "Lara Croft": { gender: "F", color: "purple" },
    "Lilo": { gender: "F", color: "green" },
    "MJ HeeHee": { gender: "M", color: "lightblue" },
    "Matt": { gender: "F", color: "pink" },
    "Mikasa": { gender: "F", color: "green" },
    "Minion": { gender: "F", color: "red" },
    "Miss Hot": { gender: "F", color: "yellow" },
    "Semenlad": { gender: "M", color: "black" },
    "Snape": { gender: "M", color: "lightblue" },
    "Trinity": { gender: "F", color: "purple" },
    "Unc": { gender: "M", color: "red" },
    "Lil Wayne": { gender: "M", color: "brown" },
    "Kim Jong Un": { gender: "F", color: "red" },
    "Frozone": { gender: "F", color: "blue" },
    "The Penguin": { gender: "M", color: "purple" },
    "Handsome Squidward": { gender: "F", color: "brown" },
    "Harry Potter": { gender: "M", color: "lightgreen" },
    "Rizzler": { gender: "M", color: "pink" },
    "Tsitsipas": { gender: "F", color: "pink" },
    "Dora": { gender: "F", color: "pink" },
    "KSI": { gender: "F", color: "brown" },
    "Big AJ": { gender: "M", color: "white" },
    "Carby": { gender: "M", color: "yellow" },
    "Lebron James": { gender: "M", color: "orange" },
    "Lizzy": { gender: "F", color: "lightgreen" },
    "Saddam Hussein": { gender: "M", color: "pink" },
    "Livvy Dunne": { gender: "F", color: "yellow" },
    "Caillou": { gender: "M", color: "purple" },
    "Epiccooper": { gender: "M", color: "purple" },
    "Gandalf": { gender: "M", color: "blue" },
    "Helly R": { gender: "F", color: "blue" },
    "John 2.0": { gender: "M", color: "black" },
    "John K": { gender: "F", color: "yellow" },
    "KevinG": { gender: "M", color: "green" },
    "Miss Casey": { gender: "F", color: "white" },
    "Mrs.Claus": { gender: "F", color: "green" },
    "Queen Elizabeth": { gender: "M", color: "brown" },
    "Yghur": { gender: "M", color: "orange" },
    "Zorro": { gender: "M", color: "black" },
    "Chickenrice": { gender: "M", color: "blue" },
    "Winnie The Pooh": { gender: "M", color: "purple" },
    "Tobey Maguire": { gender: "M", color: "white" },
    "Gus Fring": { gender: "F", color: "green" },
    "Tung Tung Tung Sahur": { gender: "F", color: "brown" },
    "Taylor Swift": { gender: "M", color: "pink" },
    "Angelina Joeli": { gender: "M", color: "blue" },
    "Pops": { gender: "M", color: "brown" },
    "Ghandi": { gender: "F", color: "brown" },
    "Count Dooku": { gender: "M", color: "blue" },
    "MLK Jr": { gender: "F", color: "lightblue" },
    "Syndrome": { gender: "M", color: "purple" },
    "Beyonce": { gender: "F", color: "orange" },
    "Whoopie Goldberg": { gender: "M", color: "blue" },
    "Evie": { gender: "F", color: "yellow" },
    "Diminutive": { gender: "F", color: "orange" },
    "Bowler": { gender: "F", color: "green" },
    "Doc Brown": { gender: "F", color: "green" },
    "Saka": { gender: "M", color: "red" },
    "Cole Palmer": { gender: "F", color: "lightgreen" },
    "Vicar": { gender: "F", color: "black" },
    "Idi Amin": { gender: "M", color: "red"},
    "Genghis Khan": { gender: "F", color: "red"},
    "Charlie Kirk": { gender: "M", color: "brown"}
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
  "King K Rool": 13,
  "Red Kritter": 10,
  "Donkey Kong": 12,
  "Brown Kritter": 12,
  "Bowser": 24,
  "Unc": 7,
  "Hammer Bro": 9,
  "Fire Bro": 15,
  "Dry Bones": 6,
  "Birdo": 7,
  "Boomerang Bro": 6,
  "Kritter": 9,
  "Funky Kong": 5,
  "Bowser Jr": 2,
  "Daisy": 2,
  "Lil Wayne": 2,
  "Red Pianta": 6,
  "King Boo": 4,
  "Green Toad": 3,
  "Mario": 2,
  "Wario": 3,
  "Blue Toad": 4,
  "Wiggler": 7,
  "Toad": 7,
  "John 2.0": 1,
  "Boo": 1,
  "Borat": 2,
  "Baby Daisy": 1,
  "Dixie Kong": 1,
  "Black Widow": 1,
  "Miss Hot": 4,
  "Blue Dry Bones": 2,
  "Dark Bones": 1,
  "Green Magikoopa": 1,
  "Blue Kritter": 4,
  "Petey Piranha": 18,
  "Trinity": 1,
  "Yellow Pianta": 6,
  "MJ HeeHee": 1,
  "Magikoopa": 1,
  "Green Dry Bones": 1,
  "Red Magikoopa": 2,
  "Saddam Hussein": 2,
  "Pianta": 6,
  "Yellow Shy Guy": 1,
  "Toadette": 3,
  "Red Yoshi": 1,
  "Yellow Toad": 2,
  "Winnie The Pooh": 1,
  "Red Magikoopa": 1,
  "Lebron James": 1,
  "Mrs.Claus": 1,
  "Green Shy Guy": 2,
  "Diminutive": 2,
  "Tiny Kong": 1,
  "Doc Brown": 1,
  "Blue Yoshi": 1,
  "Yellow Magikoopa": 1,
  "Minion": 1,
  "Pink Yoshi": 1,
  "John K": 1,
  "Chicken": 1,
  "Tung Tung Tung Sahur": 1,
  "Blooper": 1,
  "Yellow Toad": 2,
  "Mr. Incredible": 1,
  "Noki": 1,
  "Dwayne Wade": 1,
  "Tobey Maguire": 1
};

const playoffMvpCounts = {
  "Bowser": 12,
  "Donkey Kong": 9,
  "Petey Piranha": 8,
  "Brown Kritter": 2,
  "Red Kritter": 2,
  "Green Dry Bones": 2,
  "Blue Dry Bones": 2,
  "Fire Bro": 5,
  "King K Rool": 2,
  "Birdo": 2,
  "Toadette": 1,
  "Pianta": 7,
  "Funky Kong": 1,
  "Unc": 7,
  "MJ HeeHee": 1,
  "Wiggler": 2,
  "Boomerang Bro": 3,
  "Yellow Toad": 1,
  "Mrs.Claus": 1,
  "Hammer Bro": 2,
  "Yellow Pianta": 2,
  "Mario": 1,
  "Dry Bones": 1,
  "Winnie The Pooh": 1,
  "Red Pianta": 1,
  "Dixie Kong": 1,
  "Blue Kritter": 1,
  "Dwayne Wade": 1,
  "Baby Luigi": 1,
  "Doc Brown": 1,
  "Wario": 1,
  "John K": 1,
  "Tung Tung Tung Sahur": 3
};

window.mvpS3Counts = {
  "Blooper": 1,
  "Yellow Toad": 2,
  "Toad": 1,
  "Red Kritter": 1,
  "Noki": 1,
  "Mr. Incredible": 1,
  "Petey Piranha": 1,
  "Dwayne Wade": 1,
  "Kritter": 2,
  "Unc": 1,
  "Funky Kong": 1,
  "Red Pianta": 2,
  "Bowser": 1,
  "Yellow Pianta": 1,
  "Tobey Maguire": 1
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
  "Fire Bro": 2,
  "Yellow Toad": 1,
  "Borat": 1,
  "Mrs.Claus": 1,
  "Yellow Shy Guy": 1, 
  "Paragoomba": 1,
  "Yoshi": 2,
  "Petey Piranha": 1,
  "Yellow Pianta": 1,
  "Tsitsipas": 1,
  "Frozone": 1,
  "Purple Toad": 1,
  "Pianta": 1,
  "Shy Guy": 1,
  "Birdo": 1,
  "Dwayne Wade": 1,
  "Red Pianta": 1,
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
  "Red Yoshi": 1

};

const characters = [
  { name: "Baby DK", image: "assets/images/baby dk.png", class: "Speed", avg: 0.482, gp: 64, hr: 7, pa: 249, hits: 120, slg: 0.614, obp: 0.487, doubles: 8, triples: 1 },
  { name: "Baby Daisy", image: "assets/images/baby daisy.png", class: "Power", avg: 0.388, gp: 33, hr: 2, pa: 116, hits: 45, slg: 0.548, obp: 0.385, doubles: 8, triples: 2 },
  { name: "Baby Luigi", image: "assets/images/baby luigi.png", class: "Speed", avg: 0.486, gp: 21, hr: 0, pa: 74, hits: 36, slg: 0.581, obp: 0.487, doubles: 1, triples: 3 },
  { name: "Baby Mario", image: "assets/images/baby mario.png", class: "Speed", avg: 0.344, gp: 8, hr: 0, pa: 32, hits: 11, slg: 0.344, obp: 0.344, doubles: 0, triples: 0 },
  { name: "Baby Peach", image: "assets/images/baby peach.png", class: "Balanced", avg: 0.302, gp: 31, hr: 0, pa: 106, hits: 32, slg: 0.378, obp: 0.302, doubles: 6, triples: 1 },
  { name: "Birdo", image: "assets/images/birdo.png", class: "Power", avg: 0.555, gp: 64, hr: 34, pa: 254, hits: 141, slg: 1.0, obp: 0.559, doubles: 9, triples: 0 },
  { name: "Black Shy Guy", image: "assets/images/black shy guy.png", class: "Technique", avg: 0.379, gp: 35, hr: 0, pa: 116, hits: 44, slg: 0.395, obp: 0.377, doubles: 2, triples: 0 },
  { name: "Black Widow", image: "assets/images/black widow.jpg", class: "Balanced", avg: 0.467, gp: 9, hr: 2, pa: 30, hits: 14, slg: 0.767, obp: 0.467, doubles: 3, triples: 0 },
  { name: "Blooper", image: "assets/images/blooper.png", class: "Balanced", avg: 0.576, gp: 52, hr: 2, pa: 205, hits: 118, slg: 0.68, obp: 0.581, doubles: 10, triples: 1 },
  { name: "Blue Dry Bones", image: "assets/images/blue dry bones.png", class: "Balanced", avg: 0.623, gp: 64, hr: 14, pa: 257, hits: 160, slg: 0.863, obp: 0.624, doubles: 12, triples: 2 },
  { name: "Blue Kritter", image: "assets/images/blue kritter.png", class: "Power", avg: 0.541, gp: 64, hr: 25, pa: 255, hits: 138, slg: 0.899, obp: 0.532, doubles: 11, triples: 3 },
  { name: "Blue Shy Guy", image: "assets/images/blue shy guy.png", class: "Technique", avg: 0.363, gp: 34, hr: 0, pa: 113, hits: 41, slg: 0.41, obp: 0.363, doubles: 5, triples: 0 },
  { name: "Blue Toad", image: "assets/images/blue toad.png", class: "Speed", avg: 0.612, gp: 58, hr: 6, pa: 232, hits: 142, slg: 0.746, obp: 0.612, doubles: 11, triples: 1 },
  { name: "Blue Yoshi", image: "assets/images/blue yoshi.png", class: "Speed", avg: 0.656, gp: 15, hr: 0, pa: 64, hits: 42, slg: 0.79, obp: 0.667, doubles: 3, triples: 2 },
  { name: "Boo", image: "assets/images/boo.png", class: "Speed", avg: 0.463, gp: 53, hr: 1, pa: 177, hits: 82, slg: 0.514, obp: 0.463, doubles: 6, triples: 0 },
  { name: "Boomerang Bro", image: "assets/images/boomerang bro.png", class: "Power", avg: 0.485, gp: 64, hr: 32, pa: 241, hits: 117, slg: 0.916, obp: 0.49, doubles: 4, triples: 1 },
  { name: "Borat", image: "assets/images/borat.jpg", class: "Balanced", avg: 0.393, gp: 40, hr: 1, pa: 163, hits: 64, slg: 0.443, obp: 0.393, doubles: 5, triples: 0 },
  { name: "Bowler", image: "assets/images/bowler.jpg", class: "Balanced", avg: 0.312, gp: 10, hr: 1, pa: 32, hits: 10, slg: 0.438, obp: 0.313, doubles: 1, triples: 0 },
  { name: "Bowser Jr", image: "assets/images/bowser jr.png", class: "Technique", avg: 0.479, gp: 64, hr: 6, pa: 240, hits: 115, slg: 0.626, obp: 0.479, doubles: 15, triples: 0 },
  { name: "Bowser", image: "assets/images/bowser.png", class: "Power", avg: 0.619, gp: 64, hr: 78, pa: 270, hits: 167, slg: 1.603, obp: 0.619, doubles: 20, triples: 5 },
  { name: "Brown Kritter", image: "assets/images/brown kritter.png", class: "Power", avg: 0.463, gp: 63, hr: 41, pa: 244, hits: 113, slg: 1.046, obp: 0.471, doubles: 10, triples: 1 },
  { name: "Caillou", image: "assets/images/caillou.jpg", class: "Balanced", avg: 0.333, gp: 10, hr: 1, pa: 39, hits: 13, slg: 0.436, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Captain Jack Sparrow", image: "assets/images/captain jack sparrow.jpg", class: "Balanced", avg: 0.407, gp: 8, hr: 1, pa: 27, hits: 11, slg: 0.538, obp: 0.407, doubles: 0, triples: 0 },
  { name: "Carby", image: "assets/images/carby.jpg", class: "Balanced", avg: 0.449, gp: 40, hr: 4, pa: 158, hits: 71, slg: 0.613, obp: 0.451, doubles: 8, triples: 2 },
  { name: "Charlie Kirk", image: "assets/images/charlie kirk.jpg", class: "Balanced", avg: 0.333, gp: 4, hr: 0, pa: 15, hits: 5, slg: 0.4, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Chicken", image: "assets/images/chicken.jpg", class: "Balanced", avg: 0.463, gp: 36, hr: 3, pa: 136, hits: 63, slg: 0.559, obp: 0.463, doubles: 4, triples: 0 },
  { name: "Chickenrice", image: "assets/images/chickenrice.jpg", class: "Balanced", avg: 0.308, gp: 4, hr: 0, pa: 13, hits: 4, slg: 0.385, obp: 0.308, doubles: 1, triples: 0 },
  { name: "Count Dooku", image: "assets/images/count dooku.jpg", class: "Balanced", avg: 0.432, gp: 10, hr: 0, pa: 44, hits: 19, slg: 0.545, obp: 0.432, doubles: 3, triples: 1 },
  { name: "Daisy", image: "assets/images/daisy.png", class: "Power", avg: 0.458, gp: 62, hr: 8, pa: 240, hits: 110, slg: 0.659, obp: 0.458, doubles: 18, triples: 2 },
  { name: "Dark Bones", image: "assets/images/dark bones.png", class: "Balanced", avg: 0.634, gp: 64, hr: 20, pa: 268, hits: 170, slg: 0.959, obp: 0.637, doubles: 21, triples: 2 },
  { name: "Diddy Kong", image: "assets/images/diddy kong.png", class: "Technique", avg: 0.511, gp: 61, hr: 2, pa: 233, hits: 119, slg: 0.59, obp: 0.511, doubles: 12, triples: 0 },
  { name: "Diminutive", image: "assets/images/diminutive.jpg", class: "Balanced", avg: 0.41, gp: 20, hr: 2, pa: 78, hits: 32, slg: 0.551, obp: 0.41, doubles: 3, triples: 1 },
  { name: "Dixie Kong", image: "assets/images/dixie kong.png", class: "Balanced", avg: 0.495, gp: 28, hr: 2, pa: 101, hits: 50, slg: 0.587, obp: 0.495, doubles: 3, triples: 0 },
  { name: "Doc Brown", image: "assets/images/doc brown.jpg", class: "Balanced", avg: 0.452, gp: 22, hr: 2, pa: 84, hits: 38, slg: 0.647, obp: 0.452, doubles: 9, triples: 0 },
  { name: "Donkey Kong", image: "assets/images/donkey kong.png", class: "Power", avg: 0.573, gp: 64, hr: 66, pa: 253, hits: 145, slg: 1.387, obp: 0.573, doubles: 6, triples: 0 },
  { name: "Dora", image: "assets/images/dora.jpg", class: "Balanced", avg: 0.514, gp: 10, hr: 0, pa: 35, hits: 18, slg: 0.543, obp: 0.514, doubles: 1, triples: 0 },
  { name: "Dry Bones", image: "assets/images/dry bones.png", class: "Balanced", avg: 0.602, gp: 64, hr: 15, pa: 249, hits: 150, slg: 0.883, obp: 0.605, doubles: 16, triples: 3 },
  { name: "Dwayne Wade", image: "assets/images/dwayne wade.jpg", class: "Balanced", avg: 0.482, gp: 63, hr: 4, pa: 224, hits: 108, slg: 0.558, obp: 0.482, doubles: 3, triples: 1 },
  { name: "Epiccooper", image: "assets/images/epiccooper.jpg", class: "Balanced", avg: 0.5, gp: 4, hr: 0, pa: 16, hits: 8, slg: 0.563, obp: 0.5, doubles: 1, triples: 0 },
  { name: "Fire Bro", image: "assets/images/fire bro.png", class: "Power", avg: 0.596, gp: 64, hr: 65, pa: 260, hits: 155, slg: 1.391, obp: 0.596, doubles: 7, triples: 1 },
  { name: "Frozone", image: "assets/images/frozone.jpg", class: "Balanced", avg: 0.422, gp: 20, hr: 5, pa: 83, hits: 35, slg: 0.611, obp: 0.422, doubles: 0, triples: 0 },
  { name: "Funky Kong", image: "assets/images/funky kong.png", class: "Power", avg: 0.455, gp: 64, hr: 38, pa: 246, hits: 112, slg: 0.996, obp: 0.463, doubles: 5, triples: 3 },
  { name: "Gandalf", image: "assets/images/gandalf.jpg", class: "Balanced", avg: 0.371, gp: 20, hr: 3, pa: 70, hits: 26, slg: 0.553, obp: 0.372, doubles: 1, triples: 1 },
  { name: "Genghis Khan", image: "assets/images/genghis khan.jpg", class: "Balanced", avg: 0.538, gp: 4, hr: 0, pa: 13, hits: 7, slg: 0.615, obp: 0.538, doubles: 1, triples: 0 },
  { name: "Ghandi", image: "assets/images/ghandi.jpg", class: "Balanced", avg: 0.378, gp: 20, hr: 2, pa: 74, hits: 28, slg: 0.496, obp: 0.378, doubles: 2, triples: 0 },
  { name: "Goomba", image: "assets/images/goomba.png", class: "Speed", avg: 0.391, gp: 5, hr: 2, pa: 23, hits: 9, slg: 0.652, obp: 0.391, doubles: 0, triples: 0 },
  { name: "Green Dry Bones", image: "assets/images/green dry bones.png", class: "Balanced", avg: 0.564, gp: 64, hr: 15, pa: 259, hits: 146, slg: 0.795, obp: 0.564, doubles: 12, triples: 1 },
  { name: "Green Magikoopa", image: "assets/images/green magikoopa.png", class: "Balanced", avg: 0.472, gp: 64, hr: 4, pa: 231, hits: 109, slg: 0.556, obp: 0.474, doubles: 7, triples: 0 },
  { name: "Green Noki", image: "assets/images/green noki.png", class: "Balanced", avg: 0.174, gp: 6, hr: 0, pa: 23, hits: 4, slg: 0.217, obp: 0.174, doubles: 1, triples: 0 },
  { name: "Green Shy Guy", image: "assets/images/green shy guy.png", class: "Technique", avg: 0.439, gp: 52, hr: 3, pa: 180, hits: 79, slg: 0.545, obp: 0.432, doubles: 9, triples: 1 },
  { name: "Green Toad", image: "assets/images/green toad.png", class: "Speed", avg: 0.57, gp: 64, hr: 2, pa: 258, hits: 147, slg: 0.69, obp: 0.575, doubles: 13, triples: 4 },
  { name: "Gus Fring", image: "assets/images/gus fring.jpg", class: "Balanced", avg: 0.27, gp: 20, hr: 0, pa: 74, hits: 20, slg: 0.342, obp: 0.274, doubles: 5, triples: 0 },
  { name: "Hammer Bro", image: "assets/images/hammer bro.png", class: "Power", avg: 0.554, gp: 64, hr: 59, pa: 240, hits: 133, slg: 1.319, obp: 0.548, doubles: 8, triples: 0 },
  { name: "Helly R", image: "assets/images/helly r.jpg", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.4, obp: 0.4, doubles: 0, triples: 0 },
  { name: "Ice Cube", image: "assets/images/ice cube.jpg", class: "Balanced", avg: 0.367, gp: 8, hr: 0, pa: 30, hits: 11, slg: 0.4, obp: 0.367, doubles: 1, triples: 0 },
  { name: "Idi Amin", image: "assets/images/idi amin.jpg", class: "Balanced", avg: 0.314, gp: 10, hr: 0, pa: 35, hits: 11, slg: 0.343, obp: 0.314, doubles: 1, triples: 0 },
  { name: "John 2.0", image: "assets/images/john 20.jpg", class: "Balanced", avg: 0.562, gp: 4, hr: 0, pa: 16, hits: 9, slg: 0.6, obp: 0.6, doubles: 0, triples: 0 },
  { name: "John K", image: "assets/images/john k.jpg", class: "Balanced", avg: 0.405, gp: 25, hr: 1, pa: 84, hits: 34, slg: 0.472, obp: 0.411, doubles: 2, triples: 0 },
  { name: "John", image: "assets/images/john.jpg", class: "Balanced", avg: 0.391, gp: 7, hr: 0, pa: 23, hits: 9, slg: 0.421, obp: 0.358, doubles: 1, triples: 0 },
  { name: "KevinG", image: "assets/images/keving.jpg", class: "Balanced", avg: 0.371, gp: 44, hr: 4, pa: 167, hits: 62, slg: 0.482, obp: 0.371, doubles: 6, triples: 0 },
  { name: "Kim Jong Un", image: "assets/images/kim jong un.jpg", class: "Balanced", avg: 0.471, gp: 30, hr: 4, pa: 119, hits: 56, slg: 0.63, obp: 0.471, doubles: 7, triples: 0 },
  { name: "King Boo", image: "assets/images/king boo.png", class: "Power", avg: 0.571, gp: 64, hr: 41, pa: 259, hits: 148, slg: 1.074, obp: 0.565, doubles: 6, triples: 0 },
  { name: "King K Rool", image: "assets/images/king k rool.png", class: "Power", avg: 0.595, gp: 64, hr: 77, pa: 264, hits: 157, slg: 1.531, obp: 0.595, doubles: 12, triples: 0 },
  { name: "Koopa Paratroopa", image: "assets/images/koopa paratroopa.png", class: "Balanced", avg: 0.331, gp: 36, hr: 2, pa: 133, hits: 44, slg: 0.394, obp: 0.333, doubles: 2, triples: 0 },
  { name: "Koopa Troopa", image: "assets/images/koopa troopa.png", class: "Speed", avg: 0.321, gp: 25, hr: 1, pa: 84, hits: 27, slg: 0.421, obp: 0.326, doubles: 3, triples: 1 },
  { name: "Kritter", image: "assets/images/kritter.png", class: "Power", avg: 0.563, gp: 64, hr: 46, pa: 261, hits: 147, slg: 1.198, obp: 0.563, doubles: 17, triples: 3 },
  { name: "Lara Croft", image: "assets/images/lara croft.jpg", class: "Balanced", avg: 0.397, gp: 20, hr: 1, pa: 68, hits: 27, slg: 0.471, obp: 0.397, doubles: 2, triples: 0 },
  { name: "Lebron James", image: "assets/images/lebron james.jpg", class: "Balanced", avg: 0.43, gp: 40, hr: 6, pa: 151, hits: 65, slg: 0.601, obp: 0.432, doubles: 5, triples: 1 },
  { name: "Light Blue Yoshi", image: "assets/images/light blue yoshi.png", class: "Speed", avg: 0.577, gp: 7, hr: 0, pa: 26, hits: 15, slg: 0.692, obp: 0.577, doubles: 3, triples: 0 },
  { name: "Lil Wayne", image: "assets/images/lil wayne.jpg", class: "Balanced", avg: 0.513, gp: 10, hr: 0, pa: 39, hits: 20, slg: 0.615, obp: 0.513, doubles: 4, triples: 0 },
  { name: "Lilo", image: "assets/images/lilo.jpg", class: "Balanced", avg: 0.409, gp: 20, hr: 1, pa: 66, hits: 27, slg: 0.53, obp: 0.409, doubles: 3, triples: 1 },
  { name: "Livvy Dunne", image: "assets/images/livvy dunne.jpg", class: "Balanced", avg: 0.411, gp: 18, hr: 0, pa: 73, hits: 30, slg: 0.411, obp: 0.411, doubles: 0, triples: 0 },
  { name: "Lizzy", image: "assets/images/lizzy.jpg", class: "Balanced", avg: 0.667, gp: 1, hr: 0, pa: 3, hits: 2, slg: 0.667, obp: 0.667, doubles: 0, triples: 0 },
  { name: "Luigi", image: "assets/images/luigi.png", class: "Speed", avg: 0.536, gp: 64, hr: 4, pa: 250, hits: 134, slg: 0.623, obp: 0.538, doubles: 6, triples: 1 },
  { name: "MJ HeeHee", image: "assets/images/mj heehee.jpg", class: "Balanced", avg: 0.426, gp: 17, hr: 1, pa: 61, hits: 26, slg: 0.516, obp: 0.434, doubles: 2, triples: 0 },
  { name: "MLK Jr", image: "assets/images/mlk jr.jpg", class: "Balanced", avg: 0.39, gp: 20, hr: 1, pa: 82, hits: 32, slg: 0.464, obp: 0.39, doubles: 3, triples: 0 },
  { name: "Magikoopa", image: "assets/images/magikoopa.png", class: "Balanced", avg: 0.511, gp: 63, hr: 4, pa: 223, hits: 114, slg: 0.596, obp: 0.511, doubles: 5, triples: 1 },
  { name: "Mario", image: "assets/images/mario.png", class: "Balanced", avg: 0.52, gp: 64, hr: 5, pa: 246, hits: 128, slg: 0.613, obp: 0.521, doubles: 5, triples: 1 },
  { name: "Matt", image: "assets/images/matt.jpg", class: "Balanced", avg: 0.421, gp: 21, hr: 1, pa: 76, hits: 32, slg: 0.474, obp: 0.421, doubles: 1, triples: 0 },
  { name: "Mikasa", image: "assets/images/mikasa.jpg", class: "Balanced", avg: 0.346, gp: 20, hr: 1, pa: 78, hits: 27, slg: 0.422, obp: 0.35, doubles: 3, triples: 0 },
  { name: "Minion", image: "assets/images/minion.jpg", class: "Balanced", avg: 0.4, gp: 38, hr: 0, pa: 135, hits: 54, slg: 0.46, obp: 0.4, doubles: 6, triples: 1 },
  { name: "Miss Casey", image: "assets/images/miss casey.jpg", class: "Balanced", avg: 0.235, gp: 10, hr: 0, pa: 34, hits: 8, slg: 0.294, obp: 0.235, doubles: 2, triples: 0 },
  { name: "Miss Hot", image: "assets/images/miss hot.jpg", class: "Balanced", avg: 0.436, gp: 64, hr: 5, pa: 234, hits: 102, slg: 0.568, obp: 0.438, doubles: 12, triples: 1 },
  { name: "Monty Mole", image: "assets/images/monty mole.png", class: "Speed", avg: 0.4, gp: 14, hr: 4, pa: 50, hits: 20, slg: 0.7, obp: 0.408, doubles: 1, triples: 0 },
  { name: "Mr. Incredible", image: "assets/images/mr incredible.jpg", class: "Balanced", avg: 0.441, gp: 34, hr: 1, pa: 127, hits: 56, slg: 0.496, obp: 0.449, doubles: 3, triples: 0 },
  { name: "Mrs.Claus", image: "assets/images/mrsclaus.jpg", class: "Balanced", avg: 0.413, gp: 20, hr: 2, pa: 75, hits: 31, slg: 0.533, obp: 0.413, doubles: 3, triples: 0 },
  { name: "Noki", image: "assets/images/noki.png", class: "Balanced", avg: 0.667, gp: 4, hr: 0, pa: 18, hits: 12, slg: 0.722, obp: 0.667, doubles: 1, triples: 0 },
  { name: "Paragoomba", image: "assets/images/paragoomba.png", class: "Balanced", avg: 0.364, gp: 38, hr: 1, pa: 132, hits: 48, slg: 0.403, obp: 0.365, doubles: 2, triples: 0 },
  { name: "Peach", image: "assets/images/peach.png", class: "Balanced", avg: 0.416, gp: 64, hr: 2, pa: 245, hits: 102, slg: 0.486, obp: 0.408, doubles: 9, triples: 2 },
  { name: "Petey Piranha", image: "assets/images/petey piranha.png", class: "Power", avg: 0.596, gp: 64, hr: 86, pa: 260, hits: 155, slg: 1.626, obp: 0.6, doubles: 6, triples: 0 },
  { name: "Pianta", image: "assets/images/pianta.png", class: "Speed", avg: 0.602, gp: 64, hr: 48, pa: 246, hits: 148, slg: 1.199, obp: 0.593, doubles: 4, triples: 1 },
  { name: "Pink Yoshi", image: "assets/images/pink yoshi.png", class: "Speed", avg: 0.52, gp: 35, hr: 0, pa: 123, hits: 64, slg: 0.599, obp: 0.548, doubles: 6, triples: 0 },
  { name: "Pops", image: "assets/images/pops.jpg", class: "Balanced", avg: 0.524, gp: 10, hr: 8, pa: 42, hits: 22, slg: 1.122, obp: 0.537, doubles: 0, triples: 0 },
  { name: "Purple Toad", image: "assets/images/purple toad.png", class: "Speed", avg: 0.635, gp: 46, hr: 0, pa: 170, hits: 108, slg: 0.692, obp: 0.635, doubles: 7, triples: 1 },
  { name: "Queen Elizabeth", image: "assets/images/queen elizabeth.jpg", class: "Balanced", avg: 0.368, gp: 20, hr: 1, pa: 76, hits: 28, slg: 0.421, obp: 0.368, doubles: 1, triples: 0 },
  { name: "Red Koopa Paratroopa", image: "assets/images/red koopa paratroopa.jpg", class: "Balanced", avg: 0.391, gp: 14, hr: 0, pa: 46, hits: 18, slg: 0.435, obp: 0.391, doubles: 2, triples: 0 },
  { name: "Red Koopa Troopa", image: "assets/images/red koopa troopa.png", class: "Speed", avg: 0.392, gp: 20, hr: 1, pa: 74, hits: 29, slg: 0.486, obp: 0.392, doubles: 4, triples: 0 },
  { name: "Red Kritter", image: "assets/images/red kritter.png", class: "Power", avg: 0.49, gp: 64, hr: 36, pa: 247, hits: 121, slg: 0.995, obp: 0.489, doubles: 10, triples: 1 },
  { name: "Red Magikoopa", image: "assets/images/red magikoopa.png", class: "Balanced", avg: 0.439, gp: 63, hr: 2, pa: 239, hits: 105, slg: 0.505, obp: 0.443, doubles: 7, triples: 0 },
  { name: "Red Noki", image: "assets/images/red noki.png", class: "Balanced", avg: 0.4, gp: 10, hr: 0, pa: 35, hits: 14, slg: 0.45, obp: 0.4, doubles: 2, triples: 0 },
  { name: "Red Pianta", image: "assets/images/red pianta.png", class: "Speed", avg: 0.561, gp: 64, hr: 25, pa: 246, hits: 138, slg: 0.918, obp: 0.566, doubles: 8, triples: 1 },
  { name: "Red Yoshi", image: "assets/images/red yoshi.png", class: "Speed", avg: 0.446, gp: 47, hr: 2, pa: 168, hits: 75, slg: 0.506, obp: 0.454, doubles: 2, triples: 0 },
  { name: "Rizzler", image: "assets/images/rizzler.jpg", class: "Balanced", avg: 0.452, gp: 43, hr: 4, pa: 166, hits: 75, slg: 0.556, obp: 0.454, doubles: 5, triples: 0 },
  { name: "Saddam Hussein", image: "assets/images/saddam hussein.jpg", class: "Balanced", avg: 0.388, gp: 40, hr: 10, pa: 147, hits: 57, slg: 0.653, obp: 0.388, doubles: 7, triples: 1 },
  { name: "Saka", image: "assets/images/saka.jpg", class: "Balanced", avg: 0.426, gp: 20, hr: 0, pa: 68, hits: 29, slg: 0.456, obp: 0.427, doubles: 2, triples: 0 },
  { name: "Semenlad", image: "assets/images/semenlad.jpg", class: "Balanced", avg: 0.346, gp: 13, hr: 0, pa: 52, hits: 18, slg: 0.357, obp: 0.35, doubles: 0, triples: 0 },
  { name: "Shy Guy", image: "assets/images/shy guy.png", class: "Technique", avg: 0.465, gp: 42, hr: 0, pa: 155, hits: 72, slg: 0.511, obp: 0.471, doubles: 6, triples: 0 },
  { name: "Snape", image: "assets/images/snape.jpg", class: "Balanced", avg: 0.312, gp: 13, hr: 0, pa: 48, hits: 15, slg: 0.309, obp: 0.309, doubles: 0, triples: 0 },
  { name: "Tiny Kong", image: "assets/images/tiny kong.png", class: "Balanced", avg: 0.452, gp: 60, hr: 2, pa: 228, hits: 103, slg: 0.537, obp: 0.456, doubles: 10, triples: 1 },
  { name: "Toad", image: "assets/images/toad.jpg", class: "Balanced", avg: 0.65, gp: 56, hr: 2, pa: 217, hits: 141, slg: 0.755, obp: 0.653, doubles: 7, triples: 4 },
  { name: "Toadette", image: "assets/images/toadette.png", class: "Balanced", avg: 0.506, gp: 62, hr: 2, pa: 231, hits: 117, slg: 0.581, obp: 0.511, doubles: 6, triples: 2 },
  { name: "Toadsworth", image: "assets/images/toadsworth.png", class: "Balanced", avg: 0.328, gp: 17, hr: 0, pa: 64, hits: 21, slg: 0.382, obp: 0.334, doubles: 3, triples: 0 },
  { name: "Tobey Maguire", image: "assets/images/tobey maguire.jpg", class: "Balanced", avg: 0.429, gp: 4, hr: 0, pa: 14, hits: 6, slg: 0.5, obp: 0.429, doubles: 1, triples: 0 },
  { name: "Trinity", image: "assets/images/trinity.jpg", class: "Balanced", avg: 0.408, gp: 20, hr: 1, pa: 71, hits: 29, slg: 0.493, obp: 0.408, doubles: 3, triples: 0 },
  { name: "Tsitsipas", image: "assets/images/tsitsipas.jpg", class: "Balanced", avg: 0.333, gp: 6, hr: 0, pa: 21, hits: 7, slg: 0.381, obp: 0.333, doubles: 1, triples: 0 },
  { name: "Tung Tung Tung Sahur", image: "assets/images/tung tung tung sahur.jpg", class: "Balanced", avg: 0.433, gp: 24, hr: 3, pa: 90, hits: 39, slg: 0.6, obp: 0.434, doubles: 6, triples: 0 },
  { name: "Unc", image: "assets/images/unc.jpg", class: "Balanced", avg: 0.498, gp: 64, hr: 19, pa: 239, hits: 119, slg: 0.759, obp: 0.502, doubles: 4, triples: 0 },
  { name: "Vicar", image: "assets/images/vicar.jpg", class: "Balanced", avg: 0.349, gp: 10, hr: 0, pa: 43, hits: 15, slg: 0.372, obp: 0.349, doubles: 1, triples: 0 },
  { name: "Waluigi", image: "assets/images/waluigi.png", class: "Technique", avg: 0.556, gp: 64, hr: 3, pa: 239, hits: 133, slg: 0.72, obp: 0.563, doubles: 28, triples: 0 },
  { name: "Wario", image: "assets/images/wario.png", class: "Technique", avg: 0.566, gp: 64, hr: 21, pa: 249, hits: 141, slg: 0.898, obp: 0.584, doubles: 7, triples: 0 },
  { name: "Wiggler", image: "assets/images/wiggler.png", class: "Speed", avg: 0.628, gp: 64, hr: 10, pa: 261, hits: 164, slg: 0.818, obp: 0.628, doubles: 14, triples: 2 },
  { name: "Winnie The Pooh", image: "assets/images/winnie the pooh.jpg", class: "Balanced", avg: 0.297, gp: 10, hr: 1, pa: 37, hits: 11, slg: 0.432, obp: 0.297, doubles: 2, triples: 0 },
  { name: "Yellow Magikoopa", image: "assets/images/yellow magikoopa.png", class: "Balanced", avg: 0.497, gp: 46, hr: 3, pa: 183, hits: 91, slg: 0.594, obp: 0.497, doubles: 4, triples: 2 },
  { name: "Yellow Pianta", image: "assets/images/yellow pianta.png", class: "Speed", avg: 0.583, gp: 64, hr: 21, pa: 259, hits: 151, slg: 0.866, obp: 0.585, doubles: 6, triples: 0 },
  { name: "Yellow Shy Guy", image: "assets/images/yellow shy guy.png", class: "Technique", avg: 0.419, gp: 49, hr: 3, pa: 167, hits: 70, slg: 0.51, obp: 0.419, doubles: 5, triples: 0 },
  { name: "Yellow Toad", image: "assets/images/yellow toad.png", class: "Speed", avg: 0.622, gp: 62, hr: 6, pa: 249, hits: 155, slg: 0.77, obp: 0.622, doubles: 11, triples: 3 },
  { name: "Yellow Yoshi", image: "assets/images/yellow yoshi.png", class: "Speed", avg: 0.557, gp: 23, hr: 0, pa: 88, hits: 49, slg: 0.648, obp: 0.557, doubles: 6, triples: 1 },
  { name: "Yghur", image: "assets/images/yghur.jpg", class: "Balanced", avg: 0.381, gp: 6, hr: 1, pa: 21, hits: 8, slg: 0.571, obp: 0.381, doubles: 1, triples: 0 },
  { name: "Yoshi", image: "assets/images/yoshi.png", class: "Speed", avg: 0.451, gp: 64, hr: 3, pa: 253, hits: 114, slg: 0.531, obp: 0.453, doubles: 8, triples: 1 },
  { name: "Zorro", image: "assets/images/zorro.jpg", class: "Balanced", avg: 0.286, gp: 2, hr: 0, pa: 7, hits: 2, slg: 0.286, obp: 0.286, doubles: 0, triples: 0 },
  { name: "KSI", image: "assets/images/ksi.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Harry Potter", image: "assets/images/Harry Potter.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "The Penguin", image: "assets/images/The Penguin.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Handsome Squidward", image: "assets/images/Handsome Squidward.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Big AJ", image: "assets/images/Big AJ.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Taylor Swift", image: "assets/images/taylor.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Angelina Joeli", image: "assets/images/angelina.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Syndrome", image: "assets/images/syndrome.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Beyonce", image: "assets/images/beyonce.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Whoopie Goldberg", image: "assets/images/whoopie.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Evie", image: "assets/images/evie.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 },
  { name: "Cole Palmer", image: "assets/images/cole plamer.jpg", class: "Balanced", avg: 0.0, gp: 0, hr: 0, pa: 0, hits: 0, slg: 0.0, obp: 0.0, doubles: 0, triples: 0 }
];

window.characters = characters;

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {
    
  const pitchingStats = {
  "Baby DK": { ip: 2, era: 0.0, baa: 0.375, so: 0 },
  "Baby Daisy": { ip: 4, era: 1.75, baa: 0.293, so: 0 },
  "Baby Luigi": { ip: 10, era: 5.87, baa: 0.49, so: 1 },
  "Baby Mario": { ip: 2, era: 14.0, baa: 0.5, so: 0 },
  "Baby Peach": { ip: 31, era: 8.52, baa: 0.513, so: 1 },
  "Birdo": { ip: 128, era: 7.07, baa: 0.467, so: 26 },
  "Black Shy Guy": { ip: 2, era: 7.88, baa: 0.657, so: 0 },
  "Black Widow": { ip: 2, era: 10.5, baa: 0.6, so: 0 },
  "Blooper": { ip: 42, era: 10.07, baa: 0.535, so: 2 },
  "Blue Dry Bones": { ip: 54, era: 7.03, baa: 0.499, so: 1 },
  "Blue Kritter": { ip: 8, era: 6.86, baa: 0.419, so: 0 },
  "Blue Shy Guy": { ip: 7, era: 13.69, baa: 0.592, so: 0 },
  "Blue Toad": { ip: 4, era: 5.62, baa: 0.433, so: 1 },
  "Boo": { ip: 148, era: 7.95, baa: 0.514, so: 5 },
  "Boomerang Bro": { ip: 4, era: 1.5, baa: 0.375, so: 0 },
  "Borat": { ip: 9, era: 21.0, baa: 0.643, so: 0 },
  "Bowser": { ip: 153, era: 6.74, baa: 0.474, so: 35 },
  "Bowser Jr": { ip: 135, era: 8.11, baa: 0.511, so: 10 },
  "Brown Kritter": { ip: 14, era: 13.38, baa: 0.548, so: 0 },
  "Caillou": { ip: 2, era: 5.25, baa: 0.385, so: 0 },
  "Carby": { ip: 33, era: 12.32, baa: 0.537, so: 1 },
  "Chicken": { ip: 2, era: 9.0, baa: 0.462, so: 0 },
  "Chickenrice": { ip: 1, era: 5.25, baa: 0.625, so: 0 },
  "Count Dooku": { ip: 44, era: 6.36, baa: 0.498, so: 1 },
  "Daisy": { ip: 176, era: 6.54, baa: 0.444, so: 2 },
  "Dark Bones": { ip: 63, era: 6.73, baa: 0.41, so: 1 },
  "Diddy Kong": { ip: 84, era: 10.18, baa: 0.529, so: 10 },
  "Diminutive": { ip: 4, era: 6.0, baa: 0.353, so: 0 },
  "Dixie Kong": { ip: 6, era: 7.0, baa: 0.424, so: 1 },
  "Doc Brown": { ip: 1, era: 47.25, baa: 0.714, so: 0 },
  "Donkey Kong": { ip: 220, era: 7.18, baa: 0.475, so: 5 },
  "Dry Bones": { ip: 2, era: 6.0, baa: 0.545, so: 0 },
  "Dwayne Wade": { ip: 10, era: 2.1, baa: 0.406, so: 0 },
  "Fire Bro": { ip: 3, era: 13.42, baa: 0.612, so: 0 },
  "Frozone": { ip: 4, era: 3.5, baa: 0.357, so: 0 },
  "Funky Kong": { ip: 15, era: 4.67, baa: 0.46, so: 0 },
  "Gandalf": { ip: 2, era: 5.25, baa: 0.588, so: 0 },
  "Genghis Khan": { ip: 16, era: 6.43, baa: 0.436, so: 0 },
  "Ghandi": { ip: 10, era: 5.32, baa: 0.51, so: 0 },
  "Goomba": { ip: 1, era: 28.0, baa: 0.625, so: 0 },
  "Green Dry Bones": { ip: 9, era: 13.11, baa: 0.618, so: 0 },
  "Green Magikoopa": { ip: 43, era: 11.06, baa: 0.543, so: 0 },
  "Green Shy Guy": { ip: 3, era: 30.75, baa: 0.641, so: 1 },
  "Green Toad": { ip: 2, era: 7.88, baa: 0.482, so: 0 },
  "Hammer Bro": { ip: 4, era: 16.62, baa: 0.635, so: 0 },
  "Idi Amin": { ip: 9, era: 11.25, baa: 0.533, so: 0 },
  "John K": { ip: 5, era: 9.8, baa: 0.542, so: 0 },
  "KevinG": { ip: 56, era: 6.62, baa: 0.464, so: 2 },
  "Kim Jong Un": { ip: 4, era: 12.25, baa: 0.565, so: 1 },
  "King Boo": { ip: 72, era: 11.97, baa: 0.56, so: 0 },
  "King K Rool": { ip: 38, era: 7.92, baa: 0.459, so: 0 },
  "Koopa Paratroopa": { ip: 4, era: 1.31, baa: 0.375, so: 1 },
  "Koopa Troopa": { ip: 1, era: 21.0, baa: 0.667, so: 0 },
  "Kritter": { ip: 13, era: 13.83, baa: 0.549, so: 1 },
  "Lebron James": { ip: 4, era: 4.75, baa: 0.278, so: 0 },
  "Light Blue Yoshi": { ip: 1, era: 0.0, baa: 0.167, so: 0 },
  "Lilo": { ip: 2, era: 3.5, baa: 0.429, so: 0 },
  "Livvy Dunne": { ip: 1, era: 0.0, baa: 0.333, so: 0 },
  "Luigi": { ip: 213, era: 7.92, baa: 0.495, so: 17 },
  "MLK Jr": { ip: 5, era: 2.47, baa: 0.435, so: 0 },
  "Magikoopa": { ip: 54, era: 9.35, baa: 0.525, so: 1 },
  "Mario": { ip: 191, era: 8.16, baa: 0.495, so: 12 },
  "Matt": { ip: 2, era: 18.38, baa: 0.6, so: 0 },
  "Mikasa": { ip: 1, era: 21.0, baa: 0.727, so: 0 },
  "Minion": { ip: 11, era: 12.25, baa: 0.544, so: 1 },
  "Miss Casey": { ip: 5, era: 13.59, baa: 0.529, so: 0 },
  "Miss Hot": { ip: 4, era: 8.75, baa: 0.3, so: 0 },
  "Monty Mole": { ip: 36, era: 6.16, baa: 0.452, so: 0 },
  "Mr. Incredible": { ip: 54, era: 5.41, baa: 0.458, so: 1 },
  "Mrs.Claus": { ip: 5, era: 2.58, baa: 0.37, so: 0 },
  "Paragoomba": { ip: 75, era: 9.87, baa: 0.503, so: 1 },
  "Peach": { ip: 179, era: 7.7, baa: 0.499, so: 6 },
  "Pianta": { ip: 69, era: 9.61, baa: 0.514, so: 4 },
  "Pink Yoshi": { ip: 1, era: 21.0, baa: 0.778, so: 0 },
  "Purple Toad": { ip: 1, era: 5.25, baa: 0.625, so: 1 },
  "Queen Elizabeth": { ip: 4, era: 16.15, baa: 0.607, so: 0 },
  "Red Koopa Troopa": { ip: 3, era: 4.67, baa: 0.563, so: 0 },
  "Red Kritter": { ip: 8, era: 13.34, baa: 0.568, so: 0 },
  "Red Magikoopa": { ip: 48, era: 8.51, baa: 0.502, so: 0 },
  "Red Pianta": { ip: 55, era: 6.48, baa: 0.491, so: 3 },
  "Red Yoshi": { ip: 1, era: 21.0, baa: 0.6, so: 0 },
  "Rizzler": { ip: 13, era: 13.47, baa: 0.574, so: 0 },
  "Saddam Hussein": { ip: 21, era: 5.56, baa: 0.435, so: 0 },
  "Shy Guy": { ip: 4, era: 6.78, baa: 0.542, so: 0 },
  "Tiny Kong": { ip: 29, era: 9.7, baa: 0.51, so: 2 },
  "Toad": { ip: 6, era: 11.9, baa: 0.426, so: 0 },
  "Toadette": { ip: 2, era: 13.12, baa: 0.578, so: 0 },
  "Toadsworth": { ip: 20, era: 10.7, baa: 0.538, so: 1 },
  "Trinity": { ip: 90, era: 4.99, baa: 0.462, so: 2 },
  "Tung Tung Tung Sahur": { ip: 2, era: 9.0, baa: 0.3, so: 0 },
  "Unc": { ip: 13, era: 3.41, baa: 0.481, so: 0 },
  "Waluigi": { ip: 111, era: 7.42, baa: 0.452, so: 5 },
  "Wario": { ip: 132, era: 9.0, baa: 0.495, so: 6 },
  "Wiggler": { ip: 5, era: 3.15, baa: 0.428, so: 0 },
  "Yellow Magikoopa": { ip: 38, era: 8.5, baa: 0.423, so: 1 },
  "Yellow Pianta": { ip: 40, era: 10.33, baa: 0.516, so: 3 },
  "Yellow Shy Guy": { ip: 1, era: 28.0, baa: 0.778, so: 0 },
  "Yellow Toad": { ip: 5, era: 7.15, baa: 0.464, so: 0 },
  "Yellow Yoshi": { ip: 4, era: 21.0, baa: 0.656, so: 0 },
  "Yoshi": { ip: 111, era: 7.22, baa: 0.472, so: 3 },
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
  
  const teamRosters = {
        "Tom": ["Bowser", "Birdo", "Kritter", "Daisy", "Magikoopa", "Goomba", "Monty Mole", "Pink Yoshi", "Tung Tung Tung Sahur", "Charlie Kirk", "Semenlad" ],
        "HarryKirch": ["Donkey Kong", "Funky Kong", "Wario", "Waluigi", "Yellow Magikoopa", "Diddy Kong", "Bowser Jr", "Koopa Troopa", "Dixie Kong", "Miss Hot", "Yellow Yoshi", "Dwayne Wade"],
        "Julian": ["Toad", "Red Kritter", "Shy Guy", "Red Koopa Paratroopa", "Red Koopa Troopa", "Red Magikoopa", "Red Noki", "Red Yoshi", "Black Shy Guy", "Unc", "Genghis Khan"],
        "Jmo": ["Petey Piranha", "Boomerang Bro", "Dark Bones", "Dry Bones", "Green Dry Bones", "Boo", "Blooper", "Light Blue Yoshi", "Tiny Kong", "Tobey Maguire", "Snape"],
        "Kircher": ["Fire Bro", "Red Pianta", "Blue Dry Bones", "Blue Kritter", "Blue Yoshi", "Toadsworth", "Blue Shy Guy", "Noki", "Mr. Incredible", "Frozone", "Syndrome"],
        "Carby": ["King K Rool", "Hammer Bro", "Luigi", "King Boo", "Green Toad", "Green Magikoopa", "Green Shy Guy", "Green Noki", "Koopa Paratroopa", "KevinG", "Doc Brown"],
        "BenT": ["Wiggler", "Yellow Pianta", "Yellow Toad", "Blue Toad", "Baby DK", "Paragoomba", "Yellow Shy Guy", "Baby Peach", "Brown Kritter", "Lebron James"],
        "BenR": ["Mario", "Pianta", "Purple Toad", "Peach", "Toadette", "Yoshi", "Baby Mario", "Baby Luigi", "Baby Daisy", "Rizzler", "Matt"]
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




  
  
