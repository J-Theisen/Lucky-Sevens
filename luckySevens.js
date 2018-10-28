/*
    Name: Jordan Theisen
    Date Created: 10/25/2018
    Most Recent Version:    
*/

function clearErrors() {    
    for (var loopCounter = 0; 
        loopCounter < document.forms["bettingForm"].elements.length; 
        loopCounter++) {
        if (document.forms["bettingForm"].elements[loopCounter]
           .parentElement.className.indexOf("has-") != -1) {
            
            document.forms["bettingForm"].elements[loopCounter]
               .parentElement.className = "form-group";
        }
    }    
}


//Main function to play the game.
function playLuckySevens() {
    var startingBet = Number(document.forms["bettingForm"]["startingBet"].value);
    var totalRolls = 0;
    var highestAmountWon = 0;
    var rollCountHighest = 0
    var gameMoney = startingBet;
    var dice1 = 0;
    var dice2 = 0;

    //Makes sure the starting bet is not empty, is a number, and is not 0 otherwise throws and error. 
    if (startingBet == "" || isNaN(startingBet) || startingBet==0) {
        alert("Starting bet must be filled in with a number that is greater than 0.");
        document.forms["bettingForm"]["startingBet"].parentElement.className = "form-group has-error";
        document.forms["bettingForm"]["startingBet"].focus();
        return false;
    }

    //Runs the game until there is no more money to play with.
    while(gameMoney>0){
        //Adds 1 to the total rolls and rolls the dice.
        totalRolls++;
        dice1 = Math.floor(Math.random()*7)+1;
        dice2= Math.floor(Math.random()*7)+1;

        /*Determines if the two rolld dice equal 7 and if so adds 4 to the game money. 
        Otherwise it subtracts 1 from game money. */
        if(dice1+dice2==7) {
            gameMoney = gameMoney + 4;

            /*This nested if statement checks to see if therse is a new highest amount won. 
            It's also subtracting the starting bet to really determine if you win money. */
            if(gameMoney>=highestAmountWon-startingBet){
                highestAmountWon = gameMoney;
                rollCountHighest = totalRolls;
            }
        }

        else {
            gameMoney = gameMoney - 1;
        }
    }
    

    //Populates our results table with the proper values.
    document.getElementById("tableContainer").style.display = "block";
    document.getElementById("startingBetDisplay").innerText = startingBet;
    document.getElementById("totalRowsDisplay").innerText = totalRolls;
    document.getElementById("highScoreDisplay").innerText = highestAmountWon;
    document.getElementById("rollHighScoreDisplay").innerText = rollCountHighest;

    return false;

}