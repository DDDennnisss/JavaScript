/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, lastDice;

initial();
document.querySelector(".btn-roll").addEventListener("click", () => {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDom = document.querySelector(".dice");

        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";

        if (dice === 6 && lastDice === 6) {
            score[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector(
                "#current-" + activePlayer
            ).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent =
            score[activePlayer];
        
        var inputScore = document.querySelector('.final-score').value;
        var winningScore;

        if(inputScore){
            winningScore = inputScore;
        }else{
            winningScore = 100;
        }

        if (score[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "winnter";
            document.querySelector(".dice").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", initial);

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

function initial() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}