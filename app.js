let userseq =[];
let gameseq = [];

let btns =["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function(){
    if (started == false){
        console.log("game started");
        started = true;

        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);

}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);

}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = "Level: " + level;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameseq.push(randColor);
    gameflash(randBtn);
}

function checkAns(idx){
    if (userseq[idx]===gameseq[idx]){
        if(userseq.length===gameseq.length){
            setTimeout(levelup, 1000);
        }
        console.log("same value");
    }else{
        h2.innerHTML = `Game Over! Your score was <B>${level}</B> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
    
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    level = 0;
    userseq = [];
    gameseq = [];
    let allBtns = document.querySelectorAll('.btn');
    for (btn of allBtns){
        btn.classList.remove("flash");
        btn.classList.remove("userflash");
    }
}