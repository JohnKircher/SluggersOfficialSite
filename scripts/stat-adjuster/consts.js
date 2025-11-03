//all playable characters and their memory offests in the game files
//OLD will be default stats, and new will be modified stats. 

//Keep track of offsets so we can accurately modify specific bytes in memory for each Gecko Code

//CLASS: 
// 0-BALANCED 
// 1-POWER 
// 2 -SPEED 
// 3 -TECH

var players = [
    {name: 'Mario', offset: 0x806ce9a0, old: {}, new: {}},
    {name: 'Luigi', offset: 0x806cea2e, old: {}, new: {}},
    {name: 'Donkey Kong', offset: 0x806ceabc, old: {}, new: {}},
    {name: 'Diddy Kong', offset: 0x806ceb4a, old: {}, new: {}},
    {name: 'Peach', offset: 0x806cebd8, old: {}, new: {}},
    {name: 'Daisy', offset: 0x806cec66, old: {}, new: {}},
    {name: 'Yoshi', offset: 0x806cecf4, old: {}, new: {}},
    {name: 'Baby Mario', offset: 0x806ced82, old: {}, new: {}},
    {name: 'Baby Luigi', offset: 0x806cee10, old: {}, new: {}},
    {name: 'Bowser', offset: 0x806cee9e, old: {}, new: {}},
    {name: 'Wario', offset: 0x806cef2c, old: {}, new: {}},
    {name: 'Waluigi', offset: 0x806cefba, old: {}, new: {}},
    {name: 'Koopa Troopa', offset: 0x806cf048, old: {}, new: {}},
    {name: 'Red Toad', offset: 0x806cf0d6, old: {}, new: {}},
    {name: 'Boo', offset: 0x806cf164, old: {}, new: {}},
    {name: 'Toadette', offset: 0x806cf1f2, old: {}, new: {}},
    {name: 'Shy Guy', offset: 0x806cf280, old: {}, new: {}},
    {name: 'Birdo', offset: 0x806cf30e, old: {}, new: {}},
    {name: 'Monty Mole', offset: 0x806cf39c, old: {}, new: {}},
    {name: 'Bowser Jr.', offset: 0x806cf42a, old: {}, new: {}},
    {name: 'Koopa Paratroopa', offset: 0x806cf4b8, old: {}, new: {}},
    {name: 'Blue Pianta', offset: 0x806cf546, old: {}, new: {}},
    {name: 'Red Pianta', offset: 0x806cf5d4, old: {}, new: {}},
    {name: 'Yellow Pianta', offset: 0x806cf662, old: {}, new: {}},
    {name: 'Blue Noki', offset: 0x806cf6f0, old: {}, new: {}},
    {name: 'Red Noki', offset: 0x806cf77e, old: {}, new: {}},
    {name: 'Green Noki', offset: 0x806cf80c, old: {}, new: {}},
    {name: 'Hammer Bro.', offset: 0x806cf89a, old: {}, new: {}},
    {name: 'Toadsworth', offset: 0x806cf928, old: {}, new: {}},
    {name: 'Blue Toad', offset: 0x806cf9b6, old: {}, new: {}},
    {name: 'Yellow Toad', offset: 0x806cfa44, old: {}, new: {}},
    {name: 'Green Toad', offset: 0x806cfad2, old: {}, new: {}},
    {name: 'Purple Toad', offset: 0x806cfb60, old: {}, new: {}},
    {name: 'Magikoopa', offset: 0x806cfbee, old: {}, new: {}},
    {name: 'Red Magikoopa', offset: 0x806cfc7c, old: {}, new: {}},
    {name: 'Green Magikoopa', offset: 0x806cfd0a, old: {}, new: {}},
    {name: 'Yellow Magikoopa', offset: 0x806cfd98, old: {}, new: {}},
    {name: 'King Boo', offset: 0x806cfe26, old: {}, new: {}},
    {name: 'Petey Piranha', offset: 0x806cfeb4, old: {}, new: {}},
    {name: 'Dixie Kong', offset: 0x806cff42, old: {}, new: {}},
    {name: 'Goomba', offset: 0x806cffd0, old: {}, new: {}},
    {name: 'Paragoomba', offset: 0x806d005e, old: {}, new: {}},
    {name: 'Red Koopa Troopa', offset: 0x806d00ec, old: {}, new: {}},
    {name: 'Green Koopa Paratroopa', offset: 0x806d017a, old: {}, new: {}},
    {name: 'Blue Shy Guy', offset: 0x806d0208, old: {}, new: {}},
    {name: 'Yellow Shy Guy', offset: 0x806d0296, old: {}, new: {}},
    {name: 'Green Shy Guy', offset: 0x806d0324, old: {}, new: {}},
    {name: 'Gray Shy Guy', offset: 0x806d03b2, old: {}, new: {}},
    {name: 'Dry Bones', offset: 0x806d0440, old: {}, new: {}},
    {name: 'Green Dry Bones', offset: 0x806d04ce, old: {}, new: {}},
    {name: 'Dark Bones', offset: 0x806d055c, old: {}, new: {}},
    {name: 'Blue Dry Bones', offset: 0x806d05ea, old: {}, new: {}},
    {name: 'Fire Bro.', offset: 0x806d0678, old: {}, new: {}},
    {name: 'Boomerang Bro.', offset: 0x806d0706, old: {}, new: {}},
    {name: 'Wiggler', offset: 0x806d0794, old: {}, new: {}},
    {name: 'Blooper', offset: 0x806d0822, old: {}, new: {}},
    {name: 'Funky Kong', offset: 0x806d08b0, old: {}, new: {}},
    {name: 'Tiny Kong', offset: 0x806d093e, old: {}, new: {}},
    {name: 'Kritter', offset: 0x806d09cc, old: {}, new: {}},
    {name: 'Blue Kritter', offset: 0x806d0a5a, old: {}, new: {}},
    {name: 'Red Kritter', offset: 0x806d0ae8, old: {}, new: {}},
    {name: 'Brown Kritter', offset: 0x806d0b76, old: {}, new: {}},
    {name: 'King K. Rool', offset: 0x806d0c04, old: {}, new: {}},
    {name: 'Baby Peach', offset: 0x806d0c92, old: {}, new: {}},
    {name: 'Baby Daisy', offset: 0x806d0d20, old: {}, new: {}},
    {name: 'Baby DK', offset: 0x806d0dae, old: {}, new: {}},
    {name: 'Red Yoshi', offset: 0x806d0e3c, old: {}, new: {}},
    {name: 'Blue Yoshi', offset: 0x806d0eca, old: {}, new: {}},
    {name: 'Yellow Yoshi', offset: 0x806d0f58, old: {}, new: {}},
    {name: 'Light Blue Yoshi', offset: 0x806d0fe6, old: {}, new: {}},
    {name: 'Pink Yoshi', offset: 0x806d1074, old: {}, new: {}},
    {name: 'Red Mii', offset: 0x806d1456, old: {}, new: {}},
    {name: 'Orange Mii', offset: 0x806d14e4, old: {}, new: {}},
    {name: 'Yellow Mii', offset: 0x806d1572, old: {}, new: {}},
    {name: 'Light Green Mii', offset: 0x806d1600, old: {}, new: {}},
    {name: 'Green Mii', offset: 0x806d168e, old: {}, new: {}},
    {name: 'Blue Mii', offset: 0x806d171c, old: {}, new: {}},
    {name: 'Light Blue Mii', offset: 0x806d17aa, old: {}, new: {}},
    {name: 'Pink Mii', offset: 0x806d1838, old: {}, new: {}},
    {name: 'Purple Mii', offset: 0x806d18c6, old: {}, new: {}},
    {name: 'Brown Mii', offset: 0x806d1954, old: {}, new: {}},
    {name: 'White Mii', offset: 0x806d19e2, old: {}, new: {}},
    {name: 'Black Mii', offset: 0x806d1a70, old: {}, new: {}},
    {name: 'Red Mii (F)', offset: 0x806d1afe, old: {}, new: {}},
    {name: 'Orange Mii (F)', offset: 0x806d1b8c, old: {}, new: {}},
    {name: 'Yellow Mii (F)', offset: 0x806d1c1a, old: {}, new: {}},
    {name: 'Light Green Mii (F)', offset: 0x806d1ca8, old: {}, new: {}},
    {name: 'Green Mii (F)', offset: 0x806d1d36, old: {}, new: {}},
    {name: 'Blue Mii (F)', offset: 0x806d1dc4, old: {}, new: {}},
    {name: 'Light Blue Mii (F)', offset: 0x806d1e52, old: {}, new: {}},
    {name: 'Pink Mii (F)', offset: 0x806d1ee0, old: {}, new: {}},
    {name: 'Purple Mii (F)', offset: 0x806d1f6e, old: {}, new: {}},
    {name: 'Brown Mii (F)', offset: 0x806d1ffc, old: {}, new: {}},
    {name: 'White Mii (F)', offset: 0x806d208a, old: {}, new: {}},
    {name: 'Black Mii (F)', offset: 0x806d2118, old: {}, new: {}},
];

players.forEach((x, i) => x['id'] = i);

var trajectories = "000000000100000002000000020002000200010000000001020001000001020002000000020000000200010001000100020002000200010002000100010001000100000100010001000100010100000102000200020002000200020002000200010001000100010001000001010002000100000001000100010001000100020002000201020002000200020002000200020000000000000000000200020002000200020002000200020002000200020002000200020002000200020002000200020002000200020002000000";

var baseAddr = players[0].offset;
for (let player of players) {
    player.offset -= baseAddr;
}
var statLen = players[1].offset;

players = players.sort((a,b) => a['name'] > b['name'] ? 1 : a['name'] < b['name'] ? -1 : 0);

const playerNames = players.map(x => x.name);

const stats = [
    {
        offset: 0x9,
        size: 1,
        name: "id",
        static: 1,
    },

    {
        offset: 0xc,
        size: 1,
        name: "character class",
        low: 0,
        high: 3,
        min: 0,
        max: 3,
    },
    
    {
        offset: 0x20,
        size: 2,
        name: "outfield throwing speed",
        low: 20,
        high: 98,
        max: 200,
        random: 1,
    },
    {
        offset: 0x22,
        size: 2,
        name: "fielding",
        low: 20,
        high: 84,
        max: 200,
        random: 1,
    },

    {
        offset: 0x1e,
        size: 2,
        name: "speed",
        low: 10,
        high: 90,
        max: 200,
        random: 1,
    },

    {
        offset: 0x14,
        size: 2,
        name: "slap contact size",
        low: 45,
        high: 80,
        min: 10,
        max: 200,
        random: 1,
    },

    {
        offset: 0x18,
        size: 2,
        name: "slap hit power",
        low: 10,
        high: 65,
        max: 150,
        random: 1,
    },

    {
        offset: 0x16,
        size: 2,
        name: "charge contact size",
        low: 18,
        high: 60,
        min: 10,
        max: 200,
    },
    
    {
        offset: 0x1a,
        size: 2,
        name: "charge hit power",
        low: 20,
        high: 98,
        max: 150,
    },
    {
        offset: -0x1,
        size: 1,
        name: "hit trajectory",
        low: 0,
        high: 2,
        min: 0,
        max: 2,

    },
    
    
    
    {
        offset: 0x2e,
        size: 2,
        name: "pitching stamina",
        low: 0,
        high: 100,
        min: 0,
        max: 100,

    },

    {
        offset: 0x28,
        size: 2,
        name: "curveball speed",
        low: 70,
        high: 150,
        min: 70,
        max: 200,
        random: 1,
    },
    {
        offset: 0x2a,
        size: 2,
        name: "fastball speed",
        low: 80,
        high: 175,
        min: 70,
        max: 200,
    },
    {
        offset: 0x2c,
        size: 2,
        name: "curveball curve",
        low: 5,
        high: 89,
        max: 200,
        random: 1,
    },
];

var statsByOffset = {};
stats.forEach(x => statsByOffset[x.offset] = x);

var nonStaticStats = stats.filter(x => !x.static);

function readInt(addr, size) {
    out = 0;
    while (size --> 0) {
        out <<= 8;
        out += data[addr++];
    }
    return out;
}

for (let player of players) {
    for (let stat of stats) {
        player.old[stat.offset] = readInt(player.offset + stat.offset, stat.size);
    }
}

players.forEach((x) => {x.old[-0x1] = parseInt(trajectories.substring(x.id * 4, x.id * 4 + 2))});

var playersById = {};
players.forEach(x => playersById[x['old'][9]] = x);

let all = {
    old: {},
    new: {},
    name: 'All',
};

for (let stat of stats) {
    all.old[stat.offset] = '';
}

let chemistryOffsets = {};
players.forEach(x => {
    var id = x['old'][9];
    var name = x['name'];
    var offset = -1;
    if (id <= 0x4c) {
        offset = id + 0x30;
    } else if (name.match("Red")) {
        offset = 0x7d;
    } else if (name.match("Orange")) {
        offset = 0x7e;
    } else if (name.match("Yellow")) {
        offset = 0x7f;
    } else if (name.match("Light Green")) {
        offset = 0x80;
    } else if (name.match("Green")) {
        offset = 0x81;
    } else if (name.match("Light Blue")) {
        offset = 0x83;
    } else if (name.match("Blue")) {
        offset = 0x82;
    } else if (name.match("Pink")) {
        offset = 0x84;
    } else if (name.match("Purple")) {
        offset = 0x85;
    } else if (name.match("Brown")) {
        offset = 0x86;
    } else if (name.match("White")) {
        offset = 0x87;
    } else if (name.match("Black")) {
        offset = 0x88;
    }
    if (name.match("(F)")) {
        offset += 0x89 - 0x7d;
    }
    chemistryOffsets[id] = offset;
});

let defaultChem = {};
players.forEach(x => {
    var char1ID = x['old'][9];
    var char1Offset = x['offset'];
    players.forEach(x => {
        (defaultChem[char1ID] ??= {})[x['old'][9]]
            = data[char1Offset + chemistryOffsets[x['old'][9]]];
    });
});

var fields = document.getElementById('fields');
var chemElem = document.getElementById('chemistry');
var extraElem = document.getElementById('extra');
var randomElem = document.getElementById('random');

var statInputs = {};
let inputGlobal = {
    player: all,
    chemPlayer1: players[0],
    chemPlayer2: players[0],
    allowUnrequitedChem: 0,
    uncapPower: 0,
    uncapContact: 0,
    devMode: 0,
};

var tabSelectors = document.getElementsByClassName('tab_selection');
var tabs = document.getElementsByClassName('tab');
for (var i in tabSelectors) {
    let selector = tabSelectors[i];
    let tab = tabs[i];
    selector.onclick = function () {
        [...tabs].forEach(x => x.classList.add('invisible'));
        tab.classList.remove('invisible');
        [...tabSelectors].forEach(x => x.classList.remove('selected'));
        selector.classList.add('selected');
    }
}