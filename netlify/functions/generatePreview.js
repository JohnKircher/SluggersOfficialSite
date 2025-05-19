// 📁 netlify/functions/generatePreview.js

export async function handler(event) {
  const OPENAI_API_KEY = process.env.VITE_API_KEY;

  try {
    const match = JSON.parse(event.body);

    const homeRecord = getTeamRecord(match.home, match.standingsMap);
    const awayRecord = getTeamRecord(match.away, match.standingsMap);
    const stadiumName = getReadableStadiumName(match.stadiumImg);

    const prompt = `
Write a dramatic and fun Mario Super Sluggers match preview in one paragraph.

Teams: ${match.home} (${homeRecord}) vs ${match.away} (${awayRecord})
Date: ${match.date} • Time: ${match.day}
Location: ${stadiumName}
Star Players: ${match.homeStar} and ${match.awayStar}
Stat Buffs: ${match.homeStatAdjust} / ${match.awayStatAdjust}
Lineups:
- Home: ${match["Home Lineup"]}
- Away: ${match["Away Lineup"]}

Make it hype, energetic, and fun. Mention key matchups or interesting player dynamics.
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
