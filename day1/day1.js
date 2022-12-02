// Step 1 -> récupérer dataset
const sourceFile = "input.txt";
const fs = require('fs');
const dataset = fs.readFileSync(sourceFile, 'utf8');
const parsedDataset = dataset.split(/\r?\n/);
// Step 2 -> stocker les calories pour chaque elf 
let caloriesPerElf = [0];
parsedDataset.forEach(calorie => {
    //Checker si on demarre le compte d'un nouveau elf
    if(calorie === "") {
        caloriesPerElf[caloriesPerElf.length] = 0;
    } else {
        caloriesPerElf[caloriesPerElf.length-1] += parseInt(calorie, 10);
    }
});
//console.log(caloriesPerElf)
const sortedArray = caloriesPerElf.sort((a, b) => b - a);
// Step 3 -> Récupérer le max 
const maxCalories = Math.max(...caloriesPerElf)
console.log(`The most carried calories is : ${maxCalories} calories !`)
//Step 4 -> recuperer le max des 3 premiers
const sum = sortedArray.slice(0, 3).reduce((previousValue, currentValue) => previousValue+currentValue, 0);
console.log(`The sum of most carried calories is : ${sum} calories !`)