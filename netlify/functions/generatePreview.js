// 📁 netlify/functions/generatePreview.js

export async function handler(event) {
  const OPENAI_API_KEY = process.env.VITE_API_KEY;

  try {
    const match = JSON.parse(event.body);

    const homeRecord = getTeamRecord(match.home, match.standingsMap);
    const awayRecord = getTeamRecord(match.away, match.standingsMap);
    const stadiumName = getReadableStadiumName(match.stadiumImg);

    const prompt = `
    Write a dramatic and fun Mario Super Sluggers match preview in one paragraph. Include context about division standings and playoff implications.

    League Info:
    - There are 8 teams, split into two divisions: East and West.
    - East Division: Toadette's Hit List, Monkey Mashers, Trinity Triple Threat, Unc's Breeding Program
    - West Division: Kevin G's Escort Agency, Kritter Town USA, BenT, Car-bones White Van
    - The team with the best record in each division receives a first-round bye in the playoffs.
    - The next best 4 teams by record (regardless of division) earn wildcard spots.
    - The bottom 2 teams are eliminated from playoff contention.
    - Standings are ranked by win-loss record first. If teams have the same record, run differential is used as the tiebreaker.
    - 

    When considering playoff implications, use the current win-loss record and run differential provided for each team. 
    Consider how this specific match could influence playoff seeding depending on possible outcomes.
    - for example, if either team wins by 1–10 runs, how might that shift their position in the standings or impact their chances at a bye, wildcard, or elimination?

    Teams: ${match.home} (${homeRecord}) vs ${match.away} (${awayRecord})
    Date: ${match.date} • Time: ${match.day}
    Location: ${stadiumName}
    Star Players: ${match.homeStar} and ${match.awayStar}
    Stat Buffs: ${match.homeStatAdjust} / ${match.awayStatAdjust}
    Lineups:
    - Home: ${match["Home Lineup"]}
    - Away: ${match["Away Lineup"]}

    Use this information to infer playoff stakes. Is this a must-win? A chance to clinch a bye? 
    A do-or-die for wildcard hopes? Highlight the playoff race pressure, mention standout players or lineup dynamics, and make the tone high-energy and suspenseful.

    I also want a game outcome prediction with the score. And the game betting line and spread which you can say comes from the Official Sluggers Sportsbook.

    Finally, also factor in the official playoff probabilities matrix here when doing all this, It should tell you who is already certain to be eliminated, who is safe, etc: Team	Clinch Bye (%)	Make Playoffs (%)	Eliminated (%)
    BenT	5.98%	73.88%	20.14%
    Tom	6.39%	70.03%	23.58%
    Jmo	83.49%	16.51%	0.00%
    BenR	13.58%	73.53%	12.89%
    Kircher	16.51%	83.42%	0.07%
    Carbone	0.00%	56.68%	43.32%
    Julian	0.00%	0.00%	100.00%
    HarryKirch	74.05%	25.95%	0.00%

    For above, BenT is BenT, Tom is Kevin G's Escort Agency, Jmo is Toadette's Hit List, BenR is Kritter Town USA, Kircher is trinity Triple Threat, Carbone is Monkey Mashers, Julian is Unc's Bredding Program, and HarryKirch is Car-bone's White Van. 
    `;



    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85,
        max_tokens: 350,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No preview returned" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ preview: data.choices[0].message.content.trim() }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error during preview generation." }),
    };
  }
}

// 🔁 Utility: Record lookup
function getTeamRecord(teamName, standingsMap) {
  const entry = standingsMap?.[teamName];
  if (!entry) return "Record not available";
  return `${entry.wins}-${entry.losses} (${entry.diff >= 0 ? "+" : ""}${entry.diff} run diff)`;
}

// 🔁 Utility: Convert stadiumImg path to readable name
function getReadableStadiumName(imgPath) {
  if (!imgPath) return "Unknown Stadium";
  const map = {
    "Mario.jpg": "Mario Stadium",
    "Yoshi.jpg": "Yoshi Park",
    "Wario.jpg": "Wario City",
    "DK.jpg": "DK Jungle",
    "Bowser.jpg": "Bowser Castle",
    "BJ.jpg": "Bowser Jr. Playroom",
    "Luigi.jpg": "Luigi Mansion",
    "Daisy.jpg": "Daisy Cruiser",
  };
  const filename = imgPath.split("/").pop();
  return map[filename] || "Mystery Stadium";
}
