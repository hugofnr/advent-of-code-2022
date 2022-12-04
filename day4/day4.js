/***************************************************************************************
 *                                                                                           
 * 
 *            PART ONE
 * 
 * 
 **************************************************************************************/
// Step 1 -> retrieve dataset
const sourceFile = "input.txt";
const fs = require('fs');
const dataset = fs.readFileSync(sourceFile, 'utf8');
const parsedDataset = dataset.split(/\r?\n/);

let totalAssignmentsPair = 0;

// Step 5 --> we'll test if second id members are contained are contains in first id members and vice versa
function isFirstPairIncludedInSecondPair(firstPairRange, secondPairRange) {
    if(firstPairRange.length === 1) {
        const isContained = secondPairRange.find((range) => range === firstPairRange[0])
        return isContained !== undefined ? true : false
    }
    const isMinRangeContained = secondPairRange.find((range) => range === firstPairRange[0])
    const isMaxRangeContained = secondPairRange.find((range) => range === firstPairRange[firstPairRange.length-1])
    return isMinRangeContained !== undefined && isMaxRangeContained !== undefined ? true: false
}
function isSecondPairIncludedInFirstPair(firstPairRange, secondPairRange) {
    if(secondPairRange.length === 1) {
        const isContained = firstPairRange.find((range) => range === secondPairRange[0])
        return isContained !== undefined ? true : false
    }
    const isMinRangeContained = firstPairRange.find((range) => range === secondPairRange[0])
    const isMaxRangeContained = firstPairRange.find((range) => range === secondPairRange[secondPairRange.length-1])
    return isMinRangeContained !== undefined && isMaxRangeContained !== undefined ? true: false
}

//Step 2 --> Iterate through the section Id number pairs
parsedDataset.forEach((pair) => {
    //Step 3 -> parse the line to separate the section ID in two distinct one
    const splittedPair = pair.split(',')
    const firstPair = splittedPair[0];
    const secondPair = splittedPair[1];
    
    const firstPairSeparatedMinMaxRange = firstPair.split('-')
    const secondPairSeparatedMinMaxRange = secondPair.split('-')
    
    //Step 4 --> for each ID, we are gonna save the range in an array 
    // first id = []; second id = []
    const firstPairRange = Array.from({length:(parseInt(firstPairSeparatedMinMaxRange[1], 10)-parseInt(firstPairSeparatedMinMaxRange[0],10))+1}, 
    (value, key) => key + parseInt(firstPairSeparatedMinMaxRange[0],10))
    
    const secondPairRange = Array.from({length:(parseInt(secondPairSeparatedMinMaxRange[1], 10)-parseInt(secondPairSeparatedMinMaxRange[0],10))+1}, 
    (value, key) => key + parseInt(secondPairSeparatedMinMaxRange[0],10))
    
    
    // Step 6 --> if true, then we increment the total of pairs 
    if(isFirstPairIncludedInSecondPair(firstPairRange, secondPairRange) || isSecondPairIncludedInFirstPair(firstPairRange, secondPairRange)) {
        totalAssignmentsPair +=1
    }
});
console.log(`Total for part one is : ${totalAssignmentsPair}`)

/***************************************************************************************
 *                                                                                           
 * 
 *            PART TWO
 * 
 * 
 **************************************************************************************/

let totalAssignmentsPairPartTwo = 0

function isThereAtLeastOneElementInBothPair(firstPairRange, secondPairRange) {
    let isPairsOverlap = false
    firstPairRange.every((value) => {
        const isCurrentValueInFirstRangePresentInSecondOne = secondPairRange.find((secondPairValue) => secondPairValue === value);
        if(isCurrentValueInFirstRangePresentInSecondOne !== undefined) {
            isPairsOverlap = true
            // equivalent to a break statement
            return false
        }
        //equivalent to continue statement
        return true
    })
    return isPairsOverlap
}

parsedDataset.forEach((pair) => {
    const splittedPair = pair.split(',')
    const firstPair = splittedPair[0];
    const secondPair = splittedPair[1];
    
    const firstPairSeparatedMinMaxRange = firstPair.split('-')
    const secondPairSeparatedMinMaxRange = secondPair.split('-')
    
    const firstPairRange = Array.from({length:(parseInt(firstPairSeparatedMinMaxRange[1], 10)-parseInt(firstPairSeparatedMinMaxRange[0],10))+1}, 
    (value, key) => key + parseInt(firstPairSeparatedMinMaxRange[0],10))
    
    const secondPairRange = Array.from({length:(parseInt(secondPairSeparatedMinMaxRange[1], 10)-parseInt(secondPairSeparatedMinMaxRange[0],10))+1}, 
    (value, key) => key + parseInt(secondPairSeparatedMinMaxRange[0],10))
    
    if(isThereAtLeastOneElementInBothPair(firstPairRange, secondPairRange)) {
        totalAssignmentsPairPartTwo +=1
    }
});
console.log(`Total for part two is : ${ totalAssignmentsPairPartTwo}`)
