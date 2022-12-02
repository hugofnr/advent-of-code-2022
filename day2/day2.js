/*********************************************************** 
 *                                                         *
 * 
 * 
 * 
 *                  PART ONE                                
 * 
 * 
 * 
************************************************************/

// Step 1 -> récupérer dataset
const sourceFile = "input.txt";
const fs = require('fs');
const dataset = fs.readFileSync(sourceFile, 'utf8');
const parsedDataset = dataset.split(/\r?\n/);

// Step 2 -> Define enums for both Oponnent and you
const RockPaperScissorsOpponentEnum = {
    Rock : 'A',
    Paper : 'B',
    Scissors : 'C'
}

const RockPaperScissorsYouEnum = {
    Rock : 'X',
    Paper: 'Y',
    Scissors : 'Z'
}
// Step 3 -> Define enums for the score you'll get each round
const RockPaperScississorsChoiceScoreEnum = {
Rock : 1,
Paper : 2,
Scissors : 3
}

const RockPaperScississorScorePerRound = {
Win : 6,
Draw : 3,
Lose : 0
}

// Step 5 -> 
function matchupResult(opponentChoice, yourChoice) {
    if (opponentChoice === RockPaperScissorsOpponentEnum.Rock){
        return yourChoice === RockPaperScissorsYouEnum.Paper ? RockPaperScississorScorePerRound.Win : 
        yourChoice === RockPaperScissorsYouEnum.Rock ? RockPaperScississorScorePerRound.Draw : 
        RockPaperScississorScorePerRound.Lose
    }
    if (opponentChoice === RockPaperScissorsOpponentEnum.Paper){
        return yourChoice === RockPaperScissorsYouEnum.Scissors ? RockPaperScississorScorePerRound.Win : 
        yourChoice === RockPaperScissorsYouEnum.Paper ? RockPaperScississorScorePerRound.Draw : 
        RockPaperScississorScorePerRound.Lose 
    }
    if (opponentChoice === RockPaperScissorsOpponentEnum.Scissors){
        return yourChoice === RockPaperScissorsYouEnum.Rock ? RockPaperScississorScorePerRound.Win : 
        yourChoice === RockPaperScissorsYouEnum.Scissors ? RockPaperScississorScorePerRound.Draw : 
        RockPaperScississorScorePerRound.Lose
    }
}

function shapeResult(yourChoice){
    switch(yourChoice) {
        case RockPaperScissorsYouEnum.Rock : 
        return RockPaperScississorsChoiceScoreEnum.Rock;
        case RockPaperScissorsYouEnum.Paper :
        return RockPaperScississorsChoiceScoreEnum.Paper
        case RockPaperScissorsYouEnum.Scissors :
        return RockPaperScississorsChoiceScoreEnum.Scissors;
        default :
        return 0
    }
}
// Step 4 -> Define sample input
// first element : Opponent choice
// second element: What you should choose

let totalScore = 0

parsedDataset.forEach((round) => {
    const separateOpponentChoiceAndYours = round.split(" ");
    const opponentChoice = separateOpponentChoiceAndYours[0]
    const yourChoice = separateOpponentChoiceAndYours[1]
    const roundResult = matchupResult(opponentChoice, yourChoice)
    const totalRoundScore = roundResult + shapeResult(yourChoice);
    totalScore+= totalRoundScore
});
console.log(totalScore)

/*********************************************************** 
 *                                                         *
 *                                  
 * 
 * 
 *                  PART TWO                                
 * 
 * 
 * 
************************************************************/

//first letter -> opponent choice
//second letter -> how it should end
const RockPaperScissorsNewRule = {
    Lose : 'X',
    Draw : 'Y',
    Win : 'Z'
}

function matchupResultNewRule(opponentChoice, yourChoice) {
    if (yourChoice === RockPaperScissorsNewRule.Lose){
        const matchupPoint =  RockPaperScississorScorePerRound.Lose;
        const shapePoint = opponentChoice === RockPaperScissorsOpponentEnum.Paper ? RockPaperScississorsChoiceScoreEnum.Rock :
        opponentChoice === RockPaperScissorsOpponentEnum.Rock ? RockPaperScississorsChoiceScoreEnum.Scissors :
        RockPaperScississorsChoiceScoreEnum.Paper
        return matchupPoint + shapePoint;
    }
    if (yourChoice === RockPaperScissorsNewRule.Draw){
        const matchupPoint =  RockPaperScississorScorePerRound.Draw;
        const shapePoint = opponentChoice === RockPaperScissorsOpponentEnum.Paper ? RockPaperScississorsChoiceScoreEnum.Paper :
        opponentChoice === RockPaperScissorsOpponentEnum.Rock ? RockPaperScississorsChoiceScoreEnum.Rock :
        RockPaperScississorsChoiceScoreEnum.Scissors
        return matchupPoint + shapePoint;
    }
    if (yourChoice === RockPaperScissorsNewRule.Win){
        const matchupPoint =  RockPaperScississorScorePerRound.Win;
        const shapePoint = opponentChoice === RockPaperScissorsOpponentEnum.Paper ? RockPaperScississorsChoiceScoreEnum.Scissors :
        opponentChoice === RockPaperScissorsOpponentEnum.Rock ? RockPaperScississorsChoiceScoreEnum.Paper :
        RockPaperScississorsChoiceScoreEnum.Rock
        return matchupPoint + shapePoint;
    }
}

let totalScoreNewRule = 0;
parsedDataset.forEach((round) => {
    const separateOpponentChoiceAndYours = round.split(" ");
    const opponentChoice = separateOpponentChoiceAndYours[0]
    const yourChoice = separateOpponentChoiceAndYours[1]
    totalScoreNewRule += matchupResultNewRule(opponentChoice, yourChoice);
})

console.log(totalScoreNewRule)