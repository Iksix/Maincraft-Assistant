const inputX = document.querySelector('.ct-input-x');
const inputY = document.querySelector('.ct-input-y');
const inputs = document.querySelector('.ct__inputs');

const furnaceModeInputs = document.querySelectorAll('.furnaceMode');

//art mode 

const artModeCh = document.querySelector('.ct-input-art__ch');
let artMode = false;
artModeCh.addEventListener("click", ()=>{
    artMode = artMode ? false : true;
    updateCt();
});






// Create boxes
let x, y;
function updateCt() {

    let padding = 12;
    if (x > 12) {
        x = 12;
        inputX.value = 12;
    }
    if (y > 12) {
        y = 12;
        inputY.value = 12;
    }
    if (mode == 'FURNACE') {
        inputY.value = 1;
        inputX.value = 1;
    }
    x = inputX.value;
    y = inputY.value;

    let boxSize;
    if (x == y) {
        boxSize = (364-padding*(x-1))/x;
    }
    if (x > y) {
        boxSize = (364-padding*(x-1))/x;
    }
    if (x < y) {
        boxSize = (364-padding*(x-1))/x;
    }

    console.log(boxSize);
    inputs.innerHTML = "";
    for (let i = x*y; i != 0; i--) {
        if (!artMode)
            inputs.innerHTML+=`<li class="ct-list__item"><input class="ct-item__input ${i}" type="text"></li>`;
        else
            inputs.innerHTML+=`<li class="ct-list__item"><div onmouseover="artModeFunc(${i})" class="ct-item__input ct-item__div ${i}"></div>`;
        }
    document.querySelectorAll(".ct-item__input").forEach(element => {
        element.style.borderRadius = `${boxSize*0.1}px`
        element.style.width = `${boxSize}px`
        element.style.height = `${boxSize}px`
        element.style.fontSize = `${boxSize*0.04}px`
    });
}

// Scripts
const output = document.querySelector('.ct-output');
const outputCount = document.querySelector('.ct-o-count');
const recipeName = document.querySelector('.ct-recipe-name');
const replaceCh = document.querySelector('.replaceCh');
const selectMode = document.querySelector('.selectMode');
const selectMode__list = document.querySelector('.selectMode__list');

selectMode.addEventListener("click", () => {
    selectMode__list.classList.toggle('active');
})


let replace = false;

replaceCh.addEventListener("click", () => {
    replace = replace ? false : true;
    replaceCh.classList.toggle('active');
})

let mode;

function changeMode(option) {
    selectMode__list.classList.toggle('active');
    selectMode.innerHTML = option;
    mode = option;
    if (option == 'FURNACE') {
        inputY.value = 1;
        inputX.value = 1;
        updateCt();
        furnaceModeInputs.forEach(element => {
            if (!element.classList.contains("active"))
                element.classList.add("active");
        });
    } else {
        furnaceModeInputs.forEach(element => {
            if (element.classList.contains("active"))
                element.classList.remove("active");
        });
    }
}

const resultHTML = document.querySelector('.script-output__wrapper');

let allInputs = document.querySelectorAll('.ct-item__input');
function generate() {
    let resultReplace;
    allInputs = document.querySelectorAll('.ct-item__input');
    if (mode == 'WORKBENCH') {
        resultHTML.innerHTML = 'import crafttweaker.api.FurnaceManager; <br>';
        resultReplace = `craftingTable.removeRecipe(${output.value});`
        if (replace) resultHTML.innerHTML = replaceSimbols(resultReplace) + `<br>`;
        workbench(allInputs);
    }
    else if (mode == 'FURNACE') {
        resultHTML.innerHTML = '';
        resultReplace = `furnace.removeRecipe(${output.value});`
        if (replace) resultHTML.innerHTML = replaceSimbols(resultReplace) + `<br>`;
        furnace(allInputs);
    }
    else if (mode == 'C_MECHANICAL-CRAFTER') {
        resultHTML.innerHTML = '';
        resultReplace = `${replaceSimbols(`<recipetype:create:mechanical_crafting>`)}.removeRecipe(${output.value});`
        if (replace) resultHTML.innerHTML = replaceSimbols(resultReplace) + `<br>`;
        mechCrafter(allInputs);
    }
}

function replaceSimbols(option) {
    option = option.replace('<', '&lt')
    option = option.replace('>', '&gt')
    return option;
}

function workbench(inputs) {
    let buffer = [];
    let FinalResult = `craftingTable.addShaped("${recipeName.value}", ${replaceSimbols(output.value)}*${outputCount.value} , <br> [`
    for (let i = 1; i < inputs.length+1; i++) {
        if (inputs[i-1].value != 0 && !artMode) buffer.push(replaceSimbols(inputs[i-1].value));
        else if (inputs[i-1].innerHTML != 0 && artMode) buffer.push(replaceSimbols(inputs[i-1].innerHTML));
        else buffer.push(replaceSimbols('<item:minecraft:air>'));
        if (i > 0 && i % x == 0) {
            FinalResult+=`[${buffer}`;
            if (i != inputs.length) FinalResult += `], <br>`;
            else  FinalResult += `]`;
            buffer = [];
        }
    }
    resultHTML.innerHTML += `${FinalResult}]);`;
}

const furnaceTimeInput = document.querySelector('.furnaceTime');
const furnaceXpInput = document.querySelector('.furnaceXp');


function furnace(inputs) {
    let FinalResult = `furnace.addRecipe("${recipeName.value}", ${replaceSimbols(output.value)}*${outputCount.value} 
    , ${replaceSimbols(inputs[0].value)}, ${furnaceXpInput.value}, ${furnaceTimeInput.value});`;
    if (artMode)
        FinalResult = `furnace.addRecipe("${recipeName.value}", ${replaceSimbols(output.value)}*${outputCount.value} 
        , ${replaceSimbols(inputs[0].innerHTML  )}, ${furnaceXpInput.value}, ${furnaceTimeInput.value});`;
    resultHTML.innerHTML += `${FinalResult}`;
}

function mechCrafter(inputs) {
    let buffer = [];
    let FinalResult = `${replaceSimbols(`<recipetype:create:mechanical_crafting>`)}.addRecipe("${recipeName.value}", ${replaceSimbols(output.value)}*${outputCount.value} , <br> [`
    for (let i = 1; i < inputs.length+1; i++) {
        if (inputs[i-1].value != 0 && !artMode) buffer.push(replaceSimbols(inputs[i-1].value));
        else if (inputs[i-1].innerHTML != 0 && artMode) buffer.push(replaceSimbols(inputs[i-1].innerHTML));
        else buffer.push(replaceSimbols('<item:minecraft:air>'));
        if (i > 0 && i % x == 0) {
            FinalResult+=`[${buffer}`;
            if (i != inputs.length) FinalResult += `], <br>`;
            else  FinalResult += `]`;
            buffer = [];
        }
    }
    resultHTML.innerHTML += `${FinalResult}]);`;
}

let mouseDown = false;





function artModeFunc(option) {
    const color = document.querySelector('.ct-input-color').value;
    const item = document.querySelector('.ct-input-item').value;
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;

    let blocks = document.querySelectorAll(`.ct-item__div`);
    let block;
    blocks.forEach(element => {
        if(element.classList.contains(option)) {
            element.addEventListener("mousedown", ()=>{
                element.style.backgroundColor = color;
                block.innerHTML = replaceSimbols(item);
            })
            block = element;
        }
    });
    if (mouseDown) {
        block.style.backgroundColor = color;
        block.innerHTML = replaceSimbols(item);
    }
}