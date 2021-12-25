const { count } = require('console');
const fs = require('fs') 

let raw = fs.readFileSync('input.txt').toString().split(',').map(n => parseInt(n));

// Part 1

const part1 = (array, days) => {
    for (let i=0 ; i<days ; i++) {
        ladder(array);
    }
let lanternfish = array.length
return lanternfish
}

const ladder = (array) => {
    for (let i=0; i<array.length; i++)  {
        array[i]--;
        if (array[i] === -1) {
            array[i] = 6;
            array.push(9);
        }

    }
}

//Part 2

const fishCount = (array) => {
    let tempArr=[];
    for (let i=0; i<9; i++) {
        tempArr.push(0);
    }

    for (let i=0; i<array.length; i++) {
        for (let j=0; j<8; j++) {
            if (array[i] === j) {
                tempArr[j]++;
            } 
        }
    }
return tempArr;
}

const part2 = (array, days) => {
    let fishLadder = fishCount(array);
    for (let i=0; i<days; i++) {
        let tempZero=fishLadder[0]
        for (let j=0; j<8;j++) {
            fishLadder[j] = fishLadder[j+1];
        }
        fishLadder[8] = tempZero;
        fishLadder[6]+=tempZero;
    }
    let count = 0;
    for (let i=0; i<fishLadder.length; i++) {
        count +=fishLadder[i]
    }
return count;
}

console.log(`Lanternfish after 80 days: ${part1(raw,80)}`)
console.log(`Lanternfish after 256 days: ${part2(raw,256)}`)


