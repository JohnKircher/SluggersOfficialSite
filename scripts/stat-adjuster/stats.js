function boundStat (stat, v) {
    let min = (inputGlobal.devMode ? undefined : stat.min) ?? 0;
    let max = (inputGlobal.devMode ? undefined : stat.max) ?? (1 << (stat.size * 8)) - 1;
    v = v < min ? min : v;
    v = v > max ? max : v;
    return v;
}

function setStat(stat, v) {
    v = boundStat(stat, v);
    inputGlobal.player.new[stat.offset] = v;
    return v;
}

function trueValue(player, stat) {
    return player['new'][stat.offset] ?? all['new'][stat.offset] ?? player['old'][stat.offset] ?? '';
}

let chosePlayer = function (v) {
    if (!isNaN(v)) {
        var player = v == -1 ? all : players[v];
        inputGlobal.player = player;
    }
    // console.log(v);

    // NEW: sync the star toggle for the newly selected player
    const box = starToggle.element.querySelector('input.check_box');
    const disabled = (inputGlobal.player && inputGlobal.player.name === 'All');
    box.disabled = disabled;
    const on = !disabled && !!inputGlobal.starred[inputGlobal.player.id];
    box.checked = on;
    // Re-apply so the fields show the boosted (or base) values for this player
    if (!disabled) applyStarToPlayer(inputGlobal.player, on);

    for (let stat of nonStaticStats) {
        statInputs[stat.offset].default = inputGlobal.player.old[stat.offset];
        statInputs[stat.offset].setValue(trueValue(inputGlobal.player, stat));
    }
}

let playerInds = [];
for(var n in players){playerInds.push(n);}
let playerInput = selectInput({
    txt: 'player',
    options: ['All', ...players.map(x => x['name'])],
    values: [-1, ...playerInds],
    default: -1,
    noHighlight: 1,
    onchange: chosePlayer,
});
fields.appendChild(playerInput.element);

// --- Star Player toggle ---
inputGlobal.starred ??= {}; // remember which players are toggled on across switches

// stat names exactly as defined in consts.js
const STAR_SPECS = [
  ['slap contact size', 1.50],
  ['charge contact size', 1.50],
  ['slap hit power', 1.10],
  ['charge hit power', 1.30],
  ['speed', 1.50],
  ['outfield throwing speed', 1.50],
  ['fielding', 1.50],
  ['curveball speed', 1.10],
  ['fastball speed', 1.30],
  ['curveball curve', 1.50],
];

// soft cap to match your warning banner


function getStatByName(name) {
  return stats.find(s => s.name === name);
}

function applyStarToPlayer(player, on) {
  if (!player || player.name === 'All') return;

  for (const [name, mult] of STAR_SPECS) {
    const stat = stats.find(s => s.name === name);
    if (!stat) continue;

    const base = player.old[stat.offset];
    let val = on ? Math.floor(base * mult) : base;

    // Let each stat’s own min/max control the bounds
    val = boundStat(stat, val);

    setStat(stat, val);
    statInputs[stat.offset]?.setValue(trueValue(player, stat));
  }
}


// UI control
const starToggle = checkbox({
  txt: '⭐ Star Player',
  onchange: (checked) => {
    if (!inputGlobal.player || inputGlobal.player.name === 'All') return;
    inputGlobal.starred[inputGlobal.player.id] = checked;
    applyStarToPlayer(inputGlobal.player, checked);
    generateCode();
  }
});
fields.appendChild(starToggle.element);


for(let stat of nonStaticStats){
    let name = stat.name;
    let input;
    if (stat.name.match(/trajectory/i)) {
        input = selectInput({
            txt: name,
            options: ['', 'low', 'medium', 'high'],
            values: [255, 2, 0, 1],
            default: 255,
            // potential NaN abuse to fix crashes could work
            
            onchange: (v) => {
                setStat(stat, v == 255 ? NaN : v);
                generateCode();
            }
        });
    } else {
        input = numInput({
            txt: name,
            onchange: (v) => {
                var out = setStat(stat, v);
                generateCode();
                return out;
            }
        });
    }
    fields.appendChild(input.element);
    statInputs[stat.offset] = input;
    if (name.match(/ability/i)) {
        fields.appendChild(descriptor("Changing this can cause crashes, be careful!", 1));
    }
}