

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
const winningScoreSelect = document.querySelector("#playto");

let uthersScore = 0;
let guldansScore = 0;
let winningScore = 5;
let isGameOver = false;

winningScoreSelect.addEventListener("change", function () { //(e) => { //
    winningScore = parseInt(this.value);
    reset();
});

const addScoreEvent = (btn, oppBtn, display,  oppDisplay) =>
{
    btn.addEventListener(`click`, (e) => {
        if(!isGameOver)
        {
            let score = parseInt(display.textContent);
            score += 1;
            if (score === winningScore)
            {
                isGameOver = true;

                display.classList.add("has-text-success");
                oppDisplay.classList.add("has-text-danger");
                btn.disabled = true;
                oppBtn.disabled = true;
            }
            display.textContent = score;
        }
        
    });
}

addScoreEvent(uthersButton, guldansButton, uthersDisplay, guldansDisplay);
addScoreEvent(guldansButton, uthersButton, guldansDisplay, uthersDisplay);

function reset()
{
    // uthersScore = 0;
    // guldansScore = 0;
    uthersDisplay.textContent = guldansDisplay.textContent = 0;
    isGameOver = false;
    winningScore = parseInt(winningScoreSelect.value);
    uthersDisplay.classList.remove("has-text-success", "has-text-danger");
    guldansDisplay.classList.remove("has-text-success", "has-text-danger");
    uthersButton.disabled = guldansButton.disabled = false;

}

resetButton.addEventListener(`click`, reset);


// uthersScore = 0;
        // guldansScore = 0;
        // uthersDisplay.textContent = 0;
        // guldansDisplay.textContent = 0;