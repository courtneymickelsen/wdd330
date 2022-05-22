const mainDiv = document.querySelector(".main-div");
let playerNumber = 1;

// const divList = document.querySelectorAll(div);

const divList = Array.from(mainDiv.children);
mainDiv.addEventListener('click', makeMove);


function makeMove(clickedDiv) {
    
    if (playerNumber === 1) {
        clickedDiv.target.innerHTML = "X";
        playerNumber = 2;
    }
    
    else if (playerNumber === 2) {
        clickedDiv.target.innerHTML = "O";
        playerNumber = 1;
    }
}

function reset() {
    const children = mainDiv.children;
    for(let i = 0; i < children.length; i++) {
        children[i].textContent = "";
    }
}