

/*
            <h2><span id="uthersDisplay">0</span> to <span id="guldansDisplay">0</span></h2>
            <button id="uthersButton">Uther</button>
            <button id="guldansButton">Guldan</button>
            <button id="reset">Reset</button>
*/

const uthersButton = document.querySelector("#uthersButton");
const guldansButton = document.querySelector("#guldansButton");
const uthersDisplay = document.querySelector("#uthersDisplay");
const guldansDisplay = document.querySelector("#guldansDisplay");
const resetButton = document.querySelector("#reset");

let uthersScore = 0;
let guldansScore = 0;
let winningScore = 5;
let isGameOver = false;

const addScoreEvent = (btn, diplay, score) =>
{
    btn.addEventListener(`click`, (e) => {
        if(!isGameOver)
        {
            score += 1;
            if (score === winningScore)
            {
                isGameOver = true;
            }
            diplay.textContent = score;
        }
        
    });
}

addScoreEvent(uthersButton, uthersDisplay, uthersScore);
addScoreEvent(guldansButton, guldansDisplay, guldansScore);

resetButton.addEventListener(`click`, (e) => {
    uthersScore = 0;
    guldansScore = 0;
    uthersDisplay.textContent = 0;
    guldansDisplay.textContent = 0;
    isGameOver = false;

});


// uthersScore = 0;
        // guldansScore = 0;
        // uthersDisplay.textContent = 0;
        // guldansDisplay.textContent = 0;