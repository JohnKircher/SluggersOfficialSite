//create and link text box inputs

function selectInput (params) {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'raw_div';
    let containerDiv = document.createElement('div');
    containerDiv.className = 'select_input';
    let newLabel = document.createElement('label');
    newLabel.innerText = params.txt + ": ";
    let newInput = document.createElement('select');
    newLabel.for = newInput.id;
    let br = document.createElement('br');
    containerDiv.appendChild(newLabel);
    containerDiv.appendChild(newInput);
    containerDiv.appendChild(br);
    outerDiv.appendChild(containerDiv);
    outerDiv.appendChild(document.createElement('br'));
    let ind = 0;
    for (let o of params.options) {
        let option = document.createElement('option');
        option.value = params.values[ind++];
        option.innerText = o;
        newInput.appendChild(option);
    }
    let out = {
        element: outerDiv
    };
    out.default = params.default || '';
    newInput.value = out.default;
    out.updateHighlight = () => {
        if (params.noHighlight) {
            return;
        }
        if (newInput.value == out.default) {
            containerDiv.classList.remove('different');
        } else {
            containerDiv.classList.add('different');
        }
    };
    out.updateHighlight();
    newInput.onchange = function(){
        params.onchange(newInput.value);
        out.updateHighlight();
    };
    out.setValue = (v) => {
        newInput.value = v;
        out.updateHighlight();
    }
    return out;
}

function _numInput (params) {
    let outerDiv;
    outerDiv = document.createElement('div');
    outerDiv.className = 'raw_div';
    let containerDiv = document.createElement('div');
    containerDiv.className = params.className ?? 'num_input';
    containerDiv.classList.add('container');
    let newInput = document.createElement('input');
    newInput.type = "number";
    newInput.id = params.txt.replace(' ', '_');
    newInput.classList.add("number_box");
    let newLabel = document.createElement('label');
    newLabel.classList.add('number_label');
    newLabel.innerText = params.txt + ": ";
    newLabel.for = newInput.id;
    let br = document.createElement('br');
    containerDiv.appendChild(newLabel);
    containerDiv.appendChild(newInput);
    containerDiv.appendChild(br);
    outerDiv.appendChild(containerDiv);
    outerDiv.appendChild(document.createElement('br'));
    var out = {};
    out.element = outerDiv;
    out.setValue = (v) => {newInput.value = v; out.updateHighlight();};
    let fref = params.onchange;
    newInput.onchange = function(){
        let val = Math.floor(parseInt(newInput.value, 10));
        newInput.value = fref(val);
    }
    return out;
}

function numInput (params) {
    let base = _numInput(params);
    let inputBox = base.element.getElementsByClassName('number_box')[0];
    let containerDiv = base.element.getElementsByClassName('container')[0];
    base.default = params.default ?? '';
    inputBox.value = base.default;
    base.updateHighlight = () => {
        if (inputBox.value == base.default) {
            containerDiv.classList.remove('different');
        } else {
            containerDiv.classList.add('different');
        }
    };
    base.updateHighlight();
    let fref = inputBox.onchange;
    inputBox.onchange = function (val) {
        fref(val);
        base.updateHighlight();
    }
    return base;
}

function checkbox (params) {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'raw_div';
    let containerDiv = document.createElement('div');
    containerDiv.className = 'check_input';
    let newLabel = document.createElement('p');
    newLabel.innerText = params.txt;
    let newInput = document.createElement('input');
    newInput.type = "checkbox";
    newLabel.for = newInput.id;
    newInput.classList.add("check_box");
    let br = document.createElement('br');
    containerDiv.appendChild(newInput);
    containerDiv.appendChild(newLabel);
    containerDiv.appendChild(br);
    outerDiv.appendChild(containerDiv);
    outerDiv.appendChild(document.createElement('br'));
    newInput.onchange = function (v) {
        params.onchange(newInput.checked);
    };
    return {
        element: outerDiv
    }
}

function checkRangeInput (params) {
    let outerDiv;
    outerDiv = document.createElement('div');
    outerDiv.className = 'raw_div';
    let containerDiv = document.createElement('div');
    containerDiv.className = params.className ?? 'range_input';
    containerDiv.classList.add('container');
    let minInput = document.createElement('input');
    minInput.type = "number";
    minInput.id = params.txt.replace(' ', '_');
    minInput.classList.add("number_box");
    let maxInput = document.createElement('input');
    maxInput.type = "number";
    maxInput.id = params.txt.replace(' ', '_');
    maxInput.classList.add("number_box");
    let newLabel = document.createElement('p');
    newLabel.classList.add('number_label');
    newLabel.innerText = params.txt + ": ";
    let br = document.createElement('br');
    let seperator = document.createElement('p');
    let checkbox = document.createElement('input');
    checkbox.classList.add("check_box");
    checkbox.type = "checkbox";
    seperator.innerText = 'to';
    containerDiv.appendChild(checkbox);
    containerDiv.appendChild(newLabel);
    containerDiv.appendChild(minInput);
    containerDiv.appendChild(seperator);
    containerDiv.appendChild(maxInput);
    containerDiv.appendChild(br);
    outerDiv.appendChild(containerDiv);
    outerDiv.appendChild(document.createElement('br'));
    minInput.value = params.defaultmin;
    maxInput.value = params.defaultmax;
    minInput.onchange = function () {
        if (!checkbox.checked) {
            return;
        }
        let val = Math.floor(parseInt(minInput.value, 10));
        minInput.value = params.onchangemin(val);
    }
    maxInput.onchange = function () {
        if (!checkbox.checked) {
            return;
        }
        let val = Math.floor(parseInt(maxInput.value, 10));
        maxInput.value = params.onchangemax(val);
    }
    checkbox.onchange = function () {
        params.ontoggle(checkbox.checked);
        if (checkbox.checked) {
            minInput.onchange();
            maxInput.onchange();
            containerDiv.classList.remove('disabled');
        } else {
            containerDiv.classList.add('disabled');
        }
    }
    checkbox.onchange();
    return outerDiv;
}

function descriptor (text, severity) {
    let tag = document.createElement('div');
    tag.className = "descriptor";
    tag.classList.add(['severity_low', 'severity_medium', 'severity_high'][severity] ?? 'severity_low');
    tag.innerHTML = '<p>' + text + '</p>';
    return tag;
}