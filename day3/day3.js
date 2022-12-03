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

//Step 2 --> create an array representation of the priorities by item
// and create the variable that will handle the sum of these priorities
const prioritiesByItem = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
let prioritiesSum = 0;
//Step 3 --> iterate through each rucksac
//for each rucksack, split the rucksack string representation in two strings of equals length
parsedDataset.forEach((rucksack) => {
    //use split to have an array, better to find matching pattern after
    const firstCompartment = rucksack.substring(0, rucksack.length/2).split("")
    const secondCompartment = rucksack.substring(rucksack.length/2, rucksack.length).split("")
    //Step 4 --> for both of these strings, find the common character
    const matchingPattern = firstCompartment.filter((compartment) => {
        return  secondCompartment.indexOf(compartment) > -1 
    });
    // eliminate duplicate in array
    const matchingPatternNoDuplicate = [...new Set(matchingPattern)]
    let sumForRucksack = 0
    matchingPatternNoDuplicate.forEach((item) => {
        //Step 5 -> Using find js function, find the indexIndex in the prioritiesByItem and add +1 because array starts at index 0
        sumForRucksack += prioritiesByItem.findIndex((itemIndex) => itemIndex === item) + 1
    })
    //Step 6 --> Add the result to your variable representing the sum of priorities to find
    prioritiesSum += sumForRucksack
})
console.log(prioritiesSum)
/***************************************************************************************
 *                                                                                           
 * 
 *            PART TWO
 * 
 * 
 **************************************************************************************/


