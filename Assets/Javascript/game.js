var gamesArray1 = [
    { game:"ferris buellers day off"},
    { game:"back to the future"},
    { game:"et"},
    { game:"ghostbusters"},
    { game:"top gun"},
    { game:"the terminator"},
    { game:"gremlins"},
    { game:"pretty in pink"},
    { game:"die hard"},
    { game:"the karate kid"},
    { game:"beetlejuice"},
    { game:"footloose"},
    { game:"dirty dancing"},
    { game:"beverly hills cop"},
    { game:"a nightmare on elm street"}

]

var gamesArr = gamesArray1;

var wins=0;
var losses=0;
var allowedGuesses=10;
var gameWord=[];
var guessArr=[];
var displayArr=[];
var skip =0;
var instances=[];
var charset="abcdefghijklmnopqrstuvwxyz";
var lettersLeft =0;
var gamesIMG;
var gamesURL;



var displayWins = document.getElementById("wins");
var displayLosses = document.getElementById("losses");
var displayGuesses = document.getElementById("guesses");
var wordToGuess = document.getElementById("wordToGuess");
var lettersUsed = document.getElementById("lettersUsed");
var displayURL = document.getElementById("displayURL");
var displayIMG = document.getElementById("display-img");

console.log(displayURL);

function updateDisplay(adders) {
    
    displayWins.textContent = "Wins: " + wins;
    displayLosses.textContent = "Losses: " + losses;
    displayGuesses.textContent = "Guesses Left: " + totalGuesses;
    lettersUsed.textContent = "Letters guessed so far: " + guessArr;
    wordToGuess.textContent = displayArr.join("");
    console.log(gamesURL);
    console.log(gamesIMG);
    if(0)  
    {
        
        displayURL.setAttribute("href",gamesURL); 
        displayIMG.setAttribute("src",gamesIMG);    
    }
}


function generateNewWord () {

    guessArr = [];  
    displayArr = [];
    totalGuesses = 10;  
    lettersLeft=0;

    
    var rando = Math.floor(Math.random()*gamesArr.length);
    gameWord = gamesArr[rando].game;
    gamesURL = gamesArr[rando].url;
    gamesIMG = gamesArr[rando].image;
   
    for(var i=0;i<gameWord.length;i++)
        if(charset.indexOf(gameWord[i]) >-1) 
        {
            displayArr.push("-"); 
            lettersLeft++;   
        }
        else
            displayArr.push("   "); 

    updateDisplay();
    console.log(gameWord);
    return [gameWord,displayArr]; 
}



[gameWord,displayArr] = generateNewWord(); 


document.onkeyup = function(event) {
    
    var guess = event.key;   
    skip = 1;   

    
    if(charset.indexOf(guess) === -1)  
    {
        skip=0;
        alert("Please select an english character");
    }
    else if(guessArr.indexOf(guess) !== -1)    
    {
        skip=0;
        alert("You have already guessed " + guess + ". Please guess another character."); 
    }
    else
    {
        guess.toLowerCase();
        guessArr.push(guess); 
        guesses--; 
    }
    
    if(skip){
        if(gameWord.indexOf(guess) > -1 ) 
        {
            
            for(var i=0;i<gameWord.length;i++)
                if(gameWord[i] === guess)
                {
                    instances.push(i); 
                    lettersLeft--; 
                }
            
            for(var i=0;i<instances.length;i++)
                displayArr[instances[i]] = guess;   
            
            instances = []; 
            updateDisplay(0);
        }
        else if (gameWord.indexOf(guess) === -1 && totalGuesses ===1) 
        {
            
            losses++;
            alert("Sorry the word you were trying to guess was "+ gameWord);    
            updateDisplay();
            generateNewWord(0);
            
        }
        else{   
            totalGuesses--;
            updateDisplay(0);
        }

        if(lettersLeft === 0)  
        {
            updateDisplay(1);
            alert("Nice job! The word was "+ gameWord);
            wins++;
            generateNewWord();
        }

    }

}