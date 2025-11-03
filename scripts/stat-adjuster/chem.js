var newChem = {};
function setChemistryValue (p1, p2, v) {
    v = v < 0 ? 0 : v;
    v = v > 2 ? 2 : v;
    (newChem[p1['old'][9]] ??= {})[p2['old'][9]] = v;
    if (!inputGlobal.allowUnrequitedChem){
        (newChem[p2['old'][9]] ??= {})[p1['old'][9]] = v;
    }
    return v;
}
function trueChemValue (p1, p2) {
    var id1 = p1.old[9];
    var id2 = p2.old[9];
    return (newChem[id1] ?? {})[id2] ?? defaultChem[id1][id2] ?? '';
}
function chemInputDefault () {
    return defaultChem[
        inputGlobal.chemPlayer1['old'][9]
    ][
        inputGlobal.chemPlayer2['old'][9]
    ];
}
let chemPlayer1 = selectInput({
    txt: 'player 1',
    options: players.map(x => x['name']),
    values: playerInds,
    onchange: (v) => {
        var player = players[v];
        inputGlobal.chemPlayer1 = player;
        chemInput.default = chemInputDefault();
        chemInput.setValue(trueChemValue(
            inputGlobal.chemPlayer1,
            inputGlobal.chemPlayer2
        ));
    }
});
chemElem.appendChild(chemPlayer1.element);

let chemPlayer2 = selectInput({
    txt: 'player 2',
    options: players.map(x => x['name']),
    values: playerInds,
    onchange: (v) => {
        var player = players[v];
        inputGlobal.chemPlayer2 = player;
        chemInput.default = chemInputDefault();
        chemInput.setValue(trueChemValue(
            inputGlobal.chemPlayer1,
            inputGlobal.chemPlayer2
        ));
    }
});
chemElem.appendChild(chemPlayer2.element);

let chemInput = numInput({
    txt: 'chemistry',
    default: chemInputDefault(),
    onchange: (v) => {
        var out = setChemistryValue(inputGlobal.chemPlayer1, inputGlobal.chemPlayer2, v);
        generateCode();
        return out;
    }
});
chemElem.appendChild(chemInput.element);