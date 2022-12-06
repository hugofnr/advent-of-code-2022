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

let found = false
let idxStartParse = 0
let idxEndParse = 4
while(!found) {
    const analyzedBuffer = dataset.substring(idxStartParse, idxEndParse)
    const uniqueLetters = [...new Set(analyzedBuffer.split(''))]
    if(uniqueLetters.length === 4) {
        found = true
    } else {
        idxStartParse+=1
        idxEndParse+=1
    }
}
console.log(idxEndParse)