
//Select Level And Start
let easyLevel = document.querySelector("input[value=easy]");
let startBtn = document.querySelector(".start>a");
let gameArea = document.querySelector(".game-area");
let landingArea = document.querySelector(".landing");

startBtn.addEventListener("click", (e) => {
    gameArea.style.display = "block";
    e.preventDefault();
    gameArea.scrollIntoView({
        behavior: "smooth",
    });
    window.setTimeout(() => {
        landingArea.style.display = "none";
    }, 500);

    if (easyLevel.checked) {
        generateColors(4);

    } else {
        generateColors(8);
    }


});
//Set The Colors 
let rgbColor = document.querySelector(".game-area .container>span");

let theRightColor;
function randomizeRgb() {
    let ran = Math.round(Math.random() * 255);
    return ran;
}


function generateColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr[i] = `rgb(${randomizeRgb()}, ${randomizeRgb()}, ${randomizeRgb()})`;
    }
    theRightColor = arr[Math.floor(Math.random() * num)];
    rgbColor.innerHTML = `<span>r</span><span>g</span><span>b</span><span>${theRightColor.slice(3)}</span> `;

    genterateCircles(arr);
}
function genterateCircles(arr) {
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        if (arr.length === 4) {
            div.className = "color four";
        }
        else {
            div.className = "color eight";
        }
        div.style.backgroundColor = arr[i];
        gameArea.children[0].appendChild(div);
    }
    let colors = document.querySelectorAll(".color");
    colorChoose(colors);
}


//Choosing The Color 
function colorChoose(colors) {
    colors.forEach((color) => {
        color.addEventListener("click", (e) => {
            if (color.style.backgroundColor === theRightColor) {
                colors.forEach((el) => {
                    el.classList.add("win");
                    el.style.backgroundColor = theRightColor;

                });
                playAgain(colors);
            } else {
                e.target.style.opacity = "0";
            }
        });
    });
}

function playAgain(colors) {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    let btn = document.createElement("button");
    btn.className = "again";
    btn.appendChild(document.createTextNode("Play Again?"));
    document.body.appendChild(overlay);
    document.body.appendChild(btn);
    btn.onclick = () => {
        btn.previousElementSibling.remove();
        btn.remove();
        scrollAndDisplay(landingArea, gameArea);
        colors.forEach((e) => {
            e.remove();
        });
    }
}
function scrollAndDisplay(show, hide) {
    show.style.display = "block";
    hide.scrollIntoView();
    window.setTimeout(() => {
        show.scrollIntoView({
            behavior: "smooth",
        });
    }, 0);
    window.setTimeout(() => {
        hide.style.display = "none";
    }, 600);
}