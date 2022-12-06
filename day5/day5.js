/***************************************************************************************
 *                                                                                           
 * 
 *            PART ONE & TWO
 * 
 * 
 **************************************************************************************/
// Step 1 -> retrieve dataset
const sourceFile = "input.txt";
const fs = require('fs');
const dataset = fs.readFileSync(sourceFile, 'utf8');
const parsedDataset = dataset.split(/\r?\n/);

//Step 2 --> parse data 

//first, i will create a map : 
//       key : the stack
//       value : array representing the crates for each crate

const stackOfCrates = new Map();

// find where the instructions begin
let indexEndingStacksOfCrates = 0
while (parsedDataset[indexEndingStacksOfCrates] !== "") {
    indexEndingStacksOfCrates++
}

const lineContainingNumberOfStacks = parsedDataset[indexEndingStacksOfCrates-1].trim();
const numberOfStacks = parseInt(lineContainingNumberOfStacks[lineContainingNumberOfStacks.length-1], 10);

for(let lineNumber = 0; lineNumber < numberOfStacks-1; lineNumber++) {
  const firstCrat = parsedDataset[lineNumber].substring(0, 3)
  const secondCrat = parsedDataset[lineNumber].substring(4, 7);
  const thirdCrat = parsedDataset[lineNumber].substring(8, 11);

  const fourthCrat = parsedDataset[lineNumber].substring(12, 15)
  const fifthCrat = parsedDataset[lineNumber].substring(16, 19);
  const sixthCrat = parsedDataset[lineNumber].substring(20, 23);
  
  const seventhCrat = parsedDataset[lineNumber].substring(24, 27)
  const eighthCrat = parsedDataset[lineNumber].substring(28, 31);
  const ninethCrat = parsedDataset[lineNumber].substring(32, 35);

  const allCrat = [];
  allCrat[0] = firstCrat;
  allCrat[1] = secondCrat;
  allCrat[2] = thirdCrat;
  allCrat[3] = fourthCrat;
  allCrat[4] = fifthCrat;
  allCrat[5] = sixthCrat;
  allCrat[6] = seventhCrat;
  allCrat[7] = eighthCrat;
  allCrat[8] = ninethCrat;
  for (let keyMap = 1; keyMap <= numberOfStacks; keyMap++ ) {
    if(stackOfCrates.get(keyMap) === undefined && allCrat[keyMap-1] !== "   ") {
        const crates = [allCrat[keyMap-1]]
        stackOfCrates.set(keyMap, crates)
    } else if(allCrat[keyMap-1] !== "   "){
        const currentCrates = stackOfCrates.get(keyMap)
        currentCrates[currentCrates.length] = allCrat[keyMap-1]
        stackOfCrates.set(keyMap, currentCrates)
    }
  }
}
console.log(stackOfCrates)
for (let remainingLine = indexEndingStacksOfCrates+1; remainingLine < parsedDataset.length; remainingLine++) {
    const instructions = parsedDataset[remainingLine].split(" ")

    const indexMove = instructions.findIndex((instruction) => instruction === "move");
    const numberOfCratesToMove = parseInt(instructions[indexMove+1], 10)

    const indexFrom = instructions.findIndex((instruction) => instruction === "from");
    const initialStack = parseInt(instructions[indexFrom+1], 10)

    const indexTo = instructions.findIndex((instruction) => instruction === "to");
    const destinationStack = parseInt(instructions[indexTo+1], 10);
    // retrieve from initialStack
    const cratesToTake = stackOfCrates.get(initialStack).slice(0, numberOfCratesToMove)
    //remove it
    stackOfCrates.set(initialStack, stackOfCrates.get(initialStack).splice(numberOfCratesToMove))
    //reverse so last element be on top
    //comment this line to answer part two
    const reversedArray = cratesToTake.reverse()
    //update new stack
    stackOfCrates.set(destinationStack, reversedArray.concat(stackOfCrates.get(destinationStack)))
}
//display word to guess
for (let i = 1; i <= numberOfStacks; i++) {
    console.log(stackOfCrates.get(i)[0])
}