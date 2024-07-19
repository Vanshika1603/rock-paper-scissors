let userScore = 0;
let compScore = 0;
let totalGames= 0;
let drawCount = 0;

const choices = document.querySelectorAll(".choice");
const msgP = document.querySelector("#msg");

const userScorePara= document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const drawScorePara = document.querySelector("#draw-score");
const totalScorePara = document.querySelector("#total-score");
const actualWin = document.querySelector("#main");
const resetBtn = document.querySelector("#reset-btn");


//geerated a computer random choice using random function
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    //genetrating a random choice of index from 0 to 2 so multiplying the ramdom with three as random range is between 0 to 1 and when we want any range like 1 to 9 we multiply random with the 10 (9+1)
    //math.floor is used to give ony integer value removing all the decimal values
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];

}

//function to show that the game was a draw and no score is updated except the total score 
const drawGame = () => { 
    drawCount++;      
    totalGames++;
    totalScorePara.innerText = totalGames;
    drawScorePara.innerText = drawCount;
    msgP.innerText= "Game was Draw. Play Again";
    msgP.style.backgroundColor = "#081b31";
}

//function to show winner and loser

const showWinner=(userWin,userChoice,compChoice)=>{
     if(userWin){
        userScore++;
        totalGames++;
        totalScorePara.innerText = totalGames;
        userScorePara.innerText = userScore;
        msgP.innerText ='You Win! Your '+userChoice+' beats '+compChoice;
        msgP.style.backgroundColor = "green";
     }
     else{
        
        compScore++;
        totalGames++;
        totalScorePara.innerText = totalGames;
        compScorePara.innerText = compScore;
        msgP.innerText= "You Lose! " +userChoice+' beats your '+compChoice;
        msgP.style.backgroundColor = "red";
     }
}

//function of showing reset Button


//function to play a game  and check who winn aur not

const playGame = (userChoice) => {
    //generate computer choice
    const compChoice = genCompChoice();
    if(totalGames===29){
        if(userScore>compScore){
            actualWin.innerText ="YOU WIN!";
        }else if(userScore<compScore){
            actualWin.innerText ="COMPUTER WIN!";
            
            
        }
        else{
            actualWin.innerText ="GAME WAS DRAW!";
        }
               
    }
    if (userChoice === compChoice) {
        //Draw Game
        drawGame();
    }
    else {

        let userWin = true;
        if (userChoice === "rock") {
            //scissors yha ppr ma se hogi computer ki choice kiu ki agr rock hoti toh vo draw vali condition mai hi chla jaata
            userWin = compChoice === "paper" ? false : true;
            //false isliya computer jita ga ppr leke rock sa aur false isliya agr comp ka scissors hota toh comp user jeed jata rock leke

        } else if (userChoice === "paper") {
            //computer ka pass scissors and rock ha
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            //computer ka pass ha rock and paper 
            userWin = compChoice ==="rock"?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
        
    }

    
}

const disableBtn=()=>{
    for(let ch of choices){
        ch.disabled= true;
    }
    
}
//loop for clicking the choices

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
       
        if(totalGames===29){
            disableBtn();
            
        }
        playGame(userChoice);
    })
})


const resetGame =() =>{
    window.location.reload();
};

resetBtn.addEventListener("click",resetGame);